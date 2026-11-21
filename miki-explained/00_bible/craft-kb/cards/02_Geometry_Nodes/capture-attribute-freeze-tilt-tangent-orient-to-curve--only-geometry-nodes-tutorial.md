---
title: Capture Attribute (freeze curve tilt + tangent) → double Align Rotation to Vector — fully orient instances to a path
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/The ONLY Geometry Nodes Tutorial You'll Ever Need!.txt"
source_time: "17:12–19:49"
tool_target: raea
tier: full
use_when: "instances scattered along a curved path (notes on a staff, icons along a route, beads on a wire) must stay upright AND rotated to the path's own twist — not just facing forward along the curve"
style_fit: "Produces instances that read as physically attached to the path, which matters for a hero prop traveling a route; avoids the 'instances float, ignoring the curve's roll' look."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Capture Attribute, Curve Tilt, Curve Tangent, Vector Rotate, Align Rotation to Vector ×2) | Geometry Nodes → bake for raea

## CREATIVE_INTENT
Later nodes in the chain (resampling, offsetting points) change what "tilt" and "tangent" would read at that point
— so the curve's tilt and tangent must be **captured right after resampling, before any offset**, then carried
through the rest of the graph as frozen values. Two chained **Align Rotation to Vector** nodes (one per axis) then
orient each instance to both the curve's direction of travel (tangent) and its roll/twist (tilt), so instances
stay correctly "attached" even as points are later moved off the curve.

## STE_PROCEDURE
1. Resample the curve to even spacing **first**.
2. Add **Capture Attribute** right after the resample, domain = Point; plug in a **Curve Tilt** node and a **Curve
   Tangent** node as the values to capture — this freezes both at that point in the chain.
3. Do all later point-offset work (height variation, random displacement, etc.) downstream of the capture — the
   captured tilt/tangent stay correct even though the points themselves move.
4. Build the "up" vector: start from a constant `(0,0,1)`, then **Vector Rotate** it using the captured tangent as
   axis and captured tilt as angle, so "up" itself follows the curve's twist.
5. Add **Align Rotation to Vector** #1: Axis = X, Pivot = Auto, Vector = the captured tangent — orients to the
   direction of travel.
6. Add **Align Rotation to Vector** #2 right after: Axis = Z, Pivot = Y, Vector = the twisted "up" vector from step
   4 — adds the roll/tilt on top of the first alignment.
7. Feed the combined Rotation into **Instance on Points** [Rotation].

## AGENT_EXECUTION
```python
cap = N.new("GeometryNodeCaptureAttribute"); cap.domain = 'POINT'
tilt = N.new("GeometryNodeInputCurveTilt"); tan = N.new("GeometryNodeInputTangent")
L.new(tilt.outputs["Value"], cap.inputs[1]); L.new(tan.outputs["Tangent"], cap.inputs[2])   # ~ socket indices by version
up0 = N.new("FunctionNodeInputVector"); up0.vector = (0, 0, 1)
vr = N.new("FunctionNodeVectorRotate")
L.new(up0.outputs["Vector"], vr.inputs["Vector"]); L.new(cap.outputs[2], vr.inputs["Axis"]); L.new(cap.outputs[1], vr.inputs["Angle"])
a1 = N.new("FunctionNodeAlignRotationToVector"); a1.axis = 'X'; a1.pivot_axis = 'AUTO'
L.new(cap.outputs[2], a1.inputs["Vector"])
a2 = N.new("FunctionNodeAlignRotationToVector"); a2.axis = 'Z'; a2.pivot_axis = 'Y'
L.new(vr.outputs["Vector"], a2.inputs["Vector"]); L.new(a1.outputs["Rotation"], a2.inputs["Rotation"])
L.new(a2.outputs["Rotation"], instance_on_points.inputs["Rotation"])
```
raea: no curve/instancing nodes. Bake the final per-instance transforms (position + rotation) into the GLB at
build time (each instance becomes a child node in the exported mesh hierarchy); raea only places/renders the
resulting `<Model>`. If a handful of instances must be placed live in TSX along a known path, precompute each
instance's rotation from the path's tangent/up at build time and bake it into a static list — never attempt a
live curve-orientation calc per frame in raea.

### Worked example
Topic: "Troli runcit ikut laluan rak — kenapa ia senget ikut selekoh?" (illustrative route visualization).
BEFORE: `| 5 | "ikut selekoh" | trolley icons placed along a path, all facing the same flat direction | icons fade in | — |` — ignores the path's curve/banking.
AFTER: `| 5 | "ikut selekoh" | trolley icons' tilt + tangent captured right after resample (before offset), oriented via double Align Rotation to Vector so each one banks with the path's turn | icons fade in already banked to the curve, 0.4 s | capture-attribute-freeze-tilt-tangent-orient-to-curve--only-geometry-nodes-tutorial |`

### Check
- Was tilt/tangent captured immediately after resample, before any point offset?
- Are both Align Rotation to Vector nodes present (tangent axis, then tilt/up axis) — a single alignment only
  covers direction of travel, not roll?
- Is the final result baked to GLB rather than computed live in raea?

## NOTES
- Visual gaps: the exact Vector Math wiring for "rotate the up vector by tangent/tilt" is dense and narrated as a
  "whole rabbit hole" the creator skips deriving — treat the node chain above as the followable recipe, not a
  from-scratch derivation.
- Rule conflict: none; this is rig plumbing, not a visible transition.
