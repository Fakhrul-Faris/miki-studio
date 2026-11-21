---
title: Storyboard/kanban-style card wall assembled from repeated bar + avatar-badge + text pre-comps
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt"
source_time: "1:17:16–1:25:44, 1:37:16–1:38:32"
tool_target: raea
tier: full
use_when: "showing a planning/tracking board (tasks, orders, bookings) as a UI scene with several rows of similar cards"
style_fit: Fits — a reusable component pattern; stagger the rows on entrance per our no-pop rule instead of all at once.
---

## METADATA
09_UI_Motion | After Effects repeated shape/text pre-comps, staggered parent nulls (source) → raea list component | raea

## CREATIVE_INTENT
A storyboard "card" (rounded rect, drop shadow, hairline stroke) holds a topic line and a lighter "updated <date>" line.
Inside, each row repeats the same pattern: a coloured circle avatar-badge pair (assignee), a bar (task name, a secondary
"client notes" bar, a "final asset" bar), each row built once then duplicated and retexted. Rows are staggered a few
frames apart (task → client notes → final asset, top to bottom) so they appear to populate in sequence rather than all
at once, each with its own small bounce settle.

## STE_PROCEDURE
1. Build the outer card once: rounded rect + drop shadow + hairline stroke, with a title line and a lighter meta line.
2. Build one row (bar + label + optional avatar badges) as a single pre-comp.
3. Duplicate the row pre-comp for every item; only change its label/colour, never its structure.
4. Stagger each row's entrance a few frames after the previous one (top row first).
5. Give each row's settle a small bounce/overshoot, capped per house rule (≤ 3–5% over ≥ 0.4 s).

## AGENT_EXECUTION
raea: `rows.map((r, i) => <Row key={r.id} data={r} at={rowStart + i * 4} />)` where `Row` is one component reused per
item; stagger via `at`. Shot row: `| 6 | "3 tempahan minggu ni" | phone UI, booking board | three booking rows populate
top-down, 4 f apart, each settling with a small eased overshoot (≤ 3–5 %, ≥ 0.4 s) | this card |`.

### Worked example
Topic: a tuition centre's weekly booking board — 3 students booked this week (illustrative count).
- BEFORE: all three booking rows fade in at once inside a static card.
- AFTER: the card appears, then each student's row populates top-down 4 frames apart, each settling with a tiny bounce,
  reading as the board actively filling rather than a static screenshot.

### Check
- Is every row built from one reused component, not hand-duplicated shapes?
- Do rows enter staggered (not simultaneously)?
- Is bounce/overshoot within the house cap?

## NOTES
- Visual gaps: exact stagger frame counts beyond "a few frames" are visual only.
- AE dropped: manual pre-comp duplication per row and per-layer parenting; translated to a single reusable raea row
  component mapped over data.
