-- ============================================================================
-- Day by Day — Phase 1 REVISED schema (well-being-focused demo build)
-- ----------------------------------------------------------------------------
-- Status: PROPOSED. Review, then apply manually via the Supabase dashboard
--         SQL editor. Safe to run more than once (idempotent guards used).
--
-- Supersedes the earlier proposed migration 20260516181500_phase1_demo_schema.sql,
-- which targeted a module-stage architecture that has been dropped. That file
-- was never applied or committed and has been deleted.
--
-- This migration is safe whether or not any earlier migration was partially
-- applied: it CREATEs new tables IF NOT EXISTS and DROPs the dropped tables
-- IF EXISTS.
--
-- New tables:     user_profiles, user_construct_unlocks,
--                 intervention_completions, session_ratings
-- Altered tables: assessment_responses (+phase)
-- Dropped tables: module_stage_completion, assessment_phase_completions,
--                 push_survey_responses (only if a prior migration created them;
--                 they hold no user data — no app code ever wrote to them)
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 0. Remove tables from the dropped module-stage architecture
--    (no-ops unless an earlier migration created them; they were never
--    written to by any app code, so this loses no user data)
-- ----------------------------------------------------------------------------
drop table if exists public.module_stage_completion;
drop table if exists public.assessment_phase_completions;
drop table if exists public.push_survey_responses;


-- ----------------------------------------------------------------------------
-- 1. user_profiles
--    One row per user. enrolled_at drives any future date math.
--    is_admin gates the demo-mode toggle UI.
--    demo_mode_active, when true, makes the app treat every construct as
--    unlocked regardless of user_construct_unlocks (demo only).
--
--    Trimmed vs the earlier proposal: role / has_direct_reports / cohort_id
--    are dropped because onboarding role selection is deferred.
-- ----------------------------------------------------------------------------
create table if not exists public.user_profiles (
  user_id          uuid primary key references auth.users (id) on delete cascade,
  enrolled_at      timestamptz not null default now(),
  is_admin         boolean not null default false,
  demo_mode_active boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);


-- ----------------------------------------------------------------------------
-- 2. user_construct_unlocks
--    One row per (user, construct) the user has unlocked.
--    construct_id matches the in-code Develop area ids:
--      Leader:     identity, awareness, efficacy, regulation, wellbeing
--      Leadership: team-learning, team-coaching, networks, systems
--    The app inserts the 'wellbeing' row at signup / first load — there is
--    no seeded default here. Absence of a row = locked.
-- ----------------------------------------------------------------------------
create table if not exists public.user_construct_unlocks (
  user_id      uuid not null references auth.users (id) on delete cascade,
  construct_id text not null,
  unlocked_at  timestamptz not null default now(),
  primary key (user_id, construct_id)
);


-- ----------------------------------------------------------------------------
-- 3. intervention_completions
--    Tracks a user starting / completing a well-being intervention.
--    intervention_id and construct_id are text keys defined in app code
--    (construct_id is 'wellbeing' for every Phase 1 intervention).
-- ----------------------------------------------------------------------------
create table if not exists public.intervention_completions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users (id) on delete cascade,
  intervention_id text not null,
  construct_id    text not null,
  started_at      timestamptz not null default now(),
  completed_at    timestamptz,
  reflection_text text,
  created_at      timestamptz not null default now()
);


-- ----------------------------------------------------------------------------
-- 4. session_ratings
--    Post-session 3-item rating, one row per coaching session.
--    (Table created now; the rating UI is built in a later phase.)
-- ----------------------------------------------------------------------------
create table if not exists public.session_ratings (
  id                  uuid primary key default gen_random_uuid(),
  coaching_session_id uuid not null references public.coaching_sessions (id) on delete cascade,
  user_id             uuid not null references auth.users (id) on delete cascade,
  helpfulness         integer not null check (helpfulness between 1 and 5),
  insight             integer not null check (insight between 1 and 5),
  readiness           integer not null check (readiness between 1 and 5),
  created_at          timestamptz not null default now(),
  unique (coaching_session_id)
);


-- ----------------------------------------------------------------------------
-- 5. assessment_responses — extension
--    Existing columns (confirmed from client code in App.jsx):
--      id, user_id, assessment_id, responses (jsonb), results (jsonb),
--      completed_at
--    The table is already written on assessment completion; PERMA+4 will
--    save the same way (assessment_id = 'perma4', responses = {itemId:0-10},
--    results = computed dimension scores). Reading past results back is a
--    query-path fix in app code and needs NO schema change.
--    The only addition is `phase`, to tag and compare administrations.
-- ----------------------------------------------------------------------------
alter table public.assessment_responses
  add column if not exists phase text
  check (phase in ('baseline', 'midpoint', 'post', 'check-in'));


-- ----------------------------------------------------------------------------
-- 6. Row-level security on the new tables
--    Each user reads/writes only their own rows.
-- ----------------------------------------------------------------------------
alter table public.user_profiles            enable row level security;
alter table public.user_construct_unlocks   enable row level security;
alter table public.intervention_completions enable row level security;
alter table public.session_ratings          enable row level security;

drop policy if exists "own rows" on public.user_profiles;
create policy "own rows" on public.user_profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own rows" on public.user_construct_unlocks;
create policy "own rows" on public.user_construct_unlocks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own rows" on public.intervention_completions;
create policy "own rows" on public.intervention_completions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own rows" on public.session_ratings;
create policy "own rows" on public.session_ratings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================================
-- End of Phase 1 revised schema
-- ============================================================================
