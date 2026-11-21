---
title: Pattern, then break it — the break draws the eye
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/Every Composition Concept Explained (In 3D).txt"
source_time: "04:05–04:22"
tool_target: shot-list
tier: full
use_when: "the line singles out one item among many: the one fake product, the one fee, the one stall that profits"
style_fit: "Strong fit for Style D 'multiply with a counter' beats: build the row, then break one item with the accent on the word."
---

## METADATA
06_Art_Direction | 3D (tool-agnostic) | shot-list row (State change) + raea instances

## CREATIVE_INTENT
Following a pattern "creates order, but when you break it, that draws a lot of attention to the break". A repeated row
makes the odd one out the focal point without extra pointers.

## STE_PROCEDURE
1. Before the reveal, show the pattern long enough to register (~1 s or 3+ identical items ~).
2. Keep pattern items identical in size, spacing, angle and colour (neutral).
3. Break exactly one item: rotate, raise, recolour with the accent, or change its state.
4. Land the break on the word that names it.
5. Keep every other item static during the break.

## AGENT_EXECUTION
Shot-list "State change" column: "row of 7 X; on '<word>' item 5 <breaks>". raea: map instances; the break is an eased
change on one index.
```tsx
{Array.from({ length: 7 }, (_, i) => {
  const b = i === 4 ? ease(tBreak) : 0;            // 0→1 over ≥0.4 s from the word's timestamp
  return <Model key={i} src={staticFile("tin.glb")} transform={Transform.fromXyz(i*0.09-0.27, b*0.03, 0)} />;
})}
// the broken one also gets the accent material; overshoot ≤ 3–5 %
```
### Worked example
Topic: "Barang tiruan kat marketplace: cara cam dalam 3 step" (how-to; generic, no real brand).
- BEFORE: one bottle on screen with a caption "FAKE".
- AFTER: `| 5 | "Satu je yang palsu." | macro dolly along a row of 7 bottles, 85 mm | identical row for 1 s; on "palsu" bottle 5 lifts 3 cm and its seal glows accent, others stay still | pattern-then-break |`
### Check
- Is the pattern visible and uniform before the break?
- Is exactly one item broken, on the naming word?
- Is the accent only on the broken item?

## NOTES
- Visual gaps: the demo pattern is on screen only; durations (~1 s, 3+) inferred.
- Related: `masters/03_Modeling_Modifiers/break-repetition-kit-dressing.md` breaks repetition for realism (subtle);
  this card breaks it once, deliberately, for attention.
