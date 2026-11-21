---
title: Bounce-card fill (large plane opposite the key instead of a second softbox)
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/Three Point Lighting Tutorial | Blender Product Rendering Series.txt"
source_time: "00:52–01:10"
tool_target: raea
tier: full
use_when: "the shadow side of a product under the top key is too dark, and a second light would look like a second source"
style_fit: "Fits Style D's one-key rule: fill comes from the key's own light bouncing off a card. ⚠ raea has no bounce (no path-traced GI) → adapted as a shadowless RectLight at the card's position + the card kept as real geometry so glossy heroes reflect it."
---

## METADATA
04_Shading_Lighting | Blender (Cycles, path-traced bounce) | white plane → raea RectLight + reflective card Mesh3d

## CREATIVE_INTENT
In the product three-point variant, the fill is not another softbox: "there is a much easier way — just place a large
plane opposite to the key light. That way we use the bounce light to create the fill. Play with the size and how close
the plane is to get the results you're after, and you'll get really nice gradients on your object." It is a
photographer's bounce card: fill whose direction and softness come from the key itself.

## STE_PROCEDURE
1. Set the key first (a plane light close to the product; see close-key card).
2. Add a large plane on the opposite side of the product from the key, facing it.
3. Give the plane a plain white/light-grey diffuse material.
4. Move the plane closer to raise the fill; farther to lower it.
5. Scale the plane up for a softer, wider gradient; down for a smaller, tighter one.
6. Check the shadow side shows a smooth gradient, not a flat lift.
7. Keep the plane out of frame (or hidden from camera) but visible in reflections.

## AGENT_EXECUTION
**Frame brief → Decision:** "fill = bounce card opposite the key; one source". **ref_<shot>.md → light:** note "bounce card
camera-left, ~1.5× hero height".

**raea** (Bevy has no light bounce, so the card does nothing unless faked):
```tsx
const card = Transform.fromXyz(-0.35, 0.15, 0.1).lookingAt([0, 0.12, 0]);
{/* the bounce: shadowless, soft, ~10–20 % of the key, slightly warm like the key */}
<RectLight name="bounce" transform={card} intensity={30_000} width={0.4} height={0.5} color="#fff4e8" range={0.8} />
{/* the card itself, so glossy surfaces show its soft reflection; off-frame */}
<Mesh3d name="bounceCard" transform={card}>
  <Cuboid half_size={[0.2, 0.25, 0.005]} />
  <StandardMaterial base_color="#e6e6e6" perceptual_roughness={0.9} emissive={glow("#ffffff", 0.4)} />
</Mesh3d>
```
`glow` from `tools/raea/kit/clay.tsx`. Distance ↔ intensity, size ↔ `width/height`: mirror the source's "size and how
close". Values `~`; check the card isn't in frame on every camera position of the setup.

### Worked example
Topic: "Mesin kopi RM300 untuk gerai: balik modal berapa cawan?" (illustrative).
BEFORE: `| 5 | "seratus cawan" | side view of the coffee machine, key top-right, a second softbox left | cups count up | — |` — two highlights, two shadows.
AFTER: `| 5 | "seratus cawan" | slow 3/4 dolly along the machine; key top-right, bounce card camera-left gives a smooth gradient on the shadow side | counter (accent) 0 → 100 on "seratus", cups multiply in 0.4 s steps | bounce-card-plane-fill--three-point-product-series |`

### Check
- Is there only one visible highlight source on the hero?
- Does the shadow side show a gradient (not flat grey)?
- Is the bounce RectLight shadowless and well below the key?
- Is the card out of frame for the whole setup?

## NOTES
- Visual gaps: plane size/distance and render values not stated (`~`).
- Fill from lights at bounce points is in masters/04_Shading_Lighting/fake-bounce-lights.md; this card is the physical
  card version (direction from the key, reflection on glossy heroes).
