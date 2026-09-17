import type { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

interface ContactRequestBody {
  name?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  projectType?: string;
  message?: string;
}

// Target recipient email (defaults to vexrynlabs@gmail.com)
const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || 'vexrynlabs@gmail.com';

// Sanitize and retrieve Google App Password / SMTP password securely
function getSanitizedSmtpPass(): string {
  const raw = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || '';
  const trimmed = raw.trim();
  // Filter out dummy placeholder strings
  if (!trimmed || trimmed === 'Gmail App Password' || trimmed === 'YOUR_PASSWORD' || trimmed === 'MY_SMTP_PASS') {
    return '';
  }
  // Sanitize spaces (e.g. "xxxx xxxx xxxx xxxx" -> "xxxxxxxxxxxxxxxx")
  return trimmed.replace(/\s+/g, '');
}

// Check if email transport is configured
function isEmailConfigured(): boolean {
  const pass = getSanitizedSmtpPass();
  return pass.length > 0;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Only POST requests are supported.',
      error: 'Method Not Allowed',
    });
  }

  try {
    // Parse JSON body if string
    let body: ContactRequestBody = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          success: false,
          message: 'Malformed JSON payload in request body.',
          error: 'Malformed JSON payload.',
        });
      }
    }
    body = body || {};

    const { name, email, phone, phoneNumber, projectType, message } = body;
    const clientPhone = (phone || phoneNumber || '').toString().trim();

    // 1. Validate Name
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name / Company is required.',
        error: 'Name / Company is required.',
      });
    }

    // 2. Validate Email
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.',
        error: 'A valid email address is required.',
      });
    }

    // 3. Validate Phone Number
    const digits = clientPhone.replace(/\D/g, '');
    const phoneValidChar = /^[+]?[\d\s().-]{7,25}$/.test(clientPhone);
    if (!clientPhone || !phoneValidChar || digits.length < 8 || digits.length > 15) {
      return res.status(400).json({
        success: false,
        message: 'A valid phone number is required (e.g. +91 98765 43210).',
        error: 'A valid phone number is required.',
      });
    }

    // 4. Validate Project Type
    if (!projectType || typeof projectType !== 'string' || !projectType.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Project Type selection is required.',
        error: 'Project Type selection is required.',
      });
    }

    // 5. Validate Message
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Project message / scope is required (minimum 5 characters).',
        error: 'Project message / scope is required.',
      });
    }

    // Verify SMTP configuration
    if (!isEmailConfigured()) {
      console.warn('[Vercel Serverless Contact API] SMTP credentials not configured');
      return res.status(503).json({
        success: false,
        configured: false,
        message: 'Email delivery service is currently not configured on the server. Please contact vexrynlabs@gmail.com directly.',
        error: 'Email delivery service is not configured on the server.',
      });
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const rawPort = process.env.SMTP_PORT || '465';
    const port = parseInt(rawPort, 10) || 465;
    const secure = process.env.SMTP_SECURE !== undefined
      ? (process.env.SMTP_SECURE === 'true' || process.env.SMTP_SECURE === '1')
      : (port === 465);

    const user = process.env.SMTP_USER || process.env.GMAIL_USER || 'vexrynlabs@gmail.com';
    const pass = getSanitizedSmtpPass();

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    const mailOptions = {
      from: `"VEXRYN LABS Contact Form" <${user}>`,
      to: RECIPIENT_EMAIL,
      replyTo: `"${name.trim()}" <${email.trim()}>`,
      subject: `[VEXRYN LABS] New Project Enquiry: ${projectType.trim()} — ${name.trim()}`,
      text: `New Project Enquiry Received via VEXRYN LABS\n\nName / Company: ${name.trim()}\nClient Email: ${email.trim()}\nPhone Number: ${clientPhone}\nProject Type: ${projectType.trim()}\n\nMessage:\n${message.trim()}\n\n---\nSubmitted at: ${new Date().toUTCString()}\nReply directly to this email to contact the client at ${email.trim()} or call ${clientPhone}.`,
      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0c0d0e; color: #f3f4f6; padding: 32px; border: 1px solid #222; border-radius: 8px;">
  <div style="border-bottom: 2px solid #CCFF00; padding-bottom: 16px; margin-bottom: 24px;">
    <span style="font-family: monospace; font-size: 11px; letter-spacing: 2px; color: #CCFF00; text-transform: uppercase;">VEXRYN LABS // INQUIRY TRANSMISSION</span>
    <h1 style="font-size: 20px; font-weight: 700; margin: 8px 0 0 0; color: #ffffff;">New Project Enquiry</h1>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr>
      <td style="padding: 10px 0; color: #9ca3af; font-size: 13px; width: 140px; border-bottom: 1px solid #1a1a1a;">Name / Company:</td>
      <td style="padding: 10px 0; color: #ffffff; font-weight: 600; font-size: 14px; border-bottom: 1px solid #1a1a1a;">${escapeHtml(name.trim())}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; color: #9ca3af; font-size: 13px; border-bottom: 1px solid #1a1a1a;">Client Email:</td>
      <td style="padding: 10px 0; color: #CCFF00; font-family: monospace; font-size: 13px; border-bottom: 1px solid #1a1a1a;">
        <a href="mailto:${escapeHtml(email.trim())}" style="color: #CCFF00; text-decoration: none;">${escapeHtml(email.trim())}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px 0; color: #9ca3af; font-size: 13px; border-bottom: 1px solid #1a1a1a;">Phone Number:</td>
      <td style="padding: 10px 0; color: #CCFF00; font-family: monospace; font-size: 13px; border-bottom: 1px solid #1a1a1a;">
        <a href="tel:${escapeHtml(clientPhone.replace(/\s+/g, ''))}" style="color: #CCFF00; text-decoration: none;">${escapeHtml(clientPhone)}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px 0; color: #9ca3af; font-size: 13px; border-bottom: 1px solid #1a1a1a;">Project Type:</td>
      <td style="padding: 10px 0; color: #ffffff; font-size: 14px; border-bottom: 1px solid #1a1a1a;">
        <span style="background: #1e2508; color: #CCFF00; border: 1px solid #334400; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-family: monospace;">
          ${escapeHtml(projectType.trim())}
        </span>
      </td>
    </tr>
  </table>

  <div style="margin-bottom: 28px;">
    <div style="font-size: 12px; font-family: monospace; color: #9ca3af; text-transform: uppercase; margin-bottom: 8px;">Project Message:</div>
    <div style="background-color: #141618; border: 1px solid #222; border-radius: 6px; padding: 16px; font-size: 14px; line-height: 1.6; color: #e5e7eb; white-space: pre-wrap;">${escapeHtml(message.trim())}</div>
  </div>

  <div style="border-top: 1px solid #222; padding-top: 16px; font-size: 11px; font-family: monospace; color: #6b7280; display: flex; justify-content: space-between;">
    <span>Transmission target: ${escapeHtml(RECIPIENT_EMAIL)}</span>
    <span>Timestamp: ${new Date().toUTCString()}</span>
  </div>
</div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been sent successfully.',
    });
  } catch (err: unknown) {
    console.error('Error in Vercel contact handler:', err);
    let errorMessage = err instanceof Error ? err.message : 'Unknown error';
    if (errorMessage.includes('535') || errorMessage.includes('BadCredentials')) {
      errorMessage =
        'Google rejected the password (535 Bad Credentials). Google SMTP requires a dedicated 16-character App Password generated in your Google Account Security settings.';
    }
    return res.status(500).json({
      success: false,
      message: 'Unable to send enquiry. Please try again.',
      error: errorMessage,
    });
  }
}
