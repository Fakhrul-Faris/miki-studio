---
title: Volumetric fog in a bounding cube (Principled Volume)
bucket: 04_Shading_Lighting
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "25:09–25:51"
blender_version_source: 3.x
tool_target: Blender bpy | Shader nodes | raea
tier: full
style_fit: Fits Style D — faint haze makes the soft top light visible and the dark room deeper; keep density low.
---

## METADATA
04_Shading_Lighting | 3.x | Blender bpy + Shader nodes + raea

## CREATIVE_INTENT
A big cube filled with a thin volume adds atmosphere and mystery: light becomes visible in the air and depth separates into layers.

## STE_PROCEDURE
1. Add a Cube and scale it to span from just in front of the camera's subject to the back building.
2. Create a new material on it.
3. Add a Principled Volume node.
4. Connect it to the Material Output's Volume socket, not Surface.
5. Lower Density significantly (well below 1).
6. Lower/adjust Colour and Anisotropy to taste.

## AGENT_EXECUTION
- Blender:
  ```python
  bpy.ops.mesh.primitive_cube_add(size=1); c = bpy.context.object; c.scale = (20, 30, 8)   # ~
  m = bpy.data.materials.new("Fog"); m.use_nodes = True; nt = m.node_tree
  nt.nodes.remove(nt.nodes["Principled BSDF"])
  v = nt.nodes.new("ShaderNodeVolumePrincipled")
  v.inputs["Density"].default_value = 0.02; v.inputs["Anisotropy"].default_value = 0.3   # ~ inferred
  nt.links.new(v.outputs["Volume"], nt.nodes["Material Output"].inputs["Volume"])
  c.data.materials.append(m)
  ```
  Links: `Principled Volume [Volume] -> Material Output [Volume]`.
- raea: `<VolumetricFog />` + `<FogVolume name="air" position={[0,1.5,0]} scale={[8,4,8]} density={0.02} scattering={0.45} anisotropy={0.55} />`; mark the key `volumetric` (SpotLight is cheapest) so it shafts. Volumes don't come through the GLB — rebuild in TSX.

## NOTES
- Exact density/colour/anisotropy values are visual only — `~`.
- Rule conflicts: none.
