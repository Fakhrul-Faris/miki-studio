---
title: Restrained final grade pass
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/merged-layer-grade-pass-slider-sweep--special-look.md
  - cards/05_Camera_Raea_Pipeline/primary-grade-exposure-contrast-gain--product-animation-masterclass.md
  - cards/05_Camera_Raea_Pipeline/restrained-final-grade--serene-render.md
  - cards/05_Camera_Raea_Pipeline/soft-final-grade-pass--realistic-product-lighting.md
  - cards/05_Camera_Raea_Pipeline/vignette-grain-curves-grade--ten-cinematic-tips.md
sources: ["How to Add That Special Look To Your Renders.txt", "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt", "Making a SERENE render in blender.txt", "Realistic Product Lighting In Blender.txt", "10 Tips to make Your 3D Render more Cinematic.txt"]
use_when: "the finishing grade on every episode"
style_fit: One raea `<Grade>` + `<ToneMapping>` over the whole piece (first frame's values hold) — no Photoshop/Resolve/AE in our pipeline, no paid presets. Restraint wins: high global saturation conflicts with one-saturated-accent (raise the accent material instead); deep blacks that keep detail; no crushed shadows; grain off by default.
---

## METADATA
05_Camera_Raea_Pipeline | Photoshop Camera Raw / DaVinci Resolve / Blender 3.x–4.x compositor sources → 5.x compositor (look-dev) + raea | raea Grade + ToneMapping + Bloom

## CREATIVE_INTENT
One consistent grade over the merged image is the biggest finishing step: renders come out flat, slightly dark, sharp and
"CG"; a light grade brightens whites naturally, adds a little contrast, glow and colour so they read as photographed — and the
same grade on every shot makes the film match. Less is more: over-added contrast/saturation looks worse than a light edit.
- Special Look: one non-destructive merged pass, swept slider by slider (keep the better direction, else reset); clarity, saturation, white/black clip points, masked sharpening, a little vignette.
- Product masterclass: exponential exposure +0.3, small contrast with pivot back, output gain trick; copy the same node to every clip; grain tested and deleted for clean 3D.
- Serene render: mostly corrective — small exposure fix, a little clarity/sharpening, a bit of saturation; stop before it shows.
- Realistic Product Lighting: a final soft pass (highlight glow, gentle curve, light vignette, mild temperature) makes sharp renders photographic.
- Ten Cinematic Tips: vignette (lens falloff), grain, curves — blue up in shadows, green down in highlights (richer orange/skin), gentle S contrast.

## STE_PROCEDURE
1. Before grading, confirm the lighting is right in the raw render.
2. Work non-destructively on the merged image (Photoshop: stamp visible Ctrl+Alt+Shift+E → Convert for Smart Filters → Camera Raw; Resolve: serial node Alt+S; raea: one `<Grade>`).
3. Correct exposure in small steps with an exponential/stop control (masterclass: +0.3), not linear brightness.
4. Sweep each control both ways; keep the direction that looks better, else reset (one still per change).
5. Add a little contrast; turn the pivot down slightly to bring highlights back; leave contrast alone if the render is already contrasty.
6. Set whites up / blacks down until the first true white and black pixels appear (full range), keeping shadow detail.
7. Add a small amount of saturation (or the output-gain trick: raise RGB outputs, lower Output Gain ~0.3).
8. Add slight clarity / masked sharpening only on detail (Masking raised so flat areas don't sharpen).
9. Add a slight highlight glow and a gentle contrast curve (soft pass).
10. Curves: raise the Blue channel's shadow end; lower only the Green channel's highlights; gentle S on Combined.
11. Optional split tone: ~5–10 % blue in Shadows (see split-tone-cool-shadows master).
12. Add a little vignette (Ellipse Mask → Blur 40 % relative → Multiply, strength by Mix Factor).
13. Grain: optional and last (see film-grain master); the masterclass deletes it for clean 3D.
14. Optional per-hue calibration (see per-hue-correction master); add Curves above only if an area needs darkening.
15. Compare before/after (Resolve Ctrl+D / Shift+D); stop before contrast or saturation reads as an effect.
16. Apply the same grade to every clip/shot; never grade adjustment clips (doubles the grade); if neighbours differ in contrast, raise the weaker one.

## VALUES BY SOURCE
| parameter | Special Look (CR) | Masterclass (Resolve) | Serene | Product Lighting | Ten Tips (compositor) | recommended for Style D (+ why) |
|---|---|---|---|---|---|---|
| exposure | white/black clip | +0.3 exponential; Global −~0.2 | small fix | — | — | `ToneMapping exposure` 0 to +0.3, judged on a still |
| tone map | — | (AgX Medium High Contrast preview) | — | AgX | — | `"agx"` for Blender-matched shots (BlendShot), `"tony"` for UI-heavy (ProStage) — both kit defaults |
| contrast | untouched usually | slight, pivot down | slight | gentle curve | gentle S | `midtones.contrast` 1.04 (ProStage) – 1.12 (BlendShot LOOK) |
| saturation | high ("eye candy") | pulled back / output gain 0.3 | a bit | — | — | global `saturation` 1.0–1.06; accent via material |
| clarity / sharpen | high + masked sharpen | — | some | — | — | raea: no equivalent → material detail, AA, focus |
| glow | — | — | — | slight highlight glow | — | `<Bloom intensity 0.18–0.45 threshold 0.85–0.9>` |
| vignette | little, negative | — | — | light | Ellipse+Blur 40 %+Multiply | `vignette` 0.18–0.2 (≤ 0.3) |
| colour | blue shadows 5–10 % | — | — | mild temperature | B up in shadows, G down in highlights | `shadows`/`highlights` groups, small `temperature` |
| grain | Amount 20–30 | tested, deleted | — | — | overlay grain image | off (bitrate, clean CG) |
| fringe | — | — | — | — | — | `aberration` 0.002 at most |

## AGENT_EXECUTION
### Source tools
- Photoshop: stamp visible → Smart Object → Camera Raw: Clarity high (~+30–50, visual), Saturation up (~+15–25), Whites +/Blacks − to clip point, Sharpening Amount high + Masking high, Shadows hue blue 5–10 %, Vignetting slightly negative, Grain 20–30.
- Resolve: Color page, serial node; HDR palette Exposure 0.3, Global −~0.2; Primaries Contrast up slightly, Pivot down; optional RGB outputs up + Output Gain ~0.3; copy grade: select target clip, middle-click the graded clip's thumbnail.
### Blender 5.x compositor (look-dev preview only; raea renders the final) — verified on 5.3
```python
import bpy
sc = bpy.context.scene
vs = sc.view_settings
vs.view_transform = 'AgX'; vs.exposure = 0.3
vs.look = 'AgX - Medium High Contrast'          # name present in 5.3's OCIO config
ng = bpy.data.node_groups.new("Grade", "CompositorNodeTree")
ng.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
sc.compositing_node_group = ng                  # 5.x (was scene.node_tree; Composite node → Group Output)
N, L = ng.nodes, ng.links
S = lambda n, i: next(s for s in n.inputs if s.identifier == i)
O = lambda n, i: next(s for s in n.outputs if s.identifier == i)
rl = N.new("CompositorNodeRLayers"); out = N.new("NodeGroupOutput")
W, H = sc.render.resolution_x, sc.render.resolution_y
em = N.new("CompositorNodeEllipseMask"); S(em, "Size").default_value = (0.9, 0.9)          # ~
bl = N.new("CompositorNodeBlur"); S(bl, "Type").default_value = "Gaussian"
S(bl, "Size").default_value = (0.4 * W, 0.4 * H)                                          # 40 % relative (5.x: pixels)
mul = N.new("ShaderNodeMix"); mul.data_type = 'RGBA'; mul.blend_type = 'MULTIPLY'
S(mul, "Factor_Float").default_value = 0.6                                                # ~ vignette strength
img = N.new("CompositorNodeImage")                                                        # optional grain plate
ov = N.new("ShaderNodeMix"); ov.data_type = 'RGBA'; ov.blend_type = 'OVERLAY'; S(ov, "Factor_Float").default_value = 0.3  # ~
cv = N.new("CompositorNodeCurveRGB")
L.new(O(em, "Mask"), S(bl, "Image"))
L.new(O(rl, "Image"), S(mul, "A_Color")); L.new(O(bl, "Image"), S(mul, "B_Color"))
L.new(O(mul, "Result_Color"), S(ov, "A_Color")); L.new(O(img, "Image"), S(ov, "B_Color"))
L.new(O(ov, "Result_Color"), S(cv, "Image")); L.new(O(cv, "Image"), out.inputs[0])
cm = cv.mapping                                   # curves: 0 R, 1 G, 2 B, 3 Combined
cm.curves[2].points[0].location = (0, 0.06)                                   # blue shadows up ~
g = cm.curves[1]; g.points.new(0.7, 0.7); g.points[-1].location = (1, 0.94)  # green highlights down ~
c = cm.curves[3]; c.points.new(0.25, 0.22); c.points.new(0.75, 0.78)         # gentle S ~
cm.update()
```
Links: `Ellipse Mask [Mask] -> Blur [Image]`, `Render Layers [Image] -> Mix(Multiply) [A]`, `Blur [Image] -> Mix(Multiply) [B]`,
`Mix(Multiply) [Result] -> Mix(Overlay) [A]`, `Grain Image [Image] -> Mix(Overlay) [B]`, `Mix(Overlay) [Result] -> RGB Curves [Image] -> Group Output [Image]`.
Skip the overlay/grain branch by linking Multiply straight to Curves.
### raea (the shipped grade; one per piece, first frame's values hold)
```tsx
<ToneMapping mode="agx" exposure={0.2} />                      {/* "tony" for UI-heavy pieces */}
<Bloom intensity={0.3} threshold={0.88} />                     {/* soft highlight glow */}
<Grade saturation={1.05}
       shadows={{ lift: 0.0, saturation: 1, contrast: 1, gamma: 1, gain: 1 }}
       midtones={{ contrast: 1.08, saturation: 1, gamma: 1, gain: 1, lift: 0 }}
       highlights={{ gain: 1.02, saturation: 1, contrast: 1, gamma: 1, lift: 0 }}
       temperature={0}
       vignette={{ intensity: 0.2, radius: 0.8, smoothness: 0.5 }}
       aberration={0.002} />
```
(`~` values; kit `pro.tsx` ships `midtones={{ contrast: 1.04 }} vignette={0.18}`, kit `BlendShot` LOOK ships AgX + contrast 1.12 +
Bloom 0.45/0.85.) Whites/blacks clip point → `highlights.gain` / `shadows.lift` or `exposure`; check true black still holds
detail. Slider sweep → one still per change: `raea render EDIT.tsx --frame N -o F.png`, compare A/B.
- Clarity (local contrast) and masked sharpening: **raea: no equivalent** (Grade is global per tonal range; no sharpen pass) — get crispness from material detail, `<AntiAliasing>` mode and focus.
- Per-channel curves: no exact raea equivalent; approximate with `shadows`/`highlights` groups and `temperature`.
- Grain: no raea equivalent for the PBR look (see film-grain master).

## NOTES
- Deprecated (5.x, verified on 5.3): `scene.node_tree` → `scene.compositing_node_group` (node group with an Image output
  socket; `Composite` node gone → `NodeGroupOutput`); `CompositorNodeMixRGB` gone → `ShaderNodeMix` (`data_type='RGBA'`,
  sockets `A_Color`/`B_Color`/`Result_Color`); Blur's Relative option gone → `Size` socket in pixels; Ellipse Mask width/height
  props → `Size` socket. The Ten Tips member's curve indices (3 = blue, 2 = green) are corrected here: RGB Curves are 0 R, 1 G, 2 B, 3 C.
- Source renders (Serene: 4000×5000, ~300 Cycles samples) are irrelevant — raea is real-time; our output is 1080×1920, 60 fps.
- Visual gaps: most slider values (Camera Raw, Resolve contrast/pivot), mask size, mix factors, curve points and the paid preset's contents are not given (`~`).
- Rule conflicts: Photoshop/Resolve/paid presets replaced by `<Grade>`; never AE. "Saturation high/eye candy" and "clarity cranked" conflict with one-accent restraint — keep global moves modest, judge at phone size. Skipped from Ten Tips: anamorphic 2.39 talk (see cinematic-aspect-letterbox).
