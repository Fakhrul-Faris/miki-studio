---
title: Be a tease — reveal the image's key part on the matching word, not before
bucket: 08_Edit_Pacing
source: "Explainer Visual Metaphors & Art Direction Critiques/4 Steps to Powerful Visuals.md"
source_time: "none (blog article, step 3)"
tool_target: shot-list
tier: full
use_when: "planning the State change and events column; any setup whose meaning depends on one hidden part"
style_fit: "Fits Style D's 'event on the word': hide the meaning-carrying part (crop, focus, darkness, angle) until the word; reveal with an eased 0.4 s+ move, never a pop."
---

## METADATA
08_Edit_Pacing | whiteboard/scribe video | shot-list row (events on named words) + raea timing

## CREATIVE_INTENT
Think about the timing of what you say in relation to the drawing. "Revealing the next part of the image at the right
time … looks really cool": the audience thinks "I get it!" right where you allow them to see it, and not before. In a
scribe tool this is a zoom/draw-on; on a whiteboard you stage it manually.

## STE_PROCEDURE
1. Before timing events, find the word in the line that names the payoff.
2. Hide the part of the image that explains it (out of frame, out of focus, in darkness, facing away).
3. Show the rest first so the viewer has a question.
4. Start the reveal on the payoff word's timestamp from the word timings.
5. Complete the reveal in ≥ 0.4 s with eased in-out motion (camera pull, rack focus, light up, rotate).
6. Never reveal earlier than the word.

## AGENT_EXECUTION
Shot-list "State change and events" column: `hidden: <part> via <method>; reveal on "<word>" (t = <s>)`. raea: drive
the reveal from the voice word timestamp, e.g. `const t = clamp((frame - fps*wordT) / (fps*0.5), 0, 1)` and feed
`ease(t)` into the camera position, the light intensity or the DoF focus distance (rack focus).
### Worked example
Line: "Harga RM 9.90, tapi kos sebenar cuma RM 4." (a pasar malam stall; illustrative numbers).
- BEFORE: the price tag and the cost slip both visible from the first frame of the setup.
- AFTER: `| 3 | "kos sebenar cuma RM 4" | macro on the tag, 85 mm, cost slip behind in deep blur | rack focus to the slip on "kos", 0.5 s eased; RM 4 lights in accent on "RM 4" | tease-reveal |`.
### Check
- Is the explaining part hidden until its word?
- Does the reveal start on the word's timestamp (±2 frames)?
- Is the reveal eased and ≥ 0.4 s (no pop)?

## NOTES
- Scribe "zoom function" dropped (VideoScribe tool); translated to camera pull / rack focus in raea.
