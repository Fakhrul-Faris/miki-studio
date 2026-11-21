---
title: Calculate a Motion Path to see and debug an object's real 3D arc
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/Mastering Blender Graph Editor.txt"
source_time: "27:14–27:51, 28:51–28:59"
blender_version_source: 4.3 (unstated; workflow unchanged across 3.x–5.x)
tool_target: Blender bpy | raea (debug-only)
tier: full
use_when: "pose-to-pose frame-by-frame animation (no rig/IK) isn't reading right in 3D, and the Graph Editor's per-channel curves don't show the combined spatial path"
style_fit: "A diagnostic tool, not a look — no conflicting house rule. Useful whenever a hero object's flight/flip/arc (camera flights, object morphs between setups) needs checking in 3D rather than per-axis."
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy (Pose › Motion Paths › Calculate, or Object equivalent) + raea (plot the same curve in a scratch viewer before finalizing)

## CREATIVE_INTENT
Per-channel Graph Editor curves (rotation X, location Z, …) don't show how an object actually travels through 3D
space — "we can actually see where our object is moving in the 3D space which is really, really helpful." Calculating
a Motion Path draws the real spatial trail dot-by-dot in the viewport, which is how the source catches that a fish's
flip arc needs an earlier "almost back" moment and an exact frame where it re-contacts the pan, rather than guessing
from four separate rotation/location curves.

## STE_PROCEDURE
1. Pose-to-pose-animate the object by eye first (new key every 1–3 frames, no interpolation trusted).
2. Select the bone/object whose 3D path you want to see.
3. Go to Pose (or Object) › Motion Paths › Calculate; accept the default range (or set it to the shot's frames).
4. Read the plotted dots as the real arc: where it bulges, where it's flat, where two frames nearly overlap (too
   little motion) or jump far apart (too much).
5. Adjust individual keys/poses against this 3D trail, not against the separate per-axis graphs.
6. Recalculate after any pose change so the trail stays current before the next judgment pass.
7. Clear the motion path before final render (it's a viewport-only debug overlay).

## AGENT_EXECUTION
**Frame brief / shot-list use:** when planning a camera flight or object-morph setup that must arc through 3D (not
just ease per-axis), verify the planned path as a 3D polyline before committing keyframes — in Blender via Motion
Paths; in raea by sampling the same transform function at every frame and plotting the points in a throwaway debug
pass (never shipped in the render).

```python
# Blender: calculate via operator (defaults are usually fine)
bpy.ops.pose.paths_calculate()   # on the selected bone, or bpy.ops.object.paths_calculate() for objects
```
raea has no built-in path overlay; debug the same way computationally before trusting a flight/morph:
```tsx
// scratch-only: sample every frame's position and print/compare neighbours; never rendered
for (let f = start; f <= end; f++) {
  const p = flightPos(f);           // the same function driving the shot
  console.log(f, p);                // eyeball spacing/arc by the numbers; delete before finalizing
}
```

### Worked example
Topic: "Mesin kopi RM300 untuk gerai: balik modal berapa cawan?" (illustrative).
BEFORE: a counter-chip "flies" from off-frame to the coffee machine on four separately-eased position/rotation
curves; on playback it clips through the machine's edge because no one checked the combined 3D path.
AFTER: calculate the chip's Motion Path, see it cuts the corner of the machine mesh at frame 18, and nudge that
key's Y value out by ~0.03 m so the arc clears the mesh — caught before render, not after.

### Check
- Was the object's real 3D trail checked (Motion Path, or a sampled print-and-compare in raea) before trusting
  per-axis curves alone?
- Does the trail avoid clipping through other geometry at any frame in the shot?
- Is the debug overlay/printout removed before the final render (never shipped as an on-screen element)?

## NOTES
- Visual gaps: the exact "where it bulges" judgments are made by eye on the plotted dots — not reducible to numbers.
- Rule conflicts: none; purely a debugging aid.
