# Addendum → masters/01_Animation_Motion/scale-in-appear.md
Source: "Minimalist Tech & SaaS 3D Staging/How to Create Viral Apple-Style UI Widget Animations in After Effects! (Apple Masterclass Part 2).txt" — 02:41–04:52 (manual spike method, Bounce R plugin values), 16:10–19:25 (position/rotation overshoot on a UI card and a flying icon)

## Variant: manual two-key "spike" bounce, and the free Bounce R plugin's exact overshoot values (⚠ house cap)
Manual method: ease the main scale-in curve fast-start/slow-end, then add one extra keyframe above the end value partway
through ("increases in the scale and then comes back down, which is actually how the bounce works"), smoothing the whole
spike so only the tail stays slow. Plugin method (Bounce R, free): apply to linear keyframes on a property (scale,
position or rotation — "you could basically do this with every other property"), click Overshoot+ then Bounce it, then
tune **frequency** (how many oscillations — author settles on 2), **amplitude** (bounce strength — ~50), and **decay**
(stiffness — raised to ~7 for a stiffer, less floppy bounce). Also applied, unchanged in kind, to a UI card's incoming
position (fast-start/slow-end + one extra key making it overshoot then settle) and to a flying icon's rotation (peaks at
a small angle mid-flight before settling to 0°) — the same spike-and-smooth shape generalised to any property, not just scale.

## VALUES BY SOURCE row
| parameter | Apple-Style UI Widget Animations | recommended for Style D |
|---|---|---|
| method | manual 1-extra-key spike, or Bounce R plugin | capped single-overshoot curve (no plugin) |
| plugin frequency | 2 oscillations | 0 (house bans oscillation) |
| plugin amplitude | ~50 | n/a — use bezier overshoot instead |
| plugin decay | ~7 (stiffer) | n/a |
| applies to | scale, position, rotation — any linear-keyed property | same breadth: any track can take the capped overshoot shape |
| paired easing | fast start / slow end on the outer curve regardless of bounce | keep; this part is house-compliant already |

## AGENT_EXECUTION note
Do not port the oscillating bounce (2 cycles, amplitude 50) — it is exactly the "bouncy spring" the house rules ban.
Port only the *shape*: fast-in, one small overshoot (≤ 3–5 %, already in the master's bezier `0.34, 1.12, 0.64, 1`),
settle, no second oscillation — and the fact that the same curve shape is reused across scale, position AND rotation
tracks on one element (e.g. a UI card's position and a flying icon's rotation), not just scale.
