---
title: Endless rotation from one 360° key pair — Cycles F-Modifier, After = Repeat with Offset
bucket: 01_Animation_Motion
source: "Making a Car Animation in Blender!.txt"
source_time: "09:24–09:53"
blender_version_source: 3.x/4.x
tool_target: Blender bpy | raea
tier: full
style_fit: For continuous secondary motion (wheels, fans, a spinning coin, a turntable) that must not stop dead — "moving things never stop dead".
---

## METADATA
01_Animation_Motion | 3.x/4.x → 4.2+ (5.x slotted actions) | Blender bpy + raea

## CREATIVE_INTENT
Wheels and spinners need constant, endless rotation without keying every turn; one 0→360° pair plus a Cycles modifier repeats and accumulates forever.

## STE_PROCEDURE
1. Key the wheel's rotation at 0° on frame 1 and 360° on a later frame.
2. Before adding the modifier, set that F-curve's interpolation to Linear (constant speed per turn).
3. In the Graph Editor, add Modifier > Cycles to the rotation F-curve.
4. Set After Mode = Repeat with Offset (each cycle continues from the last value).
5. Duplicate the animated wheel to the other wheel positions.

## AGENT_EXECUTION
Blender:
```python
import bpy, math
from bpy_extras import anim_utils
w = bpy.data.objects["Wheel_FL"]
w.rotation_euler.x = 0;            w.keyframe_insert("rotation_euler", index=0, frame=1)
w.rotation_euler.x = 2 * math.pi;  w.keyframe_insert("rotation_euler", index=0, frame=24)   # ~ speed
ad = w.animation_data
fc = anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves.find("rotation_euler", index=0)   # 5.x channelbag
for k in fc.keyframe_points: k.interpolation = 'LINEAR'
mod = fc.modifiers.new('CYCLES'); mod.mode_after = 'REPEAT_OFFSET'; mod.mode_before = 'REPEAT_OFFSET'
```
raea: rotation is a function of the frame, so it is endless by construction; tie it to distance travelled so it never slips:
```tsx
const spin = travelled(f) / wheelRadius;   // radians
<Mesh3d name="wheel-fl" transform={Transform.fromXyz(...wheelPos).withRotation(Quat.fromEuler("XYZ", spin, 0, 0))}> … </Mesh3d>
```
For a Model with baked wheel spin, play its clip with `time={f / fps}`.

## NOTES
- Deprecated: in Blender 5.0, `Action.fcurves` is removed for slotted actions; use `bpy_extras.anim_utils.action_get_channelbag_for_slot(action, slot).fcurves`.
- Visual gaps: none.
- Rule conflicts: linear is right for continuous spin only; the vehicle's travel itself must ease in/out (one eased move per action), so derive spin from eased travel rather than a fixed rate.
- bpy fixed for 5.3: action.fcurves → bpy_extras.anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves (slotted actions).
