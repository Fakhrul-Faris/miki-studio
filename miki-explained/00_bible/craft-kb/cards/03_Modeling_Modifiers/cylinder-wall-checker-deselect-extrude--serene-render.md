---
title: Blockout back wall — 128-segment cylinder with Checker Deselect + extrude for regular relief
bucket: 03_Modeling_Modifiers
source: "Making a SERENE render in blender.txt"
source_time: "00:36–01:53"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: Quick detailed backdrop that fills empty space behind a hero object (falls into DoF blur in Style D).
---

## METADATA
03_Modeling_Modifiers | 4.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
Start with the general enclosing shape and a camera so you're oriented; give the base wall cheap regular detail early so later layers never reveal an empty, awkward background.

## STE_PROCEDURE
1. Add a Cylinder with Vertices = 128 so the curve is not steppy.
2. Add a camera at ~24 mm, zoomed out, to frame the blockout.
3. In Edit Mode select a ring of side faces, then Select > Checker Deselect.
4. Extrude the remaining faces inward/outward along normals for regular ribs.
5. Add a few more inset/extrude passes for general detail.

## AGENT_EXECUTION
```python
import bpy
bpy.ops.mesh.primitive_cylinder_add(vertices=128, radius=6, depth=8)
bpy.ops.object.camera_add(location=(0, -4, 1.6)); bpy.context.object.data.lens = 24
wall = bpy.data.objects["Cylinder"]; bpy.context.view_layer.objects.active = wall
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_mode(type='FACE')
# select the side faces (e.g. by normal/loop; manual in video), then:
bpy.ops.mesh.select_nth(skip=1, nth=1, offset=0)        # Checker Deselect
bpy.ops.mesh.extrude_region_shrink_fatten(TRANSFORM_OT_shrink_fatten={"value": -0.1})  # ~ depth
bpy.ops.object.mode_set(mode='OBJECT')
```
raea: no equivalent at build level (export as GLB). In Style D this wall is usually out of focus (`DepthOfField aperture_f_stops` 1.4–2.8).

## NOTES
- Deprecated: none.
- Visual gaps: which faces were selected and extrude depths are viewport-only; speaker notes the checker pattern did not line up perfectly.
- Rule conflicts: none.
