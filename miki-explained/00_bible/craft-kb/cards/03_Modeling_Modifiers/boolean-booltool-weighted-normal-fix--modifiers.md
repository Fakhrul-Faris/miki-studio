---
title: Boolean cuts (via Bool Tool) followed by a Weighted Normal modifier to fix the shading
bucket: 03_Modeling_Modifiers
source: "The Power of MODIFIERS in Blender!.txt"
source_time: "01:09–01:31, 02:31–02:40"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Useful for hero details (slots, holes, card readers, vents) on Style D objects; Weighted Normal keeps the cut surfaces clean under a raking top light.
---

## METADATA
03_Modeling_Modifiers | 3.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
Boolean modifiers cut or merge shapes non-destructively, but they leave long thin faces that shade badly. A Weighted Normal modifier at the end of the stack makes the large flat faces shade flat again without re-topologising.

## STE_PROCEDURE
1. Enable the Bool Tool add-on (4.2+: install the Bool Tool extension) for quick boolean shortcuts.
2. Select the cutter, then the target; run Bool Tool → Difference (or Union / Intersect).
3. Or add a Boolean modifier on the target: Operation = Difference, Object = the cutter.
4. Hide the cutter in renders and show it as Wire or Bounds.
5. Shade the target smooth.
6. Add a Weighted Normal modifier as the last modifier.

## AGENT_EXECUTION
```python
import bpy
target = bpy.data.objects["Hero"]          # ~ names
cutter = bpy.data.objects["Cutter"]
b = target.modifiers.new("Boolean", 'BOOLEAN')
b.operation = 'DIFFERENCE'                 # 'UNION' | 'INTERSECT'
b.object = cutter
b.solver = 'EXACT'                         # 4.x: 'FAST' | 'EXACT' (5.0 adds 'MANIFOLD')
cutter.display_type = 'WIRE'; cutter.hide_render = True

bpy.context.view_layer.objects.active = target
bpy.ops.object.shade_smooth()
wn = target.modifiers.new("WeightedNormal", 'WEIGHTED_NORMAL')
wn.mode = 'FACE_AREA'; wn.weight = 50; wn.keep_sharp = True
```
- Bool Tool operator (add-on/extension): `bpy.ops.object.booltool_auto_difference()` with cutter selected and target active (`~` — name from the legacy add-on).

raea: Manifold booleans at build time — `a.minus(b)`, `a.union(b)`, `a.intersect(b)`, many at once `manifold.difference(first, ...cutters)` (meshes.md); no Weighted Normal pass exists in raea, so for a cut surface that must shade perfectly, cut in Blender and export the GLB.

## NOTES
- Deprecated: Bool Tool was a bundled add-on up to 4.1; from 4.2 it is an extension (extensions.blender.org). Pre-4.1 Weighted Normal needed Auto Smooth enabled.
- Visual gaps: none.
- Rule conflicts: none.
