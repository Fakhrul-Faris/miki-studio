---
title: Motion direction matches the spoken verb ("perception down" → downward move)
bucket: 08_Edit_Pacing
source: "Motion Feel, Easing & Camera Choreography/Animation Technique Guide.txt"
source_time: "03:52–04:06"
tool_target: shot-list
tier: full
use_when: "any line with a directional verb or word (naik, turun, masuk, keluar, tambah, potong) at a join"
style_fit: "⚠ source uses a ~2-frame vertical wipe → generic wipes banned; adapted: the scene's own object or the camera moves in the verb's direction on that word."
---

## METADATA
08_Edit_Pacing | After Effects (wipe) → raea | shot-list events + raea

## CREATIVE_INTENT
Between two scenes the source puts "about a two-frame wipe… it functions essentially as a cut", going vertically
downward "so it matched the VO saying 'perception down'". The direction of the join repeats the direction in the
words.

## STE_PROCEDURE
1. Scan each line for a directional word.
2. On that word, move an object or the camera in that direction (up = naik, down = turun, in = masuk).
3. Keep the move eased and short (~0.4–0.6 s).
4. Never add a wipe; use the object or camera.

## AGENT_EXECUTION
Shot-list events cell: "on 'turun': price tag slides down 20 % frame height". raea: `interpolate` the object's y on
the word frame with `Easing.inOut`.

### Worked example
Topic: "Harga ayam naik, harga nasi ayam?" (illustrative).
- BEFORE: `| 2 | "Harga ayam naik, untung turun" | macro on a chicken price tag | — |`
- AFTER: `| 2 | "Harga ayam **naik**, untung **turun**" | macro on a chicken price tag beside a nasi ayam plate tag | on "naik" the chicken tag rises 15 % frame height in accent red; on "turun" the plate's "untung" tag slides down 15 %, eased 0.5 s each | motion-direction-matches-verb |`

### Check
- Does every directional word get a move in that direction?
- Is it done with an object/camera, not a wipe?
- Is each move eased ~0.4–0.6 s?

## NOTES
- The source's 2-frame wipe is dropped (house rule).
