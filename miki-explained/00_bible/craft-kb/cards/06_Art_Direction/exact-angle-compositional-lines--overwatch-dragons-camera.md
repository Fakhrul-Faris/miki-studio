---
title: Exact-angle lines — set the frame's dominant lines at 0°, 45° or 90°, never a near-miss diagonal
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Overwatch Dragon Brothers - Visual language and 3D camera lessons.txt"
source_time: "04:06–04:26, 08:23–08:48, 11:26–11:50, 13:54"
tool_target: frame-brief
tier: full
use_when: "framing a setup with strong linear set dressing (counter edges, shelf rows, receipt lines, phone edges)"
style_fit: "Fits Style D macro on real surfaces: a counter edge or receipt at a true 45° reads designed; a 38° edge reads accidental."
---

## METADATA
06_Art_Direction | general | frame brief "Decision" + board check

## CREATIVE_INTENT
"What makes this nice is the geometrical lines going across the screen. It's not crooked, not random … there's balance to
it." "There's something pleasing about exact degrees, like straight lines across, 90° or 45° exact angles." Also "parallel,
perfect, boxy lines" and a split arrow "perfectly balanced on both sides".

## STE_PROCEDURE
1. Before locking a frame, identify its 1–2 dominant lines (edges, rows, shadows).
2. Rotate the camera or object until each line sits at 0°, 45° or 90° on screen (±2°, `~`).
3. Keep parallel lines parallel (no stray converging edge unless it's a leading line to the hero).
4. Check balance: mass on both sides of the line roughly even, or the hero placed on the line's end.

## AGENT_EXECUTION
Frame brief "Decision": `counter edge at 45° from bottom-left; receipt rows horizontal`. Board check: measure the dominant
line angle on the still (overlay a 45° guide). raea: rotate the object entity, not the camera roll (keep the horizon level):
`Quat.fromEuler("XYZ", 0, Math.PI / 4, 0)` on the counter for a top-down 45°.

### Worked example
Topic: "Satu resit, tiga caj tersembunyi" (illustrative).
- BEFORE: frame brief "Decision: receipt on the counter, camera above" → receipt lies at ~30°, counter edge at ~10°.
- AFTER: "Decision: top-down; receipt rotated to exactly 45°, its lines running bottom-left → top-right; counter edge parallel to the frame bottom (0°); the 'caj servis RM2.40' line in accent at the frame centre."

### Check
- Are the 1–2 dominant lines at 0°, 45° or 90° (±2°)?
- Is the horizon level (no accidental roll)?
- Are parallel elements actually parallel on screen?

## NOTES
- The narrator is not sure of the exact degree in the trailer ("I don't know what degree it is, but like 45").
- Related: masters/05_Camera_Raea_Pipeline/leading-lines.md (lines that converge on purpose).
