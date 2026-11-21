---
title: Subtle chromatic aberration / edge softening (Lens Distortion node)
bucket: 05_Camera_Raea_Pipeline
source: "How To Get Super Wide Angle Shots in Blender.txt"
source_time: "05:01–06:58"
blender_version_source: 3.x/4.x
tool_target: Blender bpy (compositor) | raea
tier: principle
style_fit: fits Style D as a barely-visible "real lens" fringe in the corners via raea <Grade aberration>; never strong
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x–4.x | Compositor Lens Distortion → raea Grade aberration / LensDistortion

## CREATIVE_INTENT
Principle: real lenses split RGB slightly and soften the very corners; a perfectly tack-sharp corner reads as CG. Idea: add
just enough fringing to be "a little noticeable", leave it on by default, and never turn it up — it looks bad fast and
many viewers dislike it.

## STE_PROCEDURE
1. Open the Compositor and enable Use Nodes.
2. Add a Lens Distortion node between Render Layers [Image] and Composite [Image].
3. Set its value to 0.0055 (the author's default; the socket is not named — likely Dispersion, `~`).
4. Mute the node (M) and compare the frame corner: without it the corner is perfectly sharp.
5. Keep the value low enough that the effect is barely noticeable; save it in your startup file.

## AGENT_EXECUTION
### Blender (4.2–4.5)
```python
import bpy
sc = bpy.context.scene
nt = sc.compositing_node_group or bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
sc.compositing_node_group = nt                     # 5.x: the compositor is a node group assigned to the scene
if not nt.interface.items_tree: nt.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
rl = nt.nodes.get("Render Layers") or nt.nodes.new("CompositorNodeRLayers")
comp = nt.nodes.get("Group Output") or nt.nodes.new("NodeGroupOutput")   # 5.x: Group Output replaces the Composite node
ld = nt.nodes.new("CompositorNodeLensdist")
ld.inputs["Dispersion"].default_value = 0.0055   # ~ socket inferred; video only says "this value 0.0055"
nt.links.new(rl.outputs["Image"], ld.inputs["Image"])
nt.links.new(ld.outputs["Image"], comp.inputs["Image"])
```
Links: `Render Layers [Image] -> Lens Distortion [Image]`, `Lens Distortion [Image] -> Composite [Image]`.

### raea (what we ship)
```tsx
import { Grade } from "raea/3d";
<Grade aberration={0.002} vignette={0.15} />   // 0.002–0.005 is a lens's fringe; first frame's grade holds all piece
```
- Use `skip={["ui"]}` on Grade so phone/UI screens stay crisp.

## NOTES
- Deprecated: Blender 5.0 moves compositing to `scene.compositing_node_group` (node group) and turns the node's
  Fit/Jitter/Projector options into input sockets; `scene.node_tree` is gone there.
- Visual gaps: the exact socket the 0.0055 goes into is on screen only.
- Rule conflicts: none if kept subtle; don't animate it.
- bpy fixed for 5.3: scene.node_tree → scene.compositing_node_group (new CompositorNodeTree, Group Output replaces Composite).
