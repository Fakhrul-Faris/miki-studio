---
title: Layered noise stack for a faceted cliff (1D simplex facets + turbulent + warped + fine sharp layer)
bucket: 02_Geometry_Nodes
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "2:22:18–2:37:23"
blender_version_source: n/a (Houdini, Volume VOP noise layers)
tool_target: Geometry Nodes
tier: principle
style_fit: Recipe for multi-scale surface on a macro hero (stone, crust, chipped ceramic) — large planes for light, fine detail for the close-up. No conflict.
---

## METADATA
02_Geometry_Nodes | Houdini Volume VOP offset-sample noise layers (source) → GN Set Position layers / Volume Displace | Geometry Nodes

## CREATIVE_INTENT
Principle: real rock reads at three scales — big flat facets, mid breakups, fine sharp grain — so stack noises by role
rather than one noise with many octaves. A 1D (float) noise added to all three axes moves every axis by the same value,
which leaves flat, planar facets: useful on purpose. A domain-warped noise gives the "twist" that stops repetition. Idea:
the big facets catch the single soft top light as clean planes; the fine layer only shows in the macro push-in.

## STE_PROCEDURE
1. Convert the edge-displaced base (see edge card) to a volume, Fill Interior off.
2. Layer 1 (facets): offset-sample noise, Simplex (0–1 range) instead of Perlin, octaves 4 instead of 8, 1D, amplitude ~3.
3. Before keeping 1D vs 3D, compare both; 1D gave flat faces and was kept here.
4. Layer 2 (mid): copy the layer, Turbulent noise, 3D, type Alligator, frequency (3,3,3), amplitude ~0.1.
5. Layer 3 (detail): another 3D noise at lower amplitude (~0.1 → 0.04) with higher roughness for sharper detail.
6. Layer 4 (twist): add a 3D noise to P before a noise (domain warp); raise frequency, lower amplitude; give it an offset so it does not align with the others.
7. Layer 5 (grain): very high frequency (20,20,20), sharper roughness, amplitude ~0.2 "a tiny bit".
8. Tune at low res, then cook high res (course: voxel 0.025 → ~60 M voxels, 2.9 M points, ~2 min).
9. Optional: raise the convert iso (up to ~1.2) to carve deeper, wave-eroded "shoreline" detail.
10. Remove floating leftovers (assemble, keep the main piece).

## AGENT_EXECUTION
### Source tool (Houdini)
Volume VOP chain, each layer `P + Noise -> Volume Sample(density)`:
L1 `Simplex 1D, oct 4, amp 3` · L2 `Turbulent 3D Alligator, freq 3, amp 0.1` · L3 `3D, amp ~0.04, roughness ↑` ·
L4 `Noise(P + Noise3D(P)), offset` · L5 `freq 20, amp 0.2`. → `Convert VDB (iso 0.1–1.2)`.

### Blender / raea translation
GN on a dense mesh (then Voxel Remesh), each layer a `Set Position [Offset]`:
- L1 facets: `Noise Texture (3D, Detail 4) [Fac] - 0.5 -> Combine XYZ (same value in X, Y, Z) × 0.3 ~` (one float on all axes = planar facets)
- L2: `Noise Texture (Ridged Multifractal ~ for Alligator) [Color] - 0.5 × 0.01 ~` (4.1+ Noise types: fBM, Multifractal, Ridged Multifractal, Hybrid Multifractal, Hetero Terrain)
- L3: same with `Roughness` ↑ (0.7 ~), `Detail` ↑
- L4: `Position + (Noise Texture [Color] - 0.5) × s -> [Vector] of Noise Texture` (or the Noise Texture `Distortion` input)
- L5: `Noise Texture (Scale ~20, Roughness 0.8) × 0.005 ~ along Normal`
raea: no runtime equivalent; bake to GLB and render with `<Model>`. Build-time: sum the same terms inside one
`manifold.levelSet` SDF function.

## NOTES
- Houdini "Alligator" has no exact Blender twin; Ridged Multifractal or Voronoi-based ridges are the closest (~).
- Old Musgrave Texture → Noise Texture with type (4.1+).
- Visual gap: most amplitudes were set by eye ("too much", "something like that"); only spoken numbers are listed.
- Pushing pieces too hard loses the crack lines between fracture pieces — the course's own v1 kept them by using less noise.
