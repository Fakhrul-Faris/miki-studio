# Addendum → cards/09_UI_Motion/word-based-ramp-text-reveal--smooth-saas-creatorly.md
Source: "Minimalist Tech & SaaS 3D Staging/How to Create Viral Apple-Style UI Widget Animations in After Effects! (Apple Masterclass Part 2).txt" — 09:01–09:53

## Variant: letter-level (not word-level) range selector, with counter-eased ramp edges
Same mechanism (range selector animator: position starts low, opacity 0%, blur 10, shape Ramp Up) but Advanced > Units
is set to **Index** so the ramp runs per letter instead of per word — a tighter, more granular cascade for short words
("exercise", "progress with Apple"). Because Ramp Up smooths the curve, it also distorts the keyed values, so the author
re-sets Start/End after switching the shape; and because the ramp shape itself eases the start, the entry is additionally
slowed and the exit sped up on the animator's own ease controls to counteract the ramp's bias — "slow down the entry and
speed up the exit just to counteract the ramp up movement."

## VALUES BY SOURCE row
| parameter | Apple-Style UI Widget Animations | recommended for Style D |
|---|---|---|
| unit | Index (letters) | per-word for lines ≥ 3 words (readability); per-letter only for a single short word/label |
| shape | Ramp Up | same |
| end-value fix order | set End=0 first, then raise Start to 100 at the end frame (ramp distorts if set in the other order) | n/a — raea has no equivalent ordering trap; just interpolate 0→1 directly |
| ease counter-correction | slow the entry easing, speed the exit easing to offset Ramp Up's own bias | bake directly into one asymmetric easing curve (e.g. `Easing.inOut` with a steeper out) rather than stacking two corrections |
| paired properties | position (start low), opacity 0%, blur 10 | identical to the word-level card's values |

## AGENT_EXECUTION note
raea: same `Stagger`/`rise` idiom as the master card, with `each` reduced so letters (not words) are the unit — e.g.
`each={1}` over a shorter per-letter duration (≥ ~6–8 f @30 fps) so a short word still completes within ~0.5 s; reserve
this for a single hero word, not a full line (a full line at letter granularity reads busy on a phone).
