---
title: Progressive commitment — try many rough ideas fast, delete what fails, then commit
bucket: 05_Camera_Raea_Pipeline
source: "Making a SERENE render in blender.txt"
source_time: "04:56–07:50, 10:27–14:20, 15:38–16:42"
blender_version_source: 4.x
tool_target: principle-only
tier: full
style_fit: Matches our gates (grey-box board → world → check .blend → preview); exploration stays cheap until a direction is locked.
---

## METADATA
05_Camera_Raea_Pipeline | any | principle-only

## CREATIVE_INTENT
The early phase is uncertain; work fast and rough, add many things, delete the ones that fail, keep the good fragments. Once a clear goal appears (here ~2 hours in, after a short break), finishing is quick. Only what the camera sees matters; hidden intersections are fine for a still (not for a moving camera or hand-off).

## STE_PROCEDURE
1. Block out with a scale reference (a cube) and a rough camera.
2. Try several camera angles (below looking up, above looking down) before detailing.
3. Add ideas quickly without refining.
4. Delete what doesn't work; keep any good piece.
5. Take a short break when stuck; return and name the direction.
6. Commit to that direction and detail only it.
7. Judge by the camera view; ignore what's hidden — unless the shot moves or another person must reuse the scene.

## AGENT_EXECUTION
Pipeline mapping: steps 1–4 = grey-box board stills; step 6 = world build + check .blend; judge on stills (`raea render EDIT.tsx --frame N -o F.png`). Because our camera moves every 2–3 s, run the camera-clip scan for intersections/back-faces visible along each move before the preview.

## NOTES
- Deprecated: Quixel Bridge → Fab (2024 migration) for assets mentioned in passing; our assets are CC0/CC-BY logged in ASSET-SOURCES.md.
- Visual gaps: none.
- Rule conflicts: "doesn't matter if it looks bad behind the camera" holds only for a static still; our moving cameras require clean geometry along the path.
