---
title: Cinematic aspect — letterbox / anamorphic squeeze
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/anamorphic-squeeze-aspect--cg-cine-ch2-camera-breakdown.md
  - cards/05_Camera_Raea_Pipeline/cinematic-21-9-letterbox--10-blender-tricks.md
sources: ["CG Cinematography 101 | Chapter 2 | Basic Camera Breakdown.txt", "10+ Blender Tricks That Will Make Your Renders Cinematic.txt"]
use_when: "a widescreen 'film' moment inside 9:16"
style_fit: "Conflict (strictest): delivery is full-frame 9:16 — never letterboxed or squeezed by default; captions/logo need the vertical space. Only a rare in-frame 21:9 window for a 'film'/flashback beat, bars eased in/out over ~0.4 s, never popped."
---

## METADATA
05_Camera_Raea_Pipeline | Houdini / Blender 3.x sources → Blender 4.2+/5.x, raea | principle + Blender bpy + raea page bars

## CREATIVE_INTENT
A wide frame reads as "cinema" because audiences associate bars and wide ratios with film.
- CG Cinematography 101: after placing the first camera, compose inside a cinematic aspect — blinders (top/bottom bars) as a
  guide, or anamorphic: pixel aspect ~1.33, render squeezed at the same HD resolution, unsqueeze in comp.
- 10 Blender Tricks: set the output resolution itself to 21:9.
For us the useful parts are composing inside a guide and, rarely, a 21:9 window inside the 9:16 frame for a film-like beat.

## STE_PROCEDURE
1. Set the camera's aspect/blinder guide to the target ratio and compose inside it (Blender: passepartout + safe areas).
2. Video method (not for delivery): Output Properties > Format, Resolution X/Y to a 21:9 pair (~2560 × 1080 or 1920 × 822).
3. Anamorphic variant (not for delivery): set pixel aspect ~1.33, render at the same resolution (squeezed).
4. Unsqueeze in the compositor by scaling width ×1.33.
5. Before using any of this for Meikigo, keep the Composition at 1080 × 1920 and add bars inside it instead.
6. Fade or slide the bars in over ~0.4 s; never pop them on.

## VALUES BY SOURCE
| parameter | CG Cine 101 (Houdini) | 10 Blender Tricks | recommended for Style D (+ why) |
|---|---|---|---|
| method | blinders guide or pixel aspect 1.33 + unsqueeze | output res 21:9 | in-frame page bars on a 1080×1920 comp |
| ratio | cinematic (unspecified) / anamorphic 1.33 | 21:9 (~2.37:1), e.g. 2560×1080 | 21:9 window = 1080·9/21 ≈ 463 px tall band |
| bar motion | — | — | ease in/out over ~0.4 s (`Easing.inOut(Easing.cubic)`) |
| use | default framing | default framing | rare motif only |

## AGENT_EXECUTION
### Source tool (Houdini)
Camera > View: Pixel Aspect Ratio 1.33 (resolution stays HD); blinders via the camera's aspect/crop mask display.
### Blender 5.x
```python
import bpy
r = bpy.context.scene.render
r.resolution_x, r.resolution_y = 2560, 1080          # video method, ~21:9 (not for our delivery)
r.pixel_aspect_x, r.pixel_aspect_y = 1.33, 1.0       # anamorphic squeeze (rarely wanted)
cam = bpy.context.scene.camera.data
cam.show_safe_areas = True; cam.show_passepartout = True   # composing guide only
```
### raea (9:16 with an in-frame 21:9 window)
```tsx
const f = useCurrentFrame(); const { fps } = useVideoConfig();
const t = interpolate(f, [0, 0.4 * fps], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const bar = ((1920 - 463) / 2) * t;
<AbsoluteFill style={{ background: "#0b0b0d" }}>
  {/* 3D: Camera3d etc. */}
  <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: bar, background: "#000" }} />
  <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: bar, background: "#000" }} />
</AbsoluteFill>
```
Bars are opaque page elements over the 3D (scene.md: keep page parts over 3D opaque). Pixel-aspect squeeze: **raea: no
equivalent**. Anamorphic look elements elsewhere: `<Grade aberration>` (bokeh shape has no raea control).

## NOTES
- Deprecated: none.
- Visual gaps: the Houdini settings panel and the video's list of 21:9 resolutions are on screen only.
- Rule conflicts: no letterbox bars in 9:16 finals by default (wasted vertical frame; captions need the space); a 21:9
  window is a rare motif, bars ease in/out, never pop.
