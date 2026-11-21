---
title: View-frustum visibility — an object outside the frustum shape isn't visible, even if "in front of" the camera
bucket: 05_Camera_Raea_Pipeline
source: "Minimalist Tech & SaaS 3D Staging/Understanding Cameras Perspective and Orthographic.md"
source_time: "3:59–5:51, 8:05–9:06"
tool_target: raea
tier: principle
use_when: "debugging why an object that should be on camera isn't rendering, or placing many small props (icon rows, parallax layers) near the frame edge"
style_fit: "Useful debugging check for raea builders: before assuming a bug, check the object against the actual frustum shape, not just 'is it in front of the camera.'"
---

## METADATA
05_Camera_Raea_Pipeline | Three.js (applies to any engine incl. Bevy/raea) | Camera3d debugging

## CREATIVE_INTENT
A perspective camera's visible volume is a pyramid (frustum), not an infinite cone "in front of" the camera: an
object can be directly ahead of the camera's facing direction and still be entirely or partially invisible if it's
outside the frustum's side planes — a common confusion ("the object is properly in front of the camera, but why
isn't it visible"). An orthographic camera's frustum is a cuboid instead of a pyramid, with the same in/out rule.

## STE_PROCEDURE
1. If an object that should be visible isn't rendering, check its position against the frustum's actual side planes,
   not just whether it's "ahead" of the camera.
2. Remember a wide FOV (perspective) or large left/right/top/bottom values (orthographic) widens the frustum and can
   bring an edge object back into view.
3. For objects placed near the frame edge (icon rows, parallax foreground), leave margin inside the frustum edge
   rather than placing them exactly at the visible boundary — small FOV/aspect changes later can clip them.
4. Large objects (not just small ones) need explicit frustum-culling awareness too — they don't shrink away like
   small distant objects do; they need to be fully inside the frustum or they'll show a visibly cut edge.

## AGENT_EXECUTION
When a raea object isn't appearing, check its world position against the camera's actual frustum (FOV + aspect, or
orthographic bounds) for that frame, before assuming a code/visibility bug. For edge-placed layers (e.g. the
parallax icon rows from the "eye-catching 3D Scenes" card), keep a safety margin inside the frustum edge.

### Worked example
Topic: a shot-list row placing a row of small payment-method icons along the frame's right edge.
BEFORE: icons placed right at the calculated frustum boundary for the widest-FOV frame of the camera move; on a
slightly different frame (narrower FOV mid-move) half the row clips off-screen.
AFTER: icons placed with a safety margin inside the frustum boundary for the move's narrowest FOV frame, so they stay
fully visible across the whole camera move.

### Check
- When an object isn't rendering, was its position checked against the frustum shape, not just camera-facing direction?
- Do edge-placed objects keep margin inside the frustum for every frame of the shot's camera move, not just one frame?
- For large objects near the frustum edge, is the cut edge a deliberate crop, not an accidental clip?

## NOTES
- Visual gaps: none — demoed live and described in the same breath.
- Frustum culling as a performance optimisation (skipping off-screen geometry) is the same underlying mechanism but
  not a concern at our scene scale; the debugging use above is the relevant takeaway.
