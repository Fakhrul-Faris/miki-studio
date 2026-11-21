---
title: Split-tone — cool shadows in a warm frame
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/cool-split-tone-shadows--nice-colors.md
  - cards/05_Camera_Raea_Pipeline/split-toning-cool-shadows-grade--eevee-animation-blender5.md
sources: ["How to get nice colors in your renders.txt", "Creating an Animation in Eevee (Blender 5.0).txt"]
use_when: "final grade colour separation"
style_fit: Balances the warm top light in the Style D dark room and unifies shots — but raea `<Grade>` has no coloured shadow lift, so do it in light (a dim cool fill / cool ambient on the shadow side) plus at most a slight global cool. The blue must stay far from the brand accent; check the accent on a still; `skip={["ui"]}` keeps UI/captions exact.
---

## METADATA
05_Camera_Raea_Pipeline | Photoshop Camera Raw / Blender 5.0 compositor sources → 5.x (look-dev) | raea light + Grade

## CREATIVE_INTENT
When a frame is all warm, a little blue in the shadows only (even with no blue light in the scene) balances it, adds depth,
makes warm highlights read warmer by contrast and unifies the film's colour.
- Nice Colors: Camera Raw Color Grading — Shadows wheel toward blue, low saturation (~5–10 %), midtones/highlights untouched; back off if forced.
- EEVEE Animation (Blender 5.0): grade after rendering as a separate adjustable pass over every shot (less destructive), mostly blue in the shadows, highlights near neutral; check the brand colour.

## STE_PROCEDURE
1. Render ungraded; keep the grade a separate adjustable pass over every shot.
2. Push a small amount of blue into the shadows only (Shadows hue ~220, saturation ~5–10 %).
3. Leave midtones and highlights near neutral.
4. For us: translate to light — add a dim cool fill on the shadow side opposite the warm key (or a cool ambient).
5. Optionally add a very slight global cool (`temperature` slightly negative).
6. Before you lock it, check the brand accent colour on a still; it must stay on-brand.
7. Compare on/off; back off if it looks forced.

## VALUES BY SOURCE
| parameter | Nice Colors (Camera Raw) | EEVEE Animation (5.0 compositor) | recommended for Style D (+ why) |
|---|---|---|---|
| shadows tint | hue ~220, sat ~5–10 % | "a little blue", values visual only | cool fill `#9fc4ff` low intensity / ambient `#9FB2D9` (kit ProStage) |
| mid/highs | untouched | near neutral | untouched |
| global | — | — | `temperature` ~ −1 step (≈ −0.03) at most |
| where | Photoshop | compositor, post-render | raea light (Grade can't tint shadows only) |

## AGENT_EXECUTION
### Source tools
- Photoshop: Camera Raw → Color Grading → Shadows: Hue ~220 (blue), Saturation ~5–10 (~).
- Blender 5.0 (video): `Render Layers [Image] -> Split Toning [Image] -> Composite`; shadow colour blue, small amount; node params not spoken. On 5.3 no `CompositorNodeSplitToning` type is registered (likely a bundled node-group asset — unverified); use Color Balance below.
### Blender 5.x compositor (look-dev only) — verified on 5.3
```python
import bpy
sc = bpy.context.scene
ng = bpy.data.node_groups.new("SplitTone", "CompositorNodeTree")
ng.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
sc.compositing_node_group = ng
N, L = ng.nodes, ng.links
S = lambda n, i: next(s for s in n.inputs if s.identifier == i)
rl = N.new("CompositorNodeRLayers"); out = N.new("NodeGroupOutput")
cb = N.new("CompositorNodeColorBalance")
S(cb, "Type").default_value = "Lift/Gamma/Gain"
S(cb, "Color Lift").default_value = (0.95, 0.98, 1.06, 1.0)     # ~ blue into the shadows only
L.new(rl.outputs["Image"], S(cb, "Image")); L.new(cb.outputs["Image"], out.inputs[0])
```
Links: `Render Layers [Image] -> Color Balance (Lift/Gamma/Gain, blue Lift) [Image] -> Group Output [Image]`.
### raea (what we ship)
```tsx
<RectLight transform={Transform.fromXyz(...shadowSide).lookingAt(hero)} color="#9fc4ff" intensity={…} width={1} height={1} />  {/* ~ dim cool fill opposite the warm key */}
<AmbientLight brightness={60} color="#9FB2D9" />                 {/* cool ambient as in kit ProStage (color not in the skill docs) */}
<Grade temperature={-1}                                           // ~ slight global cool, optional
       shadows={{ saturation: 1.1, contrast: 1, gamma: 1, gain: 1, lift: 0.01 }}
       skip={["ui"]} />
```
True split toning (blue only in the shadows): **raea: no equivalent** (Grade's `shadows` takes saturation/contrast/gamma/gain/lift —
scalars, not a colour; `temperature` is global). The first frame's Grade holds for the whole piece — fine, a grade should be constant.

## NOTES
- Deprecated: none (Split Toning is a 5.0 addition per the video; 5.x compositor is `scene.compositing_node_group`).
- Visual gaps: wheel position and node settings are visual only.
- Rule conflicts: none; keep the blue far from the brand accent's saturation and verify the accent on a still.
