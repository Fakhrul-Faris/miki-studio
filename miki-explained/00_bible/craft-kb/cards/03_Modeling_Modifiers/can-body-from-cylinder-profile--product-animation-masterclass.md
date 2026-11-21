---
title: Can body from a cylinder — follow the reference profile with Inset, Extrude and Scale
bucket: 03_Modeling_Modifiers
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "0:42–10:27, 18:20–19:05"
blender_version_source: 4.3
tool_target: Blender bpy
tier: full
style_fit: Builds the one real hero object at macro quality (Style D); the profile-following loop method gives the soft can curvature that reads under a close lens and shallow DoF.
---

## METADATA
03_Modeling_Modifiers | Blender 4.3 | Blender bpy

## CREATIVE_INTENT
A drinks can (or any lathed product: bottle, jar, cup) built from one cylinder whose edge loops are walked up the side of a
reference photo with Inset / Extrude / Scale, then softened by Subdivision Surface. Fast, clean quad topology that holds up in a
macro close-up; the screw-modifier lathe is the alternative the author skips because the cylinder is "just as easy".

## STE_PROCEDURE
1. Delete the default objects; add the product side photo as a Reference image, centred so the 3D cursor sits in the can's middle.
2. Add a Cylinder (`Shift+A` › Mesh › Cylinder).
3. In Edit Mode select the bottom face; press Numpad 3 (side view) and move it down to the reference base (`G Z`).
4. Before you trust the photo, note its perspective skew (camera looking down) — match one side only, and fix the other later.
5. Inset the bottom face (`I`, hold `Shift` for fine) to the base ring; inset again close to the edge; move it up a little (`G Z`) — can bases are indented.
6. Select the top ring; walk it up the profile: `E`, `S` to the outline, `G Z` — repeat at every change of curvature (seam, shoulder, neck).
7. For a rounded edge, add a short `E` + `S` pair in and back out again.
8. Add a Subdivision Surface modifier and Shade Smooth (Auto Smooth / Smooth by Angle); delete any edge loop that bunches the curve.
9. Add a top-view reference (Numpad 7), scaled to the can; toggle X-ray (`Alt+Z`) to model through the mesh.
10. With the subsurf off, model the lid: repeated `I` (inset) and `G Z` (down/up) for the rim, recess, and the central dimple; add loop cuts (`Ctrl+R`) where the profile bends.
11. Use `Ctrl+Numpad +` / `Ctrl+Numpad −` to grow/shrink a loop selection, and move single vertices (`G`) to match the outline.
12. For the recessed lid centre, delete the inner face (`X`), select the boundary loop (`Alt+click`), and use Grid Fill (Span ~9).
13. Smooth the filled area (Smooth Vertices tool), then re-position stray vertices.
14. Select a path with `Ctrl+Shift+click` (shortest path), inset and `G Z` to emboss the lid's rib.
15. Before final, sharpen edges that must read hard (the base edge, rib): select the loop and Edge Crease (`Shift+E`, ~0.5–0.8), or add a tight `Ctrl+R` support loop.
16. Save often (`Ctrl+S`).

## AGENT_EXECUTION
- Blender:
```python
import bpy, bmesh
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete()
bpy.ops.object.empty_add(type='IMAGE', location=(0,0,0), rotation=(1.5708,0,0))   # side reference
bpy.context.object.data = bpy.data.images.load("//ref/can_side.png")
bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=0.5, depth=2.0)        # scaled to real size later (see scale card)
can = bpy.context.object
bpy.ops.object.mode_set(mode='EDIT')
# per profile step (repeat with values read from the reference):
bpy.ops.mesh.inset(thickness=0.03, depth=0)                                    # I
bpy.ops.mesh.extrude_region_move(TRANSFORM_OT_translate={"value": (0, 0, 0.05)})  # E
bpy.ops.transform.resize(value=(0.97, 0.97, 1))                                # S
bpy.ops.mesh.loopcut_slide(MESH_OT_loopcut={"number_cuts": 1})                 # Ctrl+R
bpy.ops.mesh.fill_grid(span=9)                                                 # Grid Fill on the lid hole
bpy.ops.mesh.vertices_smooth(factor=0.5)
bpy.ops.transform.edge_crease(value=0.7)                                       # Shift+E ~
bpy.ops.object.mode_set(mode='OBJECT')
can.modifiers.new("Subsurf", 'SUBSURF').levels = 2
bpy.ops.object.shade_smooth()
```
  Export: apply/keep subsurf at level 2 on export (`export_apply=True`) so the GLB carries the smooth surface.
- raea: no equivalent for modeling (raea renders only). Load the exported GLB: `<Model src={staticFile("can.glb")} />`.
  For a quick stand-in only: `manifold` lathe-like solids (`meshes.md`) — not a substitute for the hero object.

## NOTES
- Deprecated: "Auto Smooth" in the Normals panel was removed in 4.1 → Object › Shade Auto Smooth (Smooth by Angle modifier).
- Visual gaps: almost every move is matched by eye to the reference ("drag around some vertices"); inset/extrude distances
  and the exact loop count are not stated. The tutorial's can is "the long can" from the author's Patreon reference.
- STT fixes: "GC/GZ" = `G Z`; "I and hold shift" = Inset with Shift precision; "contrl plus" = `Ctrl+Numpad +`.
- Rule conflicts: none.
