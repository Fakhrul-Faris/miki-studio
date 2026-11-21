---
title: Capture a camera path in Fly/Walk navigation with Auto Keying, then smooth and retime
bucket: 05_Camera_Raea_Pipeline
source: "Creating an Animation in Eevee (Blender 5.0).txt"
source_time: "03:57–05:56, 07:24"
blender_version_source: 5.0
tool_target: Blender bpy
tier: full
style_fit: conflict: raw captured paths are "janky"; only usable as a rough path that is then reduced to a few eased keys
---

## METADATA
05_Camera_Raea_Pipeline | Blender 5.0 | Blender bpy + raea

## CREATIVE_INTENT
Record a natural, hand-steered camera path by flying the camera like a video game while Auto Keying records it. The author admits it needed heavy cleanup and stayed a bit janky; its use for us is to sketch a path quickly, then rebuild it as clean eased keys. Stretching all keys in time made the result slower and easier to watch.

## STE_PROCEDURE
1. Look through the camera (Numpad 0) and lock Camera to View if needed.
2. Turn on Auto Keying (the record button in the Timeline).
3. Start playback and enter Walk/Fly Navigation (View > Navigation > Walk/Fly).
4. Steer with the mouse; the camera is keyed every frame.
5. Exit navigation; turn off Auto Keying.
6. In the Graph Editor, select all camera keys and run Key > Smooth (Gaussian/Butterworth/Smooth Keys; the author tried all three).
7. Manually fix remaining rough spots.
8. To slow the move, select all keys and scale them on the X (time) axis.
9. At the end, add rotation keys by hand if the capture runs out (e.g. tilt up).

## AGENT_EXECUTION
```python
import bpy
sc = bpy.context.scene
sc.tool_settings.use_keyframe_insert_auto = True        # capture itself is interactive: bpy.ops.view3d.navigate() / walk()
# ... after capture:
sc.tool_settings.use_keyframe_insert_auto = False
cam = sc.camera
# Graph Editor context required for these:
bpy.ops.graph.select_all(action='SELECT')
bpy.ops.graph.gaussian_smooth(factor=1.0, sigma=0.33, filter_width=6)      # 4.0+; ~ values
# bpy.ops.graph.butterworth_smooth(cutoff_frequency=3.0, filter_order=4)
bpy.ops.graph.decimate(mode='ERROR', remove_error_margin=0.05)             # recommended: reduce to few keys, then ease
bpy.ops.transform.transform(mode='TIME_SCALE', value=(1.25, 0, 0, 0))     # ~ stretch
```
Recommended rebuild for our rules: decimate to 3–5 keys, set them Bezier with Auto Clamped handles (eased in-out), check angular speed per frame.

raea: no capture — raea reads the cleaned per-frame camera from the Blender export (`tools/raea/blend2raea.py` → `kit/BlendShot.tsx`), or rebuild the path as a few eased waypoints:
```tsx
const t = interpolate(f, [0, D - 1], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
// Catmull-Rom/ lerp through 3–5 waypoints by t; .lookingAt a target that also moves smoothly
```

## NOTES
- Deprecated: Gaussian/Butterworth smooth operators are 4.0+; older versions only have Key > Smooth Keys (`bpy.ops.graph.smooth`).
- Visual gaps: which smoothing options and values were used, and the exact cleanup, are not spoken ("I just picked one").
- Rule conflicts: a captured path has micro-jitter and uneven speed — prohibited unless reduced to a few eased keys. Check no frame exceeds ~130°/s or ~40 m/s. STT: "walkly mode" → Walk/Fly navigation.
