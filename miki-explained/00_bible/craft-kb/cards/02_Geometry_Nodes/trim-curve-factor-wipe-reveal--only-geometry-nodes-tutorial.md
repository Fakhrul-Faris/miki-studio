---
title: Trim Curve (Factor mode) — a scale-independent 0→1 wipe to reveal or retract a line
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/The ONLY Geometry Nodes Tutorial You'll Ever Need!.txt"
source_time: "09:41–11:00"
tool_target: raea
tier: full
use_when: "an on-screen line/path/route needs to draw itself in or retract (a route tracing in, an underline appearing under a word, a wire tracking from A to B) — the 'on-screen event lands on the word' beat for any line-shaped diagram"
style_fit: "Exactly the house 'objects fade/grow in ~0.4 s' rule applied to a curve — gives a controllable, re-scalable wipe instead of keyframing per-vertex visibility by hand."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Trim Curve, Factor mode) | Geometry Nodes → animated or baked for raea

## CREATIVE_INTENT
A curve can be trimmed from either end. In **Factor** mode the trim values are always 0 (start) to 1 (end)
regardless of the curve's actual length, so the same two animated sliders work no matter how the curve is later
resized or redrawn — unlike Length mode, which breaks if the curve changes.

## STE_PROCEDURE
1. Add **Trim Curve**, leave its **Sampling Mode = Factor** (not Length) so values stay 0–1 independent of scale.
2. Animate/expose **Start** from 0→(reveal point) to draw the line in; animate **End** from (retract point)→1 to
   make it disappear from the tail, or move both together to make a "traveling" visible segment.
3. Apply Trim Curve **before** Curve to Mesh (it only works on curve data, not on a mesh).
4. Land the Start/End change exactly on the spoken word per the house rule ("an on-screen event about every
   second, on the word"), eased in-out over ~0.4 s, never a hard pop.
5. If the line needs thickness as well, chain into Curve to Mesh after trimming (see the profile-curve card).

## AGENT_EXECUTION
```python
trim = N.new("GeometryNodeTrimCurve"); trim.mode = 'FACTOR'
L.new(main_curve.outputs["Curve"], trim.inputs["Curve"])
trim.inputs["Start"].default_value = 0.0; trim.inputs["End"].default_value = 0.0   # animate End 0→1 to draw in
```
raea: no native curve/trim node. Fake the same wipe in TSX with an SVG `stroke-dasharray`/`stroke-dashoffset`
reveal for a 2D line layer, or — for a 3D lofted line baked from Blender — export the Trim-animated mesh as a
sequence/shape-key, or simpler: scale a pre-built GLB line segment's length prop from 0→1 along its own local axis
if the path is straight; for a curved 3D path with no raea curve node, bake the trimmed animation in Blender and
export it as a short clip/sequence rather than attempting a live per-frame trim in TSX.

### Worked example
Topic: "Macam mana duit anda sampai dari bank ke kedai runcit?" (illustrative flow diagram, plain mechanism).
BEFORE: `| 4 | "duit sampai ke kedai" | a static line with an arrowhead | arrow pulses | — |` — the line is already there, no sense of travel.
AFTER: `| 4 | "duit sampai ke kedai" | one curve from bank icon to kedai icon; Trim Curve End animates 0→1 across the line, drawing the route in as the word lands | route draws in 0.6 s on "sampai", eased in-out, no pop | trim-curve-factor-wipe-reveal--only-geometry-nodes-tutorial |`

### Check
- Is Sampling Mode set to Factor (not Length), so the wipe survives a later curve-length edit?
- Does the Start/End animation land on the spoken word, eased over ~0.4 s (no hard pop)?
- If raea has no curve data, was the trim baked in Blender rather than faked with a generic wipe/dissolve
  (forbidden "generic wipes" transition)?

## NOTES
- Visual gaps: none — the Factor-vs-Length distinction and the 0–1 behaviour are shown directly.
- Rule conflict: ⚠ a raea-side "fake wipe" risks reading as the forbidden generic wipe transition — only use a
  dash-offset reveal when it's drawing a real diagrammatic line (a route, a wire), never as a scene transition.
