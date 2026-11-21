---
title: Hold-frame colour snaps, not gradients, for a flat-colour design system
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Perfect Shape Morphs After Effects Transcript.txt"
source_time: "29:45-31:21"
tool_target: raea
tier: full
use_when: "a shape/UI element changes colour mid-animation (state change, accent reveal) inside a flat, limited-palette design system"
style_fit: "Matches the house rule 'one brand accent colour' directly: a flat palette has no gradients anywhere, so a colour change inside a morph must snap, not fade through intermediate hues (which would momentarily look like a second, unintended colour)."
---

## METADATA
09_UI_Motion | After Effects (Hold keyframe on an effect property) -> raea (step function, no interpolation) | colour-state changes inside flat-palette shapes

## CREATIVE_INTENT
Animating a colour property normally crossfades through every colour in between (red to blue, through "this sort of
dark purple"), which is natural but wrong for a design system that only ever uses a small fixed set of colours
("nowhere else in the design is there any gradients, it's only the three colours"). The source converts the colour
keyframes to **Hold** frames (no in-between value at all - the property snaps at the keyframe) so the shape is
simply red, then simply blue, with no intermediate hue ever appearing on screen. A related catch: a hold-frame
swap can still leave a one-frame flash of an unrelated colour peeking through underneath (a background triangle,
here) at the exact swap frame - caught by scrubbing frame-by-frame at the cut, then fixed by splitting that layer and
pre-filling the correct colour on the frame before the reveal.

## STE_PROCEDURE
1. If a shape's colour must change mid-animation, and the design uses a small fixed palette (no gradients anywhere
   else), do not key the colour as a normal interpolated value.
2. Key the colour at its first value, then key the new value at the swap frame.
3. Convert both colour keyframes to **Hold** (e.g. Ctrl/Cmd+Alt-click the keyframe) so the property snaps instead of
   blending.
4. Scrub frame-by-frame across the exact swap frame; check for any unrelated layer/colour flashing through for one
   frame (an occlusion/z-order gap, not the colour property itself).
5. If a flash is found, split the offending layer at that frame and pre-set its correct colour on the frame just
   before the reveal, rather than trying to fix it by re-timing the main colour swap.

## AGENT_EXECUTION
**Frame brief -> Decision field:** "colour snaps on <word>, no crossfade" for any accent-colour reveal inside a
flat-palette shot.

raea: do not run a colour through `interpolate`/`track` across the swap; step it instead:
```tsx
const color = f < swapFrame ? "#1a1a2e" : BRAND_ACCENT;   // snap, never a tracked/eased colour value
```
Then verify frame-by-frame around `swapFrame` for any occluded layer showing through for a single frame - fix by
giving that occluded layer the correct final colour starting one frame earlier, not by touching the snap itself.

### Worked example
Topic: "Resit berubah warna bila diskaun disahkan" (illustrative - a receipt icon's total turns from black to the
brand accent colour on "sah").
BEFORE: the total's colour is keyed black -> accent with normal interpolation; for two frames it reads as an
unplanned dark-red/brown blend that looks like a rendering error.
AFTER: both colour keys are held (snap); the total is simply black, then simply accent, with no in-between hue -
matching the house's flat, single-accent palette exactly.

### Check
- Does the colour change snap at one frame rather than crossfade through intermediate hues?
- Was the exact swap frame scrubbed by eye to check for any occluded layer flashing through?
- Is the fix for any flash applied to the occluded layer's own timing, not to the colour-snap itself?

## NOTES
- Visual gaps: none; Hold keyframes and the frame-by-frame flash-check are both shown directly.
- Rule conflicts: none; this card enforces the existing house "one brand accent colour, no gradients" rule rather
  than adapting around it.
