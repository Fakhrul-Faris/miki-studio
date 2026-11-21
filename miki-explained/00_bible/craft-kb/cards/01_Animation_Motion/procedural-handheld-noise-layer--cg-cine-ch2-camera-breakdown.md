---
title: Procedural handheld feel: a separate "shake" transform with rotation noise
bucket: 01_Animation_Motion
source: "CG Cinematography 101 | Chapter 2 | Basic Camera Breakdown.txt"
source_time: "17:05–19:02, 20:58–22:44"
blender_version_source: n/a (Houdini)
tool_target: principle-only | Blender bpy | raea
tier: principle
style_fit: "conflict: smooth camera" — usable only as a barely visible breathing layer, never as visible shake.
---

## METADATA
01_Animation_Motion | n/a (Houdini) → Blender 4.2+ / raea | principle + translation

## CREATIVE_INTENT
Principle: handheld feel comes from its own layer: duplicate the transform, call it "shake", clean it, and add rotation noise (period ~3, extended over the shot) instead of hand-keying jitter. Keeping it a separate layer means the designed move stays clean and the shake can be tuned or removed alone. Hand-keyed small up/down offsets can be added on top to emulate natural shake.
Ideas: duplicate the noise setup per rig rather than linking it; a relative reference makes both rigs change together.

## STE_PROCEDURE
Method:
1. At the first frame, add a new transform layer named "shake" in the camera chain; clean its transforms.
2. Add rotation noise to it (Houdini: Motion Effects > Noise).
3. Set the noise period ~3 (frames/seconds as Houdini's motion-effect units; unclear) and extend it over the shot.
4. Tune amplitude down until it feels natural, not extreme.
5. For a second rig, add its own noise; avoid Copy Parameter → Paste Relative Reference (edits would affect both rigs).

## AGENT_EXECUTION
### Source tool (Houdini)
Channel: right-click rotate → Motion Effects → Noise (CHOP); period ~3, amplitude tuned by eye ("five, probably four" spoken — unit unclear).
### Blender / raea translation
Blender: F-Curve Noise modifier on a shake empty between dolly and camera:
```python
import bpy
from bpy_extras import anim_utils
shake = bpy.data.objects["CAM_shake"]                  # child of CAM_dolly, parent of the camera
for i in range(3): shake.keyframe_insert("rotation_euler", index=i, frame=1)
ad = shake.animation_data
for fc in anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves:
    m = fc.modifiers.new('NOISE'); m.scale = 30.0; m.strength = 0.004; m.phase = fc.array_index * 11.0  # ~
```
raea (deterministic sum of sines; no `Math.random()` drift):
```tsx
const amp = 0.002;                                       // radians — keep near invisible
const n = (k: number) => Math.sin(f * 0.09 + k) * 0.6 + Math.sin(f * 0.037 + 2.1 * k) * 0.4;
const t: V3 = [aim[0] + n(1) * amp * dist, aim[1] + n(2) * amp * dist, aim[2]];
<Camera3d transform={Transform.fromXyz(...p).lookingAt(t)} projection={{ Perspective: { fov } }} />
```

## NOTES
- Deprecated: none.
- Visual gaps: noise parameters typed on screen; units not spoken.
- Rule conflicts: visible shake contradicts smooth eased camera moves. Allowed only as an imperceptible breathing layer; never on top of a flight, never as an energy effect. See also subtle-handheld-camera-shake--animate-still-renders.
- bpy fixed for 5.3: action.fcurves → bpy_extras.anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves (slotted actions).
