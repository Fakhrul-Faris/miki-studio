---
title: One grungy metal material on everything — Link Materials (Ctrl+L) + multi-object Cube Projection, repeated to fix stretching
bucket: 04_Shading_Lighting
source: "How to Add Tons of Detail To Your Renders  Blender.txt"
source_time: "17:58–19:26"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fast, unified texturing for background set dressing. Not for the Style D hero or its surface, which need a proper unwrap and fresh 2k maps (RECIPE-D §5.1).
---

## METADATA
04_Shading_Lighting | 4.x source → 4.2+ code → raea (glTF) | Blender bpy, raea

## CREATIVE_INTENT
A dense kit-built set looks unified the moment every piece shares one rusty, grungy metal. Give the material to
everything at once and unwrap everything at once with Cube Projection. The source says outright this is the laziest
possible way, wrong for reusable or sellable assets and fine for getting a render out.

## STE_PROCEDURE
1. Pick any grungy metal or rust PBR material (Poly Haven add-on / Asset Browser; search "metal", "rust").
2. Drop it on one object.
3. Select every object, the textured one active; Link/Transfer Data → Link Materials (`Ctrl+L`).
4. Enter Edit Mode with all objects; select all faces.
5. UV → Cube Projection (`U`).
6. If faces stretch or misalign, run Cube Projection again from the UV Editor; repeat until it lines up.
7. Scale the UVs up in the UV Editor until the texture scale looks right.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
src = bpy.data.objects["pipe_main"]                          # holds the rust material
objs = [o for o in bpy.context.scene.objects if o.type == 'MESH' and not o.name.startswith("haze")]
for o in objs: o.select_set(True)
bpy.context.view_layer.objects.active = src
bpy.ops.object.make_links_data(type='MATERIAL')               # Ctrl+L → Link Materials
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.uv.cube_project(cube_size=1.0, scale_to_bounds=False)   # ~; smaller cube_size = denser texture tiling
bpy.ops.object.mode_set(mode='OBJECT')
```
- Linked-data objects share UVs: one projection covers every linked copy. Make copies single-user first
  (`bpy.ops.object.make_single_user(object=True, obdata=True)`) if a copy needs its own mapping.

### raea
- The UVs and material travel in the set `.glb`. `blend2raea.py` writes textures as JPEG, so keep source maps 1k–2k.
- Re-cover one material at render time without re-exporting: `<Model src={staticFile("set.glb")}><StandardMaterial material="rust_metal" perceptual_roughness={1} /></Model>`
  (only the given fields change; materials.md).
- A Poly Haven roughness map needs `perceptual_roughness={1}` in raea, or it is halved and looks wet (materials.md).

## NOTES
- Visual gaps: the exact Poly Haven material and the final UV scale are on screen only.
- Exclude the volume cube from the material link and unwrap (it has its own volume material), and give it
  `hide_render = True` before export, because `blend2raea.py` skips hide_render objects.
- Rule conflicts: none. One shared grime material also keeps colour out of the background, which leaves room for the
  single brand accent.
- Related: `library-texture-cube-projection-kit-library--detail-isnt-hard.md` (per-piece version + kit library).
