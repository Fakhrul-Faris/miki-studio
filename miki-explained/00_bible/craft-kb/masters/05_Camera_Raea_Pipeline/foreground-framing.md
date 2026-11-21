---
title: Frame the subject with scene elements / blurred foreground
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/blurred-foreground-framing-dof--renders-instantly-cooler.md
  - cards/05_Camera_Raea_Pipeline/natural-framing-elements--five-ways-environments.md
sources: ["6 Tips to Make Your Renders Instantly Cooler.txt", "5 Ways to Create Better Environments in Blender.txt", "Why Your Videos Don't Look Like Movies Yet.txt", "Overwatch Dragon Brothers - Visual language and 3D camera lessons.txt"]
use_when: "depth and framing in a macro setup"
style_fit: Fits Style D macro — an out-of-focus near object built from the scene's own items (coin edge, receipt corner, price tag) frames the hero, sells shallow DoF and gives parallax on moves; also a source for object-wipe transitions. Framing objects fade/slide in over ~0.4 s, never pop; no random foliage on a tabletop.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x / n/a sources → 4.2+/5.x | Blender bpy (layout) + raea DepthOfField

## CREATIVE_INTENT
Like a picture frame made of things in the scene: put objects close to the lens at the frame edges and let them blur. It adds a
near depth layer, blocks parts of the image to say where to look, and depth reads much stronger once the camera moves
(foreground parallax) — so a hold or slow push never looks like a flat product slide.
- Renders Instantly Cooler: one object very near the lens, partly in frame, blurred with low f-stop; parallax on camera moves.
- Five Ways Environments: arches, foliage, blurred objects, even a literal frame, leaving an opening around the focal point; the framing object can be the wipe into the next setup.

## STE_PROCEDURE
1. Before placing the foreground element, lock the camera and the hero's position; identify the focal point's place in frame.
2. Place one or more scene-native objects between camera and subject, near the frame edges.
3. Keep them partly in frame (a corner or side), leaving an opening; never cover the subject.
4. Keep framing objects darker or out of focus so they don't compete.
5. Enable Depth of Field on the camera and set Focus Object (or Distance) to the hero.
6. Lower F-Stop until the foreground is clearly soft (~1.4–2.8) while the hero stays sharp.
7. Check the opening in camera view: the focal point sits fully inside it; move elements until they lead the eye to the hero.
8. Use it on a hold or slow push so parallax shows.
9. Before a cut or flight, consider using the framing object as the wipe that carries the camera into the next setup.
10. (from Why Your Videos Don't Look Like Movies Yet) When the line has a cause and a consequence, put one in a nearer
    depth layer and the other in a farther one, inside the same frame (cause front, consequence behind) instead of
    cutting to a second shot; keep only the subject sharp so the rest blurs and stops competing.
11. (from Overwatch Dragon Brothers) Before keying a moving setup, list its three depth layers (fg item, hero,
    background shape); if the frame only has two, add a background element purely for depth (even a soft shape added
    "as a post idea"). Keep the same background element across every setup of one location so the place stays readable.

## VALUES BY SOURCE
| parameter | Renders Instantly Cooler | Five Ways Environments | Look Like Movies | Overwatch camera lessons | recommended for Style D (+ why) |
|---|---|---|---|---|---|
| element | a tree (one object) | arch, foliage, blurred objects, picture frame | any scene element; story content allowed in the far layer | bridge/wires near; mountain far | a second coin / tag / receipt edge from the scene |
| placement | near lens, frame edge (~0.6 m ahead, camera-local) | frame edges, opening around focal point | fore/mid/back, 3 layers "to make you want to step inside" | fore (near), mid (subject), back (one bg shape) | camera-local ~(±0.25–0.35, −0.15–0.2, −0.6) scaled to the set; one bg shape kept consistent across a location's setups |
| f-stop | ~1.4–2.8 (~2 shown) | ~2 | keep just the subject sharp; rest blurs | — | 2.0–2.2 (kit ProStage 2.2) |
| tone | — | darker or out of focus | — | — | dark side to camera (see dark-edge-framing) |
| motion | slow push/hold for parallax | can be the transition wipe | — | camera follow gives "really beautiful parallax" | eased push; element enters with the camera or fades in 0.4 s |
| story use | — | — | cause/effect in two depth layers of one frame (e.g. *Citizen Kane*: mother signs papers front, boy plays outside back) | keep the same bg element through a sequence so location reads | cause in one layer, consequence in another (bill in front, empty till behind) |

## AGENT_EXECUTION
Blender 5.x:
```python
import bpy
from mathutils import Vector
cam = bpy.context.scene.camera
cam.data.dof.use_dof = True
cam.data.dof.focus_object = bpy.data.objects["Hero"]
cam.data.dof.aperture_fstop = 2.0                               # ~ not given
fg = bpy.data.objects["FG_Frame"]                               # tag / coin / receipt edge
fg.location = cam.matrix_world @ Vector((0.3, -0.18, -0.6))     # ~ camera-local offset, frame edge
```
raea (the blur is the camera's, render time):
```tsx
<Camera3d transform={Transform.fromXyz(...camP).lookingAt(hero)} projection={{ Perspective: { fov: (35 * Math.PI) / 180 } }}>
  <DepthOfField focal_distance={distToHero} aperture_f_stops={2} />   {/* animate focal_distance per frame for a pull */}
</Camera3d>
<Model name="fg-frame" src={staticFile("tag.glb")} position={nearLensEdge} />   {/* dark, unlit side toward camera */}
```
Kit `ProStage` (`tools/raea/kit/pro.tsx`) already takes `focus` and `aperture`.

## NOTES
- Deprecated: none (camera DoF unchanged in 4.x/5.x).
- Visual gaps: exact placements, example framings and f-stop are shown only on screen.
- Rule conflicts: foreground must be the scene's own objects (house rule) — no random foliage in a macro tabletop shot; a framing object entering the shot fades/slides in over ~0.4 s, never pops; scene-object wipes are encouraged transitions.
- Visual gaps: Look Like Movies and Overwatch give no numeric placements or f-stops (by eye, confirm on a still).
