---
title: Colour emphasis that arrives after the line lands (white → accent blend on one word)
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/After Effects Text Animation Tutorial.txt"
source_time: "15:55–17:30"
tool_target: raea
tier: principle
use_when: "marking the key word of a designed line in the brand accent (the RM figure, the step's verb)"
style_fit: "⚠ source uses a yellow→purple gradient ramp → adapted: one brand accent (optionally accent → lighter tint of it); blend over ≥ 12 f, once."
---

## METADATA
09_UI_Motion | After Effects (source) → raea colour track | raea

## CREATIVE_INTENT
Emphasis by colour, timed: the word is a gradient-ramp colour, but "I would like to bring this gradient on as soon as the
whole sentence finishes… start in white and then goes into the gradient later on". Blend With Original is keyed 100 % →
0 % over a few frames starting when the sentence completes, eased (F9).

## STE_PROCEDURE
1. Reveal the whole line in the neutral text colour.
2. Wait until the last word has landed.
3. Blend the key word from neutral to the brand accent over ≥ 12 f, eased in-out.
4. Hold the accent until the line exits.

## AGENT_EXECUTION
raea: on the key word's span, `animate={{ color: track({ 0: "#ffffff", 12: ACCENT }, { curve: "in-out-cubic" }) }}`
inside an `<Animate at={lineEnd}>` where `lineEnd` = last word's frame + its entrance length. For a two-tone look use
`backgroundImage: linear-gradient(ACCENT, ACCENT_TINT)` with `backgroundClip: "text"` and fade its opacity over the white
copy (two stacked spans).

### Worked example
Designed line: "Bayar yang lagi murah."
- BEFORE: "murah" appears already in accent as it rises.
- AFTER: the full line rises white; 0.2 s after "murah" lands, it warms into the accent over 0.4 s as the voice ends.

### Check
- Does the colour change start only after the line has fully landed?
- Is it the one brand accent (no second hue)?
- Is the blend ≥ 0.4 s and played once?

## NOTES
- AE dropped: Gradient Ramp effect + Blend With Original keyframes; translated to a colour track.
- Related: `gradient-sweep-across-text--animate-text-gn.md` (moving sweep), `single-word-emphasis-secondary-move--ae-text-animation.md`.
