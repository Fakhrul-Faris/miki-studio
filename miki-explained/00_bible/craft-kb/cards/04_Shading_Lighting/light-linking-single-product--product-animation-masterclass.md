---
title: Light linking — an extra area light that brightens only one under-lit product
bucket: 04_Shading_Lighting
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:21:24–1:21:55, 1:34:21–1:35:36"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Lets the accent-coloured subject get its own light without lifting the rest of the dark set (one subject lit, rest dim).
---

## METADATA
04_Shading_Lighting | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
In a group shot one product (the orange can) sits under-lit, but a stronger general light would flatten the hero black can.
A linked light touches only that object.

## STE_PROCEDURE
1. Name objects clearly before linking (the author regrets "Cylinder.001").
2. Add an Area light near the under-lit product.
3. Light's Object Properties › Shading › Light Linking › New.
4. Drag the target object into the Receiver collection; everything else is excluded.
5. Move the light (e.g. up) and toggle it on/off to check only the target changes.

## AGENT_EXECUTION
- Blender:
```python
col = bpy.data.collections.new("OrangeLit"); col.objects.link(bpy.data.objects["Can_Orange"])
lamp = bpy.data.objects["Area.009"]
lamp.light_linking.receiver_collection = col        # Blender 4.0+
```
- raea: `layers` exist on parts, lights and the camera (Bevy RenderLayers, limits.md); prop format undocumented — check
  `raea guide coverage` first. Documented fallbacks: a `SpotLight` with a narrow `outer_angle` aimed only at the product, or a
  short-`range` `PointLight` beside it.

## NOTES
- Deprecated: none (light linking from 4.0; EEVEE from 4.2).
- Visual gaps: light placement is visual.
- Rule conflicts: none.
