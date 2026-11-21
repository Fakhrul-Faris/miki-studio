---
title: Soft drifting glow blobs and a light drop shadow to give flat UI depth
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/How to do SMOOTH SAAS Animation Like Creatoroly | After Effects Tutorial.txt"
source_time: "08:34–10:05"
tool_target: raea
tier: principle
use_when: "flat UI scenes (white/light backgrounds) that look like a slide; giving the phone screen a sense of light"
style_fit: Fits as a UI-scene treatment; keep blobs tinted from the scene colour (not a second accent) and slow; in Style D 3D scenes use real lights instead.
---

## METADATA
06_Art_Direction | After Effects (source) → raea CSS | raea

## CREATIVE_INTENT
Two finishing touches make scene 1 feel lit: a drop shadow on the text (opacity ~40 %, size ~4), and two soft
"white gradients" — circles in a lighter tone of the background colour (eyedropper, then lighter), heavily Gaussian-blurred
(Repeat Edge Pixels off), one at the bottom and one at the top, sliding in slowly from the left.

## STE_PROCEDURE
1. Add a subtle shadow under text/cards (~40 % opacity, small size ~4 px).
2. Sample the background colour; make 2 circles a lighter tint of it.
3. Blur them heavily into soft blobs; place one low, one high.
4. Drift them slowly (position keys, eased) during the scene.
5. Check they never compete with the accent or the text.

## AGENT_EXECUTION
raea: `<div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: tint, filter: "blur(120px)", opacity: 0.6 }}>`
with an `x` track drifting ~80 px over the scene; text `textShadow: "0 4px 4px rgba(0,0,0,0.4)"` or `boxShadow` on cards.

### Worked example
Topic: a "Tabung kecemasan" app screen (RM50 a week × 52 = RM2,600, illustrative).
- BEFORE: flat white screen, black text — reads as a slide.
- AFTER: two pale-mint blobs drift behind the card, the card has a soft 40 % shadow; "RM2,600" stays the only saturated colour.

### Check
- Are blobs a tint of the background (not a new hue)?
- Is the drift slow enough to go unnoticed?
- Is the accent still the only saturated element?

## NOTES
- Visual gaps: blur amounts and positions are visual only.
