---
title: Haze/fog for atmospheric depth while keeping the background in focus (alternative to defocus)
bucket: 06_Art_Direction
source: "Motion Feel, Easing & Camera Choreography/Sony Animation GOAT Behind the Scenes.txt"
source_time: "05:04–05:21"
tool_target: raea
tier: principle
use_when: "a UI-heavy or graphic-look setup needs depth separation but the background must stay sharp/legible (so shallow DoF can't be used)"
style_fit: "⚠ Style D's default depth cue is shallow DoF. Adapted: use haze as an added cue on wide/establishing setups only, never as a replacement for DoF on the macro hero shots."
---

## METADATA
06_Art_Direction | 3D animated feature production (general) | raea fog volume

## CREATIVE_INTENT
Rather than blurring backgrounds to create atmospheric perspective, use haze/fog techniques while keeping
everything in focus, to maintain a graphic 2D-style look where background detail still needs to read.

## STE_PROCEDURE
1. Before defocusing a background for depth, check whether that setup needs the background to stay legible
   (graphic/UI/establishing shot).
2. If so, add atmospheric haze/fog density that increases with distance instead of blur.
3. Keep focus uniform across the depth range; let haze alone carry the depth read.

## AGENT_EXECUTION
⚠ Adapted: Style D's hero macro shots keep shallow DoF as the primary depth cue — don't drop it there. Use this
haze technique only on wide/establishing or UI-heavy setups where legibility matters more than bokeh: raea
`<FogVolume>`/`<VolumetricFog>` density increasing with distance, DoF left wide/off for that setup only.

### Worked example
Topic: a wide establishing shot of a row of shoplots (illustrative).
BEFORE: distant shoplots thrown out of focus to show depth, losing their signage.
AFTER: Decision: "all shoplots kept in focus; distance signalled by increasing fog density toward the back, so
signage stays legible while depth still reads."

### Check
- Is haze used only where background legibility is required, not as a blanket replacement for DoF?
- Do the macro hero setups still keep their shallow DoF per the house style?

## NOTES
- ⚠ Rule tension with Style D's default shallow-DoF depth cue; adapted to apply only on wide/UI-legible setups.
