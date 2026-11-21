---
title: Keep the line centred while its words reveal (whole-line counter-slide)
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/After Effects Text Animation Tutorial.txt"
source_time: "04:55–06:25"
tool_target: raea
tier: principle
use_when: "a centred on-screen line (frame-0 text, step title, end question) revealed word by word — not the EX15 captions"
style_fit: "Fits: one eased slide of the whole line, slow landing, no bounce; exit mirrors it."
---

## METADATA
09_UI_Motion | After Effects (source) → raea `<Animate>` track on the line | raea

## CREATIVE_INTENT
A centred line revealed word by word grows from its left edge, so the reader's eye chases text off-centre. "Keep the text
as centred as possible… this will help the reader to actually read the text while it is being shown." A second animator
based on **line** moves the whole line's position from the screen edge to its resting place over the reveal, ending
slow; the exit animates in the opposite direction, starting slow and ending fast.

## STE_PROCEDURE
1. Reveal the words with the house word-by-word move (~1 s for the line).
2. Slide the whole line from ~half its width right of centre to centre over the same duration (+ a few frames).
3. Ease the slide with a slow landing (out-cubic / out-quint).
4. Exit by sliding the line the opposite way, ease-in (slow start, fast end), while it fades.

## AGENT_EXECUTION
raea: wrap the word `<Stagger each={3} enter={rise({ frames: 12 })}>` in an outer `<Animate animate={{ x: LINE_X }}>`
with `const LINE_X = track({ 0: lineWidth / 2, [revealFrames + 4]: 0 }, { curve: "out-cubic" })` hoisted to module level
(width measured once from the layout or estimated from character count). Exit: second track 0 → −lineWidth/2, in-cubic,
with `exit="fade"`. Cue the start at `word("…")`. Note `<Animate>` keeps hidden words in the layout, so without the
counter-slide the visible text sits left of centre during the reveal.

### Worked example
End text (≤ 7 words): "50%… dari harga apa?"
- BEFORE: words appear in place; "50%…" sits far left, the eye jumps right as "apa?" lands.
- AFTER: the line drifts from right to centre as each word rises; when "apa?" lands the line is centred and still.

### Check
- Does the visible part of the line stay near the frame centre throughout the reveal?
- Does the slide land slowly, with no overshoot?
- Is this designed text, not a restyled caption?

## NOTES
- AE dropped: line-based text animator with position keys, F9 + graph handle pull; translated to an x track.
- Visual gaps: exact pixel distance not spoken ("start it from the edge of the screen") → `~` half line width.
