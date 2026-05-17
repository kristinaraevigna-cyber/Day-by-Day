# Day by Day — Healthcare Demo Rebuild

> Paste this entire file into Claude Code as your opening prompt. **Do not start coding until Phase 0 is complete and the plan is approved.**

---

## Context

**Repo:** `github.com/kristinaraevigna-cyber/Day-by-Day` (you are already in this directory)
**Stack:** Vite + React frontend, Supabase (Postgres + Auth + Edge Functions), Render hosting, OpenAI Realtime API for voice coaching, Anthropic Claude for text coaching.

**About the app:** Day by Day is an evidence-based leader development app grounded in David V. Day's *Developing Leaders and Leadership* (2024) and his Five First Principles. It currently includes 8 chapter modules from Day's book, dual AI coaching (ICF Coach + Day Mentor, voice + text), action extraction from coaching sessions, journal entries, a reading library, and pre/mid/post assessment scaffolding.

**About this build:** Day is being brought in as a consultant to design a developmental system inside a healthcare organization. The app will be shown to senior leadership + CHRO **next week** as part of that consult. Day will demo it himself; the developer (Kristina) is in the background. The goal is a polished, credible demo that shows the architecture of the new direction — not a finished production app.

---

## Working Constraints

- **Timeline:** ~1 week to demo-ready.
- **Demo delivery:** David Day clicks through it live. App must be self-explanatory.
- **Audience:** Senior leadership + CHRO at a healthcare organization. They care about workforce well-being, retention, engagement, development ROI, and evidence-based credibility.
- **Keep working:** Supabase auth + DB, OpenAI Realtime voice integration, Anthropic Claude text coaching, both coach concepts, Render deployment. Do not rebuild these.
- **Redesign:** App page architecture, module delivery (sequential/staged), pre/mid/post timing, ICF coach data capture, push surveys, content reframing for healthcare.

---

## CRITICAL: Plan Before You Code

**Phase 0 is non-negotiable.** Audit the codebase, produce a written report, and propose a plan. Stop and wait for approval before writing any feature code.

Work on a feature branch — do not commit to `main`. Suggested branch: `healthcare-demo-build`. Create it as your first action.

After approval, commit incrementally. Each commit should compile, pass type-checks, and be independently verifiable.

When you hit a decision that affects research integrity, healthcare framing, or scope — **ask, don't guess.**

---

## Phase 0 — Discovery & Audit

Before writing any feature code:

1. **Create the feature branch** `healthcare-demo-build` and confirm git status is clean.

2. **Read the codebase** and produce `/docs/audit-2026-05.md` answering:
   - **Module / chapter content** — Where does it live? Hardcoded in components, in Supabase, in a content directory? What's the current order of the 8 chapters? Extract the actual sequence from the code.
   - **Module page architecture** — Is each module one long page, or already broken into sections? What components render module content?
   - **Assessment system** — Locate every place phase logic is referenced. Confirm the known issue: `currentWeek` is hardcoded to `1`, making midpoint and post unreachable. Map all assessment tables and the trigger flow.
   - **ICF coach data flow** — Find where coaching transcripts, action items, and session metadata are saved. List columns in `coaching_sessions` (or equivalent). What gets captured per session vs. per turn?
   - **Onboarding** — Where does a new user land? Is there any baseline/pre-assessment gate?
   - **Schema** — Pull the current Supabase schema. List tables, columns, RLS policies, and any migration history.
   - **Healthcare readiness** — Catalog every piece of copy, scenario, or example that's currently non-healthcare (first responders, generic OD, generic executives) and would need reframing.
   - **Push survey infrastructure** — Is there any existing notification, banner, or in-app prompt system, or does this need to be built from scratch?

3. **Propose a change plan** in `/docs/plan-2026-05.md` with three options (the user is still deciding scope):

   - **Path A (3-week build):** All 8 modules rebuilt with staged architecture + full healthcare reframing + working pre/mid/post + push surveys + richer ICF data capture.
   - **Path B (1-week demo build):** Staged architecture built, **first 3 modules** fully rebuilt and healthcare-reframed (following Day's book sequence), remaining modules visible in navigation but labeled "Coming in Week N." Pre/mid/post logic fixed with demo-mode toggle. Post-session ratings + baseline gate. Other push surveys stubbed.
   - **Path C (1-week safe build):** No staged architecture redesign. Healthcare-reframe existing content, fix dashboard overwhelm, fix pre/mid/post logic, add post-session ratings. Lower risk, less ambitious.

   For each path, estimate: files touched, schema changes, hours of work, risk areas, what gets demoed vs. what gets stubbed.

4. **Stop and wait for user approval.** Do not start Phase 1 until the user picks a path.

---

## Phase 1 — Module Architecture (only after path selection)

### A. Sequential staged delivery (Paths A and B)

Replace one-page module structure with stages. Each module breaks into ~5 stages following a consistent pedagogy aligned with Day's framework:

1. **Frame** (~3 min) — Why this matters, one concept, one question to sit with.
2. **Assess / Explore** (~5 min) — Inventory, exercise, or structured self-view.
3. **Interpret** (~4 min) — Results with evidence-based commentary.
4. **Practice** (~3 min, prep) — One small experiment to run in the next 48 hours.
5. **Integrate** (~5 min) — Reflect on what happened. Optional coach session prompt.

**Stage gating:** Action-gated (complete current to unlock next). Make this configurable per cohort — default action-gated, with time-gated as an option for production use.

**Module order:** Follow Day's book sequence as extracted from the codebase in Phase 0. Do not invent an order. If the codebase order differs from a reasonable reading of the book, surface this for the user to confirm.

**Navigation:** Only the current stage is fully visible. Future stages show as locked. Previous stages remain accessible for review. A "Browse all modules" link exists but is not the default view.

### B. Healthcare reframing

Rewrite all module copy, exercise prompts, and journal prompts so scenarios reflect healthcare leadership realities: handovers, escalation, multidisciplinary teams, on-call fatigue, ethical conflicts, patient safety culture, staffing pressures, regulatory load, second-victim phenomenon, moral injury.

For the CHRO audience: frame outcomes in workforce language (retention, engagement, burnout reduction, psychological safety, development ROI) alongside the developmental framing.

### C. AI coach domain priming

Extend ICF Coach and Day Mentor system prompts with healthcare context:
- **Terminology:** huddles, MDTs, code-blue debriefs, just culture, sentinel events, M&M conferences, second-victim phenomenon.
- **Stressors:** burnout, compassion fatigue, staffing shortages, moral distress.
- **Guardrails:** never give clinical or HR/legal advice. For crisis or impaired-colleague concerns, redirect to EAP, occupational health, peer support, institutional channels.
- Preserve ICF Coach as Socratic / non-directive and Day Mentor as research-based / advisory.

---

## Phase 2 — Pre / Mid / Post Assessment System

### A. Fix the broken phase logic

Replace hardcoded `currentWeek` with real date math:

```ts
const enrolledAt = userProfile.enrolled_at; // set at first login if not present
const weeksSinceEnrollment = differenceInWeeks(now, enrolledAt);
const completed = await getCompletedPhases(user.id);

let duePhase: 'baseline' | 'midpoint' | 'post' | null = null;
if (!completed.has('baseline')) duePhase = 'baseline';
else if (!completed.has('midpoint') && weeksSinceEnrollment >= MIDPOINT_WEEK) duePhase = 'midpoint';
else if (!completed.has('post') && weeksSinceEnrollment >= POST_WEEK) duePhase = 'post';
```

Configurable per cohort. Defaults: 8-week program with midpoint at week 4 and post at week 8.

### B. Baseline gate

If `duePhase === 'baseline'`, redirect to assessment page on app load. No other features accessible until baseline complete.

### C. Demo-mode toggle (critical for the demo)

Build an admin-only toggle that lets a demo user be flipped between `baseline`, `midpoint`, and `post` in one click. Day uses this during the demo to show the assessment arc without waiting weeks. Hide behind admin role.

### D. Validated measures

**Fully implemented for the demo:** Areas of Worklife Survey (AWS), 28 items, six subscales (workload, control, reward, community, fairness, values). The six-domain radar chart visualization on results is the demo centerpiece.

**Visible-but-stubbed** (show instrument name + item count + brief evidence statement, but don't fully implement scoring): Copenhagen Burnout Inventory, PERMA-Profiler, Brief Resilience Scale, Self-Reflection and Insight Scale, Authentic Leadership Questionnaire-16 (leader-conditional), Working Alliance Inventory-SR (midpoint), System Usability Scale (post).

For the demo, the AWS results screen is the proof point. The stubbed instruments demonstrate breadth without engineering time.

---

## Phase 3 — Push Surveys & ICF Coach Data Capture

### A. Post-session ratings (required)

Immediately after every coaching session (ICF or Day Mentor, voice or text), prompt user with 3 Likert items:
1. How helpful was this session? (1–5)
2. Did this session give you new insight? (1–5)
3. How ready are you to take action from this session? (1–5)

Save to `session_ratings` table with FK to `coaching_sessions`.

### B. Richer coaching session capture

Per coaching session, ensure capture of:
- `user_id`, `started_at`, `ended_at`, `duration_seconds`
- `coach_type` (ICF / Day Mentor), `modality` (voice / text)
- `transcript`
- `action_items_committed` (existing) + `action_items_completed` (cross-referenced with Actions tab over time)
- `post_session_rating` (from above)
- `self_reported_topic` — single optional dropdown at session end: "What was this session mostly about?" with categories aligned to Day's framework + healthcare-relevant additions (identity, well-being, conflict, ethics, staffing, feedback, role transition, other).

**Do not build LLM-based theme extraction or reflection-depth scoring in this build.** Capture structured data only. LLM analysis is a later phase.

### C. Push survey infrastructure

Build a generic in-app push survey system that can trigger on:
- **Event-based:** after coaching session (post-session rating), after module completion (module reflection)
- **Time-based:** weekly pulse (3 items: engagement, progress, intent-to-continue), phase-based assessments

For the demo, fully implement post-session ratings and module-completion reflections. Stub the weekly pulse with the trigger logic visible.

### D. Dashboard banner system

Add a notification banner on the dashboard that surfaces:
- "Your baseline assessment is due" (when applicable)
- "Your midpoint check-in is ready" (when applicable)
- "You have an unfinished session" (when applicable)

One banner at a time, highest priority wins.

---

## Phase 4 — Dashboard & Onboarding Polish

### Dashboard

Reduce to 3 primary cards: Today's stage, Talk to your coach, Latest reflection. Move streaks, library, full progress to a "Progress" tab. Every action shows estimated time ("3 min", "7 min").

### Onboarding

New user flow: signup → role selection (`Nurse Manager / Charge Nurse / Nursing Director / CNO / Physician Leader / Medical Director / CMO / Hospital Administrator / Other Healthcare Leader / Non-healthcare`) → "Do you have direct reports?" (yes / no / informal) → consent screen (placeholder for IRB-ready version later) → baseline assessment → Module 1 Stage 1.

Store role + reporting status in `user_profiles`. Use to personalize scenario examples in modules and AI coach priming.

### Demo users

Pre-create 3–5 demo users in different roles and at different program weeks so Day can pick whichever matches the audience and show different states of the app (fresh enrollment, mid-program, post). Document these in `/docs/demo-users.md`.

---

## Phase 5 — Demo Polish

- **Evidence base screen** — A single page in the app listing every validated measure used, with citations. Linked from settings. Stakeholder taps "Is this evidence-based?" → tap once → proof.
- **Sample research output mock** — A static screen showing what aggregate pre/post results will look like (radar chart deltas, effect sizes, themes). Make clear this is illustrative. CHROs care that the output exists.
- **Visual polish pass** — Consistent typography, spacing, color. No half-finished screens. If something isn't ready, hide it.

---

## Out of Scope

- LLM-based theme extraction, reflection-depth scoring, or coaching transcript analysis (defer)
- HR roster CSV import (hardcode demo users)
- Researcher dashboard with real export functionality (build the mock view only)
- Migration to a new repo, new stack, or new hosting (stay on Vite/Supabase/Render)
- New auth providers or paywalls
- Email/SMS reminders (in-app banners only for now)
- IRB-ready consent flow (placeholder only; build properly when IRB is filed)
- Weekly pulse survey full implementation (stub only)
- Production HR data integration

---

## Working Agreement

- Work on the `healthcare-demo-build` branch. Do not commit to `main`.
- Commit incrementally. Each commit should be independently meaningful and revertible.
- For schema changes, write `up` and `down` migrations.
- For copy changes, do a global search to confirm complete replacement of old phrasing.
- Add at least one component or Playwright test per new flow.
- Surface architectural decisions explicitly. Default to the smallest change that achieves the goal.
- When uncertain — about a measure choice, a cutoff, a healthcare scenario, the module order, anything research-critical — **ask, don't guess.**

---

## Start Here

1. Create the `healthcare-demo-build` branch.
2. Confirm git status is clean.
3. Execute Phase 0: audit the codebase and produce `/docs/audit-2026-05.md` and `/docs/plan-2026-05.md`.
4. Stop. Wait for the user to pick Path A, B, or C.
5. After path selection, proceed with the chosen phases.

Go.
