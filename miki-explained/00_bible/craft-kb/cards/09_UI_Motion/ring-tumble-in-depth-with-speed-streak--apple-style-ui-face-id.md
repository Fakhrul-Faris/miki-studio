---
title: Flat ring tumbling in 3D (X one way, Y the other) with a thick blurred copy as a speed streak
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/Create Apple-Style UI Motion Graphics in After Effects + Free Project File.txt"
source_time: "13:41–17:08"
tool_target: raea
tier: full
use_when: "a 'processing / verifying' beat between a UI action and its result (payment pending, scan checking)"
style_fit: "Fits as a 1–1.5 s processing beat; ⚠ rotation speed: a full 360° turn must take ≥ ~2.8 s to stay under ~130°/s → adapted: partial turns (~120–180°) within the beat, or accept as a UI element, not a camera move; streak subtle."
---

## METADATA
09_UI_Motion | After Effects (source) → raea 3D `Torus` + `<MotionBlur>` | raea

## CREATIVE_INTENT
After the face scan, an ellipse stroke (width 2) matching the existing circle starts exactly where the previous layers
end; a Stroke layer style matches colour/width; the layer is 3D in the Classic renderer so it "feels more 3D instead of
flat". X rotation makes one full turn, Y one full turn in the opposite direction; keys eased and graph-tuned (if a glitch
appears, move the final keys one frame forward). A duplicate gets a small change mid-animation and spaced-out keys, so
two rings tumble out of phase. Speed: a copy without layer style, stroke ~45, CC Force Motion Blur and Curves on alpha
gives a streak; its stroke width is animated down so it stays inside the edges at the end.

## STE_PROCEDURE
1. Start the ring exactly matching the previous circle (size, width, colour) so the hand-off is invisible.
2. Rotate it on X one way and on Y the opposite way, eased in-out.
3. Duplicate it; offset its middle keys so the pair tumbles out of phase.
4. For speed, add a thicker motion-blurred copy; narrow it toward the end.
5. End both rings flat, aligned, where the next element (check mark) begins.

## AGENT_EXECUTION
raea 3D over the UI: two `<Mesh3d><Torus major_radius={0.5} minor_radius={0.006} />` rotated with
`Quat.fromEuler("XYZ", ax, ay, 0)`, `ax = lerp(0, Math.PI, t)`, `ay = lerp(0, -Math.PI, t)` (t eased, 36 f ≈ 150°/s peak —
reduce to stay ≤ ~130°/s), emissive accent material; `{tumbling ? <MotionBlur shutterAngle={0.5} samples={4} /> : null}`
(raea-bevy post.md). Hand off to the 2D check-mark draw-on at the end frame.

### Worked example
Topic: "pembayaran sedang diproses" after scanning a QR at a pasar malam stall (illustrative RM6).
- BEFORE: a spinning loader icon for 2 s.
- AFTER: the QR frame's circle lifts into depth and tumbles once on X/Y in opposite directions (1.2 s), settles flat, and
  a check draws on as "RM6 diterima" rises.

### Check
- Does the ring start as an exact copy of the previous circle?
- Does peak rotation stay ≤ ~130°/s (or is it clearly a small UI element)?
- Does it end flat and aligned, handing off to the next element?

## NOTES
- Visual gaps: CC Force Motion Blur settings ("roughly like this") and curves visual only.
- AE dropped: Classic 3D renderer, layer-style stroke, CC Force Motion Blur, Curves; translated to raea 3D + MotionBlur.

## ADDENDUM — SaaS Motion Graphics Masterclass Techniques
Variant: an **Echo** effect gives trailing duplicate rings instead of one blurred streak copy — echo time −3
(trailing), echo count low (3, optionally up to 5). Echo renders from every frame by default, including before the
shape should have any trail, so key the **number of echoes** itself starting at 0 and animating up to the final
count, so the trailing copies fade in rather than appearing instantly. raea has no echo plugin; translate by
rendering N offset-frame copies of the ring (`f - i*2` each, i = 0..3) at falling opacity (1, 0.5, 0.25, 0.1), gated
by an overall `trailT` 0→1 so they are absent at the ring's own entrance — same subtlety cap as this card's single
streak.
