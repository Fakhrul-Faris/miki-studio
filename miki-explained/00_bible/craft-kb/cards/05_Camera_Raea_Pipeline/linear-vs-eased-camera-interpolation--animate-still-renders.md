---
title: Linear vs Bézier camera interpolation (and the default-interpolation preference)
bucket: 05_Camera_Raea_Pipeline
source: "How to Easily Animate Still Renders in Blender.txt"
source_time: "02:00–03:48"
blender_version_source: 3.x/4.x
tool_target: Blender bpy
tier: full
style_fit: "conflict: source says linear camera moves look pro and ease-in-out 'screams beginner'; house rule requires eased in-out camera curves"
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x/4.x (source), 4.2+/5.x code | Blender bpy + raea

## CREATIVE_INTENT
The source argues film camera moves are mostly constant-speed, and Blender's default Bézier ease-in/ease-out on a two-key move looks amateur. Principle worth keeping: within a shot, the camera should be **moving at the cut**, not visibly accelerating from and braking to a dead stop. Our rule keeps eased curves but the same insight applies — don't let the audience see a start and a stop on every setup.

## STE_PROCEDURE
1. Select both camera keys in the Graph Editor.
2. Open Key → Interpolation Mode (T); choose Linear (source) or keep Bézier (house).
3. To change the default for new keys: Edit → Preferences → Animation → F-Curves → Default Interpolation.
4. House adaptation: when a setup is entered and left on hard cuts, start the move before the in-cut and end it after the out-cut, so only the steady middle of an eased curve is on screen.
5. House adaptation: when a camera flight joins two setups on screen, ease both ends in-out.

## AGENT_EXECUTION
```python
import bpy
prefs = bpy.context.preferences.edit
prefs.keyframe_new_interpolation_type = 'BEZIER'      # house default; source uses 'LINEAR'
# change existing keys (4.4+: channelbag; ≤4.3: action.fcurves)
from bpy_extras import anim_utils
def fcurves(ob):
    ad = ob.animation_data; act = ad.action
    if hasattr(anim_utils, "action_get_channelbag_for_slot"):
        cb = anim_utils.action_get_channelbag_for_slot(act, ad.action_slot)
        return cb.fcurves if cb else []
    return act.fcurves
for fc in fcurves(bpy.context.scene.camera):
    for kp in fc.keyframe_points:
        kp.interpolation = 'BEZIER'; kp.easing = 'AUTO'
```
raea — the house version of "moving at the cut": evaluate an eased curve over a longer virtual span than the shot shows.
```tsx
// shot shows frames [s0, s1]; the eased move runs over [s0 - pre, s1 + post] so no dead start/stop is visible
const t = interpolate(f, [s0 - 12, s1 + 12], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
```
For a flight between two on-screen setups use the full `Easing.inOut(...)` with both ends visible.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: linear camera starts/stops are prohibited. Do not apply the source's Linear default to camera or flight keys. Linear is fine for texture drifts, slow light sweeps that never start/stop on screen, and spins.
- This same Linear advice appears in "How to Make Perfect Product Animations in Blender.txt" (camera, light, product keys) — same conflict.
