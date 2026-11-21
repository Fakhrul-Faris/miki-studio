---
title: Image texture on an area light to replace its hard-edged reflection
bucket: 04_Shading_Lighting
source: "Realistic Product Lighting In Blender.txt"
source_time: "04:06–04:35"
blender_version_source: 4.x
tool_target: Shader nodes | raea
tier: full
style_fit: Softer, realistic highlights on glossy heroes; raea route is a studio HDRI.
---

## METADATA
04_Shading_Lighting | 4.x (Cycles) | Light shader nodes → raea Environment

## CREATIVE_INTENT
Area lights are sharp and their reflections look terrible on glossy products. An image (soft blob / softbox photo) driving the light’s emission gives a soft, shaped reflection.

## STE_PROCEDURE
1. Select the area light; enable Use Nodes.
2. Add an Image Texture with a soft light-shape image.
3. Link Image [Color] → Emission [Color] (or [Strength]).
4. Check the reflection on the product in rendered view.

## AGENT_EXECUTION
```python
import bpy
L = bpy.data.lights["Back"]; L.use_nodes = True; N, Lk = L.node_tree.nodes, L.node_tree.links
img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//media/softbox_shape.png")
tc = N.new("ShaderNodeTexCoord"); Lk.new(tc.outputs["UV"], img.inputs["Vector"])   # area lights have UVs over their surface
Lk.new(img.outputs["Color"], N["Emission"].inputs["Color"])
```
raea: no textured lights; reflection shape = `<Environment src={staticFile("studio_*.hdr")} />` (Poly Haven studio HDRIs) or a Blender-baked HDR of soft cards (see gradient-card cards).

## NOTES
- Deprecated: light nodes Cycles-only.
- Visual gaps: the author’s two images are patreon-only; any soft gradient/softbox image works.
- Rule conflicts: log image licence.

