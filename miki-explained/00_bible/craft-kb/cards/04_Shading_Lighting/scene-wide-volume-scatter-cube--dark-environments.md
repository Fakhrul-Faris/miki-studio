---
title: Scene-wide atmosphere — a scaled cube with low-density Volume Scatter
bucket: 04_Shading_Lighting
source: "How to Make DARK Environments in Blender.txt"
source_time: "27:36–28:29"
blender_version_source: 4.x
tool_target: Blender bpy | Shader nodes | raea
tier: full
style_fit: A faint haze makes the single top light visible in the air above the hero; raea `VolumetricFog` + `FogVolume` is the direct equivalent.
---

## METADATA
04_Shading_Lighting | 4.x → 4.2+ / raea | Blender bpy + Shader nodes + raea

## CREATIVE_INTENT
Without volume a dark render is "fine but missing something"; a thin uniform haze solidifies the atmosphere and makes light beams visible. The speaker uses it on nearly every dark render.

## STE_PROCEDURE
1. Add a Cube (Shift+A > Mesh > Cube) and scale it to enclose the whole scene and camera.
2. Give it a material whose Volume Scatter feeds Material Output [Volume]; remove the Surface BSDF.
3. Lower Density well below 1 (value not given; ~0.01–0.05).
4. Raise Anisotropy a little (~0.2–0.3) so beams glow toward the camera.
5. In Object Properties > Viewport Display, set Display As = Bounds.

## AGENT_EXECUTION
Blender:
```python
import bpy
bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 0, 0))
c = bpy.context.object; c.name = "AtmosVolume"; c.scale = (20, 20, 10)   # ~ cover scene
m = bpy.data.materials.new("Atmos"); m.use_nodes = True
N, L = m.node_tree.nodes, m.node_tree.links
N.remove(N["Principled BSDF"])
vs = N.new('ShaderNodeVolumeScatter')
vs.inputs['Density'].default_value = 0.02       # ~ "lower the density way down"
vs.inputs['Anisotropy'].default_value = 0.25    # ~ "increase a little"
L.new(vs.outputs['Volume'], N["Material Output"].inputs['Volume'])
c.data.materials.append(m); c.display_type = 'BOUNDS'
```
Node links: `Volume Scatter [Volume] -> Material Output [Volume]`.

raea:
```tsx
<VolumetricFog />
<FogVolume name="air" position={[0, 1.5, 0]} scale={[8, 4, 8]} density={0.02}
  scattering={0.4} absorption={0.1} anisotropy={0.3} color="#f2ece4" />
<SpotLight volumetric shadow_maps_enabled transform={Transform.fromXyz(0, 4, 0.5).lookingAt([0, 0, 0])}
  intensity={2_500_000} outer_angle={0.35} inner_angle={0.18} />
```
Only lights marked `volumetric` shaft; the volume must contain the air the light crosses and the camera's view of it (post.md). 0.02 = faint haze.

## NOTES
- Deprecated: none. EEVEE Next (4.2+) renders volumes too; legacy EEVEE "Volumetric Tile Size" moved.
- Visual gaps: exact density/anisotropy shown on screen, not spoken.
- Rule conflicts: none.
