---
title: Empty vs filled twin framing — repeat the same framing, once full and once empty, to show loss or loneliness
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/What is Juxtaposition in Film — How to Take Visual Storytelling to the Next Level.txt"
source_time: "07:22–07:51"
tool_target: shot-list
tier: full
use_when: "before/after lines (busy vs quiet, stocked vs sold out, customers then vs now)"
style_fit: "Fits; ⚠ 'no two stills from the same angle' board rule → the twin frames share composition but differ in state, and must be at least one setup apart or joined by a flight; note the exception on the board."
---

## METADATA
06_Art_Direction | general (film) | shot-list (paired rows) + board check

## CREATIVE_INTENT
"Placing a character next to negative space can indicate loneliness, especially when it's directly compared to a similar
framing where the space is filled." The comparison, not the empty frame alone, carries the meaning.

## STE_PROCEDURE
1. Before the "after" line, plan the "before" setup with the same framing and lens.
2. In the before setup, fill the space around the hero (stock, cups, orders).
3. In the after setup, remove everything except the hero; keep camera and light identical.
4. Put the hero in the same screen position in both.
5. Separate the two by at least one setup, or reach the second by a flight back to the same pose.

## AGENT_EXECUTION
Shot-list: tag both rows `twin A` / `twin B` with the shared camera pose. raea: reuse the exact `Camera3d` transform;
remove the fillers by fading them out (opacity/scale over ≥ 0.4 s) if the change happens on screen.

### Worked example
Topic: "Kenapa kedai kek tutup selepas 2 tahun" (illustrative).
- BEFORE: `| 9 | "Sekarang order tinggal 5 sehari" | macro of one cake box |`
- AFTER: `| 3 | "Tahun pertama, 60 order sehari" | top-down counter packed with cake boxes, one box centred in accent | counter 60 | twin A |`
  `| 9 | "Sekarang tinggal 5 sehari" | same top-down pose: only the centred box and 4 others, wide empty counter | counter rolls 60 → 5 | twin B |`

### Check
- Do the twins share framing, lens and light?
- Is the hero in the same screen position?
- Is the difference only the filled vs empty space?
- Are they not adjacent cuts (or joined by a flight)?

## NOTES
- Visual gaps: film examples not named; frames visual only.
