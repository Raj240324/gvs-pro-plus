import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const report = {
    supabase: { status: "unknown", error: null as string | null },
    contactApi: { status: "unknown", error: null as string | null },
    website: { status: "unknown", error: null as string | null },
    timestamp: new Date().toISOString()
  };

  const domain = "https://gvs-pro-plus.vercel.app";

  /* 1. SUPABASE CHECK (Heartbeat) */
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase
      .from("contact_submissions")
      .select("id")
      .limit(1);

    // If there is an error but it's just about an empty table or similar, it still woke up the DB
    if (error) {
      throw error;
    }

    report.supabase.status = "ok";
  } catch (err: any) {
    report.supabase.status = "failed";
    report.supabase.error = err.message || String(err);
  }

  /* 2. CONTACT API CHECK */
  try {
    const contact = await fetch(`${domain}/api/contact-us`, { method: "OPTIONS" });
    if (contact.ok) {
      report.contactApi.status = "ok";
    } else {
      report.contactApi.status = "failed";
      report.contactApi.error = `HTTP ${contact.status}`;
    }
  } catch (err: any) {
    report.contactApi.status = "failed";
    report.contactApi.error = err.message || String(err);
  }

  /* 3. WEBSITE CHECK */
  try {
    const site = await fetch(domain);
    if (site.ok) {
      // TEMPORARILY FORCE A FAILURE FOR TESTING
      report.website.status = "failed";
      report.website.error = "TEST FORCED FAILURE (HTTP 200 OK)";
    } else {
      report.website.status = "failed";
      report.website.error = `HTTP ${site.status}`;
    }
  } catch (err: any) {
    report.website.status = "failed";
    report.website.error = err.message || String(err);
  }

  /* 4. AUTOMATIC RESEND EMAIL ALERTS */
  const hasFailure = 
    report.supabase.status === "failed" || 
    report.contactApi.status === "failed" || 
    report.website.status === "failed";
  
  if (hasFailure) {
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: 'GVS Monitor <onboarding@resend.dev>',
          to: ['nagarajan.webdev@gmail.com'], // Authorized test recipient
          subject: '⚠️ GVS System Failure Detected',
          html: `
            <h2>System Health Alert</h2>
            <p>One or more critical services for <strong>GVS Controls</strong> have failed their health check.</p>
            <pre style="background:#f4f4f4;padding:15px;border-radius:5px;">${JSON.stringify(report, null, 2)}</pre>
            <p>Please check your Vercel and Supabase dashboards immediately.</p>
          `
        });
      }
    } catch (emailErr) {
      console.error("[MONITOR] Failed to send alert email:", emailErr);
    }
  }

  // Always return 200 so the endpoint itself doesn't crash the monitoring tool
  return res.status(200).json(report);
}
