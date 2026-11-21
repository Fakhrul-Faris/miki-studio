---
title: Close plane key whose highlight runs the product's full length
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/Three Point Lighting Tutorial | Blender Product Rendering Series.txt"
source_time: "00:36–00:50"
tool_target: raea
tier: full
use_when: "a long or tall hero (bottle, machine, card, phone, receipt roll) whose shape must read at phone size in under 1 s"
style_fit: "Fits Style D (soft top key, form read from soft highlights). Source places the key to the side → adapted: in Style D the plane sits close ABOVE / top-front, sized to the hero's long axis."
---

## METADATA
04_Shading_Lighting | Blender (Cycles) | Area/plane light → raea RectLight (+ SpotLight for shadows)

## CREATIVE_INTENT
"For the key light, just place a plane light really close to the object. I want the highlights to spread over the
whole length of the coffee maker so that its shape is easily readable." A large light close to the subject gives one
long continuous highlight that traces the silhouette; a small or far key gives a dot that says nothing about shape.

## STE_PROCEDURE
1. Measure the hero's long axis.
2. Add a plane (Area) light at least as long as that axis (~1–1.2×).
3. Place it really close to the product (~0.3–0.5× the long axis away, value not stated).
4. Align the light's long side with the hero's long axis.
5. Look from the camera: slide/rotate the light until one highlight runs end to end along the hero.
6. Check the silhouette and form read with every other light off.

## AGENT_EXECUTION
**Board check (RECIPE-D §7) add-on:** "does a single highlight trace the hero's long edge?". **ref_<shot>.md → light:**
"key highlight runs full length of <hero>".

**raea** (RectLight casts no shadows, so pair it with the house top SpotLight for shadow):
```tsx
const L = 0.30;  // hero long axis in m (e.g. a 30 cm bottle lying down)
<RectLight name="keyStrip" transform={Transform.fromXyz(0, 0.14, 0.06).lookingAt([0, 0.04, 0])}
  intensity={120_000} width={L * 1.1} height={0.06} color="#fff4e8" range={0.35} />
<SpotLight name="keyShadow" transform={Transform.fromXyz(0, 1.2, 0.2).lookingAt([0, 0.04, 0])} intensity={250_000}
  outer_angle={0.4} inner_angle={0.2} radius={0.2} range={2.5} shadow_maps_enabled soft_shadows_enabled />
```
Hero material: `perceptual_roughness` 0.15–0.35 so the strip reads as a highlight. `range` ≈ 2× light-to-subject
distance. Values `~`.

### Worked example
Topic: "Satu botol minyak masak RM31: berapa lama tahan untuk gerai goreng pisang?" (illustrative).
BEFORE: `| 1 | "RM31 sebotol" | low side view of the 5 kg bottle, small key far top-left | price fades in | — |` — dot highlight, bottle reads as a yellow block.
AFTER: `| 1 | "RM31 sebotol" | low side view; close strip key above runs one highlight from cap to base, bottle shape reads instantly | "RM31" (accent) grows in 0.4 s on "RM31"; camera creeps 3 cm along the highlight | close-key-highlight-spans-product--three-point-product-series |`

### Check
- Does one highlight run (nearly) the full length of the hero?
- Is the key at least as long as the hero and close to it?
- With fill/rim off, is the shape still readable?
- In Style D, is the key above (not a side key)?

## NOTES
- Visual gaps: light size, power and distance not stated (`~`).
- Softness vs size/distance: masters/04_Shading_Lighting/light-softness-size-distance.md.
