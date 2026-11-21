---
title: Sell emissive brightness — reflective textured floor, world Principled Volume, bloom/glare
bucket: 04_Shading_Lighting
source: "3 Ways To Make Stunning Emission Textures In Blender.txt"
source_time: "09:05–09:56"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: Exactly Style D: dark room, glossy real surface reflecting the accent, faint air, subtle bloom.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | World volume + compositor glare → raea FogVolume + Bloom + reflective floor

## CREATIVE_INTENT
An emitter only looks bright if the scene says so: nice reflective textures around it (wet concrete), atmosphere that catches the light, and a subtle glow. Don’t overdo the glow.

## STE_PROCEDURE
1. Put a rich, reflective surface around the emitter (e.g. wet concrete, low roughness with variation).
2. In World nodes, link Principled Volume → World Output [Volume]; set low Density and some Anisotropy.
3. In Eevee Legacy, enable Bloom; otherwise add a Glare node in the compositor (or glow in post).
4. Keep the glow subtle.

## AGENT_EXECUTION
```python
import bpy
w = bpy.context.scene.world; N, L = w.node_tree.nodes, w.node_tree.links
pv = N.new("ShaderNodeVolumePrincipled"); pv.inputs["Density"].default_value = 0.01; pv.inputs["Anisotropy"].default_value = 0.6  # ~
L.new(pv.outputs["Volume"], N["World Output"].inputs["Volume"])
sc = bpy.context.scene
T = sc.compositing_node_group or bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
sc.compositing_node_group = T                     # 5.x: the compositor is a node group assigned to the scene
if not T.interface.items_tree: T.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
rl = T.nodes.get("Render Layers") or T.nodes.new("CompositorNodeRLayers"); out = T.nodes.get("Group Output") or T.nodes.new("NodeGroupOutput")
g = T.nodes.new("CompositorNodeGlare"); g.inputs["Type"].default_value = "Fog Glow"; g.inputs["Threshold"].default_value = 1.0   # 4.2+ replaces Eevee Bloom
T.links.new(rl.outputs["Image"], g.inputs["Image"]); T.links.new(g.outputs["Image"], out.inputs["Image"])
```
raea: `<Bloom intensity={0.6} threshold={0.9} />`; `<VolumetricFog />` + `<FogVolume ... density={0.01-0.03} anisotropy={0.6} />`; floor `<StandardMaterial perceptual_roughness={0.15-0.3}>` with Poly Haven concrete maps + `<Environment>` for reflections (glossy surfaces reflect the panorama, not emissive meshes — add a `<PointLight>` at the emitter so it shows a highlight on the floor).

## NOTES
- Deprecated: Eevee Legacy "Bloom" checkbox → compositor Glare (Bloom/Fog Glow) in 4.2+; raea Bloom.
- Visual gaps: density/anisotropy values not stated.
- Rule conflicts: none.
- bpy fixed for 5.3: scene.node_tree → scene.compositing_node_group (new CompositorNodeTree, Group Output replaces Composite); Glare glare_type/threshold properties → inputs["Type"] = "Fog Glow" / inputs["Threshold"].
