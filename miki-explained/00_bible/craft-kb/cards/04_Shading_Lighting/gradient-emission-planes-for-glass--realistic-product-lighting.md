---
title: Lighting glass with hidden gradient-emission planes (soft falloff reflections, bright edge toward the back)
bucket: 04_Shading_Lighting
source: "Realistic Product Lighting In Blender.txt"
source_time: "04:35–06:39"
blender_version_source: 4.x
tool_target: Shader nodes | raea
tier: full
style_fit: Bottles, glass jars, phone screens as heroes; in raea the reflections must live in an HDRI panorama.
---

## METADATA
04_Shading_Lighting | 4.x | Shader nodes → raea Environment + real glass material

## CREATIVE_INTENT
Glass shows its lights as reflections, so area lights’ hard rectangles ruin it. Planes with emission fading via a spline gradient give smooth falloff reflection strips that define the glass edges. Same rig positions as the product rig.

## STE_PROCEDURE
1. Add a plane behind the bottle; replace Principled with Emission → Material Output; set Strength (not too high).
2. Hide it from camera: Object › Visibility › Ray Visibility › Camera off.
3. Scale it to the product.
4. Cursor to product centre; duplicate the back plane and orbit it to one side.
5. Give the side plane a new material: Texture Coordinate → Mapping → Gradient Texture → Color Ramp (Interpolation = B-Spline, soft) → Emission [Color/Strength].
6. Rotate the gradient (Mapping rotation) so the bright side faces the back of the product (R 180 on its axis if reversed).
7. Duplicate it to the other side; rotate it slightly for a nicer result.

## AGENT_EXECUTION
```python
import bpy, math
m = bpy.data.materials.new("GradEmit"); m.use_nodes = True; N, L = m.node_tree.nodes, m.node_tree.links
N.remove(N["Principled BSDF"])
tc = N.new("ShaderNodeTexCoord"); mp = N.new("ShaderNodeMapping"); mp.inputs["Rotation"].default_value[2] = math.radians(90)  # ~
gr = N.new("ShaderNodeTexGradient"); cr = N.new("ShaderNodeValToRGB"); cr.color_ramp.interpolation = "B_SPLINE"
em = N.new("ShaderNodeEmission"); em.inputs["Strength"].default_value = 5   # ~ "don’t go too high"
L.new(tc.outputs["UV"], mp.inputs["Vector"]); L.new(mp.outputs["Vector"], gr.inputs["Vector"])
L.new(gr.outputs["Fac"], cr.inputs["Fac"]); L.new(cr.outputs["Color"], em.inputs["Color"])
L.new(em.outputs["Emission"], N["Material Output"].inputs["Surface"])
for n in ("Glass_L", "Glass_R", "Glass_Back"): bpy.data.objects[n].visible_camera = False
```
Links: `Texture Coordinate [UV] -> Mapping [Vector] -> Gradient Texture [Vector] -> Color Ramp [Fac] -> Emission [Color] -> Material Output [Surface]`.
raea: glass = `<StandardMaterial specular_transmission={1} ior={1.5} thickness={0.005} perceptual_roughness={0.05} />` (materials.md, since 2026-10-22). Reflection strips: bake these planes into an equirect HDR in Blender (asset) → `<Environment src={staticFile("glass_strips.hdr")} />`; light with `<RectLight>`s at the planes’ positions.

## NOTES
- Deprecated: none.
- Visual gaps: mapping rotation values shown only ("change these values").
- Rule conflicts: none.

