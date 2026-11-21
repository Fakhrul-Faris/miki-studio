---
title: Black blocker box (negative fill) to shape world light
bucket: 04_Shading_Lighting
source: "How to get good lighting in blender.srt"
source_time: "00:23:29–00:25:31"
blender_version_source: 3.x (inferred)
tool_target: Blender bpy | raea
tier: full
style_fit: Principle fits (shape the light, darken the foreground); the mechanism has no raea equivalent because raea's Environment casts no shadows.
---

## METADATA
04_Shading_Lighting | 3.x (inferred) | Blender bpy (raea: approximations only)

## CREATIVE_INTENT
With an all-round sky or white world, place a big black cube behind the camera (or an open-faced box over the foreground) so it absorbs light from those directions. The world then lights only from the open sides, giving direction, shadow and drama to an otherwise flat overcast or HDRI scene. Subtle amounts only.

## STE_PROCEDURE
1. Add a Cube and scale it large.
2. Place it behind the camera, outside the frame.
3. Add a material with Base Color pure black.
4. Optionally delete the face toward the scene and wrap the box over the foreground.
5. Check that the box is not visible in the camera.
6. Compare before and after; back off if the effect is extreme.

## AGENT_EXECUTION
Blender:
```python
import bpy
bpy.ops.mesh.primitive_cube_add(location=(0, -30, 5)); b = bpy.context.object   # ~ behind camera
b.scale = (25, 2, 15)
m = bpy.data.materials.new("Blocker"); m.use_nodes = True
p = m.node_tree.nodes["Principled BSDF"]
p.inputs["Base Color"].default_value = (0, 0, 0, 1); p.inputs["Roughness"].default_value = 1.0
b.data.materials.append(m)
b.visible_camera = False     # extra safety; still blocks world light
```
raea: no equivalent (an `<Environment>` lights from every direction and is never shadowed, and there is no GI occlusion by geometry). Approximate:
- lower `Environment intensity` and rotate it (`rotation`) so its bright side faces away from the camera;
- add `<AmbientOcclusion quality="high" />` to darken contact areas lit by the Environment/Ambient;
- get the directional shadow from a soft `DirectionalLight` (`soft_shadow_size` 5–10) and block it with `<Mesh3d shadow="only">` over the foreground.

## NOTES
- Deprecated: none.
- Visual gaps: box size and placement shown, not stated.
- Rule conflicts: none.
