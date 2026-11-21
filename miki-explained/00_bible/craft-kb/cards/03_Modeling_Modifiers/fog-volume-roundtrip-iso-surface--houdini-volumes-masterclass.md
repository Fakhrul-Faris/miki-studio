---
title: Fog-volume round trip (mesh → density voxels → iso-surface mesh)
bucket: 03_Modeling_Modifiers
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "01:08–15:32, 48:48–51:31, 1:10:59–1:19:55"
blender_version_source: n/a (Houdini, VDB toolset)
tool_target: Blender bpy
tier: principle
style_fit: Build-time only; gives a hero macro object (stone, concrete, cast metal) one fused, all-quad skin that raea renders as a plain GLB. No rule conflict.
---

## METADATA
03_Modeling_Modifiers | Houdini VDB (source) → Blender 4.2+ Mesh to Volume / Volume to Mesh | Blender bpy

## CREATIVE_INTENT
Principle: a volume is a fixed domain of voxels that each hold a value; edits change values, not vertices, so pushed or
overlapping shapes blend instead of intersecting. Converting a closed mesh to a density field and back at an iso level
is the base of every later detail pass. Idea: use it whenever a macro prop must look like one solid material (a stone
counter edge, a cast part) instead of a stack of primitives.

## STE_PROCEDURE
1. Before converting, make sure the source mesh is closed; open surfaces (a Grid) give a wrong box-like volume.
2. Convert the mesh with VDB from Polygons; uncheck Distance VDB and check Fog VDB to get one `density` field.
3. Set Voxel Size from the object's scale; lower it to raise resolution (the course works at 0.1 → 0.05 → 0.03 → 0.025).
4. Check Fill Interior so voxels hold data all the way to the centre, not only a shell.
5. Raise Exterior Band Voxels (~5–6) when later steps push data outward.
6. Turn on a manual-cook toggle before typing voxel sizes; one wrong value (e.g. 200 instead of 20) freezes the machine.
7. Convert back with VDB Convert, Convert To = Polygons.
8. Raise Iso Value above 0 (0 captures nothing); start at 0.01–0.1 and match the template of the original.
9. Raise Iso Value further (up to ~1–1.2 in the course) to carve deeper into the field and reveal interior detail.
10. Raise Adaptivity on the convert to keep detail only where needed and cut the poly count.
11. When stepping (terraced bands) appears, either accept it as rock strata or switch to the SDF workflow (see the SDF card).
12. After converting, Assemble/Connectivity the result, keep the main piece and delete floating fragments.

## AGENT_EXECUTION
### Source tool (Houdini)
`VDB from Polygons (Distance VDB off, Fog VDB on, Voxel Size 0.1→0.03, Fill Interior on, Exterior Band 5–6)` →
`[Visualize: density ×10, lighting on — viewport only]` → `VDB Convert (Convert To Polygons, Iso Value 0.01–0.1, Adaptivity >0)`
→ `Assemble` → `Blast (delete non-selected = main piece)`. Measured: sphere at voxel 0.03 → 3.3 M points; 9 M points in ~3 s;
heaviest rocks 8–12 min per full cook.

### Blender / raea translation
```python
import bpy
src = bpy.data.objects["Rock_Base"]                     # closed mesh
bpy.ops.object.volume_add(location=(0, 0, 0))
vol = bpy.context.object
m2v = vol.modifiers.new("MeshToVolume", 'MESH_TO_VOLUME')
m2v.object = src
m2v.resolution_mode = 'VOXEL_SIZE'
m2v.voxel_size = 0.03                                   # course value; scale-dependent
m2v.density = 1.0
m2v.interior_band_width = 0.1                           # ~ "fill interior": widen until the core holds data
bpy.ops.mesh.primitive_plane_add()
skin = bpy.context.object
v2m = skin.modifiers.new("VolumeToMesh", 'VOLUME_TO_MESH')
v2m.object = vol
v2m.threshold = 0.1                                     # = Houdini Iso Value
v2m.adaptivity = 0.0                                    # raise to cut polys
v2m.use_smooth_shade = True
src.hide_render = src.hide_viewport = True
```
Geometry Nodes equivalent: `Object Info [Geometry] -> Mesh to Volume [Mesh]` (Density 1, Resolution Mode Size, Voxel Size 0.03,
Interior Band Width ~0.1) `-> Volume to Mesh [Volume]` (Threshold 0.1, Adaptivity 0) `-> Group Output`.
Floating bits: `Mesh Island [Island Index]` + `Accumulate Field` per island (count) `-> Compare (less than max) -> Delete Geometry`.
raea: renders only the meshed result as `<Model src={staticFile("rock.glb")} />`; raea has no voxel/VDB surface (its
`<FogVolume>` is box fog, not a density grid). Build-time analytic alternative: `manifold.levelSet(sdf, {min, max, resolution})`.

## NOTES
- Blender's Mesh to Volume dropped the separate "Fill Volume"/exterior band toggles in recent versions (~); interior band width
  is the knob that remains. Check the modifier's properties in your build.
- Visual gaps: the iso values that "match the template" were tuned by eye on screen.
- Poly counts explode (3–15 M); always decimate before GLB export (see Poly Reduce card) — raea wants .glb under ~20 MB.
