# Addendum → masters/01_Animation_Motion/scale-in-appear.md
Source: "Minimalist Tech & SaaS 3D Staging/Create Apple-Style UI Motion Graphics in After Effects + Free Project File.txt" — 01:09–02:48, 04:13, 07:29, 18:46
Also: "Minimalist Tech & SaaS 3D Staging/How to do SMOOTH SAAS Animation Like Creatoroly | After Effects Tutorial.txt" 02:02–02:41 (bounce expression on text position, code in description only — no values)

## Variant: decaying-bounce expression on scale-in (⚠ house cap)
Button scales up from 0 on a null with a pasted bounce (inertia) expression; decay 12 default; 7 on the size sliders
(looser), 10 on the text-scale null and the click null; also applied to the Face ID comp scale-in. Text enters
blurry → sharp (Fast Blur keyed, F9 easy ease) with the scale.

## VALUES BY SOURCE row
| parameter | Apple UI Face ID (AE) | recommended for Style D |
|---|---|---|
| overshoot method | bounce expression, decay 12 / 10 / 7 (lower = more wobble) | no oscillation: one overshoot ≤ 3–5 % or none (bezier 0.34, 1.12, 0.64, 1 capped), ≥ 0.4 s |
| paired fade | fast blur blurry→sharp + opacity | blur 10–12 px → 0 with the grow |
| raea | — | `<Animate enter="pop">` defaults to 1.08 (8 %) — tune `pop({ peak: 1.03 })` or use `rise` |
