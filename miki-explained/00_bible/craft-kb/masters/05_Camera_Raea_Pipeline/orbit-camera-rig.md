---
title: Orbit camera rig (Empty parent or Follow Path + Track To)
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/empty-parent-orbit-camera-rig--cinematography-next-level.md
  - cards/05_Camera_Raea_Pipeline/follow-path-orbit-camera-track-to--product-animation-masterclass.md
sources: ["Take your Blender Cinematography to the Next Level!.txt", "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt", "Cinematic Camera Movements Blender Tutorial.txt"]
use_when: "orbit around the hero object, orbit to top-down"
style_fit: Strong fit — smooth arc flights around the one macro hero, hero always framed. Every orbit eased in-out (no linear starts/stops), ≤ ~130°/s; the masterclass's "fast start" only right after a cut. Parented/constrained rigs bake through blend2raea per frame.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x / 4.3 sources → 4.2+/5.x | Blender bpy → raea per-frame orbit transform

## CREATIVE_INTENT
Orbit the camera around the hero so it is always framed: quick angle-hunting when you can't decide, and clean arc moves that
show each arrival from its best side.
- Cinematography Next Level: camera parented to an Empty at the subject; rotate the Empty (trackball R R) to hunt angles, key its rotation to orbit.
- Product masterclass: Follow Path on a tilted Bézier circle + Track To the hero; tilt the circle for a diagonal arc; plan the hand-off to the next shot; the Offset curve sets the feel (fast start, long glide) and is retimed so speed peaks don't fight objects popping in.

## STE_PROCEDURE
1. Plan transitions first: know which shot comes next so the orbit hands over cleanly.
2. Variant A (Empty parent): add an Empty at the subject's location.
3. Place the camera in front of the target, aimed at it.
4. Select the camera, then Shift-select the Empty (active); parent with Ctrl+P > Object (keep transform).
5. Select the Empty, press R R (Trackball) and orbit until the shot looks good; keyframe the Empty's Rotation to animate.
6. Variant B (Follow Path): add a new Camera; View > Cameras > Set Active Object as Camera.
7. Place the 3D cursor at the hero; add Curve > Circle.
8. On the camera add Follow Path (target = circle); zero the camera's Location so it sits on the circle.
9. Add Track To (target = hero) so the camera always points at it.
10. Rotate/scale the circle so the start matches the previous shot's view; key the circle's Location/Rotation/Scale to adjust later.
11. Key Follow Path Offset at frame 0, ~35 and the end (~50).
12. Shape the timing: keys closer at the start for fast-then-slow; flatten the end in the Graph Editor so it keeps drifting to the end.
13. Retime keys so the camera slows while the last object arrives (speed peaks must not fight a pop-in).
14. Check angular speed stays under ~130°/s and starts/stops are eased.
15. (from cinematic-camera-movements) For a rising orbit, shape the Follow Path curve as a **spiral**, not a flat
    circle, so the camera circles and pedestals in one move (Matrix bullet-dodge reference); place the camera at
    the curve's start, then animate Offset, then add Track To last (after Follow Path) so the path doesn't override
    the aim. For a pure tracking shot (camera location keyed freely, always facing the subject), Track To alone is
    enough — raea: `.lookingAt(subjectPos)` every frame.

## VALUES BY SOURCE
| parameter | Cinematography Next Level | Product masterclass | cinematic-camera-movements | recommended for Style D (+ why) |
|---|---|---|---|---|
| rig | Empty parent, rotate Empty | Follow Path circle + Track To | Follow Path **spiral** (rises while circling) + Track To added last | Empty parent in Blender (simplest); direct sin/cos orbit in raea |
| arc | trackball angle by eye (40° example) | tilted circle (~0.35, 0, 0.6 rad), r ~0.5 | spiral curve, height + angle both animated | 30–60° per setup, tilt for diagonal; spiral = orbit + pedestal in one move, ≤ ~90° of arc per 2–3 s setup |
| timing | keyed rotation 1→60 f | offset keys 0 / 35 / 50 f, fast→slow | — | `Easing.inOut(Easing.cubic)`; `Easing.bezier(0.33, 0, 0.2, 1)` only right after a cut |
| speed | — | — | — | ≤ ~130°/s (40° over 2 s ≈ 20°/s avg) |

## AGENT_EXECUTION
Blender 5.x — Variant A (Empty parent):
```python
import bpy, math
sc = bpy.context.scene; cam = sc.camera
subject = bpy.data.objects["Hero"]
rig = bpy.data.objects.new("CamRig", None); sc.collection.objects.link(rig)
rig.location = subject.location
bpy.context.view_layer.update()
cam.parent = rig
cam.matrix_parent_inverse = rig.matrix_world.inverted()   # = Ctrl+P > Object (keep transform)
rig.rotation_euler = (0, 0, 0);                rig.keyframe_insert("rotation_euler", frame=1)
rig.rotation_euler = (0, 0, math.radians(40)); rig.keyframe_insert("rotation_euler", frame=60)
```
Variant B (Follow Path + Track To):
```python
import bpy
cam = bpy.context.scene.camera
hero = bpy.data.objects["Hero"]
bpy.ops.curve.primitive_bezier_circle_add(radius=0.5, location=hero.location); circ = bpy.context.object
circ.rotation_euler = (0.35, 0.0, 0.6)                     # ~ tilt to match the start view
fp = cam.constraints.new('FOLLOW_PATH'); fp.target = circ; cam.location = (0, 0, 0)
tt = cam.constraints.new('TRACK_TO'); tt.target = hero; tt.track_axis = 'TRACK_NEGATIVE_Z'; tt.up_axis = 'UP_Y'
for fr, v in ((0, 0.0), (35, -40.0), (50, -50.0)):         # offset values ~
    fp.offset = v; cam.keyframe_insert('constraints["Follow Path"].offset', frame=fr)
```
(Curve handles for fast-then-slow: edit via `bpy_extras.anim_utils.action_get_channelbag_for_slot(cam.animation_data.action, cam.animation_data.action_slot).fcurves` in 5.x — `Action.fcurves` is gone.)
blend2raea/BlendShot export the camera per frame, so either rig carries into raea unchanged.

raea (direct):
```tsx
const e = interpolate(f, [0, 60], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const a = a0 + (a1 - a0) * e;                               // e.g. 0 → 40° (≈20°/s average over 2 s)
const p: V3 = [hx + r * Math.sin(a), hy + h + tilt * Math.sin(a), hz + r * Math.cos(a)];   // tilt = 0 for a flat orbit
<Camera3d transform={Transform.fromXyz(...p).lookingAt([hx, hy, hz])} projection={{ Perspective: { fov: 0.6 } }} />
```
Orbit to top-down: also ease `h` up and `r` down; keep the look-at slightly off vertical (scene.md: `.lookingAt` straight
down has no up). Speed check: `(a1 − a0) × maxSlope / (frames / fps)` < ~130°/s.

## NOTES
- Deprecated: `Action.fcurves` → channelbag fcurves (5.x).
- Visual gaps: trackball angle, circle tilt, radius and offset values are chosen by eye.
- Rule conflicts: no linear starts if the camera is already on screen; the "fast start" is acceptable only right after a cut; cap ~130°/s.
- cinematic-camera-movements: the spiral is a combined orbit+pedestal move, not a new rig type — raea spiral:
  `Transform.fromXyz(r*Math.sin(a), lerp(h0, h1, p), r*Math.cos(a)).lookingAt(hero)` with `a` and `p` from the same
  eased progress. Doesn't change the Style D pick (Empty parent in Blender / direct sin-cos in raea); adds a
  height term to the existing orbit math.
