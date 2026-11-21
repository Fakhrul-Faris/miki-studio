---
title: Thirds in-between for a true ease (and the halves trap)
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/Animate Like a Japanese Pro Tips.txt"
source_time: "00:50–02:47"
tool_target: raea
tier: full
use_when: "hand-placing intermediate keys for a short eased move (a tag sliding on, a coin settling, a UI card arriving in ~0.4 s) or checking that an eased curve really slows at the end"
style_fit: Strong — gives the exact spacing behind our ~0.4 s fade/grow/slide-in and eased camera ends; no overshoot involved.
---

## METADATA
01_Animation_Motion | 2D hand-drawn in-betweening (source) | raea `interpolate` key lists / `Easing` curves + HyperFrames keyframes

## CREATIVE_INTENT
Between key A and key B, where you place the in-between decides how the move feels. The common habit, **"halves"**
(keep drawing the new frame in the middle of the last frame and B), slows the start of the move but **never slows the
last stretch**: with 4 frames the spacing is 1/2, 1/4, 1/4 — the final two gaps are equal, so the object arrives at
full speed. **"Thirds"**: put the in-between **2/3 of the way** from A to B and the move slows with just one in-between
(spacing 2/3 → 1/3). Japanese studio in-betweeners use this.

## STE_PROCEDURE
1. Before placing any in-between, decide the move: slow into B, slow out of A, or constant.
2. For a slow-down into B, place the in-between at 2/3 of the A→B distance.
3. For a slow-out from A, place it at 1/3 of the distance.
4. For more frames, repeat on the remaining gap: 2/3 of what is left (0, 2/3, 8/9, 1 → gaps 6/9, 2/9, 1/9).
5. Never build an ease by repeated halving alone: 0, 1/2, 3/4, 1 gives gaps 1/2, 1/4, 1/4 — no final slow-down.
6. For constant speed, place in-betweens at exactly 1/3 and 2/3.
7. Check the result: each gap into the end pose must be smaller than the one before it.

## AGENT_EXECUTION
Our moves are mostly continuous `Easing` curves, so this card is used two ways:
- **Hand-placed keys** (multi-point `interpolate`, HyperFrames keyframe lists, a counter stepping through values, a tag
  path with a mid key): time keys evenly, place the values by thirds, not halves.
- **Spacing check** on any curve: sample the last 4 frames of the move (at the delivery fps, 60) and confirm the
  gaps shrink frame to frame. A linear tail, or a curve cut off before it settles, fails.

raea (real API: `interpolate`, `Easing`, `useCurrentFrame`):
```tsx
const f = useCurrentFrame();             // 60 fps final
const t0 = 120, n = 24;                  // 0.4 s slide-on
// thirds key list: gaps 6/9, 2/9, 1/9 of the travel — slows into the end
const x = interpolate(f, [t0, t0 + n/3, t0 + 2*n/3, t0 + n], [0, 2/3, 8/9, 1],
  { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
// spacing check (dev only): gaps into the end must shrink
const at = (k: number) => interpolate(k, [t0, t0 + n/3, t0 + 2*n/3, t0 + n], [0, 2/3, 8/9, 1],
  { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const g = [3, 2, 1].map(k => at(t0 + n - k + 1) - at(t0 + n - k));   // g[0] > g[1] > g[2] expected
```
For a smooth curve with the same feel use `Easing.out(Easing.poly(2))` (or `Easing.bezier`) and run the same check.

### Worked example
Shot-list row, a Ramly burger stall in Kajang, line "Harga sebenar: RM6.50" (illustrative):
- BEFORE: `| 4 | "RM6.50" | top-down on the burger wrapper, push in 6 % | price tag slides on from the right on "RM6.50", keys 0 → 0.5 → 0.75 → 1 |` — the tag arrives at full speed and stops dead (halves).
- AFTER: `| 4 | "RM6.50" | top-down on the burger wrapper, push in 6 % | price tag slides on over 0.4 s on "RM6.50", keys 0 → 2/3 → 8/9 → 1 (thirds), last 3 frame gaps shrink | thirds-inbetween-true-ease |`

### Check
- Do the last three frame gaps of every slide/grow/camera end get smaller toward the end pose?
- Is any ease built from midpoints only (1/2, 3/4, …)? If yes, re-place by thirds.
- Is a constant-speed move (spin, drift) keyed at exact 1/3 and 2/3 or linear?

## NOTES
- Visual gaps: the circle diagrams are on screen, but the spacing is fully stated in speech; values above are exact fractions derived from the described placements.
- No conflict: no overshoot, no bounce; it shapes how things "fade/grow/slide in ~0.4 s".
- Combining halves and thirds for slow → fast → slow: see `halves-plus-thirds-slow-fast-slow--animate-like-japanese-pro.md`.
