---
title: Grunge photo through a Color Ramp into Roughness (one shared worn material)
bucket: 04_Shading_Lighting
source: "Making an Industrial Scene in Blender.txt"
source_time: "05:11–07:04"
blender_version_source: 3.x
tool_target: Shader nodes
tier: principle
style_fit: Breaks up glossy/matte across concrete, metal or counter surfaces so the single top light shows wear; must be baked or authored as a roughness texture for raea.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes → raea StandardMaterial

## CREATIVE_INTENT
Principle: a grungy photo texture also drives roughness — its dark, dirty parts become matte and the rest shiny — so surfaces feel used under a strong light. Idea: one such material can cover ~90% of a set's objects and still look varied, because the grunge varies per surface.

## STE_PROCEDURE
Method:
1. Link a concrete photo texture into Principled BSDF [Base Color].
2. Link the same image into a Color Ramp.
3. Link the Color Ramp into Principled BSDF [Roughness].
4. Move the ramp stops to dial exactly where the surface is shiny and where it is not.
5. Lower Specular a little so highlights are not too intense.
6. Skip the extra AO/curves nodes the author had; he says they do basically nothing.
How-to (raea):
7. Bake the ramped roughness to an image, or pre-process the photo into a greyscale roughness PNG.
8. Assign base colour and roughness maps on a StandardMaterial with `perceptual_roughness={1}`.

## AGENT_EXECUTION
### Source tool (Blender shader nodes)
```python
import bpy
mat = bpy.data.materials.new("GrungeConcrete"); mat.use_nodes = True
N, L = mat.node_tree.nodes, mat.node_tree.links
bsdf = N["Principled BSDF"]
img = N.new('ShaderNodeTexImage'); img.image = bpy.data.images.load("//tex/concrete_grunge.jpg")
ramp = N.new('ShaderNodeValToRGB')
ramp.color_ramp.elements[0].position = 0.2; ramp.color_ramp.elements[1].position = 0.7   # ~ dial by eye
L.new(img.outputs['Color'], bsdf.inputs['Base Color'])
L.new(img.outputs['Color'], ramp.inputs['Fac'])
L.new(ramp.outputs['Color'], bsdf.inputs['Roughness'])
bsdf.inputs['Specular IOR Level'].default_value = 0.35    # ~ "taken the specular down a little" (4.x name)
```
Links: `Image [Color] -> Principled [Base Color]`; `Image [Color] -> Color Ramp [Fac]`; `Color Ramp [Color] -> Principled [Roughness]`.

### Blender / raea translation
Bake: `bpy.ops.object.bake(type='ROUGHNESS')` into a Non-Color image (Cycles as a build tool), save as `grunge_rough.png`.
```tsx
<StandardMaterial base_color_texture={staticFile("concrete_grunge.jpg")}
  metallic_roughness_texture={staticFile("grunge_rough.png")} perceptual_roughness={1} reflectance={0.4} />
```
`reflectance` (StandardMaterial, 0.5 default) is the nearest raea dial to lowering Specular (`~`). For painted metal, `<ExtendedMaterial base={<StandardMaterial .../>} extension={<WearExtension amount={0.6} />} />` gives procedural grime/chips at render time without a bake.

## NOTES
- Deprecated: Principled v1 "Specular" → 4.x "Specular IOR Level" (0.5 default).
- Source of textures: textures.com (licence check needed) — prefer Poly Haven CC0 for our pipeline and log in ASSET-SOURCES.md.
- Triage mentioned a weight-painted vertex group used as a shader mask; it does not appear in this transcript — not carded.
- Visual gaps: ramp positions and specular value are on screen only.
- Rule conflicts: none.
