---
title: Letter-by-letter kinetic text reveal (position + opacity ramp, eased in and out)
bucket: 09_UI_Motion
source: "3D Documentary Explainer Breakdowns/How To Animate Like Imperial (Blender & After Effects Tutorial).txt"
source_time: "16:53–20:14"
tool_target: raea
tier: full
use_when: "a short title/label needs to read as handwritten-in-motion rather than a flat cut or pop"
style_fit: "AE pipeline prohibited → adapted directly to raea's own text/animate layer; no transparent-ProRes-into-3D roundtrip needed since raea composites text natively."
---

## METADATA
09_UI_Motion | After Effects kinetic text (source) → raea text animation | raea

## CREATIVE_INTENT
Reveal a short word or label one letter at a time by animating two properties together over the word's Range Selector:
Position slides each letter in from an offset, and Opacity ramps it from 0, with motion blur so the motion reads as
fast rather than jittery; then ease the timing (Easing/"Flow") so it starts slow, picks up pace, and settles; later,
animate the whole thing back out with a steep exit curve.

## STE_PROCEDURE
1. Set the text's Range Selector Start at the text's first frame.
2. Key the Range Selector's offset from 0 to 100 (covering the full word) over about 1 s so letters reveal left to right.
3. On the same range, key Position from an offset value down to 0 and Opacity from 0 to 100, so each letter slides and fades in together, not just fades.
4. Ease the reveal (not linear) so it starts slow, speeds up, and settles — avoid a constant-speed crawl.
5. Hold the fully revealed word on screen for its spoken duration.
6. Animate it out with a short, steeper curve (faster than the entrance) so the exit doesn't overstay.
7. Check: does the exit feel quicker than the entrance, and does the whole reveal land inside ~1 s?

## AGENT_EXECUTION
Shot-list cards column / frame-brief Moves: name the label, its reveal duration (~1 s in, hold, ~0.3–0.4 s out), and
which word it's timed to. In raea this is a per-letter stagger on a text layer — no AE import, no transparent-ProRes
plane, no image-plane step.

```tsx
const letters = "5 SEN".split("");
const revealStart = inF;
const perLetter = 3;  // frame stagger between letters (~1 s total reveal at 24–30 fps for a short word)

{letters.map((ch, i) => {
  const t0 = revealStart + i * perLetter;
  const y = interpolate(f, [t0, t0 + 14], [12, 0], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const o = interpolate(f, [t0, t0 + 14], [0, 1],  { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <span key={i} style={{ transform: `translateY(${y}px)`, opacity: o }}>{ch}</span>;
})}
// exit: shorter, steeper curve than the entrance, e.g. 8–10 frames instead of 14
```

### Worked example
Topic: the register total resolving to "RM 450" at month's end (illustrative).
BEFORE: "RM 450" cuts in as a flat static title.
AFTER: each character slides up and fades in left to right over ~1 s, eased so it starts slow and lands with a
settle; it holds through the line, then exits in a faster ~0.3 s.

### Check
- Does the reveal move position AND opacity together, not opacity alone?
- Is the entrance eased (slow→fast→settle), never constant-speed?
- Is the exit faster than the entrance, and does the whole thing avoid a hard pop on or off (house rule: fade/grow ~0.4 s)?

## NOTES
- AE dropped: Range Selector keyframing, motion blur, Easy Ease "Flow" presets, ProRes 444 + premultiplied-alpha export,
  and the Blender "Images as Planes" import — all translated directly to a raea per-letter `interpolate` stagger with
  eased curves, since raea renders and composites text natively.
- Visual gaps: the exact offset distance, stagger timing, and ease-curve shape are judged on screen (`~`).
