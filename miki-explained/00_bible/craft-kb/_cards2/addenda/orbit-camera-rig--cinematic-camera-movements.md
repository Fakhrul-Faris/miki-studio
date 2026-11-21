# Addendum → masters/05_Camera_Raea_Pipeline/orbit-camera-rig.md
Source: "Motion Feel, Easing & Camera Choreography/Cinematic Camera Movements Blender Tutorial.txt" (05:20–05:46, 04:12–04:34)

## New VALUES BY SOURCE row(s)
| parameter | Cinematic Camera Movements (arc shot) | recommended for Style D (+ why) |
|---|---|---|
| path shape | a **spiral** curve (not a flat circle) — rises while it circles (Matrix bullet-dodge) | spiral = orbit + pedestal in one move; keep ≤ ~90° of arc per 2–3 s setup (≤ ~130°/s) |
| setup | Follow Path (camera at the curve's start) → animate Offset → Track To added after | same order; Track To last so the path doesn't override aim |
| tracking shot | Track To alone, camera location animated freely, "always look at our subject" | raea `.lookingAt(subjectPos)` every frame |

## Extra steps / variants
1. For a rising orbit, draw the path as a spiral; place the camera at the curve's start before animating Offset.
2. Add Track To after Follow Path so the camera keeps aiming at the hero.
3. raea spiral: `Transform.fromXyz(r*Math.sin(a), lerp(h0, h1, p), r*Math.cos(a)).lookingAt(hero)` with `a` and `p` from the same eased progress.
