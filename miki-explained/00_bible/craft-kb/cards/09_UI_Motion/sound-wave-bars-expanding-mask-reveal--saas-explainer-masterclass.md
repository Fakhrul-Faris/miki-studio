---
title: Bar-graphic reveal — duplicated strokes expand out from the centre to build a data/wave shape
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How To Create SaaS Explainer Ad in After Effects | For Beginners | +01 Hour Masterclass.txt"
source_time: "52:56–55:43"
tool_target: raea
tier: full
use_when: "showing a bar chart, an equaliser/wave graphic, or any row of value-bars that should build itself rather than appear whole"
style_fit: Fits — the bars grow from a centre point on the word, which is a literal visualisation of "values coming in", not a generic bar-chart fade-in.
---

## METADATA
09_UI_Motion | After Effects (imported vector bars duplicated + mask-expansion reveal) → raea bar array keyed per-bar | raea

## CREATIVE_INTENT
A sound-wave/bar graphic (imported as vector, separated into individual bar shapes) is duplicated: the back copy reveals
via a centre rectangle mask whose expansion value is keyed from negative (fully hidden) to a high value (fully shown),
subtractively, so the bars appear to grow outward from the middle; a second, inverted copy of the same reveal plays the
mirror of that animation so the whole shape assembles from the centre out in both directions.

## STE_PROCEDURE
1. Separate the bar/wave graphic into individual bar shapes (not one flat image).
2. Place a centred rectangle mask over the group, mode set to subtract.
3. Key the mask's expansion value from a large negative (fully hidden) to a high positive (fully revealed) over the line.
4. Duplicate the comp; on the copy, invert the mask mode and reverse the keyframe direction, so growth reads from both
   sides of the centre at once.
5. Feather the mask edge so bars don't pop in with a hard cutoff.

## AGENT_EXECUTION
Shot-list row: `| 8 | "boleh dengar setiap transaksi" | bar/wave graphic | bars grow outward from centre on "setiap", feathered edge | this card`.
raea: an array of bar elements, each one's `scaleY`/reveal keyed by its distance from the centre index rather than a
single mask (true per-bar control, no AE mask-expansion trick needed):
```tsx
const bars = Array.from({ length: 11 }, (_, i) => i - 5);           // centre-out indices
{bars.map((i) => {
  const delay = Math.abs(i) * 1.2;                                   // further bars start later
  const t = k(f, word("setiap") + delay, 10, out);
  return <rect key={i} x={cx + i * 14} y={baseY} width={8}
    height={lerp(0, barHeights[i + 5], t)} fill={C.ink} />;
})}
```

### Worked example
Topic: a kedai runcit's app showing a live transaction-volume graphic (illustrative shape, generic values).
- BEFORE: a bar chart fades in all at once — flat.
- AFTER: on "setiap transaksi", the bars grow outward from the centre bar first, outer bars landing a beat later,
  reading as the chart assembling itself.

### Check
- Do the centre bars lead and the outer bars follow (not a uniform fade-in)?
- Does the reveal land on the named word, finishing within ~0.5 s?
- Is the edge/transition feathered, not a hard pop?

## NOTES
- Visual gaps: exact bar-height values are visual only.
- AE dropped: centred rectangle mask-expansion trick (two inverted copies) — translated to per-bar scale keys driven by
  distance-from-centre, which is simpler and more controllable in raea than the AE mask approach.
