---
title: Slow drift, then a quick connect — contact beat with camera pull-back
bucket: 01_Animation_Motion
source: "How to Make Perfect Product Animations in Blender.txt"
source_time: "23:19–25:19"
blender_version_source: 4.x (~4.4)
tool_target: Blender bpy
tier: full
style_fit: partial — the drift-then-snap rhythm suits a "click" beat on a word; conflict: the camera's sudden jump back is a snap move
---

## METADATA
01_Animation_Motion | Blender 4.4 (source), 4.2+/5.x code | Blender bpy + raea

## CREATIVE_INTENT
The product floats down slowly (anticipation), then quickly seats into its dock; that contact frame triggers a consequence (the ripple). Meanwhile the lens slowly widens, then the camera pulls back to show product and dock together. Use as a closing "it all clicks" beat.

## STE_PROCEDURE
1. At frame 1, place the product above the dock; insert Location and Rotation keys.
2. At ~frame 30, lower it partway; insert keys (Linear in source).
3. At the contact frame (59), seat it on the dock; insert Location and Rotation keys.
4. Start the ripple's Wave Time Offset at the contact frame (59).
5. Camera: at frame 1 zoom in on the product and rotate to see product and dock; key Location, Rotation, Scale and Focal Length.
6. Until the descent speeds up (frame 51), lower Focal Length slightly (to 223 mm); key it, Linear.
7. After that, pull the camera back and rotate it to frame the whole object; key it.
8. At the end, lower Focal Length a little more; key it so the zoom-out continues.

## AGENT_EXECUTION
```python
import bpy
sc = bpy.context.scene; cam = sc.camera; p = bpy.data.objects["Product"]
dock_z = 0.0; CONTACT = 59
p.location.z = dock_z + 0.6                               # ~ start height
for d in ("location", "rotation_euler"): p.keyframe_insert(d, frame=1)
p.location.z = dock_z + 0.35                               # ~ slow drift portion
for d in ("location", "rotation_euler"): p.keyframe_insert(d, frame=30)
p.location.z = dock_z
for d in ("location", "rotation_euler"): p.keyframe_insert(d, frame=CONTACT)
bpy.data.objects["Water"].modifiers["Wave"].time_offset = CONTACT
cam.data.lens = 240; cam.data.keyframe_insert("lens", frame=1)    # ~ start not given; source starts "zoomed in"
for d in ("location", "rotation_euler", "scale"): cam.keyframe_insert(d, frame=1)
cam.data.lens = 223; cam.data.keyframe_insert("lens", frame=51)
for d in ("location", "rotation_euler", "scale"): cam.keyframe_insert(d, frame=51)
cam.location.y -= 0.5                                       # ~ pull back
for d in ("location", "rotation_euler", "scale"): cam.keyframe_insert(d, frame=CONTACT + 6)
cam.data.lens = 200; cam.data.keyframe_insert("lens", frame=sc.frame_end)   # ~
```
raea (house: the descent eases into contact; the pull-back eases in-out over ≥ 0.6 s, not a jump):
```tsx
const y = interpolate(f, [0, 30, 59], [0.6, 0.35, 0], { easing: Easing.in(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const back = interpolate(f, [51, 75], [0, 0.5], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const mm = interpolate(f, [0, 51, 89], [240, 223, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<Camera3d transform={Transform.fromXyz(0, 0.4, 3 + back).lookingAt([0, 0.3, 0])} projection={{ Perspective: { fov: 2 * Math.atan(18 / mm) } }} />
<Entity transform={Transform.fromXyz(0, y, 0)}>{/* product */}</Entity>
```

## NOTES
- Deprecated: none.
- Visual gaps: heights, start focal length and the pull-back distance are on screen only.
- Rule conflicts: "the camera suddenly jump backwards" = snap-back push, prohibited. Keep the drift→seat speed change on the object (it reads as physics), and make the camera pull-back a smooth eased move. No bounce on contact.
