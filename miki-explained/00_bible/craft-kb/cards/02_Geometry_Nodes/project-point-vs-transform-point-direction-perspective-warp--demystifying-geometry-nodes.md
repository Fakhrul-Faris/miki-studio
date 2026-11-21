---
title: Project Point vs Transform Point vs Transform Direction — only one of the three reads perspective warp
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/Demystifying Geometry Nodes The Ultimate Guide to Mastering Blender's Procedural Power.txt"
source_time: "35:13–40:07"
tool_target: raea
tier: principle
use_when: "a custom GN rig moves points/vectors with a transform matrix and the brief's effect depends on whether position should shift (a point), or only facing should change (a direction) — e.g. billboarded icons vs a wind-direction arrow"
style_fit: "Blender build-logic only; raea has no matrix-apply nodes, but the point-vs-direction distinction maps directly onto 'move a Mesh3d' (point) vs 'only reorient a Mesh3d/Camera3d' (direction) and is worth stating explicitly in a frame brief."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Project Point / Transform Point / Transform Direction) | Blender build only

## CREATIVE_INTENT
A transform matrix can carry two different payloads for the same vector: **a point** (translation matters, and —
only for Project Point — perspective warp matters) or **a direction** (only rotation matters; translation and
perspective warp are ignored, because "which way" has no position). Using the wrong node silently drops or adds
motion the brief didn't ask for.

## STE_PROCEDURE
1. Ask: does this value represent a location (a point) or only a facing/heading (a direction)?
2. For a point that should also move with the matrix's translation column → **Transform Point**.
3. For a direction (a facing vector, a wind arrow, a normal-ish heading) that must ignore translation entirely →
   **Transform Direction**.
4. For a point that should additionally respond to the matrix's perspective-warp row (objects appear to spread
   apart or converge as "distance" changes, like a camera's foreshortening) → **Project Point** — this is the only
   one of the three that reads that row at all.
5. Before using Project Point for a deliberate "spread with distance" look, confirm the brief wants that
   foreshortening effect — it is a distinct, deliberate choice, not a side effect to stumble into.

## AGENT_EXECUTION
Blender GN: swap the node, not the matrix, when the payload type changes.
```python
node_for_payload = {
    "point_translates":              "FunctionNodeTransformPoint",
    "direction_facing_only":         "FunctionNodeTransformDirection",
    "point_with_perspective_warp":   "FunctionNodeProjectPoint",
}
```
raea: no matrix-apply nodes exist; the equivalent decision in TSX is which prop you drive —
`position` on a `Transform3d` (= point, translates) vs `rotation`/`look_at` (= direction, ignores translation) —
and raea's `Camera3d` perspective projection already applies the "spread with distance" effect automatically via
its FOV, so Project Point's perspective-warp row has no direct raea use; note it as `raea: no equivalent (Bevy's
camera projection already does this; no manual perspective-warp node needed)`.

### Worked example
Topic: "Kenapa kipas tunjuk arah angin, bukan ikut ke mana kipas tu bergerak?" (illustrative, plain mechanism).
BEFORE: frame brief just says "arrow rotates with the fan" — doesn't say whether the arrow's base should also
drift if the fan object is repositioned.
AFTER (frame brief field): `Moves: arrow is a DIRECTION — reorients with the fan's rotation only; its base position
never drifts even if the fan prop itself is nudged in a later pass (Transform Direction logic, not Transform Point)`.

### Check
- Does the frame brief state explicitly whether each animated value is a point or a direction?
- If the effect needs "things spread apart as distance increases", is that identified as deliberate (Project
  Point / camera perspective), not an accident of the wrong node?
- Does the raea note correctly say the camera's own projection already covers perspective spread (no custom node
  needed)?

## NOTES
- Visual gaps: none — demonstrated live with a grid and a plane from multiple angles.
- Rule conflict: none.
