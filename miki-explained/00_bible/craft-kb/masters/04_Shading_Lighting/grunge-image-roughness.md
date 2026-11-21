---
title: Grunge/imperfection image into roughness
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/grunge-image-roughness-ramp--industrial-scene.md
  - cards/04_Shading_Lighting/image-imperfections-into-coat-roughness--pro-materials.md
  - cards/04_Shading_Lighting/single-photo-grunge-material--crazy-renders-geo-nodes.md
sources: ["Making an Industrial Scene in Blender.txt", "How to Create PRO Materials in Blender.txt", "How To Make Crazy Renders With Easy Geometry Nodes.txt"]
use_when: "wear and fingerprints on a macro surface"
style_fit: "Fingerprints/scratches are what a macro lens and a raking top light reveal (hero gain). A single non-PBR photo is for out-of-focus background pieces only; the hero uses a full PBR set (RECIPE-D material pass). Bake ramps to a roughness map for raea."
---

## METADATA
04_Shading_Lighting | Blender 3.x–4.2+ → 5.x | Shader nodes → baked maps → raea StandardMaterial

## CREATIVE_INTENT
A greyscale grunge or imperfection image driving roughness makes dirty/touched parts matte and the rest shiny, so a
surface feels used under a strong light — the cheapest realism gain on gloss.
- Industrial scene adds: the same concrete photo in Base Color and (via Color Ramp) Roughness; one such material covers
  ~90% of a set and still looks varied; lower Specular a little; skip extra AO/curves nodes ("basically nothing").
- PRO materials adds: seamless scratch/fingerprint maps (Non-Color); on coated finishes (car paint, phone glass) they go
  into Coat Roughness, not base Roughness; remap with Map Range to a believable range.
- Crazy renders adds: apply scale, Cube Projection UVs for scattered kit pieces; non-PBR photo for secondary dressing
  where speed beats fidelity; bevel the piece.

## STE_PROCEDURE
1. Before you unwrap, apply scale (Ctrl+A › Scale).
2. In Edit Mode select all and run UV › Cube Projection; move/scale islands roughly.
3. Load the texture in an Image Texture node: a grunge photo (concrete) or a seamless scratch/fingerprint map.
4. Set the Image Texture to Non-Color when it is used as data (roughness only).
5. For a photo material, link Image [Color] → Principled BSDF [Base Color].
6. Link Image [Color] → Color Ramp [Fac] (or Map Range [Value]) to remap it.
7. Uncoated surface: link the remapped output → Principled BSDF [Roughness].
8. Coated surface (car paint, phone glass): link it → Principled BSDF [Coat Roughness] instead.
9. Move the ramp stops / Map Range To Min–Max until shiny and matte areas sit where you want, inside a believable range.
10. Lower Specular IOR Level a little so highlights aren't too intense.
11. Skip extra AO/curves nodes; they add almost nothing.
12. Before GLB export, bake the remapped roughness to a Non-Color greyscale image (glTF carries no Color Ramp).
13. Assign base colour + roughness maps on a raea StandardMaterial with `perceptual_roughness={1}`.

## VALUES BY SOURCE
| parameter | Industrial scene | PRO materials | Crazy renders | recommended for Style D (+ why) |
|---|---|---|---|---|
| Texture | concrete grunge photo (textures.com) | seamless scratches/fingerprints (Realistic Touch, paid) | concrete photo, non-PBR (textures.com) | Poly Haven / CC0 imperfection maps (log in ASSET-SOURCES.md) |
| Remap | Color Ramp stops ~0.2 / 0.7 | Map Range To Min ~0.03, To Max ~0.3 | Color Ramp (stops visual only) | Map Range 0.03–0.3 on gloss heroes; ramp on concrete |
| Target socket | Roughness | Coat Roughness (coated) / Roughness | Roughness | Roughness (raea has no coat-roughness map) |
| Specular | IOR Level ~0.35 ("down a little") | — | — | raea `reflectance` ~0.4 |
| Scope | ~90% of set objects | hero finishes | background kit pieces | hero: imperfection map on PBR set; background: photo grunge |
| raea | bake ROUGHNESS → map | map as roughness; coat: bake merged, clearcoat ~0.3 | bake → map, metallic 0 | `metallic_roughness_texture` + `perceptual_roughness={1}` |

## AGENT_EXECUTION
Blender:
```python
import bpy
ob = bpy.context.active_object
bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.uv.cube_project(cube_size=1.0); bpy.ops.object.mode_set(mode='OBJECT')          # ~
m = bpy.data.materials.new("Grunge"); m.use_nodes = True; ob.data.materials.append(m)
N, L = m.node_tree.nodes, m.node_tree.links; bsdf = N["Principled BSDF"]

# A: photo grunge → base colour + ramped roughness (industrial / crazy renders)
img = N.new('ShaderNodeTexImage'); img.image = bpy.data.images.load("//tex/concrete_grunge.jpg")
ramp = N.new('ShaderNodeValToRGB')
ramp.color_ramp.elements[0].position = 0.2; ramp.color_ramp.elements[1].position = 0.7   # ~ dial by eye
L.new(img.outputs['Color'], bsdf.inputs['Base Color'])
L.new(img.outputs['Color'], ramp.inputs['Fac'])
L.new(ramp.outputs['Color'], bsdf.inputs['Roughness'])
bsdf.inputs['Specular IOR Level'].default_value = 0.35                                  # ~

# B: imperfection map → Map Range → (Coat) Roughness (PRO materials)
sc = N.new("ShaderNodeTexImage"); sc.image = bpy.data.images.load("//tex/scratches_seamless.jpg")
sc.image.colorspace_settings.name = "Non-Color"
mr = N.new("ShaderNodeMapRange"); mr.inputs["To Min"].default_value = 0.03; mr.inputs["To Max"].default_value = 0.3  # ~
L.new(sc.outputs["Color"], mr.inputs["Value"])
L.new(mr.outputs["Result"], bsdf.inputs["Coat Roughness"])   # uncoated: bsdf.inputs["Roughness"]

# bake the roughness for raea (Cycles used only as the baker)
bpy.context.scene.render.engine = 'CYCLES'
bpy.ops.object.bake(type='ROUGHNESS')   # into a selected Non-Color Image Texture node; save as grunge_rough.png
```
Links: `Image [Color] -> Principled [Base Color]`; `Image [Color] -> Color Ramp [Fac]`; `Color Ramp [Color] -> Principled
[Roughness]`; coated variant `Image(Non-Color) [Color] -> Map Range [Value]`, `Map Range [Result] -> Principled [Coat Roughness]`.

raea:
```tsx
<StandardMaterial base_color_texture={staticFile("concrete_grunge.jpg")}
  metallic_roughness_texture={staticFile("grunge_rough.png")} perceptual_roughness={1} metallic={0} reflectance={0.4} />
```
- Bevy reads roughness from the green channel; `perceptual_roughness={1}` so the map isn't halved (materials.md).
- `reflectance` (0.5 default) is the nearest dial to lowering Specular (`~`).
- Coated finish: raea: no equivalent for a per-pixel coat-roughness map (`clearcoat_perceptual_roughness` is a factor
  only) — bake the scratches into the base roughness map and keep `clearcoat` low (~0.3), or drop clearcoat.
- Painted metal alternative without a bake: `<ExtendedMaterial base={<StandardMaterial .../>} extension={<WearExtension amount={0.6} />} />`.

## NOTES
- Deprecated: Principled v1 "Specular" → 4.x "Specular IOR Level" (0.5 default); "Clearcoat Roughness" → "Coat Roughness".
- Sources: textures.com needs a licence check and Realistic Touch is paid — prefer Poly Haven / CC0 and log in ASSET-SOURCES.md.
- Not PBR: a photo's baked lighting can fight the one soft top light; photo grunge only on out-of-focus background pieces.
- Industrial triage mentioned a weight-painted vertex-group shader mask; not in that transcript — not carded.
- Visual gaps: ramp positions, specular value, bevel width are on screen only.
- Rule conflicts: none.
