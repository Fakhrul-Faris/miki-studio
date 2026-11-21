---
title: Button press feedback is scale-down-then-up + a darken dip — never scale-up or lighten (named common mistake)
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Master SaaS Motion Graphics in 30 Minutes.txt"
source_time: "13:16–15:27"
tool_target: raea
tier: full
use_when: "any tappable UI element (button, toggle, card) needs its own press-confirmation feedback, independent of any cursor/tap-ring animation"
style_fit: "Fits — matches the house 'state change, not decoration' rule; the explicit mistake-to-avoid is directly useful since our default instinct would be to scale up/brighten on press."
---

## METADATA
09_UI_Motion | After Effects (scale key + Exposure effect key) → raea scale + brightness track on the button itself | raea

## CREATIVE_INTENT
"A mistake that a lot of editors and motion designers make is they scale the button up once it gets clicked, or they
make it lighter. It needs to be darker and it needs to go in." The button (with its label parented/linked to it so text
moves as one) scales down slightly on contact and back up, while an exposure key drives it dark then back to normal
across the same frames — darkening, not lightening, is what reads as "pressed in," matching how a real physical button
looks when depressed. This is the target's own feedback, separate from any cursor animation riding into it.

## STE_PROCEDURE
1. Link the button's label to its shape so both move together under press feedback.
2. On the press frame, key scale down a small amount, then back up — in, not out.
3. On the same frames, key an exposure/brightness drop to dark, then back to normal.
4. Never scale the button up or brighten it on press — that reads as the opposite of a push.
5. Slow the whole dip slightly (drag keys out) if it reads as too snappy/harsh.

## AGENT_EXECUTION
raea: a small scale dip plus a brightness multiplier, both keyed to the press frame, applied to the button + its label
as one group:
```tsx
const p = word("tekan");
const scale = interpolate(f, [p, p + 3, p + 8], [1, 0.94, 1], { ...CL, easing: inOut });
const bright = interpolate(f, [p, p + 3, p + 8], [1, 0.55, 1], { ...CL, easing: inOut });
<div style={{ transform: `scale(${scale})`, filter: `brightness(${bright})` }}>{button}{label}</div>
```

### Worked example
Topic: tapping "Hantar" (send) to submit a kedai runcit stock order (illustrative UI).
- BEFORE: "Hantar" scales up 5% and brightens on tap.
- AFTER: "Hantar" dips to 94% scale and darkens briefly on "tekan," then recovers — reads as a physical press, not a
  decorative pop.

### Check
- Does the button scale down (not up) on press?
- Does it darken (not lighten) on press?
- Is the label linked so it moves with the button rather than sitting still while the shape dips?
- Is the dip quick enough to read as a press, not a slow fade?

## NOTES
- Visual gaps: exact exposure stop value beyond "really dark" is visual only; use enough brightness drop to clearly
  read as "pressed," tuned by eye.
- AE dropped: the Exposure effect — translated to a CSS/shader `brightness()` multiplier, a direct equivalent.
- Distinct from `cursor-press-dip-and-ride-along--smooth-saas-creatorly.md`, which is the cursor/tap-ring's own
  feedback; this card is the target element's feedback and the two can be used together.
