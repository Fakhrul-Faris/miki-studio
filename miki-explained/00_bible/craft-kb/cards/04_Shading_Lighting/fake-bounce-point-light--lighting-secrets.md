---
title: Fake bounce light (large soft point light where bounce already exists)
bucket: 04_Shading_Lighting
source: "5 Lighting SECRETS in Blender.txt"
source_time: "17:28–22:14"
blender_version_source: 3.x/4.x
tool_target: raea
tier: full
style_fit: Lifts crushed shadow detail under the hero object without moving the single top key; essential in raea where there is no path-traced bounce.
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x (Cycles) | Blender bpy + raea

## CREATIVE_INTENT
Use when you like the key but one area falls into an over-dark shadow: add a big, dim, colour-matched light exactly where real
bounce would come from (a brightly lit floor patch) to bring out detail. It looks fake only when it has no plausible source.

## STE_PROCEDURE
1. Keep the main key as is.
2. Find a surface that already receives lots of key light (e.g. the floor patch under a spot).
3. Alternative first: brighten that surface's albedo — it bounces more by itself.
4. Otherwise add a Point light in that bounce area.
5. Set its Radius large so it is soft, like the bouncing surface.
6. Colour-match it to the light hitting that surface (e.g. slight blue-green), low saturation.
7. Set Power low (~100 W; 1000 W was too bright).
8. Never place it where no lit surface exists to justify it.
9. Before you render with volumetrics, uncheck the light's Ray Visibility → Volume Scatter.
10. If the light shows in reflections, uncheck Multiple Importance.

## AGENT_EXECUTION
### Blender (Cycles)
```python
import bpy
bpy.ops.object.light_add(type='POINT', location=(0.5, -0.3, 0.4))   # in the bounce zone
b = bpy.context.object
b.data.energy = 100; b.data.shadow_soft_size = 1.0  # ~ large radius
b.data.color = (0.85, 0.95, 1.0)                     # ~ desaturated blue-green
b.visible_volume_scatter = False                     # Object > Visibility > Ray Visibility
b.data.cycles.use_multiple_importance_sampling = False  # 3.x path; verify attribute name in 4.x/5.x
```

### raea
```tsx
<PointLight transform={Transform.fromXyz(0.5, 0.05, 0.4)} color="#dceeff" intensity={60000} range={3} radius={1} />
```
- Place it just above the lit patch, never inside a mesh (its light never leaves).
- Leave `shadow_maps_enabled` off (bounce has no crisp shadow; point shadows cost six maps).
- Don't mark it `volumetric`, so it adds no glow to `<FogVolume>`s.
- `intensity` is lumens: 900,000 lights a surface 3 m away like daylight; a subtle fill at ~0.5 m is tens of thousands (~). Judge on a still.
- Alternative: an `<AmbientLight>` / `<Environment>` lifts everything; this card is for one local area.

## NOTES
- Deprecated: none.
- Visual gaps: exact radius value visual only.
- Rule conflicts: none.
