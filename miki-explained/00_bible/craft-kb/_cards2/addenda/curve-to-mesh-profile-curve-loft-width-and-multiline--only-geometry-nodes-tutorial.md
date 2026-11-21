# Addendum → cards/02_Geometry_Nodes/curve-to-mesh-profile-curve-loft-width-and-multiline--only-geometry-nodes-tutorial.md
Source: "Procedural Mograph & 3D-to-AI Render Passes/GEOMETRY NODES Blender 4  Tutorial Procedural Pathways  (Step by Step).txt" — 04:51–07:07.

## New VALUES BY SOURCE column/rows (procedural-pathways)
| parameter | only-geometry-nodes-tutorial (existing card) | procedural-pathways (this source) |
|---|---|---|
| Profile shape | several small **Circle** curves (radius ~0) stacked, for N parallel thick lines | a single straight **Curve Line** primitive, for one flat ribbon's width |
| Width control | per-line offset via Combine XYZ + Math Multiply (spacing) | the Line's own **Start**/**End** Z taken to 0 (flat), X moved to a negative value on one end and positive on the other, via **Combine XYZ** feeding both ends from **one Value node** |
| Symmetric single-slider trick | n/a | the same Value feeds Start's X directly and End's X via a **Math × −1** — one slider widens the path from its centre outward in both directions at once |
| Axis gotcha | n/a | switching the profile from the default curve orientation to a Line curve **changes which axis Curve to Mesh treats as "along the path"** (Z → Y in the source) — re-check your transform-axis inputs after swapping profile shape |
| Flattening a tilted result | n/a | **Set Curve Tilt** node on the main curve, set to 90°, rotates the loft's cross-section — useful either to deliberately make a path read "like a brick wall" (vertical) or to flatten a path that came in tilted |

## Extra steps
- Build the flat-ribbon variant: Curve Line primitive → Z to 0, X ends at `value` and `-value` (one Value node, one
  Math ×−1 node) → Combine XYZ ×2 → Line's Start/End → Curve to Mesh Profile Curve input.
- Add Set Curve Tilt on the main curve before Curve to Mesh if the path needs to flatten or stand on edge.

## Notes
- Confirms the general principle in the parent card (profile curve = cross-section) with the simpler single-ribbon
  case; keep both variants in the parent card's AGENT_EXECUTION as "multi-line" vs "single ribbon".
