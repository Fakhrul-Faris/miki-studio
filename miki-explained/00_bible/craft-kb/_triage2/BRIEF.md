# Triage brief, set 2 (Mode A): art direction, script, edit, UI motion

Context: Meikigo makes "Miki Explained", 55–90 s vertical (9:16) explainers and how-tos for TikTok/Instagram about small
businesses and everyday money, Malaysia-first (often in Bahasa Melayu). Viewers decide in the first second.
Pipeline: script (formula below) → shot list → board → Blender BUILDS models (GLB) → **raea RENDERS** (real-time Bevy
engine via React/TSX: PBR, lights, shadows, fog, bloom, AO, DoF, grade; 2D text/UI layers over 3D; NO path tracing).
HyperFrames (HTML/SVG → video) is the flat/2D engine. **After Effects is prohibited**: AE tutorials are valuable only for
the principle (easing values, timing, morph logic, match-cut logic, layout) translated to raea/HyperFrames.

House look "Style D macro object": one everyday object at macro detail on a real surface, dark room, one soft top light,
shallow DoF, bloom, one saturated brand accent only on what the line is about; a new camera setup every 2–3 s joined by
camera flights and object morphs; an on-screen event about every second, on the word; objects change state on the words
(x-ray, open, slice, multiply, become a chart). UI-heavy topics (apps, websites, QR payments) are ~80% interface scenes.

Script formula (55–70 words default; longer when the story has a timeline): Hook → Open loop → Mechanism → Proof↔Payoff →
End → Follow. Lines ≤ 15 words, sentences < 12 words. Plain language a 12-year-old follows; result first; keep the RM
"wow" numbers. Style D: frame-0 text ≤ 8 words, one idea, end text = a question.

House rules (flag any clash as a conflict): visualise what the line literally says (a metaphor only when the line is
one); figures hold poses, never walk/gesture, no hand-drawn/coded people; no bouncy, rushed or flashy transitions (no whip
pans, crash zooms, glitches, generic wipes/flashes/dissolves); objects fade/grow/slide in ~0.4 s, never pop; transitions
built from the scene's own objects; one brand accent colour; the real brand logo on screen from frame 1; captions use the
house style (never restyle); retired styles never proposed (cut-paper collage, paper diorama, printed 3D); no generated
images/video as finished footage (generated images are references only; no Seedream/Dreamina subscription).

Buckets:
- `06_Art_Direction`: composition for 9:16, framing, visual hierarchy, colour script / palettes / 60-30-10, shape
  language, visual metaphor and analogy design, production design, frame briefs, reference analysis, lighting *as
  storytelling* (motivation, chiaroscuro, silhouette, negative space), typography/graphic layers.
- `07_Script_Story`: hooks, open loops, ABT / but-therefore, structure (3-act, documentary), suspense, explaining
  complex things, analogies in words, plain language, endings, research/writing workflow.
- `08_Edit_Pacing`: cut rhythm, pacing, match cuts, transitions, speed ramps, beat/sound-led editing, storyboards and
  animatics, documentary edit styles (Fern, Imperial, Johnny Harris).
- `09_UI_Motion`: UI/SaaS/Apple-style interface motion, shape morphs, widget animation, kinetic text, cursor/click
  choreography, screen-in-3D staging.
- Set-1 buckets for pure craft: `01_Animation_Motion` · `02_Geometry_Nodes` · `03_Modeling_Modifiers` ·
  `04_Shading_Lighting` · `05_Camera_Raea_Pipeline`.

## For EACH file in your batch list (paths relative to `../raw2/`)
Read the whole file (files > 15k words: read all of it in chunks; this set has no sampling). Write one table row:

| file | primary | secondary | words | caption_quality | tool | value | overlap_set1 | visual_gaps | conflicts | techniques |

- file: the path exactly as in the list.
- words: `wc -w`.
- caption_quality: Clean / Needs Repair / Unusable (+ typical STT errors seen).
- tool: general / After Effects / Blender / Cinema 4D / KeyShot / Unreal / Photoshop / other.
- value (1–5) **for our pipeline** with a 5–10 word reason. 5 = changes how we write a script, plan shots or art-direct a
  frame, or gives exact motion values we'd use; 1 = tool clicking with no transferable principle, or generic fluff.
- overlap_set1: does set 1 already cover these techniques? grep `../INDEX.md` (372 topics) and `../masters/` for the key
  terms; name the matching master/card files, or "none". Only "new" techniques make new cards later.
- visual_gaps: segments (timestamps) where the method can't be followed from speech alone; "none" if followable.
- conflicts: clashes with the house rules above (incl. AE-only steps, generative-AI rendering, flashy transitions, walk
  cycles, character acting); say how to adapt.
- techniques: semicolon list of 3–12 distinct techniques that could each become a card; mark ones already in set 1
  with "(set1)".

Write your rows (with the header line) to `../_triage2/batchNN.md` (NN = your batch number, two digits).
Don't edit anything else. Be factual; don't invent content not in the transcript.

## RESUME MODE
If `../_triage2/batchNN.md` already exists, read it, keep its rows, and add rows only for files still missing.
Final reply: just "done" + any file you couldn't read.
