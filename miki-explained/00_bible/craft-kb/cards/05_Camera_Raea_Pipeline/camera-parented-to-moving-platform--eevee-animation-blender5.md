---
title: Camera parented to a moving platform (elevator rig), two-key lift, pause, then push forward
bucket: 05_Camera_Raea_Pipeline
source: "Creating an Animation in Eevee (Blender 5.0).txt"
source_time: "00:09–02:00, 17:04–18:29, 23:19–24:02"
blender_version_source: 5.0
tool_target: Blender bpy
tier: full
style_fit: good — a camera riding a carrier (tray, conveyor, lift) gives a motivated, smooth flight; the move must be eased and under our speed caps
---

## METADATA
05_Camera_Raea_Pipeline | Blender 5.0 | Blender bpy + raea

## CREATIVE_INTENT
Animate the thing the viewer rides (an elevator platform) and parent the camera to it, so the camera move is motivated and stays planted. One start key and one end key carry the whole lift; a short hold at the top ("oh, where are we?") then a slightly faster forward move gives the shot its beat.

## STE_PROCEDURE
1. Add a Cube for the platform at the centre of the set.
2. Set the camera Focal Length to 24 mm (wide, for a tight space).
3. Parent the camera to the platform (Object > Parent > Object, Keep Transform).
4. At the first frame, insert a Location keyframe on the platform.
5. At the last frame of the lift, move the platform up and insert a Location keyframe.
6. To add the forward move at the top, key the camera's Y location after the lift ends and move it forward later in the Graph Editor.
7. Before you finalise, add a short hold between the lift's end and the forward move (a pause at the top).
8. To slow the whole move, select all keys and scale them on the X axis (time) in the Graph Editor.

## AGENT_EXECUTION
```python
import bpy, math
sc = bpy.context.scene
bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 0, 0)); plat = bpy.context.object; plat.name = "platform"
cam = sc.camera; cam.data.lens = 24
cam.parent = plat; cam.matrix_parent_inverse = plat.matrix_world.inverted()
LIFT_END, HOLD, PUSH_END = 200, 24, 280            # ~ frames not given
plat.location.z = 0;  plat.keyframe_insert("location", index=2, frame=sc.frame_start)
plat.location.z = 12; plat.keyframe_insert("location", index=2, frame=LIFT_END)   # ~ height
cam.keyframe_insert("location", index=1, frame=LIFT_END + HOLD)
cam.location.y += 6;  cam.keyframe_insert("location", index=1, frame=PUSH_END)    # ~ distance
# step 8: scale timing ~1.2x about frame_start
bpy.ops.transform.transform(mode='TIME_SCALE', value=(1.2, 0, 0, 0))  # run in Graph/Dope Sheet context
```
Export: bake the parented camera to world space before GLB (`bpy.ops.nla.bake(frame_start, frame_end, visual_keying=True, clear_parents=True, bake_types={'OBJECT'})`) so `tools/raea/blend2raea.py` / `kit/BlendShot.tsx` read the per-frame world camera.

raea:
```tsx
const ease = { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const lift = interpolate(f, [0, LIFT_END], [0, 12], ease);
const push = interpolate(f, [LIFT_END + HOLD, PUSH_END], [0, 6], ease);
<Entity transform={Transform.fromXyz(0, lift, 0)}>   {/* the platform: camera transform composes through it in Blender; in raea compute the world pose */}
</Entity>
<Camera3d transform={Transform.fromXyz(0, 1.6 + lift, 4 - push).lookingAt([0, 1.4 + lift, -10])} projection={{ Perspective: { fov: (60 * Math.PI) / 180 } }} />
```
(The camera is "the first camera", not a child of an Entity — compute its world transform from the same `lift` value as the platform.)

## NOTES
- Deprecated: none.
- Visual gaps: lift height, frame numbers and push distance are on screen only (`~`).
- Rule conflicts: keep both moves eased in-out and below ~40 m/s and ~130°/s; the "hold then faster forward" must not become a snap — ease out of the hold. 24 mm is wider than Style D macro; use a longer lens for product setups.

## ADDENDUM — Fern 3D Edits (two-empty rig)
Variant for when the move must always reframe onto one fixed point, rather than riding a platform directly: place a
static look-target empty exactly at the frame's centre (using the camera's composition-guide Center overlay), give
the camera a Track To constraint aimed at that empty so the frame never drifts regardless of camera position, then
add a *second* empty parented to the camera itself and keyframe that empty's position for the push — the Track To
constraint keeps the aim correct automatically throughout. Use this instead of the platform-parent rig whenever the
shot needs a fixed-point reframe that survives later camera-position edits. Also adds a keyframe-scaling detail:
set the Graph Editor pivot to **Individual Centers** (not Bounding Box Center) before scaling the start/end keys on
X to intensify ease — this exaggerates each key's own ramp independently, giving a stronger slow-in/slow-out than
scaling the whole set about one shared centre. Both variants still must land within ~130°/s and ~40 m/s, eased in-out.
