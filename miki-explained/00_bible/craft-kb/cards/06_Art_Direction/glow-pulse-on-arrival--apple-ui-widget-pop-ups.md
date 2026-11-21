---
title: Glow pulses up then back down exactly as each element lands
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/How to Create Viral Apple-Style UI Widget Animations in After Effects! (Apple Masterclass Part 2).txt"
source_time: "10:16–10:56 (icon + line glow), 21:11–21:58 (background, box, text, loading bar glows)"
tool_target: raea
tier: full
use_when: "an icon, UI box, line or number needs a one-beat emphasis exactly as it arrives, without a flash or a sustained glow"
style_fit: "Fits — a glow that is zero before and after keeps the frame calm; only the hero on screen gets the pulse, never the whole frame."
---

## METADATA
06_Art_Direction | After Effects Deep Glow (source) → raea bloom/emissive track | raea

## CREATIVE_INTENT
Instead of a static glow sitting on an element the whole time, each element's glow intensity is keyed at zero before it
arrives, bumped up for the moment it pops in or completes (icon/line ~0.1–0.2, background wash ~0.1, loading bar ~0.1,
text kept very low ~0.05 so it doesn't look "fake"), then dropped back to zero once it has settled — "it's going to
glow a little" exactly once, timed to the beat, never left on.

## STE_PROCEDURE
1. Before an element's entrance, set its glow/bloom intensity to zero.
2. Key a glow bump to a small value the instant it lands or completes (icon/line stronger, ~0.1–0.2; text much lower, ~0.05).
3. Key it back to zero shortly after, so the glow reads as one pulse, not a lit state.
4. Keep every element's peak low enough it never looks like a fake halo — text in particular barely glows.
5. Repeat the same pulse shape on every new element so the beat feels consistent across a scene.

## AGENT_EXECUTION
raea: a bloom/emissive strength track that spikes and returns to 0 at the arrival frame, reused per element with a
per-type ceiling (icon/ring higher than text):
```tsx
const pulse = (at: number, peak: number) => interpolate(f,
  [at - 4, at, at + 14], [0, peak, 0],
  { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
// icon/ring ~0.15, loading bar ~0.1, text label ~0.05
<Bloom intensity={pulse(word("jual"), 0.15)} />
```
For a 2D label, drive a CSS `filter: drop-shadow(... rgba(accent, pulse))` or `textShadow` the same way.
Shot row: `| 5 | "RM45 je sebulan" | UI card closes in | number glows once (peak ~0.1) as the digits finish counting, then settles flat | this card |`.

### Worked example
Topic: a kedai's RM45 monthly subscription fee landing on screen (illustrative amount).
- BEFORE: "RM45" sits with a constant soft glow behind it the whole shot.
- AFTER: "RM45" has zero glow, then pulses to a faint bloom the instant the digits finish counting on "sebulan", and
  fades back to flat within half a second.

### Check
- Is the glow zero immediately before and after the pulse (not a sustained halo)?
- Does the peak land on the exact frame the element arrives/completes?
- Is the text's peak noticeably lower than the icon/ring's, so it never reads as fake?

## NOTES
- Visual gaps: exact exposure/intensity units are the source tool's own scale; treat the ratios (text lowest, icon/line
  highest) as the transferable value, not the raw numbers.
- AE dropped: Deep Glow's Exposure parameter keyed per element; translated to a bloom/emissive strength track per
  element in raea.
