---
title: Jib down = a story or action begins
bucket: 05_Camera_Raea_Pipeline
source: "Studio Lighting, Silhouettes & Color Theory/Overwatch Dragon Brothers - Visual language and 3D camera lessons.txt"
source_time: "01:37–02:07, 03:21–03:45, 07:20–07:58"
tool_target: shot-list
tier: full
use_when: "the first setup after the hook, or the first setup of the 'steps' block (Step 1 begins)"
style_fit: "Fits: a slow eased descent onto the hero is one of our flights; keep vertical travel short at macro scale and under ~40 m/s."
---

## METADATA
05_Camera_Raea_Pipeline | general | shot-list + raea camera

## CREATIVE_INTENT
"Whenever an action begins or a story begins … when a camera comes down on a jib, that usually signifies a beginning of a
story" — a car pulling in, someone arriving. In the trailer the jib comes down as the legend starts and again as the
story progresses within the same take.

## STE_PROCEDURE
1. Before planning the camera for a "beginning" line, mark it in the shot list as an opening beat.
2. Start the camera high above the hero, looking down at ~40–60° (`~`).
3. Descend vertically while tilting up so the hero ends at eye level or slightly below.
4. Ease in-out over the setup (2–3 s).
5. End on a composed frame (see a-to-b-composed-start-and-end-frames).

## AGENT_EXECUTION
raea: `y` eases from high to low while `lookingAt` stays on the hero: `Transform.fromXyz(0, lerp(0.35, 0.06, p), 0.25).lookingAt([0, 0.02, 0])` (macro metres, `~`).
Shot-list "Setup and camera": `jib down onto <hero>`.

### Worked example
Topic: "Kalau korang nak buka gerai burger, ni caranya. 4 step je." (S16, illustrative)
- BEFORE: `| 3 | "Step satu: kira modal" | static macro of a burger bun | — |`
- AFTER: `| 3 | "Step satu: kira modal" | jib down from above the gerai's grill plate to grill height, bun enters lower third | "RM800 modal" (illustrative) label fades in on "modal" | jib-down-opens-a-story |`

### Check
- Is this line a beginning (story, step block, new chapter)?
- Does the camera descend and tilt up, eased both ends?
- Is the jib reserved for beginnings (not reused for an ending)?

## NOTES
- Visual gaps: jib height and speed in the trailer are visual only.
- Pair: pull-out-closes-a-chapter is the opposite signal.
