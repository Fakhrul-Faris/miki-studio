---
title: Lagging pan: delay the camera's rotation behind the subject so it seems to pull the camera
bucket: 01_Animation_Motion
source: "CG Cinematography 101 | Chapter 4 | Camera Analysis (The Chase).txt"
source_time: "09:52–12:34"
blender_version_source: n/a (Houdini)
tool_target: principle-only | Blender bpy | raea
tier: principle
style_fit: Good fit for following a moving object (a coin rolling, a token travelling): a slight, eased lag reads as an operator, not a locked CG camera.
---

## METADATA
01_Animation_Motion | n/a (Houdini) → Blender 4.2+ / raea | principle + translation

## CREATIVE_INTENT
Principle: think like a camera operator: no one can pan exactly with a fast subject. Let the subject lead and drag the frame, with the camera's rotation keys delayed behind it; the subject drifts toward the frame edge and the camera catches up. Don't overdo it: something of the subject (even only the engine glow) must stay in frame.
Ideas: when the hero object moves on a word, delay the camera's aim by a few frames and ease it in.

## STE_PROCEDURE
Method:
1. Animate the subject's move first.
2. Animate the camera's pan to follow it.
3. Shift the pan's rotation keys later by a few frames so the subject leads.
4. Shift the other cameras' rotations (later shots) by the same delay where the motion continues.
5. Check the most extreme frame: part of the subject must remain visible.

## AGENT_EXECUTION
### Source tool (Houdini)
Select the camera rotate keys in the Animation Editor and slide them later; tuned by eye ("let it go out of frame even more and maybe even delay it").
### Blender / raea translation
Blender: offset the camera rotation F-curves:
```python
import bpy
from bpy_extras import anim_utils
cam = bpy.data.objects["Camera"]
ad = cam.animation_data   # camera must already be keyed
for fc in anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves:
    if fc.data_path == "rotation_euler":
        for k in fc.keyframe_points:
            k.co.x += 4; k.handle_left.x += 4; k.handle_right.x += 4    # ~ 4-frame lag
```
raea: aim at the subject's position a few frames ago (smooth, deterministic):
```tsx
const LAG = 4;                                        // ~ frames
const aim = subjectAt(Math.max(0, f - LAG));          // same function that places the subject
<Camera3d transform={Transform.fromXyz(...p).lookingAt(aim)} projection={{ Perspective: { fov } }} />
```

## NOTES
- Deprecated: none.
- Visual gaps: exact delay frames tuned on screen.
- Rule conflicts: the catch-up must stay eased and under ~130°/s; no whip pan to recover. The subject never leaves frame entirely in our shots.
- bpy fixed for 5.3: action.fcurves → bpy_extras.anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves (slotted actions).
