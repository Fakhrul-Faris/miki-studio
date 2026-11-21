---
title: Advanced rockifier — Worley F2−F1 terrain fractal along the gradient + inverted cellular-border cracks
bucket: 02_Geometry_Nodes
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "3:08:41–3:24:52"
blender_version_source: n/a (Houdini, Unified Noise VOP + Cellular Noise on an SDF)
tool_target: Geometry Nodes
tier: principle
style_fit: One reusable modifier that turns any blocky base into layered, cracked rock for a hero macro object or a set-dressing surface. No conflict.
---

## METADATA
02_Geometry_Nodes | Houdini Unified Noise + Cellular Noise in a gradient-displaced SDF (source) → GN Voronoi/Noise along Normal | Geometry Nodes

## CREATIVE_INTENT
Principle: one cellular noise (Worley F2 − F1) layered with a terrain-style fractal makes stacked plates; a second cellular
pattern, read as cell borders and inverted, carves cracks between them. With a warp on P the cracks wander instead of
forming a grid, and the plates interleave. Idea: one modifier you drop on any blocky base — a stretched voronoi box became
a cliff instantly. Mixed flat zones and busy zones read as more real than uniform detail.

## STE_PROCEDURE
1. Start from the gradient-displacement setup (SDF + normalized grad).
2. Negate the gradient once instead of multiplying every noise by −1.
3. Add Unified Noise at P: noise type Worley F2 − F1, fractal type Terrain; multiply by grad and add to P.
4. Make a second Unified Noise layer: frequency scale ~0.4 → 1.2, amplitude ~0.4 (paste-relative to share settings).
5. Enable Fold; enable Lattice Warp (values visual only) for breakups in the upper layers.
6. Before you trust the frequency, set it as a vector (per-axis); a float frequency produced stripes.
7. Add a low-amplitude 3D noise to P before the unified noise; keep it small so position is barely affected.
8. Add Cellular Noise: use its Border output; feed P + (3D noise × ~4) as its position so the cell edges break.
9. Fit Range to invert the border so it cuts cracks inward instead of pushing out; scale by a controller (~0.1–0.2).
10. Add the crack term to the other terms; invert again if the cracks look wrong (course flipped it once).
11. Test on another base (stretched voronoi box, partly deleted); scale may be off, but the look holds.
12. Add a few band voxels if gaps appear at high res (course: voxel 0.06, ~74 M voxels, 6 M points; unified noise is the slow part).

## AGENT_EXECUTION
### Source tool (Houdini)
Volume VOP (in1 SDF, in2 grad): `grad -> Negate -> Normalize`;
`Unified Noise (Worley F2-F1, fractal Terrain, Fold on, Lattice Warp on, freq vector)(P + Noise3D(P)·small) -> × grad`;
`Cellular Noise (Border)(P + Noise3D(P)×4) -> Fit Range (invert) × 0.1 -> × grad`;
sum → `P + sum -> Volume Sample(surface) -> Bind Export surface` → `Convert VDB`.

### Blender / raea translation
GN on a dense mesh (then Voxel Remesh / Mesh to Volume → Volume to Mesh):
- Plates: `Voronoi Texture (F2) [Distance] - Voronoi Texture (F1) [Distance]` + `Noise Texture (type Hetero Terrain ~) [Fac]` → `Math (MULTIPLY)`
- Fold ≈ `Math (PINGPONG)` or `Math (ABSOLUTE)` on the fractal (~); Lattice Warp ≈ Noise Texture `Distortion` or a warped Vector input (~)
- Cracks: `Position + (Noise Texture [Color] - 0.5) × 4 -> Voronoi Texture (Distance to Edge) [Distance] -> Map Range (0..0.05 → 1..0, clamp) × -0.1 ~`
- Sum → `Normal × sum -> Set Position [Offset]`
raea: no runtime equivalent; render the GLB with `<Model>`. Build-time: same terms subtracted in a `manifold.levelSet` SDF
(your own Worley/fractal functions).

## NOTES
- Unified Noise ships with Houdini's heightfield tools; it is slow but "worth waiting for". Blender has no single equivalent.
- Visual gap: lattice-warp values were pasted from an earlier file and never spoken; crack strength tuned by eye.
- Course admitted the cracks "push everything out" and were "not very useful" in places — treat as an idea, not a finished preset.
