---
title: Longer focal length (80 mm) to keep boxy objects undistorted
bucket: 05_Camera_Raea_Pipeline
source: "Fundamentals of Lighting in Blender.txt"
source_time: "31:27–32:49"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D macro product shots — a tele lens keeps the hero object's geometry honest; reserve wide lenses for deliberate intimate moments.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x | Blender bpy, raea

## CREATIVE_INTENT
Default 50 mm still bends a box's verticals; around 80 mm (camera pulled back to keep framing) the shape reads cleaner. Very long lenses start to look orthographic; very short ones are fisheye-like, used for stylised or intimate shots. 80 mm is the balance for a product.

## STE_PROCEDURE
1. Select the camera.
2. Set Focal Length to 80 mm.
3. Move the camera back along its view axis until the framing matches (G, then middle mouse to constrain).
4. Compare with the 50 mm render.
5. If the image starts to feel orthographic, reduce the focal length.

## AGENT_EXECUTION
Blender:
```python
import bpy
cam = bpy.context.scene.camera
f0, f1 = cam.data.lens, 80.0
cam.data.lens = f1
tgt = bpy.data.objects["Crate"].location
cam.location = tgt + (cam.location - tgt) * (f1 / f0)   # keep subject size (dolly back)
```
raea (`fov` is vertical, radians). For 9:16 with Blender sensor fit Auto (36 mm on the long, vertical side):
```tsx
// 80 mm: fov = 2·atan(18/80) ≈ 0.443 rad (25.4°); 50 mm ≈ 0.691 rad
<Camera3d transform={Transform.fromXyz(0, 0.9, 4.8).lookingAt([0, 0.3, 0])}
  projection={{ Perspective: { fov: 0.443 } }}>
  <DepthOfField focal_distance={4.8} aperture_f_stops={2.8} />
</Camera3d>
```
A longer lens also makes the DoF falloff stronger for the same framing, helping Style D's shallow focus.

## NOTES
- Deprecated: none.
- Visual gaps: dolly distance by eye.
- Rule conflicts: don't animate focal length as a crash zoom; any fov change is slow and eased.
