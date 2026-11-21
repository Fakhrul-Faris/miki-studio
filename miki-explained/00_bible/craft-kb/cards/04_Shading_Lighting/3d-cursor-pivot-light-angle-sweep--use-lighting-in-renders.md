---
title: Sweep the key light around the subject with the 3D cursor as pivot, judged in rendered camera view
bucket: 04_Shading_Lighting
source: "How To Use Lighting In Your Renders  Blender Tutorial.txt"
source_time: "02:01–03:33"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fast way to find the one key angle for a macro hero; in raea the sweep is a parameter on a lookingAt transform.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Blender bpy (pivot + rotate) → raea orbiting light transform

## CREATIVE_INTENT
Lighting is search, not formula: crank one light too bright, then swing it round the subject and watch the camera view until an angle "works". Rotating around the 3D cursor makes trying angles instant.

## STE_PROCEDURE
1. Open a viewport in Camera view with Rendered shading.
2. Add one light (the video ends on a Spot); set its power very high (~ "something crazy").
3. Place the 3D cursor at the middle of the image subject (Shift+S › Cursor to Selected, or Shift+Right-click).
4. Set Transform Pivot Point = 3D Cursor.
5. Rotate the light (R) around the cursor; try many angles and heights.
6. Keep the angle that reads best, then lower the power to taste.

## AGENT_EXECUTION
```python
import bpy, math, mathutils
sc = bpy.context.scene
sc.tool_settings.transform_pivot_point = "CURSOR"
sc.cursor.location = bpy.data.objects["Hero"].location
key = bpy.data.objects["Key"]
c = sc.cursor.location
for i, a in enumerate(range(0, 360, 45)):          # audit sweep, one still per angle
    r = (key.location - c).length
    key.location = c + mathutils.Vector((r * math.cos(math.radians(a)), r * math.sin(math.radians(a)), key.location.z - c.z))
    key.rotation_euler = (c - key.location).to_track_quat("-Z", "Y").to_euler()
    sc.render.filepath = f"//_audit/key_{a:03d}.png"; bpy.ops.render.render(write_still=True)
```
raea (sweep on stills, then freeze the chosen angle):
```tsx
const a = KEY_ANGLE;   // radians, picked from the audit stills
<SpotLight transform={Transform.fromXyz(c[0] + r * Math.cos(a), h, c[2] + r * Math.sin(a)).lookingAt(c)}
  intensity={2700000} outer_angle={0.45} inner_angle={0.225} shadow_maps_enabled />
```

## NOTES
- Deprecated: none.
- Visual gaps: final angle/power visual only.
- Rule conflicts: if the light moves during a shot, ease in-out and keep it slow (no light whips).

