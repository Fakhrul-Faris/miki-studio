---
title: Subtle lens distortion / chromatic aberration
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/chromatic-aberration-fringe-match--advanced-comp-nuke-wk1.md
  - cards/05_Camera_Raea_Pipeline/compositor-lens-distortion-edge-fringing--super-wide-angle.md
  - cards/05_Camera_Raea_Pipeline/lens-distortion-node-subtle-barrel--10-blender-tricks.md
sources: ["Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt", "How To Get Super Wide Angle Shots in Blender.txt", "10+ Blender Tricks That Will Make Your Renders Cinematic.txt", "How to actually make eye-catching 3D Scenes | After Effects.txt"]
use_when: "de-CG the final frame edges"
style_fit: Fits only as a barely-visible static "real lens" touch — `<Grade aberration>` 0.002–0.003 and at most a tiny `<LensDistortion>` barrel; never strong, never animated as an effect beat. UI/phone screens kept crisp with `skip={["ui"]}`; page captions are never bent.
---

## METADATA
05_Camera_Raea_Pipeline | Nuke / Blender 3.x–4.x compositor sources → 5.x compositor (look-dev) | raea Grade aberration + LensDistortion

## CREATIVE_INTENT
Real lenses focus wavelengths at different points (colour fringes, most at over-exposed edges and toward the frame edges),
soften the very corners and bend straight lines slightly; a perfectly rectilinear, tack-sharp corner reads as CG.
- Advanced Comp Nuke: fringe colour varies by lens (purple, red, green, blue); when replacing an object that carried a fringe, add it back; a little fringe makes CG feel shot.
- Super Wide Angle: Lens Distortion node at 0.0055 (likely Dispersion), "a little noticeable", on by default, never turned up — many viewers dislike it.
- 10 Blender Tricks: one Lens Distortion node at ~0.02 (Distortion or Dispersion, on screen only) for a touch of barrel/dispersion.

## STE_PROCEDURE
1. Look for fringes on over-exposed edges and near frame edges in the plate/reference; note the colour (often purple).
2. If you replace an object that carried a fringe, add the same fringe back.
3. Add one Lens Distortion pass over the whole render (compositor: between Render Layers and output).
4. Set Dispersion very low (0.0055 author default) for fringe; optionally Distortion very low (~0.02) for barrel, with Fit on so corners stay filled.
5. Mute/compare the frame corner: without it the corner is perfectly sharp.
6. Keep it barely noticeable, slightly stronger toward the edges; never animate it.
7. Save it as the default (startup file / shared look component).
8. (from eye-catching-3d-scenes) Confirms real-lens fringe is edge-only, not frame-wide: this source masks its
   chromatic-aberration pass (VC Chromatic Aberrations / "Quick Chromatic Aberrations 3", amount ~5 in that plugin's
   own units) over the same feathered edge-only region used for its vignette, rather than the whole frame.

## VALUES BY SOURCE
| parameter | Advanced Comp (Nuke) | Super Wide Angle | 10 Blender Tricks | eye-catching-3d-scenes (AE) | recommended for Style D (+ why) |
|---|---|---|---|---|---|
| fringe | match plate; subtle, more at edges | Dispersion ~0.0055 (socket inferred) | ~0.02 (Distortion or Dispersion) | masked to the same edge-only feathered region as the vignette, amount ~5 (plugin units, not comparable to Dispersion 0–1) | `<Grade aberration={0.002}>` (≤ 0.003); kit BlendShot-era soft pass used 0.002 |
| barrel | — | — | ~0.02 | — | `<LensDistortion k1={~0.03–0.05}>` or none (skill's 0.1–0.4 is clearly visible) |
| fit corners | — | — | Fit on | — | LensDistortion zooms to keep corners filled (default) |
| animation | — | never | never | never | never (Grade is first-frame-only anyway) |

## AGENT_EXECUTION
### Source tool (Nuke)
No node chain given (theory); bokeh-edge fringe is in the anamorphic-bokeh card.
### Blender 5.x compositor (look-dev only) — verified on 5.3
```python
import bpy
sc = bpy.context.scene
ng = bpy.data.node_groups.new("Lens", "CompositorNodeTree")
ng.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
sc.compositing_node_group = ng                            # 5.x (was scene.node_tree)
N, L = ng.nodes, ng.links
S = lambda n, i: next(s for s in n.inputs if s.identifier == i)
rl = N.new("CompositorNodeRLayers"); out = N.new("NodeGroupOutput")
ld = N.new("CompositorNodeLensdist")
S(ld, "Type").default_value = "Radial"                    # 'Radial' | 'Horizontal'
S(ld, "Dispersion").default_value = 0.0055                # Super Wide Angle (~ socket inferred)
S(ld, "Distortion").default_value = 0.02                  # 10 Tricks (~ or Dispersion); 0 for fringe-only
S(ld, "Fit").default_value = True                         # keep corners filled
L.new(rl.outputs["Image"], S(ld, "Image")); L.new(ld.outputs["Image"], out.inputs[0])
```
Links: `Render Layers [Image] -> Lens Distortion [Image] -> Group Output [Image]`.
### raea (what we ship)
```tsx
import { Grade, LensDistortion } from "raea/3d";
<Grade aberration={0.002} vignette={0.15} skip={["ui"]} />   {/* lens fringe 0.002–0.005; first frame's grade holds */}
<LensDistortion k1={0.04} k2={0} />                          {/* ~ optional, barely-visible barrel; animates per frame but keep static */}
```
Both are passes over the 3D only; page captions stay straight. Per-lens fringe colour (purple/green) and fringe confined to
over-exposed edges: **raea: no equivalent** (aberration is a frame-wide RGB split, stronger toward edges).

## NOTES
- Deprecated: 4.2–4.5 code used `scene.use_nodes` / `scene.node_tree`, a `Composite` node, `ld.use_fit` and socket "Distort";
  5.x: `scene.compositing_node_group`, Group Output, and sockets "Distortion", "Dispersion", "Fit", "Jitter", "Type" (verified 5.3).
- Visual gaps: which socket gets 0.0055 / 0.02 is on screen only.
- Rule conflicts: none if static and subtle; strong fringe reads as a gimmick; never animate as an effect beat.
- eye-catching-3d-scenes: reinforces, rather than closes, the existing raea gap — `<Grade aberration>` is a
  frame-wide RGB split with no mask input, so confining it to edges/over-exposed regions as this source does is
  still not reproducible in raea. `<Grade aberration>` remains the closest available option; no change to the
  Style D pick.
