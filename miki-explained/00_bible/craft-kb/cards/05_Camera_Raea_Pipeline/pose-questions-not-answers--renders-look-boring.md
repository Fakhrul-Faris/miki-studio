---
title: Intrigue: pose questions through the environment, don't reveal the answers
bucket: 05_Camera_Raea_Pipeline
source: "Why your Blender renders look BORING.txt"
source_time: "04:53–07:31, 12:36–12:50"
blender_version_source: n/a (art direction)
tool_target: principle-only
tier: full
style_fit: Strong fit with the open-loop hook and "odd moving first frame": frame 1 should raise a question the script answers later.
---

## METADATA
05_Camera_Raea_Pipeline | n/a | principle-only

## CREATIVE_INTENT
More important than props is making the viewer curious about what is happening without telling them. The aim is intrigue, not confusion: it is clearly something important, but you don't quite know what. Viewers fill the gap with their own answer, keep thinking about the image and talk about it (in the comments).

## STE_PROCEDURE
1. Decide the one question the shot should raise (e.g. "why is this pump showing RM0.00?").
2. Show the evidence of something important (state change, odd object, unusual angle) but hide its cause.
3. Leave out the element that would answer the question (the label, the person, the full view).
4. Keep everything else clear: the frame is readable, only the "why" is withheld.
5. In explainers, pay the question off later in the script (open loop → payoff), never leave it unanswered at the end.

## AGENT_EXECUTION
- Shot list column: `question_raised` / `answered_at_line` per setup; a frame-0 setup with no question fails the hook gate.
- Blender / raea: withholding is framing and light: crop the answer out of frame, keep it in shadow, or behind DoF blur (`<DepthOfField focal_distance aperture_f_stops={1.8} />`), then reveal with a camera flight or the light coming up on the word (light ramps ~0.4 s, never pops).
- raea: no special prop; it is staging.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: the video wants questions left permanently open (art pieces); our script formula requires the payoff ("Proof ↔ Payoff"). Withhold within the video, answer by the end. Plain-language rule: intrigue, never confusion.
