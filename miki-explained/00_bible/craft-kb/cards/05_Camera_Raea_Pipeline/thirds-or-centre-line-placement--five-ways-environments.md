---
title: Rule of thirds or centre line as the starting grid (composition guides in the camera view)
bucket: 05_Camera_Raea_Pipeline
source: "5 Ways to Create Better Environments in Blender.txt"
source_time: "02:58–05:38"
blender_version_source: n/a? (Composition Guides exist 2.8+)
tool_target: Blender bpy | raea
tier: full
style_fit: Gives each 2–3 s setup a deliberate placement for the hero object and horizon; centre placement suits the single macro hero.
---

## METADATA
05_Camera_Raea_Pipeline | 2.8+ → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
The render is a 2D image, so line up important things in that 2D frame. When you don't know where to put something, put the horizon, a structure edge or the subject on a thirds line / intersection, or dead centre. It's a starting order, not a rule; plenty of good frames ignore it.

## STE_PROCEDURE
1. Look through the camera, not the free viewport, when composing.
2. Enable the camera's Composition Guides: Thirds and Center.
3. Place the subject on a thirds intersection or on the centre line.
4. Place the horizon or a dominant edge (sky/tree line, counter edge) on a thirds line.
5. If the frame still feels disordered, try the centre line before anything else.
6. Break the grid only deliberately.

## AGENT_EXECUTION
Blender (the video says "viewport overlay settings"; the toggles are on the camera data, Viewport Display > Composition Guides):
```python
import bpy
cam = bpy.context.scene.camera.data
cam.show_composition_thirds = True
cam.show_composition_center = True
cam.passepartout_alpha = 1.0
# check: where does the hero land in frame (0..1)?
from bpy_extras.object_utils import world_to_camera_view
scn = bpy.context.scene
v = world_to_camera_view(scn, scn.camera, bpy.data.objects["Hero"].matrix_world.translation)
print("hero at", round(v.x, 3), round(v.y, 3), "(thirds = .333/.667, centre = .5)")
```
raea (9:16): place by aiming the camera so the hero projects onto the thirds/centre point. For a 1080×1920 frame the vertical thirds are y = 640 and 1280 px. A quick off-centre aim: shift the look-at point opposite the desired screen offset.
```tsx
// hero at screen-upper-third: aim slightly below the hero
// upper third line = 1/6 of frame height above centre = 1/3 in NDC → offset = dist * tan(fov/2) / 3
const aim: V3 = [hero[0], hero[1] - (dist * Math.tan(fov / 2)) / 3, hero[2]];   // camera roughly level; dist = camera→hero
<Camera3d transform={Transform.fromXyz(...cam).lookingAt(aim)} projection={{ Perspective: { fov } }} />
```
2D check: overlay guides as page divs only in a review render, never in the final.

## NOTES
- Deprecated: none.
- Visual gaps: the overlay toggle location is shown on screen ("I'll put up a screen recording"); path above is the canonical one.
- Rule conflicts: none. In 9:16 keep the lower ~25% clear for EX15 captions when choosing the lower third line.
