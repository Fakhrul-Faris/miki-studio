---
title: Even model lighting — a point lamp raised high instead of a sun
bucket: 04_Shading_Lighting
source: "Fundamentals of Lighting in Blender.txt"
source_time: "16:17–18:11"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits — when the whole object is the subject (no single detail), a high top light gives Style D's even "proper model render" look without a sun's flatness.
---

## METADATA
04_Shading_Lighting | 4.x | Blender bpy, raea

## CREATIVE_INTENT
When every part of the object has equal priority, you want little falloff across it. A sun has zero falloff but tends to look flat; a point lamp moved far up keeps the same direction while the object's depth becomes small relative to the distance, so falloff across it is minimal yet the light still feels local.

## STE_PROCEDURE
1. Keep the key lamp's direction to the subject unchanged.
2. Move the lamp along that direction until it is several object-heights away.
3. Raise Power to restore the brightness lost to distance (×4 per doubling).
4. Compare renders before and after; the near and far faces should now match closely.

## AGENT_EXECUTION
Blender:
```python
import bpy
from mathutils import Vector
L = bpy.data.objects["Key"]; target = Vector((0, 0, 0.3))
d = (L.location - target); k = 3.0                 # ~ move 3× farther along the same ray
L.location = target + d * k
L.data.energy *= k * k                             # inverse-square compensation
```
raea:
```tsx
<SpotLight transform={Transform.fromXyz(0, 6, 1.5).lookingAt([0, 0.3, 0])} intensity={3600000}
  outer_angle={0.35} inner_angle={0.17} soft_shadows_enabled shadow_maps_enabled radius={0.6} />
// lights.md: a bulb 6 m away needs ~3,600,000 lm for the brightness 900,000 gives at 3 m.
```

## NOTES
- Deprecated: none.
- Visual gaps: final height/power not stated.
- Rule conflicts: none.
