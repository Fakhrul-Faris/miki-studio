---
title: A separate world colour seen only in reflections (Light Path glossy ray)
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/Easy Blender Lighting HACK [Blender Tutorial].txt"
source_time: "01:27–01:53"
tool_target: raea
tier: principle
use_when: "glossy heroes (phone glass, coins, metal tins) need richer reflections without changing the room's lighting"
style_fit: "Fits Style D's dark room: reflections can carry a soft complementary tint while the room stays dark. Keep the tint desaturated so it never becomes a second accent."
---

## METADATA
04_Shading_Lighting | Blender (World: Light Path, Mix Shader, two Background nodes) | raea Environment / RectLight

## CREATIVE_INTENT
"For extra oomph": mix two Background shaders with a Mix Shader driven by Light Path > Is Glossy Ray. Diffuse light
comes from the sky setup; glossy reflections see a second background whose hue complements the scene. "This will make
the world more reflective."

## STE_PROCEDURE
1. Keep the existing world (lighting) as background 1.
2. Add background 2 with a hue that complements the scene.
3. Mix them so only glossy rays see background 2 (Light Path Is Glossy Ray → Mix factor).
4. Render a glossy hero and check reflections changed while diffuse lighting did not.

## AGENT_EXECUTION
raea has no Light Path node: `raea: no equivalent (no per-ray-type world shader)`. Closest real props: an
`<Environment src={staticFile("studio.hdr")} intensity={0.3} />` without `background` (lights softly, reflects in glossy
surfaces; the page backdrop stays dark), or an off-camera `<RectLight width height color intensity range>` placed where
the reflection should appear (no shadows; `range` ≈ 2× light-to-subject distance).
### Worked example
Phone-screen setup for "Cara semak duit masuk dalam app" (how-to): BEFORE — the black glass reflects nothing, the phone
reads as a flat rectangle. AFTER — an off-camera RectLight (`#9fb2d9`, desaturated cool) streaks across the glass;
the room stays dark and the accent stays on the incoming amount.
### Check
- Did reflections gain shape while the room's lighting stayed the same?
- Is the reflection tint desaturated (not a second accent)?

## NOTES
- Blender-only mechanism; translation is approximate.
