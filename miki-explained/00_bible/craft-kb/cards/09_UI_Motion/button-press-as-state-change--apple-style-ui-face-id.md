---
title: Button press as a full state change — 4-key press scale, label blurs out, shape and colour switch
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/Create Apple-Style UI Motion Graphics in After Effects + Free Project File.txt"
source_time: "06:51–09:44 (press), 18:46–20:32 (new content in, check mark out)"
tool_target: raea
tier: full
use_when: "a how-to step whose action is 'tap X' and the UI must visibly respond (pay, confirm, scan)"
style_fit: Fits — tactile feedback without a hand; ⚠ the bounce expression on the press is dropped (eased press only).
---

## METADATA
09_UI_Motion | After Effects (source) → raea 2D layers | raea

## CREATIVE_INTENT
A "click" null above the button's main null carries the press: four scale keys (down, hold, up, settle). During the
press the label and logo blur out (Fast Blur keyed) while their opacity fades; the box morphs from pill to square with
corners removed, and box and shadow colours change. The new content (Face ID scan) then scales in with blur → sharp and
opacity; at the end the button animates out via its X/Y controls and the check mark's scale, opacity and blur.

## STE_PROCEDURE
1. Put the press on its own parent layer (so it adds to any other motion).
2. Key 4 scale steps: 100 → ~94 → ~94 → 100 (press, hold, release) (`~`).
3. On the press, blur the label out and fade it (eased).
4. On the same frames morph the shape and swap fill + shadow colour.
5. Bring the next state in: scale up + blur → sharp + opacity.
6. Exit: shrink the button's dimensions and fade/blur the result.

## AGENT_EXECUTION
raea: wrap the button in `<Animate animate={{ scale: track({ 0: 1, 4: 0.94, 8: 0.94, 14: 1 }, { curve: "in-out-cubic" }) }} at={word("tekan")}>`;
label `blur: track({ 0: 0, 8: 12 })` + `opacity` to 0; next content `enter="rise"` with `blur` 12 → 0.

### Worked example
Topic: confirming a RM25 online top-up (illustrative).
- BEFORE: button turns grey, next screen cuts in.
- AFTER: on "tekan", "Top up RM25" dips 6 %, its label blurs away, the pill squares into a card that turns green; a
  check draws in as "Berjaya" rises.

### Check
- Do press, label-out and colour change share one word cue?
- Is the press dip ≤ ~6–10 % with no bounce?
- Does the next state enter with fade/blur (no pop)?

## NOTES
- Visual gaps: scale values of the 4 keys and blur amounts are visual only.
