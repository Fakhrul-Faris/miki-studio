---
title: Move the camera on its own axes (R X X tilt, G Z Z dolly)
bucket: 05_Camera_Raea_Pipeline
source: "How to Find Nice Camera Angles in Blender.txt"
source_time: "11:51–12:18, 14:26–14:59"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — clean tilts and dollies along the lens axis are the building blocks of smooth eased camera flights.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | Blender bpy + raea

## CREATIVE_INTENT
Tilting and dollying relative to the camera's own orientation keeps a framing intact while adjusting it: tilt up/down without rolling the horizon, push in or pull back straight along the view direction. These two moves cover most framing fixes.

## STE_PROCEDURE
1. To tilt up or down, rotate on the camera's local X axis (R, X, X); a single X rotates on global X and skews the view.
2. To push in or pull back along the view direction, move on the camera's local Z axis (G, Z, Z).
3. After a dolly, re-check the tilt; after a tilt, re-check the distance.
4. Combine with a Focal Length change when the dolly alone can't fit the subject.

## AGENT_EXECUTION
- Blender:
  ```python
  import bpy, math, mathutils
  cam = bpy.context.scene.camera
  # R X X : rotate about local X by angle a
  a = math.radians(-8)                                    # ~
  cam.rotation_euler = (cam.matrix_world.to_quaternion() @ mathutils.Quaternion((1,0,0), a)).to_euler()
  # G Z Z : move along local Z (camera looks down -Z, so +d pulls back)
  d = 1.5                                                 # ~ metres
  cam.location += cam.matrix_world.to_quaternion() @ mathutils.Vector((0, 0, d))
  ```
  Operator form: `bpy.ops.transform.rotate(value=a, orient_axis='X', orient_type='LOCAL')`, `bpy.ops.transform.translate(value=(0,0,d), orient_type='LOCAL')`.
- raea: dolly = move the eye along `(eye - target).normalize()` with the target fixed; tilt = move the `lookingAt` target vertically. Eased: `const k = interpolate(f, [f0, f1], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" })`.

## NOTES
- Rule conflicts: animated tilts/dollies must ease in-out and stay under ~130°/s and ~40 m/s; no snap-back pushes.
