---
title: Cool split-tone in the shadows of a warm frame
bucket: 05_Camera_Raea_Pipeline
source: "How to get nice colors in your renders.txt"
source_time: "17:36–18:12"
blender_version_source: n/a (Photoshop Camera Raw Color Grading)
tool_target: raea
tier: full
style_fit: Balances a warm top light in the dark room; in raea do it with a cool fill/ambient because <Grade> lift is not coloured.
---

## METADATA
05_Camera_Raea_Pipeline | n/a | raea (translation)

## CREATIVE_INTENT
Use when a frame is all warm: adding a little blue into the shadows only (even with no blue light in the scene) balances it and
adds depth; the warm highlights read warmer by contrast.

## STE_PROCEDURE
1. Open Camera Raw → Color Grading.
2. Set the Shadows wheel toward blue, low saturation (~5–10%).
3. Leave Midtones and Highlights untouched (usually).
4. Compare on/off; back off if it looks forced.

## AGENT_EXECUTION
### Source tool (Photoshop)
Camera Raw → Color Grading → Shadows: Hue ~220 (blue), Saturation ~5–10 (~).

### Blender / raea translation
- raea: no coloured shadow lift in `<Grade>` (its `lift` is a scalar). Translate in light: a dim cool fill on the shadow side — `<RectLight color="#9fc4ff" intensity={…} width height>` opposite the warm key, low intensity (~). (`<AmbientLight>` colour is not documented in the skill; don't rely on it.) Or a slight negative `<Grade temperature>` is global, not shadow-only.
- Blender compositor: Color Balance node (Lift/Gamma/Gain) with a blue Lift.

## NOTES
- Deprecated: none.
- Visual gaps: exact wheel position visual only.
- Rule conflicts: none; keep the blue far from the brand accent's saturation.
