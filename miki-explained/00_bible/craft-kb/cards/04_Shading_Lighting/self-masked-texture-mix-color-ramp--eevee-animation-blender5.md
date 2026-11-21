---
title: Blend two texture maps using one image as its own mix mask (Color Ramp crunch)
bucket: 04_Shading_Lighting
source: "Creating an Animation in Eevee (Blender 5.0).txt"
source_time: "01:54–02:56, 07:24–08:06"
blender_version_source: 5.0
tool_target: Shader nodes
tier: full
style_fit: good — breaks up a single scanned surface (the real surface under the macro object) without tiling repeats; bake before raea
---

## METADATA
04_Shading_Lighting | Blender 5.0 | Shader nodes (+ bake) + raea

## CREATIVE_INTENT
One texture set on everything reads flat and repetitive. Mix in a second photo texture (another rock set, a tile/concrete photo) where the image's own light and dark areas decide where the second texture shows, and crunch the mask with a Color Ramp so the blend has clear patches instead of mush.

## STE_PROCEDURE
1. Apply texture set A (base colour, roughness, normal; the video uses a 4K rock set) to all set pieces.
2. Select the other objects, then the textured one, and run Link/Transfer Data > Link Materials (Ctrl+L).
3. Copy texture B's Base Color Image Texture node into material A.
4. Add a Mix node (Data Type Color, Blend Mix).
5. Connect A's colour to Mix [A] and B's colour to Mix [B].
6. Connect a greyscale of one of the images to a Color Ramp, then the Color Ramp to Mix [Factor].
7. Pull the Color Ramp stops together to crunch the mask (hard-edged patches).
8. Before you UV a new cylinder/ring piece, unwrap it with Follow Active Quads so the photo flows around it.

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials["Rock"]; nt = m.node_tree; N, L = nt.nodes, nt.links
bsdf = N["Principled BSDF"]
texA = N["Image Texture"]                                    # existing base colour
texB = N.new("ShaderNodeTexImage"); texB.image = bpy.data.images.load("//tex/tiles_diff.jpg")
texB.projection = texA.projection
mix  = N.new("ShaderNodeMix"); mix.data_type = 'RGBA'; mix.blend_type = 'MIX'
ramp = N.new("ShaderNodeValToRGB")
ramp.color_ramp.elements[0].position = 0.45; ramp.color_ramp.elements[1].position = 0.55   # ~ "crunch"
L.new(texA.outputs["Color"], ramp.inputs["Fac"])             # image drives its own mask
L.new(ramp.outputs["Color"], mix.inputs[0])                  # Factor (Float) takes the ramp's value
L.new(texA.outputs["Color"], mix.inputs[6])                  # A (Color)
L.new(texB.outputs["Color"], mix.inputs[7])                  # B (Color)
L.new(mix.outputs[2], bsdf.inputs["Base Color"])             # Result (Color)
# link material to the selection:  bpy.ops.object.make_links_data(type='MATERIAL')
# ring piece UVs: bpy.ops.uv.follow_active_quads(mode='LENGTH_AVERAGE')
```
Node links: `ImageA [Color] -> Color Ramp [Fac]`, `Color Ramp [Color] -> Mix [Factor]`, `ImageA [Color] -> Mix [A]`, `ImageB [Color] -> Mix [B]`, `Mix [Result] -> Principled BSDF [Base Color]`. Which image fed the factor is ambiguous ("using itself"); A is the inferred choice.

raea: no procedural node graph. Bake the mixed Base Color (Cycles bake, type DIFFUSE, Color only, or Emit with the mix routed to Emission) to an image and give it as `base_color_texture={staticFile("rock_mix.png")}`; keep the original `_nor_gl` / `_rough` as `normal_map_texture` / `metallic_roughness_texture` with `perceptual_roughness={1}`.

## NOTES
- Deprecated: MixRGB → Mix node (Data Type Color); socket indices 6/7/2 are the Color variants in 3.4+.
- Visual gaps: which image drives the factor and the ramp stop positions are not spoken (`~`). An ambient-occlusion tweak is mentioned ("doing some occlusion") but not shown.
- Rule conflicts: none. Keep the surface low-saturation so the single accent stays the only saturated colour.
