# Day by Day — Demo Walkthrough

Working notes for running the demo. Updated as features land.

## Admin setup (one-time)

The demo controls are gated on `user_profiles.is_admin`. To make the demo
account an admin, run this in the Supabase SQL editor:

```sql
update user_profiles set is_admin = true
where user_id = (select id from auth.users where email = 'DEMO_EMAIL_HERE');
```

Reload the app afterward.

## Demo controls

For an admin account, the controls live in the **sidebar footer** (desktop),
just above "Privacy Settings":

- **Demo Mode (ON/OFF)** — when ON, every Leader/Leadership Development
  construct is treated as unlocked, so the locked-vs-unlocked UX can be shown
  on demand.
- **Demo wave (1 / 2 / 3 / 4 / Off)** — pins the account to a specific
  assessment wave. The Assessments page recomputes its wave-card statuses
  against the pin (waves before it show Completed, the pinned wave shows
  Available now, later waves show Not yet available). "Off" returns to
  date-based eligibility. This lets the four waves be shown in minutes
  instead of weeks.

## Walkthrough steps

_To be finalized in the polish pass (build step 17)._
