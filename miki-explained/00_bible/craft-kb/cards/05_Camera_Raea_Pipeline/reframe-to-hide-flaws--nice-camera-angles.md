---
title: Fix a weak frame by moving the camera before relighting or remodelling
bucket: 05_Camera_Raea_Pipeline
source: "How to Find Nice Camera Angles in Blender.txt"
source_time: "07:13–07:43, 14:59–15:06, 19:01–19:37"
blender_version_source: 4.x
tool_target: Blender bpy | raea | principle-only
tier: full
style_fit: Fits Style D — cheapest fix first; each 2–3 s setup only has to look right from its one camera.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | principle + Blender bpy + raea

## CREATIVE_INTENT
When a frame shows something unwanted (a distracting streak of light, a floating tree, an empty corner) or just doesn't work, first try a small camera move or lens change. A slight shift often trades the flaw for a dark, quiet area — and a struggling scene can look complete from a different position or zoom.

## STE_PROCEDURE
1. Identify the distracting element in the camera frame (light streak, floating prop, unfinished area).
2. Before editing lights or geometry, nudge the camera position a little past the element.
3. If the element remains, change Focal Length a few mm in or out.
4. Prefer framings that replace the flaw with a dark or quiet area.
5. Only if no camera fix works, change the lighting or the model.
6. When a whole scene looks weak, try several distinctly different positions and focal lengths before rebuilding anything.

## AGENT_EXECUTION
- Blender: nudge and re-render a still per candidate:
  ```python
  import bpy
  cam = bpy.context.scene.camera
  for i, (dx, lens) in enumerate([(0.0, 24), (0.3, 24), (0.3, 28), (-0.3, 22)]):   # ~ small moves
      cam.location.x = base_x + dx; cam.data.lens = lens
      bpy.context.scene.render.filepath = f"//tests/reframe_{i}.png"
      bpy.ops.render.render(write_still=True)
  ```
- raea: render candidate frames with altered camera transform/fov: `raea render EDIT.tsx --frame N -o reframe_i.png`. To hide something only from this camera without moving it, raea has no per-camera visibility; animate its opacity to 0 or omit it for that setup (name it so it fades, per the no-pop rule).

## NOTES
- Respect user edits: if the user moved the camera in the check .blend, diff before nudging (respect-blend-edits).
- Rule conflicts: none.
