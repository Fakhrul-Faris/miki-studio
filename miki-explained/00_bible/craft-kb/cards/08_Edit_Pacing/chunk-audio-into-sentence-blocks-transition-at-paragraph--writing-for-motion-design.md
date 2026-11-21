---
title: Chunk the audio into sentence blocks; give each paragraph break a transition
bucket: 08_Edit_Pacing
source: "Explainer Visual Metaphors & Art Direction Critiques/Writing for Motion Design.txt"
source_time: "10:54–12:29"
tool_target: shot-list
tier: full
use_when: "the voice is recorded/fixed (the user's take) and you turn it into shot-list rows from word timings"
style_fit: "Fits RECIPE-D §4 (setup ≤ ~4 s, events on named words); transitions are built from scene objects, never generic wipes."
---

## METADATA
08_Edit_Pacing | Evan Abrams (Google Docs table) | shot list from fixed audio

## CREATIVE_INTENT
When audio is handed to you and can't change, break it down into blocks: "chunk-a-fy" it into all its discrete
sentences; a very long sentence may need chunking further. "If there's a paragraph break you'd probably want to put a
transition in between it, as you're going from one idea to another" — give yourself space to transition visually.

## STE_PROCEDURE
1. Before planning setups, split the processed voice into sentences using the word timings.
2. Split any sentence over ~4 s into clauses at a natural pause.
3. Give each block one row and one setup.
4. Mark where the idea changes (beat boundary: Hook → Mechanism → Steps → Payoff → End).
5. At each marked boundary, plan an object-built transition (~0.4–0.8 s, ~) inside the outgoing block's last words.
6. Inside a beat, join blocks with a cut on the word or a short camera move.

## AGENT_EXECUTION
Use the voice word-timing JSON (from the voice step) to fill a "start–end s" column per row. Beat boundaries get a
"→ T:" note in State change ("→ T: receipt rolls up into the phone screen").

### Worked example
Voice (S16, illustrative): "Kalau korang nak tahu sale tu betul ke tak, ni caranya. Tiga step je. Step satu, screenshot
harga sebelum sale."
| 2 | "Kalau korang nak … ni caranya." 3.1 s | macro tag | on "caranya": tag tilts up to camera |
| 3 | "Tiga step je." 1.0 s | same tag, top-down | three numbered notches fade in on the tag edge; → T: tag slides
under a phone, screen fills frame |
| 4 | "Step satu, screenshot harga sebelum sale." 2.6 s | [UI] phone camera view | on "screenshot": shutter flash
inside the UI only, thumbnail slides to corner (0.4 s) |

### Check
- Is every block ≤ ~4 s?
- Does every beat boundary carry a planned object-built transition?
- Are inside-beat joins plain cuts or short moves, not extra transitions?

## NOTES
- Transition length values are ours (~); the source gives none.
