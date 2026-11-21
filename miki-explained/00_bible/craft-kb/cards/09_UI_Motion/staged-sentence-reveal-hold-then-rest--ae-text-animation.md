---
title: Staged sentence reveal — first part lands and holds, the rest follows (timing for legibility)
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/After Effects Text Animation Tutorial.txt"
source_time: "14:04–15:55"
tool_target: raea
tier: principle
use_when: "a two-part designed line where the voice pauses ('…') — setup half, then punch half"
style_fit: "Fits: timing follows the voice's own pause; each half uses the house ≥ 0.4 s eased reveal."
---

## METADATA
09_UI_Motion | After Effects (source) → raea two cue points | raea

## CREATIVE_INTENT
"How we can use timing of the animation… to show different parts of a sentence at different times." A key is added in the
middle of the reveal with offset 50 % so "only the first part is shown"; its handles are flattened so the animation
"stops" there, then continues. "The first part comes in before and the whole sentence now is more legible."

## STE_PROCEDURE
1. Split the line where the voice pauses (usually at "…").
2. Reveal part 1 on its first word; let it settle.
3. Hold part 1 still until the voice reaches part 2 (flat hold, no drift).
4. Reveal part 2 on its first spoken word with the same move.

## AGENT_EXECUTION
raea: two `<Stagger>` groups in one line; group 1 `at={word("first")}`, group 2 `at={word("second-part-first-word")}`.
Since `<Animate>` keeps hidden words in the layout, the line's final position is fixed from the start (combine with
`keep-line-centred-while-words-reveal--ae-text-animation.md` only if part 2 is short).

### Worked example
End text: "Diskaun 50%… dari harga apa?"
- BEFORE: all five words stagger in one sweep before the voice reaches "dari".
- AFTER: "Diskaun 50%…" rises with the voice and holds; "dari harga apa?" rises on "dari".

### Check
- Does each part start on its own spoken word?
- Is part 1 completely still during the hold?

## NOTES
- AE dropped: middle keyframe at offset 50 % with flattened (zero-velocity) handles; translated to two word cues.
