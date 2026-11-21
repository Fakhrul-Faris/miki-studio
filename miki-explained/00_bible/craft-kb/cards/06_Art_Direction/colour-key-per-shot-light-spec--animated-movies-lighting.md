---
title: Colour key — a per-shot light spec (how dark, how many lights, which colours, how much shadow)
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Why Lighting Animated Movies Is So Complicated | Movies Insider | Insider.txt"
source_time: "01:32–02:14"
tool_target: frame-brief
tier: full
use_when: "writing each frame brief's light line, after the colour script; before touching raea lights"
style_fit: "Fits Style D: the spec enforces 'one soft top light' and 'one accent' as written numbers per setup."
---

## METADATA
06_Art_Direction | general (Sony Pictures Imageworks lighting team) | frame brief (light fields) + ref_<shot>.md

## CREATIVE_INTENT
The colour script is refined into a "color key", which "tells the lighting team how light or dark a given scene or shot
should be while also identifying the exact number of lights, light sources, colors, and even how much shadow your
subject is casting". The lighting team then controls "the intensity, the placement of the lights, the colors" (Clara
Chan, CG supervisor).

## STE_PROCEDURE
1. Before you light a setup, copy its colour-script tag (e.g. dark-cool).
2. Write the overall level: dark, mid or bright.
3. Write the number of lights (Style D: 1 key + ≤ 2 helpers).
4. Name each light's motivated source (top lamp, phone screen, window).
5. Write each light's colour as a hex.
6. Write how much shadow the subject casts: none, soft short, long hard.
7. Light the setup to the spec; change the spec, not the lights, if it fails.

## AGENT_EXECUTION
Add a "Colour key" block to each frame brief (or to `ref_<shot>.md` under light/palette):
`level · lights (n) · sources · hex per light · shadow`. raea maps 1:1: count of light props, `color`, `intensity`,
`shadow_maps_enabled` / `soft_shadows_enabled` and source `radius` for shadow softness.

### Worked example
Topic: "Bayar ansuran telefon: RM3,600 jadi RM4,200" (illustrative; total = monthly × months).
- BEFORE frame brief light line: "moody lighting".
- AFTER colour key, setup 7 ("RM175 sebulan, 24 bulan" — illustrative, 175 × 24 = 4,200): level `dark` · lights `2` · sources `desk lamp above (key), phone screen (practical)` · hex `#fff3e6` key, `#cfe0ff` screen · shadow `soft, short, under the phone` · accent on "RM4,200" only.

### Check
- Does the brief state level, light count, sources, hex and shadow?
- Is the light count ≤ 3 for Style D?
- Does every light have a named source in the scene?
- Does the level match the colour-script tag?

## NOTES
- Visual gaps: no actual colour key sheet is shown in detail.
