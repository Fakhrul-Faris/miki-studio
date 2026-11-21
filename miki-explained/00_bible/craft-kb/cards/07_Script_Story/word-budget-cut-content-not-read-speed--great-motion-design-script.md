---
title: Word budget from runtime — over budget means cut content, not read faster
bucket: 07_Script_Story
source: "Explainer Visual Metaphors & Art Direction Critiques/What Makes a Great Motion Design Script.md"
source_time: "none (blog article, 'Every Word Earns Its Place' + FAQ 'How long should a motion design script be?')"
tool_target: script
tier: full
use_when: "after the cut pass on script v1, before writing the ElevenLabs voice text"
style_fit: "⚠ conflict: source rate 140–150 wpm is slower than RECIPE-D's ~3.4 words/s (~204 wpm, 175–200 words) → adapted: keep the rule 'over budget = cut', use our rate."
---

## METADATA
07_Script_Story | Dan Neale, Motion Story (blog) | script length gate

## CREATIVE_INTENT
"A voiceover reads at roughly 140 to 150 words per minute. So a 60-second video needs about 140 words, a 90-second video
about 210, and a two-minute video about 280. If your script is over these numbers, it's too long, and the solution is
cutting content, not speeding up the read." A 60-second video "has room for about 140 words… There is no space for filler."

## STE_PROCEDURE
1. Before counting, fix the target runtime in seconds (55–90 s for us).
2. Set the ceiling: runtime × 3.4 words (our house rate); source rate is runtime × 2.33.
3. Count spoken words only; numbers count as the words the voice will say ("RM2.60" = "dua ringgit enam puluh sen" = 5).
4. If the count is over the ceiling, cut whole lines or clauses until it fits.
5. Never fit the budget by asking for a faster read or extra time-stretch.
6. If the count is more than ~15 % under, check the idea is complete before adding anything.

## AGENT_EXECUTION
Write the count and the ceiling under the script in `episode.md` ("Words: 192 / 204 ceiling at 60 s"). Count the voice
text version (numbers spelled as words), because that is what gets recorded. The house ×1.25 in `voice_fix.py --plain`
is fixed processing, not a budget lever.
### Worked example
Topic: "Kenapa kedai dobi layan diri buka 24 jam?" target 60 s → ceiling 204 words.
BEFORE: draft at 238 words; plan was "minta baca laju sikit".
AFTER: cut L06 (history of the first dobi, 21 words) and the second example in L08 (17 words) → 200 words; the read
speed stays as recorded.
### Check
- Is the ceiling written next to the count?
- Was the count taken on the voice text (numbers as words)?
- Is the script at or under the ceiling without any speed request?

## NOTES
- Source rates: 140–150 wpm; 60 s ≈ 140 words, 90 s ≈ 210, 120 s ≈ 280. Ours (RECIPE-D §3): ~3.4 words/s,
  175–200 words for ~55–60 s. Both agree on the principle.
- Visual gaps: none.
