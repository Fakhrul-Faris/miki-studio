---
title: Keep colours desaturated in 3D, push saturation in the grade
bucket: 05_Camera_Raea_Pipeline
source: "How to get nice colors in your renders.txt"
source_time: "08:33–12:50, 19:30–19:57"
blender_version_source: 3.x (Mix node Multiply)
tool_target: raea
tier: full
style_fit: Leaves headroom so the brand accent can be pushed in raea's <Grade>/tone map without clipping; base materials stay calm.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x | Shader nodes (tint) + raea grade

## CREATIVE_INTENT
Use as the default colour workflow: set colours fairly desaturated in the 3D scene and add saturation (and hue tweaks) at the
grade. Starting oversaturated leaves no room and hides texture detail; starting muted lets the grade bring out texture and colour.

## STE_PROCEDURE
1. Before you colour a texture, link Image [Color] → Mix (Color, Multiply) [A]; set [B] to the tint colour.
2. For a gradient-coloured surface: image → black-and-white → Color Ramp with the chosen colours.
3. Remember the colour picker's Saturation slider is non-linear: 0.9–0.95 still renders moderately saturated.
4. Keep the 3D render visibly less saturated than the target.
5. In the grade, raise saturation globally (author: + Hue/Saturation +24 on top).
6. Shift individual hues in the grade (red → pink, blue → cyan-green) rather than in 3D.
7. Compare 3D vs graded output each pass.

## AGENT_EXECUTION
### Blender (tint)
```python
mix = N.new("ShaderNodeMix"); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'; mix.inputs[0].default_value = 1
nt.links.new(img.outputs["Color"], mix.inputs[6])          # A = image
mix.inputs[7].default_value = (0.9, 0.45, 0.6, 1)           # B = muted pink ~
nt.links.new(mix.outputs[2], bsdf.inputs["Base Color"])
```
Gradient variant: `Image [Color] -> RGB to BW [Val] -> Color Ramp [Fac] -> Base Color`.

### raea
- Materials: muted `base_color` hexes; the accent may be stronger but not maxed.
- Grade (one per piece, first frame's values hold): `<Grade saturation={1.15} midtones={{ saturation: 1.1 }} />` (~).
- Tone map: `<ToneMapping mode="tony" />` holds colour (default); `"aces"` can muddy brand colours (post.md) — check a still against the kit.
- Per-hue shifts: no per-hue mixer in `<Grade>`; change the hue in the material hex instead.

## NOTES
- Deprecated: "Mix RGB" → Mix node (Data Type Color, Blend Multiply), 3.4+; Photoshop stands in for raea's grade.
- Visual gaps: exact HSV picker values (0.948, ~0.8–0.9) are read from screen; Photoshop slider values not spoken.
- Rule conflicts: none.
