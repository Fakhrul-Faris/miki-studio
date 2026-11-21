---
title: Colour-key a flat PNG character off its white card, add a rim stroke and a gradient circle badge
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt"
source_time: "1:03:11–1:06:25"
tool_target: raea
tier: full
use_when: "turning a flat avatar/sticker PNG into a clean floating badge for a UI scene (status avatars, reaction icons)"
style_fit: "⚠ source characters are Apple Memoji/emoji faces → adapt: use an abstract avatar shape (initials, colour chip, icon), never a human-like face, per no-hand-drawn/coded-people rule."
---

## METADATA
06_Art_Direction | After Effects Color Key + Edge Thin + Inner Glow (source) → raea pre-masked asset / SVG | raea

## CREATIVE_INTENT
A flat character PNG (captured on a white card) gets Color Key on white to drop the background; colour tolerance is
raised until the white card is gone, but not so far it eats the character's own white areas. Edge Thin is lowered to
leave a smooth white rim around the cutout (too much removal "can harm the character"). A circle shape (solid or linear
gradient) sits behind it as a colour badge, with its own stroke at low opacity. Each finished badge is pre-composed once
so it can be duplicated for every variant.

## STE_PROCEDURE
1. Shoot/source the flat character on a plain white card.
2. Key out the white with Color Key; raise tolerance until the card is gone, watching the character's own white areas.
3. Lower Edge Thin only enough to leave a clean white rim, not to eat detail.
4. Put a solid or gradient-filled circle behind the cutout as its badge colour; give the circle a thin low-opacity stroke.
5. Pre-compose character + badge once; duplicate the pre-comp per instance and recolour only the badge.

## AGENT_EXECUTION
raea: pre-mask the asset at build time (alpha PNG or SVG), never key live; badge as `<circle>`/`div` with a radial
gradient fill behind the asset, one accent-derived hue per instance. `<div style={{ borderRadius: "50%", background: grad(hue), boxShadow: `inset 0 0 0 1px rgba(255,255,255,${strokeOp})` }}><img src={avatar} /></div>`.

### Worked example
Topic: three regulars reacting to a kedai kopi's new price list on a chat-style UI (generic names, no real people).
- BEFORE: three generic circular avatar PNGs sit flat on the screen.
- AFTER: each avatar is a clean cutout (rim intact, no white fringe) sitting on its own gradient badge colour, reused
  from one pre-built template per person.

### Check
- Is there no white fringe left around the cutout?
- Is the badge one colour family per character, not random hues?
- Does the asset avoid a human-like face (abstract shape/initials instead), per house rule?

## NOTES
- Visual gaps: exact tolerance/edge-thin percentages are visual only.
- Rule conflict: source uses literal Memoji faces; adapted to abstract avatar badges — never build or trace a face.
- AE dropped: Color Key, Edge Thin; translated to pre-masked art, since raea renders real-time (no live keying pass).
