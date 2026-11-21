---
title: Use finished library textures; adjust only value, roughness and normal strength
bucket: 04_Shading_Lighting
source: "How To Create Beautiful Environments In Blender.txt"
source_time: "07:03–08:24"
blender_version_source: n/a
tool_target: Shader nodes | raea
tier: principle
style_fit: Fits Style D for mid/background surfaces; the macro hero object needs more (edge wear, grunge mixes), which the video itself flags.
---

## METADATA
04_Shading_Lighting | n/a → 4.2+ | Shader nodes + raea StandardMaterial

## CREATIVE_INTENT
Principle: for environment work, download finished PBR textures (ambientCG 4K) and only tweak them: darker here, roughness a touch, normal map turned down. Close-up hero models are the exception: they need mixed textures, edge wear and intricate grunge.
Ideas: dress the floor and wall from a library set in minutes; save the deep material work for the macro hero.

## STE_PROCEDURE
1. Download a PBR set (base colour, roughness, normal; 1k–4k).
2. Set up the material once: albedo → Base Color, roughness (Non-Color) → Roughness, normal (Non-Color) → Normal Map → Normal.
3. If the surface is too bright, darken the base colour (Hue/Saturation/Value, Value ~0.8).
4. If reflections look wrong, remap roughness with Map Range.
5. If the relief looks fake, lower Normal Map Strength (~0.5–0.8).
6. Before calling a macro hero done, add edge wear / grunge mixes; never stop at the raw texture.

## AGENT_EXECUTION
### Shader nodes
- `Image Texture (albedo) [Color] -> Hue/Saturation/Value [Color]` (Value ~0.8) `-> Principled BSDF [Base Color]`
- `Image Texture (rough, Non-Color) [Color] -> Map Range [Value]` (To Min ~0.1, To Max ~0.9) `-> Principled BSDF [Roughness]`
- `Image Texture (normal, Non-Color) [Color] -> Normal Map [Color]` (Strength ~0.6) `-> Principled BSDF [Normal]`
### raea translation
On a raea mesh (materials.md) Bevy multiplies each map by its factor, so the tweaks are the factors:
```tsx
<StandardMaterial
  base_color="#cccccc"                         // ≈ Value 0.8: darkens the albedo map
  base_color_texture={staticFile("wall_diff_1k.jpg")}
  metallic_roughness_texture={staticFile("wall_rough_1k.jpg")}
  perceptual_roughness={0.8}                    // 1 = map as is; lower = glossier
  normal_map_texture={staticFile("wall_nor_gl_1k.jpg")}
  uv_transform={Affine2.fromScale([3, 3])} />
```
Normal strength: raea has no equivalent prop (no normal-scale factor listed in materials.md); bake a weaker normal map in Blender or pick a softer set. On a GLB, bake the tweaks into the exported maps.

## NOTES
- Deprecated: MixRGB → Mix node (Color) when mixing textures.
- Visual gaps: none.
- Rule conflicts: none. Our macro hero needs the "intricate" path the video mentions, not a slapped-on texture (test-stills-too-basic lesson).
