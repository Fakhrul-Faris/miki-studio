# Transcript QA — second pass (2026-07-18)

## Method
1. Duration vs last speech timestamp
2. Internal silence gaps (>8s)
3. Hallucination flags
4. Spot-check frames for on-screen hooks / visual punchlines

## Fixed this pass (`qa=human_reviewed`)
| Clip | Issue | Fix |
|------|--------|-----|
| vid_045 | Looked "cut in half" — long silent gaps | Annotated visual beats + hook; speech was mostly OK |
| vid_017 | Hallucinated "NOT JUST PENALOGY" | Rebuilt from frames (CircleToons "I CAST" / "I feel fine") |
| vid_018 | Mid gap | Documented fill-every-bubble visual |
| vid_019 | "logger" mishear; end gap | Corrected to locker; documented pocket-suspect button |
| vid_023 | Missing hook; end gap; bad early language detect | Added introvert hook + visual outro |
| vid_032 | "hitting" vs "editing"; merged riddles | Corrected from on-screen text |

## Still speech-ASR only (not frame-reviewed)
Most of the other 49. Many will be fine for dialogue-heavy clips. Highest risk of the same `vid_045` problem:
- Caption-first / visual-first shorts
- Long holds with little talking
- Heavy SFX / music beds

## How to report more
Send `vid_NNN` (or a short note like "missing punchline"). We'll frame-check and rewrite that transcript with visual beats — same format as the reviewed files.
