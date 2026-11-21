---
title: Focal length as mood (normal 40–50 mm, long 60–210 mm+, wide ~30 mm)
bucket: 05_Camera_Raea_Pipeline
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "11:35–14:13"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — macro hero shots want long lenses (compressed depth, detail, importance); wides only for establishing.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x | Blender bpy + raea

## CREATIVE_INTENT
Focal length changes how the viewer feels, not just framing. 40–50 mm reads like the eye (neutral, relatable); long lenses (60–120 mm, 210 mm and beyond) compress depth, pull detail forward and make one point important; going wider (~30 mm) shows more environment and adds slight perspective bending that feels unusual or unsettling.

## STE_PROCEDURE
1. Set the lens to ~40–50 mm for a neutral, relatable shot.
2. Set the lens to 60–120 mm (or more) to focus attention on one point and compress depth.
3. Set the lens to ~30 mm to show the whole scene and add mild, unsettling perspective bending.
4. After changing the lens, move the camera to restore framing of the focus.
5. Check the perspective grid lines at the frame edges; wider lenses distort them more.

## AGENT_EXECUTION
- Blender: `cam.data.lens = 50` (neutral) / `85` (focus) / `30` (unsettling). `cam.data.sensor_width = 36` (default) so mm values match the video.
- raea: vertical fov in radians. For our 9:16 frame with Blender's 36 mm sensor (Sensor Fit Auto fits the taller side): `fov = 2*Math.atan(18/lensMm)` — 30 mm ≈ 62°, 50 mm ≈ 40°, 85 mm ≈ 24°, 120 mm ≈ 17°. Example: `projection={{ Perspective: { fov: 2*Math.atan(18/85) } }}`. Shots from Blender already carry fov through BlendShot.

## NOTES
- For a 16:9 landscape frame the sensor spans the width instead: vertical fov = `2*atan(10.125/lens)`. Check `cam.data.sensor_fit` before converting.
- Rule conflicts: none. Animated focal changes (zoom) must ease in-out, never crash-zoom.
