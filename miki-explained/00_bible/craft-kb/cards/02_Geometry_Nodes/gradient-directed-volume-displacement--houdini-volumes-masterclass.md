---
title: Gradient-directed displacement (scalar noise pushed along the SDF gradient = volume "normals")
bucket: 02_Geometry_Nodes
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "2:55:00–3:08:41, 3:26:57–3:31:43"
blender_version_source: n/a (Houdini, VDB Analysis Gradient + Volume Sample Vector)
tool_target: Geometry Nodes
tier: principle
style_fit: The "rockifier" core — turns any base shape into a convincing stone/crust for a macro hero object at build time. No conflict.
---

## METADATA
02_Geometry_Nodes | Houdini VDB Analysis + Volume Sample Vector (source) → GN Set Position along Normal / Manifold levelSet | Geometry Nodes

## CREATIVE_INTENT
Principle: a 2D/float texture (Worley, cells, cracks) has no direction; added to P it shoves everything along one diagonal
(the "stretched tube"). The volume's gradient is its normal field, so multiply the scalar by the normalized gradient and
the pattern grows in and out of the surface everywhere. Because the noise is evaluated per voxel through the whole depth,
deeper voxels get different values and can be carried out as floating chunks; at low amplitude this is exactly what makes a
shape "rockified". Course rule: do one change, recompute the gradient, then add the next layer. Ideas: drive the noise's
frequency with another noise for zones of fine and coarse detail; warp P with a small noise first for twisted shapes.

## STE_PROCEDURE
1. Start from an SDF (Distance VDB `surface`, wide bands — see SDF card).
2. Add VDB Analysis: Operation Gradient on `surface`, custom name `grad`; feed it to the Volume VOP's second input.
3. Inside, use Volume Sample Vector (not Volume Sample) at the original P: input 2, name `grad`; Normalize it.
4. Make a scalar: Worley F2 − F1 (or F1 − F2), × multiplier.
5. Multiply grad × scalar; to push inward, negate the gradient instead of multiplying the noise by −1.
6. Add to P, Volume Sample `surface` (input 1) at that position, Bind Export `surface`.
7. If floating pieces appear, lower the amplitude until the shape is "rockified", not exploded.
8. Before the noise, add a small 3D noise to P (domain warp) for twisted, non-uniform detail.
9. Optional: fit a noise (−1..1) to a frequency range (course: (1,1,1)–(4,4,4)) and wire it into the main noise's frequency.
10. After each displacement pass, run VDB Analysis Gradient again before the next pass; large single pushes go inaccurate.
11. Convert to polygons at iso 0; sweep the iso to pick a layer.

## AGENT_EXECUTION
### Source tool (Houdini)
`VDB from Polygons (Distance)` → `VDB Analysis (Gradient, name grad)` → Volume VOP (in1 = SDF, in2 = grad):
`Volume Sample Vector (in2, "grad", P) -> Normalize -> Multiply[0]; Worley(P + Noise3D(P)) F2-F1 × k -> Multiply[1]`
`P + Multiply -> Volume Sample (in1, "surface") -> Bind Export surface` → repeat `VDB Analysis → VOP` per layer → `Convert VDB`.

### Blender / raea translation
On a dense mesh the gradient is simply the point Normal; GN recomputes Normal after each Set Position, which is the
"recompute gradient" step for free:
- `Position -> Vector Math (ADD) <- Noise Texture (3D, Scale ~2) [Color] - 0.5 × 0.1 ~` = warped P
- `warped P -> Voronoi Texture (F2) [Distance] - Voronoi Texture (F1) [Distance] -> Math (MULTIPLY, k)` = scalar
- `Normal -> Vector Math (SCALE)[Scale] <- scalar -> Set Position [Offset]` → second `Set Position` layer → `Mesh to Volume` → `Volume to Mesh` (or Voxel Remesh) to fuse self-overlaps.
- Frequency zones: `Noise Texture [Fac] -> Map Range (0..1 → 1..4) -> Voronoi [Scale]`.
raea (build time): in `manifold.levelSet`, `sdf(p) - s(p)` moves the surface along the gradient by `s` — the same operation
analytically. `ROCK = manifold.levelSet((x,y,z) => sdBase(x,y,z) - 0.08 * worleyF2F1(warp(x,y,z)), {min, max, resolution: 0.03})`
(your own `worleyF2F1`/`warp`; raea/3d ships no noise).

## NOTES
- Volume Sample returns only floats; gradients need Volume Sample Vector.
- The SDF display can lag at low res; judge on the converted mesh.
- Visual gap: the multiplier values that "rockify" vs explode were tuned live; spoken examples only (3,3,3; 1→4 frequency fit).
- If the rock is ever revealed by animation, ease the reveal (morph or fade ~0.4 s+); no popping debris.
