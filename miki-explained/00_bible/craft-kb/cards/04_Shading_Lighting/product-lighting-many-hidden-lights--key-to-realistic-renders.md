---
title: Product lighting — as many lights as needed, invisible to camera, copied from real product photography
bucket: 04_Shading_Lighting
source: "The Key to Realistic Renders in Blender.txt"
source_time: "09:45–11:50"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Our hero object is a product shot each beat; tech = harder light, luxury = softer — choose per object.
---

## METADATA
04_Shading_Lighting | 4.x | Blender bpy (ray visibility) → raea lights (always invisible)

## CREATIVE_INTENT
Product light exists to show features, shape and material, not to tell a mood. Unlike story shots, use as many lights as needed — tech products get harder light, luxury goods (perfume) softer tones, cars either very artificial or very natural. Learn by copying top brands (Apple, Bang & Olufsen, X3 studio).

## STE_PROCEDURE
1. Pick the product category look (tech = hard, luxury = soft, car = artificial or natural).
2. Collect reference renders from top brands of that category.
3. Add lights or emissive planes wherever the reference shows highlights.
4. For each emissive plane, disable Object › Visibility › Ray Visibility › Camera so it lights and reflects but isn’t seen.
5. Use Light Linking to stop lights affecting areas you don’t want lit.
6. Aim lights at the product with a Track To constraint.

## AGENT_EXECUTION
```python
import bpy
card = bpy.data.objects["SoftCard_L"]
card.visible_camera = False          # still lights + reflects
```
raea: lights are never drawn, so `<RectLight>`/`<SpotLight>` already are "hidden lights". An emissive card does NOT light or reflect in raea (materials.md: emissive doesn’t light neighbours; glossy surfaces reflect the Environment and light highlights). For the reflection shapes product shots rely on, use a studio panorama: `<Environment src={staticFile("studio_small_09_1k.hdr")} intensity rotation />` (Poly Haven CC0) without `background`.

## NOTES
- Deprecated: `cycles_visibility.camera` (≤2.9x) → `Object.visible_camera` (3.0+).
- Visual gaps: none.
- Rule conflicts: none.

