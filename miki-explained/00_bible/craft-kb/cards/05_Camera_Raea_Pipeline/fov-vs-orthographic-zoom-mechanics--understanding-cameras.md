---
title: FOV zooms the frustum angle (perspective only); orthographic "zoom" scales the whole scene
bucket: 05_Camera_Raea_Pipeline
source: "Minimalist Tech & SaaS 3D Staging/Understanding Cameras Perspective and Orthographic.md"
source_time: "11:35–21:28"
tool_target: raea
tier: principle
use_when: "choosing or animating a zoom for a diagram/data shot, or deciding whether a shot should feel perspective-compressed or flat/technical"
style_fit: "Relevant whenever a diagram or chart-style insert uses an orthographic camera (distinct from the macro hero shots, which stay perspective)."
---

## METADATA
05_Camera_Raea_Pipeline | Three.js (applies to any engine incl. Bevy/raea) | Camera3d projection choice

## CREATIVE_INTENT
A perspective camera's field of view (FOV) is the angle between its frustum's top and bottom planes; lowering FOV
narrows the frustum and visually zooms in (objects enlarge) while keeping the aspect ratio; raising it does the
opposite and can reveal/hide neighbouring objects entirely. An orthographic camera has no FOV at all — object size on
screen never changes with camera distance. Its "zoom" is instead a uniform scale applied to the whole scene (same
factor to every object's apparent size), not a camera-to-object distance change.

## STE_PROCEDURE
1. Decide if the shot needs perspective compression (near things big, far things small, camera distance matters) or a
   flat technical read (object size independent of distance) — pick perspective vs. orthographic accordingly.
2. For a perspective zoom effect, animate FOV down to "zoom in" (enlarge, narrow the frustum) or up to "zoom out."
3. Never expect dolly-zoom-like framing changes from an orthographic camera by moving it closer/further — size won't
   change; move it only to reframe, not to zoom.
4. For an orthographic "zoom," scale the scene/view uniformly instead (or use the camera's zoom/ortho-size property,
   which scales all dimensions by the same factor).

## AGENT_EXECUTION
raea `Camera3d`: use `projection={{ Perspective: { fov } }}` and animate `fov` for a perspective zoom; use
`projection={{ Orthographic: { scale } }}` (or equivalent ortho size param) and animate that scale for an
orthographic zoom — moving the orthographic camera's position changes nothing about apparent size, only framing.

### Worked example
Topic: a data-diagram insert showing a chart of daily sales (flat, technical read wanted).
BEFORE: used a perspective camera for the chart insert; pushing the camera in to "zoom" on one bar also perspective-
skews the bar's apparent height relative to its neighbours.
AFTER: switched to an orthographic camera for this insert; all bars keep true relative height regardless of distance;
the "zoom" on one bar is done by animating the orthographic scale value, not camera position.

### Check
- Does the shot's intent (compressed/dramatic vs. flat/technical) match the chosen projection type?
- For a perspective zoom, is FOV (not just camera position) what's being animated?
- For an orthographic shot, does moving the camera only reframe, never resize, the subject?

## NOTES
- Visual gaps: none — demoed live and described in the same breath.
- A perspective FOV change also affects how much of the surrounding scene is visible (narrower FOV = less visible),
  which an orthographic zoom (uniform scale) does not replicate the same way — check neighbouring objects aren't
  unintentionally cropped out when narrowing FOV for a "zoom."
