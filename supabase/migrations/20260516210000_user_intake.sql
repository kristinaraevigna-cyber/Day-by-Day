-- ============================================================================
-- Day by Day — user intake form
-- ----------------------------------------------------------------------------
-- Status: PROPOSED. Review, then apply manually via the Supabase dashboard
--         SQL editor. Safe to run more than once (idempotent guards used).
--
-- One row per user. Completed once after signup + consent (required gate).
-- completed_at NULL  => intake not finished; the app shows the intake form.
-- ============================================================================

create table if not exists public.user_intake (
  user_id                     uuid primary key references auth.users (id) on delete cascade,

  -- A. About you
  age_range                   text,
  gender                      text,
  race_ethnicity              jsonb not null default '[]'::jsonb,  -- multi-select
  nationality                 text,
  primary_language            text,
  education                   text,
  role                        text,
  department                  text,

  -- B. Leadership level & experience
  leadership_level            text,
  years_leadership            text,
  years_healthcare            text,
  direct_reports              text,
  prior_leadership_development text,

  -- C. Coaching
  coached_before              boolean,
  currently_coached           boolean,
  coaching_interest           text,

  -- D. Development focus — chosen competencies (framework items + custom),
  --    stored as an array of strings
  focus_competencies          jsonb not null default '[]'::jsonb,

  -- E. Goals
  goals                       text,

  completed_at                timestamptz,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);

-- Row-level security: each user reads/writes only their own intake row.
alter table public.user_intake enable row level security;

drop policy if exists "own rows" on public.user_intake;
create policy "own rows" on public.user_intake
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================================
-- End of user intake migration
-- ============================================================================
