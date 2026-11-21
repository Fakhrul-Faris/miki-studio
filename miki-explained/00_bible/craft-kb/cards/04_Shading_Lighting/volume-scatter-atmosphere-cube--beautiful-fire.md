---
title: Volume-scatter cube for scene atmosphere
bucket: 04_Shading_Lighting
source: "How to Make Beautiful Fire in Blender.txt"
source_time: "09:32–10:23"
blender_version_source: 3.x/4.x
tool_target: raea
tier: principle
style_fit: A faint haze in the dark room makes the top light visible in the air and separates the hero from the background.
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x | Shader nodes + raea

## CREATIVE_INTENT
Principle: a big cube filled with a thin forward-scattering volume makes light visible in the air and adds depth for almost no
effort. Idea: display the cube as Bounds so it doesn't block the viewport.

## STE_PROCEDURE
Method:
1. Add a Cube enclosing the whole scene.
2. Set Object Properties → Viewport Display → Display As: Bounds.
3. Give it a material with only Volume Scatter → Material Output [Volume].
4. Set Density 0.02 and Anisotropy 0.7.

## AGENT_EXECUTION
### Blender
```python
import bpy
bpy.ops.mesh.primitive_cube_add(size=30)
c = bpy.context.object; c.display_type = 'BOUNDS'
m = bpy.data.materials.new("Haze"); m.use_nodes = True; c.data.materials.append(m)
N = m.node_tree.nodes; N.remove(N["Principled BSDF"])
vs = N.new("ShaderNodeVolumeScatter")
vs.inputs["Density"].default_value = 0.02; vs.inputs["Anisotropy"].default_value = 0.7
m.node_tree.links.new(vs.outputs["Volume"], N["Material Output"].inputs["Volume"])
```

### raea
```tsx
<VolumetricFog />
<FogVolume name="haze" position={[0, 1, 0]} scale={[8, 4, 8]} density={0.02} scattering={0.5} anisotropy={0.7} />
<SpotLight volumetric shadow_maps_enabled … />
```
Blender density and raea density are not the same scale (raea: 0.02 faint haze, 0.1 dust, 0.5 smoke); judge on a still. Lights
must be `volumetric` to show in it.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none.
