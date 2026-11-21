---
title: Line icons with round caps, drawn on with trim; one master bracket drives all four; check mark on completion
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/Create Apple-Style UI Motion Graphics in After Effects + Free Project File.txt"
source_time: "09:44–13:41 (face icon, brackets), 17:59–18:46 (check mark)"
tool_target: raea
tier: full
use_when: "a 'step done' / 'scan' / 'verified' beat in a UI scene; drawing simple line icons in code"
style_fit: Fits for icons and UI marks (not people); ⚠ the face-scan corner bracket is a generic 'AI scan' cliché → use brackets only when the line is literally about scanning (QR, receipt); draw-on ≥ 0.4 s.
---

## METADATA
09_UI_Motion | After Effects (source) → raea inline SVG (strokeDasharray/offset) | raea

## CREATIVE_INTENT
Icons are pen-drawn strokes with **round cap and round join** "so the line ends and corners look smooth"; the mouth is an
ellipse stroke with trim paths hiding part of the circle. Corner brackets: one rectangle stroke with roundness, trimmed
with end + offset to a corner; three duplicates link size, roundness, stroke width and trim end to the first and differ
only in offset — so "the first bracket's controls … animate all the brackets at once". Brackets animate trim + roundness,
the face scales in and fades, then a green check mark draws on with trim paths "right when the circles finish rotating".

## STE_PROCEDURE
1. Draw icons as strokes; set round caps and round joins.
2. Make partial shapes by trimming a full stroke (e.g. a smile = part of a circle).
3. Build repeated marks from one master and give copies only a different offset.
4. Animate the master (trim + roundness); all copies follow.
5. Draw the check mark on (trim 0 → 100 %) exactly when the previous action finishes.
6. Ease every draw-on; fine-tune in the graph.

## AGENT_EXECUTION
raea inline SVG: `strokeLinecap="round" strokeLinejoin="round"`; draw-on `strokeDasharray={L} strokeDashoffset={L * (1 - t)}`
with `t = k(f, at, 14, out)`; four brackets = one `<path>` component mapped over four rotations (one prop set drives all).
Kit `icons.tsx` has a `check` path (`Icon name="check"`) — draw it on with the same dash trick.

### Worked example
Topic: scanning a receipt into an expense app (generic app).
- BEFORE: a static check icon pops in.
- AFTER: four round-capped brackets close in on the receipt on "scan", then a green check draws on in 0.5 s on "siap".

### Check
- Are caps/joins round on every stroke?
- Do repeated marks share one control (no hand-tuned copies)?
- Does the check draw on (not pop) and land on the completion word?

## NOTES
- Visual gaps: reference images and exact trim values are visual only.
