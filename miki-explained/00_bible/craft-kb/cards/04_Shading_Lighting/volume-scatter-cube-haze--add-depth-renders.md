---
title: Atmospheric haze from a volume cube over the whole scene (Volume Scatter, low density, anisotropy up)
bucket: 04_Shading_Lighting
source: "How to Add DEPTH to Your Renders.txt"
source_time: "00:25–02:48"
blender_version_source: 3.x?
tool_target: Shader nodes | raea
tier: full
style_fit: Core Style D tool: a faint haze makes the top light visible as a soft cone and pushes the background back; raea FogVolume does it in real time.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes (Cycles/EEVEE) → raea VolumetricFog + FogVolume

## CREATIVE_INTENT
Volumetrics add separation and depth automatically: distant things get hazier, so they literally read as further away. Raising anisotropy makes the haze brighter near (and toward) light sources, which looks more cinematic.

## STE_PROCEDURE
1. Add a Cube; scale it to cover the whole scene so its edges can't be seen from the camera.
2. Set the cube's Object Properties > Viewport Display > Display As = Bounds (optionally assign a shortcut to that toggle).
3. Create a new material on the cube; delete the Principled BSDF.
4. Add a Volume Scatter (or Principled Volume) node; connect it to Material Output [Volume].
5. Lower Density from 1.0 (pitch black) to ~0.1.
6. Increase Anisotropy (~0.5–0.8) so the haze glows toward the lights.
7. (Cycles only) In Render Properties > Light Paths > Max Bounces, set Volume to 1–2.

## AGENT_EXECUTION
Blender:
```python
import bpy
bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0))
box = bpy.context.active_object; box.name = "Haze"; box.scale = (20, 20, 10)   # ~ cover the scene
box.display_type = 'BOUNDS'
m = bpy.data.materials.new("Haze"); m.use_nodes = True; nt = m.node_tree
nt.nodes.remove(nt.nodes["Principled BSDF"])
vs = nt.nodes.new("ShaderNodeVolumeScatter")
vs.inputs["Density"].default_value = 0.1
vs.inputs["Anisotropy"].default_value = 0.6                                     # ~ "increase"
nt.links.new(vs.outputs["Volume"], nt.nodes["Material Output"].inputs["Volume"])
box.data.materials.append(m)
bpy.context.scene.cycles.volume_bounces = 1                                      # Cycles only
```
Nodes: `Volume Scatter [Volume] -> Material Output [Volume]` (Density 0.1, Anisotropy ~0.6).
raea (post.md): the same idea, real time, no cube material:
```tsx
<VolumetricFog />
<FogVolume name="haze" position={[0, 1, 0]} scale={[8, 4, 8]} density={0.02} color="#ffffff"
  scattering={0.45} absorption={0.1} anisotropy={0.6} />
<SpotLight volumetric shadow_maps_enabled transform={Transform.fromXyz(0, 3, 0.4).lookingAt([0, 0, 0])}
  intensity={1500000} outer_angle={0.4} inner_angle={0.2} />
```
Blender density 0.1 does not map 1:1; start raea at 0.02 (faint haze) and raise toward 0.1 (dust) by eye. The volume must contain the air the light crosses and the camera's view of it.

## NOTES
- Deprecated: Light Paths "volume bounces" is Cycles (path tracing) only; raea has no equivalent (the froxel grid scatters single-bounce; `<VolumetricFog ambient ambientColor>` fakes the fill). EEVEE Legacy volumetric settings → EEVEE Next (World/Volume in Render > Volumes).
- Visual gaps: the exact anisotropy value is shown, not spoken.
- Rule conflicts: none. Keep haze neutral; a coloured haze would spread the brand accent beyond the subject.
