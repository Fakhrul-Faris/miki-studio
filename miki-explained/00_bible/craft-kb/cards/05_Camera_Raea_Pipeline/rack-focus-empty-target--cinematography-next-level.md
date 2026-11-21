---
title: Rack focus with a keyframed DoF target Empty
bucket: 05_Camera_Raea_Pipeline
source: "Take your Blender Cinematography to the Next Level!.txt"
source_time: "02:34–03:28"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: strong Style D fit — shallow DoF is house look; a rack focus on the spoken word moves attention to the accent object without a cut
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x source; 4.2+ API | Blender bpy → raea DepthOfField focal_distance

## CREATIVE_INTENT
Shifting the focus point during a shot tells the viewer where to look and usually reveals a crucial detail (the video:
a grass field, then focus pulls to remains lying in it). In an explainer, rack from the context object to the one the
line is about, on the word.

## STE_PROCEDURE
1. Set up and keyframe the camera's location and rotation for the shot first.
2. Add an Empty (Shift+A > Empty > Plain Axes).
3. In Camera > Depth of Field, enable it and set Focus Object to the Empty.
4. Set F-Stop to a value a real lens can produce (author's preference; e.g. ~1.4–2.8).
5. Keyframe the Empty's Location at the first subject.
6. Move the Empty to the second subject and keyframe its Location again.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
sc = bpy.context.scene
cam = sc.camera
bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0, 0, 0))
target = bpy.context.active_object; target.name = "FocusTarget"
cam.data.dof.use_dof = True
cam.data.dof.focus_object = target
cam.data.dof.aperture_fstop = 2.0            # ~ "a value a real camera can produce"
target.location = (0.0, -0.5, 0.1); target.keyframe_insert("location", frame=1)
target.location = (0.0,  0.8, 0.1); target.keyframe_insert("location", frame=36)
```
### raea
- `DepthOfField` sits inside `<Camera3d>`; `focal_distance` (metres) animates per frame — compute it as the distance
  from the camera to an eased target point.
```tsx
import { DepthOfField } from "raea/3d";
const cam: [number, number, number] = [0, 0.25, 1.2];
const e = interpolate(f, [w0, w0 + 18], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const tgt = [0, 0.1, interpolate(e, [0, 1], [0.6, -0.4])];      // near object -> far object
const dist = Math.hypot(tgt[0] - cam[0], tgt[1] - cam[1], tgt[2] - cam[2]);
<Camera3d transform={Transform.fromXyz(...cam).lookingAt([0, 0.1, 0])} projection={{ Perspective: { fov: 0.6 } }}>
  <DepthOfField focal_distance={dist} aperture_f_stops={2} mode="bokeh" />
</Camera3d>
```
- Kit: `ProStage` (pro.tsx) takes `focus` and `aperture` — pass the computed `dist` per frame. `BlendShot` exports no
  DoF, so add the rack in TSX.

## NOTES
- Deprecated: none (dof.focus_object unchanged since 2.8).
- Visual gaps: the video does not give F-stop numbers or keyframe timings.
- Rule conflicts: ease the pull in-out over ~0.5–0.8 s, start it on the spoken word; no snap focus.
