---
title: Duplicate the camera to audition angles (Shift+D, Ctrl+Numpad0)
bucket: 05_Camera_Raea_Pipeline
source: "How to Find Nice Camera Angles in Blender.txt"
source_time: "08:19–08:60, 12:45–13:09, 13:36–13:41, 14:12–14:26"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — a shot list of 2–3 s setups is exactly a set of saved candidate cameras; render all, pick the best per line.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | Blender bpy + raea

## CREATIVE_INTENT
There is no single correct angle. Keep every promising angle as its own camera, switch between them instantly, render each and pick the strongest — instead of losing a good view by moving the only camera.

## STE_PROCEDURE
1. Select the current camera and duplicate it (Shift+D); right-click to cancel the move so it stays in place.
2. With the duplicate selected, set it as active camera and look through it (Ctrl+Numpad 0).
3. Move and re-lens the duplicate to try a new angle (e.g., pull back, set 35 mm).
4. To return, select an earlier camera and press Ctrl+Numpad 0 again.
5. Repeat for each idea (50 mm, 70 mm, 20 mm, elevated, on the bridge).
6. Render every candidate camera and keep the best shots; leave rejected cameras in the file for reference.

## AGENT_EXECUTION
- Blender:
  ```python
  import bpy
  from mathutils import Vector
  sc = bpy.context.scene
  base = sc.camera
  variants = {"A_24mm": (24, (0, 0, 0)), "B_35mm_back": (35, (0, -2.0, 0)), "C_70mm": (70, (0, -5.0, 0.5))}  # ~
  for name, (lens, off) in variants.items():
      c = base.copy(); c.data = base.data.copy(); c.name = f"CAM_{name}"
      sc.collection.objects.link(c)
      c.location = base.location + Vector(off); c.data.lens = lens
  for c in [o for o in sc.objects if o.name.startswith("CAM_")]:
      sc.camera = c                                     # Ctrl+Numpad0
      sc.render.filepath = f"//tests/{c.name}.png"; bpy.ops.render.render(write_still=True)
  ```
- raea: one camera per composition (a second Camera3d is ignored). Keep candidates as data and switch by index: `const CAMS = [{p:[..],t:[..],lens:24}, ...]; const c = CAMS[pick];` then `<Camera3d transform={Transform.fromXyz(...c.p).lookingAt(c.t)} projection={{ Perspective: { fov: 2*Math.atan(18/c.lens) } }} />`; render one frame per index.

## NOTES
- For the shot list, cameras can also be bound to timeline markers (`marker.camera = cam`) — see camera-markers-bound-cuts--car-animation. BlendShot exports one active camera per shot.
- Rule conflicts: none.
