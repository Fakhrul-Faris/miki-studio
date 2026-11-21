---
title: Low-density volume scatter box for atmosphere
bucket: 04_Shading_Lighting
source: "How to get good lighting in blender.srt"
source_time: "00:07:07–00:08:10; 00:09:41–00:10:42; 00:22:29–00:23:00"
blender_version_source: 3.x (inferred)
tool_target: Blender bpy | Shader nodes | raea
tier: full
style_fit: Fits Style D's dark room when kept faint — a little haze makes the top light's cone visible; heavy fog only for a deliberate mood beat.
---

## METADATA
04_Shading_Lighting | 3.x (inferred) | Shader nodes, raea

## CREATIVE_INTENT
A cube of Volume Scatter over the whole scene adds air: depth, softened contrast, and light that leans toward the source. Keep it very low on sunny scenes (high reads as wildfire smoke); go denser for foggy overcast moods; raise anisotropy so scattering brightens toward the light.

## STE_PROCEDURE
1. Add a Cube and scale it to enclose the whole scene, including the camera.
2. Add a new material and delete the Principled BSDF.
3. Add Volume Scatter and connect it to Material Output Volume.
4. Lower Density to a small value.
5. Raise Anisotropy a little to bias scatter toward the light.
6. If a hard line appears at the box edge, make the box taller or larger.
7. Set Object > Viewport Display > Display As to Bounds.
8. For overcast fog, raise Density and the Volume light bounces.

## AGENT_EXECUTION
Blender:
```python
import bpy
bpy.ops.mesh.primitive_cube_add(size=1); v = bpy.context.object
v.scale = (60, 60, 20)                                  # ~ enclose scene + camera
m = bpy.data.materials.new("Atmos"); m.use_nodes = True; nt = m.node_tree
nt.nodes.remove(nt.nodes["Principled BSDF"])
vs = nt.nodes.new("ShaderNodeVolumeScatter")
vs.inputs["Density"].default_value = 0.005              # ~ sunny "really low"; ~0.03 foggy overcast
vs.inputs["Anisotropy"].default_value = 0.3             # ~ "a little"
nt.links.new(vs.outputs["Volume"], nt.nodes["Material Output"].inputs["Volume"])
v.data.materials.append(m); v.display_type = 'BOUNDS'
bpy.context.scene.cycles.volume_bounces = 2             # Cycles only ("volume light bounces")
```
Nodes: `Volume Scatter [Volume] -> Material Output [Volume]` (Density ~0.005, Anisotropy ~0.3).
raea (`post.md`):
```tsx
<VolumetricFog />
<FogVolume name="air" position={[0, 2, 0]} scale={[20, 6, 20]} density={0.02} scattering={0.5}
  absorption={0.05} anisotropy={0.5} />
<SpotLight volumetric transform={Transform.fromXyz(0, 5, 1).lookingAt([0, 0, 0])} intensity={2500000}
  outer_angle={0.35} inner_angle={0.2} shadow_maps_enabled />
```
`density` 0.02 faint haze, 0.1 dust, 0.5 smoke. Cheap distance haze instead: `<Fog color="#07080c" near far />`.

## NOTES
- Deprecated: "volume light bounces" is Cycles Light Paths; EEVEE Next uses World/scene volume settings; raea has no bounces.
- Visual gaps: exact density/anisotropy not stated.
- Rule conflicts: none.
