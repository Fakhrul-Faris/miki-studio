---
title: Backlit disk rim light in the accent colour
bucket: 04_Shading_Lighting
source: "How to Make Perfect Product Animations in Blender.txt"
source_time: "04:21–05:57, 11:33–11:53, 21:40–21:55"
blender_version_source: 4.x (~4.4)
tool_target: Blender bpy
tier: full
style_fit: strong — edge separation in a dark room; the light's colour is the one saturated accent
---

## METADATA
04_Shading_Lighting | Blender 4.4 (source), 4.2+/5.x code | Blender bpy + raea

## CREATIVE_INTENT
A big soft light directly behind the object, facing the camera, lights only its side edges so the silhouette separates from a black background. The source calls lit edges "one of the most important things"; colour the rim with the product's (our accent) colour.

## STE_PROCEDURE
1. Snap the 3D cursor to the product centre.
2. Add an Area light at the cursor.
3. Rotate the light so its emitting side faces the camera (source: X -90°).
4. Move it along its local Z axis until it sits behind the product.
5. Set Shape to Disk (round; tapers thinner at the top, thicker at the bottom of the rim).
6. Scale the light up; a larger light gives softer edges.
7. Place it near the bottom of the product; raise Power until both side edges glow.
8. Set Color to the product/accent colour; raise saturation if the rim reads white.
9. Before you rotate the product or move the camera, re-check that both edges are still lit; adjust the light's location.

## AGENT_EXECUTION
```python
import bpy, math
from mathutils import Vector
prod = bpy.data.objects["Product"]; cam = bpy.context.scene.camera
c = prod.matrix_world.translation
bpy.ops.object.light_add(type='AREA', location=c)
rim = bpy.context.object
# face the camera: point the light's -Z at the camera, then push it away from the camera
d = (cam.location - c).normalized()
rim.rotation_euler = (-d).to_track_quat('Z', 'Y').to_euler()   # light's +Z points away from camera → emits toward it
rim.location = c - d * 0.6                                       # ~ behind the product
rim.data.shape = 'DISK'; rim.data.size = 1.2                     # ~
rim.data.energy = 300                                            # ~ power not given
rim.data.color = (0.25, 0.5, 1.0)                                # accent
```
raea:
```tsx
// behind the product, aimed back at the camera; RectLight has no shadows, so it never darkens the product's front
<RectLight transform={Transform.fromXyz(0, 0.3, -0.6).lookingAt([0, 0.6, 4])} intensity={350000} width={1.2} height={1.2} color="#3a73ff" />
```
Alternative with a shadow-free cone: `<SpotLight transform={...lookingAt(camPos)} intensity outer_angle={0.6} inner_angle={0.3} color />`. Add `<Bloom intensity={0.5} threshold={0.9} />` if the rim should glow on glass.

## NOTES
- Deprecated: none.
- Visual gaps: power values and exact distance are on screen only (`~`).
- Rule conflicts: none. Keep the rim the only saturated colour in frame; the top key stays neutral (Style D: one soft top light).
- raea's RectLight is a rectangle; there is no disk shape.
