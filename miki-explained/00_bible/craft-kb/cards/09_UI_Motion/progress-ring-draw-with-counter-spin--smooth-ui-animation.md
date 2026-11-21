---
title: Progress ring — stroke draws 0 → value while the ring unwinds from −200°, clipped to its track, icon scales in after
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Smooth UI Animation After Effects Tutorial.txt"
source_time: "02:43–04:40"
tool_target: raea
tier: principle
use_when: "showing a share or progress (e.g. 30 % of income, 3 of 5 steps) as a ring chart in a UI scene"
style_fit: Fits — the chart is the line's number made literal; ≥ 0.6 s eased; ring stroke in the accent only when that share is the point.
---

## METADATA
09_UI_Motion | After Effects (source) → raea SVG circle | raea

## CREATIVE_INTENT
Over a designed chart, a no-fill circle with stroke ~90–100 covers the drawn ring; Trim Paths End keyed 0 → final at 1 s;
the chart layer's rotation keyed −200° → 0 over the same second; both eased and graph-tuned. The stroke is clipped to
the ring shape with an alpha matte. The chart animation is offset slightly and the centre icon's scale animates in after.

## STE_PROCEDURE
1. Draw a full stroke circle over the ring track; clip it to the track shape.
2. Key the drawn length 0 → the value over ~1 s, eased.
3. Over the same span, rotate the ring from −200° to 0 so the draw sweeps in.
4. Offset the chart a few frames after the card arrives.
5. Scale the centre icon/number in after the ring starts.

## AGENT_EXECUTION
raea SVG: `<circle r={R} strokeWidth={90} fill="none" strokeLinecap="butt" strokeDasharray={2*Math.PI*R}
strokeDashoffset={2*Math.PI*R*(1 - v*t)} transform={`rotate(${lerp(-200, 0, t) - 90} ${cx} ${cy})`} />`, `t = k(f, at, 30, inOut)`,
inside a container with the track's `clipPath`. Pair with kit `Count` for the number.

### Worked example
Topic: the 50/30/20 budget split on RM3,000 salary → RM900 wants (arithmetic; illustrative salary).
- BEFORE: a static pie with "30 %".
- AFTER: on "tiga puluh peratus", the ring draws to 30 % while unwinding from −200°, and "RM900" counts up in the centre.

### Check
- Does the drawn length equal the spoken value?
- Do draw and rotation share one eased curve ≥ 0.6 s?
- Is the stroke clipped to its track (no overhang)?

## NOTES
- Visual gaps: graph shapes visual only.
