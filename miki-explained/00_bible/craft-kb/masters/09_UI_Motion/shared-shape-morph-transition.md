---
title: A surviving/shared shape carries the scene change
bucket: 09_UI_Motion
type: master
members:
  - cards/08_Edit_Pacing/hub-shape-morph-transition--apple-ui-widget-pop-ups.md
  - cards/09_UI_Motion/shape-to-shape-morph-transition--high-end-saas-transitions.md
sources: ["How to Create Viral Apple-Style UI Widget Animations in After Effects! (Apple Masterclass Part 2).txt", "High End SaaS Video Transitions.txt"]
use_when: "cutting from one UI/content block (or scene) to the next without a wipe, flash or dissolve: hide the rest, morph the one shape both scenes share, rebuild around it"
style_fit: "Fits exactly — the house rule is transitions built from the scene's own objects. One shape IS the join, so nothing generic is added; elements around it fade/slide out and in over ~0.4 s, never pop."
---

## METADATA
09_UI_Motion | After Effects (source) → raea single Entity morph across a cut | raea / HyperFrames

## CREATIVE_INTENT
Instead of wiping or dissolving between two UI/content blocks, one shape that exists in both A and B is kept alive
across the cut: everything else clears away first, that one shape transforms (size, colour, form), and the next
scene's content is built outward from it. Because the eye already has that shape anchored, the join reads as
continuous rather than as a cut.
- Apple UI widget masterclass adds: un-build A in a strict order before the hub moves — dependent stroke rings
  retract their trim-path end to 0%, labels/icons fade to 0 opacity, staggered a few frames apart; only then does the
  hub shrink (fast ease, a small bounce), its stroke brightening to white and its fill crossfading to the next
  scene's accent, with the background colour blocks crossfading on the exact same frames so nothing but the hub
  reads as "the thing that happened".
- High-end SaaS transitions adds: the morph can also run between two scenes that don't share a literal object — pick
  the dominant shape at A's end and B's start (circle → square, square → 3D cylinder), morph one into the other
  (size, corner radius, depth) at the speed peak, and optionally split one shape into two so the gap reveals B
  underneath.

## STE_PROCEDURE
1. Pick one on-screen shape (a ring, a card, a circle) present in both A and B to be the thing that survives the cut.
2. Retract every dependent stroke/line's drawn length to 0% and fade every dependent icon/text to 0 opacity, staggered a few frames apart, before touching the shared shape.
3. Transform the shared shape into B's form (scale, corner radius, depth, colour) on one continuous eased window — fast-in/fast-out, at most a small settle, no sustained bounce.
4. During that same window, cross-fade the shape's fill colour toward the next scene's accent and grow/brighten its stroke to white; cross-fade any background colour blocks on the identical frames.
5. Optional: instead of one shape becoming another, split it into two and let the gap between them reveal B underneath.
6. Build the next scene's other elements outward from the now-transformed shape; they arrive after it, never before or during.

## VALUES BY SOURCE
| parameter | Apple UI widget masterclass | High-end SaaS transitions | recommended for Style D (+ why) |
|---|---|---|---|
| What survives | one hub shape (ring/circle) already on screen in A | the dominant shape at A's end, which may not be literally shared, morphed into B's dominant shape | Prefer a shape literally shared by both scenes when one exists (stronger continuity); otherwise morph dominant shape → dominant shape |
| Order of events | dependents retract/fade fully BEFORE the hub changes | all non-shared elements clear (~0.4 s) before the morph | Strict order: clear dependents first, then morph the shape, then build B's elements — matches the no-pop house rule |
| Colour change | hub fill crossfades gray → accent, stroke brightens to white, background blocks crossfade on the same frames | not specified | Tie the shape's colour change and the background colour change to the same frame window |
| Split variant | not used | shape splits into two, gap reveals B underneath | Keep as an optional variant for a "two things from one" line (e.g. one QR becomes two payment options) |
| Engine note | Deep Glow pulse + 3D camera null-chain run over the same window (dropped — see NOTES) | no mesh-blend prop assumed; scale-swap at the speed peak | raea: single `Entity` that never unmounts; scale/fill/stroke interpolate on one shared `t` |

## AGENT_EXECUTION
raea: one `Entity` (the shared shape) that never unmounts across the cut. Dependents are cued to retract/fade on a
window ending at the cut; the shape's scale/fill/stroke and any background colour blocks interpolate on one shared
`t` starting at the cut:
```tsx
const retreat = k(f, cutAt - 16, 16, inOut);   // dependents: strokes retract, icons/text fade, finish by cutAt
const t = k(f, cutAt, 20, inOut);               // the shared shape + background change on cutAt..cutAt+20

<Entity name="hub" transform={Transform.fromXyz(0, 0, 0).withScale(lerp(1, 0.4, t))}>
  <Circle radius={0.3}
    fill={mixColor(C.grayFill, C.accent, t)}
    stroke={mixColor(C.grayStroke, "#fff", t)}
    strokeWidth={lerp(2, 6, t)} />
</Entity>
<Rect fill={mixColor(bg.sceneA, bg.sceneB, t)} />   {/* same t drives all background blocks */}
```
For a dominant-shape morph with no literal shared object (3D): scale on axes and swap models at the speed peak, e.g.
a coin cylinder scaled flat-wide into a phone-screen slab, swapped to the phone model at mid-morph. For 2D/HyperFrames:
animate a rect's `rx`/width/height; other elements use clamped `interpolate` on opacity (0→1) and scale (0.9→1).
Shot row: `| 6→7 | (scene join, no line) | hub ring shrinks + recolours as backgrounds swap | strokes retract, icons fade, ring becomes the next scene's accent | this card |`.

### Worked example
Topic: a kedai runcit's "jualan harian" (daily sales) dashboard handing off to its "untung bulanan" (monthly profit)
dashboard, and — chained straight after — "Scan QR kat tiang" handing off to "Masuk amaun RM350" (illustrative, no
fee claims).
- BEFORE: a hard cut or a generic cross-dissolve between each pair of cards/screens.
- AFTER (shared hub): the daily-sales ring's highlight stroke retracts, its icon and "RM120" fade out, then the ring
  shrinks, its stroke brightens to white and its fill turns gray → accent gold while the background panels crossfade
  to the monthly-view palette — the same ring then grows the new "untung bulanan" card around itself.
- AFTER (dominant-shape morph): `| 5 | "Scan QR kat tiang" | macro on the square QR sticker | QR stand and pole fade
  out 0.4 s; the square stretches to a tall rounded rectangle | shared-shape-morph |`
  `| 6 | "Masuk amaun **RM350**" | the rectangle is now the phone screen | keypad and amount field grow in around it
  0.4 s; "RM350" in accent | shared-shape-morph |`

### Check
- Is exactly one shape kept alive across the cut (not a new object cutting in)?
- Do the dependents (strokes/icons/text) finish retracting/fading before the shape's own transform plays?
- Is the shape's transform one continuous eased change, with any colour change landing on the same frames as any background change?
- Do B's elements arrive around the shape after it transforms, never before or during?

## NOTES
- Visual gaps: exact background hex values per scene and precise frame offsets between dependents' retreats (Apple UI
  masterclass) are on-screen only; Realty Pro and client reference frames (SaaS transitions) are visual only.
- AE dropped: trim-path end% keyframing, Deep Glow exposure pulses on the fading elements, and the 3D camera
  null-chain that plays over the same window (Apple UI masterclass) — translated to raea's clamped `interpolate`/`t`
  windows above; no mesh-blend prop is assumed for the 3D dominant-shape morph.
