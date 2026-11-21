---
title: Chromatic aberration — rebuild the plate's colour fringe on over-exposed edges and toward frame edges
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "56:35–57:41; 3:29:32–3:30:02"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Small dose fits a lensed macro look; a strong fringe reads as a gimmick.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: different wavelengths focus at different points, so colours fringe at edges — most around over-exposed areas and toward the edges of the frame/lens. The fringe colour varies by lens (purple, red, green, blue). Idea: when replacing something that carried a fringe in the plate (a colour checker), add the fringe back; a little fringe on CG makes it feel shot.

## STE_PROCEDURE
1. Look for fringes on over-exposed edges and near frame edges in the plate.
2. Note the fringe colour (often purple).
3. If you replace an object that carried a fringe, add the same fringe back.
4. Keep it subtle; increase slightly toward frame edges.

## AGENT_EXECUTION
### Source tool (Nuke)
No node chain given (theory); bokeh-edge fringe is in the anamorphic-bokeh card.
### Blender / raea translation
- raea: `<Grade aberration={0.002–0.005} />` (a lens's fringe, frame-wide, stronger toward edges); fixed from the first frame.
- Keep UI clean: `<Grade skip={["ui"]} />` removes vignette and fringes from the UI pass.

## NOTES
- Rule conflicts: none.
