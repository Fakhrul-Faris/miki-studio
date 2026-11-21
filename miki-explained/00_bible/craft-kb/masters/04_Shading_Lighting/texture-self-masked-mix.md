---
title: Blend textures with an image-derived (Color Ramp) mask
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/brightness-masked-texture-mix--cyber-japan-breakdown.md
  - cards/04_Shading_Lighting/self-masked-texture-mix-color-ramp--eevee-animation-blender5.md
sources: ["Cyber Japan Art Breakdown  Blender.txt", "Creating an Animation in Eevee (Blender 5.0).txt"]
use_when: "grunge or painted-wood variation on a surface"
style_fit: Gives the real surface under the macro object natural breakup without tiling repeats; raea has no node graph, so bake the mix to a map. Keep surfaces low-saturation; the "colour through a mask" (painted) variant may only carry the brand accent, only on what the line is about.
---

## METADATA
04_Shading_Lighting | 3.x–5.0 (source) → bpy 5.x shader nodes + bake → raea textures | Shader nodes, raea

## CREATIVE_INTENT
One texture set on everything reads flat and repetitive. Any greyscale-ish image (often one of the textures itself) can decide where two looks mix: bright pixels take one, dark the other, and a Color Ramp moves and crunches the threshold so the blend forms clear patches instead of mush.
- cyber-japan-breakdown: wood + concrete grime masked by the concrete's bright patches (both darkened through RGB Curves); painted-wood (wood + flat red/white masked by the wood's own grain, flip ramp to colour the darks); delete Poly Haven Displacement; optional roughness ramp.
- eevee-animation-blender5: rock set A + tile/concrete B masked by A itself, ramp stops pulled together (crunch); link materials across set pieces (Ctrl+L); Follow Active Quads on ring pieces.

## STE_PROCEDURE
1. Apply texture set A (base colour, roughness, normal; e.g. Poly Haven wood or a 4K rock set) to the object.
2. To share it, select the other objects then the textured one and run Link/Transfer Data › Link Materials (Ctrl+L).
3. Optionally darken A: Image A [Color] → RGB Curves (pull slightly down).
4. Add texture B's Base Color Image Texture (concrete, tiles, another rock) — also through RGB Curves if it needs darkening.
5. Add a Mix node (Data Type Color, Blend Mix); A → Mix [A], B → Mix [B].
6. Choose the mask image (A itself, or B) → Color Ramp → Mix [Factor].
7. Move the ramp stops so only the brightest patches mix in; pull them together to crunch hard-edged patches.
8. Mix [Result] → Principled BSDF [Base Color].
9. Optional: roughness map → Color Ramp → [Roughness] for more contrast; leave the normal map unchanged.
10. Painted variant: Mix [A] = darkened wood, [B] = flat colour (red/white); Factor = the wood image through a Color Ramp (brightest grain turns colour first; flip the ramp for the darks).
11. Before you render/bake, delete the Displacement link a Poly Haven material ships with.
12. Before UV-ing a new cylinder/ring piece, unwrap with Follow Active Quads so the photo flows round it.
13. Bake the mixed Base Color to an image for raea (Cycles, DIFFUSE, Color only).

## VALUES BY SOURCE
| parameter | cyber-japan-breakdown | eevee-animation-blender5 | recommended for Style D (+ why) |
|---|---|---|---|
| set A | Poly Haven wood (darkened via RGB Curves) | 4K rock set | the real surface's Poly Haven 1k–2k set |
| set B | Poly Haven concrete diff (darkened) | tiles / second rock diff | a worn/grime variant of the same family |
| mask source | concrete (B) image | A itself ("using itself", inferred) | whichever image has the patch scale you want |
| ramp stops | ~0.55 / ~0.7 (only brightest) | ~0.45 / ~0.55 (crunch) | tight stops for clear patches; tune on a still |
| painted colour | red `#B01818`~ or white | — | brand accent only if the line is about that surface; else white/neutral |
| extras | delete Displacement; roof concrete roughness slightly up | Ctrl+L link; Follow Active Quads | delete Displacement always (raea ignores it anyway) |
| raea | baked diff + nor_gl + rough; or WearExtension (amount 0.4, grime 0.5) | baked diff + original nor/rough, perceptual_roughness 1 | baked diff; WearExtension for quick grime |

## AGENT_EXECUTION
Shader nodes:
```
ImageA [Color] -> RGB Curves [Color] -> Mix(RGBA, MIX) [A]
ImageB [Color] -> RGB Curves(2) [Color] -> Mix [B]
ImageMask(A or B) [Color] -> Color Ramp [Factor] ; Color Ramp [Color] -> Mix [Factor]
Mix [Result] -> Principled BSDF [Base Color]
ImageA_rough [Color] -> Color Ramp(2) [Factor] -> Principled BSDF [Roughness]        (optional)
ImageA_nor [Color] -> Normal Map [Color] -> Principled BSDF [Normal]                   (unchanged)
remove: Displacement -> Material Output [Displacement]
Painted: RGB Curves(wood) -> Mix [A]; Mix [B] = #B01818~ ; ImageWood [Color] -> Color Ramp -> Mix [Factor]
```
Blender 5.x:
```python
import bpy
m = bpy.data.materials["Surface"]; N, L = m.node_tree.nodes, m.node_tree.links
bsdf = N["Principled BSDF"]
texA = N["Image Texture"]                                         # existing base colour
texB = N.new("ShaderNodeTexImage"); texB.image = bpy.data.images.load("//tex/concrete_diff.jpg")
texB.projection = texA.projection
mix = N.new("ShaderNodeMix"); mix.data_type = 'RGBA'; mix.blend_type = 'MIX'
ramp = N.new("ShaderNodeValToRGB")
ramp.color_ramp.elements[0].position = 0.45; ramp.color_ramp.elements[1].position = 0.55   # ~ crunch (0.55/0.7 = brightest only)
mask_src = texA                                                    # or texB
L.new(mask_src.outputs["Color"], ramp.inputs["Factor"])            # "Fac" before 5.x
L.new(ramp.outputs["Color"], mix.inputs[0])                        # Factor (float)
L.new(texA.outputs["Color"], mix.inputs[6])                        # A (RGBA)
L.new(texB.outputs["Color"], mix.inputs[7])                        # B (RGBA); painted: mix.inputs[7].default_value = (0.43, 0.02, 0.02, 1)
L.new(mix.outputs[2], bsdf.inputs["Base Color"])                   # Result (RGBA)
for l in [l for l in L if l.to_socket.name == 'Displacement']: L.remove(l)
# share material: bpy.ops.object.make_links_data(type='MATERIAL')
# ring UVs: bpy.ops.uv.follow_active_quads(mode='LENGTH_AVERAGE')

# bake for raea
sc = bpy.context.scene; sc.render.engine = 'CYCLES'
sc.render.bake.use_pass_direct = False; sc.render.bake.use_pass_indirect = False
# add an Image Texture node with a new image, make it the active node, then:
# bpy.ops.object.bake(type='DIFFUSE'); save as surface_mix_diff.jpg
```
raea (no node graph — use the baked map):
```tsx
<StandardMaterial base_color_texture={staticFile("surface_mix_diff.jpg")} normal_map_texture={staticFile("wood_nor_gl.jpg")}
  metallic_roughness_texture={staticFile("wood_rough.jpg")} perceptual_roughness={1} />
{/* procedural grime only: */}
<ExtendedMaterial base={<StandardMaterial base_color_texture={staticFile("wood_diff.jpg")} />}
  extension={<WearExtension amount={0.4} grime={0.5} />} />
```

## NOTES
- Deprecated: MixRGB → Mix node (Data Type Color; A/B/Result = inputs 6/7, output 2 in the Python API, 3.4+); Color Ramp input "Fac" → "Factor" (5.x).
- STT fixes: "color amp" = Color Ramp; "mixed color node" = Mix (Color).
- Visual gaps: curve shapes, ramp stop positions, and which image drives the factor in eevee-blender5 are not spoken (`~`); an AO tweak is mentioned ("doing some occlusion") but not shown.
- Rule conflicts: none; the coloured (painted) variant only in the brand accent and only on the line's subject; keep surfaces low-saturation. Log Poly Haven sets in ASSET-SOURCES.md.
