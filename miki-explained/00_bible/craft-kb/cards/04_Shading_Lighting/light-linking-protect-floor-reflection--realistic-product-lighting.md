---
title: Light Linking so product lights don’t blow out the reflective floor
bucket: 04_Shading_Lighting
source: "Realistic Product Lighting In Blender.txt"
source_time: "06:39–07:13"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Our glossy dark studio floor is the same problem; in raea solve it by cone aim and floor roughness.
---

## METADATA
04_Shading_Lighting | 4.0+ | Blender light linking → raea workaround

## CREATIVE_INTENT
Once a ground is added, the product lights wreck its reflections. Linking each light to only the product keeps the floor’s reflection clean.

## STE_PROCEDURE
1. Select a light; Object Properties › Shading › Light Linking.
2. Create a new Light Link collection; drag in the products/objects it should affect.
3. Repeat for every light.

## AGENT_EXECUTION
```python
import bpy
rx = bpy.data.collections.get("ProductOnly") or bpy.data.collections.new("ProductOnly")
if "Product" not in rx.objects: rx.objects.link(bpy.data.objects["Product"])
for o in bpy.data.objects:
    if o.type == "LIGHT": o.light_linking.receiver_collection = rx
```
raea: no per-light linking documented. Aim narrow `<SpotLight outer_angle>` cones at the product so little spills to the floor; keep floor `perceptual_roughness` ~0.35–0.5 (BlendShot ground 0.45); use `<RectLight>` (shadowless, soft) for fills so they leave no hot spots. See the light-linking card (key-to-realistic-renders) for the `layers` caveat.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none.

