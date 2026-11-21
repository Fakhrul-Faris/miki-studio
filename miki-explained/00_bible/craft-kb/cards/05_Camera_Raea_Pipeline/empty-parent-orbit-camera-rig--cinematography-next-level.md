---
title: Orbit camera rig — camera parented to an Empty at the subject
bucket: 05_Camera_Raea_Pipeline
source: "Take your Blender Cinematography to the Next Level!.txt"
source_time: "05:21–05:57"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: strong fit — fast way to find hero angles around the one macro object and to drive smooth arc flights between setups
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x source; 4.2+ API | Blender bpy → raea per-frame orbit transform

## CREATIVE_INTENT
When you can't decide a camera angle on a product, parent the camera to an Empty at the product's centre and rotate the
Empty: the camera orbits while always framing the subject — quick angle-hunting, and clean arc moves.

## STE_PROCEDURE
1. Add an Empty at the same location as the target object.
2. Place the camera in front of the target, aimed at it (as in the dolly zoom setup).
3. Select the camera, then Shift-select the Empty so the Empty is active.
4. Parent with Ctrl+P > Object.
5. Select the Empty and press R twice for Trackball rotation; orbit until the shot looks good.
6. Keyframe the Empty's Rotation to animate the orbit.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy, math
sc = bpy.context.scene
cam = sc.camera
subject = bpy.data.objects["Hero"]                       # your target
bpy.ops.object.empty_add(type='PLAIN_AXES', location=subject.location)
rig = bpy.context.active_object; rig.name = "CamRig"
cam.parent = rig
cam.matrix_parent_inverse = rig.matrix_world.inverted()  # = Ctrl+P > Object (keep transform)
rig.rotation_euler = (0, 0, 0);                rig.keyframe_insert("rotation_euler", frame=1)
rig.rotation_euler = (0, 0, math.radians(40)); rig.keyframe_insert("rotation_euler", frame=60)
```
blend2raea/BlendShot export the camera per frame, so a parented rig carries over into raea unchanged.

### raea (direct)
```tsx
const e = interpolate(f, [0, 60], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const a = interpolate(e, [0, 1], [0, (40 * Math.PI) / 180]);      // 40° over 2 s ≈ 20°/s average, well under 130°/s
const r = 1.4, h = 0.5, c: [number, number, number] = [0, 0.1, 0];
<Camera3d transform={Transform.fromXyz(c[0] + r * Math.sin(a), h, c[2] + r * Math.cos(a)).lookingAt(c)} projection={{ Perspective: { fov: 0.6 } }} />
```

## NOTES
- Deprecated: none.
- Visual gaps: trackball (R R) angle is chosen by eye.
- Rule conflicts: ease every orbit in-out; cap angular speed ~130°/s.
