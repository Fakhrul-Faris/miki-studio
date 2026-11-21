---
title: Menu pill expands by dragging its own path points outward, synced with its icons sliding apart
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Animate Like Apple After Effects.txt"
source_time: "19:56–22:51"
tool_target: raea
tier: full
use_when: "a compact UI control (a pill, a tab bar, a collapsed menu) needs to expand to reveal 2+ options, each pinned to one side"
style_fit: "Fits UI-heavy (~80 %) scenes; keep the expand on the spoken word and eased in-out, no overshoot beyond the house 3–5 % cap."
---

## METADATA
09_UI_Motion | After Effects (shape path-point keyframes) → raea width/translateX interpolation | raea

## CREATIVE_INTENT
A pill-shaped menu starts collapsed. On the word, its path's left-side points drag left and its right-side points drag
right (two separate point groups, same shape), so the pill visibly stretches open rather than just resizing uniformly.
At the same time, two circular icons that sit inside the pill slide outward by a fixed offset (400 px in the source) to
land at the new pill's edges, each on its own `transform.position` key. The icons and the pill are eased together so the
shape and its contents open as one gesture, not a resize-then-reveal.

## STE_PROCEDURE
1. Before animating, decide the pill's open width and where each icon lands inside it.
2. Key the pill's left-edge points at the collapsed position; key them again at the open position, same frame range as the icons.
3. Key the right-edge points the mirror distance, same frame range.
4. Key each icon's own position outward to its landing spot, same start/end frames as the pill.
5. Ease every key in-out; use one easing curve shared by the pill and its icons so nothing arrives early or late.
6. Fire the expand on the spoken word (the line that names what the menu reveals).

## AGENT_EXECUTION
raea: drive the pill's path with two interpolated edge offsets and the icons with matching position tracks, all keyed
to the same word frame:
```tsx
const t0 = word("pilih");                           // the line that triggers the expand
const edge = interpolate(f, [t0, t0 + 16], [0, 1], { ...CL, easing: out });
const leftX  = lerp(cx - pillHalf, cx - pillHalf - 160, edge);
const rightX = lerp(cx + pillHalf, cx + pillHalf + 160, edge);
const iconL  = lerp(cx - 40, leftX + 40, edge);      // icon slides with its side of the pill
const iconR  = lerp(cx + 40, rightX - 40, edge);
```
Shot row: `| 3 | "pilih bayar atau simpan" | macro UI, pill menu | pill stretches open on "pilih", two option icons slide to the new edges | this card |`.

### Worked example
Topic: a kedai runcit app's pill toggle for "Bayar" vs "Simpan" (illustrative labels).
- BEFORE: a small round button pops into a wide bar with both options already inside it.
- AFTER: on "pilih", the pill's two sides stretch open together (left edge out, right edge out), and the "Bayar" and
  "Simpan" icons ride each side out to the new edges in the same eased move — reads as one continuous open gesture.

### Check
- Do both edges of the pill move at the same time as the icons (one gesture, not resize-then-reveal)?
- Is the expand triggered on the word it illustrates?
- Is the ease shared between the shape and its icons (no icon arriving before/after its edge)?
- Is any overshoot ≤ 3–5 % over ≥ 0.4 s, per house rule?

## NOTES
- Visual gaps: the exact point-drag distances beyond "until it reaches this point" are visual only; use the house
  overshoot cap instead of copying an unstated value.
- AE dropped: manual path-point keyframing (select-shift-drag on vertices) — translated to a parametrised edge-offset
  interpolation, since raea paths are authored as data, not dragged points.
- Pairs with `controller-shape-drives-linked-siblings--animate-like-apple.md` if this pill also carries a stroke/shadow.
