---
title: Edge-only displacement by sliding points in their tangent plane (skin-sliding cross products)
bucket: 03_Modeling_Modifiers
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "2:01:40–2:13:24, 2:19:02–2:21:37"
blender_version_source: n/a (Houdini, Point VOP cross products)
tool_target: Geometry Nodes
tier: principle
style_fit: Breaks up the edges of a hero prop (chipped stone, worn wood block, cracked biscuit) while its flat faces stay clean for macro light. No conflict.
---

## METADATA
03_Modeling_Modifiers | Houdini Point VOP (source) → Blender Geometry Nodes Set Position | Geometry Nodes

## CREATIVE_INTENT
Principle: push every point only inside its own tangent plane (two vectors built from cross products of N and up). Points
on a flat face slide along the face, so the face does not move; points on an edge carry an averaged normal, so their
"tangent plane" is tilted and they crumble the edge. It works on any geometry, including fractured pieces made only of
inside faces, where ordinary "displace the outside faces" methods fail. Idea: chip the rims of a coin, a brick or a
voronoi-cut block before the volume pass, so the macro close-up shows broken edges but readable flat planes.

## STE_PROCEDURE
1. Before displacing, add divisions so edges have points to move (Divide, edge length ~0.1 → 0.01 on a ~1-unit piece).
2. Unpack packed pieces; displacement needs real points.
3. Fuse all points so neighbouring faces share points (averaged normals on edges).
4. Compute point normals (Normal/Facet, optional — the course tried with and without).
5. In a Point VOP, compute T = normalize(cross(N, up)), with up = (0, 1, 0).
6. Compute B = normalize(cross(T, N)); T and B now span the tangent plane.
7. Add T + B (both normalized) and multiply by a noise of P (start 1D; 3D gave better edges in the cliff).
8. Multiply by a constant (start 0.01) and add to P; raise slowly — large values cause self-intersections.
9. In the first demo, zero the Z component of the offset (Vector to Float → Float to Vector, Z = 0) to keep depth.
10. If needed, clean up with a Smooth node (scale by curvature) — small amounts only.
11. Then convert to a volume (VDB from Polygons; Fill Interior off in the cliff example because it caused bending artefacts).
12. Check: the silhouette barely changes; the extra detail sits on the edges.

## AGENT_EXECUTION
### Source tool (Houdini)
`Divide → Unpack → Fuse → Normal → Point VOP`:
`N -> Cross Product[a]; Constant (0,1,0) -> Cross Product[b] -> Normalize = T`
`T -> Cross Product[a]; N -> Cross Product[b] -> Normalize = B`
`T + B -> Multiply[0]; Noise(P, 1D or 3D) -> Multiply[1]; Constant 0.01 -> Multiply[2] -> (Z = 0) -> Add to P`
→ optional `Smooth (Scale by Curvature)` → `VDB from Polygons` → `Convert VDB (Polygons)`.

### Blender / raea translation
Geometry Nodes on the piece (after `Merge by Distance` + `Subdivide Mesh`):
- `Normal [Normal] -> Vector Math (CROSS_PRODUCT)[A]`, `Combine XYZ (0,0,1) -> [B]` (Blender up = Z) `-> Vector Math (NORMALIZE)` = T
- `T -> Vector Math (CROSS_PRODUCT)[A]`, `Normal -> [B] -> Vector Math (NORMALIZE)` = B
- `T + B -> Vector Math (SCALE)[Scale] <- Math (SUBTRACT, Noise Texture [Fac], 0.5) × 0.02 ~`
- `-> Set Position [Offset]`; optional `Separate XYZ / Combine XYZ` to zero one axis.
```python
import bpy
ob = bpy.context.object
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.mesh.remove_doubles(threshold=0.0001)          # Fuse
bpy.ops.mesh.subdivide(number_cuts=8); bpy.ops.object.mode_set(mode='OBJECT')   # ~ Divide
mod = ob.modifiers.new("EdgeSlide", 'NODES')            # build the tree above into mod.node_group
```
Then a `REMESH` modifier (`mode='VOXEL'`, `voxel_size ~0.005`) or Mesh to Volume → Volume to Mesh fuses the result.
raea: no runtime equivalent; render the baked GLB with `<Model>`. Build-time analogue: `solid.refineToLength(0.01).warp(...)`
needs normals that Manifold's warp does not supply, so do this step in Blender.

## NOTES
- Where N is parallel to up (flat tops), cross(N, up) is zero, so those faces get no slide — flat tops stay flat. Choose a
  different "up" if you want them broken too (~).
- Pieces whose faces got subdivided twice (overlapping groups) displace unevenly; the course ignored it because the volume pass hides it.
- Visual gap: the final noise frequency/amplitude in the cliff were tuned on screen ("increase this"); only 0.01 start is spoken.
- In animation, never let the chipped edges "grow" with a pop — fade or ease any state change over ~0.4 s.
