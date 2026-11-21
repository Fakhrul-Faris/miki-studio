---
title: Cut to the terse minimum — filler words, filler video, over-budget scripts
bucket: 07_Script_Story
type: master
members:
  - cards/07_Script_Story/filler-audio-filler-video-cut-to-terse--writing-for-motion-design.md
  - cards/07_Script_Story/word-budget-cut-content-not-read-speed--great-motion-design-script.md
sources: ["Writing for Motion Design.txt", "What Makes a Great Motion Design Script.md"]
use_when: "tightening script v1 to the 175–200 word / 55–90 s budget — any line hard to give a visual, or over budget, gets cut, not read faster"
style_fit: "⚠ conflict: source 2's rate (140–150 wpm) is slower than RECIPE-D's ~3.4 words/s (~204 wpm) → adapted: keep the rule 'over budget = cut', use our rate (ceiling = runtime × 3.4 words)."
---

## METADATA
07_Script_Story | Evan Abrams (script edit pass) / Dan Neale, Motion Story (blog, script length gate) | script v1 cut pass, before voice text

## CREATIVE_INTENT
Scripts carry corporate speak and warm-up phrases that don't translate to a concrete visual; the fix is deletion, not
a faster read.
- Writing for Motion Design names the test directly: "if the audio is filler, the video is filler — take out the
  filler." A line whose visual cell would be generic (talking point, logo, abstract graphic) is proof it's filler.
  "If you have 13 words but you can say it in 5, use fewer words," and "if you have a good two minutes, you probably
  have a great one minute."
- What Makes a Great Motion Design Script sets the arithmetic gate that makes "over budget" a fact rather than a
  feeling: a voiceover reads at ~140–150 wpm, so a 60 s video has room for ~140 words, "there is no space for
  filler," and if the script is over the ceiling the fix is cutting content — never asking for a faster read.

## STE_PROCEDURE
1. Before recording, mark each line whose visual cell would be generic (talking point, logo, abstract graphic).
2. Treat a generic visual cell as proof the line is filler; cut or rewrite the line.
3. Rewrite each kept line at the fewest words that keep its meaning (target ~40% fewer, e.g. 13 → 5); delete warm-up phrases ("jadi sebenarnya", "apa yang korang perlu tahu").
4. Fix the target runtime in seconds (55–90 s for us) and set the word ceiling: runtime × 3.4 words (our house rate; source 2's rate is runtime × 2.33).
5. Count spoken words only, on the voice-text version (numbers as words the voice will say, e.g. "RM2.60" = "dua ringgit enam puluh sen" = 5 words).
6. If the count is over the ceiling, cut whole lines or clauses until it fits — never fit the budget by asking for a faster read or extra time-stretch.
7. If the count is more than ~15% under, check the idea is complete before adding anything back.

## VALUES BY SOURCE
| parameter | Writing for Motion Design | What Makes a Great Motion Design Script | recommended for Style D (+ why) |
|---|---|---|---|
| Read rate | not stated numerically | 140–150 wpm | ~3.4 words/s (~204 wpm) per RECIPE-D §3 — faster, casual delivery |
| Ceiling at 60 s | not stated | ~140 words | ~204 words (our rate) |
| Fix for over-budget | cut filler lines, rewrite tersely | cut content, never speed up the read | both: cut whole lines/clauses, never request a faster read |
| What counts as filler | a line whose visual cell is generic | any word beyond what the runtime allows | a line that can't get a concrete object, UI screen or number is cut first |

## AGENT_EXECUTION
Run the filler test after the visual column is filled; count words per line and total. A line that can't get an
object, UI screen or number is cut first. Write the count and the ceiling under the script in `episode.md`
("Words: 192 / 204 ceiling at 60 s"). Count the voice-text version (numbers spelled as words), because that is what
gets recorded. The house ×1.25 in `voice_fix.py --plain` is fixed processing, not a budget lever.

### Worked example
Topic: fake "harga asal" on sale tags (illustrative), and "Kenapa kedai dobi layan diri buka 24 jam?" at target 60 s
(ceiling 204 words).
- BEFORE (16 words, filler visual): "Jadi sebenarnya apa yang korang perlu tahu adalah harga asal tu kadang-kadang
  tak betul pun." Visual cell: "text on screen" (filler). Second example: draft at 238 words; plan was "minta baca
  laju sikit."
- AFTER (6 words, concrete visual): "Harga asal tu kadang-kadang reka je." Visual: the RM199 tag flips over, the
  back is blank. Second example: cut L06 (history of the first dobi, 21 words) and the second example in L08 (17
  words) → 200 words; the read speed stays as recorded.

### Check
- Does every line's visual cell name a concrete object, screen or number (not a generic talking-point visual)?
- Did each kept line lose its warm-up words, rewritten at the fewest words that keep its meaning?
- Is the total at or under the ceiling (runtime × 3.4 words), counted on the voice-text version, with every line ≤ 15 words — and was the fix cutting, never a faster read?

## NOTES
- Deprecated: none.
- Source rates differ (140–150 wpm vs. our ~3.4 words/s / ~204 wpm) — both agree on the principle (over budget = cut); the Style D pick uses our own rate.
- Visual gaps: none.
