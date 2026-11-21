---
title: Animate a gradient's phase offset for a seamless loop
bucket: 06_Art_Direction
source: "Procedural Mograph & 3D-to-AI Render Passes/Do This Next Time You Pick Colors for Your Art (Blender Tutorial).txt"
source_time: "13:15–14:53"
tool_target: raea
tier: full
use_when: "a background or texture graphic needs to drift or cycle without a visible seam (e.g. a looping backdrop behind a stat, a subtle ambient motion layer)"
style_fit: "A motion-of-a-flat-graphic-layer technique; keep it slow and eased per house rule (no flicker, no sudden pop) — it is background motion, never the camera or hero object."
---

## METADATA
06_Art_Direction | Blender Wave Texture phase (geometry nodes) | raea interpolate/Easing on a shader-equivalent uniform

## CREATIVE_INTENT
A texture's position offset (here, a Wave Texture's phase feeding into per-instance Z/position) can be keyframed
from 0 at frame 1 to exactly 2π (one full cycle: `2*pi`) at the last frame. Because a sine-based phase is periodic,
the value at frame 1 and the final frame are identical, so the animation loops with no visible jump or reset.

## STE_PROCEDURE
1. Drive the moving element's offset from a periodic function (the source uses a Wave Texture's phase).
2. Set the timeline to the intended loop length (author used 300 frames).
3. At frame 1, set the phase/offset value to 0.
4. At the final frame, set the phase/offset value to exactly `2 * pi` (one full period) — not an arbitrary large number.
5. Keyframe both ends; the interpolation between them is the loop.
6. Play back and confirm frame 1 and the final frame read identically (no pop/jump at the loop point).

## AGENT_EXECUTION
In raea, drive the same kind of periodic offset with `interpolate` across the clip's frame range, from `0` to
`2 * Math.PI`, feeding a sine-based position/uniform rather than a literal translate (a literal 0→2π position
would itself jump; the point is to feed a period into a `sin`/`cos`-driven value so the start and end states match).
```tsx
const phase = interpolate(f, [0, 300], [0, 2 * Math.PI]);   // loops because sin(phase) at f=0 === sin(phase) at f=300
const drift = Math.sin(phase) * AMPLITUDE;
```
### Worked example
Topic: a slowly breathing accent-colour wash behind the Meikigo logo end card (illustrative use).
BEFORE: a looping background clip that visibly jumps/resets every cycle, a distracting flicker on loop.
AFTER: the wash is driven by a sine phase keyframed 0 → 2π over the card's full hold; the loop point is invisible.
### Check
- Is the driving value periodic (sin/cos of a phase), not a raw position that would jump at the loop?
- Does the end keyframe sit at exactly one full period (2π, or the periodic function's equivalent) from the start?
- Played back, is the loop point invisible?

## NOTES
- Visual gaps: none — the keyframe values (frame 1 = 0, frame 300 = 2*pi) are stated directly in speech.
- House rule: this drives a flat background/graphic layer, not a camera move or hero object — keep amplitude small and eased so it never reads as a flashy transition.
