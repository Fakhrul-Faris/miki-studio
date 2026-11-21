---
title: Warm vs cool mood — push light colour and the comp grade together
bucket: 04_Shading_Lighting
source: "The Key to Realistic Renders in Blender.txt"
source_time: "05:43–06:44"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: A per-episode grade choice: warm for money gained / cosy shop, cool for loss / scam / cold numbers; the brand accent stays untouched.
---

## METADATA
04_Shading_Lighting | any | Blender lights + compositor → raea light colour + Grade temperature

## CREATIVE_INTENT
Warm light reads as warmth, summer, happiness — pushed redder and brighter it reads as heat or fire. White-blue light with every warm hint removed reads cold. Do it in the lights first, then reinforce it in the grade.

## STE_PROCEDURE
1. Decide the mood: warm or cool.
2. Set light colours warm (orange/red, brighter for "hot") or white-blue (cold).
3. In the compositor, add Hue/Saturation/Value (or Color Balance) to push the whole image warmer or cooler.
4. Remove any opposite-temperature hints for a pure cold/warm feel.

## AGENT_EXECUTION
```python
import bpy
for o in bpy.data.objects:
    if o.type == "LIGHT": o.data.color = (1.0, 0.82, 0.62)   # ~ warm
sc = bpy.context.scene
nt = sc.compositing_node_group or bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
sc.compositing_node_group = nt                     # 5.x: the compositor is a node group assigned to the scene
if not nt.interface.items_tree: nt.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
N, L = nt.nodes, nt.links
rl = N.get("Render Layers") or N.new("CompositorNodeRLayers"); out = N.get("Group Output") or N.new("NodeGroupOutput")
cb = N.new("CompositorNodeColorBalance"); cb.inputs["Type"].default_value = "Offset/Power/Slope (ASC-CDL)"
next(s for s in cb.inputs if s.name == "Slope" and s.type == "RGBA").default_value = (1.05, 1.0, 0.92, 1)   # ~ warm push
L.new(rl.outputs["Image"], cb.inputs["Image"]); L.new(cb.outputs["Image"], out.inputs["Image"])
```
raea: light `color="#ffe2c0"` (warm) or `"#9fc4ff"` (cool) and one `<Grade temperature={0.1} />` (~ value; + warms, − cools, post.md: "about 0.03 a step" — check on a still); first frame’s grade holds for the whole piece, so mood shifts within a film come from light colours, not Grade.

## NOTES
- Deprecated: 5.x compositor uses node groups (`scene.compositing_node_group`) instead of `scene.node_tree` — adapt.
- Visual gaps: comp node values not given.
- Rule conflicts: keep the brand accent hex outside the temperature push (`<Grade skip>` only works per pass; otherwise check the accent on a still).
- bpy fixed for 5.3: scene.node_tree → scene.compositing_node_group (new CompositorNodeTree, Group Output replaces Composite); Color Balance correction_method/slope properties → inputs["Type"] menu and the colour "Slope" socket.
