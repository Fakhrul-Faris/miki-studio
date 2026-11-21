---
title: Slide the camera off-centre, then turn it back to rebalance the focal point
bucket: 05_Camera_Raea_Pipeline
source: "How to Find Nice Camera Angles in Blender.txt"
source_time: "06:02–07:13"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — avoids the dead-centre "slide" look (anti-slop: angle, not front-on) while keeping the hero object weighted in frame.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | Blender bpy + raea

## CREATIVE_INTENT
A camera dead-centre and perfectly square down a corridor can look fake or boring. Slide it sideways for a more natural, angled view; then, because a big shape now weighs one side and the subject has drifted off-centre, rotate the camera slightly back toward the subject so the frame feels balanced again.

## STE_PROCEDURE
1. Start from the centred, straight-on camera and judge whether it feels staged.
2. Move the camera sideways along global X (G X), ~0.5–1.5 m in a room-scale set (`~`).
3. Check balance: if a large block now weighs one side and the focal object left the centre, the frame is unbalanced.
4. Rotate the camera around global Z (R Z) toward the focal object until it sits nearer the middle again.
5. Re-check: the frame should feel angled but settled, with no side overloaded.

## AGENT_EXECUTION
- Blender:
  ```python
  import bpy, math, mathutils
  cam = bpy.context.scene.camera
  tgt = bpy.data.objects["Hero"].matrix_world.translation
  cam.location.x += 1.0                                   # G X (~)
  # R Z: yaw back so the hero returns toward centre (partial, keep some angle)
  d = tgt - cam.location
  yaw_full = math.atan2(d.y, d.x) - math.pi/2
  cam.rotation_euler.z = cam.rotation_euler.z + 0.7 * (yaw_full - cam.rotation_euler.z)   # ~70 % of the way
  ```
- raea: offset the eye, keep the look-at near the hero: `Transform.fromXyz(cx + 1.0, cy, cz).lookingAt([hx + 0.3*1.0, hy, hz])` — the small residual offset in the target keeps the shot from re-centring perfectly.

## NOTES
- The source gives no numbers for either move (visual only); offsets above are `~`.
- Rule conflicts: none. If this is animated between setups, it is a slow eased truck + pan, never a whip.
