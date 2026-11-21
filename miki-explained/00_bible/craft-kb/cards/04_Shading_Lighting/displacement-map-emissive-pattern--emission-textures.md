---
title: Displacement maps (JSPlacement) as emission/alpha for complex glowing patterns
bucket: 04_Shading_Lighting
source: "3 Ways To Make Stunning Emission Textures In Blender.txt"
source_time: "01:37–02:22"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: Tech-panel glow patterns for UI/finance beats (circuit, data); keep one accent hue.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes → raea emissive_texture

## CREATIVE_INTENT
Sci-fi displacement maps are overused as plain displacement, but fed into emission or the alpha of an emissive surface they give complex lights with no modelling effort.

## STE_PROCEDURE
1. Generate a map in JSPlacement (free displacement-map generator).
2. Load it as an Image Texture on the emissive plane (same set-up as the photo cut-out card).
3. Link it to Emission Color and/or through a Color Ramp to Alpha.
4. Push the Color Ramp contrast until the pattern reads as lit lines.

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials["PhotoEmit"]; N = m.node_tree.nodes
next(n for n in N if n.bl_idname == "ShaderNodeTexImage").image = bpy.data.images.load("//media/jsplacement_01.png")
```
raea: `emissive_texture={staticFile("jsplacement_01.png")}` + `emissive` multiplier; or GPU-side `<ShaderMesh>` if the pattern must animate (limits.md).

## NOTES
- Deprecated: none.
- Visual gaps: ramp values visual only.
- Rule conflicts: none.

