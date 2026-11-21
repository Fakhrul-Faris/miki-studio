# Addendum → cards/09_UI_Motion/edge-light-sweep-around-ui-panel--smooth-ui-animation.md
Source: "Motion Feel, Easing & Camera Choreography/SaaS Motion Graphics Masterclass Techniques.txt" — 13:10–16:09

## Variant: two mirrored sweeps (0° and ±180°) at different, lower intensities, for a two-sided subtle edge glow on a line/node
Rather than one light sweep circling a panel's rim, this source applies **two** CC Light Sweeps to the same shape:
one at direction 0°, a duplicate flipped to direction ±180° ("so you will have the other side"). Run at full/matching
intensity they read "too much"; dialled down and made asymmetric (one pair at 25/25, the other at 7/7) they give a
subtle two-sided glow suited to a thin connector line or small node rather than a whole panel's rim. Pitfall flagged
by the author: CC Light Sweep's position is **comp-space**, not layer-space — duplicating the shape elsewhere in the
comp does not carry the sweep's centre with it; each duplicate needs its sweep re-centred by hand (or linked to the
layer with an expression, not done here).

## VALUES BY SOURCE row
| parameter | SaaS Motion Graphics Masterclass (AE) | recommended for Style D |
|---|---|---|
| count/direction | 2 sweeps, 0° and ±180° (opposite sides of one shape) | one `<Bloom>` pass is enough; if a two-sided highlight is wanted, two thin emissive rim strips on opposite edges |
| intensity | first pair 25/25, second (more subtle) pair 7/7 | keep whichever pair is used at the low end (≈ bloom `intensity` 0.15) |
| pitfall | sweep is comp-space; re-centre per duplicate | raea transforms are always layer-local — this pitfall does not carry over, note only as a reason not to port the effect literally |
