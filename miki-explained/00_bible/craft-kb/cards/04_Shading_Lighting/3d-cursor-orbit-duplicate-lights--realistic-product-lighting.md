---
title: Orbit duplicated lights around the product — 3D cursor to product centre, pivot = cursor, R R / R 180
bucket: 04_Shading_Lighting
source: "Realistic Product Lighting In Blender.txt"
source_time: "02:50–03:51"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fast symmetric rig building; in raea the same is an angle around the hero in a lookingAt transform.
---

## METADATA
04_Shading_Lighting | any | Blender bpy → raea polar transforms

## CREATIVE_INTENT
Put the 3D cursor in the product’s centre so every duplicated light rotates around the product — opposite-side copies are one "R 180".

## STE_PROCEDURE
1. Select the product; Shift+S › Cursor to Active (or Shift+Right-click on it).
2. Set Transform Pivot Point = 3D Cursor.
3. Duplicate a light (Shift+D), press R R (trackball) or R Z to swing it round.
4. For the opposite side, type R Z 180.

## AGENT_EXECUTION
```python
import bpy, mathutils, math
sc = bpy.context.scene; sc.cursor.location = bpy.data.objects["Product"].matrix_world.translation
sc.tool_settings.transform_pivot_point = "CURSOR"
src = bpy.data.objects["Sharp"]; d = src.copy(); d.data = src.data.copy(); sc.collection.objects.link(d)
R = mathutils.Matrix.Rotation(math.radians(180), 4, "Z"); c = sc.cursor.location
d.matrix_world = mathutils.Matrix.Translation(c) @ R @ mathutils.Matrix.Translation(-c) @ src.matrix_world
```
raea: `const at = (a, r, h) => Transform.fromXyz(p[0] + r * Math.cos(a), h, p[2] + r * Math.sin(a)).lookingAt(p)` — the opposite light is `at(a + Math.PI, r, h)`.

## NOTES
- Deprecated: "Cursor to Active" naming in Shift+S menu (4.x).
- Visual gaps: none.
- Rule conflicts: none.

