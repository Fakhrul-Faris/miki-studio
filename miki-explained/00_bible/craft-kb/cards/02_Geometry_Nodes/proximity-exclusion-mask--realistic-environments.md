---
title: Proximity mask — keep scatter out of (and smaller near) other objects
bucket: 02_Geometry_Nodes
source: "The Key to Realistic Environments in Blender.txt"
source_time: "05:47–06:17"
blender_version_source: 3.x
tool_target: Geometry Nodes
tier: principle
style_fit: Stops dressing pieces intersecting the hero object or each other — intersections read as cheap at macro distance.
---

## METADATA
02_Geometry_Nodes | 3.x → 4.2+ | Geometry Nodes

## CREATIVE_INTENT
Principle: scattered things shouldn't grow inside rocks or trees; near an obstacle they thin out and shrink. Use it to keep a clean, readable gap around the hero object so it stays the subject.

## STE_PROCEDURE
Method / how-to:
1. Set the obstacle (e.g. the rock scatter system or the hero object) as the proximity target.
2. Measure distance to the target's full geometry, not just its origin points ("Use Pivots Only" off).
3. Remove points closer than a set distance.
4. Shape the falloff with a curve and a distance multiplier so instances shrink approaching the target.

## AGENT_EXECUTION
### Source tool (G-Scatter)
Distribution/Scale tab → add **Proximity** effect → Target = rock scatter system → disable **Use Pivots Only** → tweak curve and Distance Multiplier (values unknown).

### Blender / raea translation (GN, 4.2+)
`Object Info(Hero, As Instance off) [Geometry] -> Geometry Proximity(Target Element = Faces) [Target]`;
`Geometry Proximity [Distance] -> Compare(Float, Less Than, B = ~0.15) [Result] -> Delete Geometry(Domain Point) [Selection]` on the points (before Instance on Points);
`Geometry Proximity [Distance] -> Map Range(From 0.15–~0.6 → To 0.3–1, Clamp) [Result] -> Math(Multiply) -> Instance on Points [Scale]` (curve shape: Float Curve node after Map Range ~).
```python
import bpy
ng = bpy.data.node_groups["Scatter"]; N, L = ng.nodes, ng.links   # ~ the scatter GN tree
oi = N.new('GeometryNodeObjectInfo'); oi.inputs['Object'].default_value = bpy.data.objects['Hero']
gp = N.new('GeometryNodeProximity'); gp.target_element = 'FACES'
cmp = N.new('FunctionNodeCompare'); cmp.data_type = 'FLOAT'; cmp.operation = 'LESS_THAN'; cmp.inputs[1].default_value = 0.15  # ~
dele = N.new('GeometryNodeDeleteGeometry'); dele.domain = 'POINT'
L.new(oi.outputs['Geometry'], gp.inputs[0])            # Target / Geometry
L.new(gp.outputs['Distance'], cmp.inputs[0]); L.new(cmp.outputs['Result'], dele.inputs['Selection'])
# dist.outputs['Points'] -> dele.inputs['Geometry'] -> iop.inputs['Points']
```
(Target Element = Points ≈ "Use Pivots Only" on.) raea: no equivalent (build stage).

## NOTES
- "Use Pivots Only" off ≈ measure to faces, not origins.
- Values inferred (`~`); none spoken.
- Rule conflicts: none.
- bpy fixed for 5.3: incomplete snippet: added `import bpy` and `N, L` from the scatter node group.

## ADDENDUM — GEOMETRY NODES Blender 4 Tutorial Procedural Pathways (Step by Step)
Variant on the exclusion mechanism: instead of Compare+Delete Geometry on points, feed Geometry Proximity's
distance straight into **Instance on Points → Density Factor** (0 = no instance, 1 = full density) — no delete
step, just starves density near the target. Here the proximity target is the procedural path mesh itself (Object
Info of the path → Geometry Proximity → feeds the grass system's density), and the falloff shaping uses the same
idea as this card's Map Range + Float Curve, tuned by eye until it "looks just right" (no numeric values given).

### New companion technique: fill the excluded gap with a different scatter
Additive, not a duplicate of the mask: it fills the zone this card's exclusion empties, instead of leaving it bare.
1. A **Separate Geometry** node (Face domain) used earlier to split paving blocks from the gaps between them has an
   inverted (gaps-only) output that was otherwise unused.
2. Feed that inverted geometry into Distribute Points on Faces → Instance on Points, with a *different* collection
   (e.g. grass clumps, not the path's paving instances) via Collection Info — same Separate Children / Pick
   Instance / Reset Children trio as the collection-scatter master.
3. Set this second scatter's material before its Join Geometry with the rest of the scene, so it doesn't inherit
   the path/blocks' material.
4. Randomize this second scatter's scale independently (Random Value Float, e.g. 0.2–0.5 in the source).

Read together: "exclude from A [this card's density mask], then fill the same excluded zone with B [the inverted
selection]" — not two unrelated masks. raea: no equivalent for either half (build-stage only); bake both scatters
into one ground GLB.
