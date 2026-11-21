---
title: A-to-B camera move — start on a composed frame, end on a composed frame (pause-anywhere wallpaper test)
bucket: 08_Edit_Pacing
source: "Studio Lighting, Silhouettes & Color Theory/Overwatch Dragon Brothers - Visual language and 3D camera lessons.txt"
source_time: "01:04–01:37, 06:59–07:20, 09:37, 13:24–13:54"
tool_target: shot-list
tier: full
use_when: "writing the 'Setup and camera' cell of every moving setup; board check of first/last frames"
style_fit: "Core fit: every Style D setup is a move; this rule makes both ends of each 2–3 s move a board-worthy still (25–60 % band, one accent, nothing clipped)."
---

## METADATA
08_Edit_Pacing | general (trailer analysis) | shot-list row + board check

## CREATIVE_INTENT
"In classic cinema, when you go from point A to point B, you always want to have point A as a set beautiful composition
and end in the beautiful set composition. Otherwise, it's just videography." The goal is "as many photographic shots as
you possibly can … a project that you can pause at any moment and that screenshot would make a really great wallpaper."

## STE_PROCEDURE
1. Before keying a move, compose frame A as a finished still (subject placement, lines, light).
2. Compose frame B as a second finished still, different in angle or scale.
3. Key the camera A → B; ease in-out.
4. Scrub to three random mid frames; reject the move if any mid frame is muddled.
5. On the board, show A and B for each setup, not just one still.

## AGENT_EXECUTION
Shot-list: write the cell as `A: <framing> → B: <framing>`, e.g. `A: top-down tag, 35 % of frame → B: low 15° side, tag 50 %`.
Board (RECIPE-D §7): each setup contributes its A and B frames; both must pass the 25–60 % band, no clipping, one accent.
raea: the camera transform interpolates between two `Transform.fromXyz(...).lookingAt(...)` poses taken from the A and B
stills; `Easing.inOut(Easing.cubic)`; under ~130°/s and ~40 m/s.

### Worked example
Topic: "Kenapa harga nasi lemak naik RM0.50" (illustrative).
- BEFORE: `| 3 | "Harga telur naik 3 sen sebiji" | camera drifts over the counter | egg tray visible |`
- AFTER: `| 3 | "Harga telur naik 3 sen sebiji" | A: top-down egg tray, grid of 30 eggs filling 55 %, one egg in accent light → B: low 20° side angle, that egg 40 % of frame, tray edges as leading lines | "+3 sen" tag fades in on "3 sen" at B | a-to-b-composed-start-and-end-frames |`

### Check
- Are frame A and frame B each a finished still on their own?
- Do A and B differ in angle or scale?
- Do three random mid-frames still read?
- Would any paused frame work as a cover?

## NOTES
- Visual gaps: the trailer frames themselves are visual only.
- No rule conflicts.
