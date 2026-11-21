---
title: Fire from a photo (or video) on an emission + alpha plane — no simulation
bucket: 04_Shading_Lighting
source: "3 Ways To Make Stunning Emission Textures In Blender.txt"
source_time: "02:22–03:20"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: "Money burning" metaphors; in raea the native volumetric `<Fire>` is better (circle-able, lit).
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes → raea Fire / video plane

## CREATIVE_INTENT
A fire photo in emission and alpha is fire in seconds; a fire video does the same with motion — no simulation.

## STE_PROCEDURE
1. Download a fire photo on black (video: Unsplash).
2. Link it to Emission Color and to Alpha (via Color Ramp) on a plane.
3. Apply scale (Ctrl+A › Scale) and re-unwrap (U › Project from View / Smart UV) so the image isn’t stretched.
4. Scale the UVs until the flame fills the plane.
5. For motion, set the Image Texture source to Movie and enable Auto Refresh.

## AGENT_EXECUTION
```python
import bpy
ob = bpy.data.objects["FirePlane"]; bpy.context.view_layer.objects.active = ob
bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.mode_set(mode="EDIT"); bpy.ops.mesh.select_all(action="SELECT"); bpy.ops.uv.smart_project(); bpy.ops.object.mode_set(mode="OBJECT")
img = next(n for n in ob.active_material.node_tree.nodes if n.bl_idname == "ShaderNodeTexImage")
img.image = bpy.data.images.load("//media/fire.mp4"); img.image.source = "MOVIE"
img.image_user.frame_duration = 240; img.image_user.use_auto_refresh = True; img.image_user.use_cyclic = True
```
raea (preferred): `<Fire name position scale intensity color seed speed opacity light />` (post.md) — a true volume, frame-exact. Put a warm `<PointLight>` or keep its `light`.

## NOTES
- Deprecated: none.
- Visual gaps: UV scale amount shown only.
- Rule conflicts: none.

