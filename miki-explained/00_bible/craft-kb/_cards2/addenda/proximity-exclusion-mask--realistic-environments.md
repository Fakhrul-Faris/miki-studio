# Addendum → cards/02_Geometry_Nodes/proximity-exclusion-mask--realistic-environments.md
Source: "Procedural Mograph & 3D-to-AI Render Passes/GEOMETRY NODES Blender 4  Tutorial Procedural Pathways  (Step by Step).txt" — 19:58–22:50.

## New VALUES BY SOURCE column/rows (procedural-pathways)
| parameter | realistic-environments (existing card) | procedural-pathways (this source) |
|---|---|---|
| How exclusion is applied | Compare(Distance < threshold) → **Delete Geometry** on points | Geometry Proximity distance → multiply straight into **Instance on Points → Density Factor** (0 = no instance, 1 = full density) — no delete step, just starves density near the target |
| Target object | a hero/rock object | the procedural path mesh itself (Object Info of the path → Geometry Proximity → feeds the grass system's density) |
| Shaping | Map Range + Float Curve after Map Range | same idea: tweak a **Float Curve** node on the density value until the falloff "looks just right" (no numeric values given) |

## New companion technique: invert a separate-geometry selection to scatter a DIFFERENT asset only in the gaps
This is additive to the exclusion mask, not a duplicate of it — it fills the excluded zone with a second system
instead of leaving it empty:
1. Earlier in the same build, a **Separate Geometry** node (Face domain) used a "Top faces" selection to split
   paving blocks from the gap faces between them (see the inset-via-extrude card) — its **Selection** output
   (True = blocks) was used to get the blocks; its **inverted** output (the gaps) was unused until this step.
2. Feed that inverted (gaps-only) geometry into **Distribute Points on Faces** → **Instance on Points**, with a
   *different* collection (grass clumps, not the path's paving instances) via Collection Info (separate
   children/pick instance/reset children, per the collection-scatter master).
3. Set the second scatter's material **before** its Join Geometry with the rest of the scene, so it doesn't inherit
   whatever material the path/blocks use.
4. Randomize this second scatter's **scale** (Random Value Float, e.g. 0.2–0.5 in the source) independently from
   the first.

## Notes
- The two techniques compose: Geometry Proximity density-exclusion keeps grass off the path/blocks; the inverted
  separate-geometry selection then puts a *second, different* scatter (grass clumps) exactly into the gaps the
  first exclusion created — read together as "exclude from A, then fill the same excluded zone with B", not two
  unrelated masks.
- raea: no equivalent for either half (build-stage only); bake both scatters into one ground GLB.
