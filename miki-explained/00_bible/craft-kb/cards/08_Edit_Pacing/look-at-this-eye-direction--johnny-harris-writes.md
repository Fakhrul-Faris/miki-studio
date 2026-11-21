---
title: "Look at this" + eye-direction event on the word (circle, push, glint)
bucket: 08_Edit_Pacing
source: "Cinematic & Documentary Narrative Structure/Johnny Harris Reveals How He Writes YouTube Videos.txt"
source_time: "1:00:27–1:01:35, 18:22–19:01"
tool_target: raea
tier: full
use_when: "a line points the viewer at one detail in a busy frame (a line on a receipt, a number on a screen, a part of an object)"
style_fit: Fits "an on-screen event about every second, on the word"; ⚠ the pointer must grow in ~0.4 s and use the one accent, no flashy flash/zoom.
---

## METADATA
08_Edit_Pacing | Vox explainer style | shot-list events, raea overlay

## CREATIVE_INTENT
The Vox habit: "this is something", and an animation "circling something on a document". "There's a lot going on on a
screen, so you say 'look at this' and it goes over and circles, like a little zoom, or it shines… to say this is what you
should be looking at." Inviting voice + directed eye "dancing together, frame by frame" is "a really rich experience".

## STE_PROCEDURE
1. When a line points at a detail, put "tengok/nampak/look" or the detail's name in the line.
2. On that word, start one eye-direction event: an accent ring drawing on, a slow push toward the detail, or a light glint.
3. Draw the ring over ~0.4 s (12 frames at 30 fps), eased in-out.
4. Hold it ≥ 1 s, then fade it over ~0.4 s.
5. Never cover the hero's key part with text; the ring surrounds it.
6. Use one eye-direction event per setup.

## AGENT_EXECUTION
Shot list event: "on 'baris ni': accent ring draws round the total". raea: an SVG `<circle>` in an `<AbsoluteFill>` over
the 3D, its `strokeDashoffset` = `interpolate(frame, [word("baris ni"), word("baris ni")+12], [len, 0], {extrapolateLeft:"clamp", extrapolateRight:"clamp"})` with an in-out easing; opacity fades out over 12 frames after the hold. A push uses the camera position interpolated over the same cue.
### Worked example
Topic: checking the receipt at the counter (EX46 step 2).
BEFORE: L06 "Tengok resit betul-betul." over a static receipt; the eye wanders.
AFTER row: macro receipt, top light | on "tengok": accent ring draws round the shelf-price line in 12 frames; on "betul-betul" camera pushes 15 % in, eased over 1 s.
### Check
- Does the event start on the pointing word?
- Does the ring draw/fade over ~0.4 s, no pop?
- Is there only one eye-direction event in the setup, in the accent colour?

## NOTES
- Visual gaps: Vox's exact ring style and timing are not described; values above are house values, not the source's.
