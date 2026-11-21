---
title: Anticipation dip before a match cut — the path bends away, then the move accelerates into the cut
bucket: 08_Edit_Pacing
source: "Motion Feel, Easing & Camera Choreography/After Effects Morph Transition with Match Cuts.txt"
source_time: "07:12–09:36"
tool_target: raea
tier: full
use_when: "a join that should feel like a deliberate 'turn' in the story (L03 problem → L04 fix), not just a swap"
style_fit: "Fits if the dip is small and eased (a gentle curved path, no bounce); the dip uses path shape, not overshoot, so the 3–5 % overshoot cap is untouched."
---

## METADATA
08_Edit_Pacing | After Effects (source) → raea curved path (quadratic/cubic Bézier in space) + eased progress | raea

## CREATIVE_INTENT
"I want to add a bit of anticipation to this animation to really emphasize this match cut." The sphere moves to the
cube's centre on three position keys (≈ 4 s 12 f → 5 s 12 f window); the middle key is dragged down and its spatial
handles are broken so the path dips before swinging into the target. The viewer feels the move gather before the cut.

## STE_PROCEDURE
1. Key object A at its start, at a middle frame, and at B's centre (source: keyframes around 4 s 12 f and 5 s 12 f).
2. Drag the middle key's position slightly down (away from the travel direction).
3. Break the middle key's spatial handles so the path curves into a dip, then out toward B.
4. Ease the first key (source: F9 Easy Ease) so the move starts slow.
5. Parent B to A; find the fastest frame in the speed graph; cut A → B there (see match-cut-at-the-fastest-frame).

## AGENT_EXECUTION
raea: evaluate position on a spatial Bézier (start → dip control → end) with an eased progress.
```tsx
const p = interpolate(f, [S, E], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const bez = (a: number, c: number, b: number) => (1 - p) ** 2 * a + 2 * (1 - p) * p * c + p ** 2 * b;
const t = Transform.fromXyz(bez(-0.10, -0.02, 0.10), bez(0, -0.04, 0), 0);   // ~ dip 4 cm below the line at macro scale
```
Shot-list "State change" cell: "dips, then swings right into the cut on <word>".

### Worked example
Topic: "Kedai kopi untung RM0.80 secawan, bukan RM5" (illustrative).
- BEFORE: `| 4 | "Harga secawan RM5…" | price tag slides straight to the cup | cut to cup |`
- AFTER: `| 4 | "Harga secawan RM5…" | price tag drops ~4 cm (dip), then swings up-right toward the cup | tag accelerates; cut to the cup at the peak on "tapi" | anticipation-dip-before-match-cut |`
  `| 5 | "…tapi untung cuma 80 sen" | cup continues the swing and settles centre | "RM0.80" counter fades in 0.4 s on "80 sen" | — |`

### Check
- Is the dip small (≤ ~10 % of the travel) and eased, with no bounce back?
- Does the move still peak in speed at the cut frame?
- Is the dip opposite to the travel direction (gathering, not wandering)?

## NOTES
- Visual gaps: exact dip depth and handle angles are visual only ("somewhere about there").
- AE steps dropped: Ctrl+Alt convert-vertex tool and broken spatial handles → explicit Bézier control point in raea.

## ADDENDUM — Motion Graphics Technique Tutorial
Source: "Motion Feel, Easing & Camera Choreography/Motion Graphics Technique Tutorial.txt", 05:17–09:50, 09:52–10:19.
- Anticipation can be a pull-BACK (opposite the travel direction) plus a scale-down (~20–30%), not only a position
  dip: back the shape up slightly and shrink it to ~70% scale at the backed-up key, before whipping forward to
  ~90–100% scale at the cut. Use as an alternate, whippier anticipation shape alongside the dip method.
- Check the SPEED graph (not the value graph) forms an "M": slow at the anticipation key, fast through the whip,
  landing fast at the cut — "if your graph doesn't look roughly like an M, you're on your value graph".
- Optional, fastest-frame-only: squash/stretch the shape along its direction of travel and rotate it so the stretch
  axis follows the path tangent (not a uniform scale), reverting by the cut frame.
- Parent the whole whip chain (position + scale + rotation keys) to one null/carrier so the landing point can be
  nudged in one place to fit the next shot's matched element, without re-animating the keys.
- This is an additive, more dynamic variant; the gentle position-dip method stays the Style D default.

## ADDENDUM — Perfect Shape Morphs After Effects Transcript
Source: "Motion Feel, Easing & Camera Choreography/Perfect Shape Morphs After Effects Transcript.txt", 23:18–24:44.
- For a split/burst state change (one object becoming several, where a position dip doesn't apply): key the whole
  shape to shrink to ~90–91% scale (anchor at the shape's own centre) immediately before it bursts apart into
  pieces moving outward — "a bit of anticipation... sort of shrinking going inwards, contracting, and then sort of
  bursting out".
- Tune the shrink's easing in the speed graph first (sharper/faster), then copy that same eased curve onto the
  burst-outward position keys of each piece, so the contraction and the burst read as one continuous gesture.
- Check the anticipation reads even before final easing is added — a sign the keyframe values themselves, not just
  the easing, are doing the work.
- ⚠ Keep the scale-shrink small (~9–10%, not a dramatic squash), eased on both ends — this is "contract before
  burst," not a bouncy spring; stays in the spirit of the house's overshoot-adjacent discipline even though it's a
  different parameter from the overshoot cap.
