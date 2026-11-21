---
title: Colour-match imported assets with Hue/Saturation or Mix (Color) nodes
bucket: 04_Shading_Lighting
source: "Making a SERENE render in blender.txt"
source_time: "12:09–12:27, 16:42–17:42"
blender_version_source: 4.x
tool_target: Shader nodes | Blender bpy
tier: full
style_fit: Core to our "fresh library assets per episode" pipeline — CC0 models from different sources must sit in one palette so only the brand accent pops.
---

## METADATA
04_Shading_Lighting | 4.x → 4.2+ (bake before GLB) | Shader nodes + Blender bpy

## CREATIVE_INTENT
Assets from different libraries rarely match; nudging each one's hue and saturation toward the scene's palette makes everything feel like one place. Keep the palette narrow (one main colour) until the balance works.

## STE_PROCEDURE
1. Before placing an imported model, compare its colour to the surrounding materials in the render.
2. Insert a Hue/Saturation/Value node between its Base Color texture and Principled BSDF [Base Color].
3. Shift Hue until the colour family matches (video: brown rocks slightly off → tweak Hue).
4. Lower Saturation if it still reads too saturated.
5. Or use a Mix node (Color, Multiply/Mix) with a scene colour to tint.
6. Pick assets already close in colour (video: brown trees with brown rocks); add a second colour family only later.

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials["Rock"]; N, L = m.node_tree.nodes, m.node_tree.links
bsdf = N["Principled BSDF"]; tex = bsdf.inputs['Base Color'].links[0].from_node
hsv = N.new('ShaderNodeHueSaturation')
hsv.inputs['Hue'].default_value = 0.48          # ~ 0.5 = no shift
hsv.inputs['Saturation'].default_value = 0.8    # ~ "brought it down"
L.new(tex.outputs['Color'], hsv.inputs['Color']); L.new(hsv.outputs['Color'], bsdf.inputs['Base Color'])
```
Node links: `Image Texture [Color] -> Hue/Saturation/Value [Color] -> Principled BSDF [Base Color]`; alt `Mix (Color, Mix, Factor ~0.3, B = scene colour) [Result] -> [Base Color]`.
GLB export does not keep these nodes: bake the corrected colour (`bpy.context.scene.cycles.bake_type = 'DIFFUSE'`, pass filter Color only; `bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'})`) into a new texture before export.

raea: no per-material hue node; a `<StandardMaterial base_color="#c8b8a0">` inside a `<Model>` re-covers its material (materials.md) — whether it multiplies or replaces the texture is not stated, so prefer the Blender bake. Whole-frame unification: `<Grade saturation temperature>` (first frame holds).

## NOTES
- Deprecated: MixRGB → Mix node (Data Type = Color) in 3.4+.
- Visual gaps: exact HSV values are on screen only.
- Rule conflicts: none; keep the brand accent outside the matched palette.
