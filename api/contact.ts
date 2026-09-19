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

interface ResolvedSmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  recipient: string;
}

// Determines if a string matches Google App Password format (16 letters, optionally spaced in 4-letter chunks)
function isGoogleAppPassword(str: string): boolean {
  if (!str) return false;
  const clean = str.trim().replace(/\s+/g, '');
  return /^[a-zA-Z]{16}$/.test(clean) && !str.includes('.');
}

// Determines if a string is a syntactically valid hostname / domain / IP
function isValidHostname(str: string): boolean {
  if (!str) return false;
  const clean = str.trim();
  if (clean.includes(' ')) return false;
  if (clean === 'localhost') return true;
  return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(clean);
}

// Redact any password, token, or 16-character letter groups from logs and client responses
function redactSecrets(text: string, pass?: string): string {
  if (!text) return '';
  let clean = String(text);
  if (pass && pass.length >= 4) {
    clean = clean.split(pass).join('[REDACTED]');
    const spaced = pass.match(/.{1,4}/g)?.join(' ');
    if (spaced) {
      clean = clean.split(spaced).join('[REDACTED]');
    }
  }
  // Redact 4x4 letter patterns e.g. "abcd efgh ijkl mnop"
  clean = clean.replace(/\b[a-zA-Z]{4}\s+[a-zA-Z]{4}\s+[a-zA-Z]{4}\s+[a-zA-Z]{4}\b/g, '[REDACTED]');
  // Redact 16-character alpha tokens (excluding common words like "gmail")
  clean = clean.replace(/\b(?![a-zA-Z]*gmail)[a-zA-Z]{16}\b/gi, '[REDACTED]');
  return clean;
}

// Safely resolve and heal environment variables even if swapped or pasted in the wrong field
function resolveSmtpConfig(): ResolvedSmtpConfig {
  const rawHost = (process.env.SMTP_HOST || '').trim();
  const rawPass = (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || '').trim();
  const rawUser = (process.env.SMTP_USER || process.env.GMAIL_USER || 'vexrynlabs@gmail.com').trim();
  const rawRecipient = (process.env.CONTACT_RECIPIENT_EMAIL || 'vexrynlabs@gmail.com').trim();
  const rawPort = (process.env.SMTP_PORT || '').trim();
  const rawSecure = process.env.SMTP_SECURE !== undefined ? String(process.env.SMTP_SECURE).trim() : undefined;

  let host = 'smtp.gmail.com';
  let pass = '';

  const hostIsAppPass = isGoogleAppPassword(rawHost);
  const passIsAppPass = isGoogleAppPassword(rawPass);
  const passLooksLikeHost = isValidHostname(rawPass);

  // Self-healing: detect if user pasted their 16-char app password into SMTP_HOST
  if (hostIsAppPass) {
    pass = rawHost.replace(/\s+/g, '');
    host = passLooksLikeHost ? rawPass : 'smtp.gmail.com';
  } else {
    if (isValidHostname(rawHost)) {
      host = rawHost;
    } else {
      host = 'smtp.gmail.com';
    }

    if (passIsAppPass) {
      pass = rawPass.replace(/\s+/g, '');
    } else if (rawPass && rawPass !== 'YOUR_PASSWORD' && rawPass !== 'MY_SMTP_PASS') {
      pass = rawPass.replace(/\s+/g, '');
    }
  }

  // Final fallback to process.env.GMAIL_APP_PASSWORD if pass is still empty
  if (!pass) {
    const fallback = (process.env.GMAIL_APP_PASSWORD || '').trim();
    if (fallback) {
      pass = fallback.replace(/\s+/g, '');
    }
  }

  let port = parseInt(rawPort, 10);
  if (isNaN(port) || port <= 0) {
    port = 465;
  }

  let secure: boolean;
  if (rawSecure !== undefined) {
    secure = rawSecure === 'true' || rawSecure === '1';
  } else {
    secure = port === 465;
  }

  return {
    host,
    port,
    secure,
    user: rawUser || 'vexrynlabs@gmail.com',
    pass,
    recipient: rawRecipient || 'vexrynlabs@gmail.com',
  };
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

  let config: ResolvedSmtpConfig | null = null;

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

    // Resolve and sanitize configuration
    config = resolveSmtpConfig();

    if (!config.pass) {
      console.warn('[Vercel Serverless Contact API] SMTP credentials not found in environment');
      return res.status(503).json({
        success: false,
        configured: false,
        message: 'Email delivery service is currently not configured on the server. Please contact vexrynlabs@gmail.com directly.',
        error: 'Email delivery service is not configured on the server (Missing SMTP credentials).',
      });
    }

    const mailOptions = {
      from: `"VEXRYN LABS Contact Form" <${config.user}>`,
      to: config.recipient,
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
    <span>Transmission target: ${escapeHtml(config.recipient)}</span>
    <span>Timestamp: ${new Date().toUTCString()}</span>
  </div>
</div>
      `,
    };

    // Prioritized list of transport options for resilient delivery on serverless environments
    // Attempt 1: Explicitly configured host & port (e.g. smtp.gmail.com:465 with secure: true)
    // Attempt 2: Port 587 with STARTTLS (the cloud standard that overcomes port 465 greeting drops in AWS Lambda / Vercel)
    // Attempt 3: service: 'gmail' (Nodemailer's built-in Gmail transport profile)
    const attempts: Array<{
      desc: string;
      transportOptions: any;
    }> = [];

    // Primary: User's exact configured settings
    attempts.push({
      desc: `${config.host}:${config.port} (secure: ${config.secure})`,
      transportOptions: {
        host: config.host,
        port: config.port,
        secure: config.secure,
        requireTLS: config.port === 587,
        auth: {
          user: config.user,
          pass: config.pass,
        },
        connectionTimeout: 10000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
      } as any,
    });

    // Secondary: Port 587 with STARTTLS if primary is 465
    if (config.port !== 587) {
      attempts.push({
        desc: `${config.host}:587 (STARTTLS)`,
        transportOptions: {
          host: config.host,
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: config.user,
            pass: config.pass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 15000,
          socketTimeout: 20000,
        } as any,
      });
    }

    // Tertiary: If host is Gmail, also offer service: 'gmail'
    if (config.host.toLowerCase().includes('gmail')) {
      attempts.push({
        desc: `service: 'gmail'`,
        transportOptions: {
          service: 'gmail',
          auth: {
            user: config.user,
            pass: config.pass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 15000,
          socketTimeout: 20000,
        } as any,
      });
    }

    let sent = false;
    let lastError: any = null;

    for (const attempt of attempts) {
      try {
        const transporter = nodemailer.createTransport(attempt.transportOptions);
        await transporter.sendMail(mailOptions);
        sent = true;
        break; // Successfully sent!
      } catch (attemptErr: any) {
        lastError = attemptErr;
        const errStr = attemptErr ? String(attemptErr.message || attemptErr) : '';

        // If credentials are bad (535 Bad Credentials), trying other ports will not help
        if (errStr.includes('535') || errStr.includes('BadCredentials') || attemptErr?.responseCode === 535) {
          throw attemptErr;
        }

        console.warn(
          `[Vercel Serverless Contact API] Transport ${attempt.desc} failed (${redactSecrets(errStr, config.pass)}). Attempting resilient fallback...`
        );
      }
    }

    if (!sent) {
      throw lastError || new Error('Failed to dispatch email after all transport options.');
    }

    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been sent successfully.',
    });
  } catch (err: unknown) {
    const rawError = err instanceof Error ? err.message : String(err);
    const passToRedact = config?.pass || '';

    // Safe server logging with zero secret exposure
    console.error('[Contact API Error]', {
      name: err instanceof Error ? err.name : 'UnknownError',
      code: (err as any)?.code || 'UNKNOWN',
      command: (err as any)?.command || 'UNKNOWN',
      responseCode: (err as any)?.responseCode,
      message: redactSecrets(rawError, passToRedact),
    });

    let userFacingError = 'Unable to send enquiry. Please try again.';
    if (rawError.includes('535') || rawError.includes('BadCredentials') || (err as any)?.responseCode === 535) {
      userFacingError =
        'Google SMTP authentication failed (535 Bad Credentials). Please ensure a 16-character Google App Password is set in server environment variables.';
    } else if (rawError.includes('ENOTFOUND') || rawError.includes('EBUSY') || rawError.includes('getaddrinfo')) {
      userFacingError =
        'Mail server host resolution failed. Please verify that SMTP_HOST is set to smtp.gmail.com.';
    } else if (rawError.includes('ETIMEDOUT') || rawError.includes('ECONNREFUSED') || rawError.includes('ESOCKETTIMEDOUT')) {
      userFacingError =
        'Connection to the mail server timed out or was refused on the configured port.';
    } else {
      userFacingError = redactSecrets(rawError, passToRedact);
    }

    return res.status(500).json({
      success: false,
      message: 'Unable to send enquiry. Please try again.',
      error: userFacingError,
    });
  }
}
