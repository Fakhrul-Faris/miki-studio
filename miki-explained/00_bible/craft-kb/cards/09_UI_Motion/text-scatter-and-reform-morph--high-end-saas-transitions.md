---
title: Text scatter-and-reform morph — break one sentence apart and rebuild it as the key word
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/High End SaaS Video Transitions.txt"
source_time: "02:31–02:46"
tool_target: HyperFrames
tier: full
use_when: "a line where many things combine into one word (all costs → 'untung', many steps → 'siap')"
style_fit: "⚠ captions keep the house style and are never restyled → this applies to on-screen display text/labels only, not captions; letters move eased, no pop."
---

## METADATA
09_UI_Motion | general → HyperFrames / raea 2D text | shot-list events

## CREATIVE_INTENT
Google Gemini Canvas video: to communicate collaboration, "they scatter an entire sentence across the screen, morph
it into a completely different sentence, and then bring everything back together to form the word collaboration" — a
morph without shapes.

## STE_PROCEDURE
1. Set sentence A as display text (not the caption).
2. Split it into words or letters.
3. Scatter the pieces outward, eased, ~0.4–0.6 s.
4. Re-gather them into sentence B, then into the single key word.
5. Put the key word in the accent colour on its spoken word.

## AGENT_EXECUTION
HyperFrames: one `<span>` per letter, translate/opacity via JS timeline. raea: per-letter text nodes with staggered
clamped `interpolate`. Captions run separately in the house capBlock.

### Worked example
Topic: "Jual kuih RM1 seketul — mana untung?" (plain arithmetic, illustrative: 50 sen cost).
- BEFORE: label "Harga RM1, kos 50 sen" then a cut to "Untung 50 sen".
- AFTER: "Tepung · gula · minyak · bungkus" scatter across the tray, regroup into "kos 50 sen", then collapse into "untung 50 sen" on "untung", accent green.

### Check
- Is it display text, not the caption?
- Does the end word appear on its spoken word in the accent?
- Is every letter move eased (no pop)?

## NOTES
- Gemini frames visual only.
