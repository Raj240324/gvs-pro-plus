import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { z } from 'zod';

// ============================================================
// 🔒 SECURITY LAYER 1: CORS — Origin Allowlist
// ============================================================
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://gvs-pro-plus.vercel.app',
  'https://www.gvscontrols.com',
  'https://gvscontrols.com',
];

function getCorsHeaders(origin: string | undefined) {
  const isAllowed = origin && allowedOrigins.includes(origin);
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[2],
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

// ============================================================
// 🔒 SECURITY LAYER 2: Rate Limiting — IP-based (in-memory)
// ============================================================
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();
const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 minutes
const RATE_LIMIT_MAX_REQUESTS = 2; // Max 2 requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean up old entries periodically
  if (rateLimitMap.size > 500) {
    for (const [key, val] of rateLimitMap) {
      if (now - val.firstRequest > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!entry || now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  return false;
}

// ============================================================
// 🔒 SECURITY LAYER 3: Zod Schema Validation
// ============================================================
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .regex(/^[^\d]*$/, 'Name should not contain numbers'),
  email: z
    .string()
    .email('Invalid email address')
    .max(254, 'Email must be under 254 characters'),
  phone: z
    .string()
    .max(20, 'Phone must be under 20 characters')
    .regex(/^[\d\s\+\-\(\)]*$/, 'Invalid phone format')
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .max(200, 'Subject must be under 200 characters')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be under 5000 characters'),
  bot_honey: z.string().optional(), // Honeypot field
});

// ============================================================
// 🔒 SECURITY LAYER 4: XSS Sanitization
// ============================================================
function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>');
}

// ============================================================
// 📧 Email Template (Branded GVS Controls)
// ============================================================
function createEmailTemplate(
  isOwner: boolean,
  data: { name: string; email: string; phone?: string; subject?: string; message: string }
): string {
  const baseUrl = 'https://gvs-pro-plus.vercel.app';
  const logoUrl = `${baseUrl}/gvs-logo.png`;

  // Sanitize all user inputs before rendering in HTML
  const name = sanitizeHtml(data.name);
  const email = sanitizeHtml(data.email);
  const phone = data.phone ? sanitizeHtml(data.phone) : 'Not provided';
  const subject = data.subject ? sanitizeHtml(data.subject) : 'General Inquiry';
  const message = sanitizeHtml(data.message);

  // Safe email for href (encode for mailto)
  const safeEmailHref = encodeURIComponent(data.email);
  const safeSubjectHref = encodeURIComponent(data.subject || 'Your Inquiry');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>GVS Controls</title>
<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #f4f7fb;
    font-family: "Segoe UI", Roboto, Arial, sans-serif;
    color: #1f2937;
  }
  .wrapper {
    max-width: 640px;
    margin: 0 auto;
    padding: 24px 12px;
  }
  .container {
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
  }
  .header {
    background: linear-gradient(135deg, #1f4fd8 0%, #2ec4b6 100%);
    padding: 28px 24px;
    text-align: center;
  }
  .logo {
    width: 68px;
    height: auto;
    margin-bottom: 10px;
  }
  .brand {
    font-size: 22px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 1px;
  }
  .brand span {
    color: #ffdddd;
  }
  .tagline {
    font-size: 13px;
    color: rgba(255,255,255,0.85);
    margin-top: 4px;
  }
  .content {
    padding: 28px 24px;
  }
  .title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
  }
  .text {
    font-size: 14px;
    color: #4b5563;
    line-height: 1.7;
  }
  .info-box {
    margin-top: 20px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }
  .row {
    display: flex;
    padding: 12px 14px;
    border-bottom: 1px solid #e5e7eb;
  }
  .row:last-child {
    border-bottom: none;
  }
  .label {
    width: 110px;
    font-size: 12px;
    text-transform: uppercase;
    color: #6b7280;
    font-weight: 600;
  }
  .value {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    color: #111827;
  }
  .value a {
    color: #1f4fd8;
    text-decoration: none;
  }
  .message-box {
    margin-top: 20px;
    padding: 16px;
    background: #f9fafb;
    border-left: 4px solid #2ec4b6;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.8;
  }
  .cta {
    margin-top: 28px;
    text-align: center;
  }
  .btn {
    display: inline-block;
    padding: 14px 34px;
    background: #c40000;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    border-radius: 30px;
    text-decoration: none;
  }
  .footer {
    background: #1f2937;
    padding: 22px;
    text-align: center;
    color: #9ca3af;
    font-size: 12px;
  }
  .footer strong {
    color: #ffffff;
  }
  .footer a {
    color: #2ec4b6;
    text-decoration: none;
    margin: 0 6px;
  }
</style>
</head>
<body>
<div class="wrapper">
  <div class="container">
    <!-- HEADER -->
    <div class="header">
      <img src="${logoUrl}" class="logo" alt="GVS Controls Logo" />
      <div class="brand">GVS <span>CONTROLS</span></div>
      <div class="tagline">Electrical • Instrumentation • Automation</div>
    </div>

    <!-- CONTENT -->
    <div class="content">
      ${
        isOwner
        ? `
        <div class="title">New Website Inquiry</div>
        <p class="text">A new contact request has been received through the GVS Controls website.</p>

        <div class="info-box">
          <div class="row"><div class="label">Name</div><div class="value">${name}</div></div>
          <div class="row"><div class="label">Email</div><div class="value"><a href="mailto:${safeEmailHref}">${email}</a></div></div>
          <div class="row"><div class="label">Phone</div><div class="value">${phone}</div></div>
          <div class="row"><div class="label">Subject</div><div class="value">${subject}</div></div>
        </div>

        <div class="message-box">${message}</div>

        <div class="cta">
          <a class="btn" href="mailto:${safeEmailHref}?subject=Re: ${safeSubjectHref}">Reply to Customer</a>
        </div>
        `
        : `
        <div class="title">Thank You for Contacting GVS Controls</div>
        <p class="text">
          Dear ${name},<br><br>
          We have received your inquiry. Our technical team will review your message and respond within <strong>24 business hours</strong>.
        </p>

        <div class="message-box">${message}</div>

        <p class="text" style="margin-top:20px;">
          For urgent matters, you may reach us directly.
        </p>

        <div class="cta">
          <a class="btn" href="${baseUrl}/services">View Our Services</a>
        </div>
        `
      }
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <strong>GVS CONTROLS</strong><br />
      Electrical, Instrumentation &amp; Automation Solutions<br><br>
      &#128222; <a href="tel:+917338880027">+91 73388 80027</a> |
      &#9993;&#65039; <a href="mailto:projects@gvscontrols.com">projects@gvscontrols.com</a><br><br>
      &copy; ${new Date().getFullYear()} GVS Controls
    </div>
  </div>
</div>
</body>
</html>
`;
}

// ============================================================
// 🚀 Main Handler
// ============================================================
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- Security Headers ---
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // --- CORS ---
  const corsHeaders = getCorsHeaders(req.headers.origin as string);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // --- 🔒 LAYER 5: Honeypot Check (silent bot trap) ---
    if (req.body?.bot_honey) {
      console.warn('[SECURITY] Bot detected by honeypot:', {
        ip: (req.headers['x-forwarded-for'] as string)?.split(',')[0],
        timestamp: new Date().toISOString(),
      });
      // Return fake success to confuse the bot
      return res.status(200).json({ success: true });
    }

    // --- 🔒 LAYER 3: Zod Schema Validation ---
    const parseResult = contactSchema.safeParse(req.body);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0];
      return res.status(400).json({
        error: firstError?.message || 'Invalid form data',
      });
    }
    const { name, email, phone, subject, message } = parseResult.data;

    // --- 🔒 LAYER 2: Rate Limiting ---
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket?.remoteAddress ||
      'unknown';

    if (clientIp !== 'unknown' && isRateLimited(clientIp)) {
      console.warn('[SECURITY] Rate limit exceeded:', {
        ip: clientIp,
        timestamp: new Date().toISOString(),
      });
      return res.status(429).json({
        error: 'Too many requests. Please try again in a few minutes.',
      });
    }

    // --- 📧 Send Emails via Resend SDK ---
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('[CONFIG] Missing RESEND_API_KEY environment variable');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const resend = new Resend(resendApiKey);
    const formData = { name, email, phone: phone || '', subject: subject || '', message };
    const emailSubject = `New Inquiry: ${subject || 'General'}`;

    // Send owner notification email
    const { error: ownerError } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['nagarajan.webdev@gmail.com'],
      subject: emailSubject,
      html: createEmailTemplate(true, formData),
    });

    if (ownerError) {
      console.error('[EMAIL] Owner notification failed:', ownerError);
      throw new Error('Failed to send notification email');
    }

    // Send auto-reply to customer (non-fatal)
    try {
      const { error: replyError } = await resend.emails.send({
        from: 'GVS Controls <onboarding@resend.dev>',
        to: [email],
        subject: 'We received your message - GVS Controls',
        html: createEmailTemplate(false, formData),
      });

      if (replyError) {
        console.warn('[EMAIL] Auto-reply failed (non-fatal):', replyError);
      }
    } catch (replyErr) {
      console.warn('[EMAIL] Auto-reply exception (non-fatal):', replyErr);
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('[ERROR] Contact form error:', error);
    // Never expose internal error details to the client
    return res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
}
