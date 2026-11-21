---
title: Top light — pleasing with other lights, sinister alone ("Godfather" look)
bucket: 04_Shading_Lighting
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "21:03–21:50"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Core Style D — our key IS one soft top light; this card explains when it turns sinister (no fill) vs pleasing (with fill/bounce).
---

## METADATA
04_Shading_Lighting | 3.x | Blender bpy + raea

## CREATIVE_INTENT
A light from straight above (a street lamp) puts highlights on tops of heads/objects — a strong cinematic tool. Combined with other light (daylight, fill) it's pleasing; used alone, eye sockets and undersides fall to black and the image turns sinister.

## STE_PROCEDURE
1. Add an emissive mesh for the visible lamp head, then add an Area light just below it pointing down.
2. Place it so it creates a highlight on the top of the subject.
3. For a pleasing read, keep some fill/ambient or a bounce lifting the undersides.
4. For a sinister read, remove the fill so only the top light shapes the subject.
5. Because lamps are instances, edit the shared emission material once to change all lamp heads.

## AGENT_EXECUTION
- Blender: `d = bpy.data.lights.new("Top","AREA"); d.size = ~0.5; o.location = (0,0,2.2); o.rotation_euler = (0,0,0)` (Area lights point down -Z by default).
- raea: soft top key: `<SpotLight transform={Transform.fromXyz(0, 3, 0.2).lookingAt([0,0,0])} intensity outer_angle={0.6} inner_angle={0.3} radius={0.5} soft_shadows_enabled shadow_maps_enabled />` plus `<RectLight transform={Transform.fromXyz(0,3,0.2).lookingAt([0,0,0])} width={1} height={1} intensity />` for the soft share (BlendShot pairs exactly this). Pleasing vs sinister = `<AmbientLight brightness>` ~55 vs ~0–10.

## NOTES
- Rule conflicts: none. For Style D keep a little ambient/bounce unless the line is about loss/danger.
