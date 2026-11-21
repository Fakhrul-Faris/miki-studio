---
title: Let a point light carry an emissive source's lighting
bucket: 04_Shading_Lighting
source: "How to Make Beautiful Fire in Blender.txt"
source_time: "07:51–09:30"
blender_version_source: 3.x/4.x
tool_target: raea
tier: principle
style_fit: Directly applies — in raea emissive surfaces don't light neighbours at all, so every glowing hero part (screen, LED, flame) needs a matching light.
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x (Cycles) | raea

## CREATIVE_INTENT
Principle: an emissive card (fire, screen) as the only light source is noisy and flickers too much; turn it down to "visible" and
let a hidden light of the same size and colour do most of the lighting. Idea: keep a little flicker for realism, but control it.

## STE_PROCEDURE
Method:
1. Lower the emissive's strength until it is just visible.
2. Add a Point light at the emitter.
3. Set its Radius to roughly the emitter's size.
4. Colour it to match (orange for fire).
5. Raise Power until the scene is lit enough to read.
6. If the light shows as a sphere in water/glossy reflections, uncheck Multiple Importance.

## AGENT_EXECUTION
### Blender (Cycles)
```python
import bpy
bpy.ops.object.light_add(type='POINT', location=(0, 0, 0.3))
l = bpy.context.object.data
l.shadow_soft_size = 0.25; l.color = (1.0, 0.5, 0.15); l.energy = 200  # ~ values visual only
l.cycles.use_multiple_importance_sampling = False  # 3.x path; verify in 4.x/5.x
```

### raea
```tsx
const f = useCurrentFrame();
const flick = 1 + 0.12 * Math.sin(f * 0.9) + 0.06 * Math.sin(f * 2.3);   // deterministic flicker
<PointLight transform={Transform.fromXyz(0, 0.1, 0.15)} color="#ffb070" intensity={150000 * flick} range={3} radius={0.1} />
```
- Emissive surfaces don't light neighbours (materials.md); this light is mandatory, not optional.
- `<Fire light>` already adds a flickering PointLight; set `light={0}` if you place your own.
- Keep the light on the camera side of a flame near a wall (a light of 1 at 0.8 m turns a wall white — post.md).
- No MIS toggle needed: raea draws punctual lights with no visible shape; if a specular hot spot bothers, raise the surface's `perceptual_roughness`.

## NOTES
- Deprecated: none.
- Visual gaps: light power and radius values shown only.
- Rule conflicts: flicker must be gentle (low amplitude, from the frame), never strobing.
