---
title: Simple shapes + a good texture (archway from half a circle, pillars, stairs, tiles)
bucket: 03_Modeling_Modifiers
source: "5 Ways to Create Better Environments in Blender.txt"
source_time: "10:14–11:18"
blender_version_source: n/a?
tool_target: Blender bpy
tier: full
style_fit: Good for background architecture and set pieces; the macro hero still needs real detail (test-stills-too-basic).
---

## METADATA
03_Modeling_Modifiers | n/a → 4.2+ | Blender bpy

## CREATIVE_INTENT
Most environment modelling can be simple shapes stuck together with a convincing texture on them. An archway is half a circle stretched down and extruded, plus two plain pillars and a rock texture. It is quick, usable and reads well in a render.

## STE_PROCEDURE
1. Add a Mesh Circle (Vertices ~32).
2. In Edit Mode, delete the bottom half of the vertices.
3. Select the two end vertices; move them straight down (Z ~-1.0) to form the arch legs.
4. Extrude the whole edge loop along Y (depth ~0.4) to make it 3D.
5. Add a Solidify modifier (Thickness ~0.3) to give the arch wall thickness.
6. Add two simple pillars (Cylinder or Cube) under the legs.
7. Apply a rock / stone PBR texture with correct real-world scale.

## AGENT_EXECUTION
```python
import bpy, bmesh, math
bpy.ops.mesh.primitive_circle_add(vertices=32, radius=1.0, location=(0, 0, 1.0))
arch = bpy.context.active_object; arch.name = "Arch"
bpy.ops.object.mode_set(mode='EDIT')
bm = bmesh.from_edit_mesh(arch.data)
bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.z < -1e-4], context='VERTS')
ends = [v for v in bm.verts if abs(v.co.z) < 1e-4]
for v in ends: v.co.z = -1.0                                   # ~ legs down
edges = bm.edges[:]
ext = bmesh.ops.extrude_edge_only(bm, edges=edges)
bmesh.ops.translate(bm, verts=[e for e in ext["geom"] if isinstance(e, bmesh.types.BMVert)], vec=(0, 0.4, 0))  # ~ depth
bmesh.update_edit_mesh(arch.data); bpy.ops.object.mode_set(mode='OBJECT')
arch.rotation_euler.x = math.radians(90)
sol = arch.modifiers.new("Solidify", 'SOLIDIFY'); sol.thickness = 0.3   # ~
for x in (-1.15, 1.15):
    bpy.ops.mesh.primitive_cube_add(location=(x, 0, 0.0)); p = bpy.context.active_object
    p.scale = (0.15, 0.25, 1.0)                                   # ~ pillar
```
Note: the circle is created in the XY plane; the rotation stands it up. Values marked `~` are not given in the video.
raea: export to GLB, load with `<Model>`; or build directly with Manifold: `manifold.box(...).minus(manifold.cylinder(...))` for an arch opening (meshes.md).

## NOTES
- Deprecated: none.
- Visual gaps: exact vertex counts, depth and texture choice not spoken ("some random rock texture from Quixel").
- Rule conflicts: none. Simple shapes are fine for set pieces; never for the macro hero (test stills were rejected as "basic shapes").
