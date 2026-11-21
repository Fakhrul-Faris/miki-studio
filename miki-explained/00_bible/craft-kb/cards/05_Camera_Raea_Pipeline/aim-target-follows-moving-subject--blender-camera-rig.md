---
title: Aim target glued to a moving subject (Copy Location on FT) while the camera rides its own path
bucket: 05_Camera_Raea_Pipeline
source: "Making blenders camera actually good.txt"
source_time: "09:26–11:05"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Lets a moving hero (a coin, a parcel, a scooter) stay framed while the camera travels its own route — relative motion instead of a locked follow.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
When the subject moves, keyframing the aim by hand is slow and looks wobbly. Constrain the aim to the subject and let the camera take its own path around obstacles: the subject stays in frame while the viewpoint changes, which feels like the audience is inside the move.

## STE_PROCEDURE
1. Draw a separate path curve for the camera (extrude points along an interesting route around the scene's props).
2. Keep the path simple first; reshape it only after the rig is attached and you can see its effect.
3. Append the two-empty camera rig.
4. Add a Copy Location constraint to the `FT` empty; Target = the moving subject.
5. Add Follow Path to the camera; Target = the camera path; keep Follow Path above Damped Track.
6. Click Animate Path, play, then tweak the path's points until the move is interesting.

## AGENT_EXECUTION
Blender:
```python
import bpy
ft = bpy.data.objects["FT"]; hero = bpy.data.objects["Hero"]; cam = bpy.context.scene.camera
c = ft.constraints.new('COPY_LOCATION'); c.target = hero
f = cam.constraints.new('FOLLOW_PATH'); f.target = bpy.data.objects["CamPath"]
cam.constraints.move(list(cam.constraints).index(f), 0)
```
raea: the look-at point is the subject's position at that frame (the same data that moves the subject):
```tsx
const hero = heroAt(f);                       // from paths.py / the bake
<Camera3d transform={Transform.fromXyz(...camAt(f)).lookingAt(hero)} projection={{ Perspective: { fov } }}>
  <DepthOfField focal_distance={dist(camAt(f), hero)} aperture_f_stops={2.8} />
</Camera3d>
```

## NOTES
- Deprecated: none.
- Visual gaps: the asteroid-field path shape is visual only.
- Rule conflicts: a hard Copy Location on a fast-turning subject transmits every jerk to the camera aim. Smooth the subject's path (one eased move per action), or aim at a lagged/averaged point, and run the camera turn-rate check (≤ ~130°/s). Camera paths must pass the collision check against every prop (`paths.py`).
