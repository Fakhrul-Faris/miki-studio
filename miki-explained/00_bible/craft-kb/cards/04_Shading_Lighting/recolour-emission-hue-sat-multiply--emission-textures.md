---
title: Recolour an emissive image with Hue/Saturation and a Multiply mix
bucket: 04_Shading_Lighting
source: "3 Ways To Make Stunning Emission Textures In Blender.txt"
source_time: "04:01–04:44"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: Forces any texture into the brand accent hue.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes → raea emissive tint

## CREATIVE_INTENT
The image’s own colours rarely fit; a hue shift plus a multiply by the target colour pulls it into the palette without losing its structure.

## STE_PROCEDURE
1. Insert Hue/Saturation/Value between Image [Color] and Emission Color; turn Hue to taste.
2. Add a Mix node (Color, Blend = Multiply) after it; set B to the target colour (video: blue).
3. Set Factor to taste.

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials["PhotoEmit"]; N, L = m.node_tree.nodes, m.node_tree.links
img = next(n for n in N if n.bl_idname == "ShaderNodeTexImage"); b = N["Principled BSDF"]
hsv = N.new("ShaderNodeHueSaturation"); hsv.inputs["Hue"].default_value = 0.6   # ~
mx = N.new("ShaderNodeMix"); mx.data_type = "RGBA"; mx.blend_type = "MULTIPLY"; mx.inputs["Factor"].default_value = 1.0
mx.inputs["B"].default_value = (0.1, 0.3, 1.0, 1)      # ~ target colour (Color sockets A/B)
L.new(img.outputs["Color"], hsv.inputs["Color"]); L.new(hsv.outputs["Color"], mx.inputs["A"]); L.new(mx.outputs["Result"], b.inputs["Emission Color"])
```
Links: `Image [Color] -> Hue/Saturation/Value [Color] -> Mix (Multiply) [A]`; `Mix [Result] -> Principled [Emission Color]`.
raea: the multiply is the `emissive` colour itself when an `emissive_texture` is set (~ Bevy multiplies map × factor): `emissive={LinearRgba.from(Srgba.hex(ACCENT)).mul(4)}`.

## NOTES
- Deprecated: MixRGB "Multiply" (legacy) → Mix node with Data Type = Color, Blend = Multiply (3.4+). Note the Mix node’s Color sockets are inputs[6]/[7] by index; by name "A"/"B" resolves to the Float pair in some versions — check `mx.inputs` and pick the RGBA ones.
- Visual gaps: hue value shown only.
- Rule conflicts: none.

