# Day by Day — App Structure Map

**Date:** 2026-05-16
**Source:** `src/App.jsx` (single file, ~7,832 lines) on `main`
**Purpose:** A faithful map of what the deployed app currently is. Not a redesign proposal.

All line numbers refer to `src/App.jsx`.

---

## 0. Orphaned code — read this first

Three things in the codebase are **fully written but unreachable** in the running app. They matter because the file looks bigger/more capable than the live app actually is:

| Item | Lines | Status |
|---|---|---|
| `InterventionView` component | 6964–7096 | Routed only by the `intervention-*` view prefix. **Nothing anywhere calls `setCurrentView('intervention-…')`.** Dead. |
| `LeaderIdentityHub` component | 6712–6958 | Never rendered. No `renderView` case, no nav, no button. Dead. |
| `LEADER_DEVELOPMENT.interventions`, `LEADERSHIP_DEVELOPMENT.interventions`, `LEADER_IDENTITY_INTERVENTIONS` (the data) | 2056–2435, 2460–2885, 2911–3080 | Consumed only by the two dead components above. Their 3-phase intervention structures never render. |
| Assessments `big_five`, `kli_competency`, `learning_orientation` | 1753–2049 | `AssessmentView` can score them, but no button or link navigates to them. Unreachable. |

`LEADER_DEVELOPMENT` / `LEADERSHIP_DEVELOPMENT` are **not** fully dead — their `.title`, `.description`, `.source` strings are used as header text on the Develop tabs. Only their `interventions`/`proximalOutcomes`/`distalOutcomes` arrays are dead.

**The Develop page renders from a *different* data structure** (`developmentAreas`, defined inline inside the tab components) — see Section 2.

---

## 1. Top-level navigation

There is no router. Navigation is a single string state `currentView` in `DayByDayApp` (line 7725), resolved by `renderView()` (7780–7815).

### Desktop sidebar — `Sidebar` (3812)
Visible at `lg` breakpoint and up. Items, in order:

| Label | `currentView` | Component shown |
|---|---|---|
| Home | `dashboard` | `Dashboard` (3901) |
| Develop | `develop` | `DevelopView` (4900) |
| Practice | `practice` | `PracticeView` (4522) |
| Day's Book | `chapters` | `ChaptersView` (4275) |
| Journal | `journal` | `JournalView` (4061) |
| Actions | `actions` | `ActionsView` (4176) |
| Coaches | `coaches` | `CoachesView` (4396) |
| Library | `library` | `LibraryView` (4453) |

Sidebar footer: a user card (initials, name, email), **Privacy Settings** (`privacy-settings` → `PrivacySettingsView`, 7360), and **Sign Out** (`handleSignOut` — `supabase.auth.signOut()`).

### Mobile bottom nav — `BottomNav` (3874)
Visible below `lg`. Only 5 items: **Home** (`dashboard`), **Develop** (`develop`), **Book** (`chapters`), **Coach** (`coaches`), **More** (`library`).
Note: Practice, Journal, Actions have **no mobile entry point** — they're reachable on mobile only via in-page buttons (e.g. the Dashboard cards).

### Mobile header — `Header` (3859)
Logo + streak flame. No nav.

### Routes not in any nav menu
Reached only programmatically via buttons:

| `currentView` | Component | Reached from |
|---|---|---|
| `chapter-<id>` | `ChapterDetail` (4309) | Chapter cards, Dashboard |
| `practice-<id>` | `DailyPractice` (4650) | Practice activity cards, Dashboard |
| `assessment-<id>` | `AssessmentView` (6229) | Develop "Take Assessment" buttons |
| `intervention-<id>` | `InterventionView` (6964) | **nothing — dead route** |
| `coach-icf-voice` / `coach-icf-text` | `VoiceCoach` / `TextCoach` | Coaches page |
| `coach-advisor-voice` / `coach-advisor-text` | `VoiceCoach` / `TextCoach` | Coaches page |
| `my-data` | `MyDataView` (7537) | Privacy Settings page |

---

## 2. The Develop page — in detail

`DevelopView` (4900) renders a **two-tab toggle**:

- **Leader Development** (Individual) → `LeaderDevelopmentTab` (4945) — default
- **Leadership Development** (Collective) → `LeadershipDevelopmentTab` (5781)

Each tab holds its own `developmentAreas` object (defined **inline in the component**, not as a top-level const). This is the real data behind the Develop page.

### 2a. Leader Development tab — 5 constructs

Sub-navigation: 5 "area" buttons (default `identity`). Per area: header card, optional **Take Assessment** button, a Key Question box, the 8-type legend, and an accordion list of interventions.

| # | Area (`id`) | Title | Linked assessment | Interventions |
|---|---|---|---|---|
| 1 | `identity` | Leader Identity | `leader_identity` | **8** |
| 2 | `awareness` | Self-Awareness | `self_awareness` | **6** |
| 3 | `efficacy` | Leadership Self-Efficacy | `leadership_self_efficacy` | **5** |
| 4 | `regulation` | Self-Regulation | **none** (no Take Assessment button) | **5** |
| 5 | `wellbeing` | Well-being | `perma4` | **10** |

Total: **34 interventions**. The "N Development Interventions" heading is dynamic (`currentArea.interventions.length`) — the screenshot showing "8" was the Leader Identity area.

Each intervention is an object: `{ id, title, type, duration, mechanism, description, activities[], source }`. `activities` is an array of plain strings. Interventions render as **expandable accordions** — expanding shows "How it works" (mechanism), a numbered activity list, the source citation, and two buttons: **Start in Journal** (→ `journal`) and **Discuss with Coach** (→ `coaches`). Interventions do **not** open a detail page.

**Intervention types** — `typeConfig` (8 types, Leader tab): `reflect` 📝, `feedback` 🔄, `practice` 🎯, `coach` 💬, `assess` 📊, `envision` 🔮, `observe` 👀, `program` 📚. These are display labels/icons only; each intervention carries one `type`.

Full intervention list (id — type):
- **Leader Identity (8):** identity_narrative (reflect), possible_selves (envision), role_experimentation (practice), identity_feedback (feedback), mentoring_identity (coach), micro_moments (practice), values_coaching (coach), transition_support (program)
- **Self-Awareness (6):** reflective_journaling (reflect), 360_feedback (feedback), self_regulation_coaching (coach), personality_instruments (assess), guided_dialogues (coach), awareness_workshop (program)
- **Leadership Self-Efficacy (5):** mastery_experiences (practice), vicarious_learning (observe), social_persuasion (feedback), anxiety_reframing (reflect), stretch_assignments (practice)
- **Self-Regulation (5):** deliberate_practice (practice), emotional_regulation (reflect), mindfulness_practice (reflect), habit_formation (practice), goal_setting (envision)
- **Well-being (10):** gratitude_practice, savoring_practice, flow_cultivation, signature_strengths, high_quality_connections, meaning_crafting, recovery_practices, growth_mindset, mindfulness_wellbeing, best_possible_self

Footer of this tab: an **External Assessments** card linking out to `principlesyou.com` and `outofservice.com/bigfive` (external sites).

### 2b. Leadership Development tab — 4 areas

Same layout, different data. Default area `team-learning`. **No per-area assessments** (no Take Assessment buttons).

| # | Area (`id`) | Title | Interventions |
|---|---|---|---|
| 1 | `team-learning` | Team Learning & Action | 2 |
| 2 | `team-coaching` | Team Coaching & Dialogue | 3 |
| 3 | `networks` | Networks & Boundaries | 3 |
| 4 | `systems` | Communities & Systems | 2 |

Total: **10 interventions**. Type legend here is a *different* 8-type set: `team` 👥, `practice` 🎯, `coach` 💬, `forum` 🗣️, `program` 📚, `assess` 📊, `community`, `research` 🔬.

Footer: a **Team Assessments** card with two buttons → `assessment-psychological_safety` and `assessment-collective_efficacy`.

### 2c. How "Take Assessment" works
The Leader tab's area header button does `setCurrentView('assessment-' + currentArea.assessment.id)` (5594). `AssessmentView` resolves the id against all assessment sources. So from the Develop page you can reach exactly **6 assessments**: the 4 self-view ones + the 2 collective ones. (`big_five`, `kli_competency`, `learning_orientation` are never linked — see Section 0.)

---

## 3. The Day's Book page

**Yes — this is where the 8 chapters live.** Two components:

- `ChaptersView` (4275, route `chapters`): heading "Day's Book", subtitle "8 chapters from 'Developing Leaders and Leadership' (2024)", then a list of 8 chapter cards (image, "Chapter N", duration, title, subtitle) → `chapter-<id>`.
- `ChapterDetail` (4309, route `chapter-<id>`): one long scrolling page per chapter — hero image, **Overview**, **Lessons** (accordion; each lesson expands to `content` + "Practical Application" + "Research Basis"), **Key Quotes** (dark card), **Reflection Questions**, and prev/next chapter buttons.

Data: the `CHAPTERS` array (108–714). 8 entries. Each chapter:
`{ id, title, subtitle, description, duration, image (Unsplash URL), color, overview, lessons:[{id,title,content,practicalApplication,researchBasis}], keyQuotes:[str], reflectionPrompts:[str] }`

Chapter order in code:
1. First Principles
2. Developmental Systems
3. Individual Leader Development
4. Self-Views and Leader Development
5. Adult Development
6. Collective Leadership Capacity
7. Networks and Development
8. Advancing the Science

There is **no stage architecture** — each chapter is a single page. ~5 lessons per chapter.

---

## 4. Relationship between Develop, Day's Book, and Practice

These are **three parallel, independent content structures** — different content, different data, no shared model. They are *not* different views of the same data.

| Page | What it is | Backing data |
|---|---|---|
| **Day's Book** | The 8 book chapters — narrative lessons + reflection prompts | `CHAPTERS` |
| **Develop** | Leadership *constructs* (5 individual + 4 collective) with intervention catalogs + links to assessments | `developmentAreas` (inline in the two tab components) |
| **Practice** | Short VCoL exercises, grouped by KLI competency | `ACTIVITIES` + `KLI_COMPETENCIES` |

How they touch each other:
- **Loose cross-links only.** Develop interventions have "Start in Journal" / "Discuss with Coach" buttons. The Dashboard surfaces a teaser of each (a chapter-1 card, a competency grid, a Develop pair, a random practice activity).
- **No shared IDs, no shared progress.** A Develop construct ("Leader Identity") and a book chapter ("Self-Views and Leader Development") are thematically related but not linked in code. Practice activities are keyed to KLI competencies, which appear nowhere in Develop or Day's Book.
- The KLI competency model (Courage / Creativity / Collaboration) underlies **Practice** and the **KLI Competency assessment** only — it is a separate taxonomy from the Develop constructs.

**Practice** in detail: `PracticeView` (4522) → pick one of 3 `KLI_COMPETENCIES` → list of `ACTIVITIES` filtered by competency → `DailyPractice` (4650) runs a 4-step VCoL flow (Set Goal → Gather Info → Apply → Reflect), each step a textarea, saved to `reflections` with `reflection_type: 'vcol_practice'`.

---

## 5. Data sources per content-bearing page

**Every piece of content in the app is a hardcoded JavaScript constant in `App.jsx`.** Nothing content-bearing is loaded from Supabase.

| Constant | Lines | Feeds |
|---|---|---|
| `CHAPTERS` | 108–714 | Day's Book |
| `READING_LIBRARY` | 719–855 | Library (10 categories, 59 books) |
| `KLI_COMPETENCIES` | 857–861 | Practice, Dashboard |
| `ACTIVITIES` | 867–1569 | Practice (45 activities) |
| `SELF_VIEW_ASSESSMENTS` | 1571–1746 | 4 assessments |
| `BIG_FIVE_ASSESSMENT` | 1753–1873 | assessment (orphaned) |
| `KLI_COMPETENCY_ASSESSMENT` | 1880–2005 | assessment (orphaned) |
| `LEARNING_ORIENTATION_ASSESSMENT` | 2011–2049 | assessment (orphaned) |
| `COLLECTIVE_ASSESSMENTS` | 3087–3138 | 2 assessments |
| `developmentAreas` (×2) | inline in tabs | **Develop page** |
| `LEADER_DEVELOPMENT` / `LEADERSHIP_DEVELOPMENT` | 2442, 2893 | header text only |
| `LEADER_IDENTITY_INTERVENTIONS` | 2056 | dead |

Supabase stores **only user-generated data**, never content:

| Table | Holds | Written by |
|---|---|---|
| `coaching_sessions` | coach session transcripts | VoiceCoach, TextCoach |
| `actions` | committed action items | coaches, ActionsView |
| `reflections` | journal entries + VCoL practice saves | JournalView, DailyPractice |
| `assessment_responses` | assessment answers + computed results | AssessmentView |
| `user_consents` | consent record | ConsentScreen |
| `user_privacy_settings` | privacy toggles | ConsentScreen, PrivacySettingsView |
| `streaks` | `current_streak` | read-only in app |

---

## 6. State management — how the app tracks the user

- **No router, no global store.** `DayByDayApp` (7721) holds 7 `useState` values: `user`, `loading`, `hasConsent`, `currentView`, `streak`, `actions`, `journalEntries`.
- **Navigation** = the `currentView` string + `renderView()`'s prefix checks and `switch`.
- On login, `loadUserData()` (7756) fetches `actions`, `reflections`, and `streaks`. `checkConsent()` (7744) gates entry behind the consent screen.
- Every other component manages its own local `useState` (active tab, expanded accordion, current question index, in-progress responses, etc.). None of that is persisted.

**What is NOT tracked anywhere — there is no progress/completion model:**
- No record of which chapters, lessons, interventions, or activities a user has done.
- **No unlock / gating logic.** Every chapter, construct, intervention, and assessment is freely accessible at all times.
- `currentView` always resets to `dashboard` on reload — the app does not remember where the user was.
- `assessment_responses` **is written but never read back.** The app cannot show a past result, a history, or a before/after comparison. Each assessment is a fresh, standalone run.
- `reflections` and `actions` are read back (counts on Dashboard, lists on their pages). `streak` is displayed but the app contains no code that increments it.
- No concept of enrollment date, program week, cohort, or role.

---

## 7. Assessments — every assessment in the deployed app

Nine instruments are defined and scored by `AssessmentView` (6229). Scoring branches on `assessmentType`: `bigfive`, `kli`, `perma4`, or `simple`. Results are saved to `assessment_responses` on completion. **No charts of any kind** — results render as numeric scores, horizontal bars, and text. No radar.

| Instrument | id | Items | Response scale | Construct measured | Reachable in UI? |
|---|---|---|---|---|---|
| Leader Identity | `leader_identity` | 8 | 7-pt Likert (Strongly Disagree→Strongly Agree) | Leader identity (dims: core, importance, affective, clarity, behavioral) | ✅ Develop → Leader → Leader Identity |
| Leader Self-Awareness | `self_awareness` | 10 | 5-pt (Not at All→Extremely) | Self-awareness (internal / external) | ✅ Develop → Leader → Self-Awareness |
| Leadership Self-Efficacy | `leadership_self_efficacy` | 10 | 4-pt (Not at All True→Exactly True) | Leadership self-efficacy (adapted from Schwarzer & Jerusalem GSE) | ✅ Develop → Leader → Leadership Self-Efficacy |
| PERMA+4 Well-being ("Positive Functioning at Work Scale") | `perma4` | 29 | 7-pt Likert | Well-being across 9 dimensions (positive emotions, engagement, relationships, meaning, accomplishment, physical health, growth mindset, economic security, work environment) | ✅ Develop → Leader → Well-being |
| Team Psychological Safety | `psychological_safety` | 7 | 5-pt (Strongly Disagree→Strongly Agree) | Team psychological safety (Edmondson) | ✅ Develop → Leadership → Team Assessments |
| Collective Leadership Efficacy | `collective_efficacy` | 8 | 5-pt | Team collective efficacy (direction, alignment, commitment, etc.) | ✅ Develop → Leadership → Team Assessments |
| Big Five Personality | `big_five` | 50 | 5-pt (Very Inaccurate→Very Accurate) | Big Five / IPIP-NEO (5 factors) | ❌ Orphaned — no nav path |
| KLI Leadership Competency | `kli_competency` | 54 | 5-pt | KLI model: 3 competencies × 3 capabilities | ❌ Orphaned — no nav path |
| Learning Orientation | `learning_orientation` | 12 | 6-pt | Growth vs fixed mindset | ❌ Orphaned — no nav path |

### Results display by type
- **`simple`** (Leader Identity, Self-Awareness, Leadership Self-Efficacy, Learning Orientation, both collective ones): one average score `X / max`, a low/moderate/high interpretation paragraph, optional development tips.
- **`bigfive`**: 5 factor rows, each a horizontal bar + Low/Moderate/High badge + leadership implication.
- **`kli`**: 3 competency cards, each with a 3-cell capability grid.
- **`perma4`**: an overall well-being bar, then 9 dimension bars, then a static "Next Steps" note.

### Taking flow (all assessments)
`AssessmentView` shows one item per screen, "Question N of M", a progress bar, tappable scale options, and back-navigation. When all items are answered a "See Results" button appears. Results screen has a "Continue Developing" / "Back to Develop" button. There is no pre/mid/post framing, no phase, no enrollment context — assessments are user-initiated, one-off, and standalone.

---

## Appendix — other pages (brief)

- **Dashboard** (3901): date + greeting; random "Today's Practice" card; "Talk to Your Coach" card; 3 stat tiles (Streak / Actions / Journal counts); "Practice by Competency" (3 KLI tiles); "Develop" pair; a Chapter-1 teaser; Journal + Actions cards. 8 sections total.
- **Journal** (4061): free-text entries → `reflections` (`reflection_type: 'journal'`).
- **Actions** (4176): list of `actions` rows; toggle complete / delete; manual add.
- **Coaches** (4396): two coach cards (ICF Leadership Coach, Day Advisor), each with Voice / Text buttons → the 4 coach routes.
- **Library** (4453): `READING_LIBRARY` — 10 categories, 59 books; category drill-down.
- **Privacy Settings** (7360) / **My Data** (7537): consent + privacy toggles, data export/delete.
- **Consent** (`ConsentScreen`, 7142): blocks the app until privacy policy + data-processing consent are accepted.
