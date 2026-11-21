---
title: Fast hard-surface stack — Mirror → Solidify → Subdivision (Simple) → Subdivision (Catmull-Clark) → Weighted Normal
bucket: 03_Modeling_Modifiers
source: "The Power of MODIFIERS in Blender!.txt"
source_time: "01:31–01:38, 02:10–02:40, 05:36–06:06"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Quick way to block and refine Style D hero shells (cases, lids, trays, cards) symmetrically with thickness and soft edges.
---

## METADATA
03_Modeling_Modifiers | 3.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
One stack turns a flat half-plane into a thick, symmetric, softly rounded hard-surface part that you shape by extruding, insetting and moving a few vertices. It is for quick iteration and visualisation while modeling.

## STE_PROCEDURE
1. Add a Plane.
2. Add a loop cut down the middle (Ctrl+R) and delete the right half.
3. Add a Mirror modifier to restore the half (one axis; up to three axes — a symmetric cube needs only 1/8 modeled).
4. Add a Solidify modifier to give it thickness.
5. Add a Subdivision Surface modifier with Ctrl+2 and set it to Simple.
6. Add a second Subdivision Surface modifier manually; leave it on Catmull-Clark.
7. Finish the stack with a Weighted Normal modifier.
8. Shape the plane in Edit Mode: extrude (E), inset (I) and transform; the stack updates live.
9. Use Ctrl+1 / Ctrl+2 / Ctrl+3 to add a Subdivision Surface with 1, 2 or 3 levels on any object.
10. Keep topology clean under subdivision; use Weighted Normal for remaining shading issues.

## AGENT_EXECUTION
```python
import bpy
bpy.ops.mesh.primitive_plane_add(size=0.1)                 # ~ macro scale
obj = bpy.context.active_object
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.mesh.bisect(plane_co=(0, 0, 0), plane_no=(1, 0, 0), clear_outer=True)  # loop cut + delete right half
bpy.ops.object.mode_set(mode='OBJECT')

mir = obj.modifiers.new("Mirror", 'MIRROR')
mir.use_axis = (True, False, False)        # (True, True, True) for 1/8-modeled symmetric objects
mir.use_clip = True; mir.use_mirror_merge = True

sol = obj.modifiers.new("Solidify", 'SOLIDIFY')
sol.thickness = 0.005                      # ~
sol.offset = -1.0

bpy.ops.object.subdivision_set(level=2, relative=False)   # Ctrl+2
obj.modifiers[-1].subdivision_type = 'SIMPLE'
sub2 = obj.modifiers.new("Subdivision.001", 'SUBSURF')
sub2.subdivision_type = 'CATMULL_CLARK'; sub2.levels = 1; sub2.render_levels = 2   # ~ levels not given

bpy.ops.object.shade_smooth()
wn = obj.modifiers.new("WeightedNormal", 'WEIGHTED_NORMAL'); wn.keep_sharp = True
```
Why the Simple pass first (inferred `~`): it adds even geometry so the Catmull-Clark pass rounds the edges less, keeping a tighter hard-surface look.

raea: no modifier stack at render; export the evaluated GLB. Code-side analogue in Manifold (meshes.md): model half, `half.union(half.mirror(1, 0, 0))`; thickness by `shell = body.minus(body.scale(0.9))` (as the vase example); soft edges with `.smooth({ angle, refine })`.

## NOTES
- Video gives no thickness or level values for the second subdivision; `~` above.
- Deprecated: 4.1+ removed Auto Smooth; Weighted Normal works on smooth-shaded meshes without it.
- Visual gaps: the shaping after the stack (05:56–06:06) is shown, not described.
- Rule conflicts: none.
