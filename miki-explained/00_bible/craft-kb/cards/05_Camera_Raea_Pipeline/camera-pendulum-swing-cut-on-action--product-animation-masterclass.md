---
title: Camera pendulum swing — two Z-rotation swings with parabolic free-handle curves, cut on the fastest moment
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "2:00:03–2:04:23, edit 3:03:00–3:03:37"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: "conflict: fast swing + cut-on-action is whip-like; use as a slow pendulum (in-out, <130°/s) with the cut hidden by the scene's own object"
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
A cheap but slick camera move: the camera only rotates about its own Z, swinging one way and back like a pendulum (slow at the
ends, fast in the middle). The cut to the next shot lands on the fastest part, where the eye can't see the "jank" of the stop.

## STE_PROCEDURE
1. Start from the previous shot's last frame (chain shots: that frame is this shot's first frame); delete all object keys.
2. Key the camera's Location/Rotation/Scale at frame 0.
3. At ~frame 19 (midway, not 24) rotate about the camera's local Z (`R Z Z`) to one side; key.
4. At frame 37 rotate back past centre to the other side; key (frame count from the music: beat in 39 frames, minus 2 looked best).
5. Graph Editor: isolate the swinging rotation channel (here Y Rotation); set both end handles to Free and raise them so the curve is parabolic — slow at the turnarounds, fast through the middle.
6. Cut to the next shot at the fast point near the end (on the action) so the abrupt stop is never seen.

## AGENT_EXECUTION
- Blender:
```python
cam.keyframe_insert("rotation_euler", frame=0)
cam.rotation_euler.rotate_axis('Z', 0.35); cam.keyframe_insert("rotation_euler", frame=19)   # angles ~
cam.rotation_euler.rotate_axis('Z', -0.7); cam.keyframe_insert("rotation_euler", frame=37)
for fc in cam.animation_data.action.fcurves:
    if fc.data_path == "rotation_euler":
        for k in fc.keyframe_points: k.handle_left_type = k.handle_right_type = 'FREE'
```
- raea: a smooth pendulum on the camera roll/yaw from the frame:
  `const yaw = 0.2 * Math.sin((f / 37) * Math.PI * 1.5);` (out to one side, back past centre; amplitude `~`)
  `transform={Transform.fromXyz(...p).withRotation(Quat.fromEuler("YXZ", yaw, pitch, 0))}` — sine motion is naturally slow
  at the ends and fast in the middle. Keep peak `|d yaw/dt|` under 130°/s.

## NOTES
- Deprecated: none.
- Visual gaps: swing angles are visual; the channel the author edits is "Y rotation" because of the camera's local axes.
- Rule conflicts: house rules forbid whip pans and hiding cuts with fast blurs. Use a slow pendulum (≥1.5 s per swing) and
  change setup with an object wipe/morph, not a speed-blur cut.
