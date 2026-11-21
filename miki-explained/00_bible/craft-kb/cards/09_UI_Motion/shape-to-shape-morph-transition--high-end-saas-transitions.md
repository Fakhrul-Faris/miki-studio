---
title: Shape-to-shape morph — hide the rest, morph the shared shape, rebuild around it
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/High End SaaS Video Transitions.txt"
source_time: "00:44–02:02"
tool_target: raea
tier: full
use_when: "a join where A and B each have a dominant shape (a card and a screen, a coin and a button, one circle into two)"
style_fit: "Fits Style D object morphs; elements around the shape fade/slide out and in over ~0.4 s, never pop."
---

## METADATA
09_UI_Motion | general → raea / HyperFrames | shot-list join + raea

## CREATIVE_INTENT
Morphing: "one shape or scene physically transforms into another to push the idea forward", like clay-shaping
reels. The hardest and most satisfying of the three. In the Realty Pro video, "one circle splits into two, they come
apart, and that moment reveals the next scene underneath". Blueprint: look for shapes — circle → square, square →
rectangle, rectangle → 3D cylinder. "Shapes are the building blocks."

## STE_PROCEDURE
1. Identify the dominant shape at the end of A and at the start of B.
2. Hide all other elements of A (fade/shrink ~0.4 s).
3. Morph A's shape into B's shape (size, corner radius, depth), eased in-out.
4. Animate B's other elements in around the new shape.
5. Optional: split one shape into two and let the gap reveal B underneath.

## AGENT_EXECUTION
raea 3D: morph = scale on axes + swap at the speed peak (no mesh-blend prop assumed); e.g. a coin cylinder scaled
flat-wide into a phone-screen slab, swapped to the phone model at mid. HyperFrames/2D: animate `rx`/width/height of a
rect. Other elements: clamped `interpolate` on opacity + scale 0.9→1.

### Worked example
Topic: "Bayar sewa gerai guna DuitNow QR" (generic flow; no fee claims).
- BEFORE: `| 5 | "Scan QR kat tiang" | macro on a QR sticker | — |` cut to `| 6 | "Masuk amaun RM350" | phone screen | — |`
- AFTER: `| 5 | "Scan QR kat tiang" | macro on the square QR sticker | QR stand and pole fade out 0.4 s; the square stretches to a tall rounded rectangle | shape-to-shape-morph |`
  `| 6 | "Masuk amaun **RM350**" | the rectangle is now the phone screen | keypad and amount field grow in around it 0.4 s; "RM350" in accent | shape-to-shape-morph |`

### Check
- Are all non-shared elements cleared before the morph?
- Is the morph one continuous eased change of one shape?
- Do B's elements arrive around the shape (not before it)?

## NOTES
- Realty Pro and client frames are visual only.

## ADDENDUM — SaaS Motion Graphics Masterclass Techniques
Source: "Motion Feel, Easing & Camera Choreography/SaaS Motion Graphics Masterclass Techniques.txt" (26:10–29:14).
- Variant: ease the morph "backwards" — smooth, gentle start that accelerates hard into the cut (opposite of the
  usual ease-out) — and cut the underlying solid-colour layer in at the exact frame the shrinking shape layer ends.
  Because the swap lands while the shape is moving fastest, it reads as invisible: "it's almost like they morph
  into each other. You don't really see the transition."
- For Style D: ease-in (slow start, speeding into the cut) on the shrinking/morphing shape specifically at the
  hand-off keys; swap the rendered element (conditional render / key swap in raea) on the same frame the morph's
  fastest-motion point lands. Same principle as "cut on the steepest frame of the carrier curve" in
  `cards/01_Animation_Motion/motion-continuity-across-cuts--cinematography-next-level.md`, applied to a morph
  instead of a cut.
| parameter | SaaS Motion Graphics Masterclass (AE) | recommended for Style D |
|---|---|---|
| ease direction | smooth start → fast finish (opposite of the usual ease-out) | ease-in (slow start, speeds into the cut) on the shrinking/morphing shape at the hand-off keys |
| hand-off timing | new layer cut in at the exact frame the old shape layer ends | swap the rendered element on the same frame the morph's fastest-motion point lands |
