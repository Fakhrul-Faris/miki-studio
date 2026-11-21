---
title: Halves + thirds combined for slow → fast → slow (and thirds for constant speed)
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/Animate Like a Japanese Pro Tips.txt"
source_time: "02:35–03:13"
tool_target: raea
tier: full
use_when: "keying an object move or camera flight between two setups that must ease in AND out with few keys (e.g. a coin travelling from the counter to the tray)"
style_fit: Strong — the in-out ease our camera flights and object moves must have, from three hand-placed keys, no overshoot.
---

## METADATA
01_Animation_Motion | 2D hand-drawn in-betweening (source) | raea `interpolate` key lists / HyperFrames keyframes

## CREATIVE_INTENT
"Don't only use thirds — add it to your arsenal and combine it with putting frames in the middle." For a move that starts
slowly from A, picks up speed and eases into B: draw A and B, put one in-between in the **middle**, then one at **1/3**
between A and that middle, and one at **2/3** between the middle and B. Result positions 0, 1/6, 1/2, 5/6, 1 → gaps
1/6, 1/3, 1/3, 1/6: a speed-up and a slow-down. Thirds alone at exactly 1/3 and 2/3 give **constant speed**.

## STE_PROCEDURE
1. Set the two key poses, A and B.
2. Place the first in-between exactly halfway between A and B.
3. Place the next in-between 1/3 of the way from A to the halfway frame.
4. Place the next in-between 2/3 of the way from the halfway frame to B.
5. Time all keys evenly; play and confirm the gaps grow, then shrink.
6. For constant speed, place in-betweens at exactly 1/3 and 2/3 instead.
7. For more frames, subdivide each half again by thirds toward its slow end (A side: 1/3; B side: 2/3).

## AGENT_EXECUTION
- Camera flights between setups and object travels (RECIPE-D §6.3 flights, "multiply", "slide") need in-out eases. When
  a move is hand-keyed rather than an `Easing.inOut` curve, key it with this 5-point list.
- A mid key used for an arc (object rising over the counter) keeps its value at the halfway point; the thirds keys either
  side give the ease.

raea:
```tsx
const f = useCurrentFrame();                // 60 fps
const s = 300, n = 48;                      // 0.8 s travel
const k = [s, s + n/4, s + n/2, s + 3*n/4, s + n];
const u = interpolate(f, k, [0, 1/6, 1/2, 5/6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const A = [0, 0.9, 0], B = [0.3, 0.9, 0];  // coin start/end (m), plain arithmetic
const lift = interpolate(f, k, [0, 0.02, 0.05, 0.02, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); // arc on the 1/2 key
<Mesh3d name="coin" transform={Transform.fromXyz(A[0] + (B[0]-A[0])*u, A[1] + lift, A[2])}>{/* coin mesh */}</Mesh3d>
```
Equivalent continuous curve: `Easing.inOut(Easing.sin)` / `Easing.inOut(Easing.cubic)`; check the first and last gaps are
about half the middle gaps (1/6 vs 1/3).

### Worked example
Kedai runcit in Shah Alam, line "Duit syiling RM0.50 tu masuk tabung" (illustrative):
- BEFORE: `| 7 | "masuk tabung" | side on the counter, camera follows | coin linear 0 → 1 over 0.8 s |` — starts and stops at full speed.
- AFTER: `| 7 | "masuk tabung" | side on the counter, camera eases with the coin | coin keys 0, 1/6, 1/2, 5/6, 1 over 0.8 s, 5 cm arc on the 1/2 key, lands on "tabung" | halves-plus-thirds |`

### Check
- Are the first and last gaps the smallest (~half the middle gaps)?
- Is the halfway key at exactly 1/2 of the travel and timed at half the duration?
- For a deliberate constant move, are keys at 1/3 and 2/3 with no ease?

## NOTES
- Visual gaps: none for the method; the circles diagram is fully described in speech.
- Sibling card: `thirds-inbetween-true-ease--animate-like-japanese-pro.md` (why halves alone fail).
- Camera speed caps still apply (≤ ~40 m/s, ≤ ~130°/s); the middle gaps are the fastest — check them.
