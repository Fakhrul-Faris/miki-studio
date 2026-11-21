---
title: Duotone atmosphere background — warped noise field toned to two brand colours, then glow + chromatic edge
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/How To Create SaaS Explainer Ad in After Effects | For Beginners | +01 Hour Masterclass.txt"
source_time: "00:15–01:47 (wave world + CC Toner base), 01:47–02:28 (glow), 02:28–03:04 (pen-tool light line + blur), 02:53 (chromatic aberration finish)"
tool_target: raea
tier: full
use_when: "setting the backdrop for a scene that stays on screen a few seconds (a feature list, a stat), needs mood and depth but must never upstage the hero object or the UI accent"
style_fit: Fits — one toned field reads as atmosphere, not a competing shape; keep the duotone restricted to neutral + the single brand accent (not a second arbitrary hue); never let the noise or glow sit over the hero/accent copy.
---

## METADATA
06_Art_Direction | After Effects (Wave World ground sim + CC Toner + Glow + Chromatic Aberration) → raea noise shader / layered SVG blur-glow | raea

## CREATIVE_INTENT
The source builds its backdrop from a procedural ripple (Wave World ground simulation, viewed from directly above), blurs
it, then runs it through CC Toner set to "two-tone" with a pink/blue-to-dark-blue duotone remap instead of grayscale — so
the field reads as one coherent mood rather than literal water. A glow pass (threshold lowered, radius raised) blooms the
brightest ripples; a hand-drawn blurred stroke line adds a single soft light streak; the whole comp gets a light chromatic-
aberration pass at the very end so cuts and layers blend instead of looking stacked.

## STE_PROCEDURE
1. Generate a procedural ripple/noise field (any turbulence/simulation that yields varied luminance, not a flat gradient).
2. Blur it until individual ripples read as soft masses, not a texture.
3. Duotone-remap it: darkest values → the dark neutral, brightest values → the brand accent (two stops only).
4. Bloom the brightest values with a glow pass (lower the threshold so more of the field catches, raise radius for softness).
5. Add one hand-placed soft light streak (blurred stroke) so the field has a focal direction, not uniform noise.
6. Finish the whole composite with a very light chromatic-aberration pass so edges/cuts don't look pasted together.

## AGENT_EXECUTION
raea: a fragment-shader or layered-SVG noise field (fractal noise or a looping Perlin texture) composited with a
`feColorMatrix`/duotone remap, then a soft glow layer; chromatic aberration as a final 1–2 px RGB-channel offset over the
whole frame, used sparingly (not every scene). Shot-list row: `| 3 | "duit masuk automatik" | phone UI bg, duotone field | field blooms warmer toward "automatik"; chromatic finish on the cut in | this card`.
```tsx
// duotone noise field behind a UI card, brand accent only in the highlights
<filter id="duo"><feColorMatrix type="matrix" values={
  `0 0 0 0 ${rgb(C.ink).r}  0 0 0 0 ${rgb(C.ink).g}  0 0 0 0 ${rgb(C.ink).b}  0 0 0 1 0`
}/></filter>
<rect width="100%" height="100%" filter="url(#duo)"><!-- noise texture here --></rect>
<Bloom threshold={0.35} intensity={0.6} /> // bloom only the lit ripple peaks
```

### Worked example
Topic: a kedai runcit's phone app showing automatic end-of-day cash reconciliation (illustrative).
- BEFORE: the phone UI floats over a flat grey studio background — reads static.
- AFTER: behind the phone, a slow duotone ripple field (dark ink → warung-red accent in the highlights) blooms softly as
  the line "duit masuk automatik" lands, then settles; the field never crosses onto the phone screen itself.

### Check
- Are there only two tones (neutral + the one brand accent), never a rainbow or a second arbitrary hue?
- Does the glow catch only the brightest ripple peaks, not the whole field?
- Does the field stay behind the hero/UI, never overlapping the accent text?
- Is the chromatic-aberration pass subtle (not visible as an obvious RGB split)?

## NOTES
- Visual gaps: the exact CC Toner two-tone hex pair and glow threshold/radius numbers are shown on screen only, marked `~`.
- AE dropped: Wave World ground sim, CC Toner, Glow, Chromatic Aberration (Red Giant) — translated to a shader noise field,
  duotone colour matrix, raea `<Bloom>`, and a light channel-offset finish.
