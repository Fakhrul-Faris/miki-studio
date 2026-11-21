---
title: Raycast a curve down onto a displaced ground — snap a drawn path to an uneven surface
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/GEOMETRY NODES Blender 4  Tutorial Procedural Pathways  (Step by Step).txt"
source_time: "02:02–04:19"
tool_target: raea
tier: principle
use_when: "a drawn curve (a route, a cable, a path of paving stones) must lie exactly on an uneven/displaced ground mesh — avoids props floating above or sinking into the surface"
style_fit: "Blender build-only fix for a specific, common failure mode (floating/sunken props on displaced terrain); bake the result, raea never raycasts."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Raycast, Set Position) | Geometry Nodes → bake → GLB

## CREATIVE_INTENT
A curve drawn in the viewport sits at whatever height it was drawn at — on a displaced/uneven ground, parts of it
end up above the surface and parts below. **Raycast** samples the ground mesh directly below (or from any chosen
direction) and returns the hit position, which **Set Position** then snaps the curve onto — so the path always
sits on the real surface, however bumpy.

## STE_PROCEDURE
1. Before raycasting, move the curve well above the ground (e.g. +10 m in Z) so every point starts clearly above
   the surface, not accidentally already below it.
2. Add **Raycast**; plug the ground mesh into **Target Geometry**; default ray direction (down, −Z) works for a
   path lying flat on ground.
3. Add a second **Set Position**; zero its offset and plug Raycast's **Hit Position** into its **Position** input —
   this is the actual snap.
4. **Resample the curve** (Resample Curve, Count ~10–15 as a start) before relying on the snap — too few points
   makes the path follow the ground only roughly (a low count also controls how many "gap" segments later paving
   steps will create, so don't over-resample here).
5. Hide the ground/grass temporarily and check the path from below/wireframe to confirm no point floats or sinks.
6. If the ground's displacement changes later, the raycast re-evaluates automatically — no need to re-snap by hand.

## AGENT_EXECUTION
```python
raise_up = N.new("GeometryNodeSetPosition")
up = N.new("ShaderNodeCombineXYZ"); up.inputs["Z"].default_value = 10.0
L.new(up.outputs["Vector"], raise_up.inputs["Offset"])

rc = N.new("GeometryNodeRaycast")
L.new(ground_geo, rc.inputs["Target Geometry"])
L.new(raise_up.outputs["Geometry"], rc.inputs[0])            # the curve as the ray source points

snap = N.new("GeometryNodeSetPosition")
L.new(raise_up.outputs["Geometry"], snap.inputs["Geometry"])
L.new(rc.outputs["Hit Position"], snap.inputs["Position"])   # offset left at 0
```
raea: no raycast node — bake the snapped curve/path mesh to GLB at build time; if the ground itself is later
adjusted live in a raea scene (unusual — ground is normally a static build asset), the path would need
re-baking in Blender, not a live raycast in TSX.

### Worked example
Topic: "Laluan troli dalam kedai — kenapa ia ikut bentuk lantai, bukan garis lurus?" (illustrative layout note).
BEFORE: `| 2 | "ikut bentuk lantai" | a hand-placed path mesh, some tiles floating slightly above the floor texture | path fades in | — |` — visible floating/sinking on a bumpy floor render.
AFTER: `| 2 | "ikut bentuk lantai" | curve raised +10 m, Raycast onto the displaced floor mesh, Set Position snaps every point to the Hit Position; resampled to 12 points first | path fades in already flush with the floor, 0.4 s | raycast-curve-snap-to-displaced-surface--procedural-pathways |`

### Check
- Was the curve raised above the surface before raycasting (so every ray starts from clearly above, not already
  intersecting)?
- Is the snap a zero-offset Set Position fed directly from Raycast's Hit Position (not an approximated height)?
- Was the curve resampled to a deliberate point count before relying on the snap (not left at the bezier's sparse
  control points)?

## NOTES
- Visual gaps: the exact resample count (10 vs 15) is tuned by eye on screen; keep as `~10–15` starting point.
- Rule conflict: none; this is a correctness fix (no floating/sunken geometry), not a visible stylistic choice.
