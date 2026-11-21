---
title: Monochromatic palette (one hue, varied value and saturation)
bucket: 04_Shading_Lighting
source: "How to get nice colors in your renders.txt"
source_time: "06:48–08:13"
blender_version_source: n/a
tool_target: principle-only
tier: full
style_fit: Ideal Style D base — the dark room and surface share one hue so the single brand accent is the only colour that breaks it.
---

## METADATA
04_Shading_Lighting | n/a | principle-only (raea materials/lights/grade)

## CREATIVE_INTENT
Use for an easy cohesive frame: keep almost everything in one hue and vary only brightness and saturation, even in the deep
shadows. Everything goes together because it is the same colour; a single off-hue element then pops.

## STE_PROCEDURE
1. Choose one hue for the frame (e.g. orange-yellow, or blue-green).
2. Set lights, surfaces and background within a narrow hue range of it.
3. Vary only value (bright/dark) and saturation between elements.
4. Keep shadows in the same hue (darker, not grey).
5. Optionally allow one small element of another hue as the focal accent.
6. Verify by sampling pixels: hue stays nearly constant; S and V vary.

## AGENT_EXECUTION
### raea
- Same-hue lights and surfaces: e.g. key `<SpotLight color="#ffd9a0">`, a dim on-hue fill `<RectLight color="#8a5a2a" intensity={…} width height />` opposite the key (~; keeps shadows on-hue — `<AmbientLight>` takes `brightness`, a `color` prop is not documented in the skill), floor `base_color="#6b4a2a"`.
- Lean the whole frame: `<Grade temperature={…} shadows={{ saturation: 1.1 }} />` (one grade for the piece).
- The accent material is the only one outside the hue band.

## NOTES
- Deprecated: none.
- Visual gaps: example frames' hex values visual only.
- Rule conflicts: none.
