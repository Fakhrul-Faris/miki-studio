---
title: Reliable god rays (hard light + complex shadow + volume)
bucket: 04_Shading_Lighting
source: "5 Lighting SECRETS in Blender.txt"
source_time: "14:32–17:25"
blender_version_source: 3.x/4.x
tool_target: raea
tier: full
style_fit: A shaft from the single top light through a blind/leaves gives the dark-room macro look depth; raea's volumetric spot does this natively.
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x (Cycles) | Shader nodes + raea

## CREATIVE_INTENT
Use to give a dark room depth and a sense of time and place: visible shafts need three things together — a volume, a blocker
casting a complex hard shadow, and a small (hard) light. If rays don't show, the light is too big.

## STE_PROCEDURE
1. Add a Cube enclosing the whole scene.
2. Delete its Principled BSDF; add Volume Scatter linked to Material Output [Volume].
3. Set Volume Scatter Density to ~0.02–0.03 to start.
4. Place a shadow caster between light and scene: a high-contrast gobo plane, or a tree model.
5. Raise the gobo's contrast so its shadow is crisp.
6. Set the light Radius small (not 0); smaller radius = harder shadow = clearer rays.
7. If rays don't appear, reduce the light Radius further.
8. Raise light Power so the shafts read; scale blocker to the scene.

## AGENT_EXECUTION
### Blender (Cycles)
```python
import bpy
bpy.ops.mesh.primitive_cube_add(size=20)
vol = bpy.context.object; vol.display_type = 'BOUNDS'
m = bpy.data.materials.new("Atmos"); m.use_nodes = True; vol.data.materials.append(m)
N = m.node_tree.nodes; N.remove(N["Principled BSDF"])
vs = N.new("ShaderNodeVolumeScatter"); vs.inputs["Density"].default_value = 0.025
m.node_tree.links.new(vs.outputs["Volume"], N["Material Output"].inputs["Volume"])
spot = bpy.data.objects["Spot"]; spot.data.shadow_soft_size = 0.05  # ~ small, not 0
```
Nodes: `Volume Scatter [Volume] -> Material Output [Volume]` (Density 0.02–0.03).

### raea
```tsx
<VolumetricFog />
<FogVolume name="air" position={[0, 1.5, 0]} scale={[6, 4, 6]} density={0.1} scattering={0.45} absorption={0.15} anisotropy={0.55} />
<SpotLight volumetric shadow_maps_enabled transform={Transform.fromXyz(-1, 4, -2).lookingAt([0, 0, 0])}
  intensity={2340000} outer_angle={0.2} inner_angle={0.17} />
<Mesh3d shadow="only" shape={BLIND} />   {/* slats / holes carve the shaft */}
```
- Only the first two `volumetric` spots and two directional lights get exact hard-edged shafts (hero lights); put the one that matters first.
- The FogVolume must contain the air the light crosses and the camera's view of it.
- Raea's equivalent of "small radius": keep `soft_shadows_enabled` off (or tiny `radius`) on the shaft light.

## NOTES
- Deprecated: none.
- Visual gaps: light power and tree model scale not given.
- Rule conflicts: none; shafts are static atmosphere, animate only slowly (light drift).
