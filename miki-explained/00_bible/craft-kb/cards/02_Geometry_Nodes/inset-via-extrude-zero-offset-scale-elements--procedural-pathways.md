---
title: Fake an Inset Faces with Extrude Mesh (offset 0) + Scale Elements on the top selection
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/GEOMETRY NODES Blender 4  Tutorial Procedural Pathways  (Step by Step).txt"
source_time: "11:56–12:30"
tool_target: raea
tier: principle
use_when: "a procedural mesh needs an inset (a shrunk duplicate face with a gap ring around it, like beveled tile grout lines or a recessed panel) and the node tree has no native Inset node"
style_fit: "Pure build-time node-plumbing workaround; the resulting gap geometry is also reusable as a mask for a second pass (see the paving-shapes card's gap scatter)."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Extrude Mesh offset=0, Scale Elements) | Geometry Nodes → bake → GLB

## CREATIVE_INTENT
Geometry Nodes has no dedicated Inset Faces node. **Extrude Mesh** with its offset set to **0** still creates the
new top faces and a selection output for them, without actually extruding upward; feeding that **Top** selection
into **Scale Elements** (scaled down, e.g. 0.9–0.95) shrinks only those new faces toward their own centres — the
combination behaves exactly like an inset, and the untouched offset=0 means no unwanted height change.

## STE_PROCEDURE
1. Add **Extrude Mesh**; set **Offset Scale** (or the offset value) to **0** — this still generates new top faces
   and a boolean **Top** selection output, without visibly extruding.
2. Add **Scale Elements**; feed the mesh through it and plug Extrude Mesh's **Top** output into its **Selection**.
3. Set Scale Elements' domain to Face and its scale value below 1 (e.g. 0.9–0.95) — only the selected top faces
   shrink toward their own centre, leaving a gap ring = the inset.
4. For variation, drive the scale value with a Random Value (Float, e.g. 0.9–0.95) instead of a constant, so every
   inset gap is a slightly different width.
5. Keep Extrude Mesh's **Top** selection available downstream — it's also the mask needed later to separate "the
   blocks" from "the gaps" (Separate Geometry, Face domain, this selection and its inverse).

## AGENT_EXECUTION
```python
ext = N.new("GeometryNodeExtrudeMesh"); ext.inputs["Offset Scale"].default_value = 0.0
rv = N.new("FunctionNodeRandomValue"); rv.data_type = 'FLOAT'
rv.inputs["Min"].default_value = 0.9; rv.inputs["Max"].default_value = 0.95
scale = N.new("GeometryNodeScaleElements"); scale.domain = 'FACE'
L.new(ext.outputs["Mesh"], scale.inputs["Geometry"])
L.new(ext.outputs["Top"], scale.inputs["Selection"])
L.new(rv.outputs["Value"], scale.inputs["Scale"])
```
raea: no mesh-editing nodes — bake the inset result to GLB at build time. For a flat 2D "inset panel" look (e.g. a
UI card with a recessed sub-panel), there is a direct raea equivalent: a slightly smaller, inset `<div>`/rect
layer with its own shadow — no mesh trick needed in 2D.

### Worked example
Topic: "Jubin kedai nampak ada gap kecil antara setiap satu — kenapa?" (illustrative tile-grout note).
BEFORE: `| 3 | "ada gap kecil" | flat tiles with no visible seams | tiles fade in | — |` — reads as one solid slab, not individual tiles.
AFTER: `| 3 | "ada gap kecil" | each tile face: Extrude Mesh offset 0 → Scale Elements on the Top selection, scale 0.9–0.95 randomised per tile — produces a grout-gap ring per tile without a native inset node | tiles fade in with visible seams, 0.4 s | inset-via-extrude-zero-offset-scale-elements--procedural-pathways |`

### Check
- Is Extrude Mesh's offset left at exactly 0 (confirming no unwanted height change sneaks in)?
- Does Scale Elements use the Top selection specifically (not all faces, which would shrink the whole mesh)?
- Is the scale value randomised per-face rather than one fixed number, if variety is wanted?

## NOTES
- Visual gaps: none — the creator states directly "unfortunately Blender and geometry nodes at present doesn't
  have an inset node, so we have to create a [workaround]".
- Rule conflict: none.
