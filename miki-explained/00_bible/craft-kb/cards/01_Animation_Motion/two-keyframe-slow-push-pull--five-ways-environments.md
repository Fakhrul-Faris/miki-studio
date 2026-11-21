---
title: Simple camera moves: two location keyframes for a slow push or pull
bucket: 01_Animation_Motion
source: "5 Ways to Create Better Environments in Blender.txt"
source_time: "11:18–12:40"
blender_version_source: n/a?
tool_target: Blender bpy | raea
tier: full
style_fit: Directly supports "no bouncy / rushed / flashy" camera work; our 2–3 s setups each get one simple eased move.
---

## METADATA
01_Animation_Motion | n/a → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
Camera movement doesn't have to be complicated; the simpler, the more cinematic. Most film shots are simple moves or a locked camera. One location key at the start, move forward a little, one key at the end: a slow push (or pull) over the shot, with maybe some particles drifting, is a pleasing animated render.

## STE_PROCEDURE
1. At the shot's first frame, insert a Location keyframe on the camera.
2. Move the camera a small distance forward (push) or back (pull) along its view axis.
3. At the shot's last frame, insert a second Location keyframe.
4. Keep the travel small; the video's example spans ~10 s with very little movement.
5. Optionally add small ambient motion in the scene (particles, dust) instead of more camera moves.

## AGENT_EXECUTION
Blender:
```python
import bpy
from mathutils import Vector
from bpy_extras import anim_utils
scn = bpy.context.scene; cam = scn.camera
f0, f1 = scn.frame_start, scn.frame_end
cam.keyframe_insert("location", frame=f0)
fwd = cam.matrix_world.to_quaternion() @ Vector((0, 0, -1))
cam.location += fwd * 0.3                       # ~ small push (scale to scene)
cam.keyframe_insert("location", frame=f1)
ad = cam.animation_data
for fc in anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves:
    for k in fc.keyframe_points: k.interpolation = 'BEZIER'; k.easing = 'AUTO'
```
raea (scene.md, animation.md):
```tsx
const t = interpolate(f, [0, dur - 1], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const z = 1.2 - 0.25 * t;                        // ~ push 0.25 m over the setup
<Camera3d transform={Transform.fromXyz(0, 0.35, z).lookingAt([0, 0.2, 0])} projection={{ Perspective: { fov: (32 * Math.PI) / 180 } }} />
```

## NOTES
- Deprecated: in Blender 4.4+ `action.fcurves` moves under slotted actions (`anim_utils.action_get_channelbag_for_slot`).
- Visual gaps: none.
- Rule conflicts: the video's ~10 s shot is far longer than our 2–3 s setups; keep one move per setup, eased in-out (or entering already moving per odd-moving-first-frame), under ~130°/s and ~40 m/s.
- bpy fixed for 5.3: action.fcurves → bpy_extras.anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves (slotted actions).
