# GitHub Actions — Workflow Documentation

## Active Workflows

### supabase-heartbeat.yml ✅ ACTIVE
- **Purpose:** Prevents Supabase Free Tier from auto-pausing after inactivity
- **Schedule:** Every 30 minutes
- **Endpoint:** /api/heartbeat
- **Do not disable**

## Disabled Workflows

### system-monitor.yml ⛔ DISABLED
- **Reason:** Replaced by UptimeRobot (free external monitoring)
- **UptimeRobot monitors:**
  - https://gvscontrols.com → every 5 minutes
  - https://gvscontrols.com/api/system-health → every 5 minutes
  - https://gvscontrols.com/api/heartbeat → every 30 minutes
- **Alert contact:** Owner email + WhatsApp

## External Monitoring
- Tool: UptimeRobot (free plan)
- Dashboard: https://uptimerobot.com
- Monitors: 3 active monitors
- Alert method: Email + (optional) WhatsApp
