---
title: Plan the cut chain first — each shot's last frame is the next shot's first frame (save-as, delete keys, continue)
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:30:07–1:30:36, 1:43:27, 1:56:49–1:57:32, 2:00:35–2:01:47, 2:29:40–2:30:40, edit 3:00:19"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Direct fit — Style D joins setups with continuous flights/morphs; this is the file-level way to guarantee continuity.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
Shots "click like puzzle pieces": before animating, decide how each shot hands over to the next (match frame, matching motion
direction, object wipe). The next shot's file starts as a copy of the previous one frozen on its final frame, so the cut is a
perfect match.

## STE_PROCEDURE
1. Before you animate, list the shots in order and the transition type between each pair (match cut, same-direction move, wipe, reveal).
2. Finish shot A; File › Save As a new name (never overwrite the previous shot's file).
3. Go to shot A's last frame; select all objects; unlock channels in the Graph Editor and delete all keys (`A`, `X`) so everything stays in that final pose.
4. Key the camera at that pose as frame 0 of shot B and animate onward.
5. If shot B's motion continues shot A's (e.g. camera rising), start B with the same direction and speed.
6. If a transition looks weak in the edit, return to the earlier file and build a dedicated bridge shot (author's slide-reveal).

## AGENT_EXECUTION
- Blender:
```python
bpy.ops.wm.save_as_mainfile(filepath=bpy.path.abspath("//shot_B.blend"), copy=False)
scn = bpy.context.scene; scn.frame_set(scn.frame_end)
for ob in scn.objects:
    if ob.animation_data and ob.animation_data.action:
        mw = ob.matrix_world.copy(); ob.animation_data_clear(); ob.matrix_world = mw   # freeze at final pose
cam = scn.camera; cam.keyframe_insert("location", frame=0); cam.keyframe_insert("rotation_euler", frame=0)
```
- raea: one composition, one camera (scene.md): define each shot's camera as functions of the frame and make shot B's start
  pose literally `poseA(endA)`; e.g. `const camAt = (f) => f < endA ? poseA(f) : poseB(f - endA)` with `poseB(0) === poseA(endA)`.
  For object state, read the same helper so positions match on the joint frame.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none; this is the house approach.

## ADDENDUM — 3D Camera Transitions Tutorial Part 2
Adds the continuity math for a shared-axis chain across a hard cut: note setup A's final transform offset on the
shared axis, define that axis's full span (frame height/width, or the raea scene's travel unit), then set setup B's
starting offset to `full span − previous setup's final offset`, so the two legs sum to exactly one span and the cut
reads as one continuous move rather than a reset-then-repeat. ⚠ Source use case is a fast whip-pan (banned) — keep
only the math, applied at house-legal eased speeds, as a second check alongside freezing the last frame as the next
shot's first frame: `const nextStart = FULL_SPAN - prevEnd;`.

## ADDENDUM — Master Infinite Camera Movement After Effects
Adds the depth-matching half of a seamless scene-to-scene push: before building shot B, measure shot A's maximum
depth (its farthest object's distance from the camera's starting point) and position shot B's nearest object at
that exact depth — no gap, no overlap — the same "last pose = next first pose" principle applied to Z depth instead
of a frozen frame. Pairs with: fade shot B's background in rather than pop it in, hide the handoff behind a real
scene-prop occluder, and rack focus (DoF) across the join. ⚠ Source fakes 3D with flat AE layers staggered in Z
("continuously rasterize" + manual Z-position cards) — dropped entirely, since raea builds real 3D geometry; only
the depth-continuity and occluder/fade recipe transfers. This is the join mechanism only; the push's speed/easing
is covered by `masters/01_Animation_Motion/two-keyframe-camera-move.md`.
