// @ts-nocheck
// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://gvs-pro-plus.vercel.app',
  'https://www.gvscontrols.com',
  'https://gvscontrols.com'
];

serve(async (req) => {
  const origin = req.headers.get('origin')
  const isAllowed = origin && allowedOrigins.includes(origin)
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'https://gvs-pro-plus.vercel.app',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, phone, subject, message, bot_honey } = await req.json()

    // 1. Honeypot Check (Anti-Bot)
    if (bot_honey) {
      console.warn('Bot detected by honeypot:', { name, email, bot_honey })
      // Return fake success to confuse the bot
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
    }

    // 2. Input Validation (Security)
    if (!name || !email || !message) {
      throw new Error('Missing required fields')
    }
    if (name.length > 100 || subject?.length > 200 || message.length > 5000) {
      throw new Error('Input too long')
    }

    // 1. Insert into Supabase Database
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 3. Rate Limiting (IP-Based)
    // Get client IP from headers (Cloudflare/Vercel standard headers)
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

    // Check for recent submissions from this IP (e.g., last 2 minutes)
    if (clientIp !== 'unknown') {
      const { data: recentRequests, error: rateLimitError } = await supabaseClient
        .from('contact_requests')
        .select('created_at')
        .eq('client_ip', clientIp)
        .gte('created_at', new Date(Date.now() - 2 * 60 * 1000).toISOString()) // 2 minutes ago

      if (rateLimitError) {
          console.error('Rate limit check error:', rateLimitError);
      } else if (recentRequests && recentRequests.length >= 1) { // Max 1 request per 2 mins
          console.warn('Rate limit exceeded for IP:', clientIp);
          return new Response(
            JSON.stringify({ error: 'Too many requests. Please try again later.' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
          )
      }
    }

    // 4. Insert into Supabase Database
    const { error: dbError } = await supabaseClient
      .from('contact_requests')
      .insert([
        { name, email, phone, subject, message, client_ip: clientIp },
      ])

    if (dbError) throw dbError

    // 5. Send Email via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('Missing RESEND_API_KEY')
    }

    // Professional Email Template with GVS Branding
    const emailSubject = `New Inquiry: ${subject || 'General'}`;
    // Use staging URL until production domain is active
    const baseUrl = 'https://gvs-pro-plus.vercel.app';
    const logoUrl = `${baseUrl}/gvs-logo.png`;
    
const createEmailTemplate = (isOwner: boolean) => `
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

  /* HEADER */
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

  /* CONTENT */
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

  /* INFO TABLE */
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

  /* MESSAGE */
  .message-box {
    margin-top: 20px;
    padding: 16px;
    background: #f9fafb;
    border-left: 4px solid #2ec4b6;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.8;
  }

  /* CTA */
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

  /* FOOTER */
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


    // Send to Owner
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>',
        to: ['nagarajan.webdev@gmail.com'],
        subject: emailSubject,
        html: createEmailTemplate(true),
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('Resend Error (Owner):', errorText)
      throw new Error(`Failed to send email to owner: ${errorText}`)
    }

    // Send Auto-reply to Customer
    // Wrapped in try/catch so it doesn't fail the whole request if customer email is invalid or unverified
    try {
        const replyRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
                from: 'GVS Controls <onboarding@resend.dev>', 
                to: [email],
                subject: 'We received your message - GVS Controls',
                html: createEmailTemplate(false),
            }),
        })
        
        if (!replyRes.ok) {
            console.warn('Auto-reply failed (non-fatal):', await replyRes.text())
        }
    } catch (replyError) {
        console.warn('Auto-reply exception (non-fatal):', replyError)
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
