---
title: Separate the modelling phase from the scene-building phase
bucket: 05_Camera_Raea_Pipeline
source: "5 Ways to Create Better Environments in Blender.txt"
source_time: "07:58–10:14"
blender_version_source: n/a?
tool_target: principle-only | Blender bpy
tier: full
style_fit: Matches our pipeline: assets are prepared (library / modelled) first, then each shot is assembled, lit and framed.
---

## METADATA
05_Camera_Raea_Pipeline | n/a → 4.2+ | principle-only + Blender bpy

## CREATIVE_INTENT
Starting a render with the smallest details burns the energy you need for the shot itself; you zoom out after hours and the frame is still empty. Model (or buy / pull from the library) on separate days, then assemble: move objects, light, add atmosphere and frame the shot with full attention on the picture.

## STE_PROCEDURE
1. Before shot work, build or collect every model the shot list needs into an asset library file.
2. In a separate session, assemble the shot from those assets only, without modelling.
3. Spend the assembly session on placement, lighting, atmosphere and camera.
4. If a missing model is found during assembly, drop in a blockout stand-in and note it; don't stop to model.

## AGENT_EXECUTION
Blender (assembly file pulls from the asset file; no modelling ops in the shot script):
```python
import bpy
LIB = "/path/to/episode_assets.blend"            # ~ path
with bpy.data.libraries.load(LIB, link=False) as (src, dst):
    dst.objects = [n for n in src.objects if n.startswith(("HERO_", "PROP_"))]
for o in dst.objects:
    bpy.context.scene.collection.objects.link(o)
# missing asset → stand-in
bpy.ops.mesh.primitive_cube_add(location=(0.6, 0, 0.1)); bpy.context.active_object.name = "TODO_receipt_stub"
```
raea: assembly is TSX placing `<Model>`s exported from the asset file (assets.md); no modelling at render time.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none. Log every asset in ASSET-SOURCES.md during the asset phase.
