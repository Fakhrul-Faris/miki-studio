---
title: Stack a white inner glow with a soft drop shadow to lift a flat UI card off the background
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt"
source_time: "19:12–19:41, 21:35–22:26"
tool_target: raea
tier: principle
use_when: "a flat 2D UI card/panel/pill needs to read as slightly raised without going full 3D"
style_fit: Fits — cheap, legible-at-phone-size depth cue for UI-heavy scenes; keep both effects subtle (this is a elevation cue, not a bevel).
---

## METADATA
09_UI_Motion | After Effects Inner Glow + Drop Shadow layer styles (source) → raea CSS box-shadow pair | raea / HyperFrames

## CREATIVE_INTENT
Every flat rounded-rect UI element gets two stacked effects: a Drop Shadow below it (softness increased, opacity dropped
to `~`20–33%) to separate it from the background, and an Inner Glow (white, Normal blend, low visibility, size nudged
up) that reads as a soft top-light catching the panel's inner edge. Together they make a flat shape read as a card
sitting slightly above the surface, without a bevel or gradient fill.

## STE_PROCEDURE
1. Add a drop shadow under the panel; increase softness, keep opacity low (`~`20–33%).
2. Add an inner glow inside the same panel; white, Normal blend, kept subtle (low opacity/size).
3. Never stack more than these two — no bevel, no extra highlight layer.
4. Reuse the same two values across every card/panel in the scene for consistency.

## AGENT_EXECUTION
raea/CSS: `boxShadow: "0 10px 24px rgba(0,0,0,0.22), inset 0 1px 2px rgba(255,255,255,0.6)"` on the panel's container —
first shadow value is the drop shadow, the `inset` value is the inner glow. Keep both values fixed per episode as a
token (`UI.elevation.card`) rather than re-tuned per shot.

### Worked example
Topic: a phone UI card showing "3 tempahan baru" (3 new orders) for a small catering stall (illustrative count).
- BEFORE: the order card is a flat rounded rectangle with no shadow.
- AFTER: the same card gets a soft drop shadow and a faint white inner glow at its top edge — it now reads as a card
  resting slightly above the app background, still flat and clean.

### Check
- Is the shadow soft and low-opacity (not a hard black box)?
- Is the inner glow visible only as a faint top-edge lift, not a full bevel?
- Is the same pair of values reused on every card in the scene?

## NOTES
- Visual gaps: exact softness/opacity numbers beyond "~20–33%" are visual only.
- AE dropped: layer-style Inner Glow + Drop Shadow; translated to a single CSS `box-shadow` token.
