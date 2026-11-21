---
title: Four-point sparkle accents around a UI pop (tapered poly-star, rotate + fade in)
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How to do SMOOTH SAAS Animation Like Creatoroly | After Effects Tutorial.txt"
source_time: "05:51–08:34"
tool_target: raea
tier: principle
use_when: "rarely: one success beat in a UI scene (payment done, saving shown) — never as general decoration"
style_fit: "⚠ conflict: sparkles are a decoration cliché ('if it could be a slide, it's slop'; one meaningful accent) → adapted: at most one sparkle cluster per episode, only on a success/result beat, in the accent or white, ≥ 0.4 s fade."
---

## METADATA
09_UI_Motion | After Effects (source) → raea SVG | raea

## CREATIVE_INTENT
Small four-point stars (Polystar, 4 points, white fill, roundness ~20 %) with one point dragged with the pen to taper
it; each animates position, opacity 0 → 100 and rotation, is parented to the scene controller, and is split and
recoloured where the colour field passes. Five stars sit around the text.

## STE_PROCEDURE
1. Draw a 4-point star; taper one point slightly so it looks hand-placed.
2. Place 3–5 small stars around the element that just changed (one cluster).
3. Animate each in with opacity + rotation + small drift, eased, staggered 2–4 f.
4. Parent them to the scene controller so they follow the camera push.
5. Remove them when the beat ends (fade ≥ 0.4 s).

## AGENT_EXECUTION
raea: inline `<svg>` path star, wrapped in `<Animate enter="fade">` plus a `rotate` track (e.g. −30° → 0) and `Stagger each={3}`.
House: use only on the payoff beat; in Style D 3D scenes prefer a real specular glint (bloom on a highlight) instead.

### Worked example
Topic: savings from bringing your own container to a kopitiam (illustrative: RM0.20 × 20 days = RM4).
- BEFORE: sparkles around every UI card in the video.
- AFTER: one cluster of three white sparkles appears only when "RM4 jimat" lands, fades out with the card.

### Check
- Is there at most one sparkle beat in the episode, on a result?
- Do sparkles fade/rotate in over ≥ 0.4 s (no pop)?
- Would the frame still read without them?

## NOTES
- Visual gaps: star positions and exact rotation values are visual only.
