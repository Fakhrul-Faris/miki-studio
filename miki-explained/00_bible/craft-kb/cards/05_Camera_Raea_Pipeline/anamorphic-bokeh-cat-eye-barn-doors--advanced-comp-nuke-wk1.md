---
title: Match anamorphic bokeh — oval squeeze, cat-eye toward the edges, matte-box clipping, colour fringe
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "47:22–47:54; 3:42:18–3:52:07"
blender_version_source: n/a (Nuke, MagicDefocus)
tool_target: raea
tier: principle
style_fit: Mostly beyond raea's DoF; the transferable idea is reference-matching defocus with a test grid of dots. Style D does not require anamorphic.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: real lenses change bokeh across the frame — round in the centre, cat-eye (clipped ellipse) toward the edges; anamorphics squeeze it oval; a matte box (barn doors) slices its top; the disc edge carries a faint colour fringe. Idea: build a test grid of bright dots, defocus it next to lens-test reference, and tune until shapes match.

## STE_PROCEDURE
1. Get reference for the lens type (e.g. ShareGrid anamorphic lens-test stills and bokeh charts).
2. Build a dot grid: Grid → Blur 5 px → Grade with black point ~0.3 and lower white point so only intersections remain.
3. Scale the grid past frame edges; lower its grade so dots are not too intense; merge over the plate.
4. Defocus with the custom bokeh as filter shape; set aspect ratio 0.5 for the oval.
5. Enable non-uniform (cat-eye) and raise it until edge discs thin like the reference.
6. Set quality to highest to remove artifacts (slower; pre-render it).
7. Enable barn doors: width off, raise height until disc tops clip; add softness.
8. Make the colour fringe: edge-detect the kernel's alpha, erode ~-3, saturate, tint blue ~0.5 with a little green, desaturate overall; feed back into the kernel.
9. Keep the fringe subtle; the dot grid exaggerates it.
10. Put the camera shake before this node so cat-eye changes as the frame moves; enable "preserve bounding box".

## AGENT_EXECUTION
### Source tool (Nuke)
`Grid` → `Blur(5)` → `Grade(blackpoint 0.3)` → `Merge`; `MagicDefocus` (filter shape: image; aspect 0.5; Non-Uniform ✓; quality highest; Barn Doors ✓ width off, height up, softness up; preserve bbox ✓); kernel fringe: `EdgeDetect(alpha)` → `Erode(-3)` → `ColorCorrect`.
### Blender / raea translation
- raea: no equivalent for cat-eye, squeeze or barn doors (`<DepthOfField>` has one kernel). The colour fringe across the frame is approximated globally by `<Grade aberration={0.002–0.005} />`.
- Blender (look test only): `CompositorNodeBokehImage.shift` (lens shift) and `flaps`; `CompositorNodeLensdist` dispersion for fringing.

## NOTES
- Rule conflicts: none, but this is beyond the house look; skip unless a shot needs a lens-character beat.
