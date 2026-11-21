---
title: Second viewport locked to the camera in render view
bucket: 05_Camera_Raea_Pipeline
source: "How to Find Nice Camera Angles in Blender.txt"
source_time: "00:51–01:59"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — keep the final frame visible while dressing the hero object, so every edit is judged through the lens.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | Blender bpy + raea

## CREATIVE_INTENT
Work in a fast solid/wireframe viewport while a second viewport always shows exactly what the camera sees, rendered. Every move of a prop or light is judged in the final frame, not in a free view that lies about composition.

## STE_PROCEDURE
1. Drag the edge of any editor to split it, and set the new area to 3D Viewport.
2. Keep the working viewport in Solid (or Wireframe) shading for speed.
3. In the second viewport, press View > Cameras > Active Camera (Numpad 0).
4. Set the second viewport's shading to Rendered.
5. Press Ctrl+B in the camera view and drag a box over the camera frame to set a Render Region.
6. Leave the second viewport open beside the working one while you move objects and lights.

## AGENT_EXECUTION
- Blender (an agent has no viewport; the equivalent is set up for the user's check .blend):
  ```python
  import bpy
  scr = bpy.context.screen
  areas = [a for a in scr.areas if a.type == 'VIEW_3D']
  with bpy.context.temp_override(area=areas[0]):
      bpy.ops.screen.area_split(direction='VERTICAL', factor=0.5)
  v3d = [a for a in bpy.context.screen.areas if a.type == 'VIEW_3D']
  work, cam_view = v3d[0], v3d[1]
  work.spaces[0].shading.type = 'SOLID'
  cam_view.spaces[0].shading.type = 'RENDERED'
  cam_view.spaces[0].region_3d.view_perspective = 'CAMERA'   # Numpad 0
  sc = bpy.context.scene
  sc.render.use_border = True                                  # Ctrl+B render region
  sc.render.border_min_x, sc.render.border_max_x = 0.0, 1.0
  sc.render.border_min_y, sc.render.border_max_y = 0.0, 1.0
  ```
- raea: the "rendered camera view" is a still render of the shot: `raea render EDIT.tsx --frame N -o check.png`, re-run after each change (or a cheap preview per the preview-before-render rule).

## NOTES
- Ctrl+B in camera view sets a render border (`render.use_border`); in a non-camera viewport it sets a viewport clipping/render region instead. The source uses it to crop the preview to the frame; clear it with Ctrl+Alt+B before final Blender renders (finals are raea anyway).
- Rule conflicts: none.
