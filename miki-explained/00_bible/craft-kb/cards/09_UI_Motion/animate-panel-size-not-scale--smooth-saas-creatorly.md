---
title: Resize a rounded panel by its size property, not scale, and move it to centre as it closes
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How to do SMOOTH SAAS Animation Like Creatoroly | After Effects Tutorial.txt"
source_time: "20:40–21:53"
tool_target: raea
tier: principle
use_when: "a UI card/dropdown that opens or closes on the word (results panel, receipt card, bill summary)"
style_fit: Fits — corner radius and stroke stay true while the panel changes; eased ≥ 0.4 s.
---

## METADATA
09_UI_Motion | After Effects (source) → raea width/height tracks | raea

## CREATIVE_INTENT
First pass scaled the results box down, which the author removed ("let's make it just zero"): instead the rectangle's
**Size** is keyed and decreased, anchor at centre, keys eased (one at 20 frames), so the panel closes to the middle of the
composition with clean corners, while its matted contents vanish with it.

## STE_PROCEDURE
1. Put the panel's anchor at the point it should close to (centre).
2. Key its width/height (not scale) from open to small.
3. Keep corner radius and border width constant.
4. Ease the keys (~20 f span); adjust timing so it starts as the contents leave.
5. Keep contents clipped by the panel (see container matte card).

## AGENT_EXECUTION
raea: `track` on `width`/`height` (keyable per raea guide animating) with `in-out-cubic`; `borderRadius` fixed; parent
`display:flex; alignItems/justifyContent: center` so it shrinks to centre.

### Worked example
Topic: a monthly bill card (RM45 + RM30 + RM25 = RM100, illustrative).
- BEFORE: the bill card scales to 0 — corners and text squash.
- AFTER: on "jumlah", the three rows slide out and the card's height closes to a slim pill reading "RM100", corners
  unchanged.

### Check
- Are corners and borders unchanged during the resize?
- Does it close toward a meaningful point (centre or the next element)?
- Is the resize ≥ 0.4 s and eased?

## NOTES
- Visual gaps: start/end sizes are visual only.
