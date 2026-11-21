# Addendum → masters/01_Animation_Motion/linear-vs-eased-interpolation.md
Source: "Minimalist Tech & SaaS 3D Staging/Apple-Style 3D Motion Design.txt" — 06:14–06:31 (snap), 33:08–33:21 (logo head start)

## Variants: one-frame snap and one-frame head start
- Snap: text parented to a null; two keys placed one frame apart for "a quick snappy movement" on top of its eased move.
  ⚠ reads as a pop → house: use only on an element already in motion (secondary accent), never as an entrance.
- Head start: the logo slowly scales away from camera; "select these two keyframes and move them one frame to the right,
  then make the first frame slightly larger" — frame 1 is already moving, "a bit sharper".
  House: this is the odd-moving-first-frame mechanism; size jump ≤ ~2–3 % so it doesn't pop.

## VALUES BY SOURCE row
| parameter | Apple-Style 3D Motion (AE) | recommended for Style D |
|---|---|---|
| snap | 2 keys 1 frame apart | avoid; or ≤ 2 f on a moving secondary only |
| head start | keys shifted +1 f, first frame slightly larger | start value offset ~2–3 %, eased out after |
