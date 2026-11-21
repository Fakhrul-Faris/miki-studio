---
title: Smooth camera curves — auto-slope keys, retime by spacing, scale to fine-tune
bucket: 01_Animation_Motion
source: "CG Cinematography 101 | Chapter 3 | Camera Analysis (The Nuke).txt"
source_time: "20:21–26:34"
blender_version_source: n/a (Houdini)
tool_target: principle-only
tier: principle
style_fit: Fits Style D — smooth eased camera curves with no linear starts/stops are a house rule.
---

## METADATA
01_Animation_Motion | n/a (Houdini source) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: block the camera move as a few stage poses ("think in stages"), then make the curves smooth by giving every key auto-corrected slopes, and fix pacing by sliding keys further apart rather than adding keys. Zoom the graph to make micro corrections. Ideas: the same loop for our flights — 2–4 poses per flight, smooth slopes, retime by spacing until the move lands on the word.

## STE_PROCEDURE
Method:
1. Key the camera at each stage pose only (start, mid correction, end).
2. Select all keys and set slopes to smooth/auto so tangents follow neighbouring keys.
3. Turn on slope auto-correction so slopes update when a key is dragged.
4. If a section is too fast, drag its later keys further out in time (spacing), not add keys.
5. Frame the curves to fill the editor and make micro corrections.
6. Constrain drags to the time axis when retiming so values don't change.
How-to:
7. If a smoothed curve overshoots between keys, set that segment to a different interpolation.

## AGENT_EXECUTION
### Source tool (Houdini)
- Animation Editor: `9` = smooth/auto slopes on selected keys (`~` as heard); `=` toggles slope auto-correction when dragging (vs `-` off); Alt+middle-drag to move keys; `F` frames curves; Ctrl constrains drag to the X (time) axis. The source hit a curve-handle bug in that Houdini version (handles glitching).
### Blender / raea translation
- Blender:
  ```python
  import bpy
  from bpy_extras import anim_utils
  ob = bpy.data.objects["CAM_move"]; ad = ob.animation_data
  fcs = (anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves
         if hasattr(anim_utils, "action_get_channelbag_for_slot") else ad.action.fcurves)
  for fc in fcs:
      for kp in fc.keyframe_points:
          kp.interpolation = 'BEZIER'
          kp.handle_left_type = kp.handle_right_type = 'AUTO_CLAMPED'   # no overshoot
      fc.update()
  # retime: shift keys after frame X by +dt
  for fc in fcs:
      for kp in fc.keyframe_points:
          if kp.co.x > 40: kp.co.x += 6; kp.handle_left.x += 6; kp.handle_right.x += 6
  ```
  Graph Editor ops: `bpy.ops.graph.handle_type(type='AUTO_CLAMPED')`, `bpy.ops.graph.view_all()`.
- raea: smooth multi-key curves with `track({ 0: a, 24: b, 60: c }, "in-out-sine")` (as in post.md's Fisheye example) or chained `interpolate(..., { easing: Easing.inOut(Easing.cubic) })` per segment.

## NOTES
- Use Auto Clamped (not Auto) in Blender: Auto can overshoot between keys, which reads as bounce.
- Rule conflicts: none.
