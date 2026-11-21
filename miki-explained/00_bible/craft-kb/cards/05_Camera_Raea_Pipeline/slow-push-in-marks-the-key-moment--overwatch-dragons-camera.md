---
title: Very subtle push-in = a key story moment (revelation, or just before something happens)
bucket: 05_Camera_Raea_Pipeline
source: "Studio Lighting, Silhouettes & Color Theory/Overwatch Dragon Brothers - Visual language and 3D camera lessons.txt"
source_time: "07:58–08:23"
tool_target: shot-list
tier: full
use_when: "the payoff line (the RM number lands) or the line just before the reveal"
style_fit: "Fits: a small eased push is our default; this card reserves the slowest, subtlest push for the payoff so it means something."
---

## METADATA
05_Camera_Raea_Pipeline | general | shot-list + raea camera

## CREATIVE_INTENT
"There's a very subtle camera push-in as if it's a story key moment. Usually this kind of camera movement is added to
signify an important moment: there is a revelation, or right before something happens."

## STE_PROCEDURE
1. Before planning the payoff setup, find the one line that is the revelation.
2. Hold all other camera energy low on that setup (no turn, no second axis).
3. Push in along the view axis by a small amount (~5–10 % of the distance, `~`).
4. Run the push over the whole line, eased in-out, ending as the key word lands.

## AGENT_EXECUTION
raea: `Transform.fromXyz(0, 0.04, lerp(0.20, 0.185, p)).lookingAt([0, 0.02, 0])` over the line's duration (`~`). In the
shot list, mark it `subtle push (key moment)` and use it once or twice per episode.

### Worked example
Topic: "Gerai air tebu untung berapa sehari?" (illustrative).
- BEFORE: `| 9 | "Untung bersih dia RM180 sehari" | orbit around the cup | counter counts |`
- AFTER: `| 9 | "Untung bersih dia RM180 sehari" | subtle push-in on the cup, no orbit, 2.6 s | counter rolls to RM180 on "RM180"; accent glow on the number | slow-push-in-marks-the-key-moment |`

### Check
- Is this the episode's revelation line (or the line right before it)?
- Is the push the only camera motion in the setup?
- Is it used at most ~2 times per episode?

## NOTES
- Visual gaps: push distance in the trailer is visual only.
