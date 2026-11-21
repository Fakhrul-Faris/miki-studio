---
title: Orbiting camera — Follow Path on a tilted Bézier circle + Track To the hero; animate Offset with a fast-then-slow curve
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:30:07–1:34:21, 1:36:00–1:36:43"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Smooth curved camera flight that keeps the hero centred — good for Style D setup-to-setup flights if the speed cap is respected.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
Arc the camera around the products as they pop in, showing each arrival from its best side. The circle can be tilted to get a
diagonal arc; Track To keeps the hero framed; the offset curve sets the feel (fast start, long gliding finish).

## STE_PROCEDURE
1. Plan transitions between shots first: know which shot comes next so this move hands over cleanly.
2. Add a new Camera; View › Cameras › Set Active Object as Camera.
3. Place the 3D cursor at the hero; add Curve › Circle.
4. On the camera add Follow Path (target = circle); zero the camera's Location (N panel) so it sits on the circle.
5. Add Track To (target = hero can) so the camera always points at it.
6. Rotate/scale the circle so the start matches the previous shot's view; key the circle's Location/Rotation/Scale (to adjust later).
7. Key Follow Path Offset at frame 0 and at the end (~frame 50), with a mid key ~frame 35.
8. Move keys closer so the camera starts fast and then slows ("slow-motion feel").
9. In the Graph Editor, flatten the end (make it more linear) if it stops too early — the move should keep drifting to the end.
10. Retime keys so speed peaks don't fight an object still popping in (author moved a key so the camera slows while the last can arrives).

## AGENT_EXECUTION
- Blender:
```python
import bpy
hero = bpy.data.objects["Can"]; cam = bpy.context.scene.camera   # ~ hero name
bpy.ops.curve.primitive_bezier_circle_add(radius=0.5, location=hero.location); circ = bpy.context.object
circ.rotation_euler = (0.35, 0.0, 0.6)                    # ~ tilt to match the start view
fp = cam.constraints.new('FOLLOW_PATH'); fp.target = circ; cam.location = (0, 0, 0)
tt = cam.constraints.new('TRACK_TO'); tt.target = hero; tt.track_axis = 'TRACK_NEGATIVE_Z'; tt.up_axis = 'UP_Y'
for f, v in ((0, 0.0), (35, -40.0), (50, -50.0)):          # offset values ~
    fp.offset = v; cam.keyframe_insert('constraints["Follow Path"].offset', frame=f)
```
- raea:
```tsx
const t = interpolate(f, [0, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.33, 0, 0.2, 1) });
const a = a0 + (a1 - a0) * t;                         // arc angle on a tilted circle around the hero
const p = [hx + r * Math.sin(a), hy + h + tilt * Math.sin(a), hz + r * Math.cos(a)];
<Camera3d transform={Transform.fromXyz(...p).lookingAt([hx, hy, hz])} projection={{ Perspective: { fov: 0.5 } }} />
```
  Check the angular speed: `(a1 - a0) * maxSlope / (frames / fps)` must stay under ~130°/s.

## NOTES
- Deprecated: none.
- Visual gaps: circle tilt, radius, offset values are visual.
- Rule conflicts: start with an eased-in start if the camera is already on screen (house rule: no linear starts); cap at
  ~130°/s. The author's "fast start" is acceptable only right after a cut.
- bpy fixed for 5.3: incomplete snippet: added `import bpy`, `hero`, `cam`.
