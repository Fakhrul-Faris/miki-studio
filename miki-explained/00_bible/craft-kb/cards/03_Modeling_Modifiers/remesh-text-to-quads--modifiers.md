---
title: Remesh modifier to turn text-converted meshes (bad n-gon topology) into quads
bucket: 03_Modeling_Modifiers
source: "The Power of MODIFIERS in Blender!.txt"
source_time: "01:38–02:10"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: For 3D lettering or logos that must bend, deform or subdivide in a Style D shot (a price that morphs, a brand mark that warps).
---

## METADATA
03_Modeling_Modifiers | 3.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
Text converted to a mesh has long n-gons that shade and deform badly. The Remesh modifier rebuilds it as even quad topology so it can be subdivided, deformed or bevelled.

## STE_PROCEDURE
1. Add a Text object and set Extrude for depth.
2. Convert it to a mesh (Object → Convert → Mesh).
3. Add a Remesh modifier.
4. Choose a quad-producing mode (Sharp or Smooth with Octree Depth, or Voxel with Voxel Size) and raise resolution until letter edges hold.
5. Disable Remove Disconnected so letter islands (dots, counters) are kept.

## AGENT_EXECUTION
```python
import bpy
bpy.ops.object.text_add()
txt = bpy.context.active_object
txt.data.body = "RM 9.90"                 # ~ example
txt.data.extrude = 0.05
bpy.ops.object.convert(target='MESH')
rm = txt.modifiers.new("Remesh", 'REMESH')
rm.mode = 'SHARP'                          # ~ video gives no mode; 'SHARP'/'SMOOTH' (octree) or 'VOXEL'
rm.octree_depth = 7                        # ~
rm.use_remove_disconnected = False
rm.use_smooth_shade = True
```
raea: no equivalent (topology tool). raea's own lettering is already clean solids — `Text3D size depth` or `manifold.text3d(text, size, depth)` (meshes.md); refine before deforming code-side: `solid.refineToLength(0.01).warp(...)`.

## NOTES
- The video does not say which Remesh mode; values `~`. Voxel mode suits closed letters; Sharp keeps corners crisper.
- Deprecated: none.
- Visual gaps: the before/after topology is on screen only.
- Rule conflicts: none.
