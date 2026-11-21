---
title: Mist pass background fog (compositor, no render-time cost)
bucket: 04_Shading_Lighting
source: "10+ Blender Tricks That Will Make Your Renders Cinematic.txt"
source_time: "02:07–02:32"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: principle
style_fit: fits — distant set fades into the dark room colour so the macro object stays the only read
---

## METADATA
04_Shading_Lighting | Blender 3.x (4.2+; 5.x compositor API differs) | Mist pass + Color Ramp + Mix → raea Fog

## CREATIVE_INTENT
Principle: depth-based fog separates foreground from background and adds atmosphere without the cost of volumetrics.
Idea: render a Mist pass (a 0–1 depth gradient), shape it with a Color Ramp, and use it as the factor to mix a fog colour
over the image.

## STE_PROCEDURE
1. In View Layer Properties > Passes > Data, enable Mist.
2. In World Properties > Mist Pass, set Start, Depth and Falloff by eye (`unknown (visual only)`).
3. Open the Compositor and enable Use Nodes.
4. Connect Render Layers [Mist] -> Color Ramp [Fac].
5. Connect Color Ramp [Color] -> Mix [Factor]; Render Layers [Image] -> Mix [A]; a fog colour -> Mix [B].
6. Connect Mix [Result] -> Composite [Image]; move the Color Ramp stops to control where fog starts and how thick it is.

## AGENT_EXECUTION
### Blender (4.2–4.5)
```python
import bpy
scn = bpy.context.scene
scn.view_layers[0].use_pass_mist = True
m = scn.world.mist_settings; m.start, m.depth, m.falloff = 5.0, 25.0, 'QUADRATIC'   # ~ values
nt = scn.compositing_node_group or bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
scn.compositing_node_group = nt                     # 5.x: the compositor is a node group assigned to the scene
if not nt.interface.items_tree: nt.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
rl = nt.nodes.get("Render Layers") or nt.nodes.new("CompositorNodeRLayers")
comp = nt.nodes.get("Group Output") or nt.nodes.new("NodeGroupOutput")   # 5.x: Group Output replaces the Composite node
ramp = nt.nodes.new("ShaderNodeValToRGB")                # 5.x: shared Color Ramp node
mix  = nt.nodes.new("ShaderNodeMix"); mix.data_type = 'RGBA'; mix.blend_type = 'MIX'   # 5.x: replaces MixRGB
mix.inputs[7].default_value = (0.05, 0.05, 0.06, 1)     # B = fog colour ~ (dark room)
nt.links.new(rl.outputs["Mist"], ramp.inputs["Factor"])
nt.links.new(ramp.outputs["Color"], mix.inputs["Factor"])  # Color Ramp [Color] -> Mix [Factor]
nt.links.new(rl.outputs["Image"], mix.inputs[6])          # A = render
nt.links.new(mix.outputs[2], comp.inputs["Image"])        # Result (colour)
```
Blender 5.x: the compositor is a node group (`scene.compositing_node_group`); `scene.node_tree` is gone and Mix is the
generic `ShaderNodeMix` (data_type 'RGBA'). Blender is not our final renderer, so this is reference only.

### raea
```tsx
// distance fog in the camera: fades everything into `color` between near and far — the Mist-pass look, per frame, cheap
<AbsoluteFill style={{ background: "#0d0d10" }}>
  <Fog color="#0d0d10" near={3} far={12} />
  {/* or exponential: <Fog color="#0d0d10" density={0.1} /> */}
</AbsoluteFill>
```
Use the background colour as the fog colour; keep `far` beyond the subject or it disappears (post.md).

## NOTES
- Deprecated: MixRGB (`CompositorNodeMixRGB`) → the Mix node (Color) in 4.x+/5.x; Color Ramp output socket "Image" in
  the compositor is labelled Color in the UI.
- Visual gaps: the Mist Start/Depth values and the exact node wiring ("mix these like this") are shown too fast to read;
  the wiring above is the standard set-up, `~`.
- Rule conflicts: none. `<Fog>` values are the first frame's for the whole piece — don't plan to animate it.
- bpy fixed for 5.3: scene.node_tree → scene.compositing_node_group (new CompositorNodeTree, Group Output replaces Composite); CompositorNodeValToRGB → ShaderNodeValToRGB (Factor/Color sockets); CompositorNodeMixRGB → ShaderNodeMix (RGBA: A=inputs[6], B=inputs[7], Result=outputs[2]).
