---
title: Colour-matched blurred duplicate behind text as a single-colour glow (not a drop shadow)
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt"
source_time: "09:30–10:45"
tool_target: raea
tier: principle
use_when: "making a headline word pop on a flat background without adding a drop-shadow effect"
style_fit: Fits — one accent colour, built from the type itself, no generic effect; keep opacity low so it reads as glow, not a double-printed word.
---

## METADATA
06_Art_Direction | After Effects duplicate + fast box blur + opacity (source) → raea CSS/SVG filter blur | raea / HyperFrames

## CREATIVE_INTENT
The hero word's colour is set to the prop/scene accent (darker variant). A duplicate of that same text layer sits behind
it, blurred (fast box blur), with its black channel removed so only the coloured blur remains, opacity dropped to
~30–35%, and faded in. The effect reads as a soft coloured halo around the word rather than a generic drop shadow.

## STE_PROCEDURE
1. Set the word's colour to the scene's accent (a darker tone that still contrasts the background).
2. Duplicate the text layer; place the duplicate directly behind the original.
3. Blur the duplicate; keep only its colour (no dark/black channel), not a grey shadow.
4. Drop the duplicate's opacity to `~`30–35%.
5. Fade the duplicate in with the word, not before it.

## AGENT_EXECUTION
raea/CSS: `<span style={{ position: "relative" }}><span style={{ position: "absolute", filter: "blur(14px)", color: C.accentDark, opacity: 0.32 }}>{word}</span><span style={{ color: C.accentDark }}>{word}</span></span>`,
opacity track shared with the word's entrance. HyperFrames: duplicate the text node, add an SVG `feGaussianBlur`, no
drop-shadow filter.

### Worked example
Topic: "RM50 untung" (RM50 profit) headline on a stall's daily tally (illustrative amount).
- BEFORE: "RM50 untung" fades in with a generic AE-style drop shadow.
- AFTER: "RM50 untung" is coloured in the stall's accent; a blurred, same-colour duplicate glows softly behind it at
  ~32% opacity, both fading in together.

### Check
- Is the glow the same hue as the text, not grey/black?
- Is opacity capped around 30–35% so it doesn't double-print the word?
- Does the glow fade in with the text, not as a separate beat?

## NOTES
- Visual gaps: exact blur radius is visual only.
- AE dropped: Fast Box Blur + manual black-channel removal; translated to a CSS/SVG blur filter on a coloured duplicate.
