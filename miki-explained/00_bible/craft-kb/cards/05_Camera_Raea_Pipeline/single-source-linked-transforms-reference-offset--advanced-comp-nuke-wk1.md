---
title: One source of motion data, linked everywhere (expression links and custom reference frame)
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "2:27:21–2:31:39; 4:09:18–4:11:22"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Matches our rule that the camera and moving objects are data written once (paths.py) and read by the film; no conflict.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: keep motion keyframes in one node and link every consumer to it, so a fix cascades and files stay light. Idea: to change a reference frame (where the match-move is zero), subtract the curve's value at that frame in an expression instead of duplicating the tracker.

## STE_PROCEDURE
1. Keep keyframes only in the master tracker/transform; name it (e.g. "master control").
2. Before you duplicate a keyframed node, copy it as an expression-linked clone (Ctrl-drag knobs).
3. To zero the motion at frame N, write `(link) - value_at_N` in each translate expression.
4. Apply the same linked transform, inverted, where a stabilized version is needed (e.g. a keyer's background input).
5. Label clones "dependent" so their source is obvious.
6. Avoid baking duplicate keyframes; every keyframe enlarges the script and slows autosave (Nuke autosaves every 5 s idle / 30 s working).

## AGENT_EXECUTION
### Source tool (Nuke)
Transform.translate.x expression: `(Tracker1.translate.x) - 12.437` (value copied at the new reference frame); clone knobs with Ctrl-drag; invert = stabilize.
### Blender / raea translation
- raea: compute every dependent transform from one function of the frame, e.g. `const cam = camAt(f)`; a "reference frame" is `camAt(f).sub(camAt(N))`. Never copy keyed arrays between shots.
- Blender: drivers instead of duplicate keys: `fc = obj.driver_add("location", 0); fc.driver.expression = "var - k"` with `var` a TRANSFORMS variable targeting the master.

## NOTES
- Rule conflicts: none. Our version: `paths.py` writes; the TSX reads; checks read the same file.
