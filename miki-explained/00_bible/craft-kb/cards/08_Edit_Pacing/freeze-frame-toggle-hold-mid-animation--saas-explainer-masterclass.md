---
title: Freeze-frame / toggle-hold a UI state static mid-sequence instead of re-animating it
bucket: 08_Edit_Pacing
source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt"
source_time: "53:51–54:40, 1:01:24–1:01:46"
tool_target: raea
tier: principle
use_when: "a UI element needs to sit still on screen for a few extra beats without building new keyframes for it"
style_fit: Fits — a pacing/production shortcut, not a visible effect; use it to hold a state exactly as long as the VO needs without re-timing the whole rig.
---

## METADATA
08_Edit_Pacing | After Effects Toggle Hold keyframes / Time → Freeze Frame (source) → raea frame-clamp | raea

## CREATIVE_INTENT
A button's own entrance animation is too short for the shot it sits in, so rather than re-key it to match, its last
keyframes are toggled to "Hold" (or the layer is frozen via Time → Freeze Frame) so it simply stops moving and holds its
final look while everything else keeps animating around it.

## STE_PROCEDURE
1. Notice a sub-element's animation finishes before the shot does.
2. Select its last keyframes and set them to Hold (flat, no interpolation past that point).
3. Or freeze that layer's time at the exact frame it should hold.
4. Leave every other layer in the shot animating normally.

## AGENT_EXECUTION
Don't let a sub-element (a button, a badge) disappear just because its own short animation ended before the shot does.
Two moves: (1) select the last keys and toggle them to "Hold" so the value stays flat past the last keyframe; (2) or
clamp the read time so the element keeps showing its last frame while the rest of the scene keeps playing. In raea,
clamp the element's own time input instead of letting it run past its defined range: `const et = Math.min(f, elementEndFrame);`
then drive that element's props from `et`, not `f`. Shot row: `| 5 | "...tiket" | phone UI, ticket card | ticket badge
holds its final state while the camera/background keep moving | this card |`.

### Worked example
Topic: a cinema app's "tiket disahkan" (ticket confirmed) badge that finishes its pop-in early but the line runs on.
- BEFORE: the badge's animation ends and it just sits there unattended, risking a late re-render edit if timing shifts.
- AFTER: the badge's local time is explicitly clamped at its last frame so it holds cleanly for however long the shot
  needs, independent of the rest of the scene's timing.

### Check
- Does the held element stay visually identical to its last keyframe (no drift/pop)?
- Is only that element's time clamped, not the whole shot frozen?
- Does the rest of the scene keep animating normally during the hold?

## NOTES
- Visual gaps: none — this is a technical/production shortcut, not a visual technique.
- AE dropped: Toggle Hold keyframe interpolation and the Freeze Frame time-remap shortcut; translated to a clamped local
  time input in raea's frame-pure model.
