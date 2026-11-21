---
title: Per-hue colour correction (Hue-vs curves / colour mixer)
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/hue-vs-curves-per-colour-correction--product-animation-masterclass.md
  - cards/05_Camera_Raea_Pipeline/per-hue-color-mixer-calibration--nice-colors.md
sources: ["Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt", "How to get nice colors in your renders.txt"]
use_when: "fixing one colour without touching the accent"
style_fit: Keeps the one brand accent clean and other colours quiet — but in our pipeline per-hue work happens at the source (material hex / emissive / light colour), since raea's `<Grade>` has no per-hue control and raea renders fresh. No Photoshop/Resolve in the pipeline.
---

## METADATA
05_Camera_Raea_Pipeline | Resolve / Photoshop Camera Raw sources (Blender 4.3 project) → Blender material / 5.x Hue Correct | raea material

## CREATIVE_INTENT
When one hue misbehaves (a nauseating green, an orange not orange enough, a liquid the wrong colour) or global saturation
makes everything garish, isolate that hue and change its saturation, brightness or hue without touching the rest.
- Product masterclass: Resolve Hue vs Sat / Hue vs Lum / Hue vs Hue on a single clip; broad range to recolour a liquid, watch edge artifacts.
- Nice Colors: Camera Raw Color Mixer + Calibration primaries (Red strongly, Blue slightly) give a cleaner result than the global slider.

## STE_PROCEDURE
1. Identify the misbehaving hue and the shot(s) it's in; fix only that clip/shot.
2. Preferred for us: change the source — the material's colour/hex, its emissive multiplier, or the light colour — and re-render.
3. Grade route (source tools): add a node/layer non-destructively (Resolve Alt+S; Photoshop stamp Ctrl+Alt+Shift+E → Smart Filter → Camera Raw).
4. Hue vs Sat: pick the hue (click-hold on the image or swatch), drag down to desaturate; widen the range a little.
5. Hue vs Lum: lower or raise that hue slightly.
6. Hue vs Hue: shift reds toward orange (or orange toward pink/yellow in a Color Mixer); then brighten/saturate as needed.
7. Calibration: raise Red Primary saturation strongly, Blue Primary slightly; shift Red hue (orange → red-orange).
8. To recolour a liquid, use Hue vs Hue with a much broader range; check edges for artifacts and choose a target hue that holds clean.
9. Raise global saturation only moderately (optional final Hue/Saturation layer +24 in the source).
10. Toggle to compare (Ctrl+D in Resolve); keep what is cleaner than global saturation.

## VALUES BY SOURCE
| parameter | Product masterclass (Resolve) | Nice Colors (Camera Raw) | recommended for Style D (+ why) |
|---|---|---|---|
| tool | Hue vs Sat / Lum / Hue curves | Color Mixer + Calibration | material `base_color` / `emissive` / light `color` |
| green | desaturate, lum ± slightly | — | pick a quieter green hex on that material (accent green #57D100 stays) |
| orange/red | Hue vs Hue reds → orange, + lum + sat | Red Primary sat strong, hue → red-orange | set the hex directly |
| blue | — | Blue Primary sat slight | — |
| global sat | — | moderate (+ optional +24 layer) | `Grade saturation` ≤ ~1.06 |
| scope | that clip only | whole image | per material/shot |

## AGENT_EXECUTION
### Source tools
- Resolve: Color page, node on that clip; Curves › Hue vs Sat / Hue vs Lum / Hue vs Hue (amounts by eye).
- Photoshop: stamp visible → Smart Object → Camera Raw: Basic Saturation +, Color Mixer (HSL per hue), Calibration (R/G/B Primary Hue + Saturation); values visual only.
### Blender 5.x
Change the material (Hue/Saturation/Value node on that material, or its colour). If a post fix is ever needed (look-dev only),
Hue Correct node — verified on 5.3:
```python
import bpy
sc = bpy.context.scene
ng = bpy.data.node_groups.new("HueFix", "CompositorNodeTree")
ng.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
sc.compositing_node_group = ng
N, L = ng.nodes, ng.links
rl = N.new("CompositorNodeRLayers"); out = N.new("NodeGroupOutput")
hc = N.new("CompositorNodeHueCorrect")             # mapping.curves: 0 Hue, 1 Saturation, 2 Value (x = hue 0..1)
sat = hc.mapping.curves[1]
p = sat.points.new(0.33, 0.35)                       # green (~hue 0.33) desaturated ~ (0.5 = unchanged)
hc.mapping.update()
L.new(rl.outputs["Image"], hc.inputs["Image"]); L.new(hc.outputs["Image"], out.inputs[0])
```
### raea (where we fix it)
```tsx
<StandardMaterial base_color="#e9771c" />                                      {/* set the hex directly */}
<Model src={staticFile("can.glb")}><StandardMaterial material="Liquid" base_color="#3a7bd5" /></Model>   {/* re-cover one glTF material by name */}
```
`<Grade>` per-hue control: **raea: no equivalent** (only global `saturation`, `temperature`, `tint` and `shadows`/`midtones`/
`highlights` `{saturation, contrast, gamma, gain, lift}`).

## NOTES
- Deprecated: none (compositor in 5.x via `scene.compositing_node_group`).
- Visual gaps: all curve amounts and slider positions are by eye.
- Rule conflicts: none; the brand accent is protected by fixing other materials, not by a global grade.
