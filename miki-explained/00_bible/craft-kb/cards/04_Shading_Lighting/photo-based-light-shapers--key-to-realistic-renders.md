---
title: Photo-based light shapers (real studio softbox textures) for realistic reflections
bucket: 04_Shading_Lighting
source: "The Key to Realistic Renders in Blender.txt"
source_time: "13:23–13:55"
blender_version_source: 4.x
tool_target: Shader nodes | raea
tier: full
style_fit: Realistic reflection shapes on glossy heroes; raea equivalent is a studio HDRI panorama.
---

## METADATA
04_Shading_Lighting | 4.x | Shader nodes (add-on) → raea Environment

## CREATIVE_INTENT
Real studio lights have structure (ribs, falloff, diffusion) that a flat plane lacks. Shader-based light shapers built from photos of real lamps give realistic reflections and shapes while keeping control of colour, blur and falloff.

## STE_PROCEDURE
1. Install a light-shaper pack (the video: a paid add-on with ~50 photo-based shapers) or use any photo of a softbox.
2. Put the softbox photo on an emissive plane (image → Emission Color; alpha from luminance).
3. Hide the plane from camera (Ray Visibility › Camera off).
4. Place it where the reflection should appear on the product; tune strength, colour, blur.

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials.new("Shaper"); m.use_nodes = True; N, L = m.node_tree.nodes, m.node_tree.links
b = N["Principled BSDF"]; img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//media/softbox.jpg")
L.new(img.outputs["Color"], b.inputs["Emission Color"]); b.inputs["Emission Strength"].default_value = 8   # ~
bpy.data.objects["ShaperCard"].visible_camera = False
```
raea: no textured lights; reflections come from `<Environment>`. Use a real studio HDRI (Poly Haven "studio_*" CC0) or bake one from Blender with these cards (see gradient-card card).

## NOTES
- Deprecated: none.
- Visual gaps: add-on UI not shown in steps.
- Rule conflicts: paid add-on — only CC0/licensed sources; log in ASSET-SOURCES.md.

