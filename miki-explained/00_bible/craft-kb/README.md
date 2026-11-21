# Craft KB — technique cards from 260 YouTube tutorials (set 1: 3D craft · set 2: art direction, script, edit, UI motion)

Built 2026-11-18/19. Source: 68 transcripts (Blender, plus Maya / Houdini / Nuke / 3ds Max / After Effects / live-action)
the user collected. Purpose: when an episode needs a light, camera, material or motion decision, pull a proven technique
here instead of improvising. **Start at `INDEX.md`.** WORKING-RULES.md and RECIPE-D.md still win over any card.

## What's here
| Path | What |
|---|---|
| `INDEX.md` | 372 topics by bucket, each with "use when" (episode moment) and a link; ⚠ = adapt to house rules |
| `masters/<bucket>/` | 77 master cards — one per technique taught by 2+ videos; values compared in a VALUES BY SOURCE table with a Style D pick |
| `cards/<bucket>/` | 500 source cards (one technique, one video): METADATA · CREATIVE_INTENT · STE_PROCEDURE · AGENT_EXECUTION · NOTES |
| `TRIAGE.md` | Mode A sort of all 68 transcripts: bucket, Blender version, caption quality, value 1–5, visual gaps, conflicts |
| `raw/` | the original transcripts |
| `_cards/` | working files: briefs, clusters, bpy check reports (`BPY-CHECK.md`, `BPY-FIXES.md`), done-lists |

Covered: the 53 transcripts rated value 3–5 plus the four long courses (Nuke, Houdini, Maya run cycle, Blender 4.3
product masterclass). Skipped (value 1–2): Cycles render-speed ×3, 3ds Max, Daz humans, After Effects, layered/straight-
ahead character blocking, motion tracking, CG Cinematography ch. 1, Blender settings, adding people, a motivation talk.

## Set 2 (2026-11-19/21): art direction, script writing, edit, UI motion
Source: 192 transcripts the user collected (`raw2/`, 3 exact duplicates in `raw2/_dupes/`). Triage: `TRIAGE-2.md`
(value 5: 31 · 4: 54 · 3: 53 · 2: 44 · 1: 10). Cards for every value 3–5 file (138); value 1–2 skipped (AE click-throughs,
3D-to-AI render passes, one unusable German caption file).
| Added | What |
|---|---|
| `cards/06_Art_Direction` … `09_UI_Motion` | new buckets: art direction (189 topics) · script & story (104) · edit & pacing (61) · UI motion (67) |
| 533 set-2 cards | same four sections, plus **`### Worked example`** (a Meikigo topic, before → after, true mechanisms only) and **`### Check`** (yes/no tests to run on my own draft). AGENT_EXECUTION maps to our artefacts: script beats (RECIPE-D §3), shot-list rows (§4), frame-brief fields, `ref_<shot>.md`, raea only where visual |
| 22 new masters | 19 in buckets 06–09, 3 craft (`_cards2/CLUSTERS2-*.md` lists every topic) |
| 130 folds | set-2 values folded into set-1 masters (VALUES BY SOURCE rows) or appended as `## ADDENDUM — <source>` on single cards (`_cards2/fold-*.done.md`) |
| `INDEX.md` | now 872 topics in 9 sections |
Checks: fact scan of all 552 worked examples (`_cards2/FACT-SCAN.md`: 6 fixed, e.g. the non-existent RM1 coin, an
unverified DuitNow fee); raea tags checked against the skill docs, kit and EX4x (15 flagged: 1 typo fixed, 14 labelled
as episode-built stand-ins); house-rule scan (follow-line endings, bounce caps). Set 2 ran on Opus for 14 lists and
Sonnet for 17 after usage limits (spot check: same structure, more detail). Brief: `_cards2/BRIEF.md`.
Still to verify by a still render: gradient-filled text (ccrf card), the image element in the c07L1 shame-cut card.

## Read before using a card
- **Blender builds, raea renders.** Cycles/EEVEE settings in a card are for build-time checks only; AGENT_EXECUTION's raea
  block is what renders. Where raea has nothing (light linking, IES/gobo textures, volume bounces, film grain in the
  normal look, keying, per-hue grade, clarity), the card says `no equivalent` and gives a workaround.
- **Blender 5.3 code.** All bpy was run headless in Blender 5.3: 243 + 52 (masters) snippets run clean; 54 broken ones
  were fixed and re-verified. Remaining "errors" only need a prepared scene (named objects/nodes from an earlier step),
  an open editor, or a real asset file. Key 5.x changes: `action_get_channelbag_for_slot(...).fcurves`,
  `scene.compositing_node_group`, `sequence_editor.strips`, compositor node options are input sockets.
- **`RectLight` needs `range`** (WORKING-RULES §5, used in EX46) even though the raea skill docs list `range` only for
  Point/Spot. Many cards omit it — add `range` ≈ 2× the light-to-subject distance.
- **raea props:** every tag/prop used in the cards was checked against the raea-bevy docs, the kit and EX4x episodes; none
  is invented. Items still marked "verify" (e.g. `layers` for light linking, `"neutral"` = Khronos PBR Neutral) need a
  still test before you rely on them.
- **House rules are applied in the cards** (161 topics carry ⚠): eased camera starts/stops (linear only mid-move or for
  texture drift), overshoot capped at 3–5 % over ≥ 0.4 s, no whip/crash/snap-back moves, camera shake off by default,
  figures never walk/gesture (run-cycle cards keep only object/camera principles), one brand accent, no After Effects.
- `~` = value inferred (the video showed it but didn't say it); `unknown (visual only)` = can't be recovered from speech.

## Wired into the pipeline (user OK 2026-11-19)
- RECIPE-D §1 (shot list gets a `cards` column) and §5.1.9 (pull cards before the light/material pass).
- WORKING-RULES §7.1 (name the cards in `ref_<shot>.md`) and the §5 tools table.
- Set 2 (user OK 2026-11-21): `00_bible/checks/SCRIPT-CHECK.md` at RECIPE-D §3, `SHOT-FRAME-CHECK.md` at §4 (A) and §7 (B); episode skill updated.
- Still to do: prove it on the next Style D episode (before/after stills; keep the cards that make a visible difference).
