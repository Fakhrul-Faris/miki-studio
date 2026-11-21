---
title: Different images in Color vs Alpha, partial alpha and duplicated geometry for layered see-through emitters
bucket: 04_Shading_Lighting
source: "3 Ways To Make Stunning Emission Textures In Blender.txt"
source_time: "04:44–08:34"
blender_version_source: 3.x
tool_target: Shader nodes | Blender bpy | raea
tier: full
style_fit: Rich abstract light sculptures for a "data/money" hero beat; keep one hue.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes + mesh edit → raea layered emissive planes

## CREATIVE_INTENT
When you don’t know what to make: block a few basic shapes, then feed one image into colour and a different one into alpha. Lowering the alpha ramp’s white point makes it semi-transparent, so both textures and what’s behind show at once — layered, unexpected detail. Duplicating faces with offset UVs adds another layer.

## STE_PROCEDURE
1. Model a rough pattern/shape from a plane (move a few basic shapes; no precision needed).
2. Feed image A into Emission Color; re-unwrap and line it up.
3. Feed image B (e.g. a JSPlacement map) through a Color Ramp into Alpha.
4. Lower the Color Ramp white stop so the surface is not fully opaque; raise Emission Strength to keep it bright.
5. Duplicate part of the geometry (select linked, Ctrl+L; Shift+D), delete unneeded faces, and move/re-project its UVs for an offset second layer.
6. To iterate: duplicate the Image datablock (the "2" user button) before swapping files, so earlier tries are kept.

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials["LayerEmit"]; N, L = m.node_tree.nodes, m.node_tree.links
b = N["Principled BSDF"]
ia = N.new("ShaderNodeTexImage"); ia.image = bpy.data.images.load("//media/a.jpg")
ib = N.new("ShaderNodeTexImage"); ib.image = bpy.data.images.load("//media/jsp_02.png")
cr = N.new("ShaderNodeValToRGB"); cr.color_ramp.elements[1].color = (0.6, 0.6, 0.6, 1)   # ~ white handle lowered
L.new(ia.outputs["Color"], b.inputs["Emission Color"]); L.new(ib.outputs["Color"], cr.inputs["Fac"]); L.new(cr.outputs["Color"], b.inputs["Alpha"])
b.inputs["Emission Strength"].default_value = 15   # ~
keep = ia.image.copy()       # keep a try before swapping (= duplicate datablock)
keep.use_fake_user = True
```
raea: two stacked `<Mesh3d>` planes, each `alpha_mode="Blend"`, `base_color={Srgba.hex("#000").with_alpha(0.6)}`, own `emissive_texture`, slightly offset in depth; `<Bloom>` for glow.

## NOTES
- Deprecated: "Emission" → "Emission Color".
- Visual gaps: geometry and UV placement visual only.
- Rule conflicts: none.

