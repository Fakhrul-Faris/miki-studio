---
title: Slight camera tilt (Dutch roll, 2–4°) toward the threat
bucket: 05_Camera_Raea_Pipeline
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "14:16–14:55"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits sparingly — a still 2–4° roll on a "something is wrong" line (scam, loss); never an animated swing.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x | Blender bpy + raea

## CREATIVE_INTENT
A level horizon reads relaxed; a small roll makes the frame feel slightly wrong or ominous. Choose the direction so the tilt leans the eye toward the element you want feared or noticed. Keep it subtle.

## STE_PROCEDURE
1. Before you tilt, finish framing with a level horizon.
2. Rotate the camera around its viewing axis (roll) by 2–4°.
3. Choose the roll direction so the frame leans toward the target element.
4. Check the flipped frame (see "Flip the composition") to confirm the tilt does not unbalance the image.

## AGENT_EXECUTION
- Blender: roll is rotation about the camera's local Z (the video says "y-axis" — in camera view the visible tilt is local-Z roll):
  `bpy.ops.transform.rotate(value=math.radians(3), orient_axis='Z', orient_type='LOCAL')` with the camera selected, or with a Track To constraint add roll via `cam.rotation_euler` on an empty parent.
- raea: `Transform.lookingAt(target, up)` takes an up vector (sdk core: `lookingAt(target, up = [0,1,0])`). Roll by r radians for a camera looking roughly down -Z: `up = [Math.sin(r), Math.cos(r), 0]`. General case: rotate [0,1,0] around the view direction by r.
  `<Camera3d transform={Transform.fromXyz(...p).lookingAt(t, up)} ... />`

## NOTES
- Pipeline gap: BlendShot camera data is `{p, t, fov}` only — a roll keyed in Blender is lost on export. Add roll in the TSX via the `up` vector.
- Rule conflicts: an animated roll must be slow and eased; no tilt "swings". Use only on lines whose meaning is unease.
