---
title: Randomly triangulate a percentage of quads, then Dual Mesh — mixed hexagon/organic paving shapes from a grid
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/GEOMETRY NODES Blender 4  Tutorial Procedural Pathways  (Step by Step).txt"
source_time: "08:46–10:46"
tool_target: raea
tier: principle
use_when: "a flat tiled/gridded surface (paving, floor panels, a diagrammatic tile layout) needs to look naturally irregular instead of a uniform grid, while still being even enough to read clearly"
style_fit: "Build-time-only mesh trick; reads as 'designed variety' per house anti-repetition preference, baked to GLB — never a live raea operation."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Triangulate, Random Value Boolean, Dual Mesh) | Geometry Nodes → bake → GLB

## CREATIVE_INTENT
A perfectly even quad grid reads as computer-made. Splitting a random subset of the quads into triangles first
(probability-controlled, not all-or-nothing), then running **Dual Mesh** (which turns each face into a vertex and
reconnects them) over the mixed tri/quad mesh produces an irregular pattern — part hexagon, part odd polygon —
instead of the perfectly even hexagon grid you'd get from an all-triangulated mesh.

## STE_PROCEDURE
1. On the gridded mesh (e.g. a path lofted from a curve), add **Triangulate**, Quad Method = **Beauty** (gives a
   nicer split than Fixed).
2. Drive Triangulate's **Selection** input with a **Random Value (Boolean)**, Probability ~0.5–0.6 (the source used
   ~60%) — this triangulates only that fraction of faces, leaving the rest as quads.
3. Add **Dual Mesh** after Triangulate; feed it the mixed tri/quad mesh.
4. Compare: muting the Random Value node (so *everything* is triangulated first) makes Dual Mesh output a uniform
   hexagon grid — useful for a different, more regular look; keeping the random mix gives the irregular
   "hexagon + odd house-shape" paving look.
5. Tune the probability and the underlying grid's row/column count together — more rows/columns with the same
   probability gives smaller, more numerous irregular stones.
6. Change the Random Value node's **Seed** to get a different arrangement without touching probability.

## AGENT_EXECUTION
```python
tri = N.new("GeometryNodeTriangulate"); tri.quad_method = 'BEAUTY'
rb = N.new("FunctionNodeRandomValue"); rb.data_type = 'BOOLEAN'
rb.inputs["Probability"].default_value = 0.6
L.new(grid_mesh, tri.inputs["Mesh"]); L.new(rb.outputs["Value"], tri.inputs["Selection"])
dual = N.new("GeometryNodeDualMesh")
L.new(tri.outputs["Mesh"], dual.inputs["Mesh"])
```
raea: no mesh-topology nodes — bake the resulting irregular paving mesh to GLB at build time. If a flat 2D version
is needed (a diagram, not a 3D floor), approximate the irregular-tile look in SVG/HyperFrames with a pre-authored
irregular tile set rather than attempting procedural triangulation in code.

### Worked example
Topic: "Lantai kedai runcit — kenapa jubin dia tak sekata semua?" (illustrative floor-pattern note).
BEFORE: `| 3 | "jubin tak sekata" | a perfectly even hexagon-tile floor | floor fades in | — |` — too uniform to read as "irregular".
AFTER: `| 3 | "jubin tak sekata" | grid Triangulate (Beauty) on ~60% of quads via Random Value Boolean, then Dual Mesh — mixed hexagon/irregular tile floor, seeded | floor fades in, 0.4 s, no pop | randomized-triangulate-dual-mesh-paving-shapes--procedural-pathways |`

### Check
- Is Triangulate's Selection driven by a Random Value Boolean (a probability), not applied to every face?
- Does Dual Mesh run after the mixed tri/quad selection (not on an all-triangulated or all-quad mesh, unless a
  uniform hexagon grid is the deliberate goal)?
- Was the seed changed (not the probability) to get a different arrangement when the first pass looks too similar
  across shots?

## NOTES
- Visual gaps: "about 60%" is an on-screen eyeballed value (`~0.6`), not stated as exact; re-tune per asset.
- Rule conflict: none; this directly serves the "break repetition" preference already in the house kit (see
  `cards/03_Modeling_Modifiers` break-repetition cards) applied at the mesh-topology level instead of instance level.
