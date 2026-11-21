---
title: One library texture + Cube Projection UV on everything
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/library-texture-cube-projection-kit-library--detail-isnt-hard.md
  - cards/04_Shading_Lighting/whole-scene-cube-projection-uv-material-link--add-tons-of-detail.md
sources: ["Detail Isn't Hard  Blender Tutorial.txt", "How to Add Tons of Detail To Your Renders  Blender.txt"]
use_when: "texturing many kit pieces/props fast"
style_fit: "Background set dressing only. Never on the Style D hero, its surface, or anything inside the DoF focus band — those need a proper unwrap and fresh 2k maps (RECIPE-D §5.1). One shared grime material keeps colour out of the background, leaving room for the single accent."
---

## METADATA
04_Shading_Lighting | Blender 3.x–4.x → 5.x → raea (glTF) | Blender bpy + raea

## CREATIVE_INTENT
A dense kit-built set looks unified the moment its pieces share one scanned/grungy PBR texture, unwrapped with Cube
Projection and nudged in the UV editor — the "laziest possible way", wrong for reusable or sellable assets, fine for
getting a render out. It looks poor in Material Preview and fine in the lit render.
- Detail isn't hard adds: per-piece workflow with one 4K scan (Quixel rock, ambientCG maps), optional AO multiply ("barely
  makes a difference"), and saving every finished piece to a kit library so later sets pull pieces first.
- Add tons of detail adds: whole-scene version — Link Materials (Ctrl+L) from one object to all, multi-object Cube
  Projection, re-run projection from the UV Editor until stretching lines up, scale UVs up.

## STE_PROCEDURE
1. Pick one scanned/grungy PBR set (base colour, roughness, normal; Poly Haven add-on / Asset Browser, search "metal", "rust"; or ambientCG).
2. Assign it to one piece.
3. To share it: select every target object with the textured one active; Link/Transfer Data › Link Materials (Ctrl+L).
4. Exclude volume cubes (they keep their own volume material) from the link and unwrap.
5. Enter Edit Mode with all objects; select all faces.
6. UV › Cube Projection.
7. If faces stretch or misalign, run Cube Projection again from the UV Editor; repeat until it lines up.
8. Scale/move the UV islands in the UV Editor until the texture scale looks right (by eye).
9. Before you judge, switch to Rendered view (Material Preview makes cube-projected textures look worse).
10. Optional: multiply the AO map into base colour (Mix, Multiply) — or skip it and give AO to raea as `occlusion_texture`.
11. Before export, bake any Mix so the GLB carries one base-colour map; make linked copies single-user if one needs its own mapping.
12. Save every finished piece to a kit file / Asset Browser library; for a new set, pull from the kit first and model only what is missing.
13. Log every library texture in `00_bible/ASSET-SOURCES.md`.

## VALUES BY SOURCE
| parameter | Detail isn't hard | Add tons of detail | recommended for Style D (+ why) |
|---|---|---|---|
| Texture | one 4K Quixel Megascans rock + ambientCG maps | Poly Haven grungy rust/metal | Poly Haven / ambientCG CC0, 1k–2k (blend2raea re-encodes JPEG) |
| Assignment | per piece | Ctrl+L Link Materials to all | Ctrl+L for background kit |
| cube_size | ~2.0 (texture's world size), correct_aspect | ~1.0 (smaller = denser tiling) | match the texture's real size |
| Fix stretching | UV islands by eye | re-run Cube Projection until aligned | both |
| AO | multiply into base colour (optional) | — | raea `occlusion_texture` (shows only with ambient/environment light) |
| Reuse | mark as asset, kit library | — | kit library |

## AGENT_EXECUTION
Blender (4.2+ / 5.x):
```python
import bpy
src = bpy.data.objects["pipe_main"]                                   # holds the rust / rock material
objs = [o for o in bpy.context.scene.objects if o.type == 'MESH' and not o.name.startswith("haze")]
bpy.ops.object.select_all(action='DESELECT')
for o in objs: o.select_set(True)
bpy.context.view_layer.objects.active = src
bpy.ops.object.make_links_data(type='MATERIAL')                       # Ctrl+L → Link Materials
# bpy.ops.object.make_single_user(object=True, obdata=True)          # if a linked copy needs its own mapping
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.uv.cube_project(cube_size=2.0, correct_aspect=True, scale_to_bounds=False)   # ~ cube_size = texture's world size
bpy.ops.object.mode_set(mode='OBJECT')
# optional AO multiply
mat = bpy.data.materials["rock_4k"]; nt = mat.node_tree; N, L = nt.nodes, nt.links
mix = N.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'; mix.inputs['Factor'].default_value = 1.0
L.new(N["diff"].outputs['Color'], mix.inputs[6]); L.new(N["ao"].outputs['Color'], mix.inputs[7])   # A, B
L.new(mix.outputs[2], N["Principled BSDF"].inputs['Base Color'])
# kit library
for o in objs: o.asset_mark(); o.asset_generate_preview()
# volume cube: keep out of the link/unwrap and hide before export (blend2raea skips hide_render objects)
for o in bpy.context.scene.objects:
    if o.name.startswith("haze"): o.hide_render = True
```
Links: `Image(diff) [Color] -> Mix(Color, MULTIPLY) [A]`; `Image(ao) [Color] -> Mix [B]`; `Mix [Result] -> Principled BSDF [Base Color]`.

raea:
```tsx
{/* UVs and material travel in the set .glb (Model / BlendShot) */}
<Model src={staticFile("set.glb")}>
  <StandardMaterial material="rust_metal" perceptual_roughness={1} />             {/* roughness map taken as is */}
  <StandardMaterial material="rock_4k" occlusion_texture={staticFile("rock_ao_1k.jpg")} />
</Model>
```
- Only the given fields change on a re-covered material (materials.md). A roughness map without `perceptual_roughness={1}` is halved and looks wet.
- `occlusion_texture` darkens indirect light only (AmbientLight / Environment).
- `blend2raea.py` exports images as JPEG (`export_image_format="JPEG"`), so keep source maps 1k–2k (2k only for a surface that fills the frame).

## NOTES
- Visual gaps: UV scale/offset set by eye (Detail isn't hard 18:29–19:07); exact Poly Haven material and final UV scale on screen only.
- STT fixes: "cue project" / "Cube reject" = Cube Projection; "you'll be unwrapped" = UV unwrapped; "qixel" = Quixel.
- Cube projection seams show on curved and macro surfaces; box-wise projection smears on spheres and tori (materials.md).
- Licences: Megascans and ambientCG differ (ambientCG is CC0); log every texture in ASSET-SOURCES.md.
- Rule conflicts: none for background use; never the hero or the DoF focus band.
