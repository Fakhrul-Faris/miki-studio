---
title: Lens compression comes from camera distance; match it with the focal-length/sensor scale formula
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "1:16:46–1:22:26; 1:54:40–1:58:54; 1:35:29–1:36:36"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Directly serves Style D's macro product lens: choose fov and distance together so the hero object reads compressed (long lens) or dramatic (wide, close); also sizes any photo backplate correctly.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: a long lens looks compressed only because it forces the camera far away, so near and far objects are at similar relative distances (20 mm: back cube ~2.5× farther than front; 200 mm: ~1.15–1.2×). Idea: when two images must share a perspective, scale by the formula instead of by eye; when setting a CG camera, pick the distance for the compression you want, then the focal length for the framing.

## STE_PROCEDURE
1. Record focal length and sensor size for every plate (sensor from the camera model).
2. If both plates share a camera (same sensor): scale BG = FG focal ÷ BG focal (80 mm FG, 40 mm BG → 2.0).
3. If sensors differ: effective BG focal = BG focal × (FG sensor width ÷ BG sensor width).
4. Then scale BG = FG focal ÷ effective BG focal.
5. Example: FG 150 mm / 25 mm sensor, BG 30 mm / 20 mm sensor → 30 × 1.25 = 37.5 → 150 ÷ 37.5 = 4.0.
6. Example from the shot: FG 150 mm / 25.53 mm, BG 133 mm / 35.9 mm → 133 × 0.711 = 94.58 → scale 1.58.
7. The formula assumes equal horizontal resolution between plates; reformat first.
8. Without metadata, read compression from receding angles: flat, tightly packed edges = long lens; strong angles = wide lens.

## AGENT_EXECUTION
### Source tool (Nuke)
Sticky note with focal/sensor values → `Transform` scale 1.58 on the reformatted background, before positioning on the horizon.
### Blender / raea translation
- raea camera: `projection={{ Perspective: { fov } }}` is the vertical fov in radians. From a lens: `fov = 2 * Math.atan(sensorV / (2 * focal))`; for 9:16 vertical with a 36 × 24 mm full-frame sensor turned portrait, `sensorV = 36` (~). 40° reads as a product lens (scene.md).
- Compression choice: long-lens look = camera far + small fov (e.g. 15–25°, ~); dramatic macro = camera close + wide fov (50–70°). Change distance and fov together so the hero keeps its frame size.
- For a photo backplate on `<ImagePlane src width position />`: set `width` so its fov coverage matches: `width = 2 * dist * Math.tan(hfovBG / 2)` scaled by the formula above.
- Blender build stage: `cam.data.lens = 50; cam.data.sensor_width = 36; cam.data.sensor_fit = 'HORIZONTAL'` — keep it equal to the raea fov when using blend2raea/BlendShot.

## NOTES
- Rule conflicts: none. Watch the speed limit when a wide lens is very close: small moves read as large screen motion.
