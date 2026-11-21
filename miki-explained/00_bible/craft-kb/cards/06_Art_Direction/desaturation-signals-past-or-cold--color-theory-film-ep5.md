---
title: Drain saturation to signal the past, coldness or grit
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Color Theory in Film — Color Psychology for Directors Ep5.txt"
source_time: "01:10–01:47"
tool_target: frame-brief
tier: full
use_when: "a flashback/history line ('dulu', 'tahun 1998'), a cold/harsh reality beat, or the 'before' state of a before/after"
style_fit: "Fits: Style D is already low-saturation except the accent; going further on support colours marks 'then' vs 'now'. ⚠ per-shot: do it on materials/lights, since <Grade> holds its first frame for the whole film."
---

## METADATA
06_Art_Direction | film colour (bleach bypass) | frame brief + raea materials/light colour

## CREATIVE_INTENT
A film used the post process **bleach bypass**, which deeply desaturates: colour is drained, giving a cold, gritty
look, and the images become reminiscent of faded photographs and black-and-white newsreels of the period — "it takes us
back in time".

## STE_PROCEDURE
1. Before briefing, mark lines set in the past or meant to feel cold/harsh.
2. For those setups, drop support-colour saturation toward grey (~S ≤ 10 % ~).
3. Raise contrast slightly for grit.
4. Keep or remove the accent deliberately: keep it only if the line's subject is still the point.
5. Return to normal saturation with an eased change when the script returns to the present.

## AGENT_EXECUTION
Frame brief **Feeling**: "past — desaturated". raea: use desaturated `base_color` hexes and a neutral-white key light
for those setups; `<Grade>` can't switch per shot (post.md: the first frame's grade holds). If the whole episode is
historical, `<Grade saturation={...} />` once (check the exact prop form in post.md).
### Worked example
Topic: Everyday Owners — a stall that started in 1990 (generic hawker; illustrative numbers).
- BEFORE: the 1990 line and the present line look identical; only the caption says "1990".
- AFTER: `| 2 | "Tahun 1990, sebungkus RM 1." | macro on an old enamel plate, faded paper wrapper | wrapper and table near-grey, contrast up; RM 1 in dim accent | desaturate-past |` → `| 3 | "Hari ni, RM 6." | same plate, camera rises; colour eases back over 0.6 s | RM 6 full accent on "RM 6" | desaturate-past |`
### Check
- Do past/cold lines differ from present lines in saturation?
- Is the change per shot done in materials/lights, not Grade?
- Is the return to colour eased, not a cut flash?

## NOTES
- The film is not named in the transcript (STT gap; visuals only) — unknown.
- Bleach bypass is a lab/post process; translated to desaturated materials in raea.
