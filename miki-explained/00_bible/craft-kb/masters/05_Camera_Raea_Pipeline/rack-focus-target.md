---
title: Rack focus / focus locked to a target Empty
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/focus-distance-measured-to-target--cg-cine-ch2-camera-breakdown.md
  - cards/05_Camera_Raea_Pipeline/rack-focus-empty-target--cinematography-next-level.md
  - cards/05_Camera_Raea_Pipeline/two-empty-aim-and-focus-rig--blender-camera-rig.md
sources: ["CG Cinematography 101 | Chapter 2 | Basic Camera Breakdown.txt", "Take your Blender Cinematography to the Next Level!.txt", "Making blenders camera actually good.txt"]
use_when: "shifting attention from one object to another on the word"
style_fit: Core Style D tool — a rack from the context object to the one the line is about, on the spoken word, without a cut. Pull eased in-out over ~0.4–0.8 s starting on the word; no snap focus, no linear keys. BlendShot exports no DoF — add focus distance in TSX (or to the export).
---

## METADATA
05_Camera_Raea_Pipeline | Houdini / Blender 3.x sources → 4.2+/5.x | Blender bpy → raea DepthOfField focal_distance per frame

## CREATIVE_INTENT
Animating a focus-distance number by hand is fiddly; put focus on a movable target and let the distance follow. Shifting the
focus point during a shot tells the viewer where to look and reveals the crucial detail; a target parented to the hero keeps
focus locked on a moving subject.
- CG Cine 101 Ch2: focus distance = measured length of a line camera → target sphere; move/key the sphere to pull focus.
- Cinematography Next Level: a keyframed Empty as Focus Object, keyed at subject 1 then subject 2, f-stop a real lens can make.
- Blender Camera Rig: two empties — FT (aim, Damped Track) and FP (focus, Copy Location with offset from FT) so focus rides along with the aim; saved as a reusable collection.

## STE_PROCEDURE
1. Set up and key the camera's location/rotation for the shot first.
2. Add an Empty as focus target (FP; sphere display to tell it apart) on the first subject.
3. In Camera > Depth of Field, enable it and set Focus on Object = FP.
4. Set F-Stop to a value a real lens can produce (~1.4–2.8); DoF depends on focal length, sensor size and above all F-Stop.
5. Optional aim rig: add a second Empty FT; add Damped Track to the camera (Target FT, Track Axis −Z).
6. Optional: add Copy Location on FP (Target FT, Offset on) so focus keeps its offset when the aim moves.
7. Optional lock: parent FP to the hero so focus stays on a moving subject.
8. Rack: key FP's Location at subject 1; move it to subject 2 and key again, eased, starting on the word (~0.4–0.8 s).
9. Save camera + empties as one collection in a library .blend; File > Append it in later projects.

## VALUES BY SOURCE
| parameter | CG Cine 101 (Houdini) | Cinematography Next Level | Blender Camera Rig | recommended for Style D (+ why) |
|---|---|---|---|---|
| focus driver | measured line length to sphere | Focus Object = Empty | Focus Object = FP (Copy Location offset from FT) | `focal_distance` = |cam − target| per frame |
| aim | — | keyed camera | Damped Track to FT | `lookingAt(aim)` |
| f-stop | — | ~1.4–2.8 (not given) | ~2.8 (not given) | 2.0–2.8 (`mode="bokeh"`) |
| rack timing | move the sphere | keys frame 1 → 36 (example) | FP moves ~0.4–0.8 s | 12–24 frames at 30 fps, eased in-out, on the word |

## AGENT_EXECUTION
### Source tool (Houdini)
Camera-focus SOP net: `sphere` + `object_merge (cam origin)` → `add` (two-point polyline) → `measure` (perimeter). Camera Focus
Distance expression: `prim("../focus_net/measure1", 0, "perimeter", 0)`. Promote the sphere's Transform to the top. (Houdini needed a restart for the expression to update.)
### Blender 5.x
```python
import bpy
scn = bpy.context.scene; cam = scn.camera
def empty(name, kind, size=0.05):
    e = bpy.data.objects.new(name, None); e.empty_display_type = kind; e.empty_display_size = size
    scn.collection.objects.link(e); return e
ft = empty("FT", 'SPHERE'); fp = empty("FP", 'PLAIN_AXES')
cam.data.dof.use_dof = True
cam.data.dof.focus_object = fp
cam.data.dof.aperture_fstop = 2.0                         # ~
c = fp.constraints.new('COPY_LOCATION'); c.target = ft; c.use_offset = True      # optional: focus rides the aim
t = cam.constraints.new('DAMPED_TRACK'); t.target = ft; t.track_axis = 'TRACK_NEGATIVE_Z'
fp.location = (0.0, -0.5, 0.1); fp.keyframe_insert("location", frame=1)          # subject 1
fp.location = (0.0,  0.8, 0.1); fp.keyframe_insert("location", frame=36)         # subject 2 (eased Bezier keys)
rig = bpy.data.collections.new("CameraRig"); scn.collection.children.link(rig)
for o in (cam, ft, fp):
    for col in o.users_collection: col.objects.unlink(o)
    rig.objects.link(o)
# reuse: bpy.ops.wm.append(directory="/path/lib.blend/Collection/", filename="CameraRig")
```
### raea (the rig collapses to three per-frame values: camera position, look-at, focus distance)
```tsx
import { DepthOfField } from "raea/3d";
const p: V3 = camAt(f), aim: V3 = ftAt(f);                       // from the bake (blend2raea) or interpolate()
const e = interpolate(f, [w0, w0 + 18], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const fpt: V3 = [lerp(a[0], b[0], e), lerp(a[1], b[1], e), lerp(a[2], b[2], e)];   // subject a → subject b, from the word frame w0
const focus = Math.hypot(fpt[0] - p[0], fpt[1] - p[1], fpt[2] - p[2]);
<Camera3d transform={Transform.fromXyz(...p).lookingAt(aim)} projection={{ Perspective: { fov: (35 * Math.PI) / 180 } }}>
  <DepthOfField focal_distance={focus} aperture_f_stops={2} mode="bokeh" />
</Camera3d>
```
`focal_distance` animates per frame (post.md). Kit: `ProStage` (pro.tsx) takes `cam: {p, t, fov}` + `focus` + `aperture` — pass
the computed `focus`; `BlendShot` plays `{p, t, fov}` only, so add the focus distance to the blend2raea export or compute it in TSX.

## NOTES
- Deprecated: none (`dof.focus_object`, Damped Track, Copy Location offset stable 2.8 → 5.x).
- Visual gaps: Houdini node wiring partly on screen (expression reconstructed from speech); Next Level gives no f-stop or key timings.
- Rule conflicts: none; ease FT/FP keys (Bezier, Auto Clamped), never linear starts/stops; rack starts on the spoken word.
