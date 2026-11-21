---
title: One focal point with breathing room on every side
bucket: 05_Camera_Raea_Pipeline
source: "How to Find Nice Camera Angles in Blender.txt"
source_time: "07:54–08:19, 10:60–11:48, 17:52–18:06"
blender_version_source: 4.x
tool_target: Blender bpy | raea | principle-only
tier: full
style_fit: Fits Style D — the hero object is the focal point; margins keep it from feeling cramped against captions and frame edges.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | principle + Blender bpy + raea

## CREATIVE_INTENT
A good angle needs something to point at: one object or area more interesting than everything around it. Across every candidate angle, keep that focal point in the same general region and leave space above, below and beside it, so it never touches or crowds a frame edge and no side (often the bottom) feels heavier than the other.

## STE_PROCEDURE
1. Name the single focal point of the shot before moving the camera.
2. Frame so the focal point is clearly the most interesting element.
3. Leave space between the focal point and every frame edge.
4. Check top vs bottom and left vs right weight; if one side is heavy, move or re-aim the camera.
5. If no element stands out, add or strengthen a focal point (detail, light, colour) before chasing angles.

## AGENT_EXECUTION
- Blender: measure the focal object's screen bounds and enforce margins:
  ```python
  import bpy
  from bpy_extras.object_utils import world_to_camera_view
  sc = bpy.context.scene; cam = sc.camera; ob = bpy.data.objects["Hero"]
  pts = [world_to_camera_view(sc, cam, ob.matrix_world @ v.co) for v in ob.data.vertices]
  xmin, xmax = min(p.x for p in pts), max(p.x for p in pts)
  ymin, ymax = min(p.y for p in pts), max(p.y for p in pts)
  MARGIN = 0.08                                   # ~ 8 % of frame
  ok = xmin > MARGIN and ymin > MARGIN and xmax < 1-MARGIN and ymax < 1-MARGIN
  balance = (ymin) - (1-ymax)                     # >0 = more room below than above
  ```
- raea: no screen-bounds API; check the rendered still (`raea render EDIT.tsx --frame N`). For 9:16 also keep the focal point out of the caption band and TikTok UI zones.

## NOTES
- Visual gap: the exact "section" the source keeps the focal point in is pointed at on screen only.
- Rule conflicts: none; in Style D the focal point also carries the one brand accent.
