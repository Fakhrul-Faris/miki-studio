---
title: Real-time render baseline — ambient occlusion, bloom for glints, higher shadow resolution, soft shadows
bucket: 05_Camera_Raea_Pipeline
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "07:15–07:55"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: raea
tier: full
style_fit: Same baseline Style D already uses (AO, bloom, soft shadows); this card maps the legacy EEVEE toggles to raea.
---

## METADATA
05_Camera_Raea_Pipeline | 2.8–3.x? EEVEE legacy → raea | raea

## CREATIVE_INTENT
A handful of render settings, set once and left for every scenario: AO seats things in their surroundings, bloom makes glints sparkle, higher shadow resolution and soft shadows remove the cheap real-time look.

## STE_PROCEDURE
1. Enable Ambient Occlusion and raise its Distance/strength a little.
2. Enable Bloom so specular glints glow.
3. Leave Screen Space Reflections off unless reflective surfaces matter.
4. Raise shadow map resolution (Cube Size / Cascade Size).
5. Enable Soft Shadows.
6. Keep these settings for the whole piece; change lights, not render settings, between shots.

## AGENT_EXECUTION
### Source tool (Blender EEVEE legacy, ≤ 4.1)
```python
import bpy
# legacy EEVEE (≤ 4.1) settings → Blender 5.3 equivalents
e = bpy.context.scene.eevee
e.fast_gi_distance = 1.0                          # ~ was use_gtao + gtao_distance (AO/horizon scan is always on)
# was use_bloom → compositor Glare (Bloom)
sc = bpy.context.scene
nt = sc.compositing_node_group or bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
sc.compositing_node_group = nt                     # 5.x: the compositor is a node group assigned to the scene
if not nt.interface.items_tree: nt.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
rl = nt.nodes.get("Render Layers") or nt.nodes.new("CompositorNodeRLayers")
comp = nt.nodes.get("Group Output") or nt.nodes.new("NodeGroupOutput")   # 5.x: Group Output replaces the Composite node
g = nt.nodes.new("CompositorNodeGlare"); g.inputs["Type"].default_value = "Bloom"
nt.links.new(rl.outputs["Image"], g.inputs["Image"]); nt.links.new(g.outputs["Image"], comp.inputs["Image"])
e.shadow_resolution_scale = 1.0                   # was shadow_cube_size / shadow_cascade_size = '2048' (virtual shadow maps, full res)
for l in bpy.data.lights: l.use_shadow_jitter = True   # was use_soft_shadows (softness = light radius / shadow_soft_size)
```
### Blender / raea translation
4.2+ EEVEE Next removed `use_bloom`, `use_soft_shadows`, `shadow_cube_size`; shadows use `scene.eevee.shadow_resolution_scale` and per-light `shadow_soft_size`; bloom → compositor Glare node (type Bloom). raea (one set, first frame's values hold):
```tsx
<AmbientOcclusion quality="medium" thickness={0.25} />   {/* shades only Ambient/Environment light */}
<Bloom intensity={0.6} threshold={0.9} />
<Shadows mapSize={4096} distance={8} firstCascade={1.5} />
<SpotLight ... shadow_maps_enabled soft_shadows_enabled radius={0.4} />
```
For a macro object scene keep `<Shadows distance>` short so texels land on the set.

## NOTES
- Deprecated: legacy EEVEE `use_gtao`, `use_bloom`, `use_ssr`, `use_soft_shadows`, shadow cube/cascade sizes → EEVEE Next / raea props above.
- Visual gaps: exact AO distance not given.
- Rule conflicts: AO does nothing in raea for scenes lit only by spots — add a little AmbientLight or an Environment.
- bpy fixed for 5.3: legacy use_gtao/gtao_distance → fast_gi_distance; use_bloom → compositor Glare (Bloom) in scene.compositing_node_group; shadow_cube/cascade_size → shadow_resolution_scale; use_soft_shadows → per-light use_shadow_jitter. Block now runs in 5.3 (heading still names the legacy source).
