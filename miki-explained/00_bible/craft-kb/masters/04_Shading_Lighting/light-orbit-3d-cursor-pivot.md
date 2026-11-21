---
title: Orbit/sweep lights around the subject with a 3D-cursor pivot
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/3d-cursor-orbit-duplicate-lights--realistic-product-lighting.md
  - cards/04_Shading_Lighting/3d-cursor-pivot-light-angle-sweep--use-lighting-in-renders.md
sources: ["Realistic Product Lighting In Blender.txt", "How To Use Lighting In Your Renders  Blender Tutorial.txt"]
use_when: "finding the key angle on the hero object fast"
style_fit: Fast way to find the one key angle on a macro hero and to build symmetric rigs; in raea the orbit is an angle in a polar `lookingAt` transform. If a light moves during a shot, ease in-out and keep it slow (no light whips).
---

## METADATA
04_Shading_Lighting | 3.x–4.x (source) → bpy 5.x + raea | Blender bpy (pivot + rotate) → raea polar light transform

## CREATIVE_INTENT
Lighting is search, not formula: put the pivot at the subject's centre so every light swings around it, then try angles in the camera view until one reads. The same pivot makes symmetric rigs instant — an opposite-side copy is one 180° turn.
- use-lighting-in-renders: crank one light far too bright, sweep it round in rendered camera view, keep the angle that works, then lower power.
- realistic-product-lighting: duplicate lights and rotate copies round the product (R R trackball, R Z 180 for the opposite side).

## STE_PROCEDURE
1. Open a viewport in Camera view with Rendered shading.
2. Place the 3D cursor at the subject's centre (Shift+S › Cursor to Active / Cursor to Selected, or Shift+Right-click).
3. Set Transform Pivot Point = 3D Cursor.
4. Add one light (Spot in the source); set its power very high (~ "something crazy") so angle changes read.
5. Rotate the light (R, R R trackball, or R Z) around the cursor; try many angles and heights.
6. Keep the angle that reads best, then lower the power to taste.
7. For a mirrored partner, duplicate the light (Shift+D) and type R Z 180.

## VALUES BY SOURCE
| parameter | realistic-product-lighting | use-lighting-in-renders | recommended for Style D (+ why) |
|---|---|---|---|
| pivot | 3D cursor at product centre | 3D cursor at subject middle | hero's centre (or the detail the line is about) |
| rotation | R R / R Z, R Z 180 for opposite | R free, many angles + heights | sweep 0–360° in 45° steps as audit stills, then refine |
| starting power | — | "something crazy" (very high) | high for the sweep, then back to the key's value |
| raea light | any (polar `at(a, r, h)`) | SpotLight 2,700,000 lm, outer 0.45 / inner 0.225 | SpotLight top-ish key, inner = half outer |

## AGENT_EXECUTION
Blender (5.x):
```python
import bpy, math, mathutils
sc = bpy.context.scene
c = bpy.data.objects["Hero"].matrix_world.translation.copy()
sc.cursor.location = c
sc.tool_settings.transform_pivot_point = "CURSOR"

# A) audit sweep, one still per angle
key = bpy.data.objects["Key"]
r = (key.location.xy - c.xy).length; h = key.location.z
for a in range(0, 360, 45):
    key.location = c + mathutils.Vector((r * math.cos(math.radians(a)), r * math.sin(math.radians(a)), h - c.z))
    key.rotation_euler = (c - key.location).to_track_quat("-Z", "Y").to_euler()
    sc.render.filepath = f"//_audit/key_{a:03d}.png"; bpy.ops.render.render(write_still=True)

# B) opposite-side duplicate (R Z 180 about the cursor)
src = bpy.data.objects["Sharp"]; d = src.copy(); d.data = src.data.copy(); sc.collection.objects.link(d)
R = mathutils.Matrix.Rotation(math.radians(180), 4, "Z")
d.matrix_world = mathutils.Matrix.Translation(c) @ R @ mathutils.Matrix.Translation(-c) @ src.matrix_world
```
raea (sweep on stills, then freeze the chosen angle):
```tsx
const c: [number, number, number] = [0, 0.3, 0];      // hero centre
const at = (a: number, r: number, h: number) =>
  Transform.fromXyz(c[0] + r * Math.cos(a), h, c[2] + r * Math.sin(a)).lookingAt(c);
const KEY_ANGLE = 1.1;   // radians, picked from the audit stills
<SpotLight transform={at(KEY_ANGLE, 1.5, 3)} intensity={2700000} outer_angle={0.45} inner_angle={0.225} shadow_maps_enabled />
<SpotLight transform={at(KEY_ANGLE + Math.PI, 1.5, 3)} intensity={900000} outer_angle={0.45} inner_angle={0.225} />  {/* mirrored partner */}
```

## NOTES
- Deprecated: "Cursor to Active" naming in Shift+S menu (4.x); otherwise none.
- Visual gaps: final angle and power are visual only.
- Rule conflicts: none for look-dev; an animated orbit in the film must be slow and eased in-out (no light whips).
