---
title: Bevel segment count — 2 under Subdivision, even numbers (2/4/6) so loops dissolve into a low-poly version
bucket: 03_Modeling_Modifiers
source: "The Trick that will Make Your 3D Models 10X Better!.txt"
source_time: "08:16–08:51, 09:52–10:50"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: Keeps hero GLBs light for raea (budgets: GLB under ~20 MB) while the close camera still sees smooth edges.
---

## METADATA
03_Modeling_Modifiers | 4.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
More bevel segments cost geometry fast and, under a Subdivision Surface modifier, add nothing visible. Use 2 segments when subdividing, and always an even count so a middle edge loop can be dissolved to make a cheaper version of the same model.

## STE_PROCEDURE
1. When a Subdivision Surface modifier follows, set bevel Segments = 2; the subdivision does the rest of the smoothing.
2. Without subdivision, use 4, or 6 only if really needed.
3. Always pick an even segment count.
4. To make a lower-poly version, select a bevel's middle edge loop (Alt+click) and dissolve it with Ctrl+X.
5. Check the polygon count after each bevel pass; counts climb fast above 2–4 segments.

## AGENT_EXECUTION
```python
import bpy
obj = bpy.context.active_object
# bevel with even segments under a subdivision
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.bevel(affect='EDGES', offset=0.003, segments=2, clamp_overlap=True)   # ~ width
# low-poly variant: dissolve the selected middle loop (Ctrl+X = Dissolve Mode)
# (select loop: Alt+click → bpy.ops.mesh.loop_multi_select(ring=False) on a selected edge)
bpy.ops.mesh.dissolve_mode(use_verts=False)
bpy.ops.object.mode_set(mode='OBJECT')

# polygon count check
me = obj.evaluated_get(bpy.context.evaluated_depsgraph_get()).to_mesh()
print("faces after modifiers:", len(me.polygons))
```
raea: no equivalent (geometry density is decided before export). Watch limits.md: keep a `.glb` under about 20 MB.

## NOTES
- The video shows the geometry cost of 2 vs 4+ segments as on-screen numbers only (visual gap).
- Deprecated: none.
- Rule conflicts: none.
