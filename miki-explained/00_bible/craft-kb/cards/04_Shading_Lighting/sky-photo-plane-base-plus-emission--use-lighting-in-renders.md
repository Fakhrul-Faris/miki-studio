---
title: Photo sky on a big back plane feeding Base Color and Emission Color
bucket: 04_Shading_Lighting
source: "How To Use Lighting In Your Renders  Blender Tutorial.txt"
source_time: "05:41–06:42"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: Controllable backdrop for an exterior beat; in a dark-room macro shot it becomes a window/backdrop plate.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes → raea ImagePlane / emissive plane

## CREATIVE_INTENT
A real sky photo behind the scene looks natural because it is real, and gives more control than an HDRI (framing, crispness). Feeding it to both Base Color and Emission lets it reflect scene light and glow on its own.

## STE_PROCEDURE
1. Add a large plane far behind the scene, facing the camera.
2. Add an Image Texture with the sky photo (video: from Unsplash).
3. Link Image [Color] → Principled BSDF [Base Color] and → [Emission Color]; set Emission Strength low (~0.5–1).
4. Alternative: link Image [Color] → Emission [Color] → Material Output [Surface].
5. Match the photo’s sun direction to the scene’s sun.

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials.new("SkyPlate"); m.use_nodes = True; N, L = m.node_tree.nodes, m.node_tree.links
b = N["Principled BSDF"]; img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//media/sky.jpg")
L.new(img.outputs["Color"], b.inputs["Base Color"]); L.new(img.outputs["Color"], b.inputs["Emission Color"])
b.inputs["Emission Strength"].default_value = 0.8   # ~
```
raea: `<ImagePlane src={staticFile("sky.jpg")} width={40} position={[0, 8, -30]} />` (unlit card = the emission-only variant); for the lit+glow variant a `<Mesh3d>` plane with `<StandardMaterial base_color_texture={staticFile("sky.jpg")} emissive_texture={staticFile("sky.jpg")} emissive="#cccccc" />`. Environment HDRI can still light the scene behind it (`<Environment ... />` without `background`).

## NOTES
- Deprecated: "Emission" socket → "Emission Color" (Principled v2, 4.0).
- Visual gaps: plane size/distance visual only.
- Rule conflicts: log the photo’s licence in ASSET-SOURCES.md.

