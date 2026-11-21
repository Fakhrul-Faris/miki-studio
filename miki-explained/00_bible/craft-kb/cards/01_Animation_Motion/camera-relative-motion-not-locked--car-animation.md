---
title: Camera catches up with (or drifts from) a moving hero — relative motion, not a locked follow; motion blur on
bucket: 01_Animation_Motion
source: "Making a Car Animation in Blender!.txt"
source_time: "09:24–09:53, 13:39–14:07"
blender_version_source: 3.x/4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Our tracking shots (vehicle, token travel) gain life when the camera's speed differs slightly from the subject's; motion blur sells speed. Camera Shakify part conflicts.
---

## METADATA
01_Animation_Motion | 3.x/4.x → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
A camera parented rigidly to a moving object makes the object look static on screen. A small speed difference — the camera slowly catching up, or the subject pulling ahead — gives secondary motion and a sense of speed (the reviewer's main critique of the locked shot).

## STE_PROCEDURE
1. Animate the hero's travel first.
2. Key the camera to start slightly behind and end slightly ahead (catch-up), or vice versa.
3. Before parenting a camera to the hero, decide: parent only for a top/rigid view; otherwise animate it separately.
4. Turn on motion blur for the travel shots.
5. Video only: add Camera Shakify for "filmed from a chase car" — see conflict.

## AGENT_EXECUTION
Blender:
```python
import bpy
scn = bpy.context.scene; cam = scn.camera; hero = bpy.data.objects["Hero"]
for fr, lag in [(1, -0.6), (90, 0.3)]:                     # ~ metres behind → ahead of the hero
    scn.frame_set(fr)
    cam.location = hero.matrix_world.translation + __import__("mathutils").Vector((lag, -2.0, 0.6))
    cam.keyframe_insert("location", frame=fr)               # Bezier, Auto Clamped = eased
scn.render.use_motion_blur = True; scn.render.motion_blur_shutter = 0.5
```
raea:
```tsx
const lag = interpolate(f, [f0, f1], [-0.6, 0.3], { easing: Easing.inOut(Easing.sin), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const h = heroAt(f);
<Camera3d transform={Transform.fromXyz(h[0] + lag, h[1] + 0.6, h[2] + 2).lookingAt(h)} projection={{ Perspective: { fov: 0.7 } }} />
<MotionBlur shutterAngle={0.5} samples={4} />
```

## NOTES
- Deprecated: none.
- Visual gaps: the exact catch-up offsets are not given.
- Rule conflicts: Camera Shakify (handheld jitter) conflicts with our smooth eased camera — skip it or keep it imperceptible. A rigid parented camera is allowed only as a deliberate top view (as in the video's shot 5). Run the speed/turn-rate check; MotionBlur must not smear across a cut frame.

## ADDENDUM — Cinematic Camera Movements Blender Tutorial
Source: "Motion Feel, Easing & Camera Choreography/Cinematic Camera Movements Blender Tutorial.txt" (01:34–02:33).
- Truck shot, subject at constant speed: key the camera at point A and point B and set BOTH keys to **Linear**
  (Graph Editor → T → Linear) — the default Bézier handles make the subject drift forward/back in frame as the
  camera's speed doesn't match the subject's constant speed. Keep linear only while the move runs through the
  setup; ease at the on-screen start/stop per house rule.
- Subject moving unpredictably: parent the camera directly to the subject (select camera, Shift-select subject,
  Ctrl+P → Object) to hold the distance exactly — use only for a rigid top view; otherwise add this card's small
  lag/catch-up offset so the camera isn't rigidly locked.
| parameter | Cinematic Camera Movements (truck shot) | recommended for Style D (+ why) |
|---|---|---|
| subject at constant speed | both keys Linear in the Graph Editor | linear only while the move runs through the setup; ease at on-screen starts/stops (house) |
| subject moving unpredictably | parent camera to subject (holds the distance) | parent only for a rigid top view; otherwise add a small lag (this card's catch-up rule) |
