# EX37 Hari 1/30 — art direction, Style A (proposal, waiting for "yes")

User, 2026-11-11: "i believe this better done with style A". Script (Option A) and Nathan's lines stay as they are; the
Style B build (`art-direction.md`, `build/world.src.html`, `out/preview.mp4`) is kept as the comparison.
Style A locked traits (WORKING-RULES §1): high three-quarter over a street block · **dark model world** (charcoal clay,
cool moonlight) · one real subject in full colour as the warm light · dense detail with real surface texture · a token
carries every handover · figures hold poses · **raea**, starting from the EX29 baseline, none of its nine failures repeated.
North stars **opened** for this brief: A-core-129, A-cam-010, A-light-052.

## Three lines (WORKING-RULES §0.2)

- **Camera:** high three-quarter over one kampung-town street block before dawn (A-cam-010), coming close for the reads.
- **World (stays as it is):** charcoal clay shophouses, a mamak, a market lorry, scooters, stools, aircon units, wires,
  cool moonlight, a few amber windows; the EX29 street's density.
- **What changes:** the **nasi lemak stall is the only thing in real colour and the warm light** (A-core-129). The token is the
  **bungkus with its price sticker**: it peels and relands, rides a see-saw, opens on the plate, follows the santan to the
  market, and ends back on the stall's counter.

## Beats

| Line | What we see (numbers on objects) | Motion (objects move, camera stays near) | Ref |
|---|---|---|---|
| L01 | Frame 0: the block from high three-quarter, all charcoal; one warm stall at the corner, its menu board "NASI LEMAK RM2.03 · 2011"; a "HARI 1/30" chalk sign on the five-foot way | the board's price flips to RM3.68 · 2024; the camera comes down to the counter where the bungkus sits under the lamp | A-cam-010, A-core-129 |
| L02 | "Inflation 29%": every shop's sign on the block rises a little on its pole (a level, cool-white "+29%" line laid along the rooftops) | the signs rise together to the line | data on the world |
| L03 | "Nasi lemak rose 81%": the stall's board rises far past the line to "+81%"; "Roti canai, 71%": the mamak next door warms up, its board to "+71%" | the two warm boards stand above the cool line | C1, one real subject (+ the mamak for one beat) |
| L04 | Inside exactly one thing (C3): the stall's back wall slides away; the santan bucket on the stove, its label RM7.39/kg → RM11.54/kg | the cutaway opens; the label flips | A-core-001 cutaway |
| L05 | Across the street a market lorry's crate of coconuts in the moonlight; on "half" the top layers go; a chalk sign "LATE 2024" | the crate empties | everyday proof |
| L06 | Pull up high over the whole town (A-light-052): dozens of stalls and shops under one cool level plane at the average; **your stall alone sharp and warm, above it**; the rest fading in haze | the camera rises, holds 1 s on "yours" | A-light-052 |
| L07 | Back at the counter: the bungkus, RM3.68, first light on the street | still | bookend |
| L08 | Meikigo end card, silent | — | — |

## Readability (the user's note on EX37 B: "hard to read what's on the table")
Even, readable key light on every read (no light stripes over the subject, no spotlight), haze and the light cone dimmed when
the camera is close (EX29 failure 6), every number ≥ 80 px on screen and clear of the caption band, key props ≥ 4 % of frame on
their word (the readability check), payoff object readable at phone size (EX29 failure 5).

## Build plan
1. Grey box in raea from the EX29/EX35 street (`_tests/style-test-mrdiy/A2/`, `EX35_zus-so-cheap/build/ex35.tsx`), library
   models for the stall (cart, wok, stools, crates), lorry, mamak; Nathan's timeline as is.
2. Stills of L01 frame 0, L03 (+81 / +71 above the line) and L06 → metrics (Style A baseline: edge ≥ 0.20, entropy ≥ 4.3),
   greyscale, thumbnails.
3. 60 fps preview with sound → your notes → final.
Length stays ~37 s unless Nathan re-records the money shorter.
