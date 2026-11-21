---
title: Detour morph — go through an associated in-between shape (square → pill → chain)
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/High End SaaS Video Transitions.txt"
source_time: "02:02–02:31"
tool_target: shot-list
tier: full
use_when: "A's and B's shapes don't match directly, but an in-between shape belongs to B's world"
style_fit: "Fits object morphs; keep the detour to one in-between shape so the join stays clean."
---

## METADATA
09_UI_Motion | general → raea / HyperFrames | shot-list join

## CREATIVE_INTENT
"Morphing doesn't always go shape to shape in a straight line. Sometimes it takes a creative detour." A series of
documents is essentially a square; the square morphs into a pill, and that pill is one link of a chain used in the
next scene. "It wasn't a direct morph, but still a morph."

## STE_PROCEDURE
1. Reduce A's end state to its basic shape (e.g., stacked documents = square).
2. Find B's repeated building block (e.g., one chain link = pill).
3. Morph A's shape into that block.
4. Multiply or connect the block into B's full form.

## AGENT_EXECUTION
Shot list: "join: morph-detour — receipts (square) → pill → chain". raea: two scale-swap stages, then instance the block
with a staggered `interpolate` per index (`f - i * 3`).

### Worked example
Topic: "Kenapa kena simpan resit bisnes" (generic record-keeping).
- BEFORE: stack of receipts → cut → a folder.
- AFTER: the receipt stack (square) compresses into a pill-shaped tag on "simpan"; the tag duplicates into five tags linked into a chain labelled Jan–Mei on "lima bulan rekod"; accent on the current month.

### Check
- Is the in-between shape a real building block of B?
- Is there only one detour shape?
- Does the block then build B?

## NOTES
- Source frames visual only.
