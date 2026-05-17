-- ============================================================================
-- Day by Day — "A message from David" welcome flag
-- ----------------------------------------------------------------------------
-- Status: PROPOSED. Review, then apply manually via the Supabase dashboard
--         SQL editor. Safe to run more than once.
--
-- Records that a participant has seen the one-time welcome message, shown
-- once after the baseline assessment. NULL => not yet seen.
-- ============================================================================

alter table public.user_profiles
  add column if not exists welcome_seen_at timestamptz;
