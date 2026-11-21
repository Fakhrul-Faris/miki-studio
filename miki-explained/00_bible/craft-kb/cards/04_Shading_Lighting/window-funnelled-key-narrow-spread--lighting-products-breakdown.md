---
title: Window-funnelled key (narrow-spread light through an opening onto the product only)
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/Lighting Products in Blender (Breakdown).txt"
source_time: "00:19–01:20 (Dior scene)"
tool_target: raea
tier: full
use_when: "a hero object sitting in a small built room (shop corner, counter, shelf) that must be the only bright thing in frame"
style_fit: "Fits Style D's dark room + one soft top light: the key is confined to the hero so the room falls off to dark. ⚠ source key enters sideways through a wall window → adapted as a top opening (skylight/shelf gap) when the shot is Style D; side window allowed only where the set has one."
---

## METADATA
04_Shading_Lighting | Blender (Cycles/Octane, engine-agnostic principle) | Blender look-dev → raea SpotLight + shadow-only wall

## CREATIVE_INTENT
For the Dior perfume shot the author modelled a simple room (a cube, curtain, table, a window "so the light could come
in"), then made the key an area light whose **spread was reduced so it passes through the window and focuses only on the
product**. Gobos break up the beam, a second area light in front of the curtain and a sun lamp fill the room's shadows,
and a point light catches the bottle's reflective top. The room exists to be lit badly; the product is lit well.

## STE_PROCEDURE
1. Build the room first: a cube interior, one or two props (curtain, table), and an opening (window).
2. Place the hero on the table under/inside the opening's light path.
3. Add an Area light outside the opening, aimed through it at the product.
4. Reduce the Area light's Spread until the beam passes the opening and lands only on the product (~15–30°, value not stated).
5. Before adding any other light, render: only the product and a patch around it should be bright.
6. Optionally add gobos (alpha image planes) between light and opening to break the beam's pattern (see gobo master).
7. Add a fill Area light in front of the curtain to lift the shadows on that side.
8. Add a Sun lamp as a weak whole-room fill so the room reads but stays darker than the product.
9. Add a small Point light placed to catch the product's reflective top (see top-surface highlight card).
10. Check: the product is the brightest object; the room is legible but secondary.

## AGENT_EXECUTION
**Shot list / frame brief:** use for setups where the line places the object in a place ("di kaunter kedai…"). Frame
brief → Decision: "light enters through one opening and only the hero is lit"; Eye: hero first, room second.

**raea** (no area-light Spread; the opening itself does the confining, as real geometry):
```tsx
// module level: a ceiling board with a hole above the hero (the "window"), casting only
const CEIL = manifold.difference(manifold.box(3, 0.04, 3), manifold.box(0.5, 0.2, 0.4));
<Mesh3d name="ceiling" shadow="only" shape={CEIL} transform={Transform.fromXyz(0, 1.2, 0)}>
  <StandardMaterial base_color="#000000" />
</Mesh3d>
{/* key: narrow, soft spot through the hole — the only shadow caster */}
<SpotLight name="key" transform={Transform.fromXyz(0, 2.2, 0.2).lookingAt([0, 0.1, 0])} color="#fff4e8"
  intensity={900_000} outer_angle={0.28} inner_angle={0.12} radius={0.15} range={5}
  shadow_maps_enabled soft_shadows_enabled />
{/* curtain-side fill: shadowless panel, well under the key */}
<RectLight name="fill" transform={Transform.fromXyz(-1, 0.6, 0.8).lookingAt([0, 0.1, 0])} intensity={40_000}
  width={1} height={1.2} color="#e8eeff" range={3} />
{/* "sun lamp" room fill → low ambient */}
<AmbientLight brightness={15} />
<Shadows distance={8} firstCascade={2} />
```
Intensities `~`; tune with `raea render EDIT.tsx --frame N -o F.png`. Narrowing `outer_angle` ≈ reducing Spread.

### Worked example
Topic: "Modal stok sebulan kedai runcit: berapa?" (numbers illustrative; plain count × price).
BEFORE: `| 3 | "sepuluh bungkus gula, RM30" | wide of the shop interior, evenly lit | sugar packs fade in | — |` — every shelf
as bright as the sugar; nothing leads the eye.
AFTER: `| 3 | "sepuluh bungkus gula, RM30" | low 3/4 on the counter; key spot through a shelf gap lands only on the stack of 1 kg sugar packs, shelves fall to dark | packs multiply 1 → 10 on "sepuluh" (0.4 s each, counter ticks); "RM30" tag (accent) fades in on "RM30"; beam stays fixed | window-funnelled-key-narrow-spread--lighting-products-breakdown |`

### Check
- Is the hero the brightest surface in the frame (squint test)?
- Does the key pass through a real opening/blocker rather than lighting the whole room?
- Are fill lights shadowless and clearly below the key?
- In Style D, does the key still come from the top?

## NOTES
- Visual gaps: spread angle, powers and positions are on screen only (`~`). Original narration in Spanish (translated).
- Source used Octane; author: "lighting principles are the same in all render engines".
- ⚠ Sun lamp as room fill → AmbientLight in raea (no extra shadow caster, keeps one top key).
