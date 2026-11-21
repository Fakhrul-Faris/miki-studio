---
title: Freeze a clip's last frame and duplicate it to stretch a too-short animation without re-rendering it
bucket: 08_Edit_Pacing
source: "Minimalist Tech & SaaS 3D Staging/How To Master Shape Morphing For Apple Ui Style – Full After Effects Tutorial.txt"
source_time: "28:17–28:41, 29:35–30:12"
tool_target: principle-only
tier: principle
use_when: "a pre-built state animation (a play→pause icon swap, a borrowed clip) is shorter than the beat it needs to hold for"
style_fit: "No equivalent as an AE trick (raea never runs out of frames — it renders exactly the duration asked); the underlying need (hold a finished state, then play a short state-change once) is real and already served by scale-in-appear / button-press-as-state-change. Principle only: build state-change animations as pure functions of frame so any hold length just asks for more frames of the same state, instead of looping or freezing footage."
---

## METADATA
08_Edit_Pacing | After Effects Time > Freeze Frame (source) → raea: generate the hold procedurally | principle-only

## CREATIVE_INTENT
A short play→pause icon-swap animation runs out of frames before the shot needs it to. Rather than re-animate, the last
frame is frozen and duplicated/pasted after itself to pad the hold, and (separately) a short clip is duplicated several
times in sequence to fill a longer span. The underlying need is always: "this state is finished, now just hold it" for
however long the beat requires.

## STE_PROCEDURE
1. Before padding anything, identify the exact frame where the animated state change finishes (e.g. icon fully "paused").
2. In a timeline tool, freeze that frame and extend it for as many frames as the hold needs; for a short repeating
   clip, duplicate the clip end-to-end instead of freezing a single frame.
3. In a code-driven pipeline, skip the freeze/duplicate step entirely: express the state as `t = clamp01((f - at) / dur)`
   so for any `f` past `at + dur` the function already returns the finished state (no extra asset needed).

## AGENT_EXECUTION
raea: never freeze a rendered frame — clamp the interpolation so the finished state is the function's output for the
entire hold, however long the shot list needs it to be:
```tsx
const t = Math.min(1, Math.max(0, (f - at) / dur));   // reaches 1 and stays there — no freeze needed
<Icon state={t < 1 ? "playing" : "paused"} progress={t} />
```
Shot row: unaffected — this is a build note, not a shot-list event; flag it only if an episode ever imports footage
(a real screen recording) shorter than its hold, in which case the raea equivalent is to hold the last decoded frame as
a still image for the remaining duration, same principle as above.

### Worked example
Topic: a kedai's QR payment app showing a loading spinner finishing into a checkmark (illustrative flow).
- BEFORE (AE habit): the checkmark animation is 12 frames long but the beat needs to hold it for 45 frames, so the
  last frame gets frozen and pasted 33 times.
- AFTER (raea): the checkmark's draw function is written as `t = clamp01((f-at)/12)`; at any `f` beyond `at+12` it
  simply keeps returning the completed checkmark — no padding step exists.

### Check
- Is the finished state expressed as a clamped function of frame, not a baked clip?
- If real footage is used, does the hold reuse its last decoded frame rather than looping or stretching the clip?

## NOTES
- Visual gaps: the exact frame counts frozen/duplicated are on-screen only.
- AE dropped entirely: Freeze Frame, duplicate-and-paste padding — both are workarounds for a fixed-length rendered
  asset, which raea's per-frame functions don't need.
