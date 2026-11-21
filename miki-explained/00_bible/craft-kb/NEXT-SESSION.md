# Prompt for the next session — Craft KB, set 2 (art direction + script writing)

Paste everything below the line into a new session, then give the folder of transcripts.

---

We're continuing the **Craft KB** project for Meikigo (Miki Explained). Read these first, in order:

1. `miki-explained/00_bible/WORKING-RULES.md` and `LESSONS.md` (the contract; they override memory).
2. `miki-explained/00_bible/craft-kb/README.md` (what set 1 built and how to use it).
3. `miki-explained/00_bible/craft-kb/_cards/BRIEF.md` and `MERGE-BRIEF.md` (the card format and merge rules from set 1).
4. For this set's topics: `00_bible/script-formula.md`, `series-bible/RECIPE-D.md` §0.1, §3 (Script), §4 (Shot list),
   §7 (Board), `series-bible/STUDY-D.md`, `visual-system.md`, `style-menu.md`, `craft-fundamentals.md`.

## What set 1 was (done 2026-11-18/19)
I gave you 68 YouTube transcripts on Blender / 3D craft. You turned them into training and RAG data for the agent that
makes our explainer videos (Blender builds → raea renders; Style D macro look):
- **Mode A triage** (`TRIAGE.md`): bucket, version, caption quality, value 1–5 for our pipeline, visual gaps, rule conflicts.
- **Mode B cards** (`cards/<bucket>/`, 500): one technique per card, sections METADATA · CREATIVE_INTENT ·
  STE_PROCEDURE (ASD-STE100: imperative verb, one action, ≤ 20 words, conditions first, explicit values) ·
  AGENT_EXECUTION (bpy / node links / raea TSX) · NOTES (deprecations, visual gaps, rule conflicts).
- **Merge**: duplicate techniques clustered (`_cards/CLUSTERS.md`) into 77 master cards (`masters/`) with a VALUES BY
  SOURCE table and a Style D pick. `INDEX.md` lists 372 topics with "use when".
- **Checks**: every bpy snippet run headless in Blender 5.3; every raea prop checked against the raea-bevy skill, the kit
  and EX4x episodes; house-rule conflicts flagged (⚠).
- **Wired in** (user OK): RECIPE-D §1 shot-list `cards` column + §5.1.9; WORKING-RULES §7.1 and §5 tools table.

## What set 2 is
A new folder of transcripts focused on **art direction and script writing**. Same goal: turn them into cards the agent
uses when it writes a script, plans a shot list, and art-directs frames, so it stops improvising.

Proposed adaptation (confirm with me before running):
- **New buckets**, e.g. `06_Art_Direction` (composition for 9:16, colour script, shape language, visual metaphor, frame
  briefs, reference analysis, typography/graphic layers), `07_Script_Story` (hooks, open loops, structure, pacing,
  retention, plain language, endings), `08_Edit_Pacing` (cut rhythm, beat timing, sound-led editing) — adjust to what
  the transcripts actually contain.
- **Card format** keeps the four sections, but AGENT_EXECUTION maps to *our* artefacts instead of bpy: the script
  formula (Hook / Open loop / Mechanism / Proof↔Payoff / End / Follow, 55–70 words), the shot-list table (RECIPE-D §4),
  the frame brief (Ref → Idea → Decision → Eye → Feeling → Not generic because → Moves → Handover), `ref_<shot>.md`,
  and raea props only where a technique is visual. Each card should include a **worked example** rewritten for a
  Meikigo topic (small business / everyday money, Malaysia-first), and a **check** the agent can run on its own draft.
- Flag anything that conflicts with the house rules: visualise what the line literally says; plain language a
  12-year-old follows; keep the RM wow numbers; no flashy transitions; figures hold poses; one brand accent; brand logo
  from frame 1; captions EX15/Style D rules; retired styles never proposed; After Effects prohibited.

## How to run it (lessons from set 1)
1. Ask me the open questions first (scope, buckets, where the folder is); present a plan; wait for "ok".
2. Move the raw files into `craft-kb/raw2/` (keep set 1's `raw/` untouched).
3. Triage with parallel agents (~8 files each; brief in `_triage2/BRIEF.md`), merge into `TRIAGE-2.md`; show me the
   value table and a recommended split before writing cards.
4. Cards with parallel agents grouped by bucket; long courses get their own agent and are read in full.
   **Rate limits stopped 13 of 15 agents in set 1**: put a RESUME MODE section in the brief from the start (check what
   exists, add only what's missing) and resume stopped agents with SendMessage rather than restarting.
5. Cluster + master cards; extend `INDEX.md` (new sections) rather than a second index.
6. Checks that fit this set: every card's example obeys the script formula and plain-language rule; rule-conflict scan;
   any raea prop verified. Don't invent tools or props.
7. Then propose (don't apply without my OK) where the cards plug into RECIPE-D §3/§4/§7 and the WORKING-RULES shot loop.

Known house facts the cards must respect: `RectLight` needs `range` (WORKING-RULES §5) even though the skill docs list it
only for Point/Spot; Blender 5.3 is installed; raea renders, Blender only builds.
