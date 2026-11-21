---
title: Shame cut: radio edit with reference screenshots timed to the voice
bucket: 08_Edit_Pacing
source: "Cinematic & Documentary Narrative Structure/Johnny Harris Reveals How He Writes YouTube Videos.txt"
source_time: "02:48–03:22, 29:14–30:31"
tool_target: raea
tier: full
use_when: "after the script is approved and scratch voice exists, before the board/preview builds"
style_fit: Fits our motion-review tools (animatic + camera map before previews); ⚠ screenshots are review-only, never final footage.
---

## METADATA
08_Edit_Pacing | NLE timeline (shame cut → rough → fine → fine 2 → audio lock → picture lock; notes in Frame.io/Google Docs) | animatic

## CREATIVE_INTENT
The "shame draft/shame cut" translates the script onto a timeline: "all the voice — the left column, completely
articulated", with "screenshots of the right column happening in time" and music, "so I say the word and I can see what I
directed as it plays". The team gives feedback "on the flow and the length, and we can cut it down". Then: rough cut, fine
cut, fine 2, audio lock, picture lock, each with ~150 micro notes.

## STE_PROCEDURE
1. Record or generate a scratch voice of the full script.
2. Get word timings (words.json).
3. Place one reference still per shot-list row, starting on its cue word.
4. Add a temp music bed at the final level.
5. Watch it once at full speed without stopping; note every line that drags or confuses.
6. Cut lines or merge setups until the runtime fits 55–90 s.
7. Only then build the board and the 3D preview.

## AGENT_EXECUTION
raea: an animatic composition of `<Sequence>`s holding plain `<img src={staticFile("refs/rowNN.png")}>` stills (verify the image element in `raea guide` before use), each starting at `word("<cue>")` from the
scratch words.json, plus `<Audio>` voice and music. Save as `out/animatic.mp4`; this is the "camera map + animatic" step.
### Worked example
Topic: 3 steps to read a payslip for a first job in KL (numbers illustrative).
BEFORE: went straight to a 3D preview; at 74 s, step 2 ran 14 s and the user rejected the pace after a 3-hour build.
AFTER: shame cut in 20 min shows step 2 is 14 s; L06 merged into L05, two setups cut; runtime 61 s; then the preview.
### Check
- Does the animatic play the full voice with one still per row on its cue word?
- Was it watched once without stopping and noted?
- Is runtime inside 55–90 s before any 3D preview?

## NOTES
- Harris's 4-month, 25-person pipeline is compressed to one animatic pass; the lock stages map to our preview → final gates.
