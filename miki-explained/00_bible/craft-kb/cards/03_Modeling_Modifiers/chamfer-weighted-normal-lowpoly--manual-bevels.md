---
title: One-segment chamfer + Weighted Normal modifier for cheap smooth-looking background props
bucket: 03_Modeling_Modifiers
source: "The Trick that will Make Your 3D Models 10X Better!.txt"
source_time: "08:42–08:54"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: Right for Style D set dressing (props behind the hero, out of focus); the hero itself gets full bevels.
---

## METADATA
03_Modeling_Modifiers | 4.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
Non-hero assets only need edges that catch a little light from a distance. A single-segment bevel (a chamfer) plus a Weighted Normal modifier makes flat faces shade flat and the chamfer read as a rounded edge, at almost no extra geometry.

## STE_PROCEDURE
1. Select the hard edges of the prop.
2. Bevel them with Segments = 1 (a chamfer).
3. Shade the object smooth.
4. Add a Weighted Normal modifier as the last modifier in the stack.
5. Judge it from the shot distance; it is meant to look smooth "especially from further away".

## AGENT_EXECUTION
```python
import bpy, math
obj = bpy.context.active_object
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.select_all(action='DESELECT')
bpy.ops.mesh.edges_select_sharp(sharpness=math.radians(30))
bpy.ops.mesh.bevel(affect='EDGES', offset=0.002, segments=1, clamp_overlap=True)  # ~ width
bpy.ops.object.mode_set(mode='OBJECT')
bpy.ops.object.shade_smooth()
wn = obj.modifiers.new("WeightedNormal", 'WEIGHTED_NORMAL')
wn.mode = 'FACE_AREA'
wn.weight = 50
wn.keep_sharp = True
```
- The GLB exporter writes the custom normals when the modifier is applied on export (`export_apply=True`, `export_normals=True` default).

raea: no equivalent at render time; the normals arrive inside the GLB and `<Model>` uses them. For a TSX-built prop, Manifold `crossSection.offset(d, {join: "bevel"})` before `.extrude()` gives a chamfered outline.

## NOTES
- Deprecated: before 4.1 the Weighted Normal modifier required Object Data → Normals → Auto Smooth on; 4.1+ removed Auto Smooth, the modifier works on smooth-shaded meshes directly.
- Video gives no width or modifier values; `~` above.
- Visual gaps: none.
- Rule conflicts: none.
