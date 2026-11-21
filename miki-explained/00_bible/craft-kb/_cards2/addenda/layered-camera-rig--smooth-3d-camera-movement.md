# Addendum → masters/05_Camera_Raea_Pipeline/layered-camera-rig.md
Source: "Minimalist Tech & SaaS 3D Staging/Smooth 3D Camera Movement in After Effects Transcript.txt" — throughout (chained nulls), 09:20–10:00 (value graph vs speed graph choice), 00:00–10:00 passim (overlap guidance).

## New VALUES BY SOURCE row
| parameter | smooth-3d-camera-movement |
|---|---|
| Chaining rule | each NEW, separate move (not just a different rig variant) gets its OWN new null, chained onto the previous null — "you are not going to make more than one movement on the same null because that defeats the whole purpose"; the master's existing layers (follow/dolly/shake) are fixed ROLES, this source instead chains one null per sequential MOVE in time (push in, then a later zoom, then a later pan — each its own link) |
| Easing-curve choice by position in the move | explicit rule: use the VALUE graph (ease-in/ease-out shape) when the move is at the very start or very end of the clip; use the SPEED graph (a smooth hump/bump shape, not too sharp) when the move happens in the MIDDLE of a clip, neither at its start nor its end |
| Overlap amount | "overlap the key frames of different nulls... not complete overlap but partially" — a specific caution against making chained moves either fully sequential (stiff) or fully simultaneous (muddy); partial overlap is the target |
| Key spacing | "the more space you have between your key frames, the smoother your movement will be" — wider key spacing is explicitly named as a smoothness lever on its own, independent of easing shape |

## Extra steps
1. For a sequence of several distinct moves on one shot (not just rig-role layers), chain a new null per move in time order,
   each linked to the previous null, rather than re-using one null for multiple moves.
2. Choose the easing graph by the move's position in the clip: value graph (clean ease-in/out) for a move that starts or
   ends the clip; speed graph (gentle hump, not sharp) for a move that happens mid-clip.
3. When moves are chained, overlap their keyframe ranges partially — not sequential (gap between moves) and not fully
   simultaneous (stacked) — for continuous, non-stiff motion.
4. Independent of easing shape, widen keyframe spacing (more frames between keys) as its own smoothness lever.

## raea
```tsx
// chained moves in time, each its own "null" (a named offset function), partially overlapping
const move1 = interpolate(f, [0, 40], [0, 1], { easing: Easing.inOut(Easing.cubic) });                 // start of clip: value-graph-style ease both ends
const move2 = interpolate(f, [28, 70], [0, 1], { easing: Easing.inOut(Easing.sin) });                    // mid-clip: speed-graph-style gentle hump, overlapping move1's tail (28–40)
const z = -0.3 * move1 - 0.5 * move2;   // sum of chained offsets, partial overlap already baked into the ranges
```

## Notes
- No numeric overlap fraction given ("partially" only); the 12-frame overlap convention already used elsewhere in this
  KB (linear-vs-eased-interpolation.md's virtual span) is a reasonable `~` starting point, not sourced from this video.
