---
title: Seamless sweep backdrop — plane, extrude the back edge up, bevel the corner
bucket: 03_Modeling_Modifiers
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "38:52–39:30, 53:52–54:20"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Partial — a studio infinity curve; Style D prefers a real surface (wood, stone) in a dark room. Use the sweep for clean product-only beats or as the "real surface" with a textured material.
---

## METADATA
03_Modeling_Modifiers | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
A cyclorama: floor and wall joined by a smooth bend so there is no horizon line behind the product. The camera can move and
the background stays a seamless gradient of light.

## STE_PROCEDURE
1. Add a Plane at the product's base; scale it wide on X so it fills the frame.
2. Make sure the product sits exactly on the plane (no gap, no clipping).
3. In Edit Mode select the back edge; extrude up on Z (`E Z`).
4. Select the corner edge; Bevel it (`Ctrl+B`) and scroll the mouse wheel to add segments until the bend is smooth.
5. Shade Smooth.
6. Give it a material; for a pure white sweep set Principled Base Color Value to 1.

## AGENT_EXECUTION
- Blender:
```python
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0)); bd = bpy.context.object
bd.scale = (3, 1, 1); bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_mode(type='EDGE')
# select the back edge (y max) via bmesh, then:
bpy.ops.mesh.extrude_region_move(TRANSFORM_OT_translate={"value": (0, 0, 1.0)})
# select the corner edge, then:
bpy.ops.mesh.bevel(offset=0.25, segments=8, affect='EDGES')      # ~ offset/segments by eye
bpy.ops.object.mode_set(mode='OBJECT'); bpy.ops.object.shade_smooth()
mat = bpy.data.materials.new("Backdrop"); mat.use_nodes = True
mat.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (1, 1, 1, 1)
bd.data.materials.append(mat)
```
- raea: export the sweep in the GLB, or build it with a large floor `Cuboid` + wall `Cuboid` and hide the seam with DoF
  (`<DepthOfField focal_distance aperture_f_stops={2.8} />` inside `<Camera3d>`). Material: `<StandardMaterial base_color="#f2f2f2" perceptual_roughness={0.8} />`.

## NOTES
- Deprecated: none.
- Visual gaps: bevel width/segment count are by eye.
- Rule conflicts: Style D is a dark room on a real surface; a white sweep is a deliberate exception (e.g. a clean "product
  card" beat). Keep one accent colour on the subject.
