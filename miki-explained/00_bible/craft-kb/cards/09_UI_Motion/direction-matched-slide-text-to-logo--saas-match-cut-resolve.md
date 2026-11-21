---
title: Direction-matched slide swap — text exits left on a sharp-peak curve, the logo enters moving left on the same curve
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Cleanest Match-Cut Transition for SaaS.txt"
source_time: "05:06–07:33"
tool_target: raea
tier: full
use_when: "handing a claim over to the brand logo or an app icon (frame 1 logo rule, end-of-step 'buka app ni')"
style_fit: "Fits: a slide (allowed) whose cut is hidden at the speed peak; logo arrives eased, never pops. Keep travel short (≤ ~40 % of frame width) so the peak speed stays calm."
---

## METADATA
09_UI_Motion | DaVinci Resolve Fusion (source) → raea 2D `interpolate` on x | raea / HyperFrames

## CREATIVE_INTENT
"Instead of zoom out, we will do a left slide transition … instead of another text, a logo." Start a few frames before
the previous animation ends "to maintain the flow"; the text slides left over ~30 frames on the sharp curve; the logo is
keyed on the same frames entering from the right "so they move in the same direction"; trim both at the middle key;
add motion blur.

## STE_PROCEDURE
1. Start the move a few frames before the previous animation ends (flow overlap).
2. Key the text's centre; ~30 frames later key it moved left.
3. Make the curve a sharp peak (in/out ~70–80 %).
4. Key the logo's centre on the same two frames: first key to the right, last key at its rest position.
5. Give the logo the same sharp curve, so both travel left at matched speed.
6. Cut text → logo at the middle frame.
7. Enable motion blur on both.

## AGENT_EXECUTION
raea: `x1 = lerp(0, -W*0.4, p)` for the text, `x2 = lerp(W*0.4, 0, p)` for the logo, `p` from
`Easing.bezier(0.75, 0, 0.25, 1)` over ~30 frames; render the text for `f < CUT`, the logo for `f >= CUT`. The logo must
be the real brand mark (house rule) — import the SVG/PNG, never redraw it.

### Worked example
Topic: "Terima bayaran QR di gerai — 3 step" (illustrative).
- BEFORE: "Step 1: daftar akaun merchant" fades out; the bank app icon fades in 0.5 s later.
- AFTER: on "daftar", the step line slides left (30 f, 75 % ease); at the peak it cuts to the real app icon still sliding left, settling centre on "app" — the accent outline grows round the icon 0.4 s later.

### Check
- Do outgoing and incoming items travel the same direction at matched speed through the cut?
- Did the move start before the previous animation finished?
- Is the logo the real asset and on screen early enough?

## NOTES
- Fusion steps dropped: Transform node centre keys, Merge trim from right/left via the keyframe panel (dummy key first), Inspector → Settings → Motion Blur.
- 30 frames is the source value; the slide distance is visual only (`~`).
