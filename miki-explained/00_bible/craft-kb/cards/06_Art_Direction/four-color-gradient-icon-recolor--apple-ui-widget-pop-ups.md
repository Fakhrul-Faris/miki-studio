---
title: Four-colour gradient turns a flat stock icon into a re-colourable tri-tone object
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/How to Create Viral Apple-Style UI Widget Animations in After Effects! (Apple Masterclass Part 2).txt"
source_time: "02:24–02:41 (running icon), 14:35–15:23 (speedometer icon), 24:15–24:35 (water droplet swap)"
tool_target: raea
tier: full
use_when: "a downloaded/stock line icon (a person running, a speedometer, a droplet) needs to match the episode's flat tri-tone UI look before it animates"
style_fit: "Fits — keeps icons on one restrained palette (white/gray/dark-gray) so the single accent colour still reads as the one saturated thing on screen; swap the whole recolour, never mix outside colours in."
---

## METADATA
06_Art_Direction | Flaticon asset + After Effects 4-Color Gradient (source) → raea SVG fill/gradient | raea

## CREATIVE_INTENT
A downloaded flat icon (a running man, a speedometer, a water droplet) arrives in its own arbitrary colours. Rather than
hand-paint it, a "four color gradient" effect is applied to the whole icon: anchor 1 set bright white, 2 a mid gray, 3 a
"light bluish white", 4 a dark gray — turning any stock icon into the house's flat tri-tone look in one step, reusable on
every icon the episode imports. Swapping icons (running man → water droplet → bicep) means copying the same gradient
setting across, so every icon in a sequence shares identical shading.

## STE_PROCEDURE
1. Before colouring a stock icon, strip its own colours (tint/fill override) to flat white.
2. Apply a 4-point gradient map: point 1 white (near-full), point 2 mid gray, point 3 light tinted white, point 4 dark gray.
3. Nudge the blend amount slightly until the icon reads with gentle shading, not flat silhouette.
4. When swapping to a new icon in the same slot, copy this exact gradient setting onto the new one so the look matches.
5. Reserve full saturation (the accent colour) for the surrounding ring/stroke/text, not the icon fill itself.

## AGENT_EXECUTION
raea: bake the icon as an inline SVG path (or `Model`/`Mesh3d` if 3D) and drive its fill with a 2–4 stop linear/radial
gradient using the kit's neutral tones, reused across every icon in the episode:
```tsx
const neutral = { a: "#ffffff", b: "#c9cbce", c: "#eef0f2", d: "#4a4d52" };  // tri-tone map, episode-wide
<svg><defs><linearGradient id="iconTone" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0%" stopColor={neutral.a} /><stop offset="35%" stopColor={neutral.b} />
  <stop offset="65%" stopColor={neutral.c} /><stop offset="100%" stopColor={neutral.d} />
</linearGradient></defs>
<path d={iconPath} fill="url(#iconTone)" /></svg>
```
Shot row: `| 4 | "jom tengok untung harian" | phone UI icon row | runcit-icon recoloured to the tri-tone map, same gradient reused on every icon this episode | this card |`.

### Worked example
Topic: a kedai runcit's daily sales dashboard (illustrative numbers).
- BEFORE: a downloaded cash-register icon keeps its original green-and-orange stock colours, clashing with the UI.
- AFTER: the icon is remapped to the house white→gray→dark-gray tones before it appears; only the ring around it carries
  the episode's accent (red).

### Check
- Does every stock icon in the episode share the same tri-tone gradient map?
- Is full saturation reserved for the accent element (ring/stroke/number), not the icon fill?
- Does a new icon swapped into the same slot keep the identical recolour (no mismatch)?

## NOTES
- Visual gaps: exact anchor-point colour values and blend-amount percentage are on-screen only (named loosely: "bright
  white", "a gray", "light bluish white", "dark gray too").
- AE dropped: 4-Color Gradient effect (procedural multi-stop recolour); translated to a static SVG gradient fill since
  our icons are drawn, not photographed stock assets.
