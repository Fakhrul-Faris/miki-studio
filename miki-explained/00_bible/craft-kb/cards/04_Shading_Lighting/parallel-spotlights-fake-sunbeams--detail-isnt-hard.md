---
title: Parallel spotlights as broken sunlight — light only what should be seen
bucket: 04_Shading_Lighting
source: "Detail Isn't Hard  Blender Tutorial.txt"
source_time: "28:55–34:00"
blender_version_source: 3.x
tool_target: raea
tier: full
style_fit: "partial conflict: house look is ONE soft top light; use a single pool as that light, or parallel pools only in background depth"
---

## METADATA
04_Shading_Lighting | 3.x source (Cycles) → raea | raea (Blender for layout)

## CREATIVE_INTENT
Lighting everything shows every flaw and every repeat. A few narrow cones, all pointing the exact same way, read as
sunlight through cracks: the hero is the brightest pool, everything else falls into darkness. Less light = fewer
problems, more drama.

## STE_PROCEDURE
1. Set up one spotlight on the hero and make it look good on its own.
2. Before you add more, ask what real source this light is (here: sun through cave cracks) and keep every light consistent with it.
3. Duplicate the spot and move the copy sideways; keep the rotation identical so the beams stay parallel.
4. Keep a copy only if the frame looks better with it; otherwise delete it (source ends with 4 spots, 1–2 doing most work).
5. Set Power ≈ 2,000,000 W (scene-scale dependent; do not copy), Color white, Radius 2 m (softer shadow edges).
6. Narrow Spot Size so each cone lights a patch, not the whole set (value: unknown (visual only)).
7. Aim the brightest pool at the hero; leave repeats and weak areas in shadow.
8. Before render, hide each spot in turn to check it earns its place.

## AGENT_EXECUTION
### Blender (layout)
```python
import bpy, math
from mathutils import Euler
rot = Euler((math.radians(25), 0, math.radians(40)))      # ~ shared "sun" direction
for i, off in enumerate([(0, 0), (6, 2), (-5, 4), (3, -6)]):  # ~ offsets
    l = bpy.data.lights.new(f"sun_spot_{i}", 'SPOT')
    l.energy = 2_000_000; l.color = (1, 1, 1); l.shadow_soft_size = 2.0
    l.spot_size = math.radians(15); l.spot_blend = 0.15    # ~ narrow cone
    o = bpy.data.objects.new(l.name, l); o.location = (off[0], off[1], 40); o.rotation_euler = rot
    bpy.context.scene.collection.objects.link(o)
```
### raea
- Parallel = same direction vector: aim each spot at `p + D` with one shared `D`:
```tsx
const D: [number, number, number] = [-0.4, -1, -0.3];               // ~ shared sun direction
const spots = [[0, 12, 0], [3, 12, 1], [-2.5, 12, 2]] as const;
{spots.map((p, i) => (
  <SpotLight key={i} transform={Transform.fromXyz(p[0], p[1], p[2]).lookingAt([p[0] + D[0], p[1] + D[1], p[2] + D[2]])}
    intensity={2700000} outer_angle={0.2} inner_angle={0.1} radius={0.5} soft_shadows_enabled shadow_maps_enabled
    volumetric={i < 2} />
))}
```
  `outer_angle` is a half-angle in radians; intensity in lumens (~2.7 M at ~3–5 m; calibrate on a still).
- Cheaper true-parallel alternative: one `<DirectionalLight volumetric shadow_maps_enabled />` with `shadow="only"` blocker meshes (a cracked ceiling) cutting it into pools.
- Only the first two volumetric spots get exact hero shafts (post.md); shadowed point/spot lights cost maps — keep it to 1–2.

## NOTES
- Blender watts do not convert directly to raea lumens; BlendShot uses keyGain 1100 lm/W for area keys only.
- Visual gaps: spot size value and exact placement (33:33–33:58, "moved them around until they looked good").
- Rule conflicts: Style D = one soft top light. Adapt: the hero's single soft top light is the main pool; extra parallel pools only as distant, out-of-focus background beams. No animated light sweeps faster than the camera rules allow.
- STT fixes: "vendor"/"Runner" = render.
