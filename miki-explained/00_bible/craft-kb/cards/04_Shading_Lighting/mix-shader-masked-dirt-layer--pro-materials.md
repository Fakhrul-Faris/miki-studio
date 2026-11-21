---
title: Two shaders in one material via Mix Shader with a remapped noise mask (not Add Shader)
bucket: 04_Shading_Lighting
source: "How to Create PRO Materials in Blender.txt"
source_time: "06:04–08:13"
blender_version_source: 4.x
tool_target: Shader nodes
tier: full
style_fit: Lets the hero object carry a second material (dirt, grime, wet patch) — useful for "before/after" or "worn" beats; bake for raea or use WearExtension.
---

## METADATA
04_Shading_Lighting | 4.2+ | Shader nodes (baked) → raea WearExtension / baked maps

## CREATIVE_INTENT
Surface imperfections are the single biggest jump in realism. A surface is either paint or dirt at any point, so two full shaders are mixed by a hard-edged mask rather than added together.

## STE_PROCEDURE
1. Keep the first Principled BSDF as the clean car paint.
2. Add a second Principled BSDF for dirt.
3. Add two Noise Textures (second for variation) and combine them.
4. Route the noise through Color Ramp A (several dirt browns) → dirt Base Color.
5. Route the noise through Color Ramp B → Bump/Normal for dirt relief.
6. Drive dirt Roughness with another noise set for wet-vs-dry variation.
7. Add a Mix Shader; link paint → Shader A, dirt → Shader B.
8. Plug a Noise Texture → Color Ramp (hard stops, no mid greys) → Mix Shader [Fac] as the mask.
9. Do not use Add Shader here: it sums both BSDFs (only right for e.g. dispersion glass stacks).

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials["CarPaint"]; N, L = m.node_tree.nodes, m.node_tree.links
paint = N["Principled BSDF"]; out = N["Material Output"]
dirt = N.new("ShaderNodeBsdfPrincipled")
n1 = N.new("ShaderNodeTexNoise"); n2 = N.new("ShaderNodeTexNoise"); n2.inputs["Scale"].default_value = 12.0  # ~
mixn = N.new("ShaderNodeMix"); mixn.data_type = 'FLOAT'; mixn.inputs[0].default_value = 0.5
L.new(n1.outputs["Fac"], mixn.inputs[2]); L.new(n2.outputs["Fac"], mixn.inputs[3])   # A,B float
col = N.new("ShaderNodeValToRGB"); L.new(mixn.outputs[0], col.inputs["Fac"])
col.color_ramp.elements[0].color = (0.10, 0.07, 0.04, 1); col.color_ramp.elements[1].color = (0.30, 0.22, 0.14, 1)  # ~ dirt browns
L.new(col.outputs["Color"], dirt.inputs["Base Color"])
bumpr = N.new("ShaderNodeValToRGB"); L.new(mixn.outputs[0], bumpr.inputs["Fac"])
bump = N.new("ShaderNodeBump"); bump.inputs["Strength"].default_value = 0.3   # ~
L.new(bumpr.outputs["Color"], bump.inputs["Height"]); L.new(bump.outputs["Normal"], dirt.inputs["Normal"])
mask_n = N.new("ShaderNodeTexNoise"); mask_r = N.new("ShaderNodeValToRGB")
mask_r.color_ramp.elements[0].position = 0.48; mask_r.color_ramp.elements[1].position = 0.52  # hard edge, no mixed values
L.new(mask_n.outputs["Fac"], mask_r.inputs["Fac"])
ms = N.new("ShaderNodeMixShader")
L.new(mask_r.outputs["Color"], ms.inputs["Fac"])
L.new(paint.outputs["BSDF"], ms.inputs[1]); L.new(dirt.outputs["BSDF"], ms.inputs[2])
L.new(ms.outputs["Shader"], out.inputs["Surface"])
```
Links: `Noise [Fac] -> Color Ramp(hard) [Fac]`; `Color Ramp [Color] -> Mix Shader [Fac]`; `Principled(paint) [BSDF] -> Mix Shader [Shader A]`; `Principled(dirt) [BSDF] -> Mix Shader [Shader B]`.

raea: no shader graph at render. Either bake Diffuse colour, Roughness and Normal of the mixed result to PNGs (`bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'})`, `type='ROUGHNESS'`, `type='NORMAL'`) and load them as `base_color_texture` / `metallic_roughness_texture` / `normal_map_texture`, or at render time use `<ExtendedMaterial base={<StandardMaterial base_color="#8a0f1e" perceptual_roughness={0.3} />} extension={<WearExtension amount={0.6} grime={0.5} />} />` (grime gathers low and underneath; `seed`, `scale` in metres).

## NOTES
- Deprecated: MixRGB → Mix node (data_type Color/Float); in Python index Mix inputs (Float A/B = 2/3, Color A/B = 6/7).
- Visual gaps: exact noise scales, ramp colours and how the two noises are combined are shown on screen only; values above are `~`.
- Rule conflicts: none.
