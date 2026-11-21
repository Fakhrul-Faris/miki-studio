---
title: Per-light distance cutoff (light the subject, not the floor)
bucket: 04_Shading_Lighting
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "23:20–23:41"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — keeps the dark room dark while a light shapes only the hero object.
---

## METADATA
04_Shading_Lighting | 3.x (EEVEE only) | Blender bpy + raea

## CREATIVE_INTENT
A cheat to stop a rim or accent light spilling onto the ground: cut the light off at a set distance so it touches only the subject.

## STE_PROCEDURE
1. Select the light.
2. Enable Custom Distance in the light's EEVEE settings.
3. Lower Distance until the light stops reaching the ground but still reaches the subject.
4. Before switching the scene to Cycles, remove the cutoff or expect a different image (Cycles ignores it).

## AGENT_EXECUTION
- Blender: `d.use_custom_distance = True; d.cutoff_distance = ~3.0` (EEVEE / EEVEE Next).
- raea: `range` on PointLight/SpotLight/RectLight (metres; 20 by default): `<SpotLight ... range={3} />`. Cone-shape restriction is `outer_angle`/`inner_angle`.

## NOTES
- raea renders, so the Cycles caveat does not apply to finals; it does to any Cycles look test.
- Rule conflicts: none.
