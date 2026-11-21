---
title: Depth of field via focus eyedropper and a conservative f-stop (≈2.8, not below ~1.8)
bucket: 05_Camera_Raea_Pipeline
source: "How to Find Nice Camera Angles in Blender.txt"
source_time: "09:01–10:28"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D with care — shallow DoF is house, but over-blurring makes scenes read as miniatures; for macro objects that is the intended read, for rooms it is not.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | Blender bpy + raea

## CREATIVE_INTENT
Focus on the focal point and let near foreground objects fall slightly soft for a natural, photographic feel. Too low an f-stop blurs everything and makes the scene feel tiny (miniature effect), which is unnatural for environments. On wide shots the source often leaves DoF off.

## STE_PROCEDURE
1. Enable Depth of Field on the camera (Camera Properties > Depth of Field).
2. Use the Focus Distance eyedropper and click the focal point (e.g., the bookshelf).
3. Set F-Stop to 2.8 (Blender default).
4. For a little more blur, lower F-Stop to ~1.8; do not go much below.
5. Check that foreground objects soften slightly and the focal point stays sharp.
6. If everything looks miniature, raise the F-Stop.
7. For wide environment shots, consider leaving DoF off (or a high F-Stop such as 22).

## AGENT_EXECUTION
- Blender:
  ```python
  import bpy
  cam = bpy.context.scene.camera.data
  cam.dof.use_dof = True
  cam.dof.focus_object = bpy.data.objects["Hero"]      # eyedropper equivalent (or cam.dof.focus_distance = d)
  cam.dof.aperture_fstop = 2.8                         # 1.8 minimum for a natural look; 22 ≈ off
  ```
- raea: inside the camera: `<Camera3d transform={...} projection={...}><DepthOfField focal_distance={dist} aperture_f_stops={2.8} /></Camera3d>` with `dist = |eye - hero|` in metres; animate `focal_distance` per frame for a pull.

## NOTES
- Blender and raea f-stops are both physical but blur also depends on scene scale; a macro object modelled at real size at f/2.8 will blur strongly — that is the macro look Style D wants. Check scale units are metres before trusting the numbers.
- Same principle in dof-close-ups-only--ten-cinematic-tips.
- Rule conflicts: none.
