---
title: Cursor click — eased approach, ~10 % press dip, rides with the moving element, then exits with a turn and fade
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How to do SMOOTH SAAS Animation Like Creatoroly | After Effects Tutorial.txt"
source_time: "15:04–17:28"
tool_target: raea
tier: principle
use_when: "UI-heavy scenes where a step is 'tap/click this' and no hand may appear"
style_fit: Fits — the cursor replaces a hand (no people/hands rule); press dip is a scale change, not a bounce; all moves eased.
---

## METADATA
09_UI_Motion | After Effects (source) → raea 2D layer | raea

## CREATIVE_INTENT
The cursor is scaled down, rotated slightly and trimmed to start as the search box arrives. It travels to the box on an
eased curve; on contact its scale dips ~10 %, then it rides up with the box (its curve matched to the box's), returns to
size, moves right and a little up with a rotation back to 0 over ~20 frames, and fades out. The press triggers the next
UI state (results open).

## STE_PROCEDURE
1. Start the cursor already near its path when the target appears.
2. Move it to the target with an eased curve that arrives slightly before the click word.
3. On contact, dip its scale ~10 % and restore it (press).
4. If the target moves, give the cursor the same curve so it rides along.
5. Leave right/up over ~20 f with a slight rotation, fading to 0.
6. Fire the target's state change on the press frame.

## AGENT_EXECUTION
raea: cursor SVG in a `<div>` with `x`/`y` tracks (in-out-cubic), `scale` track `{ p: 1, p+4: 0.9, p+10: 1 }`,
`exit="fade"`. Press frame `p = word("tekan")`. 9:16 phone UI: cursor ≥ 64 px so it reads at phone size; for a
touch-screen phone UI use a soft tap ring instead of a cursor (same timing).

### Worked example
Topic: turning on a bank app's transaction alert (generic app; mechanism = a settings toggle).
- BEFORE: the toggle just flips green.
- AFTER: the tap ring arrives on "tekan", dips 10 %, the toggle slides to on; the ring follows the toggle knob, then fades
  out up-right as the next screen rises.

### Check
- Does the press land on the spoken word?
- Is the dip ≤ ~10 % with no overshoot on recovery?
- Does the cursor/tap leave with a fade (no pop)?

## NOTES
- Visual gaps: exact cursor scale ("keep it as 13" — likely 13 %) and curves are visual only.
