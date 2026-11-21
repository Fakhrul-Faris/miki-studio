---
title: Pipe-cluster kit piece — ringed cylinders (edge loop → bevel → Alt+E) shared by Link Object Data
bucket: 03_Modeling_Modifiers
source: "How to Add Tons of Detail To Your Renders  Blender.txt"
source_time: "03:14–05:56"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: A fast, low-poly repeat piece for industrial or back-of-house dressing (a kitchen's pipes, a pump's plumbing) around a macro hero; linked data keeps the GLB small.
---

## METADATA
03_Modeling_Modifiers | 4.x source → 4.2+ code | Blender bpy

## CREATIVE_INTENT
One small platform with a few parallel pipes of different sizes. Each pipe gets the same raised rings (edge loops bevelled
and pushed out along normals), and a little bracket holds them. Then all the pipes share one mesh, so changing one
changes them all.

## STE_PROCEDURE
1. Add a flat Cube as a small working platform.
2. Add a Cylinder; rotate it to lie horizontal (one main pipe); shrink it slightly.
3. Duplicate it into 4–5 pipes of different sizes (several small ones, one above, one at a different angle).
4. Select all the pipes; Shade Auto Smooth.
5. In Edit Mode add edge loops across the main pipe.
6. Bevel the loops with Segments = 1.
7. Use Extrude Faces Along Normals (`Alt+E`) to push the bevelled bands outward → rings.
8. Make the other pipes share that mesh: select them, main pipe active, Link/Transfer Data → Link Object Data (`Ctrl+L`).
9. Add edge loops on the platform to match the rings; bevel; extrude the top faces up slightly.
10. Encase the sides: extrude the platform's side faces out and up, add a loop cut, and mirror it across (messy geometry is acceptable).
11. Make a holder: a thin Cube; Apply Scale; select its faces; Inset (`I`, `I` again = individual faces); `Alt+E` inward.
12. Duplicate the holder a few times along the pipes, somewhat at random.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy, math
bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=0.15, depth=3, rotation=(0, math.radians(90), 0))
main = bpy.context.object; main.name = "pipe_main"
bpy.ops.object.shade_auto_smooth()                                  # 4.1+ (adds Smooth by Angle)
bpy.ops.object.mode_set(mode='EDIT')
# rings: cut 3 loops along the length, bevel 1 seg, push out
bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.mesh.loopcut_slide(MESH_OT_loopcut={"number_cuts": 3, "edge_index": 0})          # edge_index ~: a lengthwise edge
bpy.ops.mesh.bevel(offset=0.03, segments=1, affect='EDGES')                               # ~
bpy.ops.mesh.extrude_region_shrink_fatten(TRANSFORM_OT_shrink_fatten={"value": 0.02})    # Alt+E, ~
bpy.ops.object.mode_set(mode='OBJECT')
# copies share the ringed mesh (Ctrl+L → Link Object Data)
for i, (y, z, s) in enumerate([(0.4, 0, 0.6), (-0.4, 0, 0.6), (0, 0.5, 0.45)]):           # ~ placements / sizes
    c = main.copy(); c.data = main.data; c.location = (0, y, z); c.scale = (s, s, 1)
    bpy.context.scene.collection.objects.link(c)
# (operator form) bpy.ops.object.make_links_data(type='OBDATA') with the copies selected, main active
# holder
bpy.ops.mesh.primitive_cube_add(size=0.4); h = bpy.context.object; h.scale = (0.1, 1, 0.6)
bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.mesh.inset(thickness=0.02, use_individual=True)                                   # ~
bpy.ops.mesh.extrude_region_shrink_fatten(TRANSFORM_OT_shrink_fatten={"value": -0.015})  # ~ pull in
bpy.ops.object.mode_set(mode='OBJECT')
```
- Linked meshes export once to glTF and are instanced by node, so the GLB stays small.

### raea
- raea: no equivalent (built in Blender; plays inside the set `.glb` via `<Model>` / BlendShot).

## NOTES
- Deprecated: "Shade Auto Smooth" is one operator in 4.1+ (`shade_auto_smooth`, Smooth by Angle modifier); pre-4.1 it
  was Shade Smooth + Mesh → Auto Smooth. glTF export evaluates the modifier (`export_apply=True` in blend2raea).
- Scale ≠ 1 on linked copies scales the rings too. If ring sizes must stay equal, scale only on the pipe's length axis.
- Visual gaps: pipe count and sizes, loop positions and bevel widths are on screen only (`~`). Side-casing steps (04:44–05:14) are narrated by keypress only.
- Rule conflicts: none.
