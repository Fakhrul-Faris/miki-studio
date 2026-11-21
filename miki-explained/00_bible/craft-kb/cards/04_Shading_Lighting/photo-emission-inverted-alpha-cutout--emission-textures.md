---
title: Any photo into Emission Color + inverted, ramped Alpha — a unique emissive cut-out light
bucket: 04_Shading_Lighting
source: "3 Ways To Make Stunning Emission Textures In Blender.txt"
source_time: "00:31–01:37"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: Unique practical-light shapes in the dark room; the glow must be the line’s accent colour (recolour per the hue card).
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes → raea emissive_texture + alpha PNG

## CREATIVE_INTENT
A flat white emissive bar screams "default Blender". Running any random photo into both emission colour and alpha gives a light with structure nobody else has — the photo decides where it glows and where it’s see-through.

## STE_PROCEDURE
1. Add a plane.
2. Add an Image Texture with any photo.
3. Link Image [Color] → Principled BSDF [Emission Color].
4. Link Image [Color] → Invert Color → Color Ramp → Principled BSDF [Alpha] (invert when the photo’s subject is dark on white).
5. Drag the Color Ramp stops until the background is fully transparent and the subject opaque.
6. Raise Emission Strength.
7. Put something behind the plane to check transparency.

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials.new("PhotoEmit"); m.use_nodes = True; N, L = m.node_tree.nodes, m.node_tree.links
b = N["Principled BSDF"]; img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//media/photo.jpg")
inv = N.new("ShaderNodeInvert"); cr = N.new("ShaderNodeValToRGB")
cr.color_ramp.elements[0].position = 0.35; cr.color_ramp.elements[1].position = 0.55   # ~
L.new(img.outputs["Color"], b.inputs["Emission Color"])
L.new(img.outputs["Color"], inv.inputs["Color"]); L.new(inv.outputs["Color"], cr.inputs["Fac"]); L.new(cr.outputs["Color"], b.inputs["Alpha"])
b.inputs["Emission Strength"].default_value = 10   # ~
m.surface_render_method = "BLENDED"
```
Links: `Image [Color] -> Principled [Emission Color]`; `Image [Color] -> Invert Color [Color] -> Color Ramp [Fac] -> Principled [Alpha]`.
raea: bake to two maps (or one RGBA PNG: colour + alpha) and use `<StandardMaterial base_color={Srgba.hex("#000000").with_alpha(1)} base_color_texture={staticFile("emit_rgba.png")} emissive_texture={staticFile("emit_rgba.png")} emissive="#ffffff" alpha_mode="Blend" />` (~ emissive × map; verify brightness on a still) with `<Bloom threshold={0.9}>`. Or an `<ImagePlane>` of the RGBA PNG for an unlit glow card.

## NOTES
- Deprecated: "Emission" → "Emission Color" (4.0); Eevee Legacy blend modes → Render Method.
- Visual gaps: ramp stop positions only shown (~00:34–01:22).
- Rule conflicts: log photo source/licence in ASSET-SOURCES.md.

