---
title: Off-screen motivated lights and up-lighting for ominous scale
bucket: 04_Shading_Lighting
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "20:41–22:05"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Partly fits — implied off-frame sources enrich the dark room; up-light only on ominous lines.
---

## METADATA
04_Shading_Lighting | 3.x | Blender bpy + raea

## CREATIVE_INTENT
Lights placed out of frame (a warm glow from a side street) make the audience feel the world continues beyond the frame and can pick out secondary props. A light aimed up at something big from below implies a street light and makes the big thing ominous.

## STE_PROCEDURE
1. Place a coloured Spot or Area light outside the camera frame, aimed into a background area.
2. Tune it so it lights a secondary prop or wall, not the hero.
3. For an ominous big object, place a Spot below it, aimed upward along its face.
4. Keep the up-light cooler or dimmer than the hero's key so the hierarchy holds.

## AGENT_EXECUTION
- Blender: `o.location = (6, 12, 0.3); track to building; d.type='SPOT'; d.color=(0.5,0.65,1.0)` (~).
- raea: `<SpotLight transform={Transform.fromXyz(6, 0.3, -12).lookingAt([6, 8, -14])} color="#8fb0ff" intensity outer_angle={0.4} />` (up-light); off-frame warm glow: `<PointLight color="#ffb060" transform={Transform.fromXyz(-8,1.5,-6)} intensity range />` placed outside the frustum.

## NOTES
- Rule conflicts: off-frame "something going on" must not imply people in the street (default no people).
