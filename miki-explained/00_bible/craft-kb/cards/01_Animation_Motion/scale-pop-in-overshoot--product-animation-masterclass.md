---
title: Scale pop-in with overshoot ("Out Back Cubic": 0 → 110 % → 100 %)
bucket: 01_Animation_Motion
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:11:56–1:17:08, 1:22:35–1:24:42, 1:47:37–1:48:18"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: "conflict: overshoot reads bouncy; use the grow-in with ≤3–5 % overshoot or none, over ≥0.4 s"
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy + raea `interpolate`/`spring`

## CREATIVE_INTENT
An object appears from nothing by scaling from 0 to full size, fast at first, overshooting slightly past 100 % and settling back
— "it must look like magic", you should not watch it grow. Used for products, text and icons arriving on a beat.

## STE_PROCEDURE
1. At the end frame (frame 15 at 24 fps), key Location, Rotation & Scale on the final pose.
2. At frame 0, scale to 0 (`S 0`) and key Location, Rotation & Scale.
3. In the Graph Editor lock all channels except Scale; select all three Scale channels; `A`, Numpad `.`.
4. Set the first key's handle to Free and drag its right handle up steeply (fast start).
5. Set the last key to Free and raise its left handle above the end value so the curve overshoots (~110 %).
6. If the overshoot is too slow, insert an extra Location/Rotation/Scale key at the overshoot peak (~frame 10), set it to Free and raise it; slide the last two keys closer.
7. For a 10-frame pop (half a second), use the same curve; "I like when it pops in quite quickly".

## AGENT_EXECUTION
- Blender:
```python
import bpy
from bpy_extras import anim_utils
ob = bpy.context.object
ob.scale = (1,1,1); ob.keyframe_insert("scale", frame=15)
ob.scale = (1.1,1.1,1.1); ob.keyframe_insert("scale", frame=10)     # overshoot key ~110 %
ob.scale = (0,0,0); ob.keyframe_insert("scale", frame=0)
ad = ob.animation_data
for fc in anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves:
    if fc.data_path == "scale":
        for k in fc.keyframe_points: k.handle_left_type = k.handle_right_type = 'FREE'
```
  Alternative without the extra key: `k.interpolation = 'BACK'; k.easing = 'EASE_OUT'; k.back = 1.0` (Blender's built-in Back easing).
- raea:
```tsx
// house-safe: grow-in, tiny overshoot, ≥0.4 s
const s = interpolate(f, [f0, f0 + 0.5*fps], [0.001, 1], { easing: Easing.bezier(0.34, 1.12, 0.64, 1), extrapolateLeft:"clamp", extrapolateRight:"clamp" }); // ~3 % overshoot
<Entity transform={Transform.IDENTITY.withScale(Math.max(0.001, s))}>…</Entity>
// or spring({ frame: f - f0, fps, config: { damping: 200 } }) for no overshoot
```
  Give the part a `name` (it comes and goes).

## NOTES
- Deprecated: none. ("Out back cubic" is DaVinci Resolve's name; Blender = Back easing or a manual overshoot key.)
- Visual gaps: handle drags are visual; the 110 % figure is stated, timings 15 / 10 frames are stated.
- Rule conflicts: house rules forbid bouncy/pop motion. Use a grow from ~0 over ≥0.4 s, overshoot ≤ ~3–5 % (or none), and pair
  it with an opacity fade so nothing "pops". Never the 110 % rebound at 10 frames.
- bpy fixed for 5.3: action.fcurves → bpy_extras.anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves (slotted actions).
