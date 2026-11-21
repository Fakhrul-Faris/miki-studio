---
title: Remap 0–1 texture output into sane material ranges with Color Ramp / Map Range
bucket: 04_Shading_Lighting
source: "How to Create PRO Materials in Blender.txt"
source_time: "02:29–04:22"
blender_version_source: 4.x
tool_target: Shader nodes
tier: full
style_fit: Keeps roughness variation subtle and believable on a hero object under one soft light; no rule impact.
---

## METADATA
04_Shading_Lighting | 4.2+ | Shader nodes (baked) → raea metallic_roughness_texture

## CREATIVE_INTENT
Raw texture outputs run 0 (black) to 1 (white); no real surface is roughness 0 or 1. Squeezing the range to e.g. 0.5–0.8 gives low-contrast, natural variation instead of a blotchy mirror/chalk mix.

## STE_PROCEDURE
1. Before you plug any texture into Roughness, insert a Color Ramp or Map Range between them.
2. Color Ramp: set the black stop colour to grey 0.5 and the white stop colour to grey ~0.6–0.8.
3. Drag the two stops together to sharpen the speckle shapes ("nice clean shapes").
4. Map Range alternative: To Min = 0.5, To Max = ~0.8 (Map Range computes slightly faster).
5. Tune each detail layer individually when a material has several.

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials["CarPaint"]; N, L = m.node_tree.nodes, m.node_tree.links
vor = next(n for n in N if n.bl_idname == "ShaderNodeTexVoronoi")
ramp = N.new("ShaderNodeValToRGB")
e = ramp.color_ramp.elements
e[0].position, e[0].color = 0.40, (0.5, 0.5, 0.5, 1)   # stop positions ~ (visual only)
e[1].position, e[1].color = 0.60, (0.8, 0.8, 0.8, 1)
L.new(vor.outputs["Color"], ramp.inputs["Fac"])
L.new(ramp.outputs["Color"], N["Principled BSDF"].inputs["Roughness"])
# Map Range variant
mr = N.new("ShaderNodeMapRange")
mr.inputs["To Min"].default_value = 0.5; mr.inputs["To Max"].default_value = 0.8
```
Links: `Voronoi [Color] -> Color Ramp(0.5 grey → ~0.8 grey) [Fac]`; `Color Ramp [Color] -> Principled BSDF [Roughness]`.

raea: bake the roughness channel (`bpy.ops.object.bake(type='ROUGHNESS')`) to a greyscale PNG and give it as `metallic_roughness_texture` with `perceptual_roughness={1}` (Bevy reads roughness from green and multiplies by the factor; the default 0.5 halves it — materials.md).

## NOTES
- Visual gaps: exact color-stop positions are shown, not narrated; values above are `~`. Video mentions 0.5 and 0.8 or 0.6 as example greys.
- Rule conflicts: none.
