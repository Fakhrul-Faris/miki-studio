---
title: Infinite colour-cycling gradient blob background (loop via a time-driven gradient phase)
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/Motion Explainer Ads Masterclass | 3 Different Scenes | Part 2.txt"
source_time: "00:21–03:41"
tool_target: raea
tier: principle
use_when: "a soft, slowly shifting coloured backdrop for a title/hook card that must never look static but must stay behind the subject"
style_fit: "⚠ source uses 3 arbitrary hues (orange/pink/blue) cycling freely → adapted: restrict to neutral + the one brand accent only, and keep the cycle slow/subtle, never a full rainbow sweep."
---

## METADATA
06_Art_Direction | After Effects (gradient ramp + colour-remap effect, time-expression on phase) → raea shader gradient with a time-driven phase | raea

## CREATIVE_INTENT
A radial gradient ramp is recoloured (RGB preset remapped to custom hues) and then kept moving forever by putting a
`time*N` expression on the gradient's phase/offset property — so the colour field drifts continuously rather than
holding still. A masked inner-glow duplicate and a glow effect are layered on top for softness.

## STE_PROCEDURE
1. Build a radial/linear gradient field with 2 colour stops (not 3+ arbitrary hues — ⚠ adapted from source).
2. Drive one stop's position (or the gradient's whole phase) with `time * N` so it drifts continuously, looping cleanly.
3. Layer a soft inner-glow duplicate behind the subject for depth, blend mode overlay/lighten.
4. Keep the drift slow enough to read as ambient, not as an obviously animated background.

## AGENT_EXECUTION
raea: animate a gradient stop's offset with `f / fps` directly (no keyed start/end, just continuous drift), restricted to
neutral + accent:
```tsx
const phase = (f / 30) * 0.05;                       // slow continuous drift, ~0.05 cycles/s
<radialGradient id="bg"><stop offset={`${(phase * 100) % 100}%`} stopColor={C.accent} />
  <stop offset="100%" stopColor="#111" /></radialGradient>
```

### Worked example
Topic: a title card opening an episode about a kedai runcit's daily float.
- BEFORE: a flat dark background sits still under the hook text.
- AFTER: a slow accent-coloured glow drifts behind the hook text, never settling, never distracting from the text itself.

### Check
- Is the cycling field restricted to neutral + one brand accent (not 3 arbitrary hues)?
- Is the drift slow/ambient, not an obvious loop the eye tracks?
- Does the field stay behind the subject, never crossing over text or the hero?

## NOTES
- Visual gaps: exact original hue values and phase speed are visual only.
- AE dropped: Gradient Ramp + custom colour-remap effect + Deep Glow — translated to an SVG radial gradient with a
  continuously driven stop offset and a raea `<Bloom>` pass.
