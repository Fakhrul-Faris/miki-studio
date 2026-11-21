---
title: Density × clamped noise (carving holes and pits inside a volume)
bucket: 02_Geometry_Nodes
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "07:45–15:32"
blender_version_source: n/a (Houdini, Volume VOP)
tool_target: Geometry Nodes
tier: principle
style_fit: Build-time pitting for a stone/concrete/pumice hero object; only the meshed result reaches raea. No conflict.
---

## METADATA
02_Geometry_Nodes | Houdini Volume VOP (source) → Blender 4.2+ GN / Volume Displace | Geometry Nodes

## CREATIVE_INTENT
Principle: changing a voxel's own value (not where it samples from) can only remove or thin material inside the existing
domain, but because the field varies with depth it opens holes and caves no sculpt could make. Idea: porous stone, pumice,
weathered concrete on a macro surface.

## STE_PROCEDURE
1. Convert the closed mesh to a Fog VDB with Fill Interior on (see round-trip card).
2. Inside a Volume VOP, add a Noise set to 1D (density is a float field, not a vector).
3. Multiply `density` by the noise output and write it back to `density`.
4. Before judging, scale the source up (the course sets the sphere to 100 units) because noise frequency is in scene units.
5. When the noise returns -1..1 and wipes the volume, clamp it with a minimum of 0.1, then lower to 0.05.
6. Convert back with VDB Convert → Polygons at a small Iso Value; look at the mesh, not the fog display.
7. Turn the clamp off to see detail change with depth inside the volume (holes and tunnels appear).

## AGENT_EXECUTION
### Source tool (Houdini)
Volume VOP: `Bind density -> Multiply [input1]`; `Global P -> Noise (1D, freq ~1–10) -> Clamp (min 0.1 → 0.05) -> Multiply [input2]`
`-> Bind Export density`. Then `VDB Convert (Polygons, Iso small)`; at voxel res 200 → 280 k polys, raising res → 3.3 M points.

### Blender / raea translation
Blender 4.2 GN has no per-voxel math on a mesh-made density grid in the stable node set (~; Blender 5.x adds grid nodes — check).
Practical equivalents:
- Point-cloud route: `Mesh to Points`/`Distribute Points in Volume` (Density, Seed) → `Points to Volume` is additive only.
- Field route (works in 4.2): build the density as a field on a dense point grid, threshold it, and mesh it:
  `Distribute Points in Volume (Mode Grid, Spacing 0.03)` → `Delete Geometry [Selection = Noise Texture (4D off, Scale ~2) [Fac] < 0.45]`
  → `Points to Volume (Density 1, Radius ~0.03)` → `Volume to Mesh (Threshold ~0.1)`.
- Volume Displace modifier is position-offset, not density-multiply (use the sample-offset card for that).
raea: no equivalent at render time (no density grids on surfaces). Build-time Manifold: `manifold.levelSet((x,y,z)=> sdfBox(x,y,z) + holeTerm(x,y,z), {min, max, resolution})`
or subtract noise blobs with `.minus()`.

## NOTES
- 1D vs 3D noise: density needs 1D (float); offsets need 3D (vector).
- Visual gap: final clamp/frequency values were set by eye; course numbers above are the ones spoken.
- Expensive: keep voxel size coarse while tuning; only the final cook goes high res.
