---
title: Warm vs cool colour moods (light + grade)
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/warm-cool-colour-moods--power-of-color.md
  - cards/04_Shading_Lighting/warm-cool-mood-lights-and-grade--key-to-realistic-renders.md
sources: ["The Power of Color in Blender 3D!.txt", "The Key to Realistic Renders in Blender.txt"]
use_when: "cosy vs corporate mood on a line"
style_fit: A per-episode temperature choice around the accent — warm for money gained / cosy shop, cool for loss / scam / cold numbers; the brand accent hex stays untouched by the push (check on a still). raea's Grade holds its first frame for the whole piece, so mood shifts within a film come from light colours.
---

## METADATA
04_Shading_Lighting | 4.x (source) → bpy 5.x compositor + raea | Principle → light colour + grade (raea `color` + `<Grade temperature>`)

## CREATIVE_INTENT
Warm tones feel softer, happier, closer: a room feels smaller and cosier, art more ecstatic (our eyes resolve more warm hues); pushed redder and brighter, warm reads as heat or fire. Cool tones feel harder, moodier, corporate, detached and calm; white-blue with every warm hint removed reads cold. Set it in the lights first, then reinforce it in the grade.
- power-of-color: the emotional meanings, and keeping the opposite temperature only as a small contrast accent.
- key-to-realistic-renders: the method — lights first, then a compositor push (Hue/Sat or Color Balance), and strip opposite-temperature hints for a pure feel.

## STE_PROCEDURE
1. Choose the mood: warm for cosy/happy/close; cool for serious/corporate/calm/cold.
2. Set light colours first: warm (orange/red, brighter for "hot") or white-blue (cold).
3. Set the set materials' temperature second.
4. Push the whole image warmer or cooler in the grade (compositor Color Balance / Hue-Saturation-Value; raea `<Grade temperature>`).
5. For a pure feel, remove opposite-temperature hints; otherwise keep the opposite temperature only as a small accent for contrast.
6. Check the brand accent hex on a still after the push.

## VALUES BY SOURCE
| parameter | power-of-color | key-to-realistic-renders | recommended for Style D (+ why) |
|---|---|---|---|
| warm light | `#ffe2c0` | Blender (1.0, 0.82, 0.62)~ | `#ffe2c0` key |
| cool light | `#9fc4ff` fill | white-blue | `#9fc4ff` fill/back |
| grade push | `<Grade temperature>` (+ warm, − cool) | Color Balance OPS slope (1.05, 1.0, 0.92)~; raea `temperature={0.1}`~ | small: ±0.03–0.1 (≈0.03 a step), judged on a still |
| opposite temp | small accent only | removed for a pure feel | small accent only; the brand accent is not part of the push |
| within-film changes | — | first frame's grade holds | change light colours per shot, not Grade |

## AGENT_EXECUTION
Blender 5.3 (verified compositor API; preview only):
```python
import bpy
for o in bpy.data.objects:
    if o.type == "LIGHT": o.data.color = (1.0, 0.82, 0.62)            # ~ warm  (cool: (0.62, 0.77, 1.0))
scn = bpy.context.scene
ng = bpy.data.node_groups.new("Comp", "CompositorNodeTree")
ng.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
scn.compositing_node_group = ng
rl = ng.nodes.new("CompositorNodeRLayers"); rl.scene = scn
cb = ng.nodes.new("CompositorNodeColorBalance")
cb.inputs["Type"].default_value = "Offset/Power/Slope (ASC-CDL)"
cb.inputs[14].default_value = (1.05, 1.0, 0.92, 1)                    # Slope (colour) ~ warm push
out = ng.nodes.new("NodeGroupOutput")
ng.links.new(rl.outputs["Image"], cb.inputs["Image"]); ng.links.new(cb.outputs["Image"], out.inputs[0])
```
Nodes: `Render Layers [Image] -> Color Balance (Offset/Power/Slope, Slope ~(1.05,1,0.92)) [Image] -> Group Output [Image]` (alt: Hue/Saturation/Value).
raea:
```tsx
{/* warm */}
<SpotLight color="#ffe2c0" transform={Transform.fromXyz(0, 3, 0.6).lookingAt([0, 0, 0])} intensity={2_700_000}
  outer_angle={0.45} inner_angle={0.22} shadow_maps_enabled soft_shadows_enabled radius={0.6} />
<Grade temperature={0.1} />          {/* + warms, − cools; ~0.03 a step; first frame holds */}
{/* cool: color="#9fc4ff" lights, <Grade temperature={-0.1} /> */}
```
If a UI/brand layer must stay off the push, `<Grade skip={["ui"]} />` with `pass="ui"` on those parts (tone-mapped camera: temperature still applies inside the tone curve; it is held back only under `<ToneMapping mode="none" />`). Otherwise check the accent on a still.

## NOTES
- Deprecated: `scene.node_tree` / `scene.use_nodes` → `scene.compositing_node_group` (5.x); Color Balance `correction_method` / `.slope` props → "Type" menu socket and colour input sockets (5.x).
- Visual gaps: compositor node values not given (`~`).
- Rule conflicts: none; keep the brand accent hex outside the temperature push.
