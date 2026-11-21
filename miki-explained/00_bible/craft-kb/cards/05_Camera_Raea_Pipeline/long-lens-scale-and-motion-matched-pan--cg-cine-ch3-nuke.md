---
title: Very long lens for scale, and pans matched to the subject's motion
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 3 | Camera Analysis (The Nuke).txt"
source_time: "07:53–09:09, 10:30–10:60, 37:54–38:51"
blender_version_source: n/a (Houdini)
tool_target: principle-only
tier: principle
style_fit: Fits Style D (lens choice and motion-matched pans) — long lenses suit macro; amplified wobble from long lenses is a conflict.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini source) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: on a very long lens (250–355 mm) everything in frame feels bigger — destruction, debris, smoke — because the view is compressed and zoomed in, and any camera motion is magnified. When panning across a moving subject (rising smoke and fire), match the pan speed to the subject's motion so its details stay readable instead of smearing under motion blur. Ideas: on a macro setup, track a rising receipt or growing stack at its own speed so the texture stays crisp.

## STE_PROCEDURE
Method:
1. For an event that must feel huge, try a long focal length (source: 250 mm, then 355 mm).
2. Expect camera motion to read larger on long lenses; reduce move amplitudes to compensate.
3. When the subject moves, pan at roughly the subject's screen speed.
4. If the pan outruns the subject, slow it; details are lost to motion blur.
How-to:
5. Before final, preview with motion blur on to confirm detail survives.

## AGENT_EXECUTION
### Source tool (Houdini)
- Camera 2: focal 250 mm (final more zoomed), later shot 355 mm; animated ground (not RBD) under the camera; pan up continuous with the rising plume.
### Blender / raea translation
- Blender: `cam.data.lens = 250`; key rotation X so its angular speed ≈ subject's angular speed from the camera: `ω ≈ v_subject / distance` (rad/s).
- raea: `fov = 2*Math.atan(18/250)` ≈ 8.2° vertical (9:16). Aim the camera at the subject's per-frame position (`lookingAt(subjectPos(f))`) so the pan matches by construction. `<MotionBlur shutterAngle={0.5} />` only if a fast move needs it.

## NOTES
- On a 9:16 frame 250 mm is extremely narrow; at macro scale a 85–150 mm range gives the same compressed read (inferred).
- Rule conflicts: the "wobbling more" on long lenses is a shake effect — do not add. Pans stay eased and under ~130°/s (on long lenses even small angular speeds look fast: keep them much lower).
