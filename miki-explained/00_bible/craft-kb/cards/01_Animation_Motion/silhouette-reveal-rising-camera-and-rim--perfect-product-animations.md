---
title: Silhouette reveal — camera and rim light rise together behind the product
bucket: 01_Animation_Motion
source: "How to Make Perfect Product Animations in Blender.txt"
source_time: "01:08–09:07"
blender_version_source: 4.x (states "4.43", i.e. ~4.4)
tool_target: Blender bpy
tier: full
style_fit: strong — opening teaser on one hero object in a dark room, accent-coloured rim; conflict: video uses linear keys, our rule needs eased in-out camera curves
---

## METADATA
01_Animation_Motion | Blender 4.4 (source), 4.2+/5.x code | Blender bpy + raea

## CREATIVE_INTENT
Open a beat on the object's outline only: the camera looks at the product from behind on a long lens and rises slowly while a rim light rises with it, so the edge glow "draws" the silhouette from bottom to top. Use it as the first setup of a scene to tease the hero object before the line names it.

## STE_PROCEDURE
1. Place the camera behind the product, facing it (Front view, then align camera to view).
2. Move the camera down so it starts near the base of the product.
3. Set camera Focal Length to 122 mm.
4. Set frame rate to 30 fps; set Frame Start 1, Frame End 70 (2 s plus 10 frames of slack).
5. Before you add keys, decide the shot duration; the move spans the whole shot.
6. Insert a Location keyframe on the camera at frame 1.
7. At frame 70, move the camera up along global Z; insert a Location keyframe.
8. Add an Area light at the product centre (3D cursor); rotate X by -90° so it faces the camera.
9. Move the light along its local Z (G Z Z) until it sits behind the product and lights only the side edges.
10. Set light Shape to Disk; scale it up for softer edges; colour it to match the product (blue product → blue light).
11. Insert Location, Rotation, Scale keys on the light at frame 1 with the light low.
12. At frame 70, raise the light and scale it up so it rims the whole visible object; insert Location, Rotation, Scale keys.
13. Set both objects' key interpolation (source: Linear; house: eased in-out, see NOTES).

## AGENT_EXECUTION
```python
import bpy, math
from mathutils import Vector
sc = bpy.context.scene
sc.render.fps = 30; sc.frame_start, sc.frame_end = 1, 70
prod = bpy.data.objects["Product"]                 # hero object
c = prod.matrix_world.translation
cam = sc.camera
cam.data.lens = 122
# behind the product, looking at it (source: front view = behind the toothbrush)
cam.location = c + Vector((0, 4.0, -0.4))          # ~ distance/height: visual only
cam.rotation_euler = (math.radians(90), 0, math.radians(180))
cam.keyframe_insert("location", frame=1)
cam.location.z += 0.8                              # ~ rise: visual only
cam.keyframe_insert("location", frame=70)

bpy.ops.object.light_add(type='AREA', location=c)
rim = bpy.context.object
rim.rotation_euler.x = math.radians(-90)
rim.location += rim.matrix_world.to_3x3() @ Vector((0, 0, -0.6))   # ~ push behind along local Z
rim.data.shape = 'DISK'; rim.data.size = 1.0; rim.data.energy = 300  # ~ power not given
rim.data.color = (0.2, 0.45, 1.0)                  # product/accent colour
rim.location.z -= 0.5                              # start low
for p in ("location", "rotation_euler", "scale"): rim.keyframe_insert(p, frame=1)
rim.location.z += 1.0; rim.scale = (1.6, 1.6, 1.6) # ~
for p in ("location", "rotation_euler", "scale"): rim.keyframe_insert(p, frame=70)
```
Interpolation without touching F-curves: set `bpy.context.preferences.edit.keyframe_new_interpolation_type` ('LINEAR' source / 'BEZIER' house) **before** inserting keys.

raea (render-time; lens 122 mm on the 36 mm sensor's long side of a 9:16 frame ≈ 16.8° vertical fov):
```tsx
const t = interpolate(f, [0, 69], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<Camera3d transform={Transform.fromXyz(0, 0.2 + 0.8 * t, -4).lookingAt([0, 0.6 + 0.6 * t, 0])}
  projection={{ Perspective: { fov: (16.8 * Math.PI) / 180 } }} />
<RectLight transform={Transform.fromXyz(0, 0.1 + 1.0 * t, 0.6).lookingAt([0, 0.6 + 0.6 * t, -4])}
  intensity={400000} width={0.6 + 0.4 * t} height={0.6 + 0.4 * t} color="#3a73ff" />
```
`RectLight` is the closest to an area light (rectangle only; no disk shape; no shadows). Bloom (`<Bloom intensity={0.6} threshold={0.9} />`) helps the rim read on glossy parts.

## NOTES
- Deprecated: none. Light `shape='DISK'` is current.
- Visual gaps: exact camera distance, rise height and light power are shown only on screen; values above marked `~`.
- Rule conflicts: the source switches camera and light keys to Linear for constant speed. House rule: eased in-out (no linear starts/stops). Keep the constant-speed feel only if the shot is cut on a word mid-move so neither end is seen; otherwise ease.
- raea has no disk-shaped area light; RectLight is square/rectangular. Its edge falloff is softer than a disk's taper ("thinner at the top, thicker at the bottom") — not reproducible exactly.
