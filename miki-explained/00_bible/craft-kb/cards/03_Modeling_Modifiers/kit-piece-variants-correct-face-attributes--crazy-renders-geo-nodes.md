---
title: Kit piece + quick variants with Correct Face Attributes (texture doesn't stretch)
bucket: 03_Modeling_Modifiers
source: "How To Make Crazy Renders With Easy Geometry Nodes.txt"
source_time: "01:48–02:43, 04:22–05:04"
blender_version_source: 3.x+
tool_target: Blender bpy
tier: full
style_fit: Fast way to make 3–5 related shapes for a scatter collection behind the hero object; keeps textures consistent across variants.
---

## METADATA
03_Modeling_Modifiers | 3.x+ → 4.2+ | Blender bpy

## CREATIVE_INTENT
A scatter only looks rich if the collection holds several related shapes. Model one simple piece, then make height/size variants by moving vertices with UV correction on, so every variant keeps the same texture density.

## STE_PROCEDURE
1. Add a Cylinder with Vertices = 6 (hexagonal column).
2. Shape it with edge loops, Bevel, Inset on chosen faces, Extrude, and delete faces (values unknown, visual only).
3. Texture it (see single-photo-grunge-material card) before making variants.
4. Duplicate the piece (Shift+D) for each variant.
5. In Edit Mode, enable Tool Settings → Options → **Correct Face Attributes**.
6. Move/scale vertices to make different heights and sizes; the UVs follow so the texture does not stretch.
7. Offset each variant's UVs a little so variants don't show the same texture patch.
8. Select all variants → M → New Collection.

## AGENT_EXECUTION
```python
import bpy
bpy.ops.mesh.primitive_cylinder_add(vertices=6, radius=0.5, depth=1.0)
base = bpy.context.active_object
# ... modelling by eye: bpy.ops.mesh.loopcut_slide, bpy.ops.mesh.bevel, bpy.ops.mesh.inset(thickness=~0.05), bpy.ops.mesh.extrude_region_move
bpy.context.scene.tool_settings.use_transform_correct_face_attributes = True
coll = bpy.data.collections.new("stuff"); bpy.context.scene.collection.children.link(coll)
for i, h in enumerate([1.0, 1.6, 0.6, 2.2]):   # ~ heights
    v = base.copy(); v.data = base.data.copy(); coll.objects.link(v)
    for vert in v.data.vertices:
        if vert.co.z > 0: vert.co.z *= h     # stretch top; UV correction applies only to interactive transforms
```
Note: `use_transform_correct_face_attributes` affects interactive/operator transforms in Edit Mode (`bpy.ops.transform.translate`), not direct `vert.co` writes; for scripted variants either use the operator in Edit Mode or re-run `bpy.ops.uv.cube_project` per variant.

raea: no equivalent (build-stage modelling; result goes out as GLB).

## NOTES
- Visual gaps: the exact modelling (which loops, inset/extrude amounts) is shown, not spoken.
- Speaker admits rushing; spend more time on piece quality for macro shots where they're near focus.
- Rule conflicts: none.
