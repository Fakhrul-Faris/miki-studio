---
title: Mist pass as a depth mask for painted-in fog (Blender pass → Photoshop luminance mask)
bucket: 04_Shading_Lighting
source: "How to Add DEPTH to Your Renders.txt"
source_time: "09:55–12:34"
blender_version_source: 3.x?
tool_target: Blender bpy | raea
tier: full
style_fit: The idea (fog driven by depth, placed only where wanted) fits; the Photoshop finishing step is outside our pipeline and is replaced by raea fog.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Blender bpy (pass) → raea Fog / FogVolume

## CREATIVE_INTENT
When depth still isn't enough, add smoky depth fog afterwards: the Mist pass is a greyscale distance image; used as a mask it puts fog exactly where things are far, and brushing it in by hand (ground fog, cloud brushes) controls where it shows.

## STE_PROCEDURE
1. In View Layer Properties > Passes > Data, enable Mist.
2. In World Properties > Mist Pass, set Start and End (video default 0 m to 100 m).
3. Preview it: Viewport Shading > Render Pass = Mist; adjust Start/End until the range covers the scene.
4. In the Compositor, connect Render Layers [Mist] to an output (through Lens Distortion if used; through Denoise if noisy).
5. Save the Mist image separately from the beauty render.
6. (Photoshop) Put both in one document; on the Mist layer, open Channels and Ctrl-click a thumbnail to select by brightness.
7. (Photoshop) Make a new layer, add a mask from that selection, fill with the fog colour.
8. (Photoshop) Apply Curves to the mask to set the fog's range (like a Color Ramp).
9. (Photoshop) Apply the mask, add a second inverted mask, brush the fog in with a soft brush where wanted.
10. (Photoshop) Set the fog layer's blend mode to Screen or Lighten.

## AGENT_EXECUTION
Blender:
```python
import bpy
scn = bpy.context.scene
scn.view_layers[0].use_pass_mist = True
scn.world.mist_settings.start = 0.0; scn.world.mist_settings.depth = 100.0   # "end" = start + depth
nt = scn.compositing_node_group or bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
scn.compositing_node_group = nt                     # 5.x: the compositor is a node group assigned to the scene
rl = nt.nodes.get("Render Layers") or nt.nodes.new("CompositorNodeRLayers")
dn = nt.nodes.new("CompositorNodeDenoise")
fo = nt.nodes.new("CompositorNodeOutputFile"); fo.directory = "//mist/"   # 5.x: was base_path
fo.file_output_items.new('RGBA', "Mist")                                # 5.x: file inputs are items
nt.links.new(rl.outputs["Mist"], dn.inputs["Image"]); nt.links.new(dn.outputs["Image"], fo.inputs["Mist"])
```
Nodes: `Render Layers [Mist] -> (Lens Distortion [Image]) -> Denoise [Image] -> File Output`.
### Blender / raea translation
Blender is never the final renderer, so the mask-and-paint step becomes render-time fog in raea (post.md):
- Distance fog: `<Fog color="#0b0b0d" near={2} far={10} />` (≈ Mist start/end; colour = background).
- Placed fog (the "brushed-in" part): a `<FogVolume>` only where wanted; ground fog = a wide, low box with `falloff={1}`:
```tsx
<VolumetricFog />
<FogVolume name="groundfog" position={[0, 0, -3]} scale={[12, 1.2, 8]} density={0.06} falloff={1}
  scattering={0.5} color="#d8dde6" />
```
- Screen/Lighten blending: raea fog is already additive scattering; no blend-mode equivalent needed.

## NOTES
- Deprecated: Compositor in 4.2+ uses the same nodes; in 5.x the compositor is a node group (`scene.compositing_node_group`) — adapt the node-tree lookup.
- Visual gaps: Photoshop curve shape and brush strokes are shown, not described (~10:00–12:20).
- Rule conflicts: Photoshop is an external finishing step (not AE, so allowed), but our finals are raea renders with no paint-over; use raea fog. Fog that appears must ramp in over ~0.4 s (animate the FogVolume's density per frame), never pop.
- bpy fixed for 5.3: scene.node_tree → scene.compositing_node_group (new CompositorNodeTree, Group Output replaces Composite); File Output base_path → directory, input added with file_output_items.new().
