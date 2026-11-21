---
title: Release a tracked camera — key Track To influence 1 → 0 and fly the camera up as the shot's exit
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:37:13–1:38:49"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: "conflict: the source makes it a 10-frame upward whip; in Style D use it as a smooth eased flight (≥0.6 s, <130°/s) into the next setup"
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
After the orbit ends (frame 50) the camera breaks free of the Track To and rises fast, blurred, so the next shot can start
with the same upward move and the two join invisibly.

## STE_PROCEDURE
1. At the last held frame (50) key Track To Influence 1.
2. 10 frames later (60) key Influence 0 — the camera stops looking at the can.
3. At frame 60 raise the circle/camera (scale the circle up or move it on Z) and key it, so the camera travels up.
4. Set the scene end to 60.
5. Render with motion blur so the move smears; start the next shot moving up the same way.

## AGENT_EXECUTION
- Blender:
```python
import bpy
cam = bpy.context.scene.camera
circ = bpy.data.objects["BezierCircle"]          # the Follow Path circle (orbit card)
tt = cam.constraints["Track To"]
tt.influence = 1.0; cam.keyframe_insert('constraints["Track To"].influence', frame=50)
tt.influence = 0.0; cam.keyframe_insert('constraints["Track To"].influence', frame=60)
circ.location.z += 0.6; circ.keyframe_insert("location", frame=60)     # ~
bpy.context.scene.frame_end = 60; bpy.context.scene.render.use_motion_blur = True
```
- raea: blend the look-at target from the hero to a point above: `const u = interpolate(f, [50, 70], [0, 1], { ...clamp, easing: inOut });`
  `lookingAt(lerp3(hero, [hx, hy + 1, hz], u))` with the position also eased upward; `{u > 0 && u < 1 ? <MotionBlur shutterAngle={0.5} samples={4} /> : null}`.

## NOTES
- Deprecated: none.
- Visual gaps: how far the camera rises is visual.
- Rule conflicts: the 10-frame (0.42 s) upward rush reads as a whip pan — forbidden. Stretch to ≥ ~0.6 s with in-out easing and
  keep it under ~130°/s / 40 m/s, or replace with a cut hidden by an object wipe.
- bpy fixed for 5.3: incomplete snippet: added `import bpy`, `cam`, `circ`.
