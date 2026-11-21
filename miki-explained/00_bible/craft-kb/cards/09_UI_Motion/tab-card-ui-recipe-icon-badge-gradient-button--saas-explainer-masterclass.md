---
title: Tab/card UI build recipe — rounded panel + icon badge + two text rows + shadow, gradient-fill action button
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt"
source_time: "18:04–20:14, 22:46–24:18, 31:44–32:42"
tool_target: raea
tier: full
use_when: "building any card-style UI element (a note, a task, an order row) from scratch for a UI-heavy scene"
style_fit: Fits — a reusable component recipe; keeps our UI flat and legible at phone size if palette stays to one accent + neutrals.
---

## METADATA
09_UI_Motion | After Effects shape-layer stack + layer styles (source) → raea component | raea

## CREATIVE_INTENT
A reusable card is built in layers: a background rounded-rect (back layer, slightly larger, lower opacity) behind a
white "main" rounded-rect, both parented to one null so they scale together; a stroke-only duplicate of the main shape
adds a hairline border. Inside, a square "icon tile" (own fill + inner glow) sits beside two stacked text rows (title +
meta line at lower opacity). A separate action button ("Ask AI") is a pill with a linear gradient fill (two tones of one
hue) and an inner glow, plus a small icon badge beside its label. Every piece is pre-composed once so the whole card can
be duplicated and retexted.

## STE_PROCEDURE
1. Build two stacked rounded rects: a slightly larger low-opacity "back" layer and a white "main" layer on top, both
   parented to one null.
2. Add a stroke-only duplicate of the main shape for a hairline border (very low opacity, e.g. `~`7–10%).
3. Place an icon tile (rounded square, own fill + inner glow) at one side; stack a title row and a lower-opacity meta
   row beside it.
4. For an action button, fill with a linear gradient of one hue (not two different hues) and add an inner glow.
5. Pre-compose the finished card once; duplicate + retext for every instance instead of rebuilding.

## AGENT_EXECUTION
raea component: `<Card><IconTile glow /><Column><Text weight="bold">{title}</Text><Text opacity={0.5}>{meta}</Text></Column></Card>`
with `Card` styles `{ background: "#fff", borderRadius: 20, boxShadow: cardElevation, border: "1px solid rgba(0,0,0,0.08)" }`;
button `{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, borderRadius: 999 }`. Shot row:
`| 3 | "tambah pesanan" | phone UI, order list | new order card builds in: icon tile, title, meta row, "Hantar" gradient button | this card |`.

### Worked example
Topic: a small bakery's order-queue UI showing "Kek coklat — RM45" (illustrative price).
- BEFORE: a plain white rectangle with text pasted on top.
- AFTER: a card with a subtle back-layer + hairline border, a cake icon tile with its own glow, "Kek coklat" bold over
  "RM45 · baru" in lower-opacity meta text, and a gradient "Sahkan" (confirm) button beside it.

### Check
- Is the card built from the back/main/stroke stack, not a single flat rectangle?
- Is the meta row visibly lower-opacity than the title?
- Is the button's gradient one hue family, not two unrelated colours?

## NOTES
- Visual gaps: exact corner-radius and opacity percentages beyond those stated are visual only.
- AE dropped: layer-style Inner Glow/Drop Shadow, pre-compose chaining; translated to a single raea `Card` component with
  a CSS box-shadow/gradient token set.
