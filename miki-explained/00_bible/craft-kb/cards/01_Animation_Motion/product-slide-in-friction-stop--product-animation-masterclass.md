---
title: Product slide-in with friction stop and edge rock
bucket: 01_Animation_Motion
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "54:20–59:18"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: A clean hero entrance on a real surface; enters from off-frame so the fast start is hidden — matches "slide in ~0.4 s, never pop".
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
The hero product enters by sliding across the table: fast at first, decelerating by friction, rocking forward onto its base
edge at the stop and settling upright. It reads as physical weight without any bounce, and leaves the logo facing camera.

## STE_PROCEDURE
1. At frame 35 (24 fps), key the final pose with the logo facing camera (`I` → Location, Rotation & Scale).
2. Before you key the tilt, set the 3D cursor on the bottom leading edge and Pivot Point to 3D Cursor (see edge-pivot card).
3. Key the rocked pose (rotated about X on that edge) as the impact moment.
4. At frame 0, set Pivot back to Median Point, move the object off-frame along Y, rotate it so the logo already shows (`Alt+R` to clear, then turn), and key Location, Rotation & Scale.
5. Check it never clips through the plane at any frame.
6. In the Graph Editor, isolate Y Location; set handles to Free; steepen the exit of key 0 and lengthen the left handle of the last key so it comes to rest slowly.
7. Isolate X Rotation; Free handles; make the rock fast and the return slow, finishing exactly when the slide stops.
8. Enable motion blur at render to sell the speed.

## AGENT_EXECUTION
- Blender:
```python
import bpy
from bpy_extras import anim_utils
ob = bpy.context.object; scn = bpy.context.scene; scn.render.fps = 24
ob.location.y = 0; ob.keyframe_insert("location", frame=35); ob.keyframe_insert("rotation_euler", frame=35)
ob.location.y = -0.6                                   # ~ off-frame start (value not stated)
ob.keyframe_insert("location", frame=0); ob.keyframe_insert("rotation_euler", frame=0)
ad = ob.animation_data
for fc in anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves:
    for k in fc.keyframe_points:
        k.handle_left_type = k.handle_right_type = 'FREE'
scn.render.use_motion_blur = True
```
  Then shape handles as in the free-handle easing card.
- raea:
```tsx
const y = interpolate(f, [0, 35/24*fps], [-0.6, 0], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<Entity transform={Transform.fromXyz(0, 0, y)}> <Model src={staticFile("can.glb")} /> </Entity>
<MotionBlur shutterAngle={0.5} samples={4} />
```

## NOTES
- Deprecated: none.
- Visual gaps: start distance and rock angle are visual only (`~`).
- Rule conflicts: none if the start is off-frame. If the object starts on screen, ease the start too (in-out).
- bpy fixed for 5.3: action.fcurves → bpy_extras.anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves (slotted actions).
