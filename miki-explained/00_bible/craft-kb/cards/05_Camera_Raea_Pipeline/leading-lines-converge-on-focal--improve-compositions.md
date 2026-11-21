---
title: Leading lines — arrange the set's natural lines to converge on one point
bucket: 05_Camera_Raea_Pipeline
source: "3 Ways to Improve Your Compositions in Renders.txt"
source_time: "00:35–04:21"
blender_version_source: n/a (Blender, version not stated)
tool_target: Blender bpy | raea | principle-only
tier: full
style_fit: Fits Style D — in a 2–3 s setup the viewer must find the hero instantly; edges of the surface, props and the object's own lines should point at it.
---

## METADATA
05_Camera_Raea_Pipeline | n/a | principle + Blender bpy + raea

## CREATIVE_INTENT
Lines already exist in every model — a bridge, building edges, spires and sloped roofs like arrows, branches, a wagon's perspective, even a log in a corner. Placing and angling objects so most of those lines run toward one point removes the viewer's effort: they know where to look without thinking. Beginner images overwhelm because there is lots of information and no guidance. Not every line has to point; most should.

## STE_PROCEDURE
1. Pick the single point the eye should land on.
2. Look through the camera and identify the strong lines (edges, rails, rows, roof slopes, branches).
3. Rotate or move objects so their dominant lines point toward the focal point.
4. Use perspective: angle long objects so their receding edges converge toward the focal point.
5. Let weak elements (a log, a branch) add a gentle nudge from the frame corners.
6. Check: wherever the eye lands first, it should be pushed toward the focal point.

## AGENT_EXECUTION
- Blender: aim an object's long axis at the focal point (in screen space it then points there from any camera roughly along the axis):
  ```python
  import bpy, math
  focal = bpy.data.objects["Hero"].matrix_world.translation
  for name in ["Plank", "Rail", "Log"]:
      ob = bpy.data.objects[name]
      d = focal - ob.location                                      # keep it lying on the surface (yaw only)
      ob.rotation_euler.z = math.atan2(d.y, d.x)                   # long axis = local X (~ check model)
  ```
  Verify in the camera with `world_to_camera_view` on each object's two ends: the 2D line through them should pass near the focal point's 2D position.
- raea: same placement in TSX: `Transform.fromXyz(...p).withRotation(Quat.fromEuler("XYZ", 0, Math.atan2(-(fz - pz), fx - px), 0))` for a prop whose long axis is X; render a still to check.

## NOTES
- Style D sets are sparse (one hero on a real surface); the lines come from the surface grain/edges, a counter's edge, shelf rows — angle them, don't add clutter.
- Rule conflicts: none.
