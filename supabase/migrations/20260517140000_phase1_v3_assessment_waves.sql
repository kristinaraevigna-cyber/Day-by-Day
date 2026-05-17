-- ============================================================================
-- Day by Day — Phase 1 v3: multi-wave assessment battery
-- ----------------------------------------------------------------------------
-- Status: PROPOSED. Review, then apply via the Supabase dashboard SQL editor.
-- Idempotent — safe to re-run.
--
-- NOTE on assessment_responses: this table stores ONE ROW PER ASSESSMENT
-- COMPLETION — all item answers live inside the `responses` jsonb column and
-- computed scores in `results` jsonb. It has NO per-item rows and no
-- item_id / response_value / subscale columns. The instrument is already
-- identified by the existing `assessment_id` column. So this migration adds
-- only `wave_number`; instrument_id and subscale are intentionally NOT added
-- (see the message to the user for the rationale).
-- ============================================================================

-- --- assessment_waves: the 4 program waves (reference data) ------------------
create table if not exists public.assessment_waves (
  wave_number  integer primary key check (wave_number between 1 and 4),
  label        text not null,
  trigger_week integer not null,
  description  text
);

insert into public.assessment_waves (wave_number, label, trigger_week, description) values
  (1, 'Pre / Baseline',      0, 'Baseline battery, taken at enrollment. Gates app access until complete.'),
  (2, 'Week 2 check-in',     2, 'Two-week check-in.'),
  (3, 'Week 4 midpoint',     4, 'Mid-program assessment.'),
  (4, 'Week 8 post-program', 8, 'Post-program assessment.')
on conflict (wave_number) do nothing;

-- --- user_wave_completions: one row per user per wave ------------------------
create table if not exists public.user_wave_completions (
  user_id      uuid not null references auth.users (id) on delete cascade,
  wave_number  integer not null check (wave_number between 1 and 4),
  status       text not null default 'not_started'
               check (status in ('not_started', 'in_progress', 'completed', 'missed')),
  started_at   timestamptz,
  completed_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  primary key (user_id, wave_number)
);

-- --- assessment_responses: tag each completion with its wave -----------------
-- Nullable (not NOT NULL): the table already holds rows, and adding a NOT NULL
-- column without a default would fail. The app always sets wave_number on write.
alter table public.assessment_responses
  add column if not exists wave_number integer;

-- --- user_profiles: enrollment + admin demo wave override --------------------
alter table public.user_profiles
  add column if not exists enrolled_at timestamptz default now();
alter table public.user_profiles
  add column if not exists demo_wave_override integer;

-- --- Row-level security ------------------------------------------------------
alter table public.user_wave_completions enable row level security;
drop policy if exists "own rows" on public.user_wave_completions;
create policy "own rows" on public.user_wave_completions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- assessment_waves is shared reference data — any signed-in user may read it.
alter table public.assessment_waves enable row level security;
drop policy if exists "read waves" on public.assessment_waves;
create policy "read waves" on public.assessment_waves
  for select using (true);

-- ============================================================================
-- End of Phase 1 v3 assessment-waves migration
-- ============================================================================
