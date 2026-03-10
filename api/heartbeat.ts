import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("[HEARTBEAT] Missing Supabase environment variables.");
      return res.status(200).json({
        status: "heartbeat skipped - missing config",
        timestamp: new Date().toISOString()
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Lightweight query to keep the database active
    const { error } = await supabase
      .from("contact_submissions")
      .select("id")
      .limit(1);

    if (error) {
      console.warn("[HEARTBEAT] Query returned an error but db was woken up:", error);
    }

    return res.status(200).json({
      status: "heartbeat ok",
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("[HEARTBEAT] Unexpected error:", error);

    // Never crash, safely return 200
    return res.status(200).json({
      status: "heartbeat attempted",
      timestamp: new Date().toISOString()
    });
  }
}
