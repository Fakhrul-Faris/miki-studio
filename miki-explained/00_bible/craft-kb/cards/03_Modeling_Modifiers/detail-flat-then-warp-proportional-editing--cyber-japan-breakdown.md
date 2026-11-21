---
title: Detail it flat, then warp — multi-object proportional editing (Sharp falloff) for upswept roof corners
bucket: 03_Modeling_Modifiers
source: "Cyber Japan Art Breakdown  Blender.txt"
source_time: "07:41–09:24, 16:35–20:18"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Organic curve on a detailed hard-surface hero (curved canopy, bent sign, warped packaging) without losing the arrayed detail.
---

## METADATA
03_Modeling_Modifiers | 3.x source → 4.2+ code | Blender bpy

## CREATIVE_INTENT
Arrays and trims are easy in straight lines and hard on curves. So model everything flat and squared off first, add all the
detail, then bend the whole set of loose parts at once with proportional editing. The curve stays subtle — check the reference.

## STE_PROCEDURE
1. Start from a plane; inset it and pull it into a basic pyramid (roof base) by eye from the reference.
2. Add all detail on the flat, unwarped version (tiles, ridges, trims) as separate loose objects.
3. Before you warp, add loop cuts along every part that must bend (source: ~7 cuts per side); two-vertex spans cannot curve.
4. Select all the loose parts and enter Edit Mode together (multi-object editing).
5. Deselect all; select the same corner point on each corner (the top point of each corner piece).
6. Enable Proportional Editing; set Falloff = Sharp.
7. Move up on Z (`G Z`); scroll to set the proportional radius.
8. If straight unbent lines show, a part lacks loop cuts — add them and redo.
9. Match the slope to the reference: keep it subtle and flat in the middle.
10. After warping, add more detail only if needed.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
parts = [o for o in bpy.context.selected_objects if o.type == 'MESH']
for o in parts:                                              # loop cuts first (per part, ~7)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.subdivide(number_cuts=7)                    # ~ substitute for manual loop cuts
    bpy.ops.object.mode_set(mode='OBJECT')
for o in parts: o.select_set(True)
bpy.ops.object.mode_set(mode='EDIT')                         # multi-object edit
# select corner tip vertices (per-object via bmesh, e.g. highest-z vertex per corner), then:
bpy.ops.transform.translate(value=(0, 0, 0.25),              # ~ subtle lift
    use_proportional_edit=True, proportional_edit_falloff='SHARP', proportional_size=1.5,   # ~
    use_proportional_connected=False)
```
- Optional: store the corner points in a vertex group to reselect (`bpy.ops.object.vertex_group_assign`).

### raea
- raea: no equivalent at build time. (Runtime warps of TSX-built shapes exist via Manifold `.warp()` in `meshes.md`, not for glTF models.)

## NOTES
- Visual gaps: roof base proportions (08:42–09:18) and the final sag are judged against the reference on screen.
- `bpy.ops.mesh.subdivide` is a scripting stand-in for loop cuts; it adds cross cuts too — fine for warping, heavier for real-time. Prefer targeted loop cuts on hero assets.
- Rule conflicts: none.
