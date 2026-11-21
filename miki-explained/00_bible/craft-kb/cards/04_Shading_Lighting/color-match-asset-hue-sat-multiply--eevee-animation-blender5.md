---
title: Colour-match a library asset to the scene (Hue/Saturation + Mix Multiply)
bucket: 04_Shading_Lighting
source: "Creating an Animation in Eevee (Blender 5.0).txt"
source_time: "08:06–10:44"
blender_version_source: 5.0
tool_target: Shader nodes
tier: full
style_fit: strong — makes Poly Haven / scanned props sit in one palette so only the brand accent stands out
---

## METADATA
04_Shading_Lighting | Blender 5.0 | Shader nodes + raea

## CREATIVE_INTENT
Library assets (Poly Haven scans, Sketchfab museum scans) arrive in their own colours and look pasted in. Desaturate the asset's colour map slightly and multiply in a tone that already exists in the scene, at low strength, so every prop shares the environment's cast.

## STE_PROCEDURE
1. Open the asset's material; find the Image Texture feeding Base Color.
2. Add a Hue/Saturation/Value node after it; lower Saturation slightly.
3. Add a Mix node (Data Type Color) after that; set Blend to Multiply.
4. Set Mix [B] to a colour sampled from the scene (e.g. its green), at full Value and low saturation.
5. Raise Mix [Factor] slowly from 0 until the asset sits in the scene; keep it low.
6. Connect the Mix Result to Base Color.

## AGENT_EXECUTION
```python
import bpy
def color_match(mat_name, tone=(0.55, 0.62, 0.50, 1), sat=0.85, fac=0.25):   # ~ values not given
    nt = bpy.data.materials[mat_name].node_tree; N, L = nt.nodes, nt.links
    bsdf = N["Principled BSDF"]
    src = bsdf.inputs["Base Color"].links[0].from_socket
    hsv = N.new("ShaderNodeHueSaturation"); hsv.inputs["Saturation"].default_value = sat
    mix = N.new("ShaderNodeMix"); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'
    mix.inputs["Factor"].default_value = fac
    mix.inputs[7].default_value = tone                        # B (Color): scene tone, bright, low saturation
    L.new(src, hsv.inputs["Color"])
    L.new(hsv.outputs["Color"], mix.inputs[6])                # A (Color)
    L.new(mix.outputs[2], bsdf.inputs["Base Color"])          # Result (Color)
```
Links: `Image [Color] -> Hue/Saturation/Value [Color] -> Mix(Multiply) [A]`; `scene tone -> Mix [B]`; `Mix [Result] -> Principled BSDF [Base Color]`.

raea: StandardMaterial multiplies `base_color` by `base_color_texture`, so a tinted factor does the multiply at render time without baking: `<StandardMaterial base_color_texture={staticFile("pot_diff.jpg")} base_color="#d6dccb" />` (a light, low-saturation scene tone; white = no change). For a `<Model>` re-cover its material inside the Model (materials.md). Desaturation itself has no prop — pre-process the JPG (or bake) if needed.

## NOTES
- Deprecated: MixRGB → Mix node (Color). Hue Saturation Value node unchanged.
- Visual gaps: the exact tone, saturation and factor values are not spoken (`~`).
- Rule conflicts: none. Keep the multiply tone neutral to the scene's cast — never the brand accent.
