---
title: Clip a volume with another volume (VDB Combine subtract)
bucket: 03_Modeling_Modifiers
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "51:31–56:41"
blender_version_source: n/a (Houdini, Bound + VDB Combine)
tool_target: Blender bpy
tier: principle
style_fit: Flat-bottomed rock/prop that sits cleanly on the real surface (no floating underside); build-time. No conflict.
---

## METADATA
03_Modeling_Modifiers | Houdini Bound + VDB from Polygons + VDB Combine (source) → Blender Boolean / Manifold minus | Blender bpy

## CREATIVE_INTENT
Principle: booleans between volumes are fast, robust and clean where polygon booleans fail; subtracting a box volume gives a
flat cut through any messy shape. Idea: cut the underside flat so a hero object rests on the floor plane; note the cut
reveals interior detail.

## STE_PROCEDURE
1. Put a Bound node on the shape, move it down to the clip height, and pad it (Lower/Upper padding 2, 2, 2).
2. Convert the Bound box with VDB from Polygons using the same Voxel Size as the shape (channel-reference it; course temporarily 5 for speed).
3. Add VDB Combine: first input = shape volume, second = box volume, Operation = Subtract (A − B).
4. Convert back with VDB Convert → Polygons and check the cut height; move the Bound up/down until the clip is minimal.
5. Expect the flat face to reveal interior structure; accept or hide it against the ground.

## AGENT_EXECUTION
### Source tool (Houdini)
`Bound (padding 2,2,2, translated down)` → `VDB from Polygons (voxel = ch("../shape_vdb/voxelsize"))`;
`VDB Combine (A = shape, B = box, Operation Subtract)` → `VDB Convert (Polygons)`.

### Blender / raea translation
```python
import bpy
rock = bpy.data.objects["Rock"]
bpy.ops.mesh.primitive_cube_add(size=1)
cutter = bpy.context.object
cutter.dimensions = (rock.dimensions.x + 4, rock.dimensions.y + 4, 2.0)   # padding 2 each side
cutter.location = (rock.location.x, rock.location.y, rock.location.z - rock.dimensions.z/2 - 0.8)  # ~ clip height
b = rock.modifiers.new("ClipBottom", 'BOOLEAN')
b.operation = 'DIFFERENCE'
b.solver = 'EXACT'
b.object = cutter
cutter.hide_render = cutter.hide_viewport = True
```
Order: do the Boolean on the mesh before Mesh to Volume (or after Volume to Mesh) — Blender has no stable volume-volume boolean.
GN: `Mesh Boolean (Difference, Self Intersection off)` with a `Cube` in Mesh 2; or `Delete Geometry` where `Position.z < h` then `Fill Holes` (~).
raea build-time: `rock.minus(manifold.box(w, h, d).move(0, -h/2 + cutY, 0))` or `rock.trim(0, 1, 0, cutY)` (keeps the +Y side).

## NOTES
- Visual gap: exact clip height and the lowered resolution were set by eye.
