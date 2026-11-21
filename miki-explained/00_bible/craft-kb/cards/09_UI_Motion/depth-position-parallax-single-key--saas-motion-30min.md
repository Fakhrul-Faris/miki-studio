---
title: One shared key, different Z depths — free parallax speed without separate curves per layer
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Master SaaS Motion Graphics in 30 Minutes.txt"
source_time: "16:37–17:29"
tool_target: raea
tier: full
use_when: "a match-cut push/slide needs some elements (a cursor, a foreground icon) to visibly travel faster/further than the rest of the scene, without hand-authoring a second curve"
style_fit: "Fits raea's native 3D camera — this is literally perspective parallax, free once elements sit at different Z; keep speeds within the house camera-move cap."
---

## METADATA
09_UI_Motion | After Effects (3D layers, one null's 2D position key + per-layer Z offset) → raea: one driver, children at different Z | raea

## CREATIVE_INTENT
All elements (cursor, cards, button) are parented to one null and already share its single position key (everything
moves left together for the match-cut push). To make the cursor read as "closer" and livelier, the author simply moves
*that one layer* further toward the camera in Z (−2000) — "what will happen now also in the movement, you will see that
there will be a bit more depth. The cursor will go quicker than the rest. That's exactly what I want." No second curve
is authored: the existing shared 2D key, combined with perspective, automatically makes the nearer layer travel a larger
screen distance in the same time.

## STE_PROCEDURE
1. Build the shared move first: one controller moves everything together on one eased key.
2. Enable 3D on the layers that should feel closer/further.
3. Push the "should feel faster/bigger" layer toward the camera in Z only — do not re-key its X/Y.
4. Check the layer's apparent size/position after the Z push; nudge scale/position back to the intended frame, not the curve.
5. Confirm the resulting relative speed reads correctly at the cut's peak frame (where speed is highest).

## AGENT_EXECUTION
raea 3D: give the shared driver one transform, and place children at different `z` — the camera projection does the
differential-speed work:
```tsx
const worldX = interpolate(f, [a, a + 20], [0, -1.2], { ...CL, easing: inOut });  // one shared driver, world units
<Model transform={Transform.fromXyz(worldX, 0, 0)} />                             {/* far layer: normal Z */}
<Model transform={Transform.fromXyz(worldX * 1, -0.1, 0.6)} scale={0.6} />        {/* cursor: pushed toward camera */}
```
The near layer's `worldX * 1` with the *same* interpolation already reads faster on screen purely from perspective —
only adjust its local scale/offset, never give it a separate time curve.

### Worked example
Topic: a cursor tapping "Bayar" as the whole screen match-cuts to the next step (illustrative UI).
- BEFORE: the cursor and the UI card use the same 2D position key and the same screen speed — flat, no depth.
- AFTER: the UI card stays at its scene depth; the cursor is pushed closer to camera (same shared key, smaller scale,
  repositioned to compensate) — it now visibly races ahead of the card during the push, with zero extra keyframes.

### Check
- Is there still only one authored motion curve driving the group?
- Does the "faster" layer get its speed purely from a Z offset, not a second time-curve?
- Was its scale/position re-checked after the Z push (closer = bigger/more screen travel)?
- Is the resulting speed difference within the house camera-move cap?

## NOTES
- Visual gaps: exact Z value (−2000, an AE unit) and the compensating scale are visual only; raea units will differ by
  scene scale — tune to taste, keep the principle (one driver, Z does the rest).
- AE dropped: AE's 3D-layer toggle and absolute Z units — translated to raea's native 3D transform, which is a closer
  match than most AE techniques in this set.
