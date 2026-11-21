---
title: Colour-match library assets (Hue/Sat + Multiply)
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/color-match-asset-hue-sat-multiply--eevee-animation-blender5.md
  - cards/04_Shading_Lighting/colour-match-imported-assets-hue-saturation--serene-render.md
sources: ["Creating an Animation in Eevee (Blender 5.0).txt", "Making a SERENE render in blender.txt"]
use_when: "making a downloaded model sit in the episode palette"
style_fit: "Strong fit: fresh CC0 library assets per episode must share one palette so only the brand accent pops. Never multiply in the brand accent; bake the result before GLB export."
---

## METADATA
04_Shading_Lighting | Blender 4.x–5.0 → 5.x | Shader nodes + Blender bpy (bake) + raea

## CREATIVE_INTENT
Library assets (Poly Haven scans, Sketchfab scans, kits from different sources) arrive in their own colours and look
pasted in. Nudge each asset's hue and saturation toward the scene and multiply in a tone the scene already has, at low
strength, so every prop shares one cast and only the brand accent stands out.
- Eevee Blender 5.0 adds: the Hue/Sat → Mix Multiply chain with a bright, low-saturation scene tone; raise Factor
  slowly from 0 and keep it low.
- Serene render adds: shift Hue (not only Saturation) to fix the colour family; choose assets already close in colour;
  keep one colour family until balance works; bake before export.

## STE_PROCEDURE
1. Before placing an imported model, compare its colour with the surrounding materials in a render.
2. Prefer assets already close in colour family (brown trees with brown rocks); add a second family only later.
3. Open the asset's material; find the Image Texture feeding Principled BSDF [Base Color].
4. Insert a Hue/Saturation/Value node after it.
5. Shift Hue (0.5 = no shift) until the colour family matches.
6. Lower Saturation slightly if it still reads too saturated.
7. Add a Mix node (Data Type Color, Blend Multiply) after the Hue/Saturation/Value node.
8. Set Mix [B] to a scene colour sampled from the environment: full Value, low saturation (never the brand accent).
9. Raise Mix [Factor] slowly from 0 until the asset sits in the scene; keep it low.
10. Connect Mix [Result] to Principled BSDF [Base Color].
11. Before GLB export, bake the corrected colour into a new texture (export does not keep these nodes).

## VALUES BY SOURCE
| parameter | Eevee 5.0 | Serene render | recommended for Style D (+ why) |
|---|---|---|---|
| Hue | not used | ~0.48 (small shift from 0.5) | ~0.48–0.52 only if the family is off (small shifts keep the scan believable) |
| Saturation | ~0.85 ("slightly lower") | ~0.8 ("brought it down") | ~0.8–0.85 |
| Mix blend | Multiply | Multiply or Mix | Multiply (keeps the texture's value detail) |
| Mix Factor | ~0.25, "keep it low" | ~0.3 | ~0.2–0.3, start at 0 |
| Tone (B) | scene green, full Value, low sat (~0.55, 0.62, 0.50) | a scene colour | the room's neutral cast (warm grey for a dark Style D room) |
| Export | — | Bake DIFFUSE, Color pass only | Bake (raea gets a texture, not nodes) |

## AGENT_EXECUTION
Blender:
```python
import bpy
def color_match(mat_name, tone=(0.55, 0.62, 0.50, 1), hue=0.5, sat=0.85, fac=0.25):   # ~ values not spoken
    nt = bpy.data.materials[mat_name].node_tree; N, L = nt.nodes, nt.links
    bsdf = N["Principled BSDF"]
    src = bsdf.inputs["Base Color"].links[0].from_socket
    hsv = N.new("ShaderNodeHueSaturation")
    hsv.inputs["Hue"].default_value = hue                    # 0.5 = no shift; serene used ~0.48
    hsv.inputs["Saturation"].default_value = sat
    mix = N.new("ShaderNodeMix"); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'
    mix.inputs["Factor"].default_value = fac
    mix.inputs[7].default_value = tone                       # B (Color): scene tone, bright, low saturation
    L.new(src, hsv.inputs["Color"])
    L.new(hsv.outputs["Color"], mix.inputs[6])               # A (Color)
    L.new(mix.outputs[2], bsdf.inputs["Base Color"])         # Result (Color)

# bake before GLB export (Cycles is used only as the baker, never as the renderer)
bpy.context.scene.render.engine = 'CYCLES'
bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'})   # into a new Image Texture node selected as active
```
Links: `Image Texture [Color] -> Hue/Saturation/Value [Color] -> Mix(Multiply) [A]`; `scene tone -> Mix [B]`;
`Mix [Result] -> Principled BSDF [Base Color]`. Variant: Mix (Color, blend Mix, Factor ~0.3).

raea: StandardMaterial multiplies `base_color` by `base_color_texture`, so a tinted factor multiplies at render time:
`<StandardMaterial base_color_texture={staticFile("pot_diff.jpg")} base_color="#d6dccb" />` (light, low-saturation scene
tone; white = no change). For a `<Model>`, a `<StandardMaterial material="..." base_color="#...">` inside it changes only
the fields given and keeps the model's maps (materials.md). There is no hue/desaturate prop: bake in Blender or
pre-process the JPG. Whole-frame unification: `<Grade saturation temperature>` (first frame holds for the piece).

## NOTES
- Deprecated: MixRGB → Mix node (Data Type Color), 3.4+. Hue/Saturation/Value node unchanged.
- Visual gaps: exact Hue, Saturation, tone and Factor values are on screen only (`~`).
- Rule conflicts: none. Keep the multiply tone neutral to the scene cast — never the brand accent.
