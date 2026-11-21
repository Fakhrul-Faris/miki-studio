---
title: Place the camera where a visitor would stand ("discovering it over the edge")
bucket: 05_Camera_Raea_Pipeline
source: "Detail Isn't Hard  Blender Tutorial.txt"
source_time: "38:23–39:25"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: "Good for choosing each 2–3 s setup's viewpoint; conflict: source disables DoF — house look keeps shallow DoF"
---

## METADATA
05_Camera_Raea_Pipeline | 3.x source → 4.2+ / raea | Blender bpy, raea

## CREATIVE_INTENT
Pick the camera by imagining a person in the place: where would they stand to take this picture, and what feeling
(here: finding a huge pit and looking over its edge → high camera looking down, 24 mm). Then refine with test renders,
comparing what works in each.

## STE_PROCEDURE
1. Name the story moment of the shot (e.g. "first discovery from the rim").
2. Put the camera where a person would stand for that moment (source: high, at the opening, looking down).
3. Set Focal Length 24 mm, Type Perspective.
4. Rotate and move the camera in small steps; make 2+ test renders.
5. Compare the test renders; keep what works from each and refine.
6. Before you disable depth of field, check nothing is near enough to blur (source: DoF off, nothing close).

## AGENT_EXECUTION
### Blender
```python
import bpy, math
cam = bpy.context.scene.camera
cam.data.type = 'PERSP'; cam.data.lens = 24
cam.data.dof.use_dof = False                     # source; Style D: True
```
### raea
- 24 mm on our 9:16 frame (Blender sensor 36 mm, AUTO fit = long side = height): vertical fov = `2 * Math.atan(18 / 24)` ≈ 1.287 rad (73.7°):
  `<Camera3d transform={Transform.fromXyz(...eye).lookingAt(target)} projection={{ Perspective: { fov: 2 * Math.atan(18 / 24) } }} />`
  (`blend2raea.py` already computes this vfov per frame).
- Style D: add `<DepthOfField focal_distance={d} aperture_f_stops={2.8} />` inside `<Camera3d>`.

## NOTES
- Rule conflicts: our camera moves between setups must be smooth eased in-out flights (≤ ~130°/s, ≤ ~40 m/s); the "visitor" viewpoint picks the setup, not a walking/handheld move.
- 24 mm is a wide lens chosen for a vast pit; pick the focal length per setup from RECIPE-D, and use the visitor test to choose the viewpoint.
