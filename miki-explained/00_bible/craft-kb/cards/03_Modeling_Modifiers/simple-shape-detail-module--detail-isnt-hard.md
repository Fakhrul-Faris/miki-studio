---
title: Detail module from one cube (edge loops, bevel, inset, extrude along normals, custom bevel profile)
bucket: 03_Modeling_Modifiers
source: "Detail Isn't Hard  Blender Tutorial.txt"
source_time: "09:34–15:08"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Fast way to make the small repeated parts (trim, pillars, brackets) that dress a macro hero's surroundings; reads as rich at macro range.
---

## METADATA
03_Modeling_Modifiers | 3.x source → 4.2+ code | Blender bpy

## CREATIVE_INTENT
Most "complex" pieces are a stretched cube with a few insets, extrusions and bevels. Build one such module, join it,
then duplicate it over itself to make the next-larger piece — detail grows by repetition, not by hard modelling.

## STE_PROCEDURE
1. Add a cube and scale it tall on Z (a pillar).
2. Add 2–3 horizontal edge loops (Loop Cut, `Ctrl+R`).
3. Bevel those edge loops (`Ctrl+B`) so each becomes a band.
4. Extrude the band faces (`E`), then scale them inward (`S`, `Shift+Z` = scale on X and Y only).
5. Inset faces (`I`), then use Extrude Faces Along Normals (`Alt+E`) to push or pull the inset.
6. Add a Bevel modifier (or bevel on the mesh) and set Profile Type = Custom; draw a wavy profile and raise Segments (values: unknown (visual only)).
7. Set the origin to geometry; place the 3D cursor on top of the pillar.
8. Add a second cube at the cursor; repeat edge loops → bevel → inward extrude → custom-profile bevel for a cap piece.
9. Duplicate the cap for the top and bottom; fill the middle with inset + `Alt+E` faces.
10. Before you join the parts, convert them to mesh (Object → Convert → Mesh) to apply all modifiers at once.
11. Join the parts (`Ctrl+J`) into one pillar.
12. Duplicate the pillar beside itself; bridge two pillars with a flat bevelled slab; duplicate the slab rotated 90°.
13. For a short variant, duplicate and scale the group down on Z; add a roof piece.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy, bmesh
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
p = bpy.context.object; p.scale = (0.3, 0.3, 2.0)                    # ~ proportions
bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.select_all(action='DESELECT')
bpy.ops.mesh.loopcut_slide(MESH_OT_loopcut={"number_cuts": 3, "edge_index": 1})   # edge_index ~: pick a vertical edge
bpy.ops.mesh.bevel(offset=0.03, segments=1, affect='EDGES')                       # ~ band width
bpy.ops.mesh.extrude_region_shrink_fatten(TRANSFORM_OT_shrink_fatten={"value": -0.02})  # Alt+E, ~ depth
bpy.ops.mesh.inset(thickness=0.02, use_individual=True)                            # ~
bpy.ops.mesh.extrude_region_shrink_fatten(TRANSFORM_OT_shrink_fatten={"value": 0.015})
bpy.ops.object.mode_set(mode='OBJECT')
m = p.modifiers.new("Bevel", 'BEVEL')
m.width = 0.01; m.segments = 6; m.limit_method = 'ANGLE'                           # ~
m.profile_type = 'CUSTOM'
prof = m.custom_profile                                                            # CurveProfile: add wave points
for x, y in [(0.25, 0.6), (0.5, 0.35), (0.75, 0.7)]:                               # ~ "squiggly line"
    prof.points.add(x, y)
prof.update()
# apply all modifiers on selected parts, then join
bpy.ops.object.convert(target='MESH')
bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY')
bpy.ops.object.join()           # with all parts selected, pillar active
```
- `Shift+Z` scale = `bpy.ops.transform.resize(value=(k, k, 1))`.

### raea
- raea: no equivalent (modelling happens in Blender; the result plays as part of the set `.glb` via `<Model>`/BlendShot).
  For simple rounded/bevelled solids authored in TSX, Manifold solids exist (`meshes.md`), but not this edit-mode workflow.

## NOTES
- Deprecated: none named. Custom bevel profile UI is the same in 4.x (`profile_type='CUSTOM'`).
- Visual gaps: 10:51–14:26 the exact edges selected and all widths/segments are only visible on screen; all values above are `~`.
- Keep modules low-poly enough for real-time: custom-profile bevels multiply triangles; budget a hero set, not every background pillar.
