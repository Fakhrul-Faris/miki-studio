---
title: Composition guides — centre, thirds, golden triangle
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/centre-and-thirds-guides-passepartout--product-animation-masterclass.md
  - cards/05_Camera_Raea_Pipeline/composition-guides-golden-triangle--ten-cinematic-tips.md
  - cards/05_Camera_Raea_Pipeline/thirds-or-centre-line-placement--five-ways-environments.md
sources: ["Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt", "10 Tips to make Your 3D Render more Cinematic.txt", "5 Ways to Create Better Environments in Blender.txt", "How Camera Angles Control What We Feel 8 Essential Shots | Visual Storytelling.txt", "Every Composition Concept Explained (In 3D).txt"]
use_when: "placing the hero and labels in a 9:16 frame"
style_fit: Framing discipline for every 2–3 s setup; centre suits the single macro hero; in 9:16 thirds are horizontal bands (y = 640/1280 px) as much as vertical lines. Keep the lower ~25% clear for the EX15 caption panel; guides are check aids only, never in the final.
---

## METADATA
05_Camera_Raea_Pipeline | 2.8+ / 3.x / 4.3 sources → 4.2+/5.x | Blender bpy (camera Viewport Display) + raea numeric aim / review overlay

## CREATIVE_INTENT
The render is a 2D image, so line up important things in the 2D frame: hero dead centre for authority / graphic one-point
shots, or on thirds/golden intersections; horizon or a dominant edge on a thirds line. A starting order and a check, not dogma.
- Product masterclass: hero centred, supporting products on the thirds, extra objects halfway between a third and centre/edge; Passepartout 1.
- Ten Cinematic Tips: golden ratio and golden triangle A/B diagonals pair with a tilted camera; if guides and eye disagree, follow the eye (author drifts things toward edges by taste).
- Five Ways Environments: when unsure, put the horizon/structure edge on a thirds line; try the centre line before anything else; break the grid only deliberately.

## STE_PROCEDURE
1. Look through the camera, not the free viewport, when composing.
2. Open Camera data > Viewport Display > Composition Guides.
3. Set Passepartout to 1.0 (0.9 to dim only) so you judge only the shot.
4. Pick the guide: Center for symmetric/graphic and the single hero; Thirds or Golden for general; Golden Triangle A/B for diagonal (tilted) compositions.
5. Move the hero until it sits on the centre lines (or a thirds intersection).
6. Place supporting objects exactly on the third lines; for more objects, halfway between a third line and the centre/edge (1/6, 5/6).
7. Place the horizon or a dominant edge (counter edge, shelf line) on a thirds line.
8. If the frame still feels disordered, try the centre line before anything else.
9. Before placing anything on the lower third in 9:16, keep the caption safe area (lower ~25%) clear.
10. If the guides and your eye disagree, follow your eye; break the grid only deliberately.
11. (from 8 Essential Shots) For a symmetric setup, centre the hero on the centre line, then balance the leftover
    space on both sides (mirror props, or leave equal empty space) — use it for "the rule/the system/the official
    price" lines, and break it on the next setup so consecutive stills differ.
12. (from Every Composition Concept Explained (In 3D)) For a two-item comparison (two prices, before/after RM, two
    plans), use an asymmetric layout (thirds, not centre/mirror) so the eye is forced to compare sides; return to a
    symmetric layout for the calm/"done" beat that follows. Guides are tools to tell the chosen story, not hard rules.

## VALUES BY SOURCE
| parameter | Product masterclass | Ten Cinematic Tips | Five Ways Environments | 8 Essential Shots | Every Composition Concept | recommended for Style D (+ why) |
|---|---|---|---|---|---|---|
| hero placement | centre | thirds/golden intersections | thirds intersection or centre | centred on the centre line | thirds/golden = "slightly off-centre is often more pleasing" | centre for the single macro hero; upper-third band when a label sits below; thirds when a label/price shares the frame |
| supporting objects | on thirds; 1/6, 5/6 for more | secondary on another intersection | — | mirrored or equal empty space either side | — | thirds / sixths (a "multiply" beat); mirror/equal space for a symmetric authority beat |
| guides | Center → Thirds | Thirds + Golden Triangle A/B | Thirds + Center | Center (symmetry) | Thirds/Golden (asymmetry) vs Center (symmetry) | Thirds + Center; Golden Triangle for tilted setups |
| meaning / when to use | — | — | — | symmetry reads ordered, deliberate, imposing | symmetry = balance/calm; asymmetry = imbalance that forces a side-by-side comparison, i.e. tension | symmetric for "the rule"/calm/solution beats; asymmetric thirds for comparison lines (two prices, before vs after) |
| passepartout | 1.0 | 0.9 | 1.0 | — | — | 1.0 |
| 9:16 targets | x = 360/540/720 px, y = 640/960/1280 px | — | y = 640 / 1280 px | — | — | same; bottom ~480 px reserved for captions |

## AGENT_EXECUTION
Blender 5.x:
```python
import bpy
from bpy_extras.object_utils import world_to_camera_view
scn = bpy.context.scene
d = scn.camera.data
d.show_passepartout = True; d.passepartout_alpha = 1.0
d.show_composition_center = True
d.show_composition_thirds = True
d.show_composition_golden = False
d.show_composition_golden_tria_a = False   # or _tria_b, for diagonal setups
d.show_composition_center_diagonal = False
d.show_composition_harmony_tri_a = False
v = world_to_camera_view(scn, scn.camera, bpy.data.objects["Hero"].matrix_world.translation)
print("hero at", round(v.x, 3), round(v.y, 3), "(thirds .333/.667, sixths .167/.833, centre .5)")
```
raea (no guides — they are a viewport aid): aim numerically, then check a still.
```tsx
// hero on the upper-third line of a 9:16 frame: aim below the hero (camera roughly level; dist = camera→hero)
// upper third = 1/3 in NDC → offset = dist * tan(fov/2) / 3
const aim: V3 = [hero[0], hero[1] - (dist * Math.tan(fov / 2)) / 3, hero[2]];
<Camera3d transform={Transform.fromXyz(...cam).lookingAt(aim)} projection={{ Perspective: { fov } }} />
```
Kit `project()` in `iso.tsx` is orthographic only; for perspective compute with the camera's fov. Review overlay: thin
absolute-positioned page divs at x = 360/720, y = 640/1280 px in a review render only (removed before final);
`raea render EDIT.tsx --frame N -o check.png`.

## NOTES
- Deprecated: none (Composition Guides on camera data since 2.8; the "viewport overlay" naming in Five Ways is the camera's Viewport Display).
- Visual gaps: which two regions the golden triangle targets (Ten Tips) and the overlay toggle location (Five Ways) are on screen only.
- Rule conflicts: keep EX15 captions' safe area clear on the lower third; overlays never in finals.
- Visual gaps: 8 Essential Shots and Every Composition Concept give no numeric framing targets (symmetry/asymmetry
  choice is by eye, per CREATIVE_INTENT).
