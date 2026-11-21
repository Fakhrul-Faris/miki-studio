---
title: Composition guides — centre the hero, place supporting objects on thirds (and halves of thirds), Passepartout 1
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "40:49–41:52, 2:32:07–2:32:45"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Framing discipline for each 2–3 s setup; in 9:16 the thirds are horizontal bands as much as vertical lines.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
Hero dead centre for authority; supporting products on the rule-of-thirds lines so the group looks composed; for more objects,
split the space between thirds in half again. Passepartout 1 blacks out everything outside the frame so you judge only the shot.

## STE_PROCEDURE
1. Camera data › Viewport Display › Composition Guides › Center; move the hero (`G Y`/`G X`) until it sits on the centre lines.
2. Set Passepartout to 1 (area outside the camera is black in camera view).
3. Switch guides to Thirds; duplicate the product and place copies exactly on the third lines.
4. For extra objects, place them halfway between a third line and the centre/edge.

## AGENT_EXECUTION
- Blender:
```python
c = bpy.data.objects["Camera"].data
c.show_composition_center = True; c.show_passepartout = True; c.passepartout_alpha = 1.0
c.show_composition_center = False; c.show_composition_thirds = True
```
  Place objects with `bpy_extras.object_utils.world_to_camera_view(scene, cam_obj, loc)` → aim for x/y of 1/3, 1/2, 2/3 (and 1/6, 5/6).
- raea: check placement numerically — project the object's world point to frame pixels (kit `project()` in `iso.tsx` is
  orthographic only; for perspective compute with the camera's fov) and target x = 360/540/720 px on a 1080-wide 9:16 frame,
  y = 640/960/1280 px. Render a check frame with `raea render EDIT.tsx --frame N -o check.png`.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: keep captions' safe area (EX15 capBlock) clear when placing objects on the lower third in 9:16.
