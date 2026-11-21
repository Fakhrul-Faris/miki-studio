---
title: Golden-hour sun lamp: low angle, orange-yellow, side-lit
bucket: 04_Shading_Lighting
source: "How to get good lighting in blender.srt"
source_time: "00:08:41–00:10:12; 00:13:19–00:14:23"
blender_version_source: 3.x (inferred)
tool_target: Blender bpy | raea
tier: full
style_fit: Fits street/exterior beats in A/D; warm low key is neutral enough to keep the brand accent the only saturated hue.
---

## METADATA
04_Shading_Lighting | 3.x (inferred) | Blender bpy, raea

## CREATIVE_INTENT
Sunrise/sunset reads from a sun low to the horizon, warm orange-yellow, with long shadows. Keep it to one side of the camera, not behind it. The result is very contrasty, so pair it with a little volume and a sky backdrop rather than extra fill lamps.

## STE_PROCEDURE
1. Remove all lights first.
2. Add a Sun lamp (an HDRI, Sky Texture or Spot also work; a Spot looks fake easily).
3. Raise the Sun Strength (video: 10).
4. Rotate the Sun to a low, near-horizon angle instead of ~45°.
5. Keep the Sun off to one side of the camera axis.
6. Set Color to orange shifted slightly toward yellow.
7. If contrast is too high, add a low volume scatter box (see card).
8. Add a sky backdrop so the background is not empty (see card).

## AGENT_EXECUTION
Blender:
```python
import bpy, math
bpy.ops.object.light_add(type='SUN'); s = bpy.context.object
s.data.energy = 10                                              # video value
s.rotation_euler = (math.radians(80), 0, math.radians(-60))    # ~ low elevation (~10° above horizon), side
s.data.color = (1.0, 0.62, 0.30)                                # ~ orange-yellow
```
raea:
```tsx
<DirectionalLight color="#ffb060" transform={Transform.fromXyz(-10, 2, 3).lookingAt([0, 0, 0])}  // ~ low, side
  illuminance={10000} shadow_maps_enabled soft_shadow_size={0.5} />
<AmbientLight brightness={60} color="#7d8fb3" />   {/* ~ cool sky fill */}
// or a sky + sunset drawn by the sun itself: <Atmosphere light /> with a low sun (lights.md)
```

## NOTES
- Deprecated: none.
- Visual gaps: exact angle/colour shown, not stated (`~`).
- Rule conflicts: none.
