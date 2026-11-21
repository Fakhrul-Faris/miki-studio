---
title: Slow rotation drift through the hold (keys pulled to frame 0, handle sharpness via Individual Origins)
bucket: 01_Animation_Motion
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:17:08–1:20:51, 1:24:42–1:26:08, 1:48:18–1:49:08"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Keeps a held setup alive between word cuts (Style D 2–3 s setups) with a slow continuous turn instead of a dead hold.
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
After the arrival (frame 15) there are ~35 frames left; a static object is boring, so it keeps rotating gently until the shot
ends. The rotation is keyed from the arrival start (frame 0), so turning and scaling overlap and there's no visible "start".

## STE_PROCEDURE
1. Go to the shot's last frame (50); rotate the object a little in X and Y; key Rotation only.
2. In the Graph Editor lock Scale and Location; isolate X Rotation.
3. Move the first rotation key to frame 0 so the turn begins during the arrival.
4. Repeat for Y Rotation (and Z if used).
5. If the turn slows to a stop too early, flatten/shorten the last key's left handle (or make it nearly linear) so it keeps moving to the cut; if it should land, give it a Full Stop (flat handle).
6. To change curve sharpness for several keys at once: set Pivot Point to Individual Origins, select the keys, `S X` to scale their handles; then set Pivot back to Bounding Box Center.

## AGENT_EXECUTION
- Blender:
```python
import bpy
from bpy_extras import anim_utils
ob = bpy.context.object
ob.rotation_euler = (0.12, 0.25, 0); ob.keyframe_insert("rotation_euler", frame=50)   # ~ angles eyeballed
ob.rotation_euler = (0, 0, 0);       ob.keyframe_insert("rotation_euler", frame=0)
# handle scaling about each key (Graph Editor: Pivot Individual Centers, S X 1.5) — data-level, no editor context needed:
ad = ob.animation_data
for fc in anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves:
    for k in fc.keyframe_points:
        k.handle_left_type = k.handle_right_type = 'ALIGNED'
        k.handle_left.x = k.co.x + (k.handle_left.x - k.co.x) * 1.5
        k.handle_right.x = k.co.x + (k.handle_right.x - k.co.x) * 1.5
```
  Data-level equivalent: for each key, scale `(handle - co).x` by a factor.
- raea: `const ry = interpolate(f, [0, shotEnd], [0, 0.25], { easing: Easing.bezier(0.33, 0, 0.2, 1) })` on
  `Quat.fromEuler("XYZ", rx, ry, 0)`; or a linear `f * k` that stays well under 130°/s.

## NOTES
- Deprecated: Graph Editor pivot "Individual Centers" is still the name in 4.x (`INDIVIDUAL_CENTERS`).
- Visual gaps: angles not stated.
- Rule conflicts: none — keep the drift slow (a few degrees per second).
- bpy fixed for 5.3: incomplete snippet: added `import bpy`, `ob = bpy.context.object`; the Graph Editor `space_data.pivot_point` + `transform.resize` (needs an editor, fails headless) → the data-level handle scale the card describes (channelbag fcurves).
