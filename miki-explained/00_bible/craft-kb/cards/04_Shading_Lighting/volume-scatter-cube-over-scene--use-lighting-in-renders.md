---
title: Volume Scatter cube over the whole scene so the key light reads in the air
bucket: 04_Shading_Lighting
source: "How To Use Lighting In Your Renders  Blender Tutorial.txt"
source_time: "04:00–04:15"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: The dark-room atmosphere layer of Style D.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes → raea FogVolume

## CREATIVE_INTENT
"Important": a light in a dark interior looks far better when the air catches it. One box of thin volume over everything gives the beam and depth.

## STE_PROCEDURE
1. Add a cube that encloses the entire scene.
2. In the Shader Editor, link Volume Scatter [Volume] → Material Output [Volume] (no surface shader).
3. Lower Density until the scene is not black (see the volumetrics card for values, ~0.01).

## AGENT_EXECUTION
```python
import bpy
cube = bpy.data.objects["AirBox"]
m = bpy.data.materials.new("Air"); m.use_nodes = True; N, L = m.node_tree.nodes, m.node_tree.links
N.remove(N["Principled BSDF"]); vs = N.new("ShaderNodeVolumeScatter"); vs.inputs["Density"].default_value = 0.01  # ~
L.new(vs.outputs["Volume"], N["Material Output"].inputs["Volume"]); cube.data.materials.append(m)
```
raea: `<VolumetricFog />` + `<FogVolume name="air" position scale density={0.01-0.03} anisotropy={0.5-0.7} />`, key light marked `volumetric`.

## NOTES
- Deprecated: none.
- Visual gaps: density not stated in this video.
- Rule conflicts: none.

