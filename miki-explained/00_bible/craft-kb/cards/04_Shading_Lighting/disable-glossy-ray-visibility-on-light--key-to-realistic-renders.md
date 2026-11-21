---
title: Kill a light’s CG-looking reflection by disabling its Glossy ray visibility
bucket: 04_Shading_Lighting
source: "The Key to Realistic Renders in Blender.txt"
source_time: "11:50–12:51"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Quick fix for a harsh light-shape reflection on a glossy hero; raea’s highlight comes from the light model, so the fix there is light size/roughness.
---

## METADATA
04_Shading_Lighting | 4.x (Cycles) | Blender bpy → raea radius/roughness

## CREATIVE_INTENT
Blender light shapes produce sharp, unnatural reflections on products. Turning off the light’s glossy visibility removes the reflection — but on very reflective surfaces that looks wrong too, because a real lamp would reflect.

## STE_PROCEDURE
1. Select the light.
2. Object Properties › Visibility › Ray Visibility: uncheck Glossy.
3. Check reflective materials — if the missing reflection looks odd, use a gradient emissive plane instead.

## AGENT_EXECUTION
```python
import bpy
bpy.data.objects["Key"].visible_glossy = False     # Cycles
```
raea: no per-light glossy toggle. Soften the highlight instead: larger `radius` on SpotLight/PointLight, `<RectLight>` for a soft panel, or a touch more `perceptual_roughness`/`clearcoat_perceptual_roughness` on the hero.

## NOTES
- Deprecated: light ray visibility moved from `light.cycles` to `Object.visible_*` in 3.0.
- Visual gaps: none.
- Rule conflicts: none.

