---
title: Fake bounce with directed area lights placed only where bounce is plausible
bucket: 04_Shading_Lighting
source: "Get Better Lighting in Blender With This Easy Trick.txt"
source_time: "00:23–05:01, 06:21–07:17, 08:40–09:52"
blender_version_source: 3.x/4.x (Cycles)
tool_target: raea
tier: full
style_fit: Core Style D move — raea has no bounce light, so one soft, colour-matched fill aimed up from the lit patch under the top key lifts the silhouetted parts of the hero object without a second visible source.
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x (Cycles) | Blender bpy + raea

## CREATIVE_INTENT
Use when the key light is right but the areas around the bright patch fall into silhouette. Instead of raising exposure or
brightening the floor (which washes it out), add invisible soft fills that push the bounce that would already exist: trace each
from a brightly lit surface toward what it would light. Keep them colour-matched and subtle — realism breaks fast.

## STE_PROCEDURE
1. Keep the key lights (here three spots from the top) unchanged.
2. Before you add fills, reject the alternatives: raising exposure or floor albedo changes the look and makes tiles look wrong.
3. Find surfaces that already receive strong direct light (the patch of "sunlight" on the floor).
4. Check where indirect light already shows (e.g. underside of a ring lit from the floor).
5. Add an Area light inside or just above that lit patch.
6. Aim it along the bounce direction (floor → underside of the object above).
7. Keep Size at 1 m (default) so it is soft.
8. Reduce Spread below 180° so it lights only the target, not unwanted areas.
9. Set Power low: 160 W was "extreme"; use less in normal scenes.
10. Raise power only when a fill must reach a far wall.
11. Add further fills only where a lit surface can justify them, including one aimed toward the camera from a bright background.
12. Colour-match each fill to the scene (warm scene → slightly warm; white looked wrong).
13. Test subtlety: multiply one fill ×10 — if it looks fake, the useful value is well below.
14. Never add a fill with no apparent source.

## AGENT_EXECUTION
### Blender (Cycles, look-dev)
```python
import bpy, math
bpy.ops.object.light_add(type='AREA', location=(0.4, -0.2, 0.05), rotation=(math.pi, 0, 0))  # in the lit patch, flipped to face up
f = bpy.context.object
f.data.size = 1.0                    # default 1 m: soft
f.data.spread = math.radians(120)    # ~ "turned down a little" from 180°
f.data.energy = 160                  # author's extreme example; normal scenes lower (~40–100)
f.data.color = (1.0, 0.88, 0.72)     # ~ warm, matched to the scene
```
Area lights emit along local −Z: rotate so −Z points from the patch to the shadowed object (`rotation=(math.pi, 0, 0)` to face up).

### raea
- raea has no `spread`; directional soft fill = `<RectLight>` (soft, wide falloff, no shadows) or a soft `<SpotLight>`:
```tsx
<RectLight transform={Transform.fromXyz(0.4, 0.02, -0.2).lookingAt([0.4, 1, -0.2])} width={1} height={1}
           intensity={40000} color="#ffe2c0" />
{/* narrower "spread": a spot instead */}
<SpotLight transform={Transform.fromXyz(0.4, 0.02, -0.2).lookingAt([0.3, 0.6, 0])} intensity={60000}
           outer_angle={1.0} inner_angle={0} color="#ffe2c0" />
```
- Intensities are lumens and scale with distance squared (lights.md); Blender watts do not convert — tune on a still (~ values).
- Not `volumetric`, no `shadow_maps_enabled` (bounce casts no crisp shadow).
- Turn `.lookingAt` toward what the bounce would hit; a RectLight/SpotLight shines along −Z.

## NOTES
- Deprecated: none.
- Visual gaps: exact positions, sizes and the other fills' power ("quite a bit brighter") are visual only.
- Rule conflicts: none; fills are static. If a fill must change, fade intensity over ≥0.4 s.
