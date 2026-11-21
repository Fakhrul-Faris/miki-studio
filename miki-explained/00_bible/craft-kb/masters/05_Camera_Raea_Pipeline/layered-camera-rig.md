---
title: Layered camera rig (separate translate / rotate / shake transforms)
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/layered-camera-transform-stack--cg-cine-ch3-nuke.md
  - cards/05_Camera_Raea_Pipeline/layered-rotation-dolly-camera-rig--cg-cine-ch2-camera-breakdown.md
sources: ["CG Cinematography 101 | Chapter 3 | Camera Analysis (The Nuke).txt", "CG Cinematography 101 | Chapter 2 | Basic Camera Breakdown.txt", "Apple-Style 3D Motion Design.txt", "How to Create Viral Apple-Style UI Widget Animations in After Effects! (Apple Masterclass Part 2).txt", "How to actually make eye-catching 3D Scenes | After Effects.txt", "Smooth 3D Camera Movement in After Effects Transcript.txt", "Smooth UI Animation After Effects Tutorial.txt"]
use_when: "complex camera flights that stay editable"
style_fit: Fits Style D — separating where the camera travels from how it aims keeps flights smooth, eased and editable. Each layer eased and within ≤ ~130°/s, ≤ ~40 m/s; the sources' "quite extreme" moves and shake layers are toned down (shake flagged in rotation-noise-camera-shake--cg-cine-ch3-nuke). Roll doesn't survive BlendShot export — add in TSX.
---

## METADATA
05_Camera_Raea_Pipeline | Houdini sources → Blender 4.2+/5.x + raea | principle + Blender bpy + raea

## CREATIVE_INTENT
Don't animate everything on one camera transform; stack helpers like a real rig so each layer's curves stay simple and can be
retimed or muted without breaking the others, with every rotation pivoting on the camera itself.
- Ch2 Basic Breakdown: main camera = rotation only (pan/tilt/roll), set once; a "dolly" parent = translation only (push/slide/boom); a shake layer on top; duplicate the whole rig for a variant.
- Ch3 The Nuke: adds a "follow" layer that copies the subject's move (camera follows automatically if the subject's speed changes) and a "correct" layer for hand-keyed push-ins/offsets; several shake layers.

## STE_PROCEDURE
1. Place the main camera at the starting frame and composition; from now on animate only its rotations (and focal length).
2. Add a parent transform with Keep Position When Parenting on; clean (zero) its transforms so nothing is applied twice.
3. Never move the main camera's translates after parenting; translate only on parent layers.
4. Follow layer (optional): copy the subject's main-move channel into the parent's translate (negate if the axis is inverted), or give it the subject's curve.
5. Correct/dolly layer: add another parent for hand-keyed push / slide / boom / reframe; clean its transforms.
6. Animate pan / tilt / roll on the main camera only.
7. Shake layers (optional): add further parents for noise; before adding one, check its pivot coincides with the camera (an offset pivot swings the camera round the wrong point).
8. For a different move variant, duplicate the whole rig rather than re-plugging a second transform into the chain (re-plugging re-bases values and corrupts the move); avoid shared relative references between rigs (a shared shake changes both).
9. Alternative without parenting: give the camera the same move curve as the subject.
10. On the hero OBJECT (not camera) use the same two-carrier idea: accent carrier for in/out rotation + scale accents only, travel carrier for the sustained linear drift; move the anchor to screen centre first so rotation pivots there (from Apple-Style 3D Motion Design).
11. For a chain of several distinct moves on one shot in time (push, then zoom, then pan), add a new carrier per MOVE, not per role, and partially overlap each carrier's keyframe range with the next — never fully sequential (stiff) or fully simultaneous (muddy); wider key spacing is its own smoothness lever (from Smooth 3D Camera Movement).
12. Choose the easing shape by the move's position in the clip: ease-in/ease-out (value-graph shape) for a move at the very start or end of the clip; a gentle hump (speed-graph shape) for a move in the middle of the clip (from Smooth 3D Camera Movement).
13. For a UI panel/screen carrier: before the current setup's move ends, key the outgoing carrier position first, then move forward and key the next setup's position — pre-load each handoff rather than reacting to it; add a small consistent pull-back per setup change (from Apple-Style UI Widget Animations).
14. Duplicate-and-parent shortcut for a simple two-move overlap: duplicate the move carrier, delete its stray last key, parent the duplicate to the original — gives the same overlap as a new carrier with one fewer object, when only two sequential moves (no follow layer) are needed (from "eye-catching 3D Scenes").
15. Nested UI tumble variant (screen flies in, flips to reveal a back face, settles): carrier 1 keys scale+rotX+rotY in; carrier 2 (child) keys the flip; duplicate the panel with rotY 180°+small +Z offset for the real back face; carrier 3 (child) keys the settle push/orientation — stretch the flip's duration (180° needs ≥ ~1.4 s at the house ≤130°/s cap, or split it across a cut) (from Smooth UI Animation).

## VALUES BY SOURCE
| parameter | Ch2 Basic Breakdown | Ch3 The Nuke | recommended for Style D (+ why) |
|---|---|---|---|
| layers | dolly (translate) → camera (rotate) → shake | follow → correct → camera (rotate) → shake ×n | follow (optional) → move (translate) → camera (aim) |
| follow | — | subject translate Z copied, negated | `COPY_LOCATION` with offset, or per-frame subject position in TSX |
| shake | separate layer | Motion Effects > Noise on rotation | off by default (house rule: smooth eased moves) |
| move intensity | "quite extreme" | push-in + corrections | eased in-out, ≤ ~130°/s, ≤ ~40 m/s |

### Additional sources (folded, Phase C)
| parameter | Apple-Style 3D Motion | Apple UI Widget Pop-ups | eye-catching 3D Scenes | Smooth 3D Camera Movement | Smooth UI Animation | recommended for Style D (+ why) |
|---|---|---|---|---|---|---|
| object-side rig | accent null (rotation+scale in/out) → travel null (linear) | — | — | — | — | accent `Entity` eased in/out inside a steady-travel `Entity`; linear travel is house-OK only because it never starts/stops on screen |
| per-setup rig | — | one new null per UI pop-up scene, chained serially, camera parented to topmost | — | — | — | plan both ends of each handoff in the shot list together; small consistent pull-back per setup, not per-scene improvisation |
| two-move overlap | — | — | duplicate move-null, drop its stray last key, parent dup→original | each sequential move gets its OWN chained carrier, partially overlapped | — | use a new carrier per move in time order; partial keyframe overlap, never full gap or full stack |
| easing choice by position | — | slow start/end on every handoff, no exceptions | Easy Ease + graph peak pulled left (fast-in) | value graph at clip start/end; speed graph (gentle hump) mid-clip | easy ease + graph refine on every carrier | kit `out`/`inOut` curves already cover both cases; apply value-vs-speed choice by the move's position in the shot |
| pivot | anchor moved to screen centre before animating | returns to frame-centre on hub shape via proportional grid | — | — | — | `Entity`/camera origin at the framed centre for in/out rotation accents |
| nested object tumble | — | — | — | — | 3 chained carriers: entry (scale+rotX+rotY), flip (rotX+rotY 180° + duplicated back face), settle (push+orientation) | stretch the 180° flip to ≥ ~1.4 s to respect the ≤130°/s cap, or cut across it |


### Source tool (Houdini)
`/obj`: `cam_test1` (rotations + focal only) → parent `cam_test1_transform` (copied ship translate Z, negated) → `cam_test1_correct`
(hand-keyed push-in/correction) → `cam1_shake` nodes (Motion Effects > Noise on rotation). "Keep Position When Parenting" on;
"Clean Transforms" on each new child; Alt+click a parameter to key it. Ch2: `Null/Transform "dolly"` (translate only) → `cam1` (rotate only); duplicate the chain per variant; avoid Copy Parameter → Paste Relative Reference between rigs.
### Blender 5.x
```python
import bpy
scn = bpy.context.scene; cam = scn.camera
def empty(name, parent=None):
    e = bpy.data.objects.new(name, None); scn.collection.objects.link(e)
    if parent: e.parent = parent
    return e
follow = empty("CAM_follow")                                    # tracks subject (optional)
c = follow.constraints.new('COPY_LOCATION'); c.target = bpy.data.objects["Hero"]; c.use_offset = True
move = empty("CAM_move", follow)                                # dolly: keyed push / slide / boom / corrections
move.matrix_world = cam.matrix_world.copy(); move.rotation_euler = (0, 0, 0)
move.lock_rotation = (True, True, True)                         # translation only
shake = empty("CAM_shake", move)                                # optional noise layer, pivot at the camera
shake.matrix_world = cam.matrix_world.copy(); shake.rotation_euler = (0, 0, 0)
mw = cam.matrix_world.copy(); cam.parent = shake; cam.matrix_world = mw   # keep position when parenting
cam.lock_location = (True, True, True)                          # main = rotation only
# operator form: bpy.ops.object.parent_set(type='OBJECT', keep_transform=True)
```
### raea (layers composed per frame; a Camera3d is placed by its own world transform)
```tsx
const base: V3 = [0, 0.4, 1.4];                                 // main camera start (set once)
const follow: V3 = subjectPos(f);                                // follow layer (optional; [0,0,0] if static)
const dolly: V3 = [0, 0, -0.3 * ease(f, 0, 60)];                 // translation layer
const aim = { pan: 0.05 * ease(f, 20, 60), tilt: 0.08 * ease(f, 20, 60) };   // rotation layer (rad)
const p: V3 = [base[0] + follow[0] + dolly[0], base[1] + follow[1] + dolly[1], base[2] + follow[2] + dolly[2]];
const t: V3 = [p[0] + Math.sin(aim.pan), p[1] + Math.tan(aim.tilt), p[2] - Math.cos(aim.pan)];
<Camera3d transform={Transform.fromXyz(...p).lookingAt(t)} projection={{ Perspective: { fov } }} />
```
(`ease(f, a, b)` = clamped `interpolate` with `Easing.inOut(Easing.cubic)`; `subjectPos` your subject's per-frame position.)
BlendShot carries any Blender parent stack baked to world `{p, t, fov}` per frame.

## NOTES
- Deprecated: none.
- BlendShot exports camera world `{p, t, fov}` only — the stack bakes cleanly but roll is lost (add via TSX `lookingAt(t, up)`).
- Visual gaps: handle dragging and exact curve edits (Ch2 ~10:14–13:35) are shown, not described. Smooth 3D Camera Movement: exact overlap fraction not given ("partially" only) — the 12-frame overlap convention used elsewhere in this KB is a reasonable `~` starting point, not sourced from that video. Exact AE graph-editor handle drag amounts in "eye-catching 3D Scenes" are shown on screen only.
- Rule conflicts: none in structure; shake layers and the sources' extreme moves conflict with smooth eased camera rules — keep off/toned down. The 180° flip in the Smooth UI Animation nested tumble exceeds the house ≤130°/s cap at its sourced 20-frame duration — adapted here to ≥ ~1.4 s (≥ 54 f @30 fps) or split across a cut.
