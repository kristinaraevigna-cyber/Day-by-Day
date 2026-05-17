-- ============================================================================
-- Day by Day — drop the assessment_id foreign key on assessment_responses
-- ----------------------------------------------------------------------------
-- Status: PROPOSED. Review, then apply via the Supabase dashboard SQL editor.
--
-- Every assessment/measure in this app is defined in code (the MEASURES
-- registry and the legacy assessment constants in App.jsx) — there is no
-- DB-side assessments catalog that the app maintains. The foreign key
-- assessment_responses.assessment_id -> assessments(id) therefore rejects
-- valid saves (e.g. 'perma4'). Dropping it lets assessment_id be a plain
-- text key matching the code-defined ids. Safe: no-op if already gone.
-- ============================================================================

alter table public.assessment_responses
  drop constraint if exists assessment_responses_assessment_id_fkey;
