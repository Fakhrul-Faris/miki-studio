---
title: Tilt on the bottom edge (3D-cursor pivot) and recover
bucket: 01_Animation_Motion
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "54:55–56:10, 1:46:24–1:47:03, 2:36:31–2:37:56"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Gives a landing object weight (it rocks onto its rim and settles); keep the tilt small and eased so it never reads bouncy.
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy + raea `Entity` pivot

## CREATIVE_INTENT
When a product slides in or stops, it rocks onto the leading edge of its base as if about to topple, then falls back upright —
the momentum is sold by rotating about the base edge, not the centre. Also used as a forward lean while an object travels
("head toward the front") that rights itself when it stops.

## STE_PROCEDURE
1. In Edit Mode, select the bottom edge loop vertex/edge on the side the object leans toward.
2. Snap the 3D cursor to it: `Shift+S` → Cursor to Selected.
3. Return to Object Mode and set Transform Pivot Point to 3D Cursor.
4. Key the upright rest pose at the end frame (`I` → Location, Rotation & Scale).
5. At an earlier frame, rotate about X (`R X`) so the object leans on that edge; key Location, Rotation & Scale (rotating about the cursor changes location too, so key both).
6. Before you continue, set Pivot Point back to Median Point.
7. In the Graph Editor set the X Rotation keys to Free handles; make the lean fast and the return slow, timed to land exactly as the slide stops.

## AGENT_EXECUTION
- Blender:
```python
import bpy, mathutils, math
ob = bpy.context.object
r = max(ob.dimensions.x, ob.dimensions.y) / 2                # base radius
edge_pt = ob.matrix_world @ mathutils.Vector((0, -r, 0))      # r = base radius; bottom rim on -Y side
def rot_about(ob, pivot, angle, axis='X'):
    R = mathutils.Matrix.Translation(pivot) @ mathutils.Matrix.Rotation(angle, 4, axis) @ mathutils.Matrix.Translation(-pivot)
    ob.matrix_world = R @ ob.matrix_world
ob.keyframe_insert("location", frame=35); ob.keyframe_insert("rotation_euler", frame=35)
rot_about(ob, edge_pt, math.radians(-15), 'X')   # ~15° lean (value not given)
ob.keyframe_insert("location", frame=20); ob.keyframe_insert("rotation_euler", frame=20)
```
  (Operator path: `bpy.ops.view3d.snap_cursor_to_selected()`, `context.scene.tool_settings.transform_pivot_point = 'CURSOR'`,
  `bpy.ops.transform.rotate(value=..., orient_axis='X')`, `bpy.ops.anim.keyframe_insert_by_name(type="LocRotScale")`.)
- raea: pivot with nested Entities — outer Entity at the edge point, inner child offset back:
  `<Entity transform={Transform.fromXyz(0, 0, edgeZ).withRotation(Quat.fromEuler("XYZ", tilt, 0, 0))}><Entity transform={Transform.fromXyz(0, 0, -edgeZ)}><Model … /></Entity></Entity>`
  with `tilt = interpolate(f, [f0, f1], [-0.26, 0], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" })`.

## NOTES
- Deprecated: none.
- Visual gaps: lean angle never stated (eyeballed); `~15°` is inferred.
- Rule conflicts: a single lean-and-recover is fine; do not add a second back-swing (reads as bounce). Keep ≥ ~0.4 s on the recovery.
- bpy fixed for 5.3: incomplete snippet: defined `r` (base radius) from the object dimensions.
