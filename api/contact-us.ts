import type { VercelRequest, VercelResponse } from '@vercel/node';

// --- CORS ---
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
    'Access-Control-Allow-Origin': isAllowed ? origin : 'https://gvs-pro-plus.vercel.app',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

// --- Simple In-Memory Rate Limiter ---
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const lastRequest = rateLimitMap.get(ip);
  if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW_MS) {
    return true;
  }
  rateLimitMap.set(ip, now);
  // Cleanup old entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, timestamp] of rateLimitMap) {
      if (now - timestamp > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(key);
      }
    }
  }
  return false;
}

// --- Email Template ---
function createEmailTemplate(
  isOwner: boolean,
  data: { name: string; email: string; phone?: string; subject?: string; message: string }
): string {
  const baseUrl = 'https://gvs-pro-plus.vercel.app';
  const logoUrl = `${baseUrl}/gvs-logo.png`;
  const { name, email, phone, subject, message } = data;

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
          <div class="row"><div class="label">Email</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>
          <div class="row"><div class="label">Phone</div><div class="value">${phone || "Not provided"}</div></div>
          <div class="row"><div class="label">Subject</div><div class="value">${subject || "General Inquiry"}</div></div>
        </div>

        <div class="message-box">${message}</div>

        <div class="cta">
          <a class="btn" href="mailto:${email}?subject=Re: ${subject || "Your Inquiry"}">Reply to Customer</a>
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
      Electrical, Instrumentation & Automation Solutions<br><br>
      📞 <a href="tel:+917338880027">+91 73388 80027</a> |
      ✉️ <a href="mailto:projects@gvscontrols.com">projects@gvscontrols.com</a><br><br>
      © ${new Date().getFullYear()} GVS Controls
    </div>
  </div>
</div>
</body>
</html>
`;
}

// --- Main Handler ---
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const corsHeaders = getCorsHeaders(req.headers.origin as string);

  // Set CORS headers
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
    const { name, email, phone, subject, message, bot_honey } = req.body;

    // 1. Honeypot Check
    if (bot_honey) {
      console.warn('Bot detected by honeypot:', { name, email });
      return res.status(200).json({ success: true }); // Fake success
    }

    // 2. Input Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, message' });
    }
    if (name.length > 100 || (subject && subject.length > 200) || message.length > 5000) {
      return res.status(400).json({ error: 'Input too long' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // 3. Rate Limiting
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket?.remoteAddress ||
      'unknown';

    if (clientIp !== 'unknown' && isRateLimited(clientIp)) {
      console.warn('Rate limit exceeded for IP:', clientIp);
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    // 4. Send Emails via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY environment variable');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const formData = { name, email, phone, subject, message };
    const emailSubject = `New Inquiry: ${subject || 'General'}`;

    // Send to Owner
    const ownerRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>',
        to: ['nagarajan.webdev@gmail.com'],
        subject: emailSubject,
        html: createEmailTemplate(true, formData),
      }),
    });

    if (!ownerRes.ok) {
      const errorText = await ownerRes.text();
      console.error('Resend Error (Owner):', errorText);
      throw new Error(`Failed to send email to owner: ${errorText}`);
    }

    // Send Auto-reply to Customer (non-fatal)
    try {
      const replyRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'GVS Controls <onboarding@resend.dev>',
          to: [email],
          subject: 'We received your message - GVS Controls',
          html: createEmailTemplate(false, formData),
        }),
      });

      if (!replyRes.ok) {
        console.warn('Auto-reply failed (non-fatal):', await replyRes.text());
      }
    } catch (replyError) {
      console.warn('Auto-reply exception (non-fatal):', replyError);
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
