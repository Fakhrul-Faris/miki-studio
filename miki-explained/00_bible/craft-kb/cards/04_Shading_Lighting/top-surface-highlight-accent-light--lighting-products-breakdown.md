---
title: Top-surface highlight light (small, narrow, only on the product's top)
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/Lighting Products in Blender (Breakdown).txt"
source_time: "01:05 (Dior point light), 03:30–03:40 (deodorant small area light)"
tool_target: raea
tier: full
use_when: "a glossy hero whose cap/lid/top edge goes dull under the soft top key (bottle cap, coin rim, card chip, phone edge)"
style_fit: "Fits Style D: a tiny shadowless support light that adds a highlight, not a second source; neutral colour; any change fades over ≥ 0.4 s."
---

## METADATA
04_Shading_Lighting | Blender (Cycles/Octane) | small Area (reduced spread) or Point → raea small RectLight / narrow SpotLight

## CREATIVE_INTENT
Both product scenes add one light whose only job is the top: in the Dior shot "a point light to highlight the perfume's
reflective surfaces, especially the top"; in the deodorant shot "a small area light to enhance these reflections, with its
**spread reduced so it only focuses on the top of the product**". The key shapes the body; this light makes the top
read as a glossy, finished part.

## STE_PROCEDURE
1. Finish the key and fill first; find the top surface that reads dull.
2. Add a small Area light (or a Point light) above and slightly in front of the top.
3. Reduce the Area light's Spread until only the top receives light (deodorant scene).
4. Position it by the reflection: move until the highlight sits on the top's curve as seen from camera.
5. Lower its power until the highlight is visible but the top is not brighter than the key's highlight.
6. Turn off its shadows if the engine allows (it should add highlight only).
7. Check from the camera: the rest of the product is unchanged with the light toggled.

## AGENT_EXECUTION
**Shot list:** add to the `cards` column of any macro setup on a glossy top. **Frame brief → Moves:** "cap glint stays put
while the camera drifts" (the glint slides naturally with the move).

**raea:**
```tsx
{/* small panel above the cap: soft highlight, no shadows */}
<RectLight name="capGlint" transform={Transform.fromXyz(0, 0.32, 0.08).lookingAt([0, 0.2, 0])}
  intensity={8_000} width={0.06} height={0.04} color="#ffffff" range={0.3} />
{/* or a narrow spot that only covers the top (≈ "reduced spread") */}
<SpotLight name="capSpot" transform={Transform.fromXyz(0, 0.5, 0.1).lookingAt([0, 0.2, 0])}
  intensity={20_000} outer_angle={0.08} inner_angle={0.03} range={0.7} />
```
The hero material needs low `perceptual_roughness` (0.1–0.3) on the top for the highlight to read. `range` ≈ 2× the
light-to-top distance. Values `~`.

### Worked example
Topic: "Botol kicap RM3.50 vs RM6: beza apa?" (illustrative).
BEFORE: `| 4 | "penutup merah tu" | macro on the cap under the top key | cap fades in | — |` — cap a flat red blob.
AFTER: `| 4 | "penutup merah tu" | macro 3/4 down on the cap; a 6×4 cm panel 12 cm above puts one curved glint along the rim | on "merah" the cap (accent) brightens 0.4 s, glint slides as camera dollies 5 cm | top-surface-highlight-accent-light--lighting-products-breakdown |`

### Check
- Does toggling this light change only the top?
- Is it shadowless and below the key's brightness?
- Is the top's material glossy enough for the highlight to show?
- Neutral colour (not a second accent)?

## NOTES
- Visual gaps: sizes, powers, positions on screen only (`~`). Spanish narration translated.
- Related: logo-catch-point-light--lighting-trick (same role, aimed at a logo).
