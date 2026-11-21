---
title: Panelled walls in one pass — loop cuts, inset all faces, Extrude Faces Along Normals
bucket: 03_Modeling_Modifiers
source: "How to Add Tons of Detail To Your Renders  Blender.txt"
source_time: "17:28–17:58"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: Turns a flat backdrop wall or a big flat face of a prop (a cabinet, a machine side) into raised panels that catch the top light. The hero surface stays real (texture), not panelled.
---

## METADATA
03_Modeling_Modifiers | 4.x source → 4.2+ code | Blender bpy

## CREATIVE_INTENT
Big flat walls are where detail runs out. Slice the wall into a grid with loop cuts, inset every face at once, and pull
all of them out along their normals. In seconds the back of the set has a raised panel rhythm that light and shadow can
read.

## STE_PROCEDURE
1. Select the wall object; enter Edit Mode.
2. Add several loop cuts across the wall's faces (`Ctrl+R`, scroll for count).
3. Select all the wall faces.
4. Before you inset, Apply Scale (`Ctrl+A` → Scale) so the inset border is even.
5. Inset Faces (`I`), individual (`I` again).
6. Extrude Faces Along Normals (`Alt+E`) and pull the panels out.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
w = bpy.context.object
bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.mesh.subdivide(number_cuts=4)                                         # ~ stands in for manual loop cuts (grid)
bpy.ops.mesh.inset(thickness=0.05, use_individual=True)                       # ~
bpy.ops.mesh.extrude_region_shrink_fatten(TRANSFORM_OT_shrink_fatten={"value": 0.04})   # Alt+E, ~ outward
bpy.ops.object.mode_set(mode='OBJECT')
```
- To keep only one wall side panelled, select those faces by normal instead of `select_all` (bmesh: `f.normal.dot(axis) > 0.9`).

### raea
- raea: no equivalent (geometry is built in Blender). For a TSX-only backdrop, a normal-mapped panel texture on a
  `Cuboid` with `uv_transform={Affine2.fromScale([u, v])}` (materials.md) gives a similar read under a raking light,
  at no geometry cost.

## NOTES
- Visual gaps: cut count, inset width and extrude depth are on screen only (`~`).
- Panels need a raking or side light to read. Under a flat front light they vanish, so check them through the actual setup.
- Rule conflicts: none.
