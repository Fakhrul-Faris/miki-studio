---
title: Shadow softness from light size and distance
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/light-quality-shadow-softness-size-and-distance--advanced-comp-nuke-wk1.md
  - cards/04_Shading_Lighting/light-size-softness-vs-detail--fundamentals-of-lighting.md
sources: ["Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt", "Fundamentals of Lighting in Blender.txt"]
use_when: "choosing the soft top light's size for the macro look"
style_fit: Core of Style D — "one soft top light" = a large source close to the object (form); shrink it on the beat where scratches, embossing or a printed number must pop. Radius changes mid-shot only as a slow eased ramp, never a pop.
---

## METADATA
04_Shading_Lighting | Blender 4.x + Nuke/CG principle → bpy 5.x + raea | Blender bpy, raea

## CREATIVE_INTENT
Shadow sharpness depends on how parallel the rays are: a small or far source gives hard shadows (the sun is huge but so far it's sharp), a large or near source gives soft ones; diffusion (cloud, silk) becomes a new, larger source. Shadows are sharpest at contact and soften with distance; bounce light is always soft. Size also chooses what the viewer notices: tiny = rivets, scratches, normal detail, aggressive (sun, street lamp); large = overall form, flaws hidden, calm (people, products).
- advanced-comp-nuke-wk1: the physics (size + distance + contact), match one shadow quality across every element and plate.
- fundamentals-of-lighting: radius as a form-vs-detail dial, with the "moderate for hard-surface" middle.

## STE_PROCEDURE
1. Read the target shadow quality (hard sun, overcast, studio softbox); check reference stills.
2. Ask per shot: is this about form or detail?
3. Select the lamp; set Radius 0 and look at shadow edges and fine surface detail.
4. To soften, increase Radius (or Area size) or move the light closer; detail fades as shadows feather.
5. To harden, shrink the light or move it farther.
6. Form / person / product: keep a large Radius. Scratches / rivets / texture: keep a small Radius.
7. Hard-surface objects: moderate Radius — a little softness, detail still visible.
8. Don't go so large that the object reads only as flat colour values.
9. Expect shadows sharp at contact and softer away from the caster.
10. Keep bounce/indirect light soft; never give it a hard shadow.
11. Keep every element in the shot to one shadow quality (when picking background photos, filter for the same light).

## VALUES BY SOURCE
| parameter | advanced-comp-nuke-wk1 | fundamentals-of-lighting | recommended for Style D (+ why) |
|---|---|---|---|
| Blender point/spot Radius (`shadow_soft_size`) | — | 0 hard · ~0.25 "softish" (crate) · ~2.0 overcast/lantern | build only; judge in raea |
| raea Spot/Point `radius` | kit ProStage key 3.2 (big softbox) | 0.05 for detail; default 0.25 | ~0.6–3.2 for the soft top key; 0.05–0.15 on a detail beat |
| raea DirectionalLight `soft_shadow_size` | 0.5 real sun · 5–10 studio softbox | 6 | 5–10 if a sun is used as the key |
| shadowless soft panel | RectLight | RectLight | RectLight for fills (no shadows) |
| penumbra dither fix | `<Shadows mapSize={4096}>`, bias 0.1–0.2 | `<Shadows mapSize={8192}>` or smaller size | mapSize 4096→8192 on close-ups; bias 0.1–0.2 |
| indirect softness | AmbientLight/Environment + AO medium | — | low AmbientLight + `<AmbientOcclusion quality="medium" />` |

## AGENT_EXECUTION
Blender (build/preview only):
```python
import bpy
L = bpy.data.lights["Key"]
L.shadow_soft_size = 0.0    # "Radius" in UI: hard, detail pops
L.shadow_soft_size = 0.25   # ~ "softish" hard-surface value
L.shadow_soft_size = 2.0    # ~ overcast / paper-lantern
# Area light: L.size
```
raea (PCSS: sharp at contact, softer with distance):
```tsx
<Shadows mapSize={8192} bias={0.15} />
// soft top key (form)
<SpotLight transform={Transform.fromXyz(0, 3, 1).lookingAt([0, 0, 0])} intensity={2000000}
  outer_angle={0.5} inner_angle={0.25} shadow_maps_enabled soft_shadows_enabled radius={3.2} />
// detail beat: same light, radius={0.05} (eased ramp, not a pop)
// sun as key: soft_shadow_size 0.5 real sun, 5–10 studio softbox
<DirectionalLight transform={Transform.fromXyz(2, 6, 3).lookingAt([0, 0, 0])} illuminance={10000} shadow_maps_enabled soft_shadow_size={6} />
// shadowless soft panel
<RectLight transform={Transform.fromXyz(0, 2, 2).lookingAt([0, 0, 0])} intensity={60000} width={2} height={2} />
<AmbientLight brightness={40} />
<AmbientOcclusion quality="medium" />
```

## NOTES
- Deprecated: none (`shadow_soft_size` is the Point/Spot "Radius").
- The Blender source noted EEVEE got noisy at large radius and switched to Cycles; we never render in Cycles — judge softness in raea stills.
- raea: large PCSS sizes dither in a fixed pattern visible at 1:1 — raise `<Shadows mapSize>` or lower the size (lights.md).
- Visual gaps: the final "softish" value is not stated.
- Rule conflicts: none; size changes mid-shot only as slow eased ramps.
