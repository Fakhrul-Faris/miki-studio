---
title: Inverse-square falloff — a close light to steer attention
bucket: 04_Shading_Lighting
source: "Fundamentals of Lighting in Blender.txt"
source_time: "11:04–16:17"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Strong fit — put the single top light close to the part the line is about (the price, the slot, the QR) and let falloff darken the rest; no extra hidden lamps.
---

## METADATA
04_Shading_Lighting | 4.x | Blender bpy, raea

## CREATIVE_INTENT
Light from a point source falls to a quarter each time the distance doubles, which is much steeper than people guess (not 80 %, but 25 %). Bring one strong light very close to the detail the viewer must look at; the high local contrast pulls the eye there, and the rest of the scene darkens on its own.

## STE_PROCEDURE
1. Decide which part of the frame must win attention.
2. Move a Point lamp close to that part, slightly above it.
3. Lower the lamp Power until the hot spot is not clipped.
4. Check that surfaces at double the distance get about a quarter of the light.
5. Do not add hidden lamps to darken the rest; let the falloff do it.

## AGENT_EXECUTION
Blender:
```python
import bpy
L = bpy.data.objects["Key"]
L.location = (0.2, -0.3, 0.6)  # ~ close to the detail (e.g. the buckle/window)
L.data.energy = 60             # ~ lower: irradiance ∝ P / d²
```
raea (PointLight / SpotLight lumens fall with distance squared — `lights.md`):
```tsx
<SpotLight transform={Transform.fromXyz(0.15, 0.7, 0.3).lookingAt([0, 0.1, 0])}
  intensity={120000} outer_angle={0.5} inner_angle={0.25} range={4}
  soft_shadows_enabled shadow_maps_enabled radius={0.15} />
// 900,000 lm at 3 m ≈ bright; at 0.75 m the same brightness needs ~56,000 lm (÷16).
```
Animate `intensity` / `transform` from the frame to move the hot spot onto the next subject on the word (smooth eased path, no snap).

## NOTES
- Deprecated: none.
- Physics: irradiance ∝ 1/d²; tone mapping (AgX / `tony`) makes the 25 % look less extreme on screen than it is in scene values.
- Visual gaps: exact light positions in the demo are visual only.
- Rule conflicts: none; if the light is animated to "travel" to a new detail, use an eased in-out curve.
