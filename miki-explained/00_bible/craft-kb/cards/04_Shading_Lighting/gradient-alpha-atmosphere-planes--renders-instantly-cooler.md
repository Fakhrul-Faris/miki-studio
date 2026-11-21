---
title: 2D atmosphere layers — Linear Gradient alpha planes between depth layers
bucket: 04_Shading_Lighting
source: "6 Tips to Make Your Renders Instantly Cooler.txt"
source_time: "unknown (tip 6 of 6, 2D atmosphere)"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: Cheap depth haze between a macro hero and its background; in raea distance Fog does the same job more cleanly.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes (alpha plane) → raea Fog / alpha plane

## CREATIVE_INTENT
A "cheat" that is not physically true but reads as atmosphere: transparent white-to-clear gradient planes placed on the borders between foreground, midground and background separate the layers and push the back ones away. Cheaper than volumes.

## STE_PROCEDURE
1. Divide the scene into foreground, midground and background (the video uses three ANT Landscape terrains).
2. Add a plane standing at the border between foreground and midground.
3. Add a Gradient Texture, Type = Linear; link it through a Color Ramp to Principled BSDF [Alpha].
4. Before testing, set Blend Mode and Shadow Mode (Eevee Legacy) so alpha works.
5. Rotate the gradient −90° (Mapping Rotation) so it fades vertically.
6. In the Color Ramp, pull the black stop in to limit the area and brighten the white stop for intensity.
7. Duplicate the plane to the midground/background border and one just in front of the camera.

## AGENT_EXECUTION
```python
import bpy, math
m = bpy.data.materials.new("AtmosPlane"); m.use_nodes = True; N, L = m.node_tree.nodes, m.node_tree.links
bsdf = N["Principled BSDF"]; bsdf.inputs["Base Color"].default_value = (0.85, 0.9, 1, 1)   # ~ haze colour
tc = N.new("ShaderNodeTexCoord"); mp = N.new("ShaderNodeMapping"); mp.inputs["Rotation"].default_value[2] = math.radians(-90)
gr = N.new("ShaderNodeTexGradient"); gr.gradient_type = "LINEAR"
cr = N.new("ShaderNodeValToRGB"); cr.color_ramp.elements[0].position = 0.2   # ~ black point
L.new(tc.outputs["UV"], mp.inputs["Vector"]); L.new(mp.outputs["Vector"], gr.inputs["Vector"])
L.new(gr.outputs["Fac"], cr.inputs["Fac"]); L.new(cr.outputs["Color"], bsdf.inputs["Alpha"])
m.surface_render_method = "BLENDED"   # 4.2+
```
Links: `Texture Coordinate [UV] -> Mapping [Vector] -> Gradient Texture [Vector]`; `Gradient [Fac] -> Color Ramp [Fac] -> Principled BSDF [Alpha]`.

raea: first choice `<Fog color={bg} near={n} far={f} />` (things dissolve into the background colour with distance, post.md). Exact painted layers: a `<Mesh3d>` plane with `base_color_texture` = a gradient (inline `data:image/svg+xml;utf8,<svg ...><linearGradient ...>` with `#`→`%23`), `alpha_mode="Blend"`, `unlit`.

## NOTES
- Deprecated: Eevee Legacy Blend/Shadow Mode → Render Method (Blended); ANT Landscape is an extension in 4.2+.
- Visual gaps: plane positions shown only on screen.
- Rule conflicts: none; avoid haze on the hero itself (it kills macro contrast).
