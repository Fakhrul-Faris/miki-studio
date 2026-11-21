---
title: Anticipation (pre-movement opposite the action), winding-up timing, and post-impact squash
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/Principles of Animation Anticipation After Effects Tutorial.txt"
source_time: "00:23–01:14 (why), 06:04–08:15 (winding-up timing), 08:15–09:52 (landing squash timed after impact)"
tool_target: raea
tier: principle
use_when: "an object changes state or launches into motion and should read as building up to it, not just appearing to move"
style_fit: "Directly matches the house instruction that objects ease in/out ~0.4 s rather than pop — anticipation IS that pre-move, and landing squash is a legitimate state-change cue, within the no-bounce cap."
---

## METADATA
01_Animation_Motion | After Effects (value/speed graph, anchor point placement) | raea `interpolate` pre-move + post-impact easing

## CREATIVE_INTENT
Anticipation is the pre-movement opposite to the main action: before a cube jumps up, it first compresses down slightly,
"as if it's generating that power", so the viewer isn't surprised by a sudden move and instead "feels like they know
what's coming". Three sub-techniques make this read correctly: (1) the anticipation hold can be lengthened ("winding up
an elastic band") so a longer build reads as more stored power before a quick release; (2) the value-graph curve shape at
the top of an arc should be wide/flat ("hover") while the graph into a fall should be narrow/steep ("nothing slows down
when you fall, it falls really fast") — the curve shape itself tells reality from floatiness; (3) landing squash must be
keyed to land AFTER the impact frame, not before it — "you want to land and then squash", never squash in anticipation of
the landing itself.

## STE_PROCEDURE
1. Before animating the main action, decide its opposite-direction pre-move (a compress before a rise, a pull-back before a push).
2. Key the anticipation at a smaller magnitude and shorter duration than the main action.
3. Before committing the anticipation's duration, consider lengthening it for a "winding up" read: a longer hold before a fast release reads as more stored power than a short one.
4. Shape the apex of any arc (top of a jump, top of a hover) with a wide, flat curve handle so the object visibly hangs there.
5. Shape a fall or drop with a narrow, steep curve handle so it visibly accelerates — never apply the same wide "hover" shape to a falling segment.
6. Key the primary action's impact/landing frame first, at full value (no squash yet).
7. Add the squash key AFTER the impact frame, not before or during the approach — the squash is the body's reaction to having already landed.
8. Add secondary motion (a rotation, a lean) only once the primary position/scale timing is locked and reads correctly on its own.

## AGENT_EXECUTION
**raea:** the anticipation dip, winding-up hold, and post-impact squash as one sequence on an arrival beat:
```tsx
const t = f - f0;   // frames since this beat started
// 1. anticipation: brief opposite-direction compress, held longer for more "wind-up" (house-safe amplitude, not AE's demo scale)
const anticipate = interpolate(f, [f0, f0 + 10, f0 + 22], [1, 0.97, 1], {
  easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp",
});
// 2. the main rise, apex shaped WIDE (hover), the fall/impact shaped NARROW (fast) — two different easing curves, not one
const rise = interpolate(f, [f0 + 22, f0 + 34], [1, 1.08], { easing: Easing.out(Easing.sin) });      // slow into the apex: wide handle
const land = interpolate(f, [f0 + 34, f0 + 40], [1.08, 1], { easing: Easing.in(Easing.quad) });       // fast into impact: narrow handle
const scaleY = f < f0 + 22 ? anticipate : f < f0 + 34 ? rise : land;
// 3. squash keyed AFTER the impact frame (f0+40), never before it
const squash = interpolate(f, [f0 + 40, f0 + 44, f0 + 52], [1, 0.97, 1], {
  easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp",
});
const finalScaleY = f < f0 + 40 ? scaleY : squash;   // ≤ a few % deviation — house no-bounce cap
```
Keep every deviation inside the house cap (~3–5 % over ≥0.4 s total); this is the timing/curve-shape PRINCIPLE, not licence
for a full cartoon squash — see motion-style-axis-squash-spacing--illusion-of-animation.md for the house-safe amplitude limit.

### Worked example
Topic: "harga minyak naik esok" (illustrative; a fuel-pump number is about to jump up).
BEFORE: `| 4 | "harga naik esok" | pump number display switches straight to the new price | — | — |` — the change is a pop, no build-up.
AFTER: `| 4 | "harga naik esok" | macro on the pump's digit display; it dips slightly dimmer/smaller just before, holds a beat (wind-up), then the new price arrives and gives one small settle after it lands | digits dim-compress on "naik", hold through "esok", then jump to the new price and settle ~0.1 s after landing | anticipation-pre-movement-winding-up-post-impact-squash--animation-anticipation |`

### Check
- Does the anticipation move in the OPPOSITE direction to the main action, not the same direction?
- Is the squash/settle keyed to start AFTER the impact frame, never before it?
- Does an apex (hover point) use a visibly different, flatter curve than a fall/drop in the same move?
- Is every deviation still inside the house's ~3–5 % / ≥0.4 s no-bounce cap?

## NOTES
- Visual gaps: the exact handle drag positions and the final chosen durations (frames moved "a little bit") are tuned by eye on screen; values above are illustrative (`~`), not stated numbers.
- Rule conflicts: the source's cube anticipation/squash amplitudes (shrink to 80%, stretch to 120% on the opposite axis) are a full cartoon-squash scale — too strong for a real Style D object; this card keeps only the TIMING and curve-shape principles (opposite-direction pre-move, wide-vs-narrow curve for hover-vs-fall, squash-after-impact) inside the house's small-deviation cap. See the addendum to motion-style-axis-squash-spacing--illusion-of-animation.md for the anchor-point mechanism this video uses to keep squash volume-preserving.
