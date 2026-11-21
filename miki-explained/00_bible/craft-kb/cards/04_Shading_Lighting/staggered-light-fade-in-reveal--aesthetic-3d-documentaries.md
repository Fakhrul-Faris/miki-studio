---
title: Staggered light fade-in — each light rises from 0, offset, to reveal the scene
bucket: 04_Shading_Lighting
source: "3D Documentary Explainer Breakdowns/The Science of Aesthetic YT 3D Documentaries (Blender tutorial).txt"
source_time: "07:53–08:19"
tool_target: raea
tier: full
use_when: "an opening or new-place setup that should emerge from black (frame 0 reveal, or a 'behind the scenes' line)"
style_fit: "Fits Style D's dark room and the no-pop rule: lights ramp, never switch. ⚠ frame 0 must already move and show the logo/hero — so start the ramp from a low glow, not total black, on frame 0."
---

## METADATA
04_Shading_Lighting | Blender (Cycles) | raea light animation

## CREATIVE_INTENT
"I animate the lights so the scene starts dark and gradually brightens. I keyframe the intensity at zero, then increase
it over time. I offset each light slightly so they don't brighten all at once, creating a natural fade-in effect."

## STE_PROCEDURE
1. Finish the lighting at full values first.
2. Order the lights: hero key first, then side/fill, then back light last.
3. Key each light's intensity at 0 (or ~10 % on frame 0) at its start frame.
4. Key full intensity ~1–2 s later, eased in-out.
5. Offset each next light's start by ~6–12 frames (~0.2–0.4 s at 30 fps).
6. Land the last light's full value on the line's key word.
7. Check no light visibly pops on.

## AGENT_EXECUTION
raea: drive each light's `intensity` with `interpolate(frame, [start, start + dur], [0, full], {easing})` and offset
`start` per light. Source timing: 24 fps, 150-frame shot (6.25 s), lights start at 0; exact offsets unknown (visual only).
```tsx
const ramp = (start: number, full: number) =>
  interpolate(f, [start, start + 36], [full * 0.1, full], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
<SpotLight name="key"  intensity={ramp(0, 900_000)} ... />
<SpotLight name="side" intensity={ramp(9, 400_000)} ... />
<RectLight name="back" intensity={ramp(18, 150_000)} range={2} ... />
```
`interpolate` and `Easing` come from `"raea"` (`Easing.inOut(Easing.cubic)` is the form used in the episode builds).

### Worked example
Topic: "Kedai runcit buka pukul 6 pagi: apa jadi sebelum pintu dibuka" (illustrative).
- BEFORE: `| 1 | "Pukul 6 pagi, kedai ni dah hidup" | macro of shelves, all lights on from frame 0 | — |`
- AFTER: `| 1 | "Pukul 6 pagi, kedai ni dah hidup" | macro of the shop's roller-shutter logo, near-black, top key at 10 % on frame 0 | key ramps to full on "6 pagi" (1.2 s eased), shelf side light +0.3 s, back rim +0.6 s lands on "hidup" | staggered-light-fade-in |`

### Check
- Is each light ramped (no step from 0 to full)?
- Are start frames offset, hero key first?
- Does the last light reach full on a named word?
- Is the logo/hero visible on frame 0 (low glow, not black)?

## NOTES
- Visual gaps: exact offset frames and curve shape not given; values above are `~`.
- Source camera move: slight drop on Y with ease at the end — covered by `masters/01_Animation_Motion/two-keyframe-camera-move.md`.
