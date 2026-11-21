---
title: Blurred foreground element as frame and depth cue
bucket: 05_Camera_Raea_Pipeline
source: "6 Tips to Make Your Renders Instantly Cooler.txt"
source_time: "unknown (no timestamps; tip 1 of 6)"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D macro shots: an out-of-focus near object (a coin edge, a receipt corner) frames the hero and sells shallow DoF; parallax grows when the camera moves.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x (Eevee Legacy) → 4.2+ | Blender bpy (layout) + raea DepthOfField

## CREATIVE_INTENT
Film-school framing: put one object very close to the lens and let it blur. It adds a near depth layer, frames the subject, and the depth reads much stronger once the camera moves (foreground parallax). Use it on a hold or a slow push so the frame never looks like a flat product slide.

## STE_PROCEDURE
1. Before placing the foreground element, lock the camera and the hero's position.
2. Place a scene-native object (the video uses a tree) between camera and subject, near one frame edge.
3. Keep it partly in frame — a corner or side, never covering the subject.
4. Enable Depth of Field on the camera and set Focus Object (or Distance) to the hero.
5. Lower F-Stop until the foreground element is clearly soft (~1.4–2.8) while the hero stays sharp.
6. Check the framing in camera view; move the element until it leads the eye toward the hero.

## AGENT_EXECUTION
```python
import bpy
cam = bpy.context.scene.camera
cam.data.dof.use_dof = True
cam.data.dof.focus_object = bpy.data.objects["Hero"]
cam.data.dof.aperture_fstop = 2.0          # ~ not given in the video
fg = bpy.data.objects["FG_Element"]
fg.location = cam.matrix_world @ __import__("mathutils").Vector((0.25, -0.15, -0.6))  # ~ near the lens, frame edge
```
raea (render time): the blur is the camera's, not baked.
```tsx
<Camera3d transform={Transform.fromXyz(...camP).lookingAt(hero)} projection={{ Perspective: { fov } }}>
  <DepthOfField focal_distance={distToHero} aperture_f_stops={2} />
</Camera3d>
```
Animate `focal_distance` per frame for a pull; kit `ProStage` (tools/raea/kit/pro.tsx) already takes `focus` and `aperture`.

## NOTES
- Deprecated: none (camera DoF unchanged in 4.x).
- Visual gaps: exact placement and f-stop shown only on screen.
- Rule conflicts: the foreground must be built from the scene's own objects (house rule); no random foliage in a macro tabletop shot.
