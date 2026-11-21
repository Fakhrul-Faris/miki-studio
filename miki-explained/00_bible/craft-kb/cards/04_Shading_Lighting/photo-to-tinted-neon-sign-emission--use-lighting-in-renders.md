---
title: Any photo → RGB Curves (blow out) → Hue/Saturation Value socket → single-colour neon emission
bucket: 04_Shading_Lighting
source: "How To Use Lighting In Your Renders  Blender Tutorial.txt"
source_time: "07:43–09:08"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: Gives a sign/screen glow in exactly one brand accent colour from any texture — fits "one saturated accent".
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes (bake to emissive texture) → raea emissive_texture + Bloom

## CREATIVE_INTENT
Neon signs with real, irregular detail come cheap from random photos: the photo supplies the bright/dark pattern, the node chain forces one chosen colour, high strength makes it glow.

## STE_PROCEDURE
1. Add emissive planes for the sign.
2. Add an Image Texture with any photo.
3. Link Image [Color] → RGB Curves; lift the curve to brighten for a blown-out look.
4. Link RGB Curves [Color] → Hue/Saturation/Value [Value] (not [Color]).
5. Set the Hue/Saturation/Value [Color] input to the sign colour; Value now decides bright vs dark parts.
6. Link Hue/Saturation/Value [Color] → Principled BSDF [Emission Color]; set Emission Strength high (video: 66 on the main sign).

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials.new("NeonRed"); m.use_nodes = True; N, L = m.node_tree.nodes, m.node_tree.links
b = N["Principled BSDF"]; img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//media/photo.jpg")
cv = N.new("ShaderNodeRGBCurve"); cv.mapping.curves[3].points[1].location = (0.6, 1.0)   # ~ brighten (C curve)
hsv = N.new("ShaderNodeHueSaturation"); hsv.inputs["Color"].default_value = (1, 0.05, 0.05, 1)
L.new(img.outputs["Color"], cv.inputs["Color"]); L.new(cv.outputs["Color"], hsv.inputs["Value"])
L.new(hsv.outputs["Color"], b.inputs["Emission Color"]); b.inputs["Emission Strength"].default_value = 66
```
Links: `Image [Color] -> RGB Curves [Color] -> Hue/Saturation/Value [Value]`; `Hue/Saturation/Value [Color] -> Principled BSDF [Emission Color]`.
raea: bake the tinted result to a PNG (Cycles bake, Emit pass) and use it as `emissive_texture={staticFile("sign_emit.png")}` with `emissive={LinearRgba.from(Srgba.hex("#ffffff")).mul(6)}` (~ the multiplier scales the map; verify on a still) plus `<Bloom intensity={1} threshold={0.9} />`. Add a `<PointLight>` at the sign if it should light its surroundings (emissive doesn’t light neighbours).

## NOTES
- Deprecated: "Emission" → "Emission Color" (4.0).
- Visual gaps: exact curve shape shown only.
- Rule conflicts: none; brand accent hex from the kit.

