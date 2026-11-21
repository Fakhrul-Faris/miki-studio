---
title: Two suns offset by ~2° for layered, softly fading shadows
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/Easy Blender Lighting HACK [Blender Tutorial].txt"
source_time: "00:00–00:58"
tool_target: raea
tier: principle
use_when: "a hero's shadow looks razor-sharp and CG ('too precise') under the single top key"
style_fit: "Fits Style D's soft top light: softer, graded shadow falloff without adding a second visible light direction (the two suns are only 2° apart). In raea prefer one sun with soft_shadow_size; the twin-sun is the fallback."
---

## METADATA
04_Shading_Lighting | Blender (World shader, Sky Texture) | raea DirectionalLight

## CREATIVE_INTENT
Sharp, precise shadows look fake: real light "doesn't come from a single unchanging source". Two Sky Textures in the
World with the sun rotation a couple of degrees apart (30° and 32°) give layered shadow edges that "gently fade,
blending seamlessly into the light".

## STE_PROCEDURE
1. Before adding lights, confirm the hard shadow is the problem (render a still).
2. Add two sun sources with the same direction, one rotated ~2° off (source: 30° and 32°).
3. Lower both suns' intensity to 0.5 each so the total stays close to one sun.
4. Set different sun sizes for contrast: one 5, the other 1 (adjust to the mood).
5. Blend both into the background colour (Mix Color, A and B).
6. Render and compare against the single-sun still; keep the softer one only if the hero still reads in 1 s.

## AGENT_EXECUTION
raea has no Sky Texture node; two suns translate to two `DirectionalLight`s. First try one sun with PCSS:
```tsx
<DirectionalLight transform={Transform.fromXyz(0.4, 6, 1).lookingAt([0, 0, 0])} illuminance={9000}
  shadow_maps_enabled soft_shadow_size={5} />
```
Twin-sun fallback (each half intensity, ~2° apart; sizes 5 and 1 mirror the source):
```tsx
<DirectionalLight transform={Transform.fromXyz(0.40, 6, 1).lookingAt([0, 0, 0])} illuminance={4500} shadow_maps_enabled soft_shadow_size={5} />
<DirectionalLight transform={Transform.fromXyz(0.61, 6, 1).lookingAt([0, 0, 0])} illuminance={4500} shadow_maps_enabled soft_shadow_size={1} />
<Shadows distance={8} firstCascade={1} />
```
(0.21 m offset at 6 m height ≈ 2°.)
### Worked example
Board still for "Cara susun stok supaya tak rugi expired" (kedai runcit; illustrative): BEFORE — a milk carton on the
shelf with a knife-edge black shadow, reads as a render. AFTER — the same key split into two suns 2° apart, sizes 5/1:
the shadow is dense at the carton's base and fades in two steps; the accent expiry-date label stays the brightest
thing.
### Check
- Is the shadow dense at contact and softer away from it?
- Is there still one clear light direction (no double-shadow look)?
- Did total brightness stay about the same as one sun?

## NOTES
- Values are the author's (30°/32°, strength 0.5, size 5 and 1); raea illuminance values are ~.
- Visual gaps: the exact node layout is shown on screen; wiring here is from speech.
