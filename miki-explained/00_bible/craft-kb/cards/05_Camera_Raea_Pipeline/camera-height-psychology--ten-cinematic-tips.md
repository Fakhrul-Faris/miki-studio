---
title: Camera height psychology (high = overview/superior, low = small viewer/weight)
bucket: 05_Camera_Raea_Pipeline
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "06:06–07:36"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — vary height between setups to give each line a different power relation to the hero object.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x | Blender bpy + raea

## CREATIVE_INTENT
Camera height sets the viewer's power relation to the subject. High angles looking down give an overview and make the looked-down-on subject feel lesser (or the viewer superior); a low angle near street level looking up makes the viewer feel small and the scene's weight bear down — use it for unease, scale and importance.

## STE_PROCEDURE
1. Choose the relation: overview / viewer superior → high angle; viewer small / subject imposing → low angle.
2. For a low angle, place the camera near ground level (~0.1–0.3 m in a human-scale set; for a macro object, at the surface plane) and aim up at the subject.
3. For a high angle, raise the camera above the subject and aim down.
4. Fly the camera with Walk Navigation to test positions (W/A/S/D move, Q down, E up, mouse wheel changes speed).
5. Render quick test frames with the Workbench engine for each candidate.
6. Before rendering a new candidate, switch the Image Editor render slot so earlier tests are kept.
7. Compare candidates side by side and keep the one matching the shot's emotion.

## AGENT_EXECUTION
- Blender:
  ```python
  import bpy
  bpy.ops.object.camera_add(location=(0, -6, 0.25))          # Shift+A > Camera
  cam = bpy.context.object; bpy.context.scene.camera = cam   # Numpad0 = view through it
  tgt = bpy.data.objects["Hero"]
  c = cam.constraints.new('TRACK_TO'); c.target = tgt; c.track_axis = 'TRACK_NEGATIVE_Z'; c.up_axis = 'UP_Y'
  sc = bpy.context.scene; sc.render.engine = 'BLENDER_WORKBENCH'   # fast test renders
  for i, z in enumerate([0.25, 1.6, 4.0]):                    # low / eye / high
      cam.location.z = z
      sc.render.filepath = f"//tests/height_{i}.png"; bpy.ops.render.render(write_still=True)
  ```
  Walk navigation is `bpy.ops.view3d.walk()` (Shift+` ); render slots: `bpy.data.images["Render Result"].render_slots.active_index = n`.
- raea: `<Camera3d transform={Transform.fromXyz(0, 0.25, 6).lookingAt([0, 1.2, 0])} projection={{ Perspective: { fov } }} />` — low and looking up; raise `y` and lower the target for the high angle. Test with `raea render EDIT.tsx --frame N -o F.png`.

## NOTES
- Deprecated: Workbench test renders still valid in 4.2+; EEVEE "Next" is `BLENDER_EEVEE_NEXT` in 4.2–4.x (`BLENDER_EEVEE` again in 5.x).
- Same idea in "How to Find Nice Camera Angles" (low looking up = larger, overpowering; elevated = implies a balcony/raised space).
- Rule conflicts: none; height changes between setups happen on hard cuts or eased flights (≤ ~130°/s).
