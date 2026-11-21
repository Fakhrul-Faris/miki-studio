---
title: Cheated rim/back light — a restricted spot in the motivating source's colour
bucket: 04_Shading_Lighting
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "22:22–24:43"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — a narrow rim spot separates the dark hero object from the dark room without lifting the room.
---

## METADATA
04_Shading_Lighting | 3.x | Blender bpy + raea

## CREATIVE_INTENT
The motivating source (moon, neon) alone rarely makes a strong enough rim. Add a dedicated spot behind the subject, coloured like that source, with a narrow cone wrapping only the subject. A small soft spot on the face from a window "rogue ray" is also fine — lighting only needs to be loosely motivated. The source's "rim" variant hits from the side at a sharp angle so only one side lights.

## STE_PROCEDURE
1. Add a Spot light behind the subject, facing the camera side of the subject.
2. Set its colour to the motivating source's colour (e.g. the moon's).
3. Raise intensity until an edge appears on the subject.
4. Narrow Spot Size so the cone envelops only the subject(s).
5. For a one-sided rim, place the spot to the side at a sharp angle instead of directly behind.
6. Optional face accent: a small Spot with a very soft Blend and small Spot Size aimed only at the face.
7. Limit the spot's reach with Custom Distance so it does not light the ground (see "Light range cutoff").

## AGENT_EXECUTION
- Blender: `d = bpy.data.lights.new("Rim","SPOT"); d.color = moon_color; d.energy = ~1000; d.spot_size = math.radians(~20); d.spot_blend = ~0.3`; place behind subject, Track To the subject.
- raea: `<SpotLight transform={Transform.fromXyz(0.4, 1.2, -1.5).lookingAt(subject)} color="#cfe0ff" intensity={~1500000} outer_angle={0.18} inner_angle={0.09} range={3} />` — `outer_angle` in radians (half-angle); `range` stops it reaching the floor.

## NOTES
- Values not stated in video (visual only) — all `~`.
- Rule conflicts: none.
