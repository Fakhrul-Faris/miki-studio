---
title: Vignetting — match the plate's edge darkening, and add a soft final vignette to focus the eye
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "58:51–59:24; 4:41:59–4:42:48"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Direct fit: Style D's dark room already uses a light vignette (kit ProStage vignette 0.18) to hold the eye on the hero object.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: lenses, matte boxes and filters darken the frame edges. On pans and tilts, an element moving toward the frame edge must darken as the plate does. Idea: a final soft vignette, barely visible, focuses the eye on the subject as a last polish.

## STE_PROCEDURE
1. Check whether the plate darkens toward the edges, especially on pans/tilts.
2. If so, darken added elements as they near the edge.
3. For the final polish, draw an ellipse mask covering the centre.
4. Invert the mask so only the edges are affected.
5. Blur the mask heavily (~200–300 px at 1080p).
6. Darken the edges slightly; check it under the show LUT.

## AGENT_EXECUTION
### Source tool (Nuke)
`Roto` ellipse → invert → blur 200–300 → mask of a `ColorCorrect` (gain down a little).
### Blender / raea translation
- raea: `<Grade vignette={~0.15–0.25} />` or `vignette={{ intensity, radius, smoothness, color }}` (kit ProStage: 0.18). Applies to the 3D; it moves with nothing (screen-space), which matches a real lens.
- Exclude UI from it: `<Grade skip={["ui"]} />`.
- The vignette is fixed from the first frame.

## NOTES
- Rule conflicts: none.
