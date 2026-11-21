---
title: Motion blur as shutter speed
bucket: 05_Camera_Raea_Pipeline
source: "Take your Blender Cinematography to the Next Level!.txt"
source_time: "01:44–02:26"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: useful during camera flights and object morphs to sell speed; must stay subtle (no whip pans to justify it)
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x source; 4.2+ API | Blender render setting → raea MotionBlur

## CREATIVE_INTENT
A real shutter (e.g. 1/80 s) smears movement; Blender has no shutter on the camera but a Motion Blur toggle whose Shutter
value mimics it. Lower Shutter = faster shutter (crisper), higher = slower (more smear). Use it so fast moves read as filmed,
not as stepped CG.

## STE_PROCEDURE
1. Open Render Properties > Motion Blur and enable it.
2. Set Shutter: lower value = faster shutter (less blur); higher value = slower shutter (more blur).
3. Before final render, check a fast-moving frame to judge blur amount.

## AGENT_EXECUTION
### Blender (4.2+, Cycles and EEVEE Next share this)
```python
import bpy
r = bpy.context.scene.render
r.use_motion_blur = True
r.motion_blur_shutter = 0.5     # frames; 0.5 ≈ 180° shutter (Blender default)
```
### raea
```tsx
import { MotionBlur } from "raea/3d";
const fast = f >= 120 && f < 150;               // only during a camera flight
{fast ? <MotionBlur shutterAngle={0.5} samples={4} /> : null}   // 0.5 = film's 180° shutter
```
- It animates per frame; costs a second draw per frame; blurs camera moves and moving parts, silhouettes over a still
  background stay sharp (Bevy's method). Slow turns show nothing.

## NOTES
- Deprecated: EEVEE Legacy kept its own `scene.eevee.use_motion_blur` / `motion_blur_shutter`; EEVEE Next (4.2+) uses
  `scene.render.*` like Cycles.
- Visual gaps: no values given in the video.
- Rule conflicts: never use blur to cover a whip pan or crash zoom; our moves stay ≤ ~130°/s and ≤ ~40 m/s, where 0.5 is
  plenty.

## ADDENDUM — Cleanest Match-Cut Transition for SaaS (+ After Effects Morph Transition with Match Cuts)
Add motion blur as the last step of a match cut / shape morph, after the cut's timing is already locked — enable it
on every animated node/layer involved in that cut (in Fusion, identified by the keyframe icon), not just the one
that reads as "moving." In raea: apply `<MotionBlur shutterAngle={0.5} samples={4} />` only over the cut's CUT±4
frame window, since it only reads during the fast moves; judge the cut first without blur, then add it, and check
no animated part in that window was missed.

## ADDENDUM — Smooth UI Animation After Effects Tutorial
A light, global blur on all UI motion: an adjustment layer over the whole animation with CC Force Motion Blur, blur
samples 10, shutter angle 90°. For Style D, use a lighter setting than this source's own values —
`<MotionBlur shutterAngle={0.25–0.5} samples={4} />`, and only during fast moves, not as a constant global layer.
