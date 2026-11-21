---
title: Two-keyframe camera flight (location + rotation together)
bucket: 05_Camera_Raea_Pipeline
source: "How to Easily Animate Still Renders in Blender.txt"
source_time: "00:16–02:00, 14:53–15:02"
blender_version_source: 3.x/4.x (no version markers)
tool_target: Blender bpy
tier: full
style_fit: strong — the literal mechanism of our camera flights between setups; must be eased (see NOTES)
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x/4.x (source), 4.2+/5.x code | Blender bpy + raea

## CREATIVE_INTENT
The simplest way to make a still scene move: key the camera at a start pose and an end pose and let it travel. "Sometimes that's all you need." Tune the range afterwards by moving the end keys rather than adding new ones.

## STE_PROCEDURE
1. Pose the camera at the start framing.
2. At the first frame, insert a Location & Rotation keyframe (one combined key type).
3. Go to the last frame of the shot.
4. Move the camera forward to the end framing; tilt it up slightly if wanted.
5. Insert a Location & Rotation keyframe again.
6. To adjust the travel, edit the existing keys' values in the Graph Editor (drag the key vertically) instead of inserting new keys.
7. Before you judge the move, check its interpolation (see linear-vs-eased-camera-interpolation card).

## AGENT_EXECUTION
```python
import bpy, math
sc = bpy.context.scene; cam = sc.camera
F0, F1 = sc.frame_start, sc.frame_end
def key(f):
    cam.keyframe_insert("location", frame=f)
    cam.keyframe_insert("rotation_euler", frame=f)
key(F0)
fwd = cam.matrix_world.to_3x3().col[2] * -1          # camera looks along -Z
cam.location += fwd * 1.5                            # ~ travel distance
cam.rotation_euler.x += math.radians(5)              # ~ "rotate upwards a little"
key(F1)
# step 6: nudge an existing key's value rather than re-keying
```
For Blender 4.4+ slotted actions, reach F-curves via `bpy_extras.anim_utils.action_get_channelbag_for_slot(action, cam.animation_data.action_slot).fcurves`; `action.fcurves` is the legacy path (removed in 5.0).

raea:
```tsx
const t = interpolate(f, [0, D - 1], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const lerp = (a: number[], b: number[]) => a.map((v, i) => v + (b[i] - v) * t) as [number, number, number];
<Camera3d transform={Transform.fromXyz(...lerp([0, 1.2, 6], [0, 1.0, 4.5])).lookingAt(lerp([0, 0.6, 0], [0, 0.9, 0]))}
  projection={{ Perspective: { fov: (35 * Math.PI) / 180 } }} />
```
Animate the look-at target as well as the position — that is the "rotation" key. For flights exported from Blender, `kit/BlendShot.tsx` reads the per-frame camera from the export.

## NOTES
- Deprecated: in 4.4+ the Insert Keyframe menu changed (I inserts the user-preference channels directly; K opens the Keying Set menu). `keyframe_insert` in Python is unchanged.
- Visual gaps: none.
- Rule conflicts: house speed caps — no camera move above ~130°/s or ~40 m/s; check `travel / duration`.
