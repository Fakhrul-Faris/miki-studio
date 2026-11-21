---
title: Taper a curve's thickness with Spline Parameter → remapped curve → Set Curve Radius
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/The ONLY Geometry Nodes Tutorial You'll Ever Need!.txt"
source_time: "11:52–13:45"
tool_target: raea
tier: full
use_when: "a lofted line/ribbon diagram should fade to a point at both ends instead of having a hard-cut flat tip — e.g. a flow line, a brushstroke-style underline, a cable"
style_fit: "Reads as a soft, natural taper rather than a cut-off shape; pairs with the Trim Curve card for a line that both draws in AND tapers."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Spline Parameter, RGB Curves remap, Set Curve Radius) | Geometry Nodes → bake for raea

## CREATIVE_INTENT
Every curve carries a built-in **Factor** value (from Spline Parameter) that runs 0→1 along its length. Remapping
that 0→1 ramp into a 0→1→0 shape (via an RGB Curves node, visually sculpted rather than typed) and feeding it into
**Set Curve Radius** makes the curve's thickness rise from zero at the start, peak in the middle, and taper back to
zero at the end — before the curve is converted to a mesh (radius has no effect after Curve to Mesh).

## STE_PROCEDURE
1. Add **Spline Parameter**; its **Factor** output is 0 at the curve's start, 1 at its end, and stays correct even
   if the curve is later extruded or its points moved.
2. Add **RGB Curves**; plug Spline Parameter's Factor into it. Drag the left end down to 0, add a middle point and
   raise it to 1, leave the right end at 0 — this reshapes the ramp into a taper-in/taper-out curve.
3. Add **Set Curve Radius**; plug the remapped value into its **Radius** input.
4. Place Set Curve Radius **before** Curve to Mesh — radius has no effect on a mesh, only on curve data.
5. Tweak the RGB Curves handle smoothness/extra points by eye until the taper silhouette reads clean.

## AGENT_EXECUTION
```python
sp = N.new("GeometryNodeSplineParameter")
rgb = N.new("ShaderNodeRGBCurve")                         # shape its curve mapping to 0 → 1 → 0 via its API/by hand
L.new(sp.outputs["Factor"], rgb.inputs["Fac"])
scr = N.new("GeometryNodeSetCurveRadius")
L.new(rgb.outputs["Color"], scr.inputs["Radius"])         # before Curve to Mesh
```
raea: no curve/radius nodes. Bake the tapered profile into the GLB at build time; if a 2D flat equivalent is
needed in a HyperFrames/SVG layer, taper an SVG path's stroke width with a `<linearGradient>`-driven `vector-effect`
or simply author the tapered silhouette as a filled shape (flat 2D does not need the 3D radius pipeline at all).

### Worked example
Topic: "Garis masa untung kedai sepanjang tahun" (illustrative profit-line diagram, numbers marked illustrative).
BEFORE: `| 6 | "sepanjang tahun" | a flat-thickness line across the year | line fades in | — |` — reads mechanical, cut-off ends.
AFTER: `| 6 | "sepanjang tahun" | same line, radius tapered 0→1→0 via Spline Parameter + RGB Curves remap before Curve to Mesh, so it thins to a point at Jan and Dec | line grows in from the centre outward, 0.4 s, no pop | tapered-radius-via-spline-factor-remap--only-geometry-nodes-tutorial |`

### Check
- Is Set Curve Radius placed before Curve to Mesh (radius does nothing after)?
- Does the taper read as a soft point at both ends, not a hard flat cut?
- If this pairs with Trim Curve, is the taper still correct after trimming (Spline Parameter factor recalculates
  along the *untrimmed* curve, so verify at the actual trim range used)?

## NOTES
- Visual gaps: the exact RGB Curves handle shape is sculpted visually on screen, not given as numeric control
  points — treat "0 → 1 (middle) → 0" as the only hard constraint; exact handle smoothness is `~` by eye.
- Rule conflict: none.
