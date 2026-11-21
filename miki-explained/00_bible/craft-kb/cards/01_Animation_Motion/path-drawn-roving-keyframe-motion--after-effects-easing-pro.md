---
title: Path-drawn motion via roving keyframes (draw the path, convert to position keys, tune hang time by key height)
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/After Effects Easing Pro Transcript.txt"
source_time: "08:17–11:27"
tool_target: raea
tier: full
use_when: "an object must travel a hand-drawn curved path (not a straight A-to-B move) with natural varying speed along it"
style_fit: "Fits house rules (eased, no sudden stops) once translated: raea has no mask-path-to-position shortcut, so the curved path and its speed variation are authored directly as a parametric path + a separately-eased progress value."
---

## METADATA
01_Animation_Motion | After Effects (mask path → position keyframes, roving keyframes, speed graph) | raea parametric path + eased progress `t`

## CREATIVE_INTENT
Rather than hand-placing position keyframes to approximate a curved path, draw the path once with the pen tool, then
convert each path vertex into a position keyframe (copy the mask path, paste onto Position) — After Effects spaces the
resulting "roving" keyframes evenly along the path automatically. The technique's real value is what comes after: raising
or lowering a roving keyframe's height in the speed graph controls how long the object lingers ("hangs") at that point of
the curve, without moving the key in time — the lower the key, the more the object slows toward a stop there; the higher,
the more it keeps moving through. This gives a hand-animator's control over pacing along an arbitrary curve.

## STE_PROCEDURE
1. Draw the path once with the pen tool, refined with smooth curves where the motion should ease, sharp turns where it should not.
2. Convert the path to position keys (duplicate the path's keyframe, paste it onto the Position property) — this is the AE-specific shortcut; in raea, author the path directly as a formula (step 6).
3. Select all the new position keys and ease them; expect it to look wrong before shaping (this is expected, step 4 fixes it).
4. Open the speed graph (not the value graph, since dimensions aren't separated for a 2D path) and focus on each key in path order.
5. To make the object linger (hang) at a point on the curve, drag that keyframe's speed-graph height down; raise strong easing on both sides of it.
6. To make the object pass straight through a point with no lingering, add ease only at the keys before/after it, not at it.
7. Convert two adjacent non-roving keys back to roving (select, right-click, toggle) whenever you need AE to re-space them evenly between fixed points.
8. Repeat per segment: lift or lower each key, re-roving as needed, until the whole path reads as one continuous, varyingly-paced move.

## AGENT_EXECUTION
**raea:** build the path as a parametric curve (cubic Bézier or Catmull-Rom through control points placed like path vertices),
then drive **where along the path** the object sits with a separately-eased progress value `t` whose speed varies by segment —
this directly replaces "roving keyframe height":
```tsx
// path control points (placed like the pen-tool vertices)
const PTS: V3 = [[0, 0.1, 0], [0.4, 0.5, -0.2], [0.9, 0.3, 0.1], [1.3, 0.1, 0]];
function catmullRom(pts: V3[], t: number): V3 { /* standard 4-point interpolation, t in [0, pts.length-1] */ }

// progress along the path: slow ("hang") near segment 1, fast through segment 2 — this is the "key height" control
const seg1 = interpolate(f, [f0, f0 + 20], [0, 1], { easing: Easing.out(Easing.sin), extrapolateLeft: "clamp", extrapolateRight: "clamp" }); // long ease = hang
const seg2 = interpolate(f, [f0 + 20, f0 + 32], [1, 2], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }); // short, fast = pass through
const t = f < f0 + 20 ? seg1 : seg2;
const p = catmullRom(PTS, t);
<Mesh3d name="object" transform={Transform.fromXyz(...p)}>…</Mesh3d>
```
Lowering a "roving keyframe" = lengthening that segment's eased-out tail (more frames spent approaching the same `t` value);
raising it = shortening the ease so the object keeps its speed through that point. Build the path control points once at
module level so every segment reads the same curve.

### Worked example
Topic: "resit hilang, jejak balik ke kedai" (illustrative; a receipt icon travels back along a route to a shop icon).
BEFORE: `| 5 | "resit hilang" | receipt icon slides straight A to B | — | — |` — flat, mechanical, no sense of a real route.
AFTER: `| 5 | "ia datang dari sini" | macro follows the receipt along a drawn route over the counter, lingering briefly at the till before continuing to the shop icon | receipt eases to a near-stop at the till (long tail, "hang"), then moves quickly to the shop icon (short ease) on "sini" | path-drawn-roving-keyframe-motion--after-effects-easing-pro |`

### Check
- Is the path built once as reusable control points, not re-typed per segment?
- Does at least one point on the path "hang" (long ease) while another passes through quickly (short ease), rather than uniform speed throughout?
- Is the whole path still within the house speed caps (~40 m/s, ~130°/s) at its fastest segment?
- Does the move still enter/exit the shot eased, never a hard linear start or stop?

## NOTES
- Visual gaps: the exact path shape and which keyframe heights were dragged are drawn by eye on screen; values above are illustrative (`~`).
- Rule conflicts: none structural — a hand-paced path move fits the house's eased, non-mechanical motion feel; keep peak speed under the house caps at the fastest segment.
- AE-only mechanics with no raea equivalent: the mask-path-to-position-keyframe paste shortcut, and roving keyframes as a
  literal keyframe type — both are replaced by authoring the path as a formula and controlling `t`'s easing per segment directly.
