---
title: Linear vs eased keys (move already under way on frame 1)
bucket: 01_Animation_Motion
type: master
members:
  - cards/01_Animation_Motion/linear-start-keys-already-moving--cg-cine-ch2-camera-breakdown.md
  - cards/05_Camera_Raea_Pipeline/linear-vs-eased-camera-interpolation--animate-still-renders.md
sources: ["CG Cinematography 101 | Chapter 2 | Basic Camera Breakdown.txt", "How to Easily Animate Still Renders in Blender.txt", "Apple-Style 3D Motion Design.txt", "Imperial 3D Animate Tutorial"]
use_when: "an odd moving first frame, or continuing a flight across a setup join"
style_fit: "conflict: house rule = eased in-out camera curves, no linear starts/stops; keep only 'already moving at the cut' — enter with velocity where the previous motion carries in, always ease the end, or run an eased curve over a longer virtual span than the shot shows; check ≤ ~40 m/s and ≤ ~130°/s"
---

## METADATA
01_Animation_Motion | Houdini (ch2) + Blender 3.x/4.x (Still Renders) → Blender 5.3 + raea | Blender bpy keyframe interpolation/handles + raea `interpolate` easing

## CREATIVE_INTENT
Shared why: a move that visibly accelerates from rest and brakes to a dead stop on every setup looks amateur; the shot
should open with the camera (or object) already moving.
- CG Cine ch2: the operator sets push-in keys to linear "because I want this to already start in the beginning", then
  unlocks (free) tangents so separate channels get their own shape — a slow tilt up, a touch of pan/roll — offset in time, so the move feels operated.
- Animate Still Renders: argues film moves are mostly constant-speed and Blender's default Bezier ease "screams beginner"; shows the per-key Interpolation Mode and the default-interpolation preference.
House reading: we keep eased curves (rule) but hide their start/stop — enter already moving at a cut and ease the end, or
evaluate the eased move over a span longer than the shot so only its steady middle is on screen. This is the mechanism
behind our odd-moving-first-frame rule.

## STE_PROCEDURE
1. Key the start and end of the move on the dolly/carrier layer.
2. Decide the join: hard cut in/out → step 3; on-screen flight between two setups → step 6.
3. Hard cuts: start the eased move before the in-cut and end it after the out-cut (virtual span ±~12 f), so the visible part is already moving and never stops.
4. Odd moving first frame: give the start key a velocity handle (Vector/linear-out) so frame 1 is already moving.
5. Ease out the end key so the move settles (Auto Clamped / ease-out); never a linear stop mid-shot.
6. Flight joining two on-screen setups: ease both ends in-out (full Easing.inOut).
7. Unlock tangents (Free) on channels that need their own shape; drag handles horizontally for timing, keys vertically for value.
8. Add secondary small rotations on separate channels (slow tilt up, a touch of pan/roll), offset in time from the push.
9. Keep the default new-key interpolation Bezier (Preferences › Animation › F-Curves › Default Interpolation); select keys › Key › Interpolation Mode (T) only to change individual keys.
10. Before you accept the move, check entry speed ≤ ~40 m/s and turn ≤ ~130°/s.
11. Use plain Linear only for things that never start/stop on screen: spins, texture drifts, slow light sweeps.
12. One-frame snap (secondary accent only, never an entrance): two keys one frame apart on an element already in motion, for a quick snappy beat; a bare entrance snap reads as a pop (from Apple-Style 3D Motion Design).
13. One-frame head start: shift a pair of keys +1 frame and make the first frame's value ~2–3 % larger/further so frame 1 is already moving — the mechanism behind the odd-moving-first-frame rule (from Apple-Style 3D Motion Design).

## VALUES BY SOURCE
| parameter | CG Cine ch2 (Houdini) | Animate Still Renders | recommended for Style D (+ why) |
|---|---|---|---|
| start key | Linear (already moving) | Linear | Vector/ease-out handle only at a cut where motion carries in; else virtual-span ease |
| end key | eased (settles) | Linear | eased (house: no linear stops) |
| default interpolation | — | Linear (source pref) | Bezier, easing AUTO |
| secondary channels | free tangents, slow tilt, pan/roll, offset in time | — | yes, small (tilt ~0.06 rad over the setup) |
| virtual span | — | — | ±12 f beyond the shot on hard cuts |
| flight between on-screen setups | — | — | full Easing.inOut(cubic) both ends |
| where linear is OK | camera push | camera, light, product keys | spins, texture drifts, light sweeps that never start/stop on screen |

### Additional sources (folded, Phase C)
| parameter | Apple-Style 3D Motion | Imperial 3D Animate Tutorial | recommended for Style D (+ why) |
|---|---|---|---|
| snap | 2 keys 1 frame apart, on an element already moving | — | ≤ 2 f, secondary accent only, never an entrance (reads as a pop) |
| head start | keys shifted +1 f, first frame slightly larger | — | start value offset ~2–3 %, eased out after — same mechanism as this master's odd-moving-first-frame step |
| workflow | — | Blender keys set to Linear, then re-timed/finessed in After Effects | ⚠ no translation needed: raea shapes easing curves directly in code wherever the object lives (`Easing.inOut(Easing.cubic)`, kit `Easing.bezier(...)`); the Blender→AE roundtrip is fully superseded, never used |

## AGENT_EXECUTION
Blender 5.3:
```python
import bpy
from bpy_extras.anim_utils import action_get_channelbag_for_slot

def fcurves(ob):
    ad = ob.animation_data
    cb = action_get_channelbag_for_slot(ad.action, ad.action_slot)
    return cb.fcurves if cb else []

bpy.context.preferences.edit.keyframe_new_interpolation_type = 'BEZIER'   # house default (source: 'LINEAR')

dolly = bpy.data.objects["CAM_dolly"]
for fc in fcurves(dolly):
    for kp in fc.keyframe_points:
        kp.interpolation = 'BEZIER'; kp.easing = 'AUTO'
    k0, k1 = fc.keyframe_points[0], fc.keyframe_points[-1]
    k0.handle_right_type = 'VECTOR'            # odd moving first frame: velocity at frame 1
    k1.handle_left_type = 'AUTO_CLAMPED'       # settles at the end
    fc.update()
```
Virtual span in Blender: place the keys ~12 f before the in-cut and ~12 f after the out-cut (shot range unchanged).

raea:
```tsx
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
// (a) enter already moving, ease only the end
const z = interpolate(f, [0, 60], [1.4, 1.1], { ...CL, easing: Easing.out(Easing.cubic) });
const tilt = interpolate(f, [12, 60], [0, 0.06], { ...CL, easing: Easing.inOut(Easing.sin) });   // secondary channel, offset in time
// (b) hard cuts both ends: eased move over a longer virtual span than the shot [s0, s1]
const t = interpolate(f, [s0 - 12, s1 + 12], [0, 1], { ...CL, easing: Easing.inOut(Easing.cubic) });
// (c) on-screen flight between setups: Easing.inOut(...) with both ends visible
```
Kit easing in `tools/raea/kit/ui.tsx`: `out = Easing.bezier(0.16, 1, 0.3, 1)` (fast in, gentle settle), `inOut = Easing.bezier(0.65, 0, 0.35, 1)`.

## NOTES
- Deprecated: `Action.fcurves` → channelbag (5.x).
- Visual gaps: ch2's exact curve shapes and handle positions are dragged on screen, not spoken.
- Rule conflicts: linear camera starts/stops are prohibited — never apply the sources' Linear default to camera or flight
  keys (the same Linear advice appears in "How to Make Perfect Product Animations in Blender.txt" for camera, light and
  product keys — same conflict). Linear-in is acceptable only at a cut where the previous setup's motion or the flight
  carries in; the end must ease. Speed caps ~40 m/s, ~130°/s at the entry velocity. After Effects is prohibited in our
  pipeline — Imperial 3D Animate Tutorial's "set to Linear, retime in AE" workflow has no translation step and is never
  used; raea edits easing curves directly in code instead, so Blender keys stay Bezier/AUTO per house default.
