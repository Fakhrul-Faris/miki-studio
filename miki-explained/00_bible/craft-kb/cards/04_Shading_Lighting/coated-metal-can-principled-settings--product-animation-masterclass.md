---
title: Printed metal can surface — Principled metallic + anisotropy + coat (and roughness 1 on white print)
bucket: 04_Shading_Lighting
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "24:28–26:55, 53:20–53:52"
blender_version_source: 4.3
tool_target: Shader nodes | raea
tier: full
style_fit: Real-surface finish for a macro hero; the coat gives the soft long highlight a single top light rakes across.
---

## METADATA
04_Shading_Lighting | Blender 4.3 | Shader nodes + raea StandardMaterial

## CREATIVE_INTENT
Lacquered aluminium can: metal base, a clear coat for the glossy paint layer, anisotropy for stretched highlights. Keep the
printed white letters matte so reflections don't grey them out — legibility beats shine.

## STE_PROCEDURE
1. On the label's Principled BSDF set Metallic 1.
2. Set Roughness 0.52.
3. Set Specular IOR Level 0.72.
4. Set Specular › Anisotropic 1 (visible only in Cycles; check with an Area light close to the can).
5. Set Coat Weight 1, then lower Coat Roughness to 0.15 (0.18–0.2 also fine) so the area light is not mirrored crisply.
6. Before final render, if white text reads dark/grey, set the text-layer BSDF Roughness to 1 (author's later fix).

## AGENT_EXECUTION
- Blender:
```python
b = mat.node_tree.nodes["Principled BSDF"]
b.inputs["Metallic"].default_value = 1.0
b.inputs["Roughness"].default_value = 0.52
b.inputs["Specular IOR Level"].default_value = 0.72
b.inputs["Anisotropic"].default_value = 1.0
b.inputs["Coat Weight"].default_value = 1.0
b.inputs["Coat Roughness"].default_value = 0.15
```
  Nodes: `Image Texture [Color] -> Principled BSDF [Base Color]`; `Principled BSDF [BSDF] -> Material Output [Surface]`.
- raea:
```tsx
<Model src={staticFile("can.glb")}>
  <StandardMaterial material="text body" metallic={1} perceptual_roughness={0.52} clearcoat={1}
    clearcoat_perceptual_roughness={0.15} reflectance={0.72} />   {/* reflectance ~ maps Specular IOR Level */}
</Model>
<Environment src={staticFile("studio_1k.hdr")} intensity={0.6} />   {/* metal needs something to reflect (materials.md) */}
```
  Anisotropy: raea no equivalent documented (StandardMaterial field list has none) — fake stretched highlights with a long
  thin `RectLight`. Coat exports via glTF KHR_materials_clearcoat.

## NOTES
- Deprecated: video says "specular" (pre-4.0 "Specular") → 4.x "Specular IOR Level"; "clear coat" → "Coat Weight"/"Coat Roughness".
- Visual gaps: none for values; the author's "15" means 0.15.
- Rule conflicts: none. In raea a fully metallic can without an `<Environment>` goes dark (materials.md) — add one or drop
  metallic to ~0.6.
