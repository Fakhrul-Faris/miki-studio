---
title: Camera on a Follow Path curve (constraint order, path frames, curve resolution, Follow Curve)
bucket: 01_Animation_Motion
source: "Making blenders camera actually good.txt"
source_time: "05:35–07:51"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Builds Style D "camera flights" (orbit to top-down, crane, scale travel) as a designed curve; the camera path is then baked and checked for speed/turn rate before raea plays it.
---

## METADATA
01_Animation_Motion | 3.x → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
A flight between two setups reads as one intentional move when the camera rides a drawn curve while still aiming at the subject. Circles, spirals or hand-shaped paths give arcs a hand-keyed camera rarely gets smooth.

## STE_PROCEDURE
1. Add a curve for the route (Bezier Circle for an orbit, or any Bezier/NURBS path).
2. Select the camera (with the two-empty aim rig already on it) and add a Follow Path constraint; Target = the curve.
3. Before animating, zero the camera's Location so it sits exactly on the path (the constraint adds the original position as an offset).
4. If the camera points wrong, try another Forward Axis (default Y).
5. Move Follow Path ABOVE Damped Track in the stack (constraints evaluate top → bottom; otherwise the camera does not aim at `FT`).
6. Click Animate Path on the Follow Path constraint.
7. In the curve's Object Data > Path Animation, set Frames (default 100): more frames = slower, fewer = faster.
8. Before rendering any curved path, raise the curve's Resolution Preview U (default 12) to the maximum to stop jagged, bumpy camera travel.
9. If the camera rolls or rotates oddly, enable Follow Curve on the constraint.

## AGENT_EXECUTION
Blender:
```python
import bpy
scn = bpy.context.scene; cam = scn.camera
bpy.ops.curve.primitive_bezier_circle_add(radius=1.2, location=(0, 0, 0.6))   # ~ macro orbit radius
path = bpy.context.active_object; path.name = "CamPath"
path.data.resolution_u = 64            # video: "max"; UI max 1024 — 64+ is smooth for a camera
path.data.path_duration = 75           # Frames: ~2.5 s at 30 fps for one setup
cam.location = (0, 0, 0)
fp = cam.constraints.new('FOLLOW_PATH'); fp.target = path
fp.forward_axis = 'FORWARD_Y'; fp.use_curve_follow = False   # True only if it rotates oddly
i = list(cam.constraints).index(fp); cam.constraints.move(i, 0)   # Follow Path above Damped Track
with bpy.context.temp_override(object=cam, active_object=cam):
    bpy.ops.constraint.followpath_path_animate(constraint=fp.name, owner='OBJECT', frame_start=1, length=75)
```
raea: no constraint system — bake the evaluated camera per frame and play it. `tools/raea/blend2raea.py` writes `camera: [{p, t, fov}]` per frame, `kit/BlendShot.tsx` reads it. Pure-code alternative for an orbit:
```tsx
const a = interpolate(f, [f0, f1], [a0, a1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<Camera3d transform={Transform.fromXyz(r * Math.sin(a), h, r * Math.cos(a)).lookingAt(target)} projection={{ Perspective: { fov } }} />
```

## NOTES
- Deprecated: none. `constraints.move(from, to)` replaces the UI arrow/`bpy.ops.constraint.move_up`.
- Visual gaps: which button reorders the constraints is shown only (the stack's move control).
- Rule conflicts: Follow Path's default `eval_time` is linear (constant speed, hard start/stop) — violates our eased in-out rule. Always reshape `eval_time` with Bezier ease (see the evaluation-time card) and run the camera speed/turn check (≤ ~130°/s, ≤ ~40 m/s; scale m/s to macro scale) before hand-off.
