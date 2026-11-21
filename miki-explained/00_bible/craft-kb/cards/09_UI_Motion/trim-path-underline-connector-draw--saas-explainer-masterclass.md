---
title: Trim-path underline/connector draws on under a word, gradient stroke in Multiply blend
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt"
source_time: "34:42–35:55"
tool_target: raea
tier: principle
use_when: "emphasising a specific word/number with a drawn line instead of a colour change or box"
style_fit: Fits — a literal mark on the word that lands at the moment it's spoken, built from a stroke not a flash; keep single accent colour, drop the gradient-blend trick unless it reads clean at phone size.
---

## METADATA
09_UI_Motion | After Effects pen-tool stroke + gradient + Multiply blend + Trim Paths (source) → raea SVG path | raea

## CREATIVE_INTENT
A straight line is drawn under the emphasised phrase with the pen tool, given a linear-gradient stroke, then set to
Multiply blending so it reads as ink under the text rather than a flat bar. Trim Paths animates its `End` 0% → spoken
value on the word, keyed to land exactly as that word is read, then the parent null carries the whole line into the next
beat.

## STE_PROCEDURE
1. Draw a straight (or slightly curved) line under exactly the word/phrase to emphasise.
2. Give the stroke a gradient (not flat colour) so the ink has depth.
3. Set the stroke's blend mode to Multiply so it reads as ink, not a sticker.
4. Key Trim Paths `End` 0 → 100% across the word's spoken duration (`~`a few frames).
5. Parent the line to the same carrier as the text so they move/exit together.

## AGENT_EXECUTION
raea SVG: `<path d="M0,0 H{w}" stroke={gradId} strokeWidth={4} style={{ mixBlendMode: "multiply" }}
strokeDasharray={w} strokeDashoffset={w * (1 - t)} />`, `t = k(f, word("…"), 10, out)`, under the exact word's bounding
box. Shot row: `| 4 | "untung RM50" | phone receipt close | underline draws under "RM50" as the word lands | this card |`.

### Worked example
Topic: a nasi lemak stall's daily "untung RM50" (profit) line on a receipt UI (illustrative amount).
- BEFORE: "RM50" just changes colour when the VO says it.
- AFTER: as "RM50" is spoken, a gradient underline draws itself under the number left to right, in Multiply so it reads
  as ink on the receipt.

### Check
- Does the draw-on finish exactly when the word finishes?
- Is it under one word/phrase only, not a whole line?
- Is the stroke a single accent hue (gradient of one colour, not two different hues)?

## NOTES
- Visual gaps: exact stroke width and gradient stop positions are visual only.
- AE dropped: pen-tool hand-drawn path + Multiply blend mode; translated to an SVG path with `mix-blend-mode: multiply`.
