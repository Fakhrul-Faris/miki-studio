---
title: Extreme-contrast check — slam the curves and see what goes white
bucket: 05_Camera_Raea_Pipeline
source: "3 Ways to Improve Your Compositions in Renders.txt"
source_time: "05:32–06:51"
blender_version_source: n/a (Blender render, check in an image editor)
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — a quick QC on every still: only the hero (and its accent) should survive as white.
---

## METADATA
05_Camera_Raea_Pipeline | n/a | Blender bpy + raea (QC)

## CREATIVE_INTENT
Push a curves adjustment to an absurd contrast on the finished render and look at what stays white and what turns black. If the composition works, the white is only the area you want looked at and the black is the framing masses around it. It's a diagnostic, never a look.

## STE_PROCEDURE
1. Render the still.
2. Apply a Curves adjustment with an extremely steep S (or levels crushed from both ends).
3. Note which regions are white and which are black.
4. If white appears outside the focal area, darken or reframe those regions.
5. If the focal area goes black, add light or move it into the light.
6. Remove the adjustment; it is a check only.

## AGENT_EXECUTION
- Blender (compositor, preview only):
  ```python
  import bpy
  sc = bpy.context.scene
  nt = sc.compositing_node_group or bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
  sc.compositing_node_group = nt                     # 5.x: the compositor is a node group assigned to the scene
  rl = nt.nodes.get("Render Layers") or nt.nodes.new("CompositorNodeRLayers")
  cv = nt.nodes.new("CompositorNodeCurveRGB")
  c = cv.mapping.curves[3]                       # combined (C) curve
  c.points[0].location = (0.40, 0.0); c.points[1].location = (0.60, 1.0)   # ~ steep S
  cv.mapping.update()
  viewer = nt.nodes.new("CompositorNodeViewer")
  nt.links.new(rl.outputs["Image"], cv.inputs["Image"]); nt.links.new(cv.outputs["Image"], viewer.inputs["Image"])
  ```
  (5.x: compositor node groups replace `scene.node_tree`; use `scene.compositing_node_group`.)
- raea / shell (on a rendered still, no render change): `ffmpeg -i still.png -vf "curves=all='0/0 0.4/0 0.6/1 1/1'" -y check.png` then view check.png. Optional metric: share of white pixels inside vs outside the hero's box.

## NOTES
- Rule conflicts: none (a QC step; nothing ships with it).
- bpy fixed for 5.3: scene.node_tree → scene.compositing_node_group (new CompositorNodeTree); Render Layers created if missing; unused Composite lookup dropped (output goes to the Viewer).
