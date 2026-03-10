import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { z } from 'zod';

// ============================================================
// 🔧 CONFIG
// ============================================================

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://gvs-pro-plus.vercel.app',
  'https://www.gvscontrols.com',
  'https://gvscontrols.com',
];

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

// ~5 KB hard cap for request body JSON payload
const MAX_REQUEST_BODY_BYTES = 5 * 1024;

// Rate limit: max N requests per window per IP
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();
// 3 requests / 10 minutes — better at absorbing bursts of spam
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

// Time trap: require human-like delay between form render and submit
const MIN_FORM_TIME_MS = 4_000; // 4 seconds
const MAX_FORM_TIME_MS = 15 * 60 * 1000; // 15 minutes

// Small allowlist of known disposable email providers (extend as needed)
const DISPOSABLE_EMAIL_DOMAINS = new Set<string>([
  'mailinator.com',
  '10minutemail.com',
  'tempmail.com',
  'guerrillamail.com',
  'yopmail.com',
  'temp-mail.org',
  'fakeinbox.com',
  'sharklasers.com',
  'maildrop.cc',
  'trashmail.com',
]);

// ============================================================
// 🔒 SECURITY LAYER 1: CORS — Origin Allowlist
// ============================================================
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
    .or(z.literal(''))
    .refine((val) => {
      if (!val) return true;
      const digits = val.replace(/\D/g, '');
      return digits.length === 10;
    }, { message: 'Phone must be exactly 10 digits' }),
  subject: z
    .string()
    .max(200, 'Subject must be under 200 characters')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters'),
  bot_honey: z.string().optional(), // Honeypot field (must be empty)
  startedAt: z.number().int().nonnegative(), // client-side form render timestamp (ms)
  turnstileToken: z
    .string()
    .min(10, 'Turnstile verification required')
    .max(10_000, 'Invalid Turnstile token'),
});

// ============================================================
// 🔒 SECURITY LAYER 4: Sanitization Helpers
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

function sanitizePlain(str: string): string {
  // Trim and strip control characters and angle brackets
  return str.trim().replace(/[\u0000-\u001F\u007F<>]/g, '');
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
// 🔒 SECURITY LAYER 5: Turnstile Verification
// ============================================================
async function verifyTurnstileToken(token: string, ip: string | undefined) {
  if (!TURNSTILE_SECRET_KEY) {
    console.error('[CONFIG] Missing TURNSTILE_SECRET_KEY environment variable');
    return false;
  }

  try {
    const params = new URLSearchParams();
    params.append('secret', TURNSTILE_SECRET_KEY);
    params.append('response', token);
    if (ip && ip !== 'unknown') {
      params.append('remoteip', ip);
    }

    const resp = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body: params,
    });

    if (!resp.ok) {
      console.warn('[SECURITY] Turnstile HTTP error:', resp.status, resp.statusText);
      return false;
    }

    const data = (await resp.json()) as {
      success: boolean;
      'error-codes'?: string[];
    };

    if (!data.success) {
      console.warn('[SECURITY] Turnstile verification failed:', data['error-codes']);
    }

    return data.success;
  } catch (err) {
    console.error('[SECURITY] Turnstile verification exception:', err);
    return false;
  }
}

// ============================================================
// 🚀 Main Handler
// ============================================================
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- Security Headers ---
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // --- CORS (Security Layer 1) ---
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

  // --- User-Agent validation (before heavy work) ---
  const userAgent = (req.headers['user-agent'] as string | undefined) || '';
  if (!userAgent || /curl|wget|python-requests|httpclient|scrapy|bot|spider|crawler/i.test(userAgent)) {
    console.warn('[SECURITY] Suspicious or missing User-Agent blocked:', userAgent);
    return res.status(400).json({ error: 'Bad request' });
  }

  // --- Optional advanced bot fingerprint: basic Sec-Fetch sanity ---
  const secFetchSite = req.headers['sec-fetch-site'] as string | undefined;
  const secFetchMode = req.headers['sec-fetch-mode'] as string | undefined;
  if (!secFetchSite || !secFetchMode) {
    console.warn('[SECURITY] Missing Sec-Fetch headers, likely non-browser client', {
      ip: (req.headers['x-forwarded-for'] as string) ?? 'unknown',
    });
    return res.status(400).json({ error: 'Bad request' });
  }

  // --- Payload size limit (approx) ---
  try {
    const estimatedSize =
      typeof req.body === 'string'
        ? Buffer.byteLength(req.body, 'utf8')
        : Buffer.byteLength(JSON.stringify(req.body ?? {}), 'utf8');

    if (estimatedSize > MAX_REQUEST_BODY_BYTES) {
      console.warn('[SECURITY] Payload too large:', estimatedSize);
      return res.status(413).json({ error: 'Payload too large' });
    }
  } catch (sizeErr) {
    console.warn('[SECURITY] Failed to estimate payload size:', sizeErr);
  }

  // --- Client IP (used by multiple layers) ---
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  // --- Rate limiting (Security Layer 2, IP based) ---
  if (clientIp !== 'unknown' && isRateLimited(clientIp)) {
    console.warn('[SECURITY] Rate limit exceeded:', {
      ip: clientIp,
      timestamp: new Date().toISOString(),
    });
    return res.status(429).json({
      error: 'Too many requests. Please try again in a few minutes.',
    });
  }

  try {
    // --- Honeypot Check (silent bot trap) ---
    if (req.body?.bot_honey) {
      console.warn('[SECURITY] Bot detected by honeypot:', {
        ip: clientIp,
        timestamp: new Date().toISOString(),
      });
      // Return fake success to avoid leaking detection
      return res.status(200).json({ success: true });
    }

    // --- Zod Schema Validation (Security Layer 3) ---
    const parseResult = contactSchema.safeParse(req.body);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0];
      return res.status(400).json({
        error: firstError?.message || 'Invalid form data',
      });
    }

    const { name, email, phone, subject, message, startedAt, turnstileToken } = parseResult.data;

    // --- Time trap (min/max form fill time) ---
    const now = Date.now();
    const delta = now - startedAt;
    if (delta < MIN_FORM_TIME_MS || delta > MAX_FORM_TIME_MS) {
      console.warn('[SECURITY] Time trap triggered:', {
        ip: clientIp,
        delta,
        startedAt,
        now,
      });
      return res.status(400).json({ error: 'Security check failed' });
    }

    // --- Normalize email and disposable email blocking ---
    const normalizedEmail = sanitizePlain(email).toLowerCase();
    const emailDomain = normalizedEmail.split('@')[1] ?? '';
    if (DISPOSABLE_EMAIL_DOMAINS.has(emailDomain)) {
      console.warn('[SECURITY] Disposable email blocked:', {
        ip: clientIp,
        email,
      });
      return res.status(400).json({ error: 'Please use a valid business or personal email address.' });
    }

    // --- Turnstile verification ---
    const turnstileOk = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!turnstileOk) {
      return res.status(400).json({ error: 'Turnstile verification failed. Please refresh and try again.' });
    }

    // --- Final sanitization for email content ---
    const safeName = sanitizePlain(name);
    const safeEmail = normalizedEmail;
    const safePhone = phone ? sanitizePlain(phone) : '';
    const safeSubject = subject ? sanitizePlain(subject) : '';
    const safeMessage = message.trim();

    // --- Send Emails via Resend SDK ---
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('[CONFIG] Missing RESEND_API_KEY environment variable');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const resend = new Resend(resendApiKey);
    const formData = {
      name: safeName,
      email: safeEmail,
      phone: safePhone || '',
      subject: safeSubject || '',
      message: safeMessage,
    };
    // Prevent any header injection via CRLF
    const headerSafeSubject = (safeSubject || 'General').replace(/[\r\n]/g, '');
    const emailSubject = `New Inquiry: ${headerSafeSubject}`;

    // Owner notification email
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

    // Auto-reply to customer (non-fatal)
    try {
      const { error: replyError } = await resend.emails.send({
        from: 'GVS Controls <onboarding@resend.dev>',
        to: [safeEmail],
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
    console.error('[ERROR] Contact form error:', {
      message: error instanceof Error ? error.message : String(error),
      ip: clientIp,
      timestamp: new Date().toISOString(),
    });
    // Never expose internal error details to the client
    return res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
}
