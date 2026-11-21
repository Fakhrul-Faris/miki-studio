Target: `masters/01_Animation_Motion/linear-vs-eased-interpolation.md`

## New value / variant
Source sets every camera keyframe to Linear in Blender, then re-times and finesses the ease entirely in After Effects
("set everything to linear and then you can time remap everything in off [after] effects... sometimes it's a little
bit easier to do that in off effects"). This is offered as an alternative workflow to shaping handles directly in
Blender's Graph Editor.

## ⚠ Rule conflict and adaptation
After Effects is prohibited in our pipeline. The two-app roundtrip (Linear in Blender → time-remap in AE) has no
translation step needed: raea already edits easing curves directly in code (`Easing.inOut(Easing.cubic)`, kit
`Easing.bezier(...)` presets) wherever the camera or object lives, so there is no separate "finesse it in another app"
pass. Keep Blender keys Bezier/AUTO per the master's house default; do the Imperial-style "set to linear and retime"
workflow nowhere in our pipeline — it is fully superseded by shaping the curve once in raea.

## Source timestamp
25:19–25:44

## Notes
- No new VALUES BY SOURCE row added (the source gives no new numeric values, only a workflow preference that doesn't survive translation).
