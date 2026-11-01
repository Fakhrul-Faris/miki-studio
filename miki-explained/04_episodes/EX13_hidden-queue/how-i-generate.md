# EX13 "The Hidden Queue": what to generate

One environment plate, five cut-outs, two documentary photos and the voice. Most of the episode is drawn in code (the
split-flap board, the pencil chart, the quote card) or built in Blender (the printed 3D queue), so there's little to
generate. Generate at **9:16**, paste the **Negative** box, and save into `EX13_hidden-queue/media/` with the exact
**Save as** name. Steps 2–6 attach `ENV_counter.png` as style reference.

**Negative (all stills):**

```
text, letters, words, numbers, typography, logos, brand names, signage, menu text, prices, screen text, watermark, 3D render, glossy, gradients, clipart, flat vector, cartoon faces, emoji, lens flare, color except ink black, paper and ochre
```

## 1. Environment: the nasi kandar counter (do this first: the style reference)

**Save as:** `media/ENV_counter.png` · Shot 6A ("Now picture your nasi kandar counter…")

```
Editorial mixed-media collage in the style of Vox and Fern explainer films. Layered cut-paper construction with visible physical depth, torn paper edges, halftone-printed photo cutouts, risograph grain, slight ink misregistration. Warm off-white paper texture (#EFE8DC), ink black (#111111), single muted ochre accent (#C98A2B). Hard directional light, soft paper shadows. No text, no letters, no numbers. Vertical 9:16, ultra detailed. A Malaysian nasi kandar shop counter seen straight on at eye level: a glass display of steel trays of curries and fried chicken, a rice pot, a blank chalkboard menu on the wall above, an open corner of the shop on the left where a queue could bend round, no people.
```

Leave the chalkboard and the space in front of the counter empty: the "15 MIN" and the queue are added on top.

## 2–6. Cut-outs (each: one piece, centred, whole, full body, on plain warm paper, no ground shadow)

| Step | Save as | Prompt |
|---|---|---|
| 2 | `media/CO_queue1.png` | `Cut-out on plain paper: a Malaysian office worker in a batik shirt standing in a queue, seen from behind at three-quarter angle, hands in pockets, full body.` |
| 3 | `media/CO_queue2.png` | `Cut-out on plain paper: a Malaysian woman in baju kurung and tudung standing in a queue, seen from behind at three-quarter angle, holding a small purse, full body.` |
| 4 | `media/CO_queue3.png` | `Cut-out on plain paper: a young Malaysian man in a t-shirt and jeans standing in a queue, seen from behind, looking at his phone, full body.` |
| 5 | `media/CO_board.png` | `Cut-out on plain paper: a blank wooden A-frame chalkboard sign, front view, empty black board, no writing.` |
| 6 | `media/CO_plate.png` | `Cut-out on plain paper: a plate of nasi kandar, rice with mixed curries, fried chicken and a boiled egg, seen at a 45-degree angle.` |

## 7–8. Documentary photos (no style reference; colour doesn't matter, I print them into ink and paper)

**Documentary lock (paste first):**

```
Documentary photo, candid, natural available light, muted colours, 35mm film grain, shallow depth of field, real place, real people seen from behind or in profile, no identifiable faces, no logos, no readable text or signage, vertical 9:16.
```

| Step | Save as | Shot | Prompt (after the lock) |
|---|---|---|---|
| 7 | `media/M1.png` | 2A ("You're at Pirates…") | `A theme-park ride entrance on a hot summer day: guests queuing between rope stanchions under a themed archway, a tall wait-time sign board beside the entrance with its numbers blank, people seen from behind.` |
| 8 | `media/M2.png` | 6A (Bridge) | `A busy Malaysian nasi kandar restaurant at lunchtime: a queue of office workers at the counter, staff serving curries from steel trays, ceiling fans, people seen from behind or in profile.` |

M1 must not show a real Disney logo, character or readable sign: it stands for "a ride entrance", and the name comes from
the voice and the board.

## Then the voice

ElevenLabs, **Nathan** (`v4k7NzxipnuJNJtrKxob`). Eight files from `episode.md` § Script, saved as `audio/L01.mp3` …
`audio/L08.mp3`. Normal speed.

- **L01:** "Disney's sign says sixty minutes." plain; "You wait twenty-three." a beat slower; "That's not luck." dry, short.
- **L02:** easy, in the scene; a small sigh on "you groan".
- **L03:** matter-of-fact; clear on "fifty-five to seventy-one percent".
- **L04:** "Broken clocks?" a light question; "Machiavellian twist" said with relish; "won minutes back" warm.
- **L05:** lower, a touch conspiratorial; slow on "so you never walk away".
- **L06:** brighter, local: "nasi kandar" pronounced naturally; "Say fifteen minutes, serve in ten." two clean beats.
- **L07:** the landing, slow: "It makes it feel won."
- **L08:** "Follow Meikigo for more." friendly, short (or reuse EX11's L08).

## Check before you send them back

- No words, numbers or logos anywhere (the chalkboard and the wait sign stay blank).
- The three queuers are whole, full body, seen from behind or three-quarter back.
- The counter plate leaves the floor in front of the counter and the left corner empty for the queue.
