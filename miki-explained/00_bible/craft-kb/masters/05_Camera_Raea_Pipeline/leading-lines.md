---
title: Leading lines converge on the focal point
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/leading-lines-converge-on-focal--improve-compositions.md
  - cards/05_Camera_Raea_Pipeline/leading-lines-to-focal-point--five-ways-environments.md
sources: ["3 Ways to Improve Your Compositions in Renders.txt", "5 Ways to Create Better Environments in Blender.txt", "Every Composition Concept Explained (In 3D).txt", "Why Your Videos Don't Look Like Movies Yet.txt"]
use_when: "pointing the eye to the hero via set lines"
style_fit: Strong fit — in a 2–3 s setup the viewer must find the hero instantly; counter edges, surface grain, cables, receipt rolls and shelf rows aim at the object the spoken line is about. Angle what's there, don't add clutter; pair with the one accent on the focal object.
---

## METADATA
05_Camera_Raea_Pipeline | n/a sources → 4.2+/5.x | principle + Blender bpy (placement + 2D check) + raea placement

## CREATIVE_INTENT
Lines already exist in every model (edges, rails, rows, roof slopes, cables, branches); placing and angling objects so most of
them run toward one point removes the viewer's effort — they know where to look without thinking. Not every line must point; most should.
- Improve Compositions: beginners overwhelm with information and no guidance; use perspective (receding edges) and let weak elements (a log, a branch) nudge from the corners.
- Five Ways Environments: lines only matter in the 2D frame; check in rendered camera view and re-angle any strong line that leads out of frame.

## STE_PROCEDURE
1. Pick the single point the eye should land on (the object the spoken line is about).
2. Look through the camera (rendered view) and identify the strong lines: edges, rails, rows, cables, arches, roof slopes.
3. Rotate or move objects so their dominant lines point toward the focal point.
4. Angle long objects so their receding perspective edges converge toward the focal point.
5. Let weak elements add a gentle nudge from the frame corners.
6. Remove or re-angle any strong line that leads the eye out of frame.
7. Re-check through the camera — lines matter in 2D, not 3D; wherever the eye lands first, it should be pushed to the focal point.
8. (from Every Composition Concept Explained (In 3D)) After angling lines, check that no two strong lines cross each
   other anywhere except at (or near) the focal point; conflicting crossing lines, and any line that sends the eye
   out of the frame, are both failures — re-angle one of them.
9. (from Why Your Videos Don't Look Like Movies Yet) Make the convergence point the brightest spot in frame: aim the
   lines and the key light at the same place on the subject, so light and geometry agree. Use the lines' real-world
   association deliberately: downward lines read as loss/decline; a converging perspective toward a lit point reads
   as "we already know where we're headed".

## VALUES BY SOURCE
| parameter | Improve Compositions | Five Ways Environments | Every Composition Concept | Look Like Movies | recommended for Style D (+ why) |
|---|---|---|---|---|---|
| line sources | bridge, building edges, spires, roofs, branches, wagon, log | ropes, arches, edges, rows | — | walls/floor/ceiling convergence, rails | table/counter edge, surface grain, cable, receipt, shelf rows |
| check | eye test | 2D projection | no two strong lines cross off the focal point | — | 2D miss distance < ~0.05 frame units; also check no stray crossing |
| emphasis | — | — | — | convergence point = brightest spot (light meets lines) | key light rakes along the line; DoF keeps it sharp near the focal point |
| meaning (optional) | — | — | — | down = decline/loss; tilt = "can't trust a straight line" (pair with `dutch-roll.md`) | downward lines for a loss/decline line; small roll only for a distrust beat |

## AGENT_EXECUTION
Blender 5.x — aim a prop's long axis at the focal point, then verify in 2D:
```python
import bpy, math
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view as w2c
scn = bpy.context.scene; cam = scn.camera
focal3 = bpy.data.objects["Hero"].matrix_world.translation
for name in ["Plank", "Rail", "Cable"]:                     # ~ example props
    ob = bpy.data.objects[name]
    d = focal3 - ob.location                                 # lying on the surface: yaw only
    ob.rotation_euler.z = math.atan2(d.y, d.x)               # long axis = local X (~ check model)
bpy.context.view_layer.update()
def p2(v): q = w2c(scn, cam, v); return Vector((q.x, q.y))
focal = p2(focal3)
def miss(a, b):                                              # focal's distance from the 2D line a→b
    d = (b - a).normalized(); n = Vector((-d.y, d.x)); return abs((focal - a).dot(n))
for name in ["Plank", "Rail", "Cable"]:
    o = bpy.data.objects[name]
    a, b = p2(o.matrix_world @ Vector((0, 0, 0))), p2(o.matrix_world @ Vector((1, 0, 0)))
    print(name, "miss", round(miss(a, b), 3))               # < ~0.05 = leads to the focal point
```
raea (placement only; no special prop), prop with long axis X:
```tsx
<Mesh3d name="cable" transform={Transform.fromXyz(px, py, pz).withRotation(Quat.fromEuler("XYZ", 0, Math.atan2(-(fz - pz), fx - px), 0))}>…</Mesh3d>
<SpotLight transform={Transform.fromXyz(...sideOfLine).lookingAt(hero)} intensity={…} outer_angle={0.5} />   {/* rake along the line */}
```
Render a still to check: `raea render EDIT.tsx --frame N -o check.png`.

## NOTES
- Deprecated: none.
- Style D sets are sparse (one hero on a real surface): lines come from the surface and a few props — angle them, don't add clutter.
- Visual gaps: example images on screen only.
- Rule conflicts: none; the optional "meaning" row (down = decline, tilt = distrust) is a narrative add-on, used only
  when the line itself calls for it, not a default.
