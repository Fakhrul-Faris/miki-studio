---
title: Shape "morph" by instance + spin — two shapes share one transform, slide and turn ~200° on a sharp curve, cut at the peak
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Cleanest Match-Cut Transition for SaaS.txt"
source_time: "07:37–11:13"
tool_target: raea
tier: full
use_when: "an icon/badge changes meaning (a star rating → a 'verified' seal, a coin icon → a cart icon) in a UI scene"
style_fit: "Fits flat UI scenes and Style D labels; the turn is hidden by speed; keep the shapes in the one accent or neutral greys."
---

## METADATA
09_UI_Motion | DaVinci Resolve Fusion + free custom-shape plugin (source) → raea shared transform | raea / HyperFrames

## CREATIVE_INTENT
Shape morphing "creates a smooth, seamless transition from one shape or object to another". Instead of a path morph,
the second shape gets an **instance** of the first's transform, so it "snaps on the star, even has the same size".
Position alone "isn't looking natural", so rotation is added: angle keyed 0 → ~200° on frames 0 and 30. Both curves are
made sharp; cut at the middle; motion blur on.

## STE_PROCEDURE
1. Build shape A (source: circle with squircle lowered → 4-point star) and shape B (a four-leaf "flower").
2. Give both the same size and position by sharing one transform (instance).
3. Key the shared centre at frame 0 and frame 30, moving right.
4. Key the shared angle at frames 0 and 30; set the first key to ~200°.
5. Make both curves sharp peaks (in/out ~70–80 %).
6. At the middle frame, end shape A and start shape B.
7. Enable motion blur on the transform.

## AGENT_EXECUTION
raea: one transform object reused for both shapes:
```tsx
const p = interpolate(f, [0, 30], [0, 1], { easing: Easing.bezier(0.75, 0, 0.25, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const style = { transform: `translateX(${lerp(-180, 180, p)}px) rotate(${lerp(200, 0, p)}deg)` };
return f < 15 ? <StarIcon style={style} /> : <SealIcon style={style} />;
```
Icons from `tools/raea/kit/icons.tsx` (`Icon`) or real brand assets — not hand-drawn organic art.

### Worked example
Topic: "Macam mana nak tahu review Shopee tu betul" (S16, illustrative; no claim about the platform's system).
- BEFORE: 5 stars fade out; a "real buyer?" tick icon fades in.
- AFTER: on "betul", the 5th star slides right spinning from 200° on a 30-frame sharp curve; at frame 15 it is a magnifier icon that lands upright on "betul ke" — the step title follows.

### Check
- Do both shapes share exactly one transform (same size, position, angle)?
- Is there rotation as well as position (source: position alone looked unnatural)?
- Is the cut on the middle frame?

## NOTES
- raea check (2026-11-21): `<SealIcon>`, `<StarIcon>` in the code above are stand-ins for a component the episode builds (from raea primitives such as `Cuboid`, `ImagePlane`, `Text3D`), not a raea built-in. Define it before use.
- Fusion steps dropped: plugin shape controls (squircle, X scale), Ctrl+Shift+V instance node, spline editor per channel.
- The plugin name is not clearly spoken (STT "Ravise"); not needed for raea.
