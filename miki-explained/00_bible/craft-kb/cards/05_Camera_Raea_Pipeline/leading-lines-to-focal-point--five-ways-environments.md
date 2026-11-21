---
title: Leading lines: arrange existing scene lines so they point at the focal point
bucket: 05_Camera_Raea_Pipeline
source: "5 Ways to Create Better Environments in Blender.txt"
source_time: "05:38–06:40"
blender_version_source: n/a?
tool_target: Blender bpy | raea | principle-only
tier: full
style_fit: Strong fit: counter edges, cables, receipt rolls and shelf lines can all aim at the hero object the line is about.
---

## METADATA
05_Camera_Raea_Pipeline | n/a → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
Lines in the image (ropes, arches, edges) guide the eye naturally. Nudge objects so their lines happen to point at the focal point, the most important part of the picture. It is cheap to do and reads as a pleasing, intentional frame.

## STE_PROCEDURE
1. Identify the focal point of the setup (the object the spoken line is about).
2. In rendered camera view, find lines already present: edges, cables, arches, rows of props.
3. Rotate or move those objects so their lines converge on or run toward the focal point.
4. Re-check through the camera; the lines only matter in the 2D frame, not in 3D.
5. Remove or re-angle any strong line that leads the eye out of frame.

## AGENT_EXECUTION
Blender check: project a prop's line endpoints to 2D and test whether its extension passes near the focal point.
```python
import bpy
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view as w2c
scn = bpy.context.scene; cam = scn.camera
def p2(v): q = w2c(scn, cam, v); return Vector((q.x, q.y))
focal = p2(bpy.data.objects["Hero"].matrix_world.translation)
def miss(a, b):                       # distance of the focal point from the 2D line a→b, in frame units
    d = (b - a).normalized(); n = Vector((-d.y, d.x)); return abs((focal - a).dot(n))
o = bpy.data.objects["Cable"]          # ~ example prop
a, b = p2(o.matrix_world @ Vector((0, 0, 0))), p2(o.matrix_world @ Vector((1, 0, 0)))
print("miss", round(miss(a, b), 3))   # < ~0.05 = leads to the focal point
```
raea: no special prop; it is placement. Lines read best when the key light rakes along them (a SpotLight from the side of the line) and DoF leaves them sharp near the focal point.

## NOTES
- Deprecated: none.
- Visual gaps: example images only on screen.
- Rule conflicts: none. Combine with one brand accent on the focal object so line and colour agree.
