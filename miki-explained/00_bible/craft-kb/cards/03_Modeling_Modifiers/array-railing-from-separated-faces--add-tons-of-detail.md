---
title: Railing from duplicated faces — separate rails, one post + Array modifier, join, keep a spare
bucket: 03_Modeling_Modifiers
source: "How to Add Tons of Detail To Your Renders  Blender.txt"
source_time: "05:56–08:35"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: Generic repeat piece for platforms, counters and stairs in a set; fine low-poly detail that reads at a distance and stays crisp out of the DoF.
---

## METADATA
03_Modeling_Modifiers | 4.x source → 4.2+ code | Blender bpy

## CREATIVE_INTENT
A railing that fits a platform exactly: take the platform's own edge face as the rail, so it is the right length, stack
copies for the bars, and array one small post along it. Join everything into one object, and keep a spare copy in the
kit for other pieces.

## STE_PROCEDURE
1. Add a Cube and flatten it into a platform.
2. In Edit Mode, select the platform's long side face; Duplicate (`Shift+D`) and move it up.
3. Separate it (`P` → Selection); Set Origin → Origin to Geometry.
4. Duplicate the rail up 1–2 times for the middle bars; put one at the top.
5. Extrude the top rail outward slightly to make a handrail.
6. Make a post: duplicate any small face, separate it, extrude it twice and scale it (or just add a small Cube); Origin to Geometry.
7. Place the post at the end of the railing; rotate it to line up along the rail.
8. Add an Array modifier to the post; set Count ≈ 20+ and adjust the offset so the posts nearly span the rail.
9. Leave a gap at the end so the railing connects cleanly when joined.
10. Before you join, apply all modifiers (in the source the join went wrong until they were applied); make one object active.
11. Join the parts (`Ctrl+J`) into one railing.
12. Mirror a copy across the platform (Scale −1 on one axis) for the far side.
13. Duplicate one railing aside as a spare kit piece; Apply Scale.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
plat = bpy.context.object                                         # the platform
bpy.ops.object.mode_set(mode='EDIT')
# select the long side face first (e.g. via bmesh: face with max normal.y), then:
bpy.ops.mesh.duplicate_move(TRANSFORM_OT_translate={"value": (0, 0, 0.5)})    # ~ rail height
bpy.ops.mesh.separate(type='SELECTED'); bpy.ops.object.mode_set(mode='OBJECT')
rail = [o for o in bpy.context.selected_objects if o != plat][0]
bpy.context.view_layer.objects.active = rail; bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY')
# post + array
bpy.ops.mesh.primitive_cube_add(size=0.05); post = bpy.context.object; post.scale.z = 10   # ~ post height
arr = post.modifiers.new("Array", 'ARRAY'); arr.count = 22                               # ~ "20 something"
arr.use_relative_offset = True; arr.relative_offset_displace = (6.0, 0, 0)               # ~ spacing to span the rail
# apply + join
for o in (post, rail):
    bpy.context.view_layer.objects.active = o
    for m in list(o.modifiers): bpy.ops.object.modifier_apply(modifier=m.name)
bpy.ops.object.select_all(action='DESELECT'); post.select_set(True); rail.select_set(True)
bpy.context.view_layer.objects.active = rail; bpy.ops.object.join()
spare = rail.copy(); spare.data = rail.data.copy(); spare.location.x += 5; bpy.context.scene.collection.objects.link(spare)
```
- Mirror copy: `m = rail.copy(); m.scale.y = -1` then `bpy.ops.object.transform_apply(scale=True)` and Mesh → Normals → Recalculate Outside (negative scale flips normals).

### raea
- raea: no equivalent (Blender modelling; plays via the set `.glb`).
- Thin posts shimmer under SMAA (post.md: with `<AmbientOcclusion>`, MSAA is replaced by SMAA). Keep posts ≥ ~2 px wide
  in frame, or keep them inside the DoF blur.

## NOTES
- STT fix: "scale it by 1 … flip it around" = scale by −1.
- Visual gaps: post and rail dimensions and the exact faces picked are on screen only (`~`).
- Negative scale + Apply flips normals. Always recalculate before glTF export, or the back-faces render dark in raea.
- Rule conflicts: none.
