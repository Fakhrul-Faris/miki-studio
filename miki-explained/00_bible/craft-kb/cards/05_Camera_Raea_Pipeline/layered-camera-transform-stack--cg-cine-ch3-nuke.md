---
title: Layered camera rig — follow, move, rotation and shake on separate transforms
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 3 | Camera Analysis (The Nuke).txt"
source_time: "00:38–01:18, 10:30–19:26, 27:39–29:21, 35:55–36:34"
blender_version_source: n/a (Houdini)
tool_target: principle-only
tier: principle
style_fit: Fits Style D — separating "where the camera travels" from "how it aims" and any micro-motion keeps flights smooth and editable.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini source) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: don't animate everything on one camera transform. Stack helper transforms: one follows a moving subject, one carries the hand-keyed move (push-ins, corrections), the camera itself carries only rotations, and further layers carry noise. Each layer can be retimed or muted without breaking the others, and every rotation pivots on the camera itself. Ideas: a flight that tracks a sliding object, with the reframe and the aim keyed independently; if the subject's speed changes, the camera follows automatically.

## STE_PROCEDURE
Method:
1. Create the main camera; keep only rotations (and focal length) animated on it.
2. Duplicate it as a parent transform ("transform"), parent the camera to it with Keep Position When Parenting on.
3. Clean (zero) the child's transforms so nothing is applied twice.
4. Copy the subject's main-move channel into the parent's translate; negate it if the axis is inverted.
5. Add another parent ("correct") to offset the camera onto the subject; clean its transforms.
6. Add further parents for shake layers; keep every pivot at the camera position.
How-to:
7. Before adding a shake layer, check its pivot coincides with the camera; an offset pivot swings the camera around the wrong point.
8. Alternatively, skip parenting and give the camera the same move curve as the subject.

## AGENT_EXECUTION
### Source tool (Houdini)
- `/obj`: camera `cam_test1` (rotations + focal only) → parent `cam_test1_transform` (copied ship translate Z channel, negated) → `cam_test1_correct` (hand-keyed push-in/correction) → `cam1_shake` nodes (Motion Effects > Noise on rotation). "Keep Position When Parenting" on; "Clean Transforms" on each new child. Alt+click a parameter to key it.
### Blender / raea translation
- Blender:
  ```python
  import bpy
  def empty(name, parent=None):
      e = bpy.data.objects.new(name, None); bpy.context.scene.collection.objects.link(e)
      if parent: e.parent = parent
      return e
  cam = bpy.context.scene.camera
  follow = empty("CAM_follow")                                   # tracks subject
  c = follow.constraints.new('COPY_LOCATION'); c.target = bpy.data.objects["Hero"]; c.use_offset = True
  move   = empty("CAM_move", follow)                             # keyed push-ins / corrections
  shake  = empty("CAM_shake", move)                              # noise layers (rotation)
  mw = cam.matrix_world.copy(); cam.parent = shake; cam.matrix_world = mw   # keep position when parenting
  ```
  Equivalent operator: `bpy.ops.object.parent_set(type='OBJECT', keep_transform=True)`.
- raea: compose the layers as arithmetic per frame (no node hierarchy needed): `eye = add(subjectPos(f), followOffset, moveOffset(f))`, `aim = add(subjectPos(f), aimOffset(f))`, then `Transform.fromXyz(...eye).lookingAt(aim)`; or nest `<Entity transform={follow}><Entity transform={move}>…` — but a `Camera3d` is placed by its own transform, so compute world values. BlendShot carries the baked result per frame.

## NOTES
- BlendShot exports camera world `{p, t, fov}` per frame, so any Blender parent stack bakes through cleanly; camera roll does not (add via TSX).
- Rule conflicts: none for the rig itself; the shake layers are flagged in rotation-noise-camera-shake--cg-cine-ch3-nuke.
