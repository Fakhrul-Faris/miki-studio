---
title: Brightness-masked texture mix (image → Color Ramp → Mix factor) for grunge and painted wood
bucket: 04_Shading_Lighting
source: "Cyber Japan Art Breakdown  Blender.txt"
source_time: "21:43–27:28"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: Gives a real surface (wood counter, worn paint) natural breakup; the "colour through a mask" variant is a clean way to put the one brand accent on a worn surface.
---

## METADATA
04_Shading_Lighting | 3.x source → 4.x nodes → raea (baked) | Shader nodes, raea

## CREATIVE_INTENT
Any greyscale-ish image can decide where two looks mix: bright pixels take one, dark the other, and a Color Ramp moves the
threshold. Used for grime (wood + concrete) and for painted wood (wood + flat red, masked by the wood's own grain).

## STE_PROCEDURE
1. Drop a Poly Haven wood material on the object (source uses the Poly Haven add-on → Asset Browser).
2. Darken the wood: Image (wood diff) → RGB Curves (pull the curve down slightly) → Base Color path.
3. Add a second Image Texture with a concrete diff map (copied from a Poly Haven concrete set), also through RGB Curves (darker).
4. Add a Mix node (Data Type Color, Blend Mix): wood → A, concrete → B.
5. Run the concrete image through a Color Ramp into the Mix Factor; move the ramp stops so only the brightest concrete patches mix in.
6. Leave the roughness map default except an optional Color Ramp for more contrast; leave the normal map unchanged.
7. Painted-wood variant: Mix A = darkened wood color, B = flat red (no input); Factor = the wood image itself through a Color Ramp — brightest grain turns red first; flip the ramp to colour the darks instead.
8. White-wood variant: same as step 7 with white instead of red.
9. Roof: Poly Haven concrete unchanged except Roughness slightly higher.
10. Before you render, delete the Displacement link the Poly Haven material ships with.
11. Assign materials to faces per the reference colour layout.

## AGENT_EXECUTION
### Shader nodes (4.x)
```
ImageTexture(wood_diff) [Color] -> RGBCurves [Color]                       (curve slightly down ~)
ImageTexture(concrete_diff) [Color] -> RGBCurves(2) [Color]
ImageTexture(concrete_diff) [Color] -> ColorRamp [Fac]   ; ColorRamp [Color] -> Mix(Color, MIX) [Factor]
RGBCurves [Color] -> Mix [A] ; RGBCurves(2) [Color] -> Mix [B]
Mix [Result] -> Principled BSDF [Base Color]
ImageTexture(wood_rough) [Color] -> ColorRamp(2) [Fac] -> Principled BSDF [Roughness]     (optional)
ImageTexture(wood_nor) [Color] -> Normal Map [Color] -> Principled BSDF [Normal]
(remove)  Displacement -> Material Output [Displacement]
Painted: RGBCurves(wood) -> Mix [A] ; Mix [B] = #B01818 (~ red) ; ImageTexture(wood) -> ColorRamp -> Mix [Factor]
```
```python
import bpy
nt = bpy.data.materials["wood_grime"].node_tree; N, L = nt.nodes, nt.links
mix = N.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'MIX'
ramp = N.new('ShaderNodeValToRGB'); ramp.color_ramp.elements[0].position = 0.55; ramp.color_ramp.elements[1].position = 0.7  # ~
L.new(N["concrete"].outputs['Color'], ramp.inputs['Fac']); L.new(ramp.outputs['Color'], mix.inputs['Factor'])
L.new(N["wood_curves"].outputs['Color'], mix.inputs[6]); L.new(N["concrete_curves"].outputs['Color'], mix.inputs[7])  # A, B (RGBA sockets)
L.new(mix.outputs[2], N["Principled BSDF"].inputs['Base Color'])
for l in [l for l in L if l.to_socket.name == 'Displacement']: L.remove(l)
```
- Bake for raea: `bpy.context.scene.render.engine = 'CYCLES'`; set `bake_type='DIFFUSE'` with only Color pass (`use_pass_direct=False, use_pass_indirect=False`) into a new image; `bpy.ops.object.bake(type='DIFFUSE')`; save as `*_diff_baked.jpg`.

### raea
- raea has no node graph: use the baked map. `<StandardMaterial base_color_texture={staticFile("wood_grime_diff.jpg")} normal_map_texture={staticFile("wood_nor_gl.jpg")} metallic_roughness_texture={staticFile("wood_rough.jpg")} perceptual_roughness={1} />`.
- Procedural alternative for grime only: `<ExtendedMaterial base={<StandardMaterial base_color_texture={...} />} extension={<WearExtension amount={0.4} grime={0.5} />} />`.

## NOTES
- Deprecated: MixRGB → Mix node (Data Type Color); its A/B sockets are inputs 6/7 in the 4.x Python API.
- Visual gaps: curve shapes and ramp stop positions are on screen only (`~`).
- Rule conflicts: none; for Style D the red variant should only be the brand accent and only on what the line is about.
- STT fix: "color amp" = Color Ramp; "mixed color node" = Mix (Color).
