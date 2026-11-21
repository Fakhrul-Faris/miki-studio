---
title: Curve to Mesh with a profile curve — loft a width/thickness, or thicken many parallel lines with one curve
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/The ONLY Geometry Nodes Tutorial You'll Ever Need!.txt"
source_time: "03:19–09:41"
tool_target: raea
tier: full
use_when: "building a procedural diagram/kinetic-graphic asset (Blender build stage) that needs several parallel thick lines following one path — e.g. a staff/ruled-lines diagram, a multi-lane route, ribbed packaging — without hand-placing or duplicating curves"
style_fit: "Build-time-only Blender technique; baked to GLB for raea. Keeps one editable curve as the single source of truth, which matches our 'procedural, endlessly editable' preference over hand-placed duplicates."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Curve to Mesh, profile curve socket) | Geometry Nodes → bake → GLB

## CREATIVE_INTENT
**Curve to Mesh**'s second input (the profile curve) is the cross-section that gets swept along the main curve —
feed it a straight **Line** curve and you loft a flat ribbon (width = the line's length); feed it several small
**Circle** curves stacked at different offsets and you loft all of them along the *same* main curve in one pass,
producing N parallel thick lines without duplicating the main curve N times. Moving or editing the one main curve
moves every line at once.

## STE_PROCEDURE
1. Decide whether you need a single ribbon (profile = a **Line** curve, Z taken to 0 so it only runs in X; length =
   width) or several parallel thick lines (profile = **N Circle curves joined**, radius lowered to ~0 so they don't
   show as dots, each offset from centre via its own Transform Geometry + a shared slider — see Worked example).
2. Add **Curve to Mesh**; plug the hero path into **Curve**, the profile shape into **Profile Curve**.
3. Note the profile's own orientation sets the loft's local axis (a Circle's local Z becomes the sweep's Y) — check
   which axis your offset/width values need to drive after this node, not before.
4. If any three profile points land on the exact same spot (common with radius-0 circles), add **Merge by
   Distance** right after Curve to Mesh to collapse the duplicate vertices.
5. For a brief that calls for the line(s) to tilt/flatten relative to the ground (e.g. the path sits at an angle),
   add **Set Curve Tilt** on the main curve before Curve to Mesh.
6. Expose width/spacing as Group Input sockets (see the panel-organisation card) so one slider resizes everything.

## AGENT_EXECUTION
Multi-line build (N parallel thick lines from one curve):
```python
import bpy
ng = bpy.data.node_groups["LinesRig"]; N, L = ng.nodes, ng.links
main_curve = N.new("NodeGroupInput")                     # the hero bezier
spacing = N.new("NodeGroupInput")                        # exposed "line_spacing" value

def offset_line(mult):
    tr = N.new("GeometryNodeTransformGeometry")
    mn = N.new("ShaderNodeMath"); mn.operation = 'MULTIPLY'; mn.inputs[1].default_value = mult
    cxyz = N.new("ShaderNodeCombineXYZ")
    L.new(spacing.outputs["line_spacing"], mn.inputs[0]); L.new(mn.outputs["Value"], cxyz.inputs["Z"])
    L.new(cxyz.outputs["Vector"], tr.inputs["Translation"])
    return tr

lines = [offset_line(m) for m in (2, 1, -1, -2)]          # four lines + centre line = 5
circle = N.new("GeometryNodeCurvePrimitiveCircle"); circle.inputs["Radius"].default_value = 0.0
profiles = [circle] + [join(circle) for _ in lines]       # duplicate circle per offset, join
c2m = N.new("GeometryNodeCurveToMesh")
merge = N.new("GeometryNodeMergeByDistance")
L.new(main_curve.outputs["Curve"], c2m.inputs["Curve"]); L.new(join_all(profiles), c2m.inputs["Profile Curve"])
L.new(c2m.outputs["Mesh"], merge.inputs["Geometry"])
```
Single-ribbon width build (video 3's "Procedural Pathways" variant — see addendum): profile = a Line curve, width
driven by one slider via `Combine XYZ [Z] → Line's end point`, mirrored negative for symmetric widening.

raea: no equivalent (raea has no curve/loft nodes). Bake the lofted mesh to GLB at build time
(`<Model src={staticFile("staff_lines.glb")} />`); if the lines must resize live in a shot for a cheap effect,
export width variants and swap `src`, or model width directly into a flat `Mesh3d` plane sized in TSX instead of
lofting (only viable for a single straight ribbon, not the curved multi-line case).

### Worked example
Topic: "Berapa banyak bil air anda bayar tiap bulan? Ni 5 bar untuk 5 bulan" (illustrative numbers).
BEFORE: `| 5 | "5 bulan" | five flat bars hand-modeled side by side | bars grow in | — |` — static, re-modeled by hand if the count changes.
AFTER: `| 5 | "5 bulan" | one bezier curve + 5-circle profile curve, lofted once via Curve to Mesh; line_spacing slider sets the 0.4 s stagger gap | bars fade/grow in on each month-word, 0.4 s each | curve-to-mesh-profile-curve-loft-width-and-multiline--only-geometry-nodes-tutorial |`

### Check
- Is there one main curve driving all parallel lines (not N duplicated curves)?
- Was Merge by Distance added if the profile uses near-zero-radius circles?
- Is the loft baked to GLB before raea touches it (no attempt to loft live in TSX)?
- Does editing the main curve or the spacing slider move every line at once?

## NOTES
- Visual gaps: none — every node and value is shown on screen with the exact numbers used (e.g. spacing 0.2,
  offsets 0.4/0.2/-0.2/-0.4 originally, later generalised to a slider).
- Rule conflict: none; purely a modelling/build technique.
- Addendum: see `_cards2/addenda/curve-to-mesh-profile-curve-loft-width-and-multiline--only-geometry-nodes-tutorial.md`
  for the single-ribbon width variant (Procedural Pathways video) — Line profile, symmetric slider, Set Curve Tilt.

## ADDENDUM — GEOMETRY NODES Blender 4 Tutorial Procedural Pathways (Step by Step)
Single-ribbon variant of the same Curve to Mesh profile-curve mechanism: profile = a single straight **Curve Line**
primitive (not stacked Circles) for one flat ribbon's width. Width is driven by one Value node feeding **Combine
XYZ** into both the Line's Start and End X — End's X goes through a **Math × −1** off the same Value, so one slider
widens the ribbon from its centre outward in both directions symmetrically. Z is taken to 0 on both ends to keep it
flat. ⚠ Axis gotcha: switching the profile from Circle to a Line curve changes which axis Curve to Mesh treats as
"along the path" (Z → Y in the source) — re-check transform-axis inputs after swapping profile shape. **Set Curve
Tilt** (90°) on the main curve rotates the loft's cross-section — use it either to make a path read "like a brick
wall" (vertical) or to flatten a path that came in tilted. Build order: Curve Line → Z to 0, X ends at `value` and
`-value` (one Value node, one Math ×−1) → Combine XYZ ×2 → Line's Start/End → Curve to Mesh Profile Curve input;
add Set Curve Tilt on the main curve first if the path needs to flatten or stand on edge.
