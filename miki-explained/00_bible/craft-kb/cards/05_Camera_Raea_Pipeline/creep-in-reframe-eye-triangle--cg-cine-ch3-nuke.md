---
title: Creep-in push to reframe the eye and add depth
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 3 | Camera Analysis (The Nuke).txt"
source_time: "03:59–05:14, 20:21–21:26, 26:34–27:39"
blender_version_source: n/a (Houdini)
tool_target: principle-only
tier: principle
style_fit: Fits Style D — a slow eased push toward the hero object directs the gaze to what the line is about; joins setups without cuts.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini source) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: a slow creep-in toward a foreground subject does three jobs: it adds energy, it creates depth (foreground subject, mid, background), and it reframes where the viewer looks. The eye starts on the brightest/specular point of the subject, and as the push continues the subject grows past recognition so the eye is handed to the next event — a deliberate gaze triangle from subject to payoff. Pushing forward says "look here". Ideas: push into the hero object until its texture fills the frame, then reveal the next state (x-ray, chart) where the eye has been led.

## STE_PROCEDURE
Method:
1. Decide where the eye starts (the subject's highlight) and where it must end (the payoff area).
2. Key the start frame of the push, then the end frame closer to the subject.
3. If the push feels too fast, space the keys further apart in time.
4. Add intermediate correction keys only where the framing drifts.
5. Optionally push the focal length (e.g., 50 → 60–70 mm) during the move, then re-key the rotations to hold the composition.
How-to:
6. Before the payoff appears, the subject should be large enough that the eye leaves it.

## AGENT_EXECUTION
### Source tool (Houdini)
- Keys on the `correct` transform: start pose, end pose closer; Alt+middle-drag in the Animation Editor to space keys; focal length keyed 50 → ~60–70 mm with rotations re-keyed after.
### Blender / raea translation
- Blender: key `CAM_move.location` at f0 and f1 (`interpolation='BEZIER'`, auto-clamped handles), key `cam.data.lens` 50 → 65 (`~`) over the same span.
- raea:
  ```tsx
  const k = interpolate(f, [f0, f1], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lens = 50 + (65 - 50) * k;
  const eye = lerp3(eyeStart, eyeEnd, k);
  <Camera3d transform={Transform.fromXyz(...eye).lookingAt(lerp3(aimStart, aimEnd, k))} projection={{ Perspective: { fov: 2*Math.atan(18/lens) } }} />
  ```
  (`lerp3` = component-wise lerp, a helper you write.)

## NOTES
- Visual gap: the exact gaze-triangle points are drawn on screen only.
- Rule conflicts: ease in-out, under ~40 m/s at scene scale; no snap-back pushes. Combined dolly + lens push is fine if both ease together.
