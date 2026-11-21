---
title: Colourway variants — Mix Color with the label's alpha image as Factor (new colour in A, art stays white)
bucket: 04_Shading_Lighting
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "41:52–42:55, 2:04:23–2:06:52, 2:38:32–2:40:28"
blender_version_source: 4.3
tool_target: Shader nodes | raea
tier: full
style_fit: Supports "object changes state on the word" (a colour swap as a state change); keep to one saturated accent per beat.
---

## METADATA
04_Shading_Lighting | Blender 4.3 | Shader nodes + raea

## CREATIVE_INTENT
Recolour the same product (black → orange → blue → green) while the white print stays white, by using the label's own
black/white image as the mask. The same animation is then rendered once per colour and cut together on the music (see the
colour-stack edit card), or neighbouring copies get different colours.

## STE_PROCEDURE
1. Before you edit, make the material single-user (copy) so other objects keep their colour.
2. Insert Mix Color between the label Image Texture and the (bottom) Principled BSDF Base Color.
3. Plug the same alpha/label image into the Mix Factor — a plain Mix tints the blacks into a muddy darker colour.
4. Put the label image into B and the new colour into A, so white artwork shows the image (white) and black areas take the new colour.
5. Set the new colour by hex (pick from a palette tool; see the tetradic palette card).
6. If any secondary mark is still tinted (e.g. a blue symbol), set its Hue/Saturation/Value Value 1 and Saturation 0 to make it white.
7. Save each colourway render into its own folder (e.g. "green color rotation animation").

## AGENT_EXECUTION
- Blender (links): `Image Texture(label) [Color] -> Mix(RGBA, MIX) [Factor]`; `Image Texture(label) [Color] -> Mix [B]`;
  `RGB(#2fbf71) -> Mix [A]`; `Mix [Result] -> Principled BSDF [Base Color]`.
```python
m = N.new("ShaderNodeMix"); m.data_type = 'RGBA'; m.blend_type = 'MIX'
L.new(img.outputs["Color"], m.inputs[0]); L.new(img.outputs["Color"], m.inputs[7])
m.inputs[6].default_value = (0.03, 0.5, 0.18, 1)   # A = new can colour (linear)
L.new(m.outputs[2], bsdf.inputs["Base Color"])
for name, rgba in {"green": (...), "orange": (...)}.items():          # one render per colourway
    m.inputs[6].default_value = rgba
    bpy.context.scene.render.filepath = f"//renders/{name}/"
    bpy.ops.render.render(animation=True)
```
- raea: no re-render needed — animate the colour on the material: bake/keep a white-art label texture and set
  `<StandardMaterial material="text body" base_color_texture={staticFile("label_whiteart.png")} animate={{ base_color: track({ 0: "#111111", 18: "#ff7a1a" }, "in-out-cubic") }} />`
  (`base_color` tints the map; white art stays white only if the art is in a separate texture — otherwise swap pre-coloured
  label PNGs per segment with a `<Sequence>`). Colour fades blend in Oklab.

## NOTES
- Deprecated: Mix Color = 4.x Mix node (Color); "HSB value" is the Hue/Saturation/Value node.
- Visual gaps: which slot is A vs B is stated ("plug it into B instead of A"); hex values are not given.
- Rule conflicts: Style D allows one saturated accent only on the subject of the line; a colour change must be a ~0.4 s eased
  fade, never a hard pop, unless it is hidden by a cut.
