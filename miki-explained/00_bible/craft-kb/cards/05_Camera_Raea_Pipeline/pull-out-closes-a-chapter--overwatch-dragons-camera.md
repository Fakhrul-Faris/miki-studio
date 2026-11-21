---
title: Pull out (dolly out) = an ending, or loneliness
bucket: 05_Camera_Raea_Pipeline
source: "Studio Lighting, Silhouettes & Color Theory/Overwatch Dragon Brothers - Visual language and 3D camera lessons.txt"
source_time: "06:11–06:59, 12:37–13:05"
tool_target: shot-list
tier: full
use_when: "the last setup of a block (end of the steps, the 'why it matters' line), or a line about a business left behind"
style_fit: "Fits; ⚠ the final setup must still loop to frame 0's object and framing — pull out on the second-to-last setup, or pull out to the frame-0 framing."
---

## METADATA
05_Camera_Raea_Pipeline | general | shot-list + raea camera

## CREATIVE_INTENT
"When you pull out like that, in visual language, that usually signifies the end of a scene or accentuates somebody's
loneliness … use this pull out when there's a moment for it: to signify an end of a chapter, or when somebody feels
lonely or abandoned, or some kind of logical end to something." Later, "again we see this dolly out … the end of a
chapter or a story or an action." The trailer's late pull-out also tilts up (two axes) on a very wide lens (~9 mm).

## STE_PROCEDURE
1. Mark the line as an ending or a "left alone" beat before choosing the move.
2. Start close on the hero.
3. Move the camera back along its view axis; let the surroundings (empty shelf, dark floor) grow in frame.
4. Ease in-out; keep it slow.
5. Optionally add a slight tilt up for a less generic move (see two-axis-camera-move).

## AGENT_EXECUTION
raea: `z` eases away: `Transform.fromXyz(0, 0.05, lerp(0.12, 0.45, p)).lookingAt([0, 0.02, 0])` (`~`). For loneliness,
leave negative space round the hero at B (see empty-vs-filled-twin-framing).

### Worked example
Topic: "Kenapa kedai buku kecil makin hilang" (illustrative).
- BEFORE: `| 10 | "Tinggal satu kedai je kat jalan ni" | static wide of a shopfront |`
- AFTER: `| 10 | "Tinggal satu kedai je kat jalan ni" | pull out from one lit book spine on the counter to a dark row of shuttered shop models, the lit one alone in frame | accent light stays only on that shop | pull-out-closes-a-chapter |`

### Check
- Is this line an ending or a loneliness beat?
- Does the frame gain empty space as the camera retreats?
- Does the final setup still loop to frame 0?

## NOTES
- Visual gaps: lens and distance in the trailer are estimates by the narrator ("like a 9 mm, or 11").
