---
title: Pair every visible emissive practical with a real light
bucket: 04_Shading_Lighting
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "19:07–21:17"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — screens, LEDs and signs glow (bloom) AND light the hero via a matching light.
---

## METADATA
04_Shading_Lighting | 3.x | Blender bpy + raea

## CREATIVE_INTENT
A glowing surface (moon disc, lit window, lamp head) sells the source, but in EEVEE/real-time it does not light the scene by itself. Put a real lamp of matching colour and shape next to every emissive practical.

## STE_PROCEDURE
1. Assign an Emission material to the visible source polygons (in Edit Mode, select faces, assign a new material).
2. Raise Emission Strength above 1 so it reads bright (and blooms).
3. Add a matching light: Sun for the moon, rectangular Area fitted to the window frame, Area under each lamp head.
4. Match the light's colour to the emission colour.
5. If the practicals are instances, edit the shared material once.

## AGENT_EXECUTION
- Blender: `m = bpy.data.materials.new("Win"); m.use_nodes = True; b = m.node_tree.nodes["Principled BSDF"]; b.inputs["Emission Color"].default_value = (1,0.55,0.25,1); b.inputs["Emission Strength"].default_value = ~5`; face assignment: `bpy.ops.object.material_slot_assign()` in Edit Mode.
- raea: emissive surface + matching light:
  `<StandardMaterial base_color="#1a1a1a" emissive={LinearRgba.from(Srgba.hex("#ff9a4d")).mul(6)} />` and `<RectLight transform={...} width={1.2} height={1.6} color="#ff9a4d" intensity />`; `<Bloom intensity={1} threshold={0.9} />` so it glows.

## NOTES
- Deprecated: Principled v1 socket "Emission" → 4.x "Emission Color".
- Rule conflicts: none.
