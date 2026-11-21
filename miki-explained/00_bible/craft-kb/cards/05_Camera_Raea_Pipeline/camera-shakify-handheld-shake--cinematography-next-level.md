---
title: Handheld camera shake (Camera Shakify add-on)
bucket: 05_Camera_Raea_Pipeline
source: "Take your Blender Cinematography to the Next Level!.txt"
source_time: "08:20–09:11"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: "conflict (soft): Style D is smooth, eased, tripod-feel macro; at most a near-invisible slow drift on a held shot, never a visible shake"
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x source | Blender add-on → raea deterministic per-frame drift on the camera transform

## CREATIVE_INTENT
Camera Shakify (free; Ian Hubert and Nathan Vegdahl) adds realistic handheld motion in one click. The default preset
"Investigation" works well; the default strength is a bit high. Keep it light and not on every shot — a tripod shot never
shakes.

## STE_PROCEDURE
1. Install the Camera Shakify add-on (Edit > Preferences > Add-ons / Get Extensions).
2. Select the camera and open the new Camera Shakify tab in camera properties.
3. Click + to add a shake; the default preset is Investigation.
4. Lower Influence and Scale until the shake is subtle.
5. Leave tripod-style shots without shake.

## AGENT_EXECUTION
### Blender (4.2+)
- The add-on's operators/properties are not given in the video — set it in the UI. Add-on-free fallback: an F-Curve
  Noise modifier on the camera rotation.
```python
import bpy
from bpy_extras import anim_utils
cam = bpy.context.scene.camera
cam.keyframe_insert("rotation_euler", frame=1)
ad = cam.animation_data
for fc in anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves:
    if fc.data_path == "rotation_euler":
        m = fc.modifiers.new('NOISE'); m.scale = 60.0; m.strength = 0.004   # ~ subtle
```
### raea
- raea: no Shakify equivalent component. Do it as deterministic per-frame drift (sum of slow sines; never unseeded
  randomness):
```tsx
const t = f / fps;
const dx = 0.002 * Math.sin(t * 0.9) + 0.001 * Math.sin(t * 2.3 + 1.7);
const dy = 0.0015 * Math.sin(t * 1.3 + 0.4);
<Camera3d transform={Transform.fromXyz(cam[0] + dx, cam[1] + dy, cam[2]).lookingAt(target)} projection={{ Perspective: { fov: 0.6 } }} />
```

## NOTES
- Deprecated: Blender 4.2+ distributes add-ons as Extensions; check Camera Shakify's current distribution.
- Visual gaps: the preset list and default Influence/Scale numbers are on screen only.
- Rule conflicts: no visible shake in Style D (reads as rushed/flashy). Only a barely perceptible breathing drift on long
  holds, if anything; never during flights.
- bpy fixed for 5.3: action.fcurves → bpy_extras.anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves (slotted actions).
