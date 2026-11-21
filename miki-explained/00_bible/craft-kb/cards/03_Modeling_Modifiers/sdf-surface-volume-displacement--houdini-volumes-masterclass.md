---
title: Displace an SDF (distance VDB) instead of a fog volume — no stepping, no iso guessing
bucket: 03_Modeling_Modifiers
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "2:42:00–2:55:00, 3:23:07–3:25:00"
blender_version_source: n/a (Houdini, VDB from Polygons Distance VDB + Volume VOP)
tool_target: Blender bpy
tier: principle
style_fit: Gives clean, banding-free organic hero surfaces for macro close-ups (where stepping would show). No conflict.
---

## METADATA
03_Modeling_Modifiers | Houdini Distance VDB + Volume VOP (source) → Blender Voxel Remesh / Mesh to Volume, raea Manifold levelSet | Blender bpy

## CREATIVE_INTENT
Principle: a fog volume only knows "how dense", so displaced fog converts with stepping and you hunt for an iso value. A
signed distance field knows how far every voxel is from the surface, inside and outside, so pushes and pulls stay smooth,
the iso is simply 0, and you can push inward as well as out. The course calls the fog workflow the intro and the SDF the
"proper" volume displacement. Bonus: SDF detail is resolution-stable — tune at low res and the high-res cook shows the same
shapes with more detail (unlike a simulation).

## STE_PROCEDURE
1. Convert the closed mesh with VDB from Polygons and keep Distance VDB (field name `surface`), not Fog VDB.
2. Raise Exterior Band and Interior Band voxels (course: 50) so displaced data has room; low bands clip the result flat.
3. In the Volume VOP, add Volume Sample (input 1, primitive `surface`) at P + 3D noise (amplitude ~1–10, frequency ~10).
4. Before you look for a result, untick Autobind (or keep it) and add a Bind Export named exactly `surface`; the export name must match the field.
5. Convert with VDB Convert → Polygons; leave Iso at 0 — no stepping/banding, no iso hunting.
6. Sweep the iso value to reveal different inner layers when wanted.
7. Tune at a coarse voxel size, then cook the final at a fine one (course: 0.06 → ~74 M voxels, 6 M points).
8. When gaps appear at high res, raise the band voxels a little more.

## AGENT_EXECUTION
### Source tool (Houdini)
`VDB from Polygons (Distance VDB "surface", Voxel 0.1 → 0.06, Ext Band 50, Int Band 50)` → Volume VOP:
`P + Noise3D(P) -> Volume Sample (Input 1, "surface") -> Bind Export "surface"` → `Convert VDB (Polygons, Iso 0)`.
Display shows the SDF as a surface directly (W key toggles the band bounding box).

### Blender / raea translation
Blender's closest SDF round trip is Voxel Remesh (OpenVDB level set under the hood): smooth, fused, no stepping.
```python
import bpy
ob = bpy.context.object
# displace mesh-side first (dense mesh), then let the level set fuse it
disp = ob.modifiers.new("Noise", 'DISPLACE')
disp.texture = bpy.data.textures.new("N", 'CLOUDS'); disp.strength = 0.05; disp.direction = 'NORMAL'
rem = ob.modifiers.new("SDF", 'REMESH'); rem.mode = 'VOXEL'; rem.voxel_size = 0.01   # tune 0.03 → final 0.005 ~
rem.use_smooth_shade = True
```
Fog route (has stepping): `MESH_TO_VOLUME` (`density`, `interior_band_width`) + `VOLUME_DISPLACE` → `VOLUME_TO_MESH (threshold)`.
GN SDF grid nodes (Mesh to SDF Grid / Sample Grid) exist only in newer/experimental builds — check your Blender before relying on them (~).
raea (build time, real API): `manifold.levelSet(sdf, {min, max, resolution})` IS the SDF workflow — write the shape as a
distance function and subtract noise:
```tsx
import { Mesh3d, manifold } from "raea/3d";
const sdRound = (x: number, y: number, z: number) => Math.hypot(x, y * 1.3, z) - 1;   // base shape
const ROCK = manifold.levelSet((x, y, z) => sdRound(x, y, z) - 0.12 * myNoise3(x * 3, y * 3, z * 3),
  { min: [-1.5, -1.5, -1.5], max: [1.5, 1.5, 1.5], resolution: 0.03 });   // tune 0.06, final ~0.015
// <Mesh3d shape={ROCK} ... />   myNoise3 = your own seeded value/simplex noise (raea/3d ships none)
```
Check the levelSet callback signature in raea/3d typings (`(x,y,z)` vs `[x,y,z]`) (~).

## NOTES
- Fog vs SDF: the fog workflow's stepping comes from "reaching the limit of the data"; SDF removes it.
- Visual gap: the bind-export/autobind fix was found by trial on screen; the rule (export name = field name) is spoken.
- Heavy: band 50 + fine voxels are slow; budget minutes, not seconds, for the final cook, then Poly Reduce (see export card).
