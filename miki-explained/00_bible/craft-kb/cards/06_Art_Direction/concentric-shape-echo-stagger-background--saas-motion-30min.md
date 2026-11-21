---
title: Concentric faint duplicates of the hero shape, staggered, for ambient background movement
bucket: 06_Art_Direction
source: "Motion Feel, Easing & Camera Choreography/Master SaaS Motion Graphics in 30 Minutes.txt"
source_time: "11:52–13:12"
tool_target: raea
tier: principle
use_when: "a flat UI/hero card scene feels static behind the main action and needs ambient depth/movement without adding new content"
style_fit: "Fits as a background-only device for UI-heavy 2D scenes; keep opacity low (≤15%) so it reads as atmosphere, never competes with the one accent."
---

## METADATA
06_Art_Direction | After Effects (duplicate-and-scale-up shape chain, staggered keyframes) → raea: array of scaled copies with offset timing | raea

## CREATIVE_INTENT
Take the hero shape (the card/button), duplicate it several times, scaling each copy up a bit more than the last until
reaching the frame edge, then drop every copy's opacity to near-invisible (~5%, raised slightly to ~15% once stacked).
The nested outlines alone read as "atmosphere." To add life, the whole stack gets one shared scale move (eased), but
each copy's keyframes are nudged a frame or two apart from its neighbour so the echo breathes outward rather than
pulsing as one flat unit.

## STE_PROCEDURE
1. Duplicate the hero shape 3–5 times, scaling each copy up from the last until the outermost nearly fills the frame.
2. Drop every copy to very low opacity (≈5–15% combined), enough to be felt, not read as shapes.
3. Give the whole stack one shared eased scale move (e.g. a settle-in on entrance).
4. Offset each copy's keyframes from its neighbour by 1–4 frames so the move ripples outward, not in lockstep.
5. Keep the hero shape itself at full strength in front of the stack.

## AGENT_EXECUTION
raea: generate the echo array from the same path/size as the hero, mapped with an index-based time offset:
```tsx
[1, 2, 3, 4].map(i => {
  const scale = 1 + i * 0.18;
  const localF = f - i * 2;                                         // stagger 2 f per ring
  const s = interpolate(localF, [a, a + 16], [1.0, scale], { ...CL, easing: out });
  return <Shape key={i} path={heroPath} scale={s} opacity={0.12} />;
});
```

### Worked example
Topic: a savings-goal card settling into frame (illustrative numbers on the card).
- BEFORE: the card appears against a flat, static background.
- AFTER: four faint outlines of the same card shape ripple outward behind it as it settles, each a frame or two behind
  the last — the scene feels alive without any new on-screen content.

### Check
- Is each ring the hero's own shape, not an unrelated decorative element?
- Is total background opacity low enough that it reads as atmosphere, not competing shapes?
- Is each ring's timing offset from its neighbours (not one flat pulse)?
- Does the hero shape stay clearly dominant in front of the stack?

## NOTES
- raea check (2026-11-21): `<Shape>` in the code above is a stand-in for a component the episode builds (from raea primitives such as `Cuboid`, `ImagePlane`, `Text3D`), not a raea built-in. Define it before use.
- Visual gaps: exact scale increments and per-ring frame offsets beyond "a few more times" / "move it a bit" are
  visual only.
- AE dropped: manual Command+D duplicate-and-scale chain with Motion Tools stagger plugin — translated to a generated
  array with a computed stagger, which replaces the plugin cleanly in code.
