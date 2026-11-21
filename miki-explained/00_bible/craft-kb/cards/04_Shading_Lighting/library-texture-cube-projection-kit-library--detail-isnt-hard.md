---
title: One library texture + Cube Projection UV on every kit piece, saved to a personal kit library
bucket: 04_Shading_Lighting
source: "Detail Isn't Hard  Blender Tutorial.txt"
source_time: "17:45–20:07 (texturing), 19:07–19:31 (save pieces for later)"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fine for the set dressing around the hero (background structures, out-of-focus clutter). The macro hero and the surface it sits on need a proper unwrap and fresh 2k maps (RECIPE-D §5.1), not this.
---

## METADATA
04_Shading_Lighting | 3.x source → 4.2+ code → raea (glTF) | Blender bpy, raea

## CREATIVE_INTENT
Most texturing on a dense set is one scanned 4K texture (here a Quixel Megascans rock, plus ambientCG maps that came with
a model pack) on each piece, unwrapped with Cube Projection and nudged in the UV editor. The source does this about 90% of
the time: it looks poor in Material Preview and fine in the lit render. Each finished piece is saved, so later sets are
built by pulling from that pile of pieces.

## STE_PROCEDURE
1. Assign one scanned PBR texture set (base colour, roughness, normal) to the piece.
2. In Edit Mode select all faces, then UV → Cube Projection (`U` → Cube Projection).
3. In the UV Editor scale and move the islands until the texture's scale looks right on the model (by eye).
4. Before you judge the result, switch to Rendered view. Material Preview makes cube-projected textures look worse than they render.
5. Optional: multiply the AO map into the base colour (Mix node, Blend Multiply) to soften corners. The source says this "barely makes a difference".
6. Save every finished piece to a kit file or asset library ("save it for later").
7. For a new set, pull pieces from the kit first and model only what is missing.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
objs = [o for o in bpy.context.selected_objects if o.type == 'MESH']
bpy.context.view_layer.objects.active = objs[0]
bpy.ops.object.mode_set(mode='EDIT')                    # multi-object edit: all selected meshes
bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.uv.cube_project(cube_size=2.0, correct_aspect=True, scale_to_bounds=False)   # ~ cube_size = texture's world size
bpy.ops.object.mode_set(mode='OBJECT')
# optional AO multiply (Principled v2 / 4.x)
mat = bpy.data.materials["rock_4k"]; nt = mat.node_tree; N, L = nt.nodes, nt.links
mix = N.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'; mix.inputs['Factor'].default_value = 1.0
L.new(N["diff"].outputs['Color'], mix.inputs[6]); L.new(N["ao"].outputs['Color'], mix.inputs[7])   # A, B
L.new(mix.outputs[2], N["Principled BSDF"].inputs['Base Color'])
# kit library: mark as asset so it shows in the Asset Browser
for o in objs: o.asset_mark(); o.asset_generate_preview()
```
- Node links: `Image(diff) [Color] -> Mix(Color, MULTIPLY) [A]`; `Image(ao) [Color] -> Mix [B]`; `Mix [Result] -> Principled BSDF [Base Color]`.
- Before export, bake any Mix so the GLB carries one base-colour map (glTF does not keep node graphs). Otherwise drop the
  Mix and give the AO map to raea as `occlusion_texture`.

### raea
- The piece plays inside the set `.glb` (`<Model>` / BlendShot). The cube-projected UVs travel with the mesh.
- Unbaked AO → `occlusion_texture`: `<Model src={staticFile("set.glb")}><StandardMaterial material="rock_4k" occlusion_texture={staticFile("rock_ao_1k.jpg")} /></Model>`.
  It darkens indirect light only (an `<AmbientLight>` or `<Environment>`), so it shows only with some ambient or environment light.
- `blend2raea.py` exports images as JPEG (`export_image_format="JPEG"`), so a 4K PNG set gets recompressed. Use 1k–2k for
  background pieces (materials.md: 2k only for a surface that fills the frame).

## NOTES
- Visual gaps: UV scale and offset are set by eye in the UV editor (18:29–19:07). No values are given.
- STT fixes: "cue project" / "Cube reject" = Cube Projection; "you'll be unwrapped" = UV unwrapped; "qixel" = Quixel.
- Cube projection seams show on curved and macro surfaces, and materials.md warns that box-wise projection smears on spheres
  and tori. Never use it on the Style D hero or anything inside the DoF focus band.
- Asset sourcing rule: log every library texture in `00_bible/ASSET-SOURCES.md` (studio production pipeline). Megascans
  and ambientCG licences differ; ambientCG is CC0.
- Same lazy unwrap, applied to a whole scene at once: `whole-scene-cube-projection-uv-material-link--add-tons-of-detail.md`.
