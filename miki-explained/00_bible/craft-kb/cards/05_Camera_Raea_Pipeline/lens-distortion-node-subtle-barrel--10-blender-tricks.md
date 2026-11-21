---
title: Subtle lens distortion in the compositor (value ~0.02)
bucket: 05_Camera_Raea_Pipeline
source: "10+ Blender Tricks That Will Make Your Renders Cinematic.txt"
source_time: "02:32–02:42"
blender_version_source: 3.x
tool_target: Blender bpy (compositor) | raea
tier: principle
style_fit: fits if barely visible (raea LensDistortion small k1 / Grade aberration); never animated as an effect beat
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x (4.2+; 5.x sockets) | Lens Distortion node → raea LensDistortion / Grade aberration

## CREATIVE_INTENT
Principle: a perfectly rectilinear, perfectly sharp CG frame reads as synthetic; a touch of barrel/dispersion adds optical
realism. Idea: one Lens Distortion node at a very small value over the whole render.

## STE_PROCEDURE
1. Open the Compositor and enable Use Nodes.
2. Add a Lens Distortion node between Render Layers [Image] and Composite [Image].
3. Set the value to 0.02 (`~` — spoken as "02"; which socket, Distortion or Dispersion, is on screen only).
4. Compare with the node muted; keep it subtle.

## AGENT_EXECUTION
### Blender (4.2–4.5)
```python
import bpy
scn = bpy.context.scene
nt = scn.compositing_node_group or bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
scn.compositing_node_group = nt                     # 5.x: the compositor is a node group assigned to the scene
if not nt.interface.items_tree: nt.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
rl = nt.nodes.get("Render Layers") or nt.nodes.new("CompositorNodeRLayers")
comp = nt.nodes.get("Group Output") or nt.nodes.new("NodeGroupOutput")   # 5.x: Group Output replaces the Composite node
ld = nt.nodes.new("CompositorNodeLensdist")
ld.inputs["Distortion"].default_value = 0.02  # ~ (or "Dispersion")
ld.inputs["Fit"].default_value = True         # ~ keeps corners filled
nt.links.new(rl.outputs["Image"], ld.inputs["Image"])
nt.links.new(ld.outputs["Image"], comp.inputs["Image"])
```
Blender 5.x: `scene.compositing_node_group`; Fit/Jitter/Projector become input sockets.

### raea
```tsx
<LensDistortion k1={0.05} k2={0} />   {/* barrel; skill range 0.1–0.4 is clearly visible, so go lower for "subtle" ~ */}
<Grade aberration={0.003} />          {/* lens fringe 0.002–0.005 = the Dispersion half of the node */}
```
Both are passes over the 3D only; page captions stay straight.

## NOTES
- Deprecated: none (node name unchanged; socket API changes in 5.x).
- Visual gaps: which socket gets 0.02 is not stated.
- Rule conflicts: none if static and subtle. Same family as the super-wide-angle source's 0.0055 dispersion card.
- bpy fixed for 5.3: scene.node_tree → scene.compositing_node_group (new CompositorNodeTree, Group Output replaces Composite); Lens Distortion inputs["Distort"] → inputs["Distortion"], use_fit → inputs["Fit"].
