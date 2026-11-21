---
title: Match camera height (horizon line) when no vanishing points are available
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "1:34:55–1:37:11; 1:47:54–1:48:27"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Serves Style D low-angle/eye-level/top-down setups: every added element must share the camera's horizon; no conflict.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: the horizon sits at camera height; receding edges at camera height are flat, edges above or below form a growing V. Idea: read the plate's eye level from cues (seeing the top or underside of shoulders, helmets) and choose or place elements shot from the same height.

## STE_PROCEDURE
1. Find the receding edges that look flat; that height is the camera height / horizon.
2. Confirm with surfaces seen from above (tops visible = camera above) and from below (undersides visible).
3. Choose background elements shot at the same height (search filters such as "eye level").
4. Place the background so its horizon line sits on the plate's horizon.
5. Then read compression from how strong the receding angles are and scale accordingly.
6. If the plate has few cues, accept a looser match: the viewer has few cues to spot errors too.

## AGENT_EXECUTION
### Source tool (Nuke)
`Transform` the background vertically until its horizon matches the line read from the plate.
### Blender / raea translation
- raea: the horizon in frame is set by the camera's pitch: `Transform.fromXyz(x, h, z).lookingAt([tx, h, tz])` (same height) puts the horizon at frame centre; looking down moves it up.
- For a Style D setup change, state the camera height per setup in the camera map (macro on the surface, eye level, top-down) and keep every inserted element (photo, screen, label) consistent with it.
- Blender: `cam.location.z = h`; `cam.rotation_euler.x = math.radians(90)` for a level camera.

## NOTES
- Rule conflicts: none.
