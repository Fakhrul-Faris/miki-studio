---
title: Motion-style axis — from simulated reality to stylized via squash/stretch and spacing
bucket: 01_Animation_Motion
source: "The Illusion of Animation.txt"
source_time: "~17:30–22:21"
blender_version_source: n/a (conference talk; demo was a simulated default cube)
tool_target: principle-only
tier: principle
style_fit: partial — tells us where our object motion should sit (near reality, smooth, no bounce); the stylized end conflicts with our no-bounce rule
---

## METADATA
01_Animation_Motion | n/a | principle-only

## CREATIVE_INTENT
Principle: the same reality→stylized line applies to motion, not only to images. Test it on a neutral object (the default cube falling), not a character, so you judge motion and not design. Reality = a physics simulation of the fall. Halfway to stylized = the same fall with a few variables changed: squash and stretch, spacing, a little anticipation. Too far stylized = "obnoxious to the brain", "style over substance" — ungrounded, you can't believe it's an actual thing.
Idea for us: use as few variables as possible when stylising motion; the more variables, the less the intent reads.

## STE_PROCEDURE
1. Before you style a move, make a reference version that is physically plausible (simulated or eased like real mass).
2. Change one or two variables only (spacing first; squash/stretch only if the look allows it).
3. Compare reference and styled versions side by side.
4. Stop pushing when the motion reads as "style over substance" (the object stops feeling like a thing).

## AGENT_EXECUTION
### Source tool (Blender, implied)
A rigid-body default cube falling under unchanged gravity was the "reality" sample; stylised versions were hand-keyed (squash/stretch + spacing). No settings given.
### Blender / raea translation
- Reality sample in bpy: `bpy.ops.rigidbody.object_add(type='ACTIVE')` on the object, a PASSIVE floor, `bpy.ops.ptcache.bake_all(bake=True)`, then `bpy.ops.rigidbody.bake_to_keyframes()` and export the GLB.
- Spacing is the easing curve: in raea, `interpolate(f, [a, b], [y0, y1], { easing: Easing.inOut(Easing.cubic) })` for our smooth reality-side placement; `Easing.in(Easing.quad)` is gravity-like acceleration for a fall.
- Squash/stretch in raea is `.withScale([sx, sy, sz])` keyed from the frame (volume-preserving: `sy = k, sx = sz = 1/Math.sqrt(k)`). Do not use on Style D real objects (see conflicts).

## NOTES
- Deprecated: n/a.
- Visual gaps: every cube variant is a video clip on a slide; the exact spacing charts and squash amounts are not recoverable.
- Rule conflicts: Style D motion sits at or just off the reality end — no bounce, no squash/stretch on real objects, no snappy overshoot. Stylized motion is only for the diagram layer, and even there no bounce.

## ADDENDUM — Principles of Animation Anticipation After Effects Tutorial
Source: "Motion Feel, Easing & Camera Choreography/Principles of Animation Anticipation After Effects Tutorial.txt" — 04:41–05:22 (anchor point at the contact edge), 06:04–07:05 (inverse XY scale values).

This card states squash/stretch is volume-preserving (`sy = k, sx = sz = 1/sqrt(k)`) but gives no concrete
anchor-point mechanism or example values. This source supplies both:
1. Anchor point at the contact edge, not the centre: move the object's anchor/pivot to the edge touching the ground
   (or whatever surface it presses into) before keying any scale, so a vertical squash reads as "pressing into the
   ground" rather than shrinking from the middle. Practical values given: object height 400px → anchor moved 200px
   from centre to the bottom edge.
2. Concrete inverse-scale pair for a volume-preserving squash: when squashing one axis to 80% (Y), grow the
   perpendicular axis to 120% (X) at the same key — a simpler, non-sqrt approximate pairing (80/120 rather than the
   exact `1/sqrt(0.8)=1.118`), close enough by eye, worth noting as the practical shorthand animators reach for.
3. Timing: an anticipation squash's keys land BEFORE the main action (compress → release); a landing squash's
   equivalent 120/80 pair (X stretched wide, Y compressed) lands AFTER the impact frame — squash/stretch ratios are
   symmetric but their timing relative to the main action differs by purpose.

```tsx
// anchor-at-contact-edge equivalent: scale relative to a pivot offset to the object's base, not its centre
const pivotOffset: V3 = [0, -halfHeight, 0];
// approximate inverse pair (practical shorthand; exact volume-preserving = 1/sqrt(k) per this card's own rule)
const squashY = 0.8, stretchX = 1.2;
```

⚠ Still subject to this card's own rule conflict: Style D real objects must NOT use this amplitude (80/120%) — keep
it inside the house's ~3–5% cap, or reserve the full-scale version for the non-physical diagram layer only.
