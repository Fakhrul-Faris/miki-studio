---
title: Rank every object into importance tiers; centre, light and size the top tier, shade and crop the bottom
bucket: 05_Camera_Raea_Pipeline
source: "3 Ways to Improve Your Compositions in Renders.txt"
source_time: "10:39–13:56"
blender_version_source: n/a (Blender, version not stated)
tool_target: Blender bpy | raea | principle-only
tier: full
style_fit: Fits Style D — one hero (tier 1, lit + accent), a few supporting props (tier 2), dressing in the dark at the edges (tier 3).
---

## METADATA
05_Camera_Raea_Pipeline | n/a | principle + Blender bpy + raea

## CREATIVE_INTENT
Rank everything in the frame by how important it should feel: lowest tier (a random object, a log, a wheel), middle tier (wagons, a character, trees), top tier (the castle). Then place and light each to match: the top tier is centred, brightest and biggest; the lowest tier sits in shade, off to the side, cut off by the frame. Like photographing a friend — you put them in the middle. Subordinate objects pushed down into shade make the main one feel even more important. Deliberate confusion is an exception for unsettling work.

## STE_PROCEDURE
1. List every visible object and assign tier 1 (one item), tier 2, or tier 3.
2. Place tier 1 near the centre and make it the largest in frame.
3. Give tier 1 the most light.
4. Place tier 3 in shade, toward the edges, partly cut off by the frame.
5. Give tier 2 moderate light and size between the two.
6. Check that no tier 2 or 3 object competes with tier 1 for brightness or size.

## AGENT_EXECUTION
- Blender: tag objects and enforce by tier:
  ```python
  import bpy
  for ob in bpy.data.objects:
      t = ob.get("tier", 3)
      if t == 3:
          for slot in ob.material_slots:            # darker, rougher (~)
              bsdf = slot.material.node_tree.nodes.get("Principled BSDF")
              if bsdf: bsdf.inputs["Base Color"].default_value[:3] = [c*0.5 for c in bsdf.inputs["Base Color"].default_value[:3]]
  ```
  Place tier 3 outside the key's cone; check with `world_to_camera_view` that tier 3 sits near/over the frame edge.
- raea: one `SpotLight` with a tight `outer_angle` on tier 1; tier 2 lit by a low `RectLight`/ambient; tier 3 outside both, darker `base_color`; brand accent `emissive` only on tier 1.

## NOTES
- Centre placement here is about importance; it can coexist with off-centre framing (off-centre-then-rebalance-aim--nice-camera-angles) — keep tier 1 dominant either way, and out of caption zones in 9:16.
- Rule conflicts: none.
