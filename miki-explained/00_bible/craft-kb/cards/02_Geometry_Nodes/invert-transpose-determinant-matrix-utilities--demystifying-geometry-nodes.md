---
title: Invert / Determinant / Transpose matrix utilities — undo a transform, and check it's undoable first
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/Demystifying Geometry Nodes The Ultimate Guide to Mastering Blender's Procedural Power.txt"
source_time: "40:07–44:22"
tool_target: raea
tier: principle
use_when: "a custom rig needs to undo or 'borrow' a parent's transform (put a child back into world space, or re-derive a local offset) — rare, only for hand-built matrix rigs, not everyday prop placement"
style_fit: "Deep Blender-GN plumbing; no raea equivalent (raea never hand-builds matrices). Carried mainly so the agent recognises the vocabulary if a future course references it, and flags the one real gap: normals need special handling under shear."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Invert Matrix, Determinant, Transpose Matrix) | Blender build only

## CREATIVE_INTENT
Undoing a transform (take an object back to where it was before a matrix was applied, or go from a child's local
frame back to world space) needs that matrix's **inverse**. Whether an inverse exists at all depends on the
**determinant** — if it's zero, the matrix collapsed space (e.g. scaled an axis to 0) and can't be undone, so
Blender's Invert Matrix node has a boolean "is this invertible" output to check before trusting the result.
**Transpose** (rows become columns) is an ingredient of computing the inverse, not an undo on its own.

## STE_PROCEDURE
1. Before relying on an inverse, read the **Invert Matrix** node's boolean output — if false, the forward matrix
   is not reversible (commonly because a scale axis was set to exactly 0) and the rig needs a different approach.
2. Use **Invert Matrix** to go from a child's local-space value back to world space, or to "subtract" a known
   transform from a combined one.
3. Use **Transpose Matrix** only as a building block inside a larger matrix calculation (rows ↔ columns) — it is
   not itself an "undo".
4. For normals specifically: a plain inverse/transpose of the object's matrix is required to keep them
   perpendicular to the surface after a sheared transform (plain rotation does **not** preserve this) — Blender has
   no single dedicated "transform normal" node yet, so treat this as a known gap, not something to hand-roll.

## AGENT_EXECUTION
Blender GN: `FunctionNodeInvertMatrix` (check its boolean output before using the inverted matrix downstream);
`FunctionNodeTransposeMatrix` only inside a hand-built inverse/adjugate calculation.
```python
inv, is_invertible = invert_matrix(combined)
if not is_invertible:
    # a scale axis was likely 0 — fix the forward rig, don't trust this inverse
    ...
```
raea: no equivalent — raea never hand-builds or inverts matrices; `Transform3d` always stores plain
position/rotation/scale, so there is nothing to invert. If a future shot needs "undo this transform", just store
the pre-transform values and restore them, rather than computing an inverse.

### Worked example
Topic: internal rig note (not a script line) — a kit piece's shear rig from the shear card above needs to
"un-shear" a copy for a clean silhouette reference.
BEFORE: re-derive the un-sheared shape by hand-adjusting values until it looks right.
AFTER (NOTES field on the shear rig's build log): "Un-sheared copy = Invert Matrix of the shear's Combine Matrix,
applied to the sheared mesh; checked Invert Matrix's boolean output = true before trusting it (no axis was scaled
to 0)."

### Check
- Was the Invert Matrix boolean output checked before the inverse was trusted?
- Is Transpose used only as an ingredient, not mistaken for a standalone "undo"?
- Is the normals-under-shear gap flagged in NOTES rather than silently assumed fixed?

## NOTES
- Visual gaps: the adjugate/cofactor derivation (42:17–43:05) is stated, not derived on screen in detail — treat
  "Invert Matrix" and "Determinant" as black-box utility nodes Blender computes for you; don't hand-derive them.
- Known gap carried from the source: normals need a perpendicular-preserving transform under shear, and Blender
  has no dedicated node for it yet (source: "we don't have a dedicated node for it yet").
- Rule conflict: none.
