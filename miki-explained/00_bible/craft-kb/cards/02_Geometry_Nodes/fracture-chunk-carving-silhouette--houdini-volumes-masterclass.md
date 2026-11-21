---
title: Carve a silhouette by deleting whole fracture chunks (stretched cells, volume-scattered seeds)
bucket: 02_Geometry_Nodes
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "1:05:57–1:11:26, 1:26:35–1:31:49, 2:15:15–2:19:02"
blender_version_source: n/a (Houdini, VDB scatter + Voronoi + Assemble + Delete)
tool_target: Blender bpy
tier: principle
style_fit: A way to shape a stylised standing-stone / cliff / crumbling-wall block; also a "chunks fall away" reveal metaphor. Build-time. No conflict.
---

## METADATA
02_Geometry_Nodes | Houdini VDB from Polygons (density) + Scatter + Voronoi Fracture + Assemble + Delete (source) → Blender Cell Fracture + selection by bounds | Blender bpy

## CREATIVE_INTENT
Principle: the big shape comes from removing whole cells, not faces, so every edge stays a clean fracture plane. Seeds scattered
through the volume (not on the surface) give interior cell variety, and a stretch-before/unstretch-after transform makes cells
long and directional (strata, columns). Idea: an organic cliff block or a crumbling coin stack.

## STE_PROCEDURE
1. Convert the start shape (Tube or Box) with VDB from Polygons, Fog/density, so points can be scattered inside its volume.
2. Scatter points in the volume (course: 1000 for the tube, 100 for the box); turn off Relax for uneven cells.
3. Before fracturing, scale the points with a Transform (e.g. ×3 on one axis); after fracturing, apply the inverse transform (Invert Transformation) to stretch cells.
4. Voronoi Fracture the start shape; Divide/Subdivide afterwards.
5. Assemble (Create Packed) so each chunk is one point.
6. Delete chunks with a Delete node, Entity = Points, Bounding = Sphere, Delete Non-Selected; scale the sphere to trim the outside.
7. Add Delete (Bounding Box, Points) nodes to remove the top and bottom rows of chunks.
8. Re-fracture an isolated top block (Delete Non-Selected + Voronoi 120 pts, relax off), delete some top chunks for a jagged crown, Merge back.
9. Vary the scatter and top-noise seeds to get ~10 unique variants of the same asset.

## AGENT_EXECUTION
### Source tool (Houdini)
`Tube/Box` → `VDB from Polygons (density)` → `Scatter (1000 / 100)` → `Transform (stretch)` → `Voronoi Fracture` → `Transform (inverse, ref-copied)`
→ `Divide` → `Assemble (packed)` → `Delete (Sphere, Points, Delete Non-Selected)` → `Delete (Bound, top)`, `Delete (Bound, bottom)`
→ [top block: `Delete Non-Selected` → `VDB from Polygons` → `Scatter 120` → `Voronoi` → `Assemble` → `Delete (Bound, top, Selected)`] → `Merge`.

### Blender / raea translation
- Seeds in volume: GN `Distribute Points in Volume (Density, Seed)` on a `Mesh to Volume` of the shape, `Realize`, and export as a vertex object for Cell Fracture (`source={'VERT_CHILD'}`).
- Stretched cells: scale the source object ×3 on one axis (`obj.scale.z = 3`, `bpy.ops.object.transform_apply(scale=True)`), fracture, then scale the pieces' parent by 1/3 and apply.
- Delete by sphere: in Python, for each fracture piece `if (piece.matrix_world.translation - c).length > R: bpy.data.objects.remove(piece)` (after `origin_set(type='ORIGIN_CENTER_OF_MASS')`).
- GN equivalent on islands: `Mesh Island` → centroid via `Accumulate Field` (see centroid card) → `Delete Geometry [Selection = distance(centroid, C) > R]` (Domain Face).
raea: as a build-time state only; a "chunks fall away" beat in raea = named Mesh3d/Model pieces fading (`alpha_mode="Blend"`) and sliding out over ~0.4 s, never popping.

## NOTES
- Visual gaps: bounding sizes and positions were placed in the viewport; values unknown (visual only).
- Packed workflow avoids leaving loose faces when deleting — Blender per-object pieces give the same guarantee.
