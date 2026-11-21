# Triage brief (Mode A) — Meikigo craft knowledge base

Context: Meikigo makes 55–90 s vertical (9:16) explainer videos about small businesses / everyday money.
Pipeline: Blender (bpy) BUILDS and exports GLB; **raea** (real-time Bevy engine: PBR, lights, shadows, fog/volumetrics,
bloom, AO, DoF, grade, tone map; NO path tracing) RENDERS. House look "Style D macro object": one everyday object at
macro detail on a real surface, dark room, one soft top light, shallow DoF, bloom, one saturated brand accent; a new
camera setup every 2–3 s joined by camera flights and object morphs; objects change state on the words (x-ray, open,
slice, multiply, become a chart). Rules: figures hold poses (never walk/gesture); no bouncy/rushed flashy transitions;
objects fade/grow in ~0.4 s, never pop; After Effects prohibited; no people in street scenes by default.

Buckets: 01_Animation_Motion · 02_Geometry_Nodes · 03_Modeling_Modifiers · 04_Shading_Lighting · 05_Camera_Raea_Pipeline
(05 = camera staging, composition, cinematography, render engines, render speed, compositor/colour grade, passes).

For EACH file in your batch list (files are in ../raw/), read it (for files > 15k words read the start, middle and end
and skim headings/timestamps; say "sampled" in notes). Write one markdown table row:

| file | primary | secondary | blender_ver | words | caption_quality | tool | value | visual_gaps | conflicts | techniques |

- blender_ver: 2.8 / 3.x / 4.x / 5.x / n/a (other DCC) — infer from UI/feature mentions (e.g. "Principled v2", "EEVEE Next", "AgX", "Geometry Nodes simulation zone" ⇒ 3.6+/4.x; "Filmic" default ⇒ ≤3.6); add "?" if guessing.
- words: use `wc -w`.
- caption_quality: Clean / Needs Repair / Unusable (+ the typical STT errors you saw, e.g. "busy a curve→Bézier curve").
- tool: Blender / Maya / Houdini / Nuke / After Effects / 3ds Max / general.
- value (1–5) for OUR pipeline above, with a 5–10 word reason. Path-tracing-only tips (Cycles samples/denoise) score low unless the principle transfers to raea.
- visual_gaps: specific segments (timestamps if present) where the procedure can't be inferred from speech alone; "none" if fully followable.
- conflicts: anything that clashes with our rules (walk cycles, character gesture, bouncy motion, AE, flashy transitions) or uses deprecated APIs (pre-4.0 Principled sockets, legacy EEVEE bloom/SSR toggles, Filmic, Musgrave node, etc.) — name the modern 4.x equivalent if known.
- techniques: semicolon list of the distinct techniques (3–12) that could each become a knowledge card, short names.

Write your rows (with the header line) to ../_triage/batchN.md (N = your batch number). Don't edit anything else.
Be factual; don't invent content not in the transcript. Final reply: just "done" + any file you couldn't read.
