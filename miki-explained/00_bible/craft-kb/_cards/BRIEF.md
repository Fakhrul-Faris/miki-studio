# Card brief (Mode B) — Meikigo craft knowledge base

You turn YouTube 3D tutorial transcripts into technique cards for an AI agent that builds Meikigo explainer videos.

## Our pipeline (what the cards serve)
- 55–90 s vertical (9:16) explainers about small businesses / everyday money.
- **Blender (bpy) BUILDS** (model, modifiers, UV, bake, rigid-body bake) and exports GLB. **raea RENDERS** (real-time Bevy:
  PBR, lights, shadows, fog/volumetrics, bloom, AO, DoF, grade, tone map; **no path tracing, no Cycles**). Blender is never
  the final renderer.
- House look "Style D macro object": one everyday object at macro detail on a real surface, dark room, one soft top light,
  shallow DoF, bloom, one saturated brand accent only on what the line is about; a new camera setup every 2–3 s joined by
  camera flights and object morphs; objects change state on the words (x-ray, open, slice, multiply, become a chart).
- Rules a card must never contradict (flag instead): figures hold poses, never walk/gesture; no bouncy, rushed or flashy
  transitions (no whip pans, crash zooms, snap-back pushes); objects fade/grow/slide in ~0.4 s, never pop; camera moves are
  smooth eased in-out curves (no linear starts/stops, no move above ~130°/s or ~40 m/s); no people in street scenes by
  default; After Effects is prohibited; transitions are built from the scene's own objects.

## Before writing
1. Read the row for each of your files in `../TRIAGE.md` (techniques, visual gaps, conflicts). Your list file gives
   `filename<TAB>value`.
2. Read the raea skill so AGENT_EXECUTION uses **only real raea props**: `~/.claude/skills/raea-bevy/SKILL.md`, then the
   topic files you need (`lights.md`, `post.md`, `materials.md`, `animation.md`, `scene.md`, `limits.md`, `meshes.md`).
   Kit components live in `/Users/user/Private/miki-studio/miki-explained/tools/raea/kit/` (BlendShot.tsx, pro.tsx …).
   If raea has no equivalent, write `raea: no equivalent (reason)` — never invent a prop.
3. Read the whole transcript (files are in `../raw/`). Large files: read all of it in chunks; do not sample.

## Output — one file per distinct technique
Path: `../cards/<bucket>/<technique-slug>--<source-slug>.md` (bucket = 01_Animation_Motion · 02_Geometry_Nodes ·
03_Modeling_Modifiers · 04_Shading_Lighting · 05_Camera_Raea_Pipeline; choose per technique, not per video).
source-slug = short kebab of the video title (e.g. `dark-environments`). Create dirs as needed.

```markdown
---
title: <Technique name>
bucket: 04_Shading_Lighting
source: "<exact raw filename>"
source_time: "<timestamps if present>"
blender_version_source: 3.x
tool_target: Blender bpy | Geometry Nodes | Shader nodes | raea | principle-only
tier: full | principle        # full for value 4–5; principle for value 3 and non-Blender tools
style_fit: <one line: how it serves Style D / our rules, or "conflict: …">
---

## METADATA
Topic Bucket | Estimated Blender Version | Tool Target

## CREATIVE_INTENT
1–2 plain-English sentences: WHEN and WHY an explainer animator uses this (pacing, hierarchy, staging, motion feel).

## STE_PROCEDURE
1. Imperative verb first, active voice, ONE action, ≤ 20 words.
- Conditions BEFORE actions ("Before you apply the Boolean modifier, merge vertices by distance.").
- Replace "click here / drag this" with explicit parameter names and values (inferred from context; mark inferred values `~`).
- Never simplify official Blender / shader / GN / animation / raea terms.

## AGENT_EXECUTION
- Blender: canonical `bpy.ops` / `bpy.data` Python for Blender 4.2+ (5.x where it differs). Hotkeys → ops
  (Shift+A → `bpy.ops.mesh.primitive_*_add`, Ctrl+A → `bpy.ops.object.transform_apply`).
- Nodes: explicit links `NodeA [Socket] -> NodeB [Socket]` with values.
- raea: the TSX props/components that do this at render time (real props only, from the skill).
- If the video's tool is not Blender (Nuke/Houdini/Maya/3ds Max): give the source-tool setup under
  `### Source tool (<name>)` (nodes, settings, order), then `### Blender / raea translation`.

## NOTES
- Deprecated: name pre-4.0 APIs (Principled v1 sockets e.g. "Specular"→"Specular IOR Level", "Subsurface Color" removed,
  "Emission"→"Emission Color"; legacy EEVEE Bloom/SSR toggles → EEVEE Next / raea bloom; Filmic → AgX; Musgrave → Noise
  Texture with types; MixRGB → Mix node Color) and the modern equivalent.
- Visual gaps: steps that can't be followed from speech alone — say so; don't guess.
- Rule conflicts: how the card must be adapted for our rules.
```

## Tiers
- **full** (value 4–5, and the Blender 4.3 masterclass): every distinct technique gets its card with all four sections.
- **principle** (value 3, and the Nuke / Houdini / Maya courses): still write cards per technique, with **principle,
  method, ideas, execution, how-to and setup** — CREATIVE_INTENT carries principle + ideas; STE_PROCEDURE carries method +
  how-to; AGENT_EXECUTION carries source-tool setup + Blender/raea translation. For walk/run-cycle content, keep only what
  transfers to objects and cameras (curves, cycles, overlap, drag, spacing) and say so.

## Quality guardrails
- Strip filler, sponsors, intros/outros, hedging. Fix STT errors ("busy a curve" → "Bézier curve").
- Never drop modifier values, math-node operations, socket links or numbers to save space.
- Don't invent values the video doesn't give; inferred values carry `~`; unknown stays `unknown (visual only)`.
- One technique per card. A video usually yields 3–12 cards. A 3-hour course may yield 20–40.
- Also write `../_cards/<batch>.done.md`: a list of the cards you wrote (path — one-line summary) and anything skipped + why.
- Don't touch any other files. Final reply: "done", card count, anything you could not finish.

## RESUME MODE (2026-11-19, after a rate-limit stop)
Some cards already exist in `../cards/`. Before writing, run `grep -rl 'source: "<filename>"' ../cards` for each of your
files. For a file that already has cards: read them, compare with the transcript's techniques, and write ONLY the missing
techniques. Never overwrite or rewrite an existing card (fix one only if it is truncated/broken, and say so). Files with no
cards: do them fully. The done-list must list existing cards (marked "existing") and new ones.
