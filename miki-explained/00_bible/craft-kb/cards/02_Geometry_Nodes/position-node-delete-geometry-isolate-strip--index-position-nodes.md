---
title: Position node + Delete Geometry — isolate one coordinate strip from an existing grid
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/If You're Learning Blender, You Should Be Using This Node!.txt"
source_time: "09:08–10:46"
tool_target: raea
tier: full
use_when: "a secondary prop (a rod, a rail, a seam line) must run through the middle of an existing procedural grid without building new geometry or re-measuring by hand"
style_fit: "Keeps a build fully procedural/non-destructive in Blender; in raea, translate as deriving the strip's positions by filtering the existing placement array on one coordinate, never hand-typed new positions."
---

## METADATA
02_Geometry_Nodes | Blender 3.x–5.x Geometry Nodes | Position + Separate XYZ → Delete Geometry [Faces] → raea array filter

## CREATIVE_INTENT
The Position node knows each point's X/Y/Z; feeding one axis into Delete Geometry's selection (after isolating it with
Separate XYZ, since Position alone combines all axes) deletes every face except the ones along that one coordinate
line — pulling a single strip of geometry out of a grid the system already built. Instancing a secondary prop on just
that strip (e.g. rods running through a field of hexagons) stays tied to the original grid's spacing automatically,
instead of building or lining up new geometry by hand. The Index node cannot do this: it can only delete by list order
(a specific face or every Nth face), not by physical coordinate, so it is the wrong tool for isolating one spatial line.

## STE_PROCEDURE
1. Start from the existing grid (video: a Grid scaled to 10, 10×10 vertices) already feeding a Delete Geometry node
   set to Delete Faces.
2. Get a Position node; plug it into Delete Geometry [Selection] — note this deletes on all axes at once (unusable).
3. Add a Separate XYZ node between Position and the selection input; feed only the X (or Y) output in.
4. Use Math (Compare/Less Than/Greater Than) on that single axis value to keep one coordinate band and delete the rest.
5. Confirm one clean strip of faces remains, aligned to the original grid's spacing.
6. Invert the selection (Color Ramp or Map Range flip) if the opposite strip/geometry is wanted instead.
7. Instance the secondary prop (e.g. rods) on the remaining strip's points.

## AGENT_EXECUTION
raea has no mesh-deletion step; derive the "strip" by filtering the same placement array already used for the grid on
one coordinate, so the secondary prop's spacing always matches the grid without new numbers.
```tsx
const GRID = Array.from({ length: 100 }, (_, i) => ({ x: (i % 10) * 0.3 - 1.35, z: Math.floor(i / 10) * 0.3 - 1.35 }));
const STRIP_X = 0;                                    // "Position -> Separate XYZ -> Delete Geometry" equivalent
const strip = GRID.filter(p => Math.abs(p.x - STRIP_X) < 0.01);   // one coordinate band kept, the rest dropped
{strip.map((p, i) => (
  <Mesh3d key={i} name={`rod-${i}`} transform={Transform.fromXyz(p.x, 0.1, p.z)}>…</Mesh3d>
))}
```

### Worked example
Topic: "Rak kedai runcit: satu palang besi tengah pegang semua botol minyak." (illustrative set dressing).
BEFORE: `| 2 | "rak tersusun" | hexagon-packed bottle grid built separately from a straight support rail, hand-placed |
— |` — rail risks not lining up with the grid.
AFTER: `| 2 | "rak tersusun" | bottle grid built once; one coordinate strip is filtered from the same placement array
to carry the support rail, so it always lines up | rail fades in after the grid settles | position-node-delete-geometry-isolate-strip--index-position-nodes |`

### Check
- Is the strip derived from the same grid data (not independently measured/placed)?
- Does the strip line up exactly with the grid's existing spacing?
- Was Index ruled out (it can only isolate by list order, not by coordinate)?

## NOTES
- Visual gaps: the exact Compare/threshold values used to keep one strip are scrubbed on screen, not stated.
- Dropped: Patreon upsell segment.
- Rule conflicts: none.
