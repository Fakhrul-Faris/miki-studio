---
title: Focal length as zoom (phone-lens equivalents) and near-wide vs far-long
bucket: 05_Camera_Raea_Pipeline
source: "How to Find Nice Camera Angles in Blender.txt"
source_time: "03:04–05:17, 10:28–11:01, 13:52–14:12"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — choose lens and distance per setup deliberately; macro hero shots sit far-long, establishing beats near-wide.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | Blender bpy + raea

## CREATIVE_INTENT
Treat focal length as the zoom ring: phone 0.5x ≈ 16 mm, 1x ≈ 24 mm, 2x ≈ 50 mm. Framing the same subject from close with a wide lens or from far with a long lens gives the same subject size but a different feeling: near-wide shows more space around it and stretches depth; far-long flattens and isolates it. Pick the pair by the look, not by habit.

## STE_PROCEDURE
1. Start at 50 mm (Blender default) and judge whether enough space is captured.
2. For an interior that must show the room, set Focal Length to 20–30 mm; 24 mm is the source's natural default.
3. If 24 mm feels too wide for the subject, step in to ~35 mm.
4. For a compressed, isolated look, set 50–70 mm and pull the camera back along its view axis (G Z Z).
5. Compare a near-wide and a far-long version that frame the subject at the same size.
6. Keep the version whose depth feel matches the shot's intent.

## AGENT_EXECUTION
- Blender:
  ```python
  import bpy, mathutils
  cam = bpy.context.scene.camera
  def frame_same(cam, target, lens, ref_lens=24, ref_dist=None):
      # keep subject size constant: distance scales with focal length
      d = (cam.location - target).length if ref_dist is None else ref_dist
      new_d = d * lens / ref_lens
      fwd = (target - cam.location).normalized()
      cam.location = target - fwd * new_d
      cam.data.lens = lens
  frame_same(cam, bpy.data.objects["Hero"].location, 70)   # far-long variant
  ```
  Phone equivalents (36 mm sensor): 16 mm ≈ 0.5x, 24 mm ≈ 1x, 50 mm ≈ 2x.
- raea: vertical fov for our 9:16 frame from a Blender lens (sensor fit Auto, 36 mm on the tall side): `fov = 2*Math.atan(18/lensMm)` (24 mm ≈ 73.7°, 35 mm ≈ 54.4°, 50 mm ≈ 39.6°, 70 mm ≈ 28.8°). Move the camera with the fov so the subject keeps its size: `dist = dist24 * lensMm / 24`, `Transform.fromXyz(...target - dir*dist).lookingAt(target)`.

## NOTES
- The phone equivalences are the source's approximations (35 mm-equivalent marketing values), fine as a mental model.
- A 9:16 frame is narrow: a wide lens's horizontal coverage is much smaller than in the source's 16:9 examples; test the lens on a vertical still.
- Rule conflicts: none. Animated lens changes ease in-out (no crash zoom).
