---
title: Near/far clip-plane trade-offs — set near as small as needed, not smaller
bucket: 05_Camera_Raea_Pipeline
source: "Minimalist Tech & SaaS 3D Staging/Understanding Cameras Perspective and Orthographic.md"
source_time: "6:00–11:35"
tool_target: raea
tier: principle
use_when: "a macro hero object clips/shows its inside, or flickers, when the camera pushes in close"
style_fit: "Directly relevant to Style D's macro-close camera work: our shots push very close to the hero object, exactly where near-plane clipping shows up first."
---

## METADATA
05_Camera_Raea_Pipeline | Three.js (applies to any engine incl. Bevy/raea) | Camera3d near/far params

## CREATIVE_INTENT
Every perspective camera has a near clip plane: anything closer to the camera than that distance is invisible or
clips open, showing the inside of the model. The near value can't be 0 (the camera itself disappears), but too large
a near value clips early/obviously; too small a near value can cause z-fighting/flicker. The far plane similarly
culls anything beyond it, though small objects already shrink to invisible before they'd hit a sane far value.

## STE_PROCEDURE
1. Before a macro push-in shot, check how close the camera will actually get to the hero object at its closest frame.
2. Set the near clip value just smaller than that closest distance — not an arbitrarily tiny default.
3. If the object visibly clips open (you can see its inside) during a push-in, the near value is too large: lower it.
4. If distant/thin geometry flickers, the near value is too small for the scene's depth range: raise it slightly and
   retest.
5. Set the far plane comfortably beyond the farthest object that must stay visible; don't leave it at an arbitrary
   large default (wastes depth precision).

## AGENT_EXECUTION
raea `Camera3d` projection: tune `near`/`far` per shot to the actual closest/farthest distance the camera reaches
during that shot's move, not a single global default reused everywhere — a macro push-in shot needs a much smaller
`near` than a wide establishing shot.

### Worked example
Topic: a macro push-in on a coin's milled edge.
BEFORE: global default `near=0.1` (in metres) used for every shot; on the closest frame of the push-in (camera 0.04 m
from the coin edge) the coin's inside renders visible through its face — clipping.
AFTER: this shot's `near` lowered to 0.02 for the push-in's duration; the clip no longer shows. A separate wide
establishing shot keeps `near=0.1` since its closest approach is much farther away.

### Check
- Does the near value sit below the camera's actual closest distance to the hero for that specific shot?
- If the object showed its inside during a push-in, was the near value lowered (not just the camera pulled back)?
- Is the far plane set to the scene's real farthest visible distance, not left at an arbitrary large default?

## NOTES
- Visual gaps: the exact near values demoed (0.1, 0.04, 0.2) are Three.js scene-unit examples; map by testing against
  our own scene scale, not by copying the numbers directly.
- Orthographic cameras can use a near value of exactly 0 (no "camera disappears" problem) since they have no frustum
  apex — useful if an orthographic diagram shot needs the camera placed very close.
