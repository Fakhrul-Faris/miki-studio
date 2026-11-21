# Card brief, set 2 (Mode B): art direction, script, edit, UI motion

You turn YouTube transcripts into technique cards for the AI agent that writes, plans and art-directs Meikigo's
"Miki Explained" videos. The cards stop the agent improvising: when it writes a hook, plans a shot or briefs a frame,
it pulls a card, applies its method, and runs its check.

## What the cards serve
- 55–90 s vertical (9:16) explainers and how-tos for TikTok/Instagram about small businesses and everyday money.
  Malaysia-first, often in Bahasa Melayu (casual: "korang", English loanwords). Viewers are 18–34, almost all
  non-followers from the For You page; they decide in the first second.
- Main pipeline **Style D macro object** (`../../series-bible/RECIPE-D.md`): one everyday object at macro detail on a
  real surface, dark room, one soft top light, shallow DoF, bloom, one saturated **brand accent** only on what the line is
  about; a new camera setup every 2–3 s joined by camera flights and object morphs; an on-screen event about every
  second, on the word; objects change state (x-ray, open, slice, multiply with a counter, become a chart). UI-heavy
  topics are ~80 % interface scenes (phone/app screens built in code).
- **Engines:** Blender only builds models (GLB); **raea renders** (React/TSX, real-time Bevy: 3D + 2D layers/text);
  HyperFrames (HTML/SVG) for flat 2D. **After Effects is prohibited** — for AE tutorials keep the principle and exact
  values (ease %, frame counts, durations, overshoot) and translate the execution to raea / HyperFrames.

### The artefacts AGENT_EXECUTION maps to
1. **Script (RECIPE-D §3, binding for Style D):** frame-0 text ≤ 8 words stating a contradiction; one idea; about 11
   lines, 175–200 spoken words (~3.4 words/s); lines that can be shown literally; end text ≤ 7 words, a **question the
   viewer can take a side on, never a request to follow**; the last frame loops to the first frame's object and framing.
   Beats (`../../script-formula.md`): Hook → Open loop → Mechanism → Proof↔Payoff → End. S16 how-to variant (main focus):
   problem → "Kalau korang nak …, ni caranya. N step je." → 3–5 numbered steps → why it matters (a real RM number) →
   question. Plain language a 12-year-old follows; result first; keep the RM "wow" numbers, drop analyst metrics.
   Model: `../../../04_episodes/EX46_howto-sale-real/episode.md` (Script v1, Shot list v2).
2. **Shot-list row (RECIPE-D §4):** `| # | Line / words | Setup and camera | State change and events | cards |`. A setup
   is a new framing/place or the same object in a new state from a new angle; ≤ ~4 s; events land on named words.
3. **Frame brief** (one per setup): Ref → Idea → Decision → Eye → Feeling → Not generic because → Moves → Handover.
4. **`ref_<shot>.md`** (`../../templates/ref_analysis.md`): subject, silhouette, camera, light, palette 5–8 hex with
   roles, materials, unique features, mood, "reads in 1 s on a phone?".
5. **Board check (RECIPE-D §7):** subject in the 25–60 % band; nothing clipped; no text over the hero; no two stills
   from the same angle; one accent; readable at phone size.
6. **raea** only where the technique is visual (easing, morph, camera, light, text animation): real props/components
   only — read `~/.claude/skills/raea-bevy/SKILL.md` and the topic file you need (`animation.md`, `lights.md`,
   `post.md`, `scene.md`, `materials.md`); kit components in `../../../tools/raea/kit/`. If raea has nothing, write
   `raea: no equivalent (reason)`. Never invent a prop. `RectLight` needs `range` (≈ 2× light-to-subject distance).

### House rules (a card never contradicts them; flag with ⚠ and adapt)
Visualise what the line literally says (a metaphor only when the line is one) · plain language · keep RM wow numbers ·
the real brand logo on screen from frame 1 · one brand accent colour · no flashy transitions (no whip pans, crash
zooms, glitches, generic wipes/flashes/dissolves); transitions built from the scene's own objects · objects fade/grow/
slide in ~0.4 s, never pop · camera moves are eased in-out (no move above ~130°/s or ~40 m/s) · overshoot capped at
3–5 % over ≥ 0.4 s, no bouncy springs · no people/hands in Style D; elsewhere figures hold poses, never walk/gesture;
no hand-drawn/coded people · captions keep the house style (never restyle) · retired styles never proposed (cut-paper
collage, paper diorama, printed 3D) · generated images/video are references only, never finished footage · After
Effects prohibited.

## Your job
Your list file gives `path<TAB>value<TAB>tier` (paths relative to `../raw2/`). For each file:
1. Read its row in `../TRIAGE-2.md` (techniques, overlap_set1, conflicts).
2. Read the **whole** transcript (long files in chunks; never sample).
3. For each distinct technique:
   - **New technique** → write a card (format below).
   - **Already in set 1** (triage marks "(set1)", or `grep -ril <key term> ../masters ../cards` finds it): do NOT write a
     duplicate card. If this video adds values, steps or a variant the set-1 master lacks, write an **addendum**:
     `../_cards2/addenda/<master-or-card-slug>--<source-slug>.md` with: target file path, the new VALUES BY SOURCE
     row(s), extra steps/variants, timestamps. If it adds nothing, list it as "covered by <path>" in your done-list.

## Card format
Path: `../cards/<bucket>/<technique-slug>--<source-slug>.md`. Buckets: `06_Art_Direction` · `07_Script_Story` ·
`08_Edit_Pacing` · `09_UI_Motion` (and set 1's `01_Animation_Motion` … `05_Camera_Raea_Pipeline` for pure craft).
Choose per technique, not per video. Create dirs as needed. source-slug = short kebab of the title.

```markdown
---
title: <Technique name>
bucket: 07_Script_Story
source: "<exact path relative to raw2/>"
source_time: "<timestamps if present>"
tool_target: script | shot-list | frame-brief | ref-analysis | board-check | raea | HyperFrames | principle-only
tier: full | principle
use_when: "<the episode moment: writing the hook / planning L04–L06 setups / briefing a data frame …>"
style_fit: <one line: how it serves Style D / our rules, or "⚠ conflict: … → adapted as …">
---

## METADATA
Topic Bucket | Source tool | Target artefact

## CREATIVE_INTENT
1–3 sentences: WHEN and WHY an explainer-maker uses this, in the source's own terms (keep named frameworks and
exact numbers).

## STE_PROCEDURE
1. Imperative verb first, active voice, ONE action, ≤ 20 words.
- Conditions BEFORE actions ("Before you write line 2, state the hook's question in 8 words.").
- Explicit values (word counts, seconds, frames, %, ratios); inferred values marked `~`.

## AGENT_EXECUTION
How to apply it to our artefact (script beat / shot-list row / frame-brief fields / ref_<shot>.md / raea props).
Then, required:
### Worked example
A Meikigo example rewritten with this technique: a small business or everyday-money topic, Malaysia-first, RM
numbers. Show BEFORE (generic) → AFTER (technique applied). Script examples obey RECIPE-D §3 (lines ≤ 15 words,
end on a question, no follow line); may be Bahasa Melayu casual or English. Shot/frame examples use a real
shot-list row or frame-brief fields. Never invent facts about a real company: use a generic shop ("a kedai runcit
in Shah Alam") or mark numbers "illustrative". **"Illustrative" covers numbers, never mechanisms:** every real-world
rule, law, fee or system an example relies on must be true (e.g. Malaysian cash is rounded to the nearest 5 sen, so
an example can't claim RM4.90 gets rounded). If you are not sure a mechanism is real, pick an example whose logic is
plain arithmetic (cost, price, count × price) instead.
### Check
2–5 yes/no tests the agent runs on its own draft (e.g. "Does line 1 name a contradiction in ≤ 8 words?").

## NOTES
- Visual gaps: what can't be recovered from speech — say so; don't guess.
- Rule conflicts and how the card is adapted (⚠).
- AE/other-tool steps dropped, and their raea/HyperFrames translation.
```

## Tiers
- **full** (value 4–5): every distinct technique gets a card with all sections.
- **principle** (value 3): still one card per technique, shorter: principle + method + example + check.

## Quality guardrails
- Strip filler, sponsors, intros/outros, hedging. Fix STT errors.
- Never drop a number, framework name, ratio or step to save space. Don't invent values; unknown stays
  `unknown (visual only)`.
- One technique per card. A short video yields 2–6 cards; a long course 10–30.
- Write `../_cards2/<agent>.done.md` (agent = your list name, e.g. `c07a`): cards written (path — one-line summary),
  addenda written, "covered by" items, anything skipped + why.
- Don't touch any other files. Final reply: "done", card count, addenda count, anything unfinished.

## RESUME MODE (in force from the start)
Before writing, for each of your files run `grep -rlF '<file name without folder>' ../cards ../_cards2/addenda` (fixed
string: some paths contain quotes, which cards write with single-quoted `source:` lines). For a file that already has cards: read them, compare with the transcript's techniques, and write
ONLY the missing ones. Never overwrite an existing card (fix one only if truncated/broken, and say so). If your
done-list exists, extend it.
