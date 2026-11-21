---
title: Inverse-square falloff — near light steers, high light evens
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/high-point-light-minimal-falloff--fundamentals-of-lighting.md
  - cards/04_Shading_Lighting/inverse-square-falloff-attention--fundamentals-of-lighting.md
sources: ["Fundamentals of Lighting in Blender.txt"]
use_when: "controlling where attention falls by light distance"
style_fit: Strong fit — the single soft top light is placed close to the detail the line is about (falloff darkens the rest) or raised high when the whole object is the subject; any travel of the hot spot is an eased in-out move, never a snap.
---

## METADATA
04_Shading_Lighting | Blender 4.x (source) → bpy 5.x + raea | Blender bpy, raea

## CREATIVE_INTENT
A point/spot light's brightness falls to a quarter each time the distance doubles (not "80 %", but 25 %). Distance is therefore an attention dial: a light close to one detail makes local contrast that pulls the eye and darkens the rest on its own; the same light pushed far along the same ray makes falloff across the object tiny, so every part reads evenly without a sun's flatness.
- inverse-square-falloff-attention: near light = steer attention to the price / slot / QR; no hidden lamps to darken the rest.
- high-point-light-minimal-falloff: far light along the same direction = even "proper model render" when no single detail wins.

## STE_PROCEDURE
1. Decide whether one detail must win attention (go near) or the whole object is the subject (go far).
2. Near: move a Point/Spot lamp close to that detail, slightly above it.
3. Near: lower Power until the hot spot is not clipped.
4. Near: check that surfaces at double the distance get about a quarter of the light.
5. Near: do not add hidden lamps to darken the rest; let falloff do it.
6. Far: keep the key lamp's direction to the subject unchanged.
7. Far: move the lamp along that direction until it is several object-heights away (~3×).
8. Far: raise Power by k² for a k× distance (×4 per doubling) to restore brightness.
9. Far: compare renders; near and far faces of the object should now match closely.
10. If the hot spot moves to a new detail on a word, animate the light's transform/intensity on an eased in-out curve.

## VALUES BY SOURCE
| parameter | inverse-square-falloff-attention | high-point-light-minimal-falloff | recommended for Style D (+ why) |
|---|---|---|---|
| falloff law | irradiance ∝ P/d² | same, compensate energy × k² | same law in raea (lumens fall with d², lights.md) |
| light distance | close to detail, Blender ~(0.2,-0.3,0.6) | ~3× farther along same ray | near for "this line is about X" beats; far for whole-object reveals |
| Blender power | ~60 W (lowered) | energy × k² (k ~3 → ×9) | n/a (Blender only builds) |
| raea intensity | 120,000 lm at ~0.7 m, range 4 | 3,600,000 lm at ~6 m | scale from lights.md reference: 900,000 lm ≈ bright at 3 m → ÷16 at 0.75 m (~56,000), ×4 at 6 m |
| raea cone | outer 0.5 / inner 0.25 | outer 0.35 / inner 0.17 | outer ≈ 0.35–0.5, inner = half outer (soft edge) |
| soft shadow radius | 0.15 m | 0.6 m | 0.15–0.6 m: smaller near, larger far so the top light stays soft |

## AGENT_EXECUTION
Blender (5.x, build/preview only):
```python
import bpy
from mathutils import Vector
L = bpy.data.objects["Key"]
target = Vector((0, 0, 0.3))

# A) near: steer attention
L.location = (0.2, -0.3, 0.6)   # ~ close to the detail
L.data.energy = 60              # ~ lower: irradiance ∝ P / d²

# B) far: even lighting along the same ray
d = L.location - target; k = 3.0          # ~ 3× farther
L.location = target + d * k
L.data.energy *= k * k                    # inverse-square compensation
```
raea:
```tsx
// A) near: hot spot on the detail the line names
<SpotLight transform={Transform.fromXyz(0.15, 0.7, 0.3).lookingAt([0, 0.1, 0])}
  intensity={120000} outer_angle={0.5} inner_angle={0.25} range={4}
  soft_shadows_enabled shadow_maps_enabled radius={0.15} />

// B) far: even top light over the whole object
<SpotLight transform={Transform.fromXyz(0, 6, 1.5).lookingAt([0, 0.3, 0])} intensity={3600000}
  outer_angle={0.35} inner_angle={0.17} soft_shadows_enabled shadow_maps_enabled radius={0.6} />
```
Move between A and B (or onto the next detail) by interpolating `transform` and `intensity` from `useCurrentFrame()` with an in-out ease.

## NOTES
- Deprecated: none.
- Physics: irradiance ∝ 1/d²; tone mapping (AgX / raea `tony`) makes the 25 % look less extreme on screen than in scene values.
- Visual gaps: exact lamp positions and final height/power in the demo are visual only.
- Rule conflicts: none; an animated "travelling" hot spot must use an eased in-out curve, no snap.
