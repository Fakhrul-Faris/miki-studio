---
title: Time remapping as a keyframe-independent ease tool (slow down anywhere, not just at existing keys)
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/After Effects Easing Pro Transcript.txt"
source_time: "11:27–12:17"
tool_target: raea
tier: full
use_when: "an already-built move needs an extra slow-down or lingering point that doesn't line up with any existing keyframe"
style_fit: "Fits house rules directly — it's a way to re-shape an existing eased move's pacing without re-keying it, useful for tuning a flight's hang time at a specific setup join."
---

## METADATA
01_Animation_Motion | After Effects (precompose + Time Remapping) | raea: ease a frame-lookup function instead of frame itself

## CREATIVE_INTENT
Roving keyframes only let you slow down at a point that already has a path vertex. Time remapping removes that limit: it
treats "how far into the animation we are" as its own animatable property, independent of the original position/path keys.
Precompose the roving-keyframe version, enable Time Remapping, and key it anywhere — the whole underlying animation can
be stretched or paused at any arbitrary point, then the remap keys themselves get eased, including via the value graph.
The source's own framing: "this way we aren't confined to our original key frames".

## STE_PROCEDURE
1. Finish the base motion (the path-drawn move or any other animation) inside its own precomposed layer.
2. Precompose the layer; enable Time Remapping on the precomp.
3. Key the remap value at the start (0, matching the precomp's own start time).
4. Add further remap keyframes at any point along the overall duration where a slow-down (or hold) is wanted — these do not need to land on the original animation's keyframes.
5. Ease every remap keyframe (select all, apply easing).
6. Shape the remap curve in the value graph as needed, the same as any other property.
7. Treat the remap value as a normal animatable channel from here — it can be slowed, reversed, or held like any other key.

## AGENT_EXECUTION
**raea:** since raea evaluates everything as a function of the output frame, "time remapping" is simply feeding an eased,
non-linear *lookup* frame into the base animation function instead of the raw frame — the base motion function doesn't change:
```tsx
// base motion, built once, parameterised by its own internal "clock" frame fc (0..N)
function baseMove(fc: number): V3 { /* path-drawn or any other animation, as if time ran linearly */ }

// time-remap: an eased mapping from real output frame f to the base motion's internal clock,
// with an extra slow-down/hold inserted at an arbitrary point that has no key in baseMove at all
const remap = interpolate(
  f,
  [f0, f0 + 20, f0 + 40, f0 + 44, f0 + 70],   // output frames: note the extra pair (40, 44) is a hold, not a baseMove key
  [0,   20,      28,      28,      50],        // internal clock: frozen between 40 and 44 (both map to clock 28)
  { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" },
);
const p = baseMove(remap);
<Mesh3d name="object" transform={Transform.fromXyz(...p)}>…</Mesh3d>
```
This decouples "where the camera/object looks like it is in its journey" from "which output frame we're on" — any extra
pause, slow-down or rush can be inserted purely in the `remap` curve, without touching `baseMove`'s own keys.

### Worked example
Topic: "stok habis dalam 3 hari" (illustrative; a stock-level bar drains on a path-drawn camera flight past shelf icons).
BEFORE: the camera flight's pacing is fixed by its original keyframes; adding a pause mid-flight means re-keying the whole move.
AFTER: frame brief Moves: "camera flight unchanged in its own keys; a time-remap layer adds one extra 0.3 s hold exactly
where the camera passes the near-empty shelf, on the word 'habis', without touching the flight's own keyframes." Shot-list
row: `| 7 | "stok habis dalam 3 hari" | camera flight along shelves, holds briefly at the emptiest shelf | hold synced to "habis" via time-remap, not a re-key of the flight | time-remapping-universal-ease--after-effects-easing-pro |`

### Check
- Could the extra slow-down/hold be added without re-keying the base motion itself?
- Is the remap curve itself eased (no linear jumps in the lookup), so the hold settles in and releases smoothly?
- Does the final motion still respect the house speed caps at its fastest point?

## NOTES
- Visual gaps: none — mechanism is fully describable from narration.
- Rule conflicts: none; this is a pacing tool, not a new motion style.
- AE-only mechanics with no literal raea equivalent: precompose + "Time Remapping" checkbox and its own keyframe track —
  the translation is architectural (parameterise the base motion by an internal clock, then ease the clock-lookup
  separately) rather than a one-line prop.
