---
title: Strong one-sided hard light (~90° to camera) to reveal form and detail
bucket: 04_Shading_Lighting
source: "3 Ways to Improve Your Compositions in Renders.txt"
source_time: "13:56–15:43"
blender_version_source: n/a (Blender, version not stated)
tool_target: Blender bpy | raea
tier: full
style_fit: Partial — Style D's key is one soft top light; a harder raking side light is a valid variant on setups where the hero's surface detail (embossing, texture, ridges) is the point.
---

## METADATA
04_Shading_Lighting | n/a | Blender bpy + raea

## CREATIVE_INTENT
Light from one side only, with almost no world light. A strong source at about 90° to the camera produces the most contrast on the subject (short of a full silhouette) and reveals its form and detail most strongly — windows, edges and features pop. Half of lighting is placing shadow.

## STE_PROCEDURE
1. Set World lighting very dim (background only).
2. Add the key (spot or sun) on one side of the subject only.
3. Place it at ~90° to the camera's view direction for maximum form contrast.
4. Keep the light hard (small source) for crisp detail shadows.
5. Do not add fill from the other side.
6. Check that surface details now cast visible shadows.

## AGENT_EXECUTION
- Blender:
  ```python
  import bpy, math
  from mathutils import Vector
  sc = bpy.context.scene
  sc.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.02   # very dim (~)
  cam = sc.camera; H = bpy.data.objects["Hero"].location
  view = (H - cam.location).normalized()
  side = view.cross(Vector((0, 0, 1))).normalized()          # 90° to camera, horizontal
  bpy.ops.object.light_add(type='SPOT', location=H + side * 4 + Vector((0, 0, 1.5)))
  key = bpy.context.object; key.data.energy = 2000; key.data.shadow_soft_size = 0.05   # hard (~)
  t = key.constraints.new('TRACK_TO'); t.target = bpy.data.objects["Hero"]
  ```
- raea: `<AmbientLight brightness={10} />` (or none), one `<SpotLight transform={Transform.fromXyz(...sidePos).lookingAt(H)} intensity={1800000} outer_angle={0.4} inner_angle={0.2} shadow_maps_enabled />` with no `soft_shadows_enabled` (or a `<DirectionalLight … shadow_maps_enabled soft_shadow_size={0.5} />`); tight `<Shadows distance firstCascade />` for crisp small-scale shadows.

## NOTES
- Source used several spotlights all from one side; count and energies not stated (`~`).
- Rule conflicts: none; for Style D default, keep the top soft key and use this only per-setup when detail is the subject.
