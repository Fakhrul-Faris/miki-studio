---
title: Volume displacement by offset sampling (P + noise lookup) with domain expand
bucket: 02_Geometry_Nodes
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "16:06–25:58, 56:04–1:02:49, 1:12:16–1:16:43"
blender_version_source: n/a (Houdini, Volume VOP + Volume Sample + VDB Activate)
tool_target: Blender bpy
tier: principle
style_fit: Build-time "rockifier" for organic hero props; Blender's Volume Displace modifier is a direct match. No conflict.
---

## METADATA
02_Geometry_Nodes | Houdini Volume VOP/Volume Sample/VDB Activate (source) → Blender Volume Displace modifier | Blender bpy

## CREATIVE_INTENT
Principle: instead of changing a voxel's value, make each voxel read its value from a nearby jittered position; the shape
grows lobes, overhangs and curls outward — real 3D displacement, not a 2D height. Idea: turn any primitive into a rock,
a crumb, a lump of clay in a few nodes; the same core powers every rock in the course.

## STE_PROCEDURE
1. Inside a Volume VOP, add Volume Sample: Input = first input, Primitive = 0 (or name `density`).
2. Add a 3D Noise of P to P and feed the sum into Volume Sample's sample position; write the result to `density`.
3. Raise the noise amplitude (course: 100 → 500) until the silhouette changes.
4. When data stops growing outside the old shape, add VDB Activate before the VOP and raise Expand (1 → 10 → 25 → 50 voxels).
5. Before expanding, check the noise is 3D; a 1D noise pushes every axis by one value and stretches along a diagonal.
6. For the core "rock" look, also add a small 3D noise to P before the main noise (domain warp), amplitude ~10 → 200 on a 100-unit object.
7. Layer a second, finer copy: frequency 10, amplitude 0.1; then a bigger one: frequency 0.5, amplitude 0.1.
8. When the ground's height must stay, zero the Y component of the offset (Vector to Float → Float to Vector with Y = 0) and lower it to 0.01.
9. Add Worley noise (F2 − F1) × multiplier for cellular bulges; expect it to push along one axis until you use the gradient (SDF card).
10. Judge on the converted mesh, never on the fog render.

## AGENT_EXECUTION
### Source tool (Houdini)
`VDB from Polygons (Fog, Fill Interior)` → `VDB Activate (Expand 10–50)` → Volume VOP:
`Global P -> Add[0]`; `Global P -> Noise 3D (freq f, amp a) -> Add[1]`; `Add -> Volume Sample [pos]` (Input 1, Prim 0) `-> Bind Export density`
→ `VDB Convert (Polygons, Iso ~0.1)`. Layer: amp 0.25, freq 10/amp 0.1, freq 0.5/amp 0.1; Y-locked copy amp 0.01.

### Blender / raea translation
```python
import bpy
vol = bpy.data.objects["RockVolume"]          # volume object with a MESH_TO_VOLUME modifier
tex = bpy.data.textures.new("RockNoise", 'CLOUDS')   # or 'VORONOI' (distance_metric, F2-F1 via 'noise_intensity' ~)
tex.noise_scale = 0.25
tex.noise_depth = 4
vd = vol.modifiers.new("VolDisplace", 'VOLUME_DISPLACE')
vd.texture = tex
vd.texture_map_mode = 'GLOBAL'                # sample in world space
vd.strength = 0.2                             # ~ amplitude
vd.texture_mid_level = (0.5, 0.5, 0.5)        # centre so offsets go both ways
vd.texture_sample_radius = 1.0
# then VOLUME_TO_MESH on a mesh object as in the round-trip card
```
Volume Displace needs the Mesh to Volume interior/exterior band wide enough to hold the pushed data (= VDB Activate Expand);
raise `interior_band_width` / voxel padding if lobes clip flat (~).
Mesh-side equivalent (no volume): Voxel Remesh then `Set Position [Offset] <- Noise Texture [Color] - 0.5 × strength` on a dense
mesh, then a second Voxel Remesh to fuse self-overlaps.
raea: no runtime equivalent. Build-time Manifold: `solid.refineToLength(0.02).warp((x,y,z) => [x+n(x,y,z)*a, y+n(y,z,x)*a, z+n(z,x,y)*a])`
(warp is the same P-offset idea but can self-intersect; the volume version cannot).

## NOTES
- Old `Clouds`/`Voronoi` legacy textures are what the Volume Displace modifier reads; they're the pre-node texture system, still in 4.x.
- Visual gap: "too much"/"cool" tuning was by eye; exact final amplitudes beyond the spoken ones are unknown (visual only).
- Domain pruning: VDB skips empty voxels; without Expand the displacement silently stops at the original bounds.
