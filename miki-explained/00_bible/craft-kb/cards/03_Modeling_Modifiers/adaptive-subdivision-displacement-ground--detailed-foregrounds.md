---
title: Displaced ground plane (subdivision + displacement map mixed with noise)
bucket: 03_Modeling_Modifiers
source: "How to get Detailed Foregrounds  Blender Tutorial.txt"
source_time: "02:49–03:19, 07:25–08:23"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Gives the macro surface under the hero real relief that a raking top light catches; must be baked into geometry (Displace modifier, applied) because raea has no render-time displacement and no Cycles.
---

## METADATA
03_Modeling_Modifiers | 3.x → 4.2+ | Blender bpy + Shader nodes (source) → Displace modifier (ours)

## CREATIVE_INTENT
A flat textured plane reads as a sticker under a close camera; a small amount of real displacement makes the terrain "a bit uneven" so light and shadow break across it. Keep it minimal — just enough unevenness to add a level of detail without competing with the hero.

## STE_PROCEDURE
1. Add a plane for the ground; subdivide it into square-ish faces (the author says he should have).
2. Source method: enable adaptive subdivision on the plane and drive Material Output [Displacement] from the texture's displacement map.
3. Mix the displacement map with a Noise Texture before it reaches the Displacement input.
4. Keep the displacement strength low: uneven terrain, not hills.
5. Our method (raea has no render-time displacement): before export, replace adaptive subdivision with a Subdivision Surface (Simple) + Displace modifier stack.
6. Before you apply the modifiers, check the displaced silhouette from the shot camera.
7. Apply both modifiers, then export the plane to GLB with the normal map still on its material.

## AGENT_EXECUTION
### Source setup (Cycles, as in the video)
```python
import bpy
ob = bpy.context.active_object
bpy.context.scene.render.engine = 'CYCLES'
sub = ob.modifiers.new("Subsurf", 'SUBSURF')               # adaptive needs a Subdivision Surface modifier last in the stack
sub.use_adaptive_subdivision = True                        # 5.x: on the modifier; no Experimental feature set needed
mat = ob.active_material
mat.displacement_method = 'DISPLACEMENT'                   # 4.x: on the material; pre-4.0 it was mat.cycles.displacement_method
```
Nodes: `Image Texture (disp map, Non-Color) [Color] -> Mix (Color, ~Multiply/Mix, Factor ~0.5) [A]`; `Noise Texture [Fac] -> Mix [B]`; `Mix [Result] -> Displacement [Height]`; `Displacement [Displacement] -> Material Output [Displacement]` (Scale small, ~0.02–0.05 at macro scale; video: "not a lot").

### Our pipeline (bake geometry for raea)
```python
import bpy
ob = bpy.context.active_object
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.subdivide(number_cuts=10); bpy.ops.object.mode_set(mode='OBJECT')
sub = ob.modifiers.new("Sub", 'SUBSURF'); sub.subdivision_type = 'SIMPLE'; sub.levels = sub.render_levels = 4   # ~
tex_img = bpy.data.textures.new("GroundDisp", 'IMAGE'); tex_img.image = bpy.data.images.load("//tex/ground_disp_2k.png")
disp = ob.modifiers.new("Disp", 'DISPLACE'); disp.texture = tex_img; disp.texture_coords = 'UV'
disp.strength = 0.01; disp.mid_level = 0.5                  # ~ minimal unevenness at macro scale
noise = bpy.data.textures.new("GroundNoise", 'CLOUDS'); noise.noise_scale = 0.05   # ~ second Displace = the "mixed noise"
d2 = ob.modifiers.new("DispNoise", 'DISPLACE'); d2.texture = noise; d2.strength = 0.003  # ~
for m in ("Sub", "Disp", "DispNoise"): bpy.ops.object.modifier_apply(modifier=m)
bpy.ops.object.shade_smooth()
```
raea: no displacement prop; the applied mesh arrives via `<Model src={staticFile("ground.glb")} />`. Fine relief below the mesh resolution comes from the material's `normal_map_texture` (the `_nor_gl` map) with `perceptual_roughness={1}` and a `metallic_roughness_texture`, lit by a raking `<SpotLight ... shadow_maps_enabled />`.

## NOTES
- Deprecated: `material.cycles.displacement_method` (pre-4.0) → `material.displacement_method`. Adaptive subdivision is Cycles-only; it is never used in our final (raea) render.
- Video gives no strength, scale or mix values ("not a lot … fairly minimal"); all numbers above are `~`.
- Keep the plane's polygon count sane for GLB (a few hundred k tris max for a frame-filling surface); decimate (`'DECIMATE'`, ratio ~0.3) after applying if heavy.
- Visual gaps: the exact noise/mix node settings are on screen only.
- Rule conflicts: none.
- bpy fixed for 5.3: cycles.feature_set removed (adaptive subdivision no longer experimental); ob.cycles.use_adaptive_subdivision → SubsurfModifier.use_adaptive_subdivision.
