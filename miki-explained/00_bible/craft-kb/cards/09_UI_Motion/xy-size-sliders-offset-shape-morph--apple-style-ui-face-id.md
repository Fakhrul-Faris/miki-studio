---
title: Button shape morph from separate width and height controls, the second started a few frames later
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/Create Apple-Style UI Motion Graphics in After Effects + Free Project File.txt"
source_time: "00:27–02:48 (sliders, circle → pill), 08:13–09:44 (press: pill → square, roundness, colour)"
tool_target: raea
tier: full
use_when: "UI buttons/cards/pills that appear or change state (pay button, toggle, QR card) in UI-heavy scenes"
style_fit: Fits — the shape itself changes state; ⚠ source applies a decaying bounce expression to these sliders → adapted: eased settle, overshoot ≤ 3–5 % over ≥ 0.4 s or none.
---

## METADATA
09_UI_Motion | After Effects (source) → raea width/height/borderRadius tracks | raea

## CREATIVE_INTENT
The button's Size is linked to two sliders, X and Y. The button enters by scaling up from 0 on a parent null; then X is
animated and, "a few frames later", Y — "this small offset will make the animation feel much more alive". X is tweaked so
the button "starts as a circle and then expands into its final shape" (pill). On press, X then Y animate again (a few
frames apart) to turn it into a square, roundness animates to remove the corners, and the box colour and shadow colour
change at the press.

## STE_PROCEDURE
1. Drive the button's width and height from two separate controls.
2. Enter: grow the button from 0 as a circle (width = height).
3. Animate width out to the pill width.
4. Start the height animation 2–4 frames after the width (offset makes it feel alive).
5. On a state change, animate width then height again toward the new shape, plus corner radius.
6. Change fill and shadow colour on the same frames as the state change.
7. Ease every key; settle with no or ≤ 3–5 % overshoot.

## AGENT_EXECUTION
raea: tracks on `width`, `height`, `borderRadius`, `backgroundColor` (raea guide animating):
```tsx
const w = interpolate(f, [a, a + 14], [120, 520], { ...CL, easing: out });
const h = interpolate(f, [a + 3, a + 17], [120, 140], { ...CL, easing: out });  // +3 f offset
<div style={{ width: w, height: h, borderRadius: Math.min(w, h) / 2, background: C.accent,
  boxShadow: "0 12px 30px rgba(0,0,0,0.18)" }} />
```
Shot row: `| 6 | "tekan Bayar" | phone UI close | Bayar pill grows from a dot, width then height; on "tekan" it squares off and turns green | this card |`.

### Worked example
Topic: paying RM8.40 at a mamak via e-wallet QR (illustrative amount; QR payment confirmation is real).
- BEFORE: a "Bayar" button fades in, then turns green.
- AFTER: a dot appears, stretches into the "Bayar" pill (height follows 3 f later); on "tekan" it squares off, corners
  sharpen and fill turns green with its shadow, as "RM8.40" settles inside.

### Check
- Are width and height animated separately with a 2–4 f offset?
- Does the shape change mean something (state), not decoration?
- Is overshoot none or ≤ 3–5 % over ≥ 0.4 s?

## NOTES
- Visual gaps: slider values and exact frames visual only; bounce expression in description only (decay 12 default,
  7 on sliders, 10 on text/click) — see addendum `addenda/scale-in-appear--apple-style-ui-face-id.md`.
- AE dropped: expression links (pick-whip size → sliders); translated to raea tracks.
- Also: author checks spacing with a low-opacity red solid (see "spacing gauge" card).
