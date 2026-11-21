---
title: Contrast tells distance — de-contrast and haze place an element deep in the scene
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "20:39–21:46"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Fits Style D's dark room: the hero stays full-contrast in the light; anything behind it loses contrast into the backdrop, which deepens space without adding objects.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: contrast is a depth cue. Deep, punchy contrast says "close"; lowered contrast says "far, through air" — mountains the same colour as the foreground rock look distant only because a thin haze lies over them. Idea: use contrast, not only size, to place an element in depth and to imply a large space.

## STE_PROCEDURE
1. Decide where in depth the element sits before grading it.
2. If it sits far back, lower its mid-tone contrast and lift its blacks toward the haze colour.
3. If it sits in the foreground, keep full contrast matching the nearest plate objects.
4. Compare with plate objects at the same depth (e.g. far mountains) and match their contrast.

## AGENT_EXECUTION
### Source tool (Nuke)
`ColorCorrect`/`Grade` on the element: lower `contrast`, raise `lift`/`offset` toward the haze tint.
### Blender / raea translation
- raea does this physically: `<Fog color={backgroundColour} near={n} far={f} />` (use the backdrop colour so distant parts dissolve into it), or `density={~0.02–0.05}` for exponential haze. Keep `far` beyond the hero's distance (post.md: fog shorter than the subject hides it).
- Local haze between hero and background: `<VolumetricFog />` + `<FogVolume density={~0.02} scattering={~0.4} />` behind the hero only.
- Do not lower contrast with `<Grade>` for depth — Grade is frame-wide.

## NOTES
- Rule conflicts: none. Keep haze subtle; Style D is a dark room, not a foggy one.
