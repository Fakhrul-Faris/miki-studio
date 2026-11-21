---
title: Layer a symbol under text with a second UV map — Multiply × inverted text mask, symbol as Mix factor, bump from the mask
bucket: 04_Shading_Lighting
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "26:55–33:52"
blender_version_source: 4.3
tool_target: Shader nodes | raea
tier: full
style_fit: Lets a brand mark and its text live independently on the hero (move/rotate the symbol without touching the text); one accent colour on the symbol fits the single-accent rule.
---

## METADATA
04_Shading_Lighting | Blender 4.3 | Shader nodes + raea

## CREATIVE_INTENT
Two images on one label: the text on UV map 1 and a decorative symbol on UV map 2 (rotatable 90° freely). A Multiply by the
inverted text cuts the text out of the symbol so the text always sits on top; the cleaned symbol then drives a colour mix and a
subtle embossed bump.

## STE_PROCEDURE
1. Understand the mask rule first: Mix Color (Multiply, Factor 1) of an image × a black/white mask removes everything where the mask is black (author demos it on a sphere with a Gradient Texture).
2. Add a UV Map node set to "UVMap" and plug it into the text Image Texture Vector (nothing should change).
3. Object Data › UV Maps › `+` to add "UVMap.001"; click its camera icon to make it active for render/editing.
4. Add a second UV Map node set to "UVMap.001" → Vector of the symbol Image Texture.
5. In Edit Mode, with UVMap.001 active, unwrap; in the UV Editor rotate the symbol `R 90`, scale smaller and centre it (Image preview on to see it).
6. Before you combine, move the text off the seam using the Mapping node Location Y if it is cut at the seam.
7. Add Mix Color: Blend Multiply, Factor 1; A = symbol Color, B = Invert Color(text Color).
8. Add a second Mix Color: Blend Mix; Factor = the Multiply result (symbol without text); A = existing label colour (text layer); B = accent colour.
9. Drive B through Hue/Saturation/Value: Hue ~0.5 (blue), Saturation 1.63, Value 1.2.
10. Add Bump: Height = the Multiply result; Strength 0.25 (0.2–0.3); Normal → Principled Normal.

## AGENT_EXECUTION
- Blender (node links):
  - `UV Map("UVMap") [UV] -> Image Texture(text) [Vector]`
  - `UV Map("UVMap.001") [UV] -> Image Texture(symbol) [Vector]`
  - `Image Texture(text) [Color] -> Invert Color [Color]` (Fac 1)
  - `Image Texture(symbol) [Color] -> Mix(RGBA, MULTIPLY, Fac 1) [A]`; `Invert Color [Color] -> Mix(MULTIPLY) [B]`
  - `Mix(MULTIPLY) [Result] -> Mix(RGBA, MIX) [Factor]`; `Image Texture(text) [Color] -> Mix(MIX) [A]`
  - `RGB(#accent) [Color] -> Hue/Saturation/Value [Color]` (Hue 0.5, Sat 1.63, Val 1.2) `-> Mix(MIX) [B]`
  - `Mix(MIX) [Result] -> Principled BSDF [Base Color]`
  - `Mix(MULTIPLY) [Result] -> Bump [Height]` (Strength 0.25) `-> Principled BSDF [Normal]`
```python
nt = mat.node_tree; N = nt.nodes; L = nt.links
ob.data.uv_layers.new(name="UVMap.001"); ob.data.uv_layers["UVMap.001"].active_render = True
mul = N.new("ShaderNodeMix"); mul.data_type = 'RGBA'; mul.blend_type = 'MULTIPLY'; mul.inputs[0].default_value = 1
mix = N.new("ShaderNodeMix"); mix.data_type = 'RGBA'; mix.blend_type = 'MIX'
hsv = N.new("ShaderNodeHueSaturation"); hsv.inputs["Hue"].default_value = 0.5
hsv.inputs["Saturation"].default_value = 1.63; hsv.inputs["Value"].default_value = 1.2
bump = N.new("ShaderNodeBump"); bump.inputs["Strength"].default_value = 0.25
inv = N.new("ShaderNodeInvert")
L.new(inv.outputs["Color"], mul.inputs[7]); L.new(mul.outputs[2], mix.inputs[0]); L.new(hsv.outputs[0], mix.inputs[7])
L.new(mix.outputs[2], bsdf.inputs["Base Color"]); L.new(mul.outputs[2], bump.inputs["Height"]); L.new(bump.outputs[0], bsdf.inputs["Normal"])
```
- raea: procedural node graphs don't export to glTF. Bake the combined Base Color (and the bump as a normal map) to one image
  in Blender (`bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'})` / `type='NORMAL'`) and use it as
  `base_color_texture` / `normal_map_texture`; or compose the label PNG outside Blender. For a symbol that must move on a
  word, use `<Decal src={staticFile("symbol.png")} position normal size spin opacity />` over the can instead of UV 2.

## NOTES
- Deprecated: "mix color node" = 4.x Mix node (data type Color); legacy MixRGB still loads. The author's "Ctrl+0" to create a
  mix between two BSDFs is a custom/Node Wrangler shortcut — visual gap.
- Visual gaps: which exact output feeds Mix A ("we've already assigned a point A") is inferred as the text layer colour `~`;
  symbol placement in UV space is by eye.
- Rule conflicts: none; keep the accent on the subject only (one accent colour).
