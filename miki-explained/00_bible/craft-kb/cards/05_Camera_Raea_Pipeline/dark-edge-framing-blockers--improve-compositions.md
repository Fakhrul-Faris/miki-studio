---
title: Framing with bold dark blocker shapes around the subject
bucket: 05_Camera_Raea_Pipeline
source: "3 Ways to Improve Your Compositions in Renders.txt"
source_time: "04:21–05:32, 06:37–06:51"
blender_version_source: n/a (Blender, version not stated)
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — dark room, out-of-focus foreground shapes and shadowed props frame the bright hero like a natural vignette.
---

## METADATA
05_Camera_Raea_Pipeline | n/a | Blender bpy + raea

## CREATIVE_INTENT
Put big, bold, dark, unlit shapes around the outside of the frame — a neutral foreground block, shadowed wagons, trees that aren't lit in a distracting way — so they block off unimportant areas and leave the bright centre feeling important. It acts like a vignette built from the scene's own objects and snaps the gaze to the subject automatically.

## STE_PROCEDURE
1. Identify frame areas that don't need attention (edges, corners, foreground).
2. Place large simple shapes there (foreground block, props, foliage).
3. Keep those shapes dark: in shadow, unlit, low detail, neutral colour.
4. Keep the centre (subject area) the brightest region.
5. Check that the frame shapes read as bold masses, not as detailed objects competing for attention.

## AGENT_EXECUTION
- Blender: foreground blocker out of the key's reach, or excluded from it via light linking (4.0+):
  ```python
  import bpy
  fg = bpy.data.objects["FG_block"]
  fg.visible_shadow = True
  key = bpy.data.objects["Key"]
  key.light_linking.receiver_collection = bpy.data.collections["Lit_by_key"]   # 4.0+ light linking (Cycles; EEVEE Next from 4.2+)
  ```
- raea: dark foreground mesh near the lens and outside the SpotLight cone (`outer_angle` 0.3–0.6 aimed at the hero), dark `base_color` (e.g., `#15161a`), `perceptual_roughness={0.9}`; with `<DepthOfField>` it blurs into a soft dark mass. raea has no light linking: keep blockers outside the cone or behind a `<Mesh3d shadow="only">` blocker.

## NOTES
- Light linking isn't exported by blend2raea/BlendShot; achieve the same by placement.
- Rule conflicts: none; blockers that move in/out of frame do so with the camera, never popping.
