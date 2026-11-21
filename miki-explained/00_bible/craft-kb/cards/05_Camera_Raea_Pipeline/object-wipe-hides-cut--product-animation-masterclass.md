---
title: Object wipe — a product crossing the lens hides the cut
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:39:20–1:42:04, edit 2:52:32–2:53:17"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Fits "transitions built from the scene's own objects"; keep the pass smooth (no whip feel) and match its direction to the camera flight.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | Blender bpy (+ film transparent render) + raea

## CREATIVE_INTENT
A single product, close to the lens so it fills the frame, slides across the screen in 12 frames; under it shot A cuts to shot B.
The viewer never sees the cut. Rendered on a transparent film so it can be laid over any pair of shots in the edit.

## STE_PROCEDURE
1. Save a separate .blend for the transition; delete other animation, constraints and the old camera.
2. Stand the product upright (`Alt+R`) close to a fresh camera (Numpad 0 view) inside the existing lighting; it must cover the whole frame height.
3. Set the shot length to 12 frames.
4. At frame 1, place it just outside the frame on one side; key Location, Rotation & Scale.
5. At frame 12, place it just outside the other side; key Location, Rotation & Scale. Delete any stray rotation keys.
6. Hide the backdrop plane in viewport and render.
7. Enable Render › Film › Transparent; render a PNG sequence (RGBA).
8. In the edit, place the PNG pass on a track above the cut and slide it a frame at a time until the shot change is hidden.

## AGENT_EXECUTION
- Blender:
```python
import bpy
ob = bpy.context.object                          # the product doing the wipe
plane = bpy.data.objects["Plane"]                # ~ the backdrop
scn = bpy.context.scene; scn.frame_start, scn.frame_end = 1, 12
ob.location.x = -0.35; ob.keyframe_insert("location", frame=1)    # ~ just outside frame
ob.location.x =  0.35; ob.keyframe_insert("location", frame=12)
plane.hide_render = True
scn.render.film_transparent = True
scn.render.image_settings.file_format = 'PNG'; scn.render.image_settings.color_mode = 'RGBA'; scn.render.image_settings.color_depth = '16'
```
- raea: no separate pass needed — put the wiping object in the same composition and switch the set on the covering frame:
  `const cut = 18; {f < cut ? <ShotA/> : <ShotB/>}` with the wiping `<Model name="wipe-can">` driven by
  `interpolate(f, [cut-6, cut+6], [-0.35, 0.35], { easing: Easing.bezier(0.65, 0, 0.35, 1) })`; the one camera's transform can jump on
  the cut frame (`scene.md`: "one camera whose transform jumps at the cut frame").

## NOTES
- Deprecated: none.
- Visual gaps: start/end distances are visual (`~`).
- Rule conflicts: 12 frames at 24 fps (0.5 s) is OK; the object must be fully opaque and cover 100 % of frame on the cut frame.
  Prefer the scene's own hero object, not a foreign prop.
- bpy fixed for 5.3: incomplete snippet: added `import bpy`, `ob`, `plane`.
