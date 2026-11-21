---
title: Subtle handheld camera shake (Camera Shakify / F-curve noise)
bucket: 05_Camera_Raea_Pipeline
source: "How to Easily Animate Still Renders in Blender.txt"
source_time: "03:53–06:08"
blender_version_source: 3.x/4.x
tool_target: Blender bpy
tier: full
style_fit: "conflict-leaning: our camera language is smooth and intentional; use only near-zero (≤0.1) on long held macro setups, or skip"
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x/4.x (source), 4.2+/5.x code | Blender bpy + raea

## CREATIVE_INTENT
CG feels fake partly because the camera is perfectly still. A tiny handheld wobble (like film grain or real-world settings) says "a real camera in a real place". The source uses 0.1–0.2 influence — barely visible — and calls it optional, "depends on the look".

## STE_PROCEDURE
1. Install the free add-on Camera Shakify (Ian Hubert et al.).
2. Select the camera; in Camera Properties → Camera Shakify, click + to add a shake.
3. Set the shake type (source favourite: "Walk to the Store").
4. Set Influence to 0.1–0.2.
5. Without the add-on: add a Noise F-Modifier to the camera's rotation F-curves (low Strength, large Scale).
6. House: before you add any shake, confirm the setup is held ≥ 2 s and the shake stays below the threshold of a "bounce".

## AGENT_EXECUTION
```python
import bpy
from bpy_extras import anim_utils
cam = bpy.context.scene.camera
for i in range(3):
    cam.keyframe_insert("rotation_euler", index=i, frame=bpy.context.scene.frame_start)
ad = cam.animation_data
fcs = (anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves
       if hasattr(anim_utils, "action_get_channelbag_for_slot") else ad.action.fcurves)
for fc in fcs:
    if fc.data_path == "rotation_euler":
        n = fc.modifiers.new('NOISE')
        n.scale = 40.0          # ~ frames per wobble (slow)
        n.strength = 0.004      # ~ radians; ≈ "influence 0.1" feel
        n.phase = fc.array_index * 13.7
```
Camera Shakify itself is GUI-driven (`camera.camera_shakes` collection via the add-on); exact Python API not given in the video.

raea (deterministic, from the frame — no `Math.random()` drift between renders):
```tsx
const s = 0.0025;  // radians; keep tiny
const wob = (k: number) => Math.sin(f * 0.11 + k) * 0.6 + Math.sin(f * 0.047 + 2 * k) * 0.4;
const look: [number, number, number] = [tx + wob(1) * s * dist, ty + wob(2) * s * dist, tz];
<Camera3d transform={Transform.fromXyz(cx, cy, cz).lookingAt(look)} projection={{ Perspective: { fov } }} />
```

## NOTES
- Deprecated: none.
- Visual gaps: the shake presets' exact motion is visual only.
- Rule conflicts: no bouncy, rushed or flashy camera. Any visible shake reads as amateur handheld in a macro product look. Default: off. If used, below the strength where a viewer can name it.
