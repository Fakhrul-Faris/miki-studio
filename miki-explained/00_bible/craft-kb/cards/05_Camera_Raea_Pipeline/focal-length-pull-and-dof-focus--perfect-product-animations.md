---
title: Slow focal-length pull with product turn and shallow depth of field
bucket: 05_Camera_Raea_Pipeline
source: "How to Make Perfect Product Animations in Blender.txt"
source_time: "10:35–11:21, 16:06–17:13"
blender_version_source: 4.x (~4.4)
tool_target: Blender bpy
tier: full
style_fit: strong — macro close-up, shallow DoF, object turning slowly toward the lens
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.4 (source), 4.2+/5.x code | Blender bpy + raea

## CREATIVE_INTENT
A low-angle close-up on one detail (here the glass window) where the camera barely moves: the lens slowly widens (zoom out) while the product turns a few degrees toward camera, and depth of field keeps only the nearest part sharp. Gives a held setup life without a camera flight.

## STE_PROCEDURE
1. Delete existing keys on all objects (select all, select all keys in Timeline, delete).
2. Rotate the product 180° around Z so its face points at the camera.
3. Frame the detail from slightly below; align the camera to the view.
4. At frame 0, rotate the product slightly away; insert Location and Rotation keys.
5. At frame 70, rotate it a little more toward the camera; insert Location and Rotation keys.
6. At frame 0, raise Focal Length (tighter); insert a key on Focal Length.
7. At the last frame, lower Focal Length slightly; insert a key.
8. Enable Depth of Field on the camera; set Focus Distance to the product's nearest part.
9. Before you render a second shot, rename the output path so the first file is not overwritten.

## AGENT_EXECUTION
```python
import bpy, math
sc = bpy.context.scene; cam = sc.camera; prod = bpy.data.objects["Product"]
for ob in sc.objects:
    ob.animation_data_clear()
prod.rotation_euler.z += math.radians(180)
prod.rotation_euler.z += math.radians(-10)               # ~ start angle
prod.keyframe_insert("location", frame=0); prod.keyframe_insert("rotation_euler", frame=0)
prod.rotation_euler.z += math.radians(15)                # ~ turn toward camera
prod.keyframe_insert("location", frame=70); prod.keyframe_insert("rotation_euler", frame=70)
cam.data.lens = 160; cam.data.keyframe_insert("lens", frame=0)   # ~ values visual only
cam.data.lens = 140; cam.data.keyframe_insert("lens", frame=70)
cam.data.dof.use_dof = True
cam.data.dof.focus_object = prod                          # or focus_distance = metres to the front face
cam.data.dof.aperture_fstop = 2.0                         # ~ not given
sc.render.filepath = "//renders/shot02_"                  # step 9
```
raea (fov from focal length on the 36 mm long side, vertical frame: `fov = 2 * atan(18 / mm)`):
```tsx
const mm = interpolate(f, [0, 69], [160, 140], { easing: Easing.inOut(Easing.sine), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const turn = interpolate(f, [0, 69], [-0.17, 0.09], { easing: Easing.inOut(Easing.sine), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<Camera3d transform={Transform.fromXyz(0, 0.3, 3).lookingAt([0, 0.5, 0])} projection={{ Perspective: { fov: 2 * Math.atan(18 / mm) } }}>
  <DepthOfField focal_distance={2.9} aperture_f_stops={2.0} />
</Camera3d>
<Entity transform={Transform.IDENTITY.withRotation(Quat.fromEuler("XYZ", 0, turn, 0))}>{/* product */}</Entity>
```
`fov` and `focal_distance` both animate per frame in raea.

## NOTES
- Deprecated: none.
- Visual gaps: focal values for this shot and the rotation angles are visual only (shot 3 states 149 mm start and 223 mm, see slow-descent card).
- Rule conflicts: the source keys these Linear; house = eased in-out. A focal "zoom" is acceptable; avoid fast zooms (no crash zooms).
- Render-settings section of the video (Cycles 128 samples, denoise, FFmpeg MPEG-4 "Perceptually Lossless") is not carded: raea renders.
