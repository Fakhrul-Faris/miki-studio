---
title: Dolly zoom (Vertigo effect)
bucket: 05_Camera_Raea_Pipeline
source: "Take your Blender Cinematography to the Next Level!.txt"
source_time: "03:36–04:29"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: "conflict (partial): unsettling/vertigo move — use at most once per video as a slow realisation beat, eased, never as a transition"
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x source; 4.2+ API | Blender bpy → raea Camera3d transform + fov per frame

## CREATIVE_INTENT
Camera moves away from (or toward) the subject while the lens zooms the opposite way, so the subject stays the same size and
the background perspective warps — dizziness, unreality (Hitchcock, 1940s). In an explainer it marks the moment a viewer
realises something is bigger/worse than it looked.

## STE_PROCEDURE
1. Add a camera and aim it straight at the subject.
2. Keyframe the camera's Location at the start, close to the subject.
3. Keyframe the camera's Location further back at the end of the move.
4. Set both keyframes' Interpolation to Linear (Timeline/Graph Editor: T > Linear).
5. Keyframe Focal Length on the first and last frame so the subject's framed size matches at both ends.
- Constant-size rule: Focal Length ∝ distance → `lens_end = lens_start × d_end / d_start`.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
cam = bpy.context.scene.camera
bpy.context.preferences.edit.keyframe_new_interpolation_type = 'LINEAR'   # video: linear keys
d0, d1, lens0 = 3.0, 6.0, 35.0
cam.location = (0, -d0, 1); cam.keyframe_insert("location", frame=1)
cam.data.lens = lens0;           cam.data.keyframe_insert("lens", frame=1)
cam.location = (0, -d1, 1); cam.keyframe_insert("location", frame=72)
cam.data.lens = lens0 * d1 / d0; cam.data.keyframe_insert("lens", frame=72)
```
With two linear keys, lens ∝ distance holds on every frame (both are linear in time).

### raea (per-frame exact, eased)
```tsx
const e = interpolate(f, [0, 60], [0, 1], { easing: Easing.inOut(Easing.sine), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const d0 = 1.2, d1 = 2.4, fov0 = (40 * Math.PI) / 180;
const d = interpolate(e, [0, 1], [d0, d1]);
const fov = 2 * Math.atan(Math.tan(fov0 / 2) * d0 / d);     // subject height held constant
<Camera3d transform={Transform.fromXyz(0, 0.2, d).lookingAt([0, 0.2, 0])} projection={{ Perspective: { fov } }} />
```

## NOTES
- Deprecated: none. In 4.4+/5.0 actions are slotted/layered, so prefer setting the interpolation preference before
  keying over iterating `action.fcurves`.
- Visual gaps: none.
- Rule conflicts: the video uses linear keys; our rule forbids linear starts/stops — compute FOV from the eased distance
  each frame (as above) so the size lock holds with an in-out ease. Keep it slow; it is a disorienting move by design.
