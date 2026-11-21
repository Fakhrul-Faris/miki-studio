---
title: Grid size controls a light's spread (tight grid = narrow rim, wide grid = spreads down the body)
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/How to Light Like JACK BRIDGLAND – Layered Studio Lighting Techniques Explained.txt"
source_time: "09:00–09:54"
tool_target: raea
tier: full
use_when: "a rim/edge light must be confined to a small zone of the hero, vs. one that should wash a larger area"
style_fit: "Direct fit — gives a named, comparable control for how tightly a rim light clings to the macro object's edge, on top of what the backlit-disk-rim-light card already covers."
---

## METADATA
04_Shading_Lighting | Studio photography (physical grid/honeycomb accessory) | raea SpotLight `outer_angle`/`inner_angle` as the grid equivalent

## CREATIVE_INTENT
A physical lighting grid (honeycomb) narrows a light's spread without changing its size or softness — a #1 grid gives "a
really tight zone", a #3 grid "spreads the light a little more, filling into the space". The same light source, same
softness, same position reads as a tight, controlled rim at one grid size and a looser, more spilling rim at another. This
is a separate control from softness (size/radius) and from power — it only decides how far the light's effect travels
across the subject's surface before falling off.

## STE_PROCEDURE
1. Place and soften the rim/edge light first (position, size, colour) before touching grid/spread.
2. For a tight, controlled rim that only touches a small zone (an edge, a logo, a highlight), use the tightest grid/narrowest spread.
3. For a rim that should spill further down the body (a fuller silhouette edge), use a wider grid/spread.
4. Judge by solo'ing the light: a tight grid shows a thin, contained bright zone; a wide grid shows the light "spreading all the way down".
5. Do not confuell this with softness: a tight grid can still be a soft-edged light; it only limits how far the effect reaches, not how hard its edge is.

## AGENT_EXECUTION
**raea:** `SpotLight`'s `outer_angle`/`inner_angle` is the direct equivalent of grid size — a smaller `outer_angle` =
tighter grid (narrow zone); a larger `outer_angle` = wider grid (spreads down the body). `radius` + `soft_shadows_enabled`
stay the separate softness control:
```tsx
{/* tight grid: #1-equivalent — a narrow, contained rim zone */}
<SpotLight name="rim-tight" color="#dfe8ff" transform={Transform.fromXyz(0, 1.6, -1.2).lookingAt([0, 0.4, 0])}
  intensity={200_000} outer_angle={0.18} inner_angle={0.1} radius={0.3} soft_shadows_enabled />
{/* wide grid: #3-equivalent — spreads further down the subject */}
<SpotLight name="rim-wide" color="#dfe8ff" transform={Transform.fromXyz(0, 1.6, -1.2).lookingAt([0, 0.4, 0])}
  intensity={200_000} outer_angle={0.5} inner_angle={0.25} radius={0.3} soft_shadows_enabled />
```
Keep `radius` constant between the two to isolate the comparison to spread alone (as the source does when solo-comparing grids).

### Worked example
Topic: "logo kedai kopi bersinar di tepi" (illustrative; a coffee-shop logo's edge should catch light, not the whole cup).
BEFORE: `| 3 | "kedai kopi ini" | rim light washes the whole cup evenly | — | — |` — no focal point, everything equally lit.
AFTER: `| 3 | "logo kedai kopi" | a tight-grid rim (outer_angle 0.18) catches only the embossed logo's edge; the rest of the cup stays in the soft top key | logo edge brightens on "kedai kopi", rest of cup unchanged | grid-size-controls-rim-spread--lighting-jack-bridgland |`

### Check
- Is spread (outer_angle) tuned separately from softness (radius) and from power (intensity)?
- Does a tight-grid rim show a clearly smaller lit zone than a wide-grid version at the same position and power?
- Is the rim still the only light touching that zone (not overlapping the key's own coverage)?

## NOTES
- Visual gaps: no numeric grid sizes or exact angle values are given (physical grids are named #1/#3 by convention, not quantified); raea `outer_angle` values above are illustrative (`~`).
- Rule conflicts: none.
