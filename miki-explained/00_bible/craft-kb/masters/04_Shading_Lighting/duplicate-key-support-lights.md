---
title: Support lights = duplicated key at lower power
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/duplicate-key-as-same-direction-fill--use-lighting-in-renders.md
  - cards/04_Shading_Lighting/narrow-contained-support-spots--dark-environments.md
sources: ["How To Use Lighting In Your Renders  Blender Tutorial.txt", "How to Make DARK Environments in Blender.txt", "Apple-Style 3D Motion Design.txt"]
use_when: "adding light without breaking the one-source read"
style_fit: "Keeps Style D's one-source read: copies of the key, weaker, same direction or tight pools; the hero/line subject stays the brightest point and the accent stays on the subject, not the pools."
---

## METADATA
04_Shading_Lighting | Blender 3.x–4.x → 5.x / raea | Blender bpy + raea

## CREATIVE_INTENT
When one key can't cover what the line needs, add copies of it rather than new lamps, so the viewer still reads one
source (one window, one sun) and shadows don't compete.
- Use lighting in renders adds: same-direction copies — duplicate, lower power, offset with rotation parallel to the key;
  all shadows still fall the same way.
- Dark environments adds: narrow contained pools — duplicate at about a quarter/fifth power, shrink the cone to a beam on
  one chosen detail ("something is over there"), let geometry trim the spill; bright locally is fine if tightly contained.

## STE_PROCEDURE
1. Before adding a support light, confirm the key and the shadow-lift fill are final.
2. Duplicate the key light (Shift+D).
3. Lower the copy's Power well below the key (~0.2 ×).
4. Variant A (coverage): offset it over the dark area, keeping its rotation parallel to the key.
5. Variant B (pool): reduce Spot Size to a narrow beam and aim it at one chosen secondary detail.
6. For a pool, aim through a narrow gap or past blockers so geometry trims its spill.
7. Leave shadows on the key only (or the pool spot if its shadow is wanted) to avoid double shadows.
8. Check that all shadows still fall the same way and every support light is clearly dimmer than the key.
9. Repeat only for spots worth seeing; if a pool lands on the line's subject, swap roles (it is the key).
10. (from apple-style-3d-motion) Full product rig: ambient first (~20–28%), then the key spot from above/slightly
    front aimed at the model's centre; duplicate the key to both sides at lower intensity for fill; duplicate again,
    lower and pushed to the frame edge, intensity reduced, as a rim on each side; one point light under the model as
    a soft low-intensity under-fill. To keep light off one area (e.g. ports), reduce that copy's cone/radius rather
    than moving it. Parent the whole rig (or just the under-light) to the model/its carrier so it travels together,
    and shift the rig's balance (e.g. right→left) on a text beat if the brief calls for it.

## VALUES BY SOURCE
| parameter | Use lighting in renders | Dark environments | apple-style-3d-motion | recommended for Style D (+ why) |
|---|---|---|---|---|
| Power vs key | ~0.2 × ("lowered a bit") | 200,000 vs 1,000,000 W (called "a quarter", numerically 0.2) | ambient 18–28%; side/rim copies "a little"/reduced lower than key | 0.2 × key |
| Direction | parallel to key, offset ~1.5 (~) | aimed at a chosen detail | 2 side fills + 2 edge rims (mirrored) + 1 under-point, full named rig | parallel for coverage; aimed pool for a secondary detail (price tag behind hero) |
| Cone | key's | `spot_size` ~0.25 rad ("turned way down") | radius 5,000–9,000 (scene-dependent, AE units); one copy's radius reduced to contain spill off specific parts | raea `outer_angle` ~0.18, `inner_angle` ~0.09 |
| Shadows on copies | none (avoid double shadows, cost) | `shadow_maps_enabled` on the pool | not stated | off for coverage copies; on for a pool that must be trimmed by geometry |
| rig motion | — | — | whole rig (or under-light) parented to the model/carrier, nudged on a text beat | optional; only if the brief calls for a rig shift on a word |

## AGENT_EXECUTION
Blender:
```python
import bpy
key = bpy.data.objects["Key"]
def dup_key(name, power_mul=0.2):
    d = key.copy(); d.data = key.data.copy(); d.name = name
    bpy.context.collection.objects.link(d); d.data.energy = key.data.energy * power_mul; return d
cover = dup_key("SupportCover"); cover.location.x += 1.5          # ~ offset; rotation unchanged = same direction
pool = dup_key("SupportSpot"); pool.data.spot_size = 0.25         # ~ rad, narrow beam (key must be a SPOT)
pool.location = (2.0, -1.0, 4.0)                                  # ~ aim at the chosen detail
```
raea:
```tsx
// A: same-direction coverage copy, no shadows (only the key casts)
<SpotLight transform={Transform.fromXyz(keyP[0] + 1.5, keyP[1], keyP[2]).lookingAt([aim[0] + 1.5, aim[1], aim[2]])}
  intensity={KEY * 0.2} outer_angle={0.6} inner_angle={0.3} />
// B: narrow contained pool on a secondary detail
<SpotLight transform={Transform.fromXyz(1.5, 3, -1).lookingAt([1.2, 0, -1.4])}
  intensity={500_000} outer_angle={0.18} inner_angle={0.09} shadow_maps_enabled range={8} />
```
Spot lights cost one shadow map each; keep shadowed point lights to 1–2 (lights.md / limits.md).

## NOTES
- Deprecated: none.
- Visual gaps: offsets, target spots and exact cone sizes are shown in the viewport only.
- Rule conflicts: if a support pool falls on the line's subject it is not a support light — swap roles. The brand accent
  stays on the subject, not on the pools.
- apple-style-3d-motion: its 5-light named rig (2 fills + 2 rims + 1 under-point) is a fuller worked example of the
  same duplicate-key-lower-power idea; each copy must still stay well under the key (≤ ~0.2× guideline unchanged).
  AE radius values (5,000–9,000) don't map directly to raea — keep using `range` ≈ 2× light-to-subject distance.
  Style D pick unchanged.
