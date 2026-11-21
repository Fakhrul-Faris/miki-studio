---
title: Camera-parented backdrop plane with an area-light gradient
bucket: 04_Shading_Lighting
source: "How to Make Perfect Product Animations in Blender.txt"
source_time: "06:59–09:07, 11:07–11:33"
blender_version_source: 4.x (~4.4)
tool_target: Blender bpy
tier: full
style_fit: good — a soft accent glow behind a dark product; must stay subtle so the "real surface, dark room" look holds
---

## METADATA
04_Shading_Lighting | Blender 4.4 (source), 4.2+/5.x code | Blender bpy + raea

## CREATIVE_INTENT
A plane parented to the camera is always behind the product, whatever the camera does; an area light just in front of it paints a soft gradient glow. When you re-aim the camera for the next setup, the backdrop and its glow come along — no re-lighting per shot.

## STE_PROCEDURE
1. Add a Plane at the product centre with Align = View, so it faces the camera.
2. Move the plane along its local Z into the background; scale it until it fills the frame.
3. Select the plane, then the camera (active); Parent → Object (Keep Transform).
4. Snap the 3D cursor to the plane (Cursor to Selected).
5. Add an Area light at the cursor with Align = View; it now faces away from the camera, toward the plane.
6. Move the light along its local Z slightly toward the camera; the gap sets the gradient's spread.
7. Set light Shape to Disk (or Ellipse), stretch it long, colour it the accent.
8. Parent the light to the backdrop plane so it follows the camera too.
9. To animate the glow, key Location, Rotation, Scale at frame 1 (low, near the lit edges) and frame 70 (raised, thinner in X, longer in Z).

## AGENT_EXECUTION
```python
import bpy
from mathutils import Vector, Matrix
cam = bpy.context.scene.camera
def keep_parent(child, parent):
    child.parent = parent
    child.matrix_parent_inverse = parent.matrix_world.inverted()
fwd = cam.matrix_world.to_3x3() @ Vector((0, 0, -1))
bpy.ops.mesh.primitive_plane_add(size=1, location=cam.location + fwd * 8.0)   # ~ distance
bg = bpy.context.object
bg.rotation_euler = cam.rotation_euler.copy()      # face the camera
bg.scale = (6, 6, 1)                               # ~ fill frame
keep_parent(bg, cam)
bpy.ops.object.light_add(type='AREA', location=bg.location - fwd * 0.4)  # ~ just in front
gl = bpy.context.object
gl.rotation_euler = cam.rotation_euler.copy()      # emits along -Z = away from camera, onto the plane
gl.data.shape = 'ELLIPSE'; gl.data.size, gl.data.size_y = 0.8, 2.5
gl.data.color = (0.2, 0.45, 1.0); gl.data.energy = 200   # ~
keep_parent(gl, bg)
```
raea: the backdrop is page, not mesh. Put a CSS radial gradient under a layered Canvas3D (as `kit/BlendShot.tsx` does with its sky): it is camera-locked by construction.
```tsx
<div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 35% 55% at 50% ${70 - 30 * t}%, #1d3f8f 0%, #06070a 70%)` }}>
  <Canvas3D layered>{/* camera, lights, product */}</Canvas3D>
</div>
```
Animate the ellipse centre/size from the frame to mirror step 9. Alternative inside 3D: a large `Mesh3d` Cuboid backdrop whose transform is computed from the camera's each frame, `StandardMaterial base_color="#06070a" perceptual_roughness={1}`, lit by a `RectLight` in front of it.

## NOTES
- Deprecated: none.
- Visual gaps: plane distance, light size and power are on screen only.
- Rule conflicts: none. Keep the glow dim and low-saturation so it doesn't fight the one accent on the subject.
- raea caveat: `<Bloom>` with `layered` lightens the page under bright parts (scene.md) — check the gradient doesn't haze.

## ADDENDUM — Three Point Lighting Tutorial | Blender Product Rendering Series
Source: "Studio Lighting, Silhouettes & Color Theory/Three Point Lighting Tutorial | Blender Product Rendering Series.txt" — 00:23–00:36, 01:10–01:18.

| parameter | three-point-product-series |
|---|---|
| gradient source | Spot light aimed at a backdrop plane behind the subject (instead of an area light in front of it) |
| gradient softness | Spot Blend amount sets the gradient's falloff ("a nice gradient behind our subject") |
| seamless trick | depth of field blurs the plane's edges so the backdrop reads as a seamless gradient |
| role | separates the background from the subject (replaces the classic rim's job) |

Extra steps: put a plane behind the subject; aim a Spot at it; raise Blend until the pool becomes a soft gradient;
add DoF (focus on the hero) so the backdrop edge and pool blur into one gradient.

raea: `<SpotLight outer_angle≈0.5 inner_angle≈0.05 ... lookingAt(backdrop)>` (small inner = large Blend) on a dark
backdrop Cuboid; DoF via the camera's aperture (kit ProStage `aperture`). Values `~`. Keep the pool neutral or a dim
accent tint only if the accent isn't used elsewhere in the frame.
