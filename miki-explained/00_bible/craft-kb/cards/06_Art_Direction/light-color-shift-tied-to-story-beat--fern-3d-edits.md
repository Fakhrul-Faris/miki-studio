---
title: Keyframed light colour + intensity shift timed to a story beat
bucket: 06_Art_Direction
source: "3D Documentary Explainer Breakdowns/How to Make 3D Edits like Fern (RED STYLE).txt"
source_time: "28:52–30:18"
tool_target: raea
tier: full
use_when: "a line marks a turning point (the calm setup becomes the complication, or vice versa) and the light itself should mark it"
style_fit: "⚠ conflict: our house rule is one brand accent colour, not a light that changes colour mid-shot → adapted: keep the light's colour fixed on the accent; carry the 'something just changed' beat with intensity/power and DoF instead of a colour shift."
---

## METADATA
06_Art_Direction | Fern/RED-style 3D breakdown | Blender keyframed light power+colour → raea intensity ramp

## CREATIVE_INTENT
The source times two area lights' Power down and their Color from white to red exactly as the camera push lands on
the second character, so the lighting itself performs the turn in the story ("so now we have that transition") rather
than leaving it to the edit alone — a lighting beat synchronized to the same frame as the focus pull and camera arrival.

## STE_PROCEDURE
1. Identify the exact frame where the story turns (the line's meaning flips, a reveal lands, the mood changes).
2. At that frame, begin a light intensity change (not a colour change) that completes by the time the camera/focus arrives.
3. Pair the intensity ramp with the camera's arrival and the DoF's focus pull so all three land together.
4. Keep the light's colour on the one brand accent throughout — do not introduce a second hue for the "after" state.
5. Check: if the colour shift were muted entirely, would the beat still read from intensity and focus alone?

## AGENT_EXECUTION
Shot-list "State change and events": note the light-intensity ramp and its target frame alongside the camera/focus
events already planned for that setup, so all three are authored together rather than the light being an afterthought.

```tsx
const turn = interpolate(f, [turnStart, turnStart + 24], [1, 0.3], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<SpotLight color={ACCENT} intensity={baseIntensity * turn} transform={...} />
```

### Worked example
Topic: a tuition centre's "hidden registration fee" reveal (illustrative).
BEFORE: the light stays constant through the whole shot; only the camera push signals the reveal.
AFTER: as the camera arrives on the fee line, the light dims from its full read down to a tighter, dimmer pool — same
accent colour throughout — landing exactly on the word "RM200 tambahan".

### Check
- Does the light-intensity change land on the exact frame the story turns, not drift early or late?
- Does the light stay in the single brand accent colour, with no second hue introduced for the "after" state?
- Would the beat still read without a colour change, from intensity + camera + focus alone?

## NOTES
- Visual gaps: exact power/intensity values are set by eye on screen (`~`).
- Rule conflicts: the source's white→red light recolour directly breaks "one brand accent colour only" — fully adapted to keep the accent fixed and carry the beat on intensity instead.
