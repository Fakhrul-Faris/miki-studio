---
title: Freeze a frame to hold or extend it without new animation
bucket: 08_Edit_Pacing
type: master
members:
  - cards/08_Edit_Pacing/freeze-frame-toggle-hold-mid-animation--saas-explainer-masterclass.md
  - cards/08_Edit_Pacing/freeze-last-frame-extend-clip--shape-morphing-apple-ui.md
sources: ["How To Master Saas Explainer – Full After Effects Tutorial.txt", "How To Master Shape Morphing For Apple Ui Style – Full After Effects Tutorial.txt"]
use_when: "a UI element must sit still for extra beats, or a pre-built state animation is shorter than the beat it needs to hold — in both cases, freeze a frame instead of re-animating"
style_fit: "Fits as a build shortcut, not a visible effect. raea renders exactly the duration asked, so neither AE trick (Toggle Hold keyframes, Time → Freeze Frame) is needed as-is: express the held state as a clamped function of frame so it holds for any length without re-keying."
---

## METADATA
08_Edit_Pacing | After Effects Toggle Hold keys / Time → Freeze Frame (source) → raea clamped frame function | raea

## CREATIVE_INTENT
A sub-element's own animation finishes before the shot it sits in does. Rather than re-key it to match the shot's
length, the finished state is held — in AE by freezing/toggling keys to flat; in a code-driven pipeline by clamping
the element's time input so its function keeps returning the finished state for however long the hold runs.
- SaaS explainer masterclass adds: when one sub-element (a button, a badge) finishes early, toggle its last keyframes
  to "Hold" or freeze its layer's time at that frame, while every other layer in the shot keeps animating normally.
- Shape-morphing Apple UI adds: for a short repeating clip or icon-swap that runs out of frames before the hold ends,
  freeze the last frame and duplicate/paste it to pad the span (or duplicate a short clip end-to-end); in a code
  pipeline this whole step disappears because the state function is already defined past its end.

## STE_PROCEDURE
1. Notice a sub-element's animation (or a borrowed clip) finishes before the shot/beat it's in does.
2. Identify the exact frame where the state change completes (e.g. badge fully popped in, icon fully "paused").
3. AE habit (dropped, kept for context): toggle the last keyframes to Hold, or freeze/duplicate that frame to pad the span.
4. raea: clamp the element's own time input so its function returns the finished state for any frame past completion —
   `const et = Math.min(f, elementEndFrame);` and drive that element's props from `et`, never from the shot's raw `f`.
5. Leave every other layer/element in the shot animating normally; only the finished element's local time is clamped.
6. If real footage (a screen recording) is shorter than its hold, hold its last decoded frame as a still for the remainder — same clamp principle, applied to a frame buffer instead of a procedural value.

## VALUES BY SOURCE
| parameter | SaaS explainer masterclass | Shape-morphing Apple UI | recommended for Style D (+ why) |
|---|---|---|---|
| AE mechanism | Toggle Hold on last keyframes, or Time → Freeze Frame on the layer | Time → Freeze Frame, frozen frame duplicated/pasted to pad; or clip duplicated end-to-end | Neither — raea has no fixed-length rendered asset to pad |
| What stays frozen | one sub-element only (badge/button) | the whole short clip/icon state | Only the one element whose state finished; scene keeps animating |
| raea equivalent | clamp that element's local time: `Math.min(f, elementEndFrame)` | clamp progress: `t = clamp01((f - at) / dur)`, reaches 1 and stays | Both forms are the same clamp; use whichever the element's prop expects (a frame or a 0–1 progress) |
| Real-footage case | not addressed | hold last decoded frame as a still for the remaining duration | Use when importing real screen recordings shorter than their hold |

## AGENT_EXECUTION
Don't let a sub-element disappear or glitch just because its own short animation (or a borrowed clip) ran out of
frames before the shot does. Express the finished state as a function of frame that is already correct for any `f`
past completion — no padding, no duplicated frames, no freeze operation exists in raea's per-frame render model:
```tsx
// progress-driven element (icon swap, state change)
const t = Math.min(1, Math.max(0, (f - at) / dur));   // reaches 1 and stays there
<Icon state={t < 1 ? "playing" : "paused"} progress={t} />

// element driven by its own local frame clock (badge pop-in)
const et = Math.min(f, elementEndFrame);
<Badge frame={et} />

// real footage shorter than its hold: freeze the last decoded frame
const footageFrame = Math.min(f - clipStart, clipLastFrame);
```
Shot row: unaffected unless the held element is itself a named event —
`| 5 | "...tiket" | phone UI, ticket card | ticket badge holds its final state while camera/background keep moving | this card |`.

### Worked example
Topic: a cinema app's "tiket disahkan" (ticket confirmed) badge pops in on L05, but the line runs 1.5 s longer than
the badge's own 12-frame pop animation; separately, a loading-spinner-to-checkmark icon on a kedai's QR payment
screen (illustrative flow) needs to hold its finished checkmark for 45 frames though the animation is only 12 long.
- BEFORE (AE habit): toggle the badge's last keys to Hold, or freeze the checkmark's last frame and paste it 33 times
  to pad the span — both re-done by hand if the shot's timing shifts later.
- AFTER (raea): the badge's local frame is clamped (`et = Math.min(f, elementEndFrame)`) and the checkmark's progress
  is clamped (`t = clamp01((f - at) / 12)`); either one already returns the finished state for any `f` past
  completion, so retiming the shot needs no re-key.

### Check
- Is the finished state expressed as a clamped function of frame/progress, not a baked or duplicated clip?
- Does only the one finished element hold, while the rest of the scene keeps animating normally?
- Does the held element stay visually identical to its last keyframe (no drift/pop) across the whole hold?
- If real footage is used, does the hold reuse its last decoded frame rather than looping or stretching the clip?

## NOTES
- raea check (2026-11-21): `<Badge>` in the code above is a stand-in for a component the episode builds (from raea primitives such as `Cuboid`, `ImagePlane`, `Text3D`), not a raea built-in. Define it before use.
- Deprecations: AE's Toggle Hold keyframe interpolation and Time → Freeze Frame (plus duplicate-and-paste padding)
  are both workarounds for a fixed-length rendered asset; raea's per-frame functions make them unnecessary.
- Visual gaps: exact frame counts frozen/duplicated in the source videos are on-screen only, not stated in speech.
- This is a technical/production shortcut, not a visible effect — it never appears as its own shot-list event unless
  the hold itself is the point (e.g. a badge visibly staying still while the camera moves past it).
