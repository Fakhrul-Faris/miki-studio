---
title: Stepped height hierarchy rising to one peak
bucket: 05_Camera_Raea_Pipeline
source: "3 Ways to Improve Your Compositions in Renders.txt"
source_time: "06:51–08:60"
blender_version_source: n/a (Blender, version not stated)
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — stacks, bars and piles of objects arranged in steps that rise to the hero read instantly as "this one matters"; ideal for objects that become a chart.
---

## METADATA
05_Camera_Raea_Pipeline | n/a | Blender bpy + raea

## CREATIVE_INTENT
Arrange elements so each is a little shorter than its neighbour toward the centre, stepping up to one tallest element — a triangular structure converging on a single top point. In the 2D frame the tallest reads as most important and the rest as subordinate. Hierarchy creates order and balance and removes viewer effort.

## STE_PROCEDURE
1. Choose the most important element and make it the tallest in the 2D frame.
2. Place neighbouring elements so heights step down away from it on both sides.
3. Converge the steps toward the centre so the silhouette forms a triangle with one peak.
4. Check the hierarchy in the camera view, not in 3D (perspective changes apparent height).
5. If two elements read equally tall, lower one or move it back.

## AGENT_EXECUTION
- Blender: step heights by rank:
  ```python
  import bpy
  items = sorted([o for o in bpy.data.collections["Stack"].objects], key=lambda o: abs(o.location.x))
  peak, step = 1.0, 0.18                                  # ~ relative heights
  for i, ob in enumerate(items):
      ob.scale.z = max(0.2, peak - step * i)
  ```
  Check screen-space height with `world_to_camera_view` on each object's top vertex.
- raea: the same as data: `const h = (i: number) => Math.max(0.2, 1 - 0.18*Math.abs(i - mid))`; bars or coin stacks as `Mesh3d` with `transform={Transform.fromXyz(x, h(i)/2, 0).withScale([1, h(i), 1])}`; animate growth with an eased `interpolate` per bar, staggered so the peak finishes last on the word.

## NOTES
- Rule conflicts: none; growth eases in, no bounce at the top.
