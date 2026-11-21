# Addendum → cards/09_UI_Motion/shape-to-shape-morph-transition--high-end-saas-transitions.md
Source: "Motion Feel, Easing & Camera Choreography/SaaS Motion Graphics Masterclass Techniques.txt" — 26:10–29:14

## Variant: ease the morph "backwards" (smooth start, fast finish) and cut the underlying solid in exactly at the vanish point
A button among several is resized down into a small UI panel shape, with a new solid-colour layer swapped in directly
underneath at the exact frame the shape layer is cut off (`alt + [`). The specific detail that sells the invisible
hand-off: the resize keyframes are eased **in the opposite direction from normal** — "make sure that these are
eased in the opposite direction, so it goes first really smooth and then really quick" — i.e. a slow, gentle start
that accelerates hard into the cut, so the layer swap lands while the shape is moving fastest and least noticeable.
Author's own read of the result: "it's almost like they morph into each other. You don't really see the transition."

## VALUES BY SOURCE row
| parameter | SaaS Motion Graphics Masterclass (AE) | recommended for Style D |
|---|---|---|
| ease direction | smooth start → fast finish (opposite of the usual ease-out) | ease-in (slow start, speeds into the cut) on the shrinking/morphing shape specifically at the hand-off keys |
| hand-off timing | new layer cut in (`alt+[`) at the exact frame the old shape layer ends | swap the rendered element (raea: conditional render / key swap) on the same frame the morph's fastest-motion point lands |
| why it works | swap happens at peak velocity = least perceptible | pairs with `_cards2/addenda/motion-continuity-across-cuts--smooth-saas-creatorly.md` ("cut on the steepest frame of the carrier curve") — same principle, applied to a morph instead of a cut |
