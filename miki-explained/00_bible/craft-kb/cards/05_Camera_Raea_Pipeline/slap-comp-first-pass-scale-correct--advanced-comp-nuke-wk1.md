---
title: Slap comp — 70–90 % of the look in ~10 % of the time, with scale already correct
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "1:44:33–2:01:27"
blender_version_source: n/a (Nuke)
tool_target: principle-only
tier: principle
style_fit: Same role as our board → camera map + animatic → preview gate before detail; supports "plan before acting" and "preview before render".
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | principle-only

## CREATIVE_INTENT
Principle: show the creative direction fast and rough before spending hours on edges, because pieces that sounded right often fail in context. Idea: rough everything except what viewers will "fall in love with" — the creative team gets "tempitis" (attached to the temp), so anything technically wrong in the temp (wrong background scale, wrong lens) must be right from the first version.

## STE_PROCEDURE
1. Analyse the shot first: list what must be replaced, painted out, added (shake, lens look).
2. Read the plate's horizon/camera height and light quality before choosing any element.
3. Pull a quick rough key (Keylight: pick colour, raise clip black, lower clip white).
4. Reformat the background to the comp resolution (e.g. 11k × 5k → 1920 × 1080).
5. Grade the background roughly: gain, desaturate, warm the gamma.
6. Add a rough defocus (~30 px).
7. Compute the background scale from focal length and sensor size; never guess it in the temp.
8. Place the horizon where the plate's horizon is.
9. Crop to the delivery aspect early (2.35:1 → 1920/2.35 ≈ 817 px tall) so framing is judged as delivered.
10. Add a rough camera move only if it is part of the creative ask.
11. Present for approval (≈15–20 min of work) before any detailed pass.

## AGENT_EXECUTION
### Source tool (Nuke)
`Read` → `Keylight` (clip black up, clip white down) → `Merge(over)` ← `Read(bg)` → `Reformat` → `ColorCorrect` → `Defocus(30)` → `Transform(scale 1.58)` → `Reformat(new format "final output", 1920×817)` → `bm_CameraShake` (jitter/shake off, float 0.5, rotate 2).
### Blender / raea translation
- Our slap comp = RECIPE-D board + camera map + animatic, then `tools/raea/preview.sh EDIT.tsx f1,f2,… sheet.jpg` (540 px) before any final render.
- Lock in the temp what is costly to change later and what the user will get attached to: camera lens (`fov`), object scale, frame-0 composition, accent colour.
- Delivery frame: compose at 1080 × 1920 (9:16) from the first board; never judge on a 16:9 view.

## NOTES
- Rule conflicts: the rough shake step conflicts with Style D's smooth camera — skip it for our pipeline.
