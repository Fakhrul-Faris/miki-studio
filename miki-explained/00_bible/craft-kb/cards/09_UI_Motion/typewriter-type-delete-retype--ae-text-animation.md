---
title: Typewriter in a UI field — eased typing, styled blinking cursor, delete back and retype
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/After Effects Text Animation Tutorial.txt"
source_time: "17:30–21:35"
tool_target: raea
tier: principle
use_when: "phone/app scenes where the line literally involves typing (a search bar, a chat reply, a price entered) — UI-heavy episodes"
style_fit: "⚠ letters appearing one by one are per-character pops → allowed only where the line shows real typing (visualise literally); never for titles or captions. Cursor blink is UI behaviour, not a flash."
---

## METADATA
09_UI_Motion | After Effects + Motion Bro (source) → raea / HyperFrames | raea

## CREATIVE_INTENT
A typewriter reveal with the text kept centred, an eased typing speed (Quart In + Quart Out: "start slow and end slowly"),
a cursor with blink speed ~25, reshaped to a wide flat bar (scale Y ~30 %, scale X up) and coloured yellow. Then the text
deletes back to the part you keep (17 characters in the demo), the source text is swapped on a keyframe, and the new
ending types in ("text animation that feels smooth").

## STE_PROCEDURE
1. Type the string with an eased count: slow start, faster middle, slow end (quart in-out).
2. Keep the visible text centred, or left-aligned in a real input field.
3. Show a cursor bar; blink it at a steady UI rate (~2 blinks/s `~`).
4. To revise, delete back to the shared prefix (e.g. 17 characters), hold 3–6 f `~`.
5. Type the new ending with the same easing.

## AGENT_EXECUTION
raea (frame-pure): `const t = clamp((f - a) / (b - a)); const e = t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
const n = Math.round(e * text.length); const shown = text.slice(0, n);` Delete: same with n going from `text.length` to
`prefixLen`. Cursor: `<span style={{ opacity: Math.floor(f / 8) % 2 ? 0 : 1 }}>` sized as the field's caret (a thin bar
for an input field, the source's wide bar for a terminal). Cue `a` at `word("…")`. In HyperFrames, same logic in the
timeline's frame callback.

### Worked example
Line: "Search je nama kedai tu, tambah 'scam'."
- BEFORE: the search bar shows "kedai abc scam" at once.
- AFTER: in the phone's search bar, "Kedai ABC" types in eased, then " scam" types on the word "scam"; caret blinks.

### Check
- Does the line literally involve typing?
- Is the typing speed eased, not linear?
- Does the cursor match the UI being shown?

## NOTES
- AE dropped: Motion Bro typewriter preset (keyframed character count, auto-centering, cursor controls) and Source Text
  keyframe swap.
- Blink value "25" is the preset's blink-speed field; its unit is not stated (visual only).
- Wiggly-text stop-motion (same section, 21:35–23:08, wiggle amount 6 → 20–30) not carded: jitter conflicts with fluid
  motion / no glitches.
