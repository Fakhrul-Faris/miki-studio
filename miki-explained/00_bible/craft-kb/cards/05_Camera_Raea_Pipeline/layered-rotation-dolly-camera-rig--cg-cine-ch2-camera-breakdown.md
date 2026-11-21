---
title: Layered camera rig: rotation-only main camera under a translation-only dolly transform
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 2 | Basic Camera Breakdown.txt"
source_time: "02:57–03:43, 09:19–15:14, 18:12–19:50"
blender_version_source: n/a (Houdini)
tool_target: principle-only | Blender bpy | raea
tier: principle
style_fit: Clean way to structure camera code so position moves (flights) and aim moves (pans, tilts) are keyed and eased independently.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini) → Blender 4.2+ / raea | principle + translation

## CREATIVE_INTENT
Principle: split the camera into layers, like a real rig. The main camera only rotates (pan, tilt, roll) and is set once at the starting position; a "dolly" transform above it (the grip pushing the dolly) only translates (push, slide, boom); a separate "shake" layer adds noise. Each layer's curves stay simple and readable.
Ideas: one layer per job lets you swap a push for a slide without disturbing the framing.

## STE_PROCEDURE
Method:
1. Place the main camera at the starting frame and composition; from now on use it for rotations only.
2. Add a dolly transform as the camera's parent with Keep Position When Parenting on.
3. Clean (zero) the dolly transform so its keys start from zero offset.
4. Never move the main camera's translates after parenting; translate only on the dolly layer.
5. Animate the push / slide / boom on the dolly layer; animate pan / tilt / roll on the main camera.
6. For a different move variant, duplicate the whole rig rather than re-plugging a second transform into the chain (re-plugging re-bases the values and corrupts the existing move).
7. For shake, add a third layer (see the handheld-noise card).

## AGENT_EXECUTION
### Source tool (Houdini)
`Null/Transform "dolly" (translate only; Keep Position When Parenting; Clean Transform) → cam1 (rotate only)`; duplicate the chain per variant; avoid Copy Parameter → Paste Relative Reference between rigs (a shared shake changes both).
### Blender / raea translation
Blender:
```python
import bpy
scn = bpy.context.scene; cam = scn.camera
dolly = bpy.data.objects.new("CAM_dolly", None); scn.collection.objects.link(dolly)
dolly.matrix_world = cam.matrix_world.copy(); dolly.rotation_euler = (0, 0, 0)
cam.parent = dolly; cam.matrix_parent_inverse = dolly.matrix_world.inverted()   # keep position
cam.lock_location = (True, True, True)                                           # main = rotation only
dolly.lock_rotation = (True, True, True)                                         # dolly = translation only
```
raea (composed per frame, no parenting needed):
```tsx
const base: V3 = [0, 0.4, 1.4];                                // main camera start (set once)
const dolly: V3 = [0, 0, -0.3 * ease(f, 0, 60)];              // translation layer
const aim = { pan: 0.05 * ease(f, 20, 60), tilt: 0.08 * ease(f, 20, 60) };   // rotation layer (rad)
const p: V3 = [base[0] + dolly[0], base[1] + dolly[1], base[2] + dolly[2]];
const t: V3 = [p[0] + Math.sin(aim.pan), p[1] + Math.tan(aim.tilt), p[2] - Math.cos(aim.pan)];
<Camera3d transform={Transform.fromXyz(...p).lookingAt(t)} projection={{ Perspective: { fov } }} />
```
(`ease(f, a, b)` = clamped `interpolate` with `Easing.inOut(Easing.cubic)`.)

## NOTES
- Deprecated: none.
- Visual gaps: handle dragging and the exact curve edits are shown, not described (~10:14–13:35).
- Rule conflicts: none in structure. The video's moves are "quite extreme"; ours keep each layer eased and within the speed limits.
