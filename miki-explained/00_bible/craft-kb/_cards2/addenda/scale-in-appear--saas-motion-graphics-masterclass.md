# Addendum → masters/01_Animation_Motion/scale-in-appear.md
Source: "Motion Feel, Easing & Camera Choreography/SaaS Motion Graphics Masterclass Techniques.txt" — 17:56–18:29

## Variant: same bounce expression pasted onto the shape's SIZE property (not scale) for a horizontal "liquid" squash
Instead of (or alongside) scaling the whole layer up from 0 with a bounce expression, the author pastes the identical
bounce expression onto the rectangle path's **Size** parameter. Because width and height can bounce independently of
the layer's own scale, this reads as the shape itself squashing/stretching horizontally as it settles — "it will add a
bit of like liquidy effect to it… it will bounce a bit in the horizontal direction which I think is a cool effect" —
distinct from a uniform scale bounce, which just resizes the whole layer evenly.

## VALUES BY SOURCE row
| parameter | SaaS Motion Graphics Masterclass (AE) | recommended for Style D |
|---|---|---|
| bounce target | shape's own `Size` (width independent of height) | animate `width`/`height` on separate eased tracks with a tiny settle overshoot, not a shared uniform scale |
| effect | reads as squash/stretch (liquid), not a resize | pairs with `cards/09_UI_Motion/xy-size-sliders-offset-shape-morph--apple-style-ui-face-id.md`'s width/height-offset idiom |
| house cap | uncapped bounce (reused expression) | ≤ 3–5 % overshoot on whichever axis settles last, ≥ 0.4 s, no oscillation |
