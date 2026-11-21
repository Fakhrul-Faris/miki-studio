---
title: One dominant light does almost everything
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/one-light-does-99-percent--use-lighting-in-renders.md
  - cards/04_Shading_Lighting/one-to-three-lights-max--beautiful-environments.md
  - cards/04_Shading_Lighting/simplicity-first-one-light-one-colour--serene-render.md
  - cards/04_Shading_Lighting/single-key-spotlight--industrial-scene.md
sources: ["How To Use Lighting In Your Renders  Blender Tutorial.txt", "How To Create Beautiful Environments In Blender.txt", "Making a SERENE render in blender.txt", "Making an Industrial Scene in Blender.txt", "Why Lighting Animated Movies Is So Complicated | Movies Insider | Insider.txt"]
use_when: "the Style D single soft top light"
style_fit: Direct match for Style D's one soft top light + one accent — every extra light must prove it earns its place or is deleted; a helper may only reinforce the key's direction; count a brand-accent rim as one of the max three; light sweeps use eased in-out curves.
---

## METADATA
04_Shading_Lighting | 3.x–4.x (source) → bpy 5.x + raea | Blender bpy audit → raea one key

## CREATIVE_INTENT
Most strong scenes are lit by one light; the rest add little and fight each other. You can only balance what you control individually, so keep one key (plus a barely-there fill) and one colour family as long as possible, prove each extra light earns its place, and delete the rest.
- use-lighting-in-renders: the solo/delete audit — keep the light that "hits the hardest" (99 %).
- beautiful-environments: the budget — one or two lights, three at most; when muddy, delete before adding.
- serene-render: one light and one colour until the balance works; add the second colour last (two hours in).
- industrial-scene: a second, weaker spot aimed the same way only fills where the key falls short — still reads as one source; find the key's place by moving it, not by adding lights.

## STE_PROCEDURE
1. Start every shot with one key light only (a Spot), plus at most one very subtle fill (Area directly above, or low ambient) that only lifts shadows.
2. Keep all materials in one colour family.
3. Move and aim the key through several positions; keep the one where the set reads best.
4. Balance contrast, light amount and colour until the frame feels calm and right.
5. Add a second light only if a needed shape or the focal point is unreadable; before a third, try moving/resizing the two.
6. A helper spot, if needed, sits behind/near the key, aims the same direction, is weaker, casts no shadow.
7. Audit: put every light in one collection; solo each and render the camera view.
8. Delete lights whose contribution is "basically nothing"; toggle the key off to confirm it is almost all the lighting.
9. If past three lights, delete the weakest until the frame breaks, then restore one.
10. Only then add the second colour (the accent), checking it complements rather than conflicts; add further elements one at a time, re-balancing after each.
11. When several motivated sources are present, choose the dominant one by the beat's emotion, not by which is physically strongest; dim the rest to ≤ ~30 % (from Why Lighting Animated Movies Is So Complicated).

## VALUES BY SOURCE
| parameter | use-lighting-in-renders | beautiful-environments | serene-render | industrial-scene | recommended for Style D (+ why) |
|---|---|---|---|---|---|
| light budget | 1 does 99 % | 1–2, max 3 | 1 key + barely-there fill | 1 key + same-direction helper | key + low ambient; ≤ 3 including accent rim |
| key | one 1,000,000 W light (scene-scale) | SpotLight 900,000 lm, radius 0.3 | Spot | 245,000 W spot, spot_size ~0.9, radius ~0.5 (warehouse scale) | SpotLight ~900,000 lm at ~1–3 m, soft radius (tune on a still) |
| helper | — | — | Area directly above, subtle | 250,000 lm, outer 0.6 / inner 0.3, no shadow | only if needed, ≤ ~30 % of key, same direction |
| fill | AmbientLight 20–80 | AmbientLight 40 | low Ambient / RectLight | AmbientLight 40 | AmbientLight 20–40 |
| colours | — | — | one family; 2nd colour last | — | one family + one accent on the line's subject |
| intensity values | "change with scale" | — | — | 245,000 W tied to large warehouse; don't copy | always tune at macro scale |

### Additional source (folded, Phase C)
| parameter | animated-movies-lighting (*Over the Moon*) | recommended for Style D |
|---|---|---|
| sources present | lanterns above, kitchen behind, moonlight | top key + practical (screen/sign) |
| dominance | moonlight "in a lesser intensity so we could feel the actual lanterns"; lanterns amplified for "warm and festive" | the source that carries the line's feeling is the brightest; others ≤ ~30 % |

See also `cards/06_Art_Direction/emotional-colour-over-accurate-colour--animated-movies-lighting.md`.

## AGENT_EXECUTION
Blender (5.x, audit stills only; raea renders finals):
```python
import bpy
lights = [o for o in bpy.data.collections["Lights"].objects if o.type == "LIGHT"]
assert len(lights) <= 3, "light budget: 1–2, max 3"
for solo in lights:
    for o in lights: o.hide_render = (o is not solo)
    bpy.context.scene.render.filepath = f"//_audit/solo_{solo.name}.png"
    bpy.ops.render.render(write_still=True)
for o in lights: o.hide_render = False

# key + same-direction helper aimed at one target
tgt = bpy.data.objects.new("KeyTarget", None); bpy.context.collection.objects.link(tgt)
bpy.ops.object.light_add(type='SPOT', location=(0, -2, 6)); key = bpy.context.active_object
key.data.spot_size = 0.9; key.data.shadow_soft_size = 0.5          # ~
bpy.ops.object.light_add(type='SPOT', location=(0.6, -2.4, 6.2)); helper = bpy.context.active_object
helper.data.use_shadow = False
for l in (key, helper):
    c = l.constraints.new('TRACK_TO'); c.target = tgt; c.track_axis = 'TRACK_NEGATIVE_Z'; c.up_axis = 'UP_Y'
```
raea:
```tsx
<SpotLight name="key" transform={Transform.fromXyz(0, 1.2, 0.3).lookingAt([0, 0, 0])} intensity={900000}
  outer_angle={0.45} inner_angle={0.225} shadow_maps_enabled soft_shadows_enabled radius={0.15} />
{/* optional helper: same direction, weaker, no shadows */}
<SpotLight name="helper" transform={Transform.fromXyz(0.15, 1.25, 0.35).lookingAt([0, 0, 0])} intensity={250000}
  outer_angle={0.6} inner_angle={0.3} />
<AmbientLight brightness={40} />
{/* the one accent: emissive or base_color on the line's subject only */}
```
Audit in raea = `raea render EDIT.tsx --frame N -o F.png` with lights commented out. ProStage in `miki-explained/tools/raea/kit/pro.tsx` already follows this (one soft key, dim cool fill); BlendShot treats the strongest exported light as key and `LOOK.keyGain` converts Blender watts. Emissive props with `<Bloom>` are not lights; keep shadowed PointLights to one or two (six shadow maps each).

## NOTES
- Deprecated: none.
- Light values are scene-scale dependent ("don't worry about intensity values"); the 245,000 W / 1,000,000 W figures belong to large scenes — never copy to macro scale; lights.md: 900,000 lm ≈ daylight at 3 m, far less at ~1 m (`~`).
- Volumetric haze (see volume-haze-cube master) makes the single source read as a shaft.
- Visual gaps: light placement found by trial in the viewport.
- Rule conflicts: none — reinforces the house rule; any light sweep is an eased in-out curve.
