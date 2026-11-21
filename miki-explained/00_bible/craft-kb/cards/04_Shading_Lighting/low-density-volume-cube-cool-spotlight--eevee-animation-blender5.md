---
title: Low-density Volume Scatter cube lit by a cool spotlight (EEVEE volumetrics)
bucket: 04_Shading_Lighting
source: "Creating an Animation in Eevee (Blender 5.0).txt"
source_time: "02:56–03:57, 11:25–12:07"
blender_version_source: 5.0
tool_target: Shader nodes
tier: full
style_fit: good — a thin haze under one top light is the Style D dark-room air; keep it faint so the macro object stays crisp
---

## METADATA
04_Shading_Lighting | Blender 5.0 (EEVEE Next) | Shader nodes + raea

## CREATIVE_INTENT
A black world, one bright spotlight from above and a cube of thin volume give a dark set depth and visible light. In EEVEE, volumes work well when the lights are spots and regular lamps. Tint the light slightly cool (not saturated) so it isn't plain white.

## STE_PROCEDURE
1. Set World > Surface Color to black.
2. Add a Spot light above the set; raise its Power until the key area is bright.
3. Set the light colour slightly cool and low-saturation.
4. Add a Cube enclosing the set; set Viewport Display > Display As to Bounds.
5. Give the cube a new material; delete the Principled BSDF.
6. Add a Volume Scatter node and connect it to Material Output [Volume].
7. Lower Volume Scatter Density far down (very thin).
8. Set Render > Volumes > Resolution to 1:2 (lower ratio number = finer).
9. Before you add bounce light for dark corners, accept EEVEE's weak bounce or add a fill; the Volume light probe did not help here.

## AGENT_EXECUTION
```python
import bpy
sc = bpy.context.scene
w = sc.world; w.use_nodes = True; w.node_tree.nodes["Background"].inputs["Color"].default_value = (0, 0, 0, 1)
bpy.ops.object.light_add(type='SPOT', location=(0, 0, 6)); spot = bpy.context.object
spot.data.energy = 5000; spot.data.color = (0.85, 0.93, 1.0)          # ~ "bright", "a little cool"
bpy.ops.mesh.primitive_cube_add(size=20); vol = bpy.context.object; vol.display_type = 'BOUNDS'
m = bpy.data.materials.new("haze"); m.use_nodes = True; nt = m.node_tree
nt.nodes.remove(nt.nodes["Principled BSDF"])
vs = nt.nodes.new("ShaderNodeVolumeScatter"); vs.inputs["Density"].default_value = 0.01   # ~ "way down"
nt.links.new(vs.outputs["Volume"], nt.nodes["Material Output"].inputs["Volume"])
vol.data.materials.append(m)
sc.eevee.volumetric_tile_size = '2'                                   # "1:2"
```
Links: `Volume Scatter [Volume] -> Material Output [Volume]`.

raea (render time, no bake needed):
```tsx
<VolumetricFog />
<FogVolume name="haze" position={[0, 2, 0]} scale={[10, 6, 10]} density={0.02} scattering={0.45} absorption={0.1} anisotropy={0.55} />
<SpotLight volumetric color="#d9ecff" transform={Transform.fromXyz(0, 6, 0.5).lookingAt([0, 0, 0])} intensity={2700000} outer_angle={0.45} inner_angle={0.225} shadow_maps_enabled />
```
Clear colour black (`<AbsoluteFill style={{ background: "#000000" }}>`). `density` 0.02 = faint haze (post.md).

## NOTES
- Deprecated: legacy EEVEE "Volumetrics" panel → EEVEE Next Render > Volumes (Resolution = `volumetric_tile_size`). Ray-tracing (EEVEE Next) mentioned as an improvement — raea has its own lighting; no equivalent toggle.
- Visual gaps: exact density, spotlight power and resolution value ("one to two … half pixel … something like that") are approximate (`~`).
- Rule conflicts: none. "Making the texture more green and cool" is a grade on the whole set — keep the brand accent the only saturated colour.
