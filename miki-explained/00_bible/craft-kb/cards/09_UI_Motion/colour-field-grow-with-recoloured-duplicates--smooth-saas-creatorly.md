---
title: Background colour change by a growing colour field, with text/accents swapped to recoloured duplicates at the crossing
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How to do SMOOTH SAAS Animation Like Creatoroly | After Effects Tutorial.txt"
source_time: "03:00–05:08 (white→blue field + white text), 07:25–08:12 (stars split and recoloured)"
tool_target: raea
tier: principle
use_when: "a UI scene that must flip state (e.g. 'before' white → 'after' accent) without a cut"
style_fit: "⚠ conflict: a flat colour sweep is close to a generic wipe → adapted: the field must grow out of an element in the scene (a button, a bar, the tag edge) and carry meaning (state change); ≥ 0.6 s eased; the accent colour is the field only when the line is about it."
---

## METADATA
09_UI_Motion | After Effects (source) → raea 2D layers | raea

## CREATIVE_INTENT
A white→blue transition: duplicate the white background, recolour the copy blue, trim it to start ~16 frames in, move its
anchor to the left edge and key scale 0 → 100 over ~1 s with Quad Out (Simply Ease plugin), motion blur on. Where the blue
passes, the text is a duplicate recoloured white whose reveal (range selector offset) is timed to the moving edge; each
star decoration is split at the moment the blue starts and its top half recoloured white. Everything reads as one
object changing colour.

## STE_PROCEDURE
1. Duplicate the background; recolour the copy to the new state colour.
2. Anchor the copy at the edge it grows from; key its width 0 → 100 % over ~1 s, quad-out.
3. Duplicate the text in the contrasting colour; reveal it in step with the moving edge.
4. Split each small element at the frame the edge reaches it; recolour the later half.
5. Ease all keys; check no element shows the wrong colour against the new field.

## AGENT_EXECUTION
raea: field = `<div>` with `width` keyed (`track({ 0: 0, 30: 100 }, { unit: "%" })` + `curve "out-quad"`/`out-cubic`), anchored
to the growing edge; contrasting text = a copy clipped to the field's extent (`clipRight` keyed on the same curve), so the
colour change follows the edge exactly. Shot-list: `| 7 | "lepas tu, bayar" | QR card UI | pay button's colour floods the card L→R on "bayar"; text turns white under it | this card |`.

### Worked example
Topic: a gerai accepting DuitNow QR (illustrative amount).
- BEFORE: hard cut from a white "Scan" card to a green "Paid RM12.50" card.
- AFTER: on "bayar", the green of the pay button grows out across the card in 0.8 s; under its edge "Scan" becomes
  "Paid RM12.50" in white.

### Check
- Does the field grow out of a visible element, not from frame edge?
- Is the growth ≥ 0.6 s with an eased (quad/cubic-out) curve?
- Does every element on the crossing switch colour exactly at the edge?

## NOTES
- Visual gaps: exact frames of the text offset and star split points are visual only.
- AE/plugin dropped: Simply Ease (Quad Out), layer split (Cmd+Shift+D); translated to raea tracks + clip.
