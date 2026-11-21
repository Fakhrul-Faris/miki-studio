---
title: Single-word emphasis — isolate one word by index, give it a secondary move (skew + weight change)
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/After Effects Text Animation Tutorial.txt"
source_time: "06:25–14:04"
tool_target: raea
tier: principle
use_when: "the one word in a designed line that the voice stresses (the RM number, 'tipu', 'percuma')"
style_fit: "⚠ source swaps the font in one frame (a pop) → adapted: a weight change animated over ≥ 12 f on a variable font, plus the brand accent colour (one accent). Skew is a small eased lean, no bounce."
---

## METADATA
09_UI_Motion | After Effects (source) → raea per-word span | raea

## CREATIVE_INTENT
After the line lands, the word "simple" does "a secondary animation… it helps you to show this word more and put emphasis
on that specific word". The rig isolates the word by its **index** so the text can be edited later without re-keying:
the sentence copy hides that word; a duplicate shows only that word; the word number lives in one control. The word then
skews 0 → 20 over a few frames (eased, "start fast and end slow") and switches to a semibold face resized to ~93 to fit.

## STE_PROCEDURE
1. Choose the word by its index in the line (the stressed word in the voice).
2. Keep the index in one variable so editing the sentence never breaks the emphasis.
3. Wait until the whole line has landed before starting the emphasis.
4. Lean the word: skew 0° → ~20° over ~6–12 f, fast start, slow end (adapted: ≥ 12 f).
5. Raise its weight (e.g. 400 → 600) over the same ≥ 12 f; colour it the brand accent.
6. Keep the rest of the line still.

## AGENT_EXECUTION
raea: split the line into spans; `const EMPH = 2;` (index). For span `i === EMPH`, after `word("<the word>")` + line
duration, `animate={{ fontWeight: track({ 0: 400, 12: 600 }), color: track({ 0: "#fff", 12: ACCENT }) }}` (numeric style
and colour are keyable). Skew is not in the keyable list → `style={{ transform: \`skewX(${-interpolate(f, [a, a + 12],
[0, 20], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}deg)\` }}` with an out-curve. Use a variable font in
`media/fonts/` so weight interpolates (see `variable-font-weight-tracking-open--apple-style-3d-motion.md`).

### Worked example
Designed line in a phone-UI setup: "Harga asal tu tak pernah wujud."
- BEFORE: whole line accent-coloured and bold.
- AFTER: line lands white; 0.4 s later "wujud" leans ~20° and thickens to semibold in the accent while the voice
  stresses it.

### Check
- Is exactly one word emphasised, matched to the voice's stress?
- Does the emphasis start after the line has landed?
- Is the change ≥ 0.4 s and eased (no one-frame font swap)?
- Is the accent the only colour change?

## NOTES
- AE dropped: null + slider control, opacity "subtract" animators by index, pick-whip expressions (`value - 1`), source
  text linking between duplicates — all replaced by span index in code.
- STT fixes: "SKU" = skew; "Dr and drop" = drag and drop; "tole" = toggle.
- Visual gap: the semibold font's name is not spoken.
