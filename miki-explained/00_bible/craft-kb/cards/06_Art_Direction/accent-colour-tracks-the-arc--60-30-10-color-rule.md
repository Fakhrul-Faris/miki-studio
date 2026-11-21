---
title: The 10 % accent's own colour carries the beat's feeling — and shifts with the arc
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Understanding the 60-30-10 Color Rule | Applying Color Theory to Film.txt"
source_time: "03:06–04:14"
tool_target: frame-brief
tier: full
use_when: "planning the accent across the episode: problem beats vs payoff beats, gain vs loss"
style_fit: "⚠ conflict: the Style D accent hue is fixed (the brand colour) → adapted: keep the hue, shift its brightness/saturation and glow per beat (dimmer on loss, full on payoff); the 10 % stays reserved for the subject."
---

## METADATA
06_Art_Direction | film / animation colour (tool-agnostic) | frame brief (Feeling) + raea material emissive/light per shot

## CREATIVE_INTENT
Genndy Tartakovsky (Samurai Jack, Primal) reserved the 10 % almost exclusively for his characters, using the other two
colours for vast but simple landscapes, so the characters command attention "no matter how big or small they actually
appeared". An even more important use of the 10 % is the choice of colour itself: in La La Land, Mia is happy, in love,
full of energy, so her outfit is yellow; swap it for something darker and the tone turns "less magical and more
realistic" — and the film does exactly that, her costumes growing darker as her dream life unravels.

## STE_PROCEDURE
1. Before the frame briefs, reserve the accent for the line's subject only, at any screen size.
2. Map the script's arc: mark each line problem/loss or payoff/gain.
3. Give payoff lines the full accent (full saturation, emissive glow).
4. Give problem/loss lines a darker, lower-saturation accent of the same hue (~−30–50 % value ~).
5. Change the accent's state between setups by an eased change (≥ 0.4 s), never a jump mid-shot.
6. Keep the background (60 %) and secondary (30 %) simple so even a small accented subject wins.

## AGENT_EXECUTION
Frame brief **Feeling** adds "accent level: full / dim". raea: per-shot accent lives on the subject's material and the
light that hits it — `<Grade>` holds its first frame for the whole piece (post.md), so it cannot track the arc.
```tsx
const ACC = Srgba.hex("#ff7a1a");                    // brand accent (example)
const level = beat === "loss" ? 0.6 : 2.0;           // ~ emissive multiplier per beat
<StandardMaterial base_color="#202020" emissive={LinearRgba.from(ACC).mul(level)} />
```
### Worked example
Topic: "Kenapa kedai makan tutup dalam tahun pertama?" (S16-style; illustrative numbers).
- BEFORE: the brand-orange accent at full glow on every line, from "sewa RM 3,000" (loss) to "untung balik" (payoff).
- AFTER: L02–L05 (rent, waste, debt): orange on the RM figures but dim, no bloom; L07 "untung balik bila menu dipotong
  separuh": the same orange at full glow on the shortened menu. The arc reads in colour with the sound off.
### Check
- Is the accent only on the line's subject in every setup?
- Does accent intensity follow the arc (dim on problem, full on payoff)?
- Is the hue always the brand colour?

## NOTES
- Visual gaps: film frames on screen only; the dim level (~−30–50 %) and emissive multipliers are inferred.
- Other techniques in this video (60/30/10 split, secondary similar vs contrasting) are in the addendum to
  `sixty-thirty-ten-colour-split--60-30-10-color-rule.md`.
