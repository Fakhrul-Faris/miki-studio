---
title: Image-texture scratches/fingerprints into Roughness — or Coat Roughness for coated finishes
bucket: 04_Shading_Lighting
source: "How to Create PRO Materials in Blender.txt"
source_time: "08:13–09:32"
blender_version_source: 4.x
tool_target: Shader nodes
tier: full
style_fit: Fingerprints and fine scratches are exactly what a macro lens and a raking top light reveal; strong realism gain for the hero object.
---

## METADATA
04_Shading_Lighting | 4.2+ | Shader nodes → raea metallic_roughness_texture (baked/packed)

## CREATIVE_INTENT
Procedural materials are light and distortion-free, but scratches and fingerprints are easier from photographed seamless textures. On a coated finish the marks belong on the coat, not under it, so they go into Coat Roughness.

## STE_PROCEDURE
1. Load a seamless imperfection texture (scratches or fingerprints) in an Image Texture node.
2. Uncoated material: link Image Texture [Color] → Principled BSDF [Roughness].
3. Coated material (car paint, phone glass): link it to [Coat Roughness] instead, so only the top layer changes.
4. Remap with Color Ramp / Map Range so values stay inside a believable range (see the remap card).

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials["CarPaint"]; N, L = m.node_tree.nodes, m.node_tree.links
img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//tex/scratches_seamless.jpg")
img.image.colorspace_settings.name = "Non-Color"
mr = N.new("ShaderNodeMapRange"); mr.inputs["To Min"].default_value = 0.03; mr.inputs["To Max"].default_value = 0.3  # ~
L.new(img.outputs["Color"], mr.inputs["Value"])
L.new(mr.outputs["Result"], N["Principled BSDF"].inputs["Coat Roughness"])
```
Links: `Image Texture(scratches, Non-Color) [Color] -> Map Range [Value]`; `Map Range [Result] -> Principled BSDF [Coat Roughness]`.

raea: StandardMaterial has `clearcoat_perceptual_roughness` as a factor only (no coat-roughness map prop in the skill). Options: (a) for an uncoated surface, the greyscale scratch map as `metallic_roughness_texture` with `perceptual_roughness={1}`; (b) for a coated surface, raea: no equivalent for a per-pixel coat-roughness map — bake the base roughness map with the scratches merged in and keep `clearcoat` low (~0.3), or drop clearcoat.

## NOTES
- Image texture must be Non-Color when used as data.
- The "Realistic Touch" add-on (200+ imperfection maps) is paid; any CC0 imperfection set works (log it in ASSET-SOURCES.md).
- Rule conflicts: none.
