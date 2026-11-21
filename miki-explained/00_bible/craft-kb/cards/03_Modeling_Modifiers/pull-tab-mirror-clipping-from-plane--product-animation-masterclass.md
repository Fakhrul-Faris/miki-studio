---
title: Pull tab from a plane — half-model with Mirror + Clipping, then apply and thicken; rivet via Extrude Along Normals
bucket: 03_Modeling_Modifiers
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "10:27–18:20, 19:31–20:30"
blender_version_source: 4.3
tool_target: Blender bpy
tier: full
style_fit: Small believable detail on the hero object that rewards a macro close-up (Style D "everyday object at macro detail").
---

## METADATA
03_Modeling_Modifiers | Blender 4.3 | Blender bpy

## CREATIVE_INTENT
A symmetric flat part (can pull tab, clip, key tag, buckle) drawn as half an outline from a top-view reference, mirrored live,
then thickened and subdivided. The small hole, rivet and raised rim are what make the macro shot read as a real object.

## STE_PROCEDURE
1. Add a Plane over the top reference (Numpad 7); scale it thin (`S X`, `S Y`) at the tab's start.
2. Add a loop cut down the middle (`Ctrl+R`), delete one half, and add a Mirror modifier.
3. Trace the outline using only Extrude (`E`), Rotate (`R`) and Scale (`S`), constraining with `X`/`Y`; follow the reference curvature at every step.
4. Where an edge must be straight, flatten it with `S X 0`.
5. Enable Mirror › Clipping so centre vertices stop at the mirror plane.
6. Add loop cuts where the outline bends so the curve follows the reference.
7. Model the inner hole (where the rivet ring passes) by scaling an inner edge loop inward with `E` + `S`; keep quads (no triangles where loops cross).
8. Before you apply the mirror, back up the object: `M` › New Collection "backup can", hide it.
9. Add Subdivision Surface (`Ctrl+3`), then apply the Mirror.
10. Thicken: `E` the outline up, add a loop cut (`Ctrl+R`) and scale it on Z for a soft rolled edge; Shade Smooth.
11. Add slight warp: loop cut + `G Z` where the tab rises; select the dent loops, move down, crease (`Shift+E`).
12. Rivet: add a small Cylinder, loop cut (`Ctrl+R`) and slide up (`G G`); select the top part and Extrude Along Normals (`Alt+E`); scale up slightly and settle on Z.
13. Join the tab and rivet to the can (`Ctrl+J`) when they will never animate separately.

## AGENT_EXECUTION
- Blender:
```python
bpy.ops.mesh.primitive_plane_add(size=0.2, location=(0, 0, 1.0))
tab = bpy.context.object
m = tab.modifiers.new("Mirror", 'MIRROR'); m.use_axis = (True, False, False); m.use_clip = True
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.extrude_region_move(TRANSFORM_OT_translate={"value": (0, 0.02, 0)})   # E, then R / S by eye
bpy.ops.transform.resize(value=(0, 1, 1))                                          # S X 0
bpy.ops.object.mode_set(mode='OBJECT')
bpy.ops.object.subdivision_set(level=3)                                            # Ctrl+3
bpy.ops.object.modifier_apply(modifier="Mirror")
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.extrude_region_shrink_fatten(TRANSFORM_OT_shrink_fatten={"value": 0.002})  # Alt+E Extrude Along Normals
bpy.ops.object.mode_set(mode='OBJECT')
# join: select tab, rivet, can (active last)
bpy.ops.object.join()                                                              # Ctrl+J
```
- raea: no equivalent (modeling). Export joined GLB; if the tab must move on a word (open the can), keep it a separate named
  node and animate it in raea via `<Entity name="tab" transform>` around a sub-model, or export a glTF animation clip.

## NOTES
- Deprecated: none.
- Visual gaps: the whole outline is traced by eye; extrude/rotate amounts are not given.
- STT fixes: "alt C … sx0" = `S X 0`; "alt s uh no alt e" = `Alt+E` (Extrude Faces Along Normals); "GG" = edge/vertex slide.
- Rule conflicts: none. Note joining stops later per-part animation; keep the tab separate if a script line opens the can.
