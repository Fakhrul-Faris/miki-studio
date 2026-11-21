---
title: Glare node for glow on highlights
bucket: 05_Camera_Raea_Pipeline
source: "10+ Blender Tricks That Will Make Your Renders Cinematic.txt"
source_time: "02:42–02:52"
blender_version_source: 3.x
tool_target: Blender bpy (compositor) | raea
tier: principle
style_fit: fits — Style D uses bloom; in raea this is <Bloom>, kept to emissive/accent highlights
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x (4.2+; 4.4+/5.x sockets) | Glare node → raea Bloom

## CREATIVE_INTENT
Principle: bright highlights bleeding a soft glow sell light intensity and a filmic lens. Idea: a Glare node in the
compositor adds glow (Fog Glow) or streak flares to the brightest pixels only.

## STE_PROCEDURE
1. Open the Compositor and enable Use Nodes.
2. Add a Glare node between Render Layers [Image] and Composite [Image].
3. Set Glare Type to Fog Glow for glow (Streaks for flare-like lines) — type, Threshold and Size are not given (`~`).
4. Raise Threshold until only the brightest highlights glow.

## AGENT_EXECUTION
### Blender (4.2–4.3)
```python
import bpy
scn = bpy.context.scene
nt = scn.compositing_node_group or bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
scn.compositing_node_group = nt                     # 5.x: the compositor is a node group assigned to the scene
if not nt.interface.items_tree: nt.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
rl = nt.nodes.get("Render Layers") or nt.nodes.new("CompositorNodeRLayers")
comp = nt.nodes.get("Group Output") or nt.nodes.new("NodeGroupOutput")   # 5.x: Group Output replaces the Composite node
g = nt.nodes.new("CompositorNodeGlare")
g.inputs["Type"].default_value = 'Fog Glow'; g.inputs["Quality"].default_value = 'High'   # 5.x: options are menu sockets
g.inputs["Threshold"].default_value = 1.0
g.inputs["Size"].default_value = 0.5           # ~ old size 8 (scale 6–9) → 2^(8-9); 5.x Size is a 0–1 factor
# old mix 0.0 (even mix) ≈ the default Strength 1.0      # ~ values not given
nt.links.new(rl.outputs["Image"], g.inputs["Image"])
nt.links.new(g.outputs["Image"], comp.inputs["Image"])
```
4.4+/5.x: Glare's options became input sockets (e.g. "Threshold", "Strength", "Size"), new type "Bloom"; 5.x uses
`scene.compositing_node_group`.

### raea
```tsx
<Bloom intensity={1} threshold={0.9} />
// give the glowing part an emissive brighter than white:
<StandardMaterial base_color="#111" emissive={LinearRgba.from(Srgba.hex("#ff5a1f")).mul(4)} />
```
Streak/star flares: raea: no equivalent (Bevy bloom is a soft glow only).

## NOTES
- Deprecated: legacy EEVEE's Render > Bloom toggle is gone in EEVEE Next (4.2+); glow is done in the compositor (Glare
  "Bloom"/"Fog Glow") — for us, raea `<Bloom>`.
- Visual gaps: Glare type and every value are on screen only (the author points to a paid/free preset pack).
- Rule conflicts: no flashy flares; bloom only on the one accent or real emissive sources, `threshold` 0.8–1.
- bpy fixed for 5.3: scene.node_tree → scene.compositing_node_group (new CompositorNodeTree, Group Output replaces Composite); Glare glare_type/quality/threshold/size/mix properties → menu/value sockets (size 8 → Size factor 0.5 ~, mix 0 → default Strength).
