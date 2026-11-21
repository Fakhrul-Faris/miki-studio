---
title: Align a background by its vanishing points, then straighten verticals with a corner pin
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "1:22:26–1:35:29"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Useful whenever a photo/HDRI backplate or a UI screen must sit in a raea world; no conflict.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: perspective = lens compression + vanishing point (set by the camera's pan/tilt); if both plates' vanishing points coincide, compression is also matched. Idea: draw long guide lines on parallel real-world edges, find where they meet, and move/scale/rotate the background until its vanishing points sit on the foreground's.

## STE_PROCEDURE
1. Create a paint/roto layer that outputs to RGBA; use open splines, stroke width 2.
2. Open a second viewer at high zoom to place line ends precisely.
3. Draw a long line along an edge that is parallel in reality (a desk edge, a ceiling seam).
4. Duplicate the line onto 3–4 more parallel edges; their intersection is the vanishing point.
5. Accept a small spread (lens distortion); test by sweeping a spare line through the point across other surfaces.
6. Repeat for the second receding direction.
7. Draw the same lines on the background plate.
8. Move the background's anchor (pivot) to its vanishing point and translate it onto the foreground's.
9. Scale and slightly rotate about that point until the second vanishing points coincide too.
10. Fix leaning verticals with a corner pin: set "from" = "to" (no effect), then nudge only the top corners left/right until verticals are true.
11. A/B the aligned result against the flat drop-in.

## AGENT_EXECUTION
### Source tool (Nuke)
`Roto` (output rgba, open spline, width 2) ×N lines; second Viewer via Windows → New Comp Viewer; `Transform` (center at VP) for move/scale/rotate; `CornerPin2D` (copy "to" → "from", then move to2/to4 or to3).
### Blender / raea translation
- In raea the 3D world is in true perspective; a flat backplate must be placed so its horizon equals the camera height: put the `<ImagePlane>` far behind the subject, facing the camera, with its horizon line at the camera's eye height.
- For an `<Environment src background />` panorama, the horizon is automatic; turn `rotation` (radians) to place the vanishing direction.
- Blender: fSpy add-on (camera from vanishing points) for matching a photo, then export camera values to raea (fov, position).

## NOTES
- Visual gaps: exact line positions and corner-pin offsets are visual only.
- Rule conflicts: none.
