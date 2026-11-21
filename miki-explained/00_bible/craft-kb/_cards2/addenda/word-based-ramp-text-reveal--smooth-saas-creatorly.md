# Addendum → cards/09_UI_Motion/word-based-ramp-text-reveal--smooth-saas-creatorly.md
Source: "Motion Feel, Easing & Camera Choreography/Master SaaS Motion Graphics in 30 Minutes.txt" — 09:17–09:60, 28:38–29:13

## Confirming/extra values
A second, independent source uses the same recipe (Animate: Position + Opacity; range selector Advanced → Based on:
Words; Shape: Ramp Up; Ease Low: 100%; keyframe the Offset −100% → 100%) and adds explicit position/opacity deltas not
stated in the original card: position offset **50 px**, opacity **0 → 100%**. Confirms the recipe is reusable as a
preset ("we can save this as a preset... or copy this over and paste it onto our text") across multiple text blocks in
one piece, each simply re-timed (offset a bit later per block) rather than re-authored.

## VALUES BY SOURCE row
| parameter | Smooth SaaS Creatorly (AE) | Master SaaS Motion Graphics (AE) | recommended for Style D |
|---|---|---|---|
| position offset | 75 px | 50 px | 50–75 px, scale to text size |
| ease | high 25 / low 100 | low 100 (high unstated, likely 0) | ease-out curve, house in-out rule |
| base on | words | words | words (never characters, for body/label text) |
| reuse | — | explicitly saved/copied as a preset across multiple blocks, each re-timed | implement as one shared text-reveal component, parametrised by start frame |
