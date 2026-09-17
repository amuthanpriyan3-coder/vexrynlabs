import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ override: true });

const app = express();
const PORT = 3000;

// Enable CORS and handle preflight OPTIONS requests
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  if (_req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Handle JSON body parser errors gracefully
app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ success: false, error: 'Malformed JSON payload.' });
  }
  next();
});

// Target recipient email
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

// Check if SMTP is configured
function isEmailConfigured(): boolean {
  const pass = getSanitizedSmtpPass();
  return pass.length > 0;
}

// Lazy nodemailer transporter helper
function getTransporter() {
  const user = process.env.SMTP_USER || process.env.GMAIL_USER || 'vexrynlabs@gmail.com';
  const pass = getSanitizedSmtpPass();

  if (!pass) {
    throw new Error('SMTP credentials are not configured. Please supply SMTP_PASS in environment variables.');
  }

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;

  console.log(`[SMTP] Initializing transporter for ${user}@${host}:${port} (secure: ${secure})`);

  return nodemailer.createTransport({
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
}

// API: Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SEO: Serve sitemap.xml with explicit XML content-type and HTTP 200
const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vexrynlabs.vercel.app/</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vexrynlabs.vercel.app/services</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vexrynlabs.vercel.app/projects</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vexrynlabs.vercel.app/about</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://vexrynlabs.vercel.app/process</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://vexrynlabs.vercel.app/contact</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

const ROBOTS_TXT = `# robots.txt for https://vexrynlabs.vercel.app/
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://vexrynlabs.vercel.app/sitemap.xml
`;

app.get('/sitemap.xml', (_req, res) => {
  res.header('Content-Type', 'application/xml; charset=utf-8');
  res.status(200).send(SITEMAP_XML);
});

app.get('/robots.txt', (_req, res) => {
  res.header('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(ROBOTS_TXT);
});

// API: Check email service configuration status
app.get('/api/contact/status', (_req, res) => {
  res.json({
    configured: isEmailConfigured(),
    recipient: RECIPIENT_EMAIL,
  });
});

// API: Contact enquiry submission
app.post(['/api/contact', '/api/contact/'], async (req, res) => {
  try {
    const { name, email, phone, phoneNumber, projectType, message } = req.body;
    const clientPhone = (phone || phoneNumber || '').toString().trim();
    console.log(
      `[Contact API] Received submission from: "${name}" <${email}>, Phone: "${clientPhone}" for "${projectType}"`
    );

    // Validate inputs
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name / Company is required.',
        error: 'Name / Company is required.',
      });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.',
        error: 'A valid email address is required.',
      });
    }

    // Validate phone number
    const digits = clientPhone.replace(/\D/g, '');
    const phoneValidChar = /^[+]?[\d\s().-]{7,25}$/.test(clientPhone);
    if (!clientPhone || !phoneValidChar || digits.length < 8 || digits.length > 15) {
      return res.status(400).json({
        success: false,
        message: 'A valid phone number is required (e.g. +91 98765 43210).',
        error: 'A valid phone number is required.',
      });
    }

    if (!projectType || typeof projectType !== 'string' || !projectType.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Project Type selection is required.',
        error: 'Project Type selection is required.',
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Project message / scope is required (minimum 5 characters).',
        error: 'Project message / scope is required.',
      });
    }

    // Check if email transport is configured
    if (!isEmailConfigured()) {
      console.warn('[Contact API] Rejected: SMTP credentials are not configured on the server');
      return res.status(503).json({
        success: false,
        configured: false,
        message:
          'Email delivery service is currently not configured on the server. Please contact vexrynlabs@gmail.com directly.',
        error:
          'Email delivery service is not yet configured on the server. Please set SMTP_USER and SMTP_PASS in your server environment variables.',
      });
    }

    const transporter = getTransporter();
    const senderAddress = process.env.SMTP_USER || process.env.GMAIL_USER || 'vexrynlabs@gmail.com';

    const mailOptions = {
      from: `"VEXRYN LABS Contact Form" <${senderAddress}>`,
      to: RECIPIENT_EMAIL,
      replyTo: `"${name.trim()}" <${email.trim()}>`,
      subject: `[VEXRYN LABS] New Project Enquiry: ${projectType.trim()} — ${name.trim()}`,
      text: `
New Project Enquiry Received via VEXRYN LABS

Name / Company: ${name.trim()}
Client Email: ${email.trim()}
Phone Number: ${clientPhone}
Project Type: ${projectType.trim()}

Message:
${message.trim()}

---
Submitted at: ${new Date().toUTCString()}
Reply directly to this email to contact the client at ${email.trim()} or call ${clientPhone}.
      `.trim(),
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
    console.error('Error sending contact enquiry email:', err);
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
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Vite middleware & Static serving
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      if (req.path === '/sitemap.xml') {
        res.header('Content-Type', 'application/xml; charset=utf-8');
        return res.status(200).send(SITEMAP_XML);
      }
      if (req.path === '/robots.txt') {
        res.header('Content-Type', 'text/plain; charset=utf-8');
        return res.status(200).send(ROBOTS_TXT);
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[VEXRYN LABS] Server running on http://0.0.0.0:${PORT}`);
  });
}

setupViteOrStatic().catch((err) => {
  console.error('Failed to start server:', err);
});
