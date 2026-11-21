---
title: Drive the camera forward from the subject's transform, with a separate correction layer
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 4 | Camera Analysis (The Chase).txt"
source_time: "18:31–19:33, 21:31–23:02"
blender_version_source: n/a (Houdini)
tool_target: principle-only | Blender bpy | raea
tier: principle
style_fit: Useful for travel shots (a coin, a parcel, a token moving through a scene); pair with the relative-motion rule so it isn't a locked follow.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini) → Blender 4.2+ / raea | principle + translation

## CREATIVE_INTENT
Principle: the ships are animated very simply: one transform, two linear keys on the forward axis (heaviness shown only in how they turn). Instead of hand-animating the camera to keep pace, link the camera's transform to the ship's so it is carried forward, then add a correction transform on top (ideally on its own extra camera layer) for the framing tweaks. To amplify speed, place the camera closer to passing geometry.
Ideas: our tracking shots: carry the camera with the hero, then add a small independent drift so camera and subject speeds differ slightly.

## STE_PROCEDURE
Method:
1. Animate the subject on one transform (forward axis), simple keys.
2. Link (parent / reference) the camera rig's top transform to the subject's transform.
3. Add a correction transform below the link for framing changes.
4. Keep correction keys separate from the link so the follow can be re-timed.
5. To feel faster, move the camera nearer to geometry the subject passes.

## AGENT_EXECUTION
### Source tool (Houdini)
Camera rig's top Null with its transform channel-referenced to the ship's Transform (`ch("../ship/tz")`); a separate correction Transform underneath (author recommends a dedicated correction camera layer).
### Blender / raea translation
Blender:
```python
import bpy
link = bpy.data.objects["CAM_link"]                      # top of the camera rig
c = link.constraints.new('COPY_LOCATION'); c.target = bpy.data.objects["Hero"]
c.use_offset = True                                      # keep the rig's offset from the hero
# CAM_correction (child of CAM_link) holds the hand-keyed framing tweaks
```
raea:
```tsx
const hero = heroAt(f);                                  // the subject's position function
const drift: V3 = [0.05 * ease(f, 0, 60), 0, -0.08 * ease(f, 0, 60)];    // correction layer (~)
const p: V3 = [hero[0] + 0.6 + drift[0], hero[1] + 0.25, hero[2] + 1.2 + drift[2]];
<Camera3d transform={Transform.fromXyz(...p).lookingAt(hero)} projection={{ Perspective: { fov } }} />
```

## NOTES
- Deprecated: none.
- Visual gaps: channel links shown on screen.
- Rule conflicts: the subject's two linear keys are linear starts/stops — ease them (or have it enter/exit frame already moving). A rigid lock reads as CG (see camera-relative-motion-not-locked--car-animation); always keep the correction drift. Speed ≤ ~40 m/s scaled.
