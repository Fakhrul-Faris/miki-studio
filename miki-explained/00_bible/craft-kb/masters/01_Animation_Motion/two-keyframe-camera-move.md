---
title: Two-keyframe camera move (slow push/pull, flight)
bucket: 01_Animation_Motion
type: master
members:
  - cards/05_Camera_Raea_Pipeline/two-keyframe-camera-flight--animate-still-renders.md
  - cards/01_Animation_Motion/two-keyframe-slow-push-pull--five-ways-environments.md
sources: ["How to Easily Animate Still Renders in Blender.txt", "5 Ways to Create Better Environments in Blender.txt", "How to do SMOOTH SAAS Animation Like Creatoroly | After Effects Tutorial.txt", "2D/3D STORYBOARDING MASTERCLASS - Creating Animatics in BLENDER.txt"]
use_when: "the simplest setup-to-setup push or flight on a still subject"
style_fit: Strong — the literal mechanism of our setups and flights; one move per 2–3 s setup, eased in-out (or entering already moving per odd-moving-first-frame), animate position AND look-at, under ~130°/s and ~40 m/s.
---

## METADATA
01_Animation_Motion | Blender 3.x/4.x (sources) → Blender 5.3 + raea | Blender bpy camera keys + raea `<Camera3d transform>` per frame

## CREATIVE_INTENT
Shared why: the simpler the move, the more cinematic — key a start pose and an end pose and let the camera travel. Most
film shots are a simple move or a locked camera; small ambient motion in the scene does the rest.
- Animate Still Renders: Location AND Rotation keyed together (a flight, with a slight tilt up); tune the travel by
  editing the existing keys' values in the Graph Editor, never by adding keys; "sometimes that's all you need".
- 5 Ways Environments: Location only, a small push (or pull) along the view axis over a long (~10 s) shot, plus drifting
  particles/dust instead of more camera moves.

## STE_PROCEDURE
1. Pose the camera at the start framing.
2. At the setup's first frame, insert a Location (+ Rotation for a flight) keyframe.
3. Go to the setup's last frame.
4. Move the camera along its view axis — a small push or pull; for a flight, move it to the end framing and tilt slightly (~5°) if wanted.
5. Insert the same keyframe type again.
6. To adjust the travel, edit the existing keys' values in the Graph Editor instead of inserting new keys.
7. Before you judge the move, set interpolation to Bezier eased (see linear-vs-eased-interpolation master); at hard cuts let the eased curve run past the cuts.
8. Check speed: travel ÷ duration ≤ ~40 m/s and turn ≤ ~130°/s.
9. Add small ambient motion in the scene (dust, a slow light drift) rather than a second camera move.
10. In raea, animate the look-at target as well as the position — that is the "rotation" key.
11. (from smooth-saas-creatorly) Settle-in variant: parent the scene to a controller and scale it 130% → 100% from
    the setup's first frame to ~1 s 10 f, eased, so the scene arrives zoomed in and settles out — a push expressed
    as scale on a controller rather than camera Z translation.
12. (from storyboarding-masterclass) When a setup reads flat after the rough pass, fix it by starting the move
    further back and pushing further in (same duration, longer travel) rather than adding effects — list every flat
    setup after the rough cut and lengthen its travel first, staying within the existing speed caps.

## VALUES BY SOURCE
| parameter | Animate Still Renders | 5 Ways Environments | smooth-saas-creatorly | storyboarding-masterclass | recommended for Style D (+ why) |
|---|---|---|---|---|---|
| channels keyed | Location + Rotation | Location only | controller scale (not camera transform) | Location (push distance lengthened) | position + look-at target (flight); position only for a push |
| travel | ~1.5 m forward (~), tilt up ~5° | "very little" (~0.3 m ~) | scale 130% → 100% over ~40 f @30 fps | started further back, pushed further in (same duration, more distance → faster feel) | scale to macro: ~0.1–0.3 m push; flight per setup distance |
| shot length | shot range | ~10 s | ~1.3 s settle, then a separate ~3 s reframe | — | 2–3 s per setup |
| interpolation | (see linear card — source Linear) | Bezier eased (default) | eased (graph shaped by hand) | — | Easing.inOut(cubic); virtual span on hard cuts |
| adjustment | edit existing key values | — | — | plus-up pass: lengthen travel on setups flagged as low-energy | edit key values / camera map, not extra keys |
| extra life | — | particles / dust | — | Camera Shakify (handheld layer, subtle→extreme per shot) | dust, light drift; no shake by default |

## AGENT_EXECUTION
Blender 5.3:
```python
import bpy, math
from mathutils import Vector
from bpy_extras.anim_utils import action_get_channelbag_for_slot

sc = bpy.context.scene; cam = sc.camera
F0, F1 = sc.frame_start, sc.frame_end
FLIGHT = True                                          # False = location-only push/pull

def key(f):
    cam.keyframe_insert("location", frame=f)
    if FLIGHT: cam.keyframe_insert("rotation_euler", frame=f)

key(F0)
fwd = cam.matrix_world.to_quaternion() @ Vector((0, 0, -1))   # camera looks along -Z
cam.location += fwd * (1.5 if FLIGHT else 0.3)                  # ~ travel (scale to scene)
if FLIGHT: cam.rotation_euler.x += math.radians(5)              # ~ "rotate upwards a little"
key(F1)

ad = cam.animation_data
for fc in action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves:
    for k in fc.keyframe_points: k.interpolation = 'BEZIER'; k.easing = 'AUTO'
# step 6: nudge an existing key's value (fc.keyframe_points[-1].co[1] += d; fc.update()) rather than re-keying
```

raea:
```tsx
const t = interpolate(f, [0, D - 1], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const lerp3 = (a: number[], b: number[]) => a.map((v, i) => v + (b[i] - v) * t) as [number, number, number];
// flight: position and look-at both move
<Camera3d transform={Transform.fromXyz(...lerp3([0, 1.2, 6], [0, 1.0, 4.5])).lookingAt(lerp3([0, 0.6, 0], [0, 0.9, 0]))}
  projection={{ Perspective: { fov: (35 * Math.PI) / 180 } }} />
// push: only z moves, ~0.25 m over the setup
<Camera3d transform={Transform.fromXyz(0, 0.35, 1.2 - 0.25 * t).lookingAt([0, 0.2, 0])} projection={{ Perspective: { fov: (32 * Math.PI) / 180 } }} />
```
Kit: `drift(f, f0, f1, a, b, fov)` in `tools/raea/kit/clay.tsx` interpolates two `{ p, t }` camera poses; flights exported
from Blender play through `kit/BlendShot.tsx` (per-frame camera from `blend2raea.py`).

## NOTES
- Deprecated: `Action.fcurves` → channelbag (5.x); in 4.4+ the Insert Keyframe menu changed (I inserts preference
  channels directly, K opens Keying Sets) — `keyframe_insert` in Python is unchanged.
- Visual gaps: none.
- Rule conflicts: the 10 s source shot is far longer than our 2–3 s setups — one move per setup; eased in-out (Still
  Renders' Linear advice is overridden); speed caps ~130°/s and ~40 m/s (check travel / duration).
- storyboarding-masterclass: ⚠ Camera Shakify (handheld shake) is off by default in Style D — smooth eased moves
  only; see `masters/01_Animation_Motion/handheld-camera-shake.md` if a specific beat ever needs it. The
  "push further, same duration" energy fix is adopted and doesn't change the Style D pick.
- smooth-saas-creatorly: the settle-in scale pull is a controller/scale technique, not a camera-transform push;
  translate its ≤~10–15% framing-change intent into the existing camera push values (~0.1–0.3 m) rather than
  adding scale animation to raea scenes. Style D pick unchanged.
