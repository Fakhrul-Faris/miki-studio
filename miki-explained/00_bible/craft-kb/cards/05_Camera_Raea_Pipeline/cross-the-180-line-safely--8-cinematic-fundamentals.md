---
title: The 180-degree line, and how to cross it safely with a medial/head-on shot
bucket: 05_Camera_Raea_Pipeline
source: "Studio Lighting, Silhouettes & Color Theory/8 Cinematic Fundamentals for 3D Short Films #b3d.txt"
source_time: "10:01–11:48"
tool_target: shot-list
tier: full
use_when: "planning a run of setups around two fixed elements (two objects, a hero + a UI panel) that must keep their screen-side relationship across cuts"
style_fit: "Fits Style D's every-2–3 s setup changes: without this check, cutting between angles of the same pair of elements can silently swap which one reads as 'left' and 'right,' breaking spatial continuity the viewer never consciously notices but still feels as wrong."
---

## METADATA
05_Camera_Raea_Pipeline | Blender (tool-agnostic cinematography principle) | shot-list (continuity check across rows)

## CREATIVE_INTENT
Establish an imaginary line through two elements in a scene (two objects, two characters, a subject and what it
relates to). As long as every camera for that scene stays on one side of that line, their left/right screen
positions stay consistent across cuts. Jump the camera to the other side of the line without warning and the two
elements silently swap sides — confusing even when the viewer can't say why. The safe way to cross it is a medial or
head-on shot: a camera placed directly on the line itself (or straight-on to one element) as a bridging cut, after
which the camera can continue on the new side without the jump reading as wrong.

## STE_PROCEDURE
1. Before shooting a run of setups with two fixed elements, draw the line through them and note which side the
   camera is on for row 1.
2. Keep every subsequent camera in that run on the same side of the line.
3. If the next beat needs the opposite side, insert one medial/head-on shot (camera placed on the line, facing straight
   along it or straight at one element) between the two sides.
4. Resume normal angles only after that bridging shot has been used.

## AGENT_EXECUTION
Shot-list: add a "side" column (A/B) per row for any run built around two fixed elements; a row that must flip sides
gets "bridge: medial/head-on" inserted before it. raea: compute camera position relative to the line between the two
elements' world positions and keep its sign consistent; the bridging camera sits at position ≈ the midpoint, looking
straight along the line.
```tsx
// line runs along X between object A (-0.2, 0, 0) and object B (0.2, 0, 0); side = sign of camera's Z
const sideA = Transform.fromXyz(-0.3, 0.2, -0.5).lookingAt([0, 0.05, 0]);   // side A, both objects keep their screen sides
const bridge = Transform.fromXyz(0, 0.2, -0.6).lookingAt([0, 0.05, 0]);    // medial: on the line, head-on
const sideB = Transform.fromXyz(0.3, 0.2, 0.5).lookingAt([0, 0.05, 0]);    // side B, only reached after the bridge
```

### Worked example
Topic: comparing two competing kedai's prices for the same item, side by side (illustrative numbers).
BEFORE: L03 shows kedai A on the left; L05 jumps the camera to the far side without warning, and kedai A is now on
the right — reads as confusing even though nothing else changed.
AFTER: shot-list — "L03 side A (kedai A left, kedai B right)"; "L04 bridge: medial, camera head-on between them";
"L05 side B (kedai A right, kedai B left) — now a deliberate flip, read as a clean turn, not a continuity error."

### Check
- Does the shot-list mark a side (A/B) for every setup in a run built around two fixed elements?
- Does any side-flip go through a medial/head-on bridging shot instead of a direct jump?
- Do the two elements keep their screen-left/right relationship across every cut that stays on one side?

## NOTES
- Visual gaps: the jump-cut mistake is shown as a three-shot edited example (blue/red objects swapping sides);
  exact camera coordinates aren't given.
- Rule conflicts: none — a bridging medial shot is a plain cut, not a flashy transition.
