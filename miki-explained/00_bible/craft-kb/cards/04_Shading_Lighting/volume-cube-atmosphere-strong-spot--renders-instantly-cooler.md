---
title: Low-density Principled Volume cube lit by one strong spotlight
bucket: 04_Shading_Lighting
source: "6 Tips to Make Your Renders Instantly Cooler.txt"
source_time: "unknown (tip 6 of 6, 3D fog)"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: Exactly the dark-room + one-light + bloom look: faint air that catches the key light gives depth behind the macro hero.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes (volume) → raea VolumetricFog + FogVolume

## CREATIVE_INTENT
A box of thin fog over the scene separates foreground, midground and background and makes lights visible in the air. With higher density it becomes mist; with bloom and higher anisotropy it glows around light sources.

## STE_PROCEDURE
1. Add a cube enclosing the scene (and camera path).
2. Replace its surface shader with a Principled Volume linked to Material Output [Volume].
3. Set Density = 0.02, Anisotropy = 0.5.
4. Aim one very strong Spot light through the volume to show the beam.
5. Raise Density for mist/fog; enable bloom for glow around lights.

## AGENT_EXECUTION
```python
import bpy
bpy.ops.mesh.primitive_cube_add(size=1); vol = bpy.context.object; vol.scale = (20, 20, 10)   # ~ scene size
m = bpy.data.materials.new("Atmos"); m.use_nodes = True; N, L = m.node_tree.nodes, m.node_tree.links
N.remove(N["Principled BSDF"]); pv = N.new("ShaderNodeVolumePrincipled")
pv.inputs["Density"].default_value = 0.02; pv.inputs["Anisotropy"].default_value = 0.5
L.new(pv.outputs["Volume"], N["Material Output"].inputs["Volume"]); vol.data.materials.append(m)
```
raea:
```tsx
<VolumetricFog />
<FogVolume name="atmos" position={[0, 2, 0]} scale={[20, 10, 20]} density={0.02} scattering={0.5} anisotropy={0.5} />
<SpotLight volumetric shadow_maps_enabled transform={Transform.fromXyz(-3, 6, -2).lookingAt([0, 0, 0])}
  intensity={3000000} outer_angle={0.35} inner_angle={0.17} />
<Bloom intensity={0.6} threshold={0.85} />
```
The FogVolume must contain the air the beam crosses and the camera's view of it (post.md).

## NOTES
- Deprecated: none; in EEVEE Next volumes are lit by default (no legacy "Volumetric lighting" toggle), Bloom moved to the compositor Glare node.
- Visual gaps: spotlight power not given.
- Rule conflicts: none.
