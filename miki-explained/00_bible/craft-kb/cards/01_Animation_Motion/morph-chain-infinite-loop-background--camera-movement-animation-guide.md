---
title: Morph-chain infinite loop — each chunk becomes its neighbour
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/Camera Movement Animation Guide.txt"
source_time: "00:08–01:06"
tool_target: raea
tier: principle
use_when: "a looping travel feel without moving the camera: a row of repeated objects (coins, receipts, shop fronts, UI list rows) that seems to scroll forever, e.g. a 'multiply' beat or the last frame looping to frame 0"
style_fit: Fits — a loop built from the scene's own objects; ⚠ hand-drawn look itself not adopted (Style D is 3D macro) → adapted as a 3D/UI instance chain where each instance interpolates into its neighbour's slot.
---

## METADATA
08 craft → 01_Animation_Motion | hand-drawn 2D (source) | raea instance chain / HyperFrames list loop

## CREATIVE_INTENT
Principle: for an infinitely looping moving background, draw a background made of distinguishable chunks of the **same
type of object**; animate each chunk **morphing into the one directly next to it**. A new chunk starts to appear at the
start of the chain while the last one leaves view at the end. Fill in with more frames, always keeping each object's
travel direction — never let it move backwards ("next frame shown in red, move toward the red").

## STE_PROCEDURE
1. Build a row of N (~5–7) same-type objects at fixed slots.
2. Animate each object from its slot to the next slot over one loop period, changing shape/state toward the neighbour's.
3. Grow/fade a new object in at the first slot during the period (~0.4 s fade, never pop).
4. Shrink/fade the last object out at the end slot during the same period.
5. Check every frame: no object moves backward along the chain.
6. Repeat the period; frame P must equal frame 0.

## AGENT_EXECUTION
raea: drive all items from one phase `p = (f % P) / P`; item i sits at `slot(i + p)`; fade with `interpolate` on the
ends. Same loop in a UI scene = a list scrolling forever (rows morphing price RM4 → RM5 → RM6 as they pass).
```tsx
const f = useCurrentFrame(), P = 90;                     // 1.5 s period at 60 fps
const p = (f % P) / P;
{[0,1,2,3,4,5].map(i => {
  const s = i + p;                                       // continuous slot, never decreasing
  const o = interpolate(s, [0, 0.4, 5, 5.6], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <Mesh3d key={i} name={`coin-${i}`} transform={Transform.fromXyz(-0.15 + s * 0.06, 0, 0).withScale(Math.max(0.01, o))}>{/* coin */}</Mesh3d>;
})}
```

### Worked example
Line "Setiap hari, RM20 masuk" at a kuih stall in Melaka (illustrative):
- BEFORE: `| 6 | "setiap hari" | camera trucks along a long row of coins | — |` (camera move eats the setup's one move; row ends visibly).
- AFTER: `| 6 | "setiap hari" | locked macro, slow push 4 % | coin chain loops: each 50 sen coin slides into the next slot, a new one grows in left, the last fades out right; counter RM0 → RM20 on "RM20" | morph-chain-loop |`

### Check
- Does any object ever move backward?
- Does something enter at the start and leave at the end within each period (no pop)?
- Is frame P identical to frame 0?

## NOTES
- Visual gaps: the hand-drawn example frames are visual only; chunk morph details are artist choice.
- Source says it suits a hand-drawn style and is weak for detailed backgrounds; in 3D the instance chain carries detail fine.
