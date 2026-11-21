---
title: Light planning: a small PureRef reference board kept beside Blender (no 100-image overplanning)
bucket: 05_Camera_Raea_Pipeline
source: "5 Ways to Create Better Environments in Blender.txt"
source_time: "00:47–02:58"
blender_version_source: n/a (workflow)
tool_target: principle-only
tier: full
style_fit: Fits our ref_<shot>.md / frame-brief habit; keeps references as look targets, not stills to trace (vector-means-redraw, apply-the-bible).
---

## METADATA
05_Camera_Raea_Pipeline | n/a | principle-only

## CREATIVE_INTENT
An idea in your head is a fuzzy image that rarely survives translation into a render. A few reference images kept in view keep the build on track and get you unstuck, without the stall of a 100-image mood board and a fully pre-planned frame.

## STE_PROCEDURE
1. Before building, collect a handful of reference images that show the target style and subject.
2. Drag and drop them straight from the browser (or generated images) into PureRef; save the board.
3. Keep the board docked beside the Blender / preview window for the whole build.
4. When stuck, compare the frame to the board and correct course.
5. Stop collecting once the look is clear; start building as soon as possible.

## AGENT_EXECUTION
- Agent equivalent of PureRef: a `ref/` folder per shot plus `ref_<shot>.md` naming what to take from each image (angle, light direction, material, palette).
- Side-by-side check at review time:
```bash
ffmpeg -i ref/ref_s03.jpg -i out/s03_f045.png -filter_complex "[0]scale=-1:1920[a];[a][1]hstack" -y review/s03_vs_ref.png
```
- raea: no equivalent (planning step, not a render feature).

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none. References are recreated, never traced or pushed through as plates (vector-means-redraw, apply-the-bible-not-the-pipeline). Judge each reference on its own as an art director (reference-review-method).
