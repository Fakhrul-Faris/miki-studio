---
title: Render output and edit handoff — 16-bit PNG sequences, motion blur, sample/noise settings, transparent film, quarter proxies
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:08:50–1:11:31, 1:38:49–1:39:20, 2:04:57–2:05:33, 2:26:46–2:28:17, edit 2:45:29–2:50:06"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Blender is never our final renderer; keep this only for the edit-side habits (lossless frames, no generational MP4 loss).
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 (Cycles) | Blender bpy + Resolve → raea render

## CREATIVE_INTENT
Render each shot to its own folder as a lossless image sequence, so the edit loses no quality and the transition pass keeps its
alpha. Motion blur is part of the look. Work with lightweight proxies in the edit only.

## STE_PROCEDURE
1. Output: PNG, RGB(A), Color Depth 16; one named folder per shot ("product animation 1 slide in").
2. Enable Motion Blur; render the viewport in Solid mode while rendering to save GPU.
3. If GPU renders show black streak lines with motion blur, render that shot on CPU (slower; author's only fix).
4. Samples: Max 128 for fast shots, 1024 for the hero; Noise Threshold 0.01.
5. For overlay passes (wipe can, liquid over another background) enable Film › Transparent (+ Transparent Glass for liquid).
6. Liquid shots: Light Paths max bounces or Fast GI Approximation with Viewport and Render bounces both 8 (stops dark patches).
7. In Resolve, import each PNG folder (`Ctrl+A`, drag in); set Playback › Timeline Proxy Resolution Quarter and Render Cache Smart if playback stutters.
8. Optional speed-up: export a working MP4 of the opaque shots, but keep PNGs for the transparent pass and for final quality (each MP4 generation loses quality).

## AGENT_EXECUTION
- Blender (only for preview/look renders; final is raea):
```python
r = bpy.context.scene.render
r.image_settings.file_format = 'PNG'; r.image_settings.color_mode = 'RGBA'; r.image_settings.color_depth = '16'
r.use_motion_blur = True; r.film_transparent = False
c = bpy.context.scene.cycles; c.samples = 128; c.adaptive_threshold = 0.01; c.device = 'CPU'
c.film_transparent_glass = True; c.use_fast_gi = True; c.ao_bounces = 8; c.ao_bounces_render = 8
r.filepath = "//renders/01_slide_in/"
```
- raea: `raea render EDIT.tsx` produces the final film (house: 60 fps export); motion blur via `<MotionBlur shutterAngle={0.5} samples={4} />`;
  check single frames with `raea render EDIT.tsx --frame N -o F.png`. No path-tracing settings exist (no samples/bounces/fast GI).

## NOTES
- Deprecated: none; Fast GI's bounce fields are `ao_bounces` / `ao_bounces_render` in the Python API.
- Visual gaps: none.
- Rule conflicts: Cycles is not our final renderer; use these only for look references.
