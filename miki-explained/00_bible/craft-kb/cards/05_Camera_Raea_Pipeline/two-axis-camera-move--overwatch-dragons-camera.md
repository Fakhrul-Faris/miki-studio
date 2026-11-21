---
title: Combine two axes of camera movement when a move has no clear motive
bucket: 05_Camera_Raea_Pipeline
source: "Studio Lighting, Silhouettes & Color Theory/Overwatch Dragon Brothers - Visual language and 3D camera lessons.txt"
source_time: "07:20–07:58, 12:12–12:37"
tool_target: raea
tier: full
use_when: "a setup with no object moving to motivate the camera (a held label, a static shelf)"
style_fit: "Fits: a rise + lateral drift reads as considered, not generic; both axes eased together, combined speed under ~40 m/s and turn under ~130°/s."
---

## METADATA
05_Camera_Raea_Pipeline | general | raea camera

## CREATIVE_INTENT
"Sometimes when there's no clear motivation for the camera movement and you're just trying to make something
interesting, a cool practice is to combine multiple axes of camera movement. Instead of just going up or just coming
from the side, they're combining going up and left. That makes it look a little more dynamic and unique." Later: "they
could have just pulled out … they combined two axes: it pulls back and tilts up."

## STE_PROCEDURE
1. Before keying a single-axis move on a static subject, check whether anything in frame motivates it.
2. If not, pick two axes (rise + truck left; pull back + tilt up).
3. Key both on the same frames with the same ease.
4. Keep the secondary axis smaller (~30–50 % of the main travel, `~`).
5. End on a composed frame.

## AGENT_EXECUTION
raea:
```tsx
const p = interpolate(f, [S, E], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<Camera3d transform={Transform.fromXyz(lerp(0.06, -0.03, p), lerp(0.03, 0.10, p), 0.22).lookingAt([0, 0.02, 0])}
          projection={{ Perspective: { fov: (35 * Math.PI) / 180 } }} />   // rise + truck left (~ macro metres)
```

### Worked example
Topic: "Harga minyak masak paket vs botol" (illustrative).
- BEFORE: `| 4 | "Paket 1 kg RM2.50" | slow push on the static pack |`
- AFTER: `| 4 | "Paket 1 kg RM2.50" | camera rises ~7 cm while trucking left ~9 cm, ending above-left of the pack | "RM2.50" tag fades in on "RM2.50" | two-axis-camera-move |`

### Check
- Is there no in-frame motive for the move (else follow the motive instead)?
- Are both axes keyed on the same frames and ease?
- Is the secondary axis smaller than the main one?

## NOTES
- Visual gaps: exact travel in the trailer is visual only.
