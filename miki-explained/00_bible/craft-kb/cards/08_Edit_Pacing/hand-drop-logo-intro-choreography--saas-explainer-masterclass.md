---
title: Cursor-drop-logo intro choreography — pointer flies in, "clicks" with a 2-key scale pulse, drops the logo, flies out
bucket: 08_Edit_Pacing
source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt"
source_time: "1:48:25–1:54:08"
tool_target: raea
tier: full
use_when: "a brand logo needs to be physically 'placed' into frame at the top of a scene, rather than just fading in"
style_fit: "⚠ source uses a literal hand/pointer PNG — adapt to an abstract UI cursor or a tap-ripple (no hands/people in Style D, and no hand-drawn/coded people elsewhere); keep the mechanism (carrier curve + click pulse + logo settle + exit)."
---

## METADATA
08_Edit_Pacing | After Effects pen-tool motion path + 2-key scale pulse + bounce expression (source) → raea path + spring | raea

## CREATIVE_INTENT
A pointer PNG, parented to a null and the logo, travels in on a curved pen-tool path (eased via the flow/smoothing
pass) from off-frame, "clicks" by scaling down then back up on two adjacent keyframes (copy-paste the first key a few
frames later), which reads as the moment it releases the logo. The logo gets its own small bounce-expression settle.
The pointer then swaps to an "open" state and travels back out on its own curved path, leaving the logo centred.

## STE_PROCEDURE
1. Parent the cursor/pointer and the logo to one null for the entry travel.
2. Animate position along a curved (not straight) path from off-frame to the drop point, eased.
3. At the drop point, key a quick scale-down-then-up pulse (two adjacent keyframes) to read as a "press".
4. Let the logo settle with a small bounce (capped overshoot) exactly on the press frame.
5. Unparent the pointer, swap its state (closed → open), and animate it back out along its own curved path.

## AGENT_EXECUTION
raea: replace the hand PNG with an abstract cursor/ripple element. `const p = bezierPath(t)` for position; pulse
`const s = t===pressT ? 0.85 : 1` eased in/out over `~`4 f; logo settle with capped spring (overshoot ≤ 3–5%, ≥ 0.4 s).
Shot row: `| 1 | (frame 0, silent) | phone UI, blank home screen | an abstract tap-ripple lands centre, logo pulses
into place, ripple clears | this card |`.

### Worked example
Topic: frame 0 of an app-install UI explainer — the brand logo needs to "land" on the home screen.
- BEFORE: the logo simply fades into the centre of the screen.
- AFTER: a small ripple/cursor glyph travels in on a curved path, "taps" with a brief scale pulse, the logo settles
  into place with a capped bounce, and the ripple clears off-path — no literal hand or finger drawn.

### Check
- Is the path curved, not a straight line?
- Is the "click" a brief scale pulse, not a pop?
- Is the pointer an abstract UI glyph, never a drawn hand/finger?

## NOTES
- Visual gaps: exact path curvature and pulse scale values are visual only.
- Rule conflict: source uses a literal hand-cursor PNG — dropped per house no-people/no-hand-drawn-people rule; kept the
  travel/press/settle/exit choreography with an abstract glyph.
- AE dropped: bounce expression on the logo; translated to a capped spring/overshoot curve.
