# Addendum → cards/01_Animation_Motion/motion-style-axis-squash-spacing--illusion-of-animation.md
Source: "Motion Feel, Easing & Camera Choreography/Principles of Animation Anticipation After Effects Tutorial.txt" — 04:41–05:22 (anchor point at the contact edge), 06:04–07:05 (inverse XY scale values).

## New values/steps the master card lacks
The master card states squash/stretch is "volume-preserving: sy = k, sx = sz = 1/sqrt(k)" but gives no concrete anchor-point
mechanism or example values. This source supplies both:

1. **Anchor point at the contact edge, not the centre.** Move the object's anchor/pivot to the edge touching the ground
   (or whatever surface it presses into) before keying any scale. Scaling always happens relative to the anchor, so an
   anchor at the contact edge makes a vertical squash read as "pressing into the ground" rather than shrinking from the
   middle. Practical values given: object height 400px → anchor moved 200px from centre to the bottom edge.
2. **Concrete inverse-scale pair for a volume-preserving squash:** when squashing one axis to 80% (Y, "getting smaller"),
   grow the perpendicular axis to 120% (X) at the same key, so the shape keeps its area/volume rather than just shrinking.
   This is a simpler (non-sqrt) approximate pairing the source actually uses: 80/120 rather than the exact
   `1/sqrt(0.8)=1.118`; close enough by eye, worth noting as the practical shorthand animators reach for.
3. **Timing**: the anticipation squash keys land before the main action (compress → release), while a landing squash's
   equivalent 120/80 pair (X stretched wide, Y compressed) lands AFTER the impact frame, confirming squash/stretch ratios
   are symmetric but their timing relative to the main action differs by purpose (anticipation vs. impact reaction).

## raea addition
```tsx
// anchor-at-contact-edge equivalent: scale relative to a pivot offset to the object's base, not its centre
const pivotOffset: V3 = [0, -halfHeight, 0];   // move the scale pivot to the contact edge
// approximate inverse pair (practical shorthand; exact volume-preserving = 1/sqrt(k) per the master card)
const squashY = 0.8, stretchX = 1.2;   // ~ the source's own values, simpler than true sqrt reciprocal
```

## Notes
- Still subject to the master card's rule conflict: Style D real objects must NOT use this amplitude (80/120%) — keep it
  inside the house's ~3–5% cap, or reserve the full-scale version for the non-physical diagram layer only.
