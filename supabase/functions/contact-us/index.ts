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

    const emailSubject = `New Inquiry: ${subject || 'General'}`
    
    // Helper to generate professional HTML email
    const createEmailTemplate = (isOwner: boolean) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; -webkit-font-smoothing: antialiased; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #eaeaea; }
          .header { background: linear-gradient(135deg, #0d9488 0%, #7c3aed 100%); padding: 40px 20px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .subtitle { color: rgba(255,255,255,0.9); font-size: 14px; margin-top: 5px; font-weight: 500; }
          .content { padding: 40px 30px; background-color: #ffffff; }
          .section-title { color: #0d9488; font-size: 18px; font-weight: 700; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.5px; }
          .footer { background: #f9fafb; color: #6b7280; padding: 30px; text-align: center; font-size: 12px; border-top: 1px solid #eaeaea; }
          .info-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-top: 10px; }
          .info-table tr {  }
          .info-table td { padding: 12px 0; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
          .info-table td:last-child { border-bottom: none; }
          .label { font-weight: 600; width: 120px; color: #4b5563; font-size: 14px; }
          .value { color: #111827; font-size: 14px; }
          .message-box { background-color: #f8fafc; border-left: 4px solid #7c3aed; padding: 20px; margin: 20px 0; border-radius: 4px; font-style: italic; color: #4b5563; }
          .button { display: inline-block; background: linear-gradient(to right, #0d9488, #7c3aed); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 50px; font-weight: 600; margin-top: 25px; font-size: 14px; box-shadow: 0 4px 6px rgba(13, 148, 136, 0.2); }
          .links { margin-top: 20px; }
          .links a { color: #0d9488; text-decoration: none; margin: 0 10px; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
             <h1>GVS CONTROLS</h1>
             <div class="subtitle">Electrical • Automation • Turnkey Solutions</div>
          </div>
          <div class="content">
            ${isOwner ? `
              <div class="section-title">New Website Lead</div>
              <p style="margin-bottom: 20px;">You have received a new inquiry from the website contact form.</p>
              
              <table class="info-table">
                <tr><td class="label">Name</td><td class="value"><strong>${name}</strong></td></tr>
                <tr><td class="label">Email</td><td class="value"><a href="mailto:${email}" style="color: #0d9488; text-decoration: none;">${email}</a></td></tr>
                <tr><td class="label">Phone</td><td class="value">${phone || '<span style="color:#9ca3af">Not Find</span>'}</td></tr>
                <tr><td class="label">Subject</td><td class="value">${subject || 'General Inquiry'}</td></tr>
              </table>

              <div style="margin-top: 30px;">
                <div class="label" style="margin-bottom: 10px;">Message:</div>
                <div class="message-box">"${message}"</div>
              </div>
              
              <center>
                <a href="mailto:${email}" class="button">Reply to Lead</a>
              </center>
            ` : `
              <div class="section-title">We Received Your Message</div>
              <p>Dear <strong>${name}</strong>,</p>
              <p>Thank you for reaching out to <strong>GVS Controls</strong>. We have successfully received your inquiry regarding <strong>"${subject || 'General Inquiry'}"</strong>.</p>
              <p>Our team is currently reviewing your request and will get back to you within <strong>24 business hours</strong>.</p>
              
              <div style="margin-top: 25px; margin-bottom: 5px; font-weight: 600; color: #4b5563;">Your Message Copy:</div>
              <div class="message-box">"${message}"</div>

              <center>
                <a href="https://gvs-pro-plus.vercel.app" class="button">Visit Our Website</a>
              </center>
            `}
          </div>
          <div class="footer">
            <p style="font-weight: 600; color: #374151; font-size: 14px; margin-bottom: 5px;">GVS Controls</p>
            <p>Plot No.1476, Segundram Main Road, Gokulapuram-MaraimalaiNagar<br>Chengalpattu, Tamil Nadu - 603209</p>
            <p>Phone: +91 7338880027 | Email: projects@gvscontrols.com</p>
            <div class="links">
              <a href="https://gvs-pro-plus.vercel.app">Website</a> • 
              <a href="https://gvs-pro-plus.vercel.app/services">Services</a> • 
              <a href="https://gvs-pro-plus.vercel.app/contact">Contact</a>
            </div>
            <p style="margin-top: 20px; color: #9ca3af;">&copy; ${new Date().getFullYear()} GVS Controls. All rights reserved.</p>
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
