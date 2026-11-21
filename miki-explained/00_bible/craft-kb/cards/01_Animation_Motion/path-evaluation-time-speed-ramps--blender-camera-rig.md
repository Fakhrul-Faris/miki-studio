---
title: Keyframe a path's Evaluation Time to speed up / slow down travel independent of path length
bucket: 01_Animation_Motion
source: "Making blenders camera actually good.txt"
source_time: "11:05–12:56"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: The tool that turns a constant-speed path into our eased in-out camera flight (accelerate out of one setup, decelerate into the next on the word).
---

## METADATA
01_Animation_Motion | 3.x → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
Speed along the path is the feel of the move. Owning Evaluation Time lets the camera fall behind, catch up, or ease into a hold on the word, without redrawing the path.

## STE_PROCEDURE
1. Select the path curve; open Object Data > Path Animation.
2. Note Frames (e.g. 100): the object covers 1/Frames of the path per frame of Evaluation Time.
3. Delete the automatically added Evaluation Time keyframes.
4. Insert your own keys, e.g. frame 1 → Evaluation Time 1; frame 20 → 50 (half the path in 20 frames = fast start); then back to normal pace.
5. For our flights, key start and end values only and leave the F-curve as Bezier (Auto Clamped) for ease-in / ease-out.

## AGENT_EXECUTION
Blender:
```python
import bpy
cu = bpy.data.objects["CamPath"].data
cu.path_duration = 100
if cu.animation_data and cu.animation_data.action:
    cu.animation_data_clear()                 # drop the auto keys
cu.eval_time = 1;   cu.keyframe_insert("eval_time", frame=1)
cu.eval_time = 50;  cu.keyframe_insert("eval_time", frame=20)    # video example
cu.eval_time = 100; cu.keyframe_insert("eval_time", frame=100)
# house setting: Bezier, Auto Clamped handles (default for new keys) = ease in/out
```
raea: speed along a route is just the easing of the parameter you feed the route:
```tsx
const u = interpolate(f, [f0, f1], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const p = routeAt(u);                         // a sampled curve from the bake, or a Catmull-Rom of key points
```
or keep the Blender ramp and bake it (blend2raea → BlendShot).

## NOTES
- Deprecated: Blender 4.4+/5.x stores keys in slotted (layered) Actions; `keyframe_insert` still works; reading `action.fcurves` directly is deprecated in 5.0 — go through the action's channelbag for the slot.
- Visual gaps: none.
- Rule conflicts: the video's example (half the path in 20 frames, then normal) is a burst — keep peaks under ~40 m/s (scaled) and ~130°/s; no linear starts or stops.

## ADDENDUM — Speed Ramping in After Effects
Source: "Motion Feel, Easing & Camera Choreography/Speed Ramping in After Effects.txt" (00:29–00:59, 04:10–08:08, 08:28–11:28).
- Speed scale: 1 = normal, 2/3 = faster, 0 = frozen; ramp the route parameter's rate but never through 0 mid-move —
  a dead stop reads as a stall.
- Curve shape named "hill" — like a snowboarder, up in speed then back down; both ends dragged back to exactly 1
  (normal) and smoothed. For Style D: normal → peak → normal, eased both sides, peak within ~40 m/s / ~130°/s.
- The subject is kept 100% centred throughout (stabilised so it never drifts) — aim locked on the hero through the
  ramp so only the world streams past.
- Timing: ramp keys snapped to audio-waveform beat changes, with full motion landing on the drop — peak of the ramp
  should land on the stressed word/beat.
- Motion blur is applied only because the clip is sped up ("with high speed we should see motion blur") —
  `{fast ? <MotionBlur shutterAngle={0.5} samples={4} /> : null}` during the peak only.
- Exit: the next clip continues the same direction of motion — covered by
  `cards/01_Animation_Motion/motion-continuity-across-cuts--cinematography-next-level.md`.
- Extra step: a ramp only reads smooth if the base move is smooth and eased; linear or laggy curves "won't look
  good." Grade (contrast) before judging the ramp. AE-only steps dropped: Mocha track + anchor-point stabilise,
  pre-compose, black-frame fix by offsetting the remap key a few frames back.
