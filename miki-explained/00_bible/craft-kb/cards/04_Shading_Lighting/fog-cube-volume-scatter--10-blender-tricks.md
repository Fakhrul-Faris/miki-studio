---
title: Fog cube — Volume Scatter (density 0.01, anisotropy 0.7) + faint volume emission
bucket: 04_Shading_Lighting
source: "10+ Blender Tricks That Will Make Your Renders Cinematic.txt"
source_time: "01:37–02:07"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: principle
style_fit: fits — a faint haze in the dark room lets the top light read as a soft cone; keep it barely visible
---

## METADATA
04_Shading_Lighting | Blender 3.x (EEVEE Legacy / Cycles; 4.2+ EEVEE Next same nodes) | Volume Scatter → raea FogVolume

## CREATIVE_INTENT
Principle: thin participating media adds depth and makes light visible in the air. Idea: a big cube filled with a thin
scattering volume, forward-scattering (anisotropy 0.7) so light glows when looking toward it; optionally a tiny volume
emission to lift the haze itself.

## STE_PROCEDURE
1. Add a Cube large enough to contain the subject, the lights and the camera's view.
2. In the Cube's material, connect a Volume Scatter node to Material Output [Volume]; remove the Surface shader.
3. Set Volume Scatter Density to 0.01.
4. Set Volume Scatter Anisotropy to 0.7.
5. Optional: add an Emission node into the volume (via Add Shader) and set its Strength to 0.03.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
bpy.ops.mesh.primitive_cube_add(size=20, location=(0, 0, 0))   # size ~ "big cube"
cube = bpy.context.object; cube.name = "FogCube"
mat = bpy.data.materials.new("Fog"); mat.use_nodes = True
nt = mat.node_tree; nt.nodes.clear()
out = nt.nodes.new("ShaderNodeOutputMaterial")
sc  = nt.nodes.new("ShaderNodeVolumeScatter")
sc.inputs["Density"].default_value = 0.01
sc.inputs["Anisotropy"].default_value = 0.7
em  = nt.nodes.new("ShaderNodeEmission");  em.inputs["Strength"].default_value = 0.03
add = nt.nodes.new("ShaderNodeAddShader")
nt.links.new(sc.outputs["Volume"], add.inputs[0])     # Volume Scatter [Volume] -> Add Shader [Shader]
nt.links.new(em.outputs["Emission"], add.inputs[1])   # Emission [Emission] -> Add Shader [Shader]
nt.links.new(add.outputs["Shader"], out.inputs["Volume"])  # Add Shader -> Material Output [Volume]
cube.data.materials.append(mat)
```
Volumes don't export to GLB; recreate in raea.

### raea
```tsx
<VolumetricFog />
<FogVolume name="haze" position={[0, 1, 0]} scale={[8, 4, 8]} density={0.01} scattering={0.5} anisotropy={0.7} color="#fff4e6" />
<SpotLight volumetric transform={Transform.fromXyz(0, 3, 0).lookingAt([0, 0, 0])} intensity={500000} outer_angle={0.45} inner_angle={0.2} shadow_maps_enabled />
```
- Density scale `~`: skill says 0.02 faint haze, 0.1 dust — 0.01 is very faint; judge on a still.
- Lights only shaft if marked `volumetric` and inside the volume; first two spots/suns get exact (hero) shafts.
- Volume emission: raea: no direct equivalent; `<VolumetricFog ambient ambientColor />` lifts the haze evenly.

## NOTES
- Deprecated: EEVEE Legacy needed Volumetrics settings in Render Properties (Start/End/Tile Size); EEVEE Next (4.2+)
  moved them to Render > Volumes. The "Principled Volume" node can replace Scatter + Emission in one node
  (Density, Anisotropy, Emission Strength).
- Visual gaps: cube size and placement are visual only.
- Rule conflicts: none; never let haze wash the brand accent.
