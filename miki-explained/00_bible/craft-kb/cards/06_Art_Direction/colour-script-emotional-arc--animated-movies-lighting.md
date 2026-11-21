---
title: Colour script — paint the emotional arc as a strip of frames before building
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Why Lighting Animated Movies Is So Complicated | Movies Insider | Insider.txt"
source_time: "00:47–01:32"
tool_target: shot-list
tier: full
use_when: "after the shot list, before any frame brief or build: deciding each setup's brightness and colour from the story's arc"
style_fit: "Fits Style D if the arc is carried by brightness/temperature of the neutral world; the brand accent stays the one saturated colour throughout."
---

## METADATA
06_Art_Direction | general (Sony Imageworks / Pixar pipeline) | shot-list column + board

## CREATIVE_INTENT
Lighting comes last, but its decisions are planned first in "color scripts": hand-painted pictures that break the film
down scene by scene. Laid side by side, the director and production designer read the emotional arc: "Which is the
lowest point, the saddest moment? Which is more action? More funny? The most extravagant?" (Céline Desrumaux,
production designer, *Over the Moon*).

## STE_PROCEDURE
1. Before you brief frames, list every setup in order with its line.
2. Tag each setup's emotion: low point, tension, relief, payoff, wonder.
3. Mark the single lowest point and the single high point of the episode.
4. Give each tag a light state: brightness (dark/mid/bright) and temperature (cool/neutral/warm).
5. Make the low point the darkest/coolest setup and the payoff the brightest/warmest.
6. Lay the strip side by side (thumbnails) and check the arc reads without words.
7. Keep the brand accent constant across the strip; only the neutral world changes.

## AGENT_EXECUTION
Add a column `colour` to the shot list (`dark-cool`, `mid-neutral`, `bright-warm`). Build the strip as the board:
grey-box stills with only light changed, placed in one row. raea: per-setup key `color` and `intensity`, and
`AmbientLight` brightness; keep `<Grade>` constant (the first frame's grade holds for the whole piece, so the arc must
live in the lights, not the grade).

### Worked example
Topic: "Kenapa gerai burger tutup lepas 6 bulan" (illustrative numbers; profit = sales − costs).
- BEFORE: all 11 setups lit the same warm top key; the loss beat feels like the open.
- AFTER colour column: L01 hook `mid-neutral` · L03 "Jual 80 biji sehari" `bright-warm` · L06 "Sewa RM1,500, minyak naik" `mid-cool` · L08 "Untung sebenar: RM3 sehari" (low point) `dark-cool` · L10 the fix `bright-warm` · L11 question `mid-neutral` (loops to L01). Accent (brand colour) on the RM numbers in every setup.

### Check
- Does the strip have one clearly darkest and one clearly brightest setup?
- Do they sit on the low point and the payoff lines?
- Is the brand accent the same in every setup?
- Does the arc read from thumbnails alone?

## NOTES
- Visual gaps: the actual *Over the Moon* colour-script paintings are not described in detail.
- A painted colour script is replaced by grey-box stills with light only (generated images are references only).
