---
title: Colour-rich base texture + coloured key light for "free" natural colour
bucket: 04_Shading_Lighting
source: "How to get nice colors in your renders.txt"
source_time: "12:50–15:16"
blender_version_source: 3.x
tool_target: raea
tier: full
style_fit: Exactly the Style D "real surface" rule — a photo-scanned surface (wood, stone, paper) under one coloured top light gives subtle unexpected tones instead of flat grey CG.
---

## METADATA
04_Shading_Lighting | Blender 3.x | raea materials + lights

## CREATIVE_INTENT
Use when a scene looks grey and dead: a texture whose albedo already holds many colours (greens, browns, beiges), lit by a
coloured key, produces natural, unexpected colour variation that a grade can then bring out — far better than painting colour
with many coloured lights.

## STE_PROCEDURE
1. Choose a PBR texture whose colour map has many hues (scanned stone, moss, aged wood).
2. Apply it to the large surfaces (walls, floor, the object's base).
3. Light with one coloured key (author: a red light).
4. Expect it to look greyish in the raw render.
5. Grade (saturation, clarity/contrast) to bring out the hidden colours.
6. Iterate render → grade → adjust texture/light.

## AGENT_EXECUTION
### raea
```tsx
<Mesh3d transform={Transform.fromXyz(0, -0.05, 0)}>
  <Cuboid half_size={[2, 0.05, 2]} />
  <StandardMaterial base_color_texture={staticFile("tex/mossy_stone_diff_1k.jpg")}
    normal_map_texture={staticFile("tex/mossy_stone_nor_gl_1k.jpg")}
    metallic_roughness_texture={staticFile("tex/mossy_stone_rough_1k.jpg")}
    perceptual_roughness={1} uv_transform={Affine2.fromScale([2, 2])} />
</Mesh3d>
<SpotLight color="#ff5a3c" intensity={2700000} outer_angle={0.45} inner_angle={0.22} shadow_maps_enabled transform={…} />
<Grade saturation={1.15} midtones={{ contrast: 1.05 }} />
```
Poly Haven CC0 1k sets; `perceptual_roughness={1}` so the roughness map reads as-is; log the asset in ASSET-SOURCES.md.

## NOTES
- Deprecated: none.
- Visual gaps: the exact texture is shown, not named.
- Rule conflicts: a red key may compete with the brand accent — pick the key hue as the base, not the accent.
