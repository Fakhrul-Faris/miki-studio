# Addendum → cards/09_UI_Motion/word-based-ramp-text-reveal--smooth-saas-creatorly.md
Source: "Motion Feel, Easing & Camera Choreography/SaaS Motion Graphics Masterclass Techniques.txt" — 50:21–51:25

## Variant: pair the per-word opacity ramp with a synced Gaussian blur key, text forming "out of light" over a glow/orb
Over the glowing orb (see `cards/06_Art_Direction/organic-light-orb-from-displaced-shapes--saas-motion-graphics-masterclass.md`),
text is revealed with the same word-based range-selector opacity ramp as the existing master card, but starting from a
low visible floor (opacity set to ~15%, not 0%, "so it's already a bit visible") rather than fully invisible, and
paired with a **Gaussian blur keyed 25 → 0** on the same span. Combined, the line reads as forming out of the light
itself rather than sliding/fading in on a flat panel — a variant application for a glowing/voice-presence visual
rather than a UI card.

## VALUES BY SOURCE row
| parameter | SaaS Motion Graphics Masterclass (AE) | recommended for Style D |
|---|---|---|
| opacity floor | ~15 % at rest (not 0) | start the word's opacity track at ~0.15 instead of 0 when it sits over a glow, so it never reads as a hard pop-in |
| paired blur | Gaussian 25 → 0 px, same span as the word-based opacity ramp | blur track `25 → 0` alongside the existing card's `blur 10 → 0` — use the higher value (25) only over a bright/glowing background where more softening is needed to avoid a harsh edge |
| context | text over a glowing orb (voice/AI presence), not a flat UI card | keep to the same ≥ 0.4 s per word, ~1 s per line budget as the master card |
