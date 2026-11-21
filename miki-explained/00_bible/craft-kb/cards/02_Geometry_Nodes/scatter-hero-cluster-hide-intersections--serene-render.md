---
title: Scatter a cluster of one asset (hexagonal rocks) and morph it into place; hidden intersections are fine for a still
bucket: 02_Geometry_Nodes
source: "Making a SERENE render in blender.txt"
source_time: "12:27–13:09, 15:15–16:42"
blender_version_source: 3.x/4.x?
tool_target: Geometry Nodes
tier: principle
style_fit: Useful for set dressing around the hero object (coins, beans, pills) — but our cameras move, so hidden intersections must stay hidden along the whole camera path.
---

## METADATA
02_Geometry_Nodes | 3.x/4.x? → 4.2+ | Geometry Nodes

## CREATIVE_INTENT
Principle: once the direction is clear, fill the scene with many copies of one stylised element (here a cluster of hexagonal basalt-like rocks layered with trees) so it reads as one material. How you scatter does not matter — Geometry Nodes, a particle system or hand duplication. Idea: copies may pierce walls and floors if the camera never sees it.

## STE_PROCEDURE
1. Make or import one cluster asset (video: stylised hexagonal rock columns).
2. Scatter copies with Geometry Nodes, a particle system, or by hand-duplicating (speaker gives no node details).
3. Push and scale copies into place until the silhouette reads from the shot camera.
4. Colour-match the scattered asset to the scene (see the colour-match card).
5. Before export, check every camera of the shot; delete copies that intersect visibly.

## AGENT_EXECUTION
Speaker does not narrate the node tree; a standard scatter:
- `Mesh Plane [Mesh] -> Distribute Points on Faces [Mesh]` (Density ~20, Seed 0)
- `Distribute Points on Faces [Points] -> Instance on Points [Points]`
- `Collection Info [Instances] (Separate Children on, Reset Children on) -> Instance on Points [Instance]`, `Pick Instance` on
- `Random Value (Float, 0.6–1.4) [Value] -> Instance on Points [Scale]`
- `Random Value (Vector, Z 0–6.283) [Value] -> Instance on Points [Rotation]`
- `Instance on Points [Instances] -> Realize Instances -> Group Output [Geometry]` (realize before GLB export)
```python
import bpy
ob = bpy.data.objects["ScatterBase"]
mod = ob.modifiers.new("Scatter", 'NODES')   # build the tree above in mod.node_group
bpy.ops.object.modifier_apply(modifier="Scatter")
```
raea: draw the exported, realised GLB with `<Model src={staticFile("rocks.glb")} />`. Keep instance counts under ~300 animated meshes (limits.md); static realised geometry in one GLB is fine.

## NOTES
- Deprecated: none.
- Visual gaps: the scatter setup is explicitly skipped by the speaker ("not going to talk about the technical specifics").
- Rule conflicts: "doesn't matter if it looks bad behind the camera" holds for a still only; our camera flies every 2–3 s, so run a camera-path scan for intersections before hand-off.
