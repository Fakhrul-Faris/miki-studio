---
title: Envision — draw the idea as a staged model, one plain example per stage
bucket: 06_Art_Direction
source: "Analogies & Turning Invisible Concepts Into 3D Objects/How to Explain Anything To Anyone (Even If It's Complex!).txt"
source_time: "07:22–10:40"
tool_target: shot-list
tier: full
use_when: "a line lists stages, parts or a sequence (steps, cost split, levels) that would be a spoken list"
style_fit: "Fits Style D 'objects become a chart' and the 80/20 UI rule; stages reveal one per line on the word, ~0.4 s fades, no pops."
---

## METADATA
06_Art_Direction | Vinh Giang | shot-list rows + raea/HyperFrames diagram

## CREATIVE_INTENT
Some ideas are too hard to describe in words; draw them. The four stages of competence spoken as a list (unconscious
incompetence → conscious incompetence → conscious competence → unconscious competence) make "the listener's brain work
harder to understand and remember". Envisioned as a drawn contextual model and abstracted into plain words, each stage
gets a plain meaning ("you don't know what you don't know"; "now you know what you don't know"; "you're doing it but
still have to think"; "it's automatic") and one running example (replacing "um" with a pause), and the model is built
up stage by stage while he talks.

## STE_PROCEDURE
1. Spot any line with ≥ 3 stages or parts.
2. Pick one simple shape that holds them (steps, stacked bands, a ladder, a ring).
3. Give each stage a plain 2–5-word name.
4. Choose one running example and show it at every stage.
5. Reveal one stage per line, on the word that names it.
6. Keep earlier stages visible but dimmer; the current stage carries the accent.
7. On the last stage, show the whole model once before moving on.

## AGENT_EXECUTION
Shot list: one row per stage, same framing slightly re-angled (new setup per row) or the hero's states. raea: each stage is
a part inside `<Sequence from={wordFrame} durationInFrames={...} layout="none" name="stage-n">`; opacity/scale from
`interpolate(f, [0, 12], [0, 1], {extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic)})` (0.4 s at 30 fps);
past stages drop to ~40 % opacity (~); no `spring` overshoot beyond 3–5 %. Flat diagrams can be HyperFrames SVG.

### Worked example
Topic: where RM10 of a nasi lemak sale goes (illustrative split).
BEFORE: L05 "Bahan RM4, sewa dan gas RM2, gaji RM2, untung RM2." — one spoken list over one static shot.
AFTER: the RM10 note on the banana leaf becomes a 4-band stack, one band per line:
| 5 | "Empat ringgit, bahan." | macro top-down on the note | on "empat": a band slides out, rice + sambal icon on it |
| 6 | "Dua ringgit, sewa dan gas." | 30° lower angle | 2nd band in, first dims |
| 7 | "Dua ringgit, gaji helper." | side angle | 3rd band in |
| 8 | "Tinggal dua ringgit je untuk dia." | top-down, whole stack | last band in accent colour; full stack holds 1 s |

### Check
- Does every ≥ 3-part list become a drawn model?
- Does each stage have a plain name and the same running example?
- Does each stage appear on its word, faded in over ~0.4 s?
- Does only the current stage carry the accent?

## NOTES
- Visual gap: the source's on-screen drawing (layout, colours) is not described; the stage-by-stage build is inferred
  from his narration ("you start here… you move to the second phase").
