---
title: Volume Scatter cube over the scene — Density 0.01 start, Anisotropy ~0.7 (used on 99% of artworks)
bucket: 04_Shading_Lighting
source: "How I Make Any Environment Instantly Look Better With Volumetrics - Blender Tutorial.txt"
source_time: "00:43–04:25"
blender_version_source: 3.x?
tool_target: Shader nodes | raea
tier: full
style_fit: The default atmosphere layer for the dark room; anisotropy brightens air near the key light, which then blooms.
---

## METADATA
04_Shading_Lighting | any | Shader nodes → raea VolumetricFog + FogVolume

## CREATIVE_INTENT
One cube of thin fog over everything adds depth and makes almost any scene look better — even where fog makes no story sense. Not realistic, just better looking.

## STE_PROCEDURE
1. Add a cube (Shift+A › Mesh › Cube) and scale it over the main scene.
2. Delete its Principled BSDF; add Volume Scatter → Material Output [Volume].
3. If the viewport doesn’t update, scroll the view to refresh.
4. Before judging, lower Density from 1 (pitch black) to 0.01.
5. Raise Anisotropy to ~0.7 so fog brightens near light sources (too high looks odd).
6. If 0.01 is too thick, halve or quarter it.

## AGENT_EXECUTION
```python
import bpy
bpy.ops.mesh.primitive_cube_add(); c = bpy.context.object; c.name = "Fog"; c.scale = (10, 10, 5)   # ~ cover the scene
m = bpy.data.materials.new("Fog"); m.use_nodes = True; N, L = m.node_tree.nodes, m.node_tree.links
N.remove(N["Principled BSDF"]); vs = N.new("ShaderNodeVolumeScatter")
vs.inputs["Density"].default_value = 0.01; vs.inputs["Anisotropy"].default_value = 0.7
L.new(vs.outputs["Volume"], N["Material Output"].inputs["Volume"]); c.data.materials.append(m)
```
raea:
```tsx
<VolumetricFog />
<FogVolume name="fog" position={[0, 2.5, 0]} scale={[20, 10, 20]} density={0.01} anisotropy={0.7} scattering={0.5} />
```
Mark the key `volumetric`; densities are in raea’s own scale (0.02 faint haze, post.md) — tune on a still. Add `<Bloom>` for glow at the light.

## NOTES
- Deprecated: none.
- Visual gaps: none — values are stated.
- Rule conflicts: none.

