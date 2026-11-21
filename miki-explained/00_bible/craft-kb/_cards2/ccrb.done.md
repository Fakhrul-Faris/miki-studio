# ccrb done-list

## Cards (13)
- cards/02_Geometry_Nodes/4x4-transform-matrix-anatomy-and-shear--demystifying-geometry-nodes.md — matrix's 4 blocks (scale/rotation, translation, perspective warp, w); shear via an off-diagonal element, no raea equivalent
- cards/02_Geometry_Nodes/chained-matrix-multiply-order-matters--demystifying-geometry-nodes.md — Multiply Matrices is non-commutative; sequence moves deliberately; maps to raea Transform3d parenting order
- cards/02_Geometry_Nodes/project-point-vs-transform-point-direction-perspective-warp--demystifying-geometry-nodes.md — Project Point is the only one of the three that reads the perspective-warp row; point vs direction payload distinction
- cards/02_Geometry_Nodes/invert-transpose-determinant-matrix-utilities--demystifying-geometry-nodes.md — Invert/Determinant (check invertibility before trusting an inverse)/Transpose; flags the known normals-under-shear gap (no dedicated node)
- cards/02_Geometry_Nodes/curve-to-mesh-profile-curve-loft-width-and-multiline--only-geometry-nodes-tutorial.md — Circle-profile multi-parallel-line loft from one curve; Merge by Distance for near-zero-radius duplicate verts
- cards/02_Geometry_Nodes/trim-curve-factor-wipe-reveal--only-geometry-nodes-tutorial.md — Trim Curve Factor mode for a scale-independent line draw-in/retract
- cards/02_Geometry_Nodes/tapered-radius-via-spline-factor-remap--only-geometry-nodes-tutorial.md — Spline Parameter → RGB Curves 0→1→0 remap → Set Curve Radius, before Curve to Mesh
- cards/02_Geometry_Nodes/capture-attribute-freeze-tilt-tangent-orient-to-curve--only-geometry-nodes-tutorial.md — Capture Attribute right after resample (before offset) + double Align Rotation to Vector (tangent then tilt)
- cards/02_Geometry_Nodes/distance-from-trim-value-scale-band--only-geometry-nodes-tutorial.md — distance-from-trim scale bands, multiply+clamp combine (not add) so instances shrink to zero exactly at a moving trim point
- cards/02_Geometry_Nodes/exposed-parameter-panels-full-options--only-geometry-nodes-tutorial.md — socket type/min-max/description/default + named panels for a reusable, hand-off-ready GN build
- cards/02_Geometry_Nodes/raycast-curve-snap-to-displaced-surface--procedural-pathways.md — raise curve, Raycast onto displaced ground, Set Position snaps to Hit Position; resample first
- cards/02_Geometry_Nodes/randomized-triangulate-dual-mesh-paving-shapes--procedural-pathways.md — Triangulate (Beauty) on a random-probability face subset, then Dual Mesh, for mixed hexagon/irregular paving
- cards/02_Geometry_Nodes/inset-via-extrude-zero-offset-scale-elements--procedural-pathways.md — Extrude Mesh offset=0 + Scale Elements on its Top selection = inset workaround (no native Inset node in GN)

## Addenda (3)
- _cards2/addenda/collection-scatter-instance-on-points--crazy-renders-geo-nodes.md — Random Value (Integer) → Instance Index, seed exposed, to reshuffle an entire scattered layout (additive to the master's Pick Instance behaviour)
- _cards2/addenda/proximity-exclusion-mask--realistic-environments.md — density-factor variant of proximity exclusion (vs. the master's delete-geometry variant) + companion technique: invert a Separate Geometry selection to scatter a *different* asset into the excluded gaps
- _cards2/addenda/curve-to-mesh-profile-curve-loft-width-and-multiline--only-geometry-nodes-tutorial.md — single-ribbon width variant (Line profile, symmetric one-slider width via Math ×−1, Set Curve Tilt to flatten/stand the loft)

## Covered by (no new card)
- Subdivide Mesh before Subdivision Surface to preserve shape on the paving blocks (Procedural Pathways, ~17:13–17:51) → general technique already represented across masters/cards/03_Modeling_Modifiers (bevel/subdivision stack cards); not a distinct new technique.
- Random noise-texture vertex displacement / tilt on the paving blocks (Procedural Pathways, ~16:34–19:23) → covered by masters/cards/02_Geometry_Nodes houdini-volumes noise-displacement cards (per-piece-noise-offset-cracks, volume-sample-offset-displacement, normal-up-height-mask-blend); same Noise Texture → Vector Math (subtract 0.5, scale) mechanism, no new value.

## Skipped
- Sponsors/plugs: "Gobos Light Textures" add-on mention is from a different video (not in this list); none present here. Channel-growth asks (subscribe/Discord/course-upsell), the paid Geometry Nodes course plug, and all outro banter stripped from all three transcripts per the quality guardrail.

## Notes
- All three files triage to bucket 02_Geometry_Nodes (set-1 "pure craft"); per BRIEF.md "choose per technique", every card stayed in 02_Geometry_Nodes since each technique is Blender node-graph craft, not art-direction/script/edit/UI-motion despite the triage's secondary-bucket tags (06_Art_Direction / 03_Modeling_Modifiers).
- RESUME MODE check: grep -rlF of each filename (no folder) against ../cards and ../_cards2/addenda returned nothing before writing — all three sources were untouched; no existing cards to compare against or extend.
- raea has no node-graph/curve/instancing/matrix-math equivalents anywhere in this list — every card is correctly marked "raea: no equivalent" with the Blender-build-then-bake-to-GLB translation, per RECIPE-D's "Blender only builds models; raea renders."
- Visual-only passages (dense node-wiring only followable on screen) are flagged `~`/"visual gaps" per card rather than guessed.
