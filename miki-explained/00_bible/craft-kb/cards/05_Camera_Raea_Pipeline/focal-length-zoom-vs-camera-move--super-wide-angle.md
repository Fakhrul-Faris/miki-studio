---
title: Focal length (zoom) vs moving the camera
bucket: 05_Camera_Raea_Pipeline
source: "How To Get Super Wide Angle Shots in Blender.txt"
source_time: "01:23–02:32"
blender_version_source: 3.x/4.x
tool_target: Blender bpy | raea
tier: principle
style_fit: core to Style D camera flights — choose push-in (camera move) vs zoom (FOV change) deliberately; both must be eased
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x–4.x | Blender bpy → raea Camera3d fov / transform

## CREATIVE_INTENT
Principle: millimetres are just the amount of zoom (default 50 mm; a phone main camera ≈ 24 mm equivalent; 20 mm is fairly
wide). Zooming in/out keeps the perspective; walking the camera closer/farther changes it, so the two read differently.
Idea: use a camera move when you want depth/parallax, a focal change when you want flat reframing.

## STE_PROCEDURE
1. Open the camera's Object Data Properties.
2. Read Focal Length: 50 mm is Blender's default; ~24 mm ≈ phone main camera; 20 mm is wide.
3. To reframe without changing perspective, change Focal Length only.
4. To change perspective (parallax, foreground growth), move the camera's Location instead.
5. Before choosing, render both versions and compare how foreground and background relate.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
cam_obj = bpy.context.scene.camera
cam_obj.data.lens_unit = 'MILLIMETERS'
cam_obj.data.lens = 20.0          # wide; 24 ≈ phone; 50 = default
# a move instead of a zoom:
cam_obj.location.y -= 1.0         # walk closer (perspective changes)
```
### raea
- raea's `fov` is the **vertical** FOV in radians. For our 9:16 frame with Blender's default 36 mm sensor (Sensor Fit
  Auto → fits the taller side), vertical FOV = `2 * atan(18 / mm)`: 20 mm ≈ 84°, 24 mm ≈ 74°, 50 mm ≈ 40°.
```tsx
const fovFromMm = (mm: number) => 2 * Math.atan(18 / mm);   // 9:16, 36 mm sensor, Auto fit
const e = interpolate(f, [0, 45], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
// zoom: perspective unchanged
<Camera3d transform={Transform.fromXyz(0, 0.3, 2).lookingAt([0, 0.1, 0])} projection={{ Perspective: { fov: interpolate(e, [0, 1], [fovFromMm(35), fovFromMm(70)]) } }} />
// push-in: perspective changes
<Camera3d transform={Transform.fromXyz(0, 0.3, interpolate(e, [0, 1], [2, 1])).lookingAt([0, 0.1, 0])} projection={{ Perspective: { fov: fovFromMm(35) } }} />
```
- BlendShot exports `fov` per frame from Blender, so a Blender focal-length animation carries over.

## NOTES
- Visual gaps: none of substance.
- Rule conflicts: no crash zooms — any FOV change is eased in-out and slow; keep camera speed under ~40 m/s and rotation
  under ~130°/s.
