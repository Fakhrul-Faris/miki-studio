# EX11 "The Price of a No-Show": what to generate

Two top-down environment plates, five cut-outs, one documentary photo and the voice. Everything is seen **from directly
above** (the camera looks straight down the whole episode). Generate at **9:16**, paste the **Negative** box, and save into
`EX11_no-show/media/` with the exact **Save as** name. Steps 2–7 attach `ENV_waiting.png` as style reference.

**Negative (all stills):**
```
text, letters, words, numbers, typography, logos, brand names, signage, screen text, clock numbers, watermark, perspective view, side view, horizon, 3D render, glossy, gradients, clipart, flat vector, cartoon faces, emoji, color except ink black, paper and ochre
```

## 1. Environment: the waiting room from above (do this first: the style reference)

**Save as:** `media/ENV_waiting.png`
```
Editorial mixed-media collage in the style of Vox and Fern explainer films. Layered cut-paper construction with visible physical depth, torn paper edges, halftone-printed photo cutouts, risograph grain, slight ink misregistration. Warm off-white paper texture (#EFE8DC), ink black (#111111), single muted ochre accent (#C98A2B). Hard directional light, soft paper shadows. No text, no letters, no numbers. Vertical 9:16, ultra detailed. A clinic waiting room seen from directly above, flat overhead view: five neat rows of empty chairs filling the frame, tiled floor, a potted plant in one corner, a small side table, no people.
```

## 2. Environment: the reception desk from above

**Save as:** `media/ENV_desk.png`
```
The same cut-paper collage style, seen from directly above. A clinic reception desk top filling the frame: an open blank appointment book, a pen, a rubber stamp and ink pad, a desk lamp in one corner, a clipboard, empty space in the middle.
```

## 3–7. Cut-outs (each: one piece, centred, whole, on plain warm paper, no ground shadow, seen from directly above)

| Step | Save as | Prompt |
|---|---|---|
| 3 | `media/CO_patient1.png` | `Cut-out on plain paper, seen from directly above: a halftone paper person sitting on a chair, top of head and shoulders, knees forward.` |
| 4 | `media/CO_patient2.png` | `Cut-out on plain paper, seen from directly above: a halftone paper person sitting on a chair with a bag on their lap, top of head and shoulders.` |
| 5 | `media/CO_hand.png` | `Cut-out on plain paper, seen from directly above: a flat open paper hand with forearm, palm down, fingers together.` |
| 6 | `media/CO_hand_pen.png` | `Cut-out on plain paper, seen from directly above: a paper hand with forearm holding a pen, writing pose.` |
| 7 | `media/CO_phone.png` | `Cut-out on plain paper, seen from directly above: a smartphone lying flat, plain blank screen.` |

## 8. Documentary photo: a real waiting area

**Save as:** `media/M1.png` · No reference. Colour doesn't matter: I print it into ink and paper.
```
Documentary photo, candid, natural indoor light, 35mm film grain, high angle looking down, real people seen from behind or above, no identifiable faces, no logos, no readable text or signs. Vertical 9:16. A hospital outpatient waiting area: rows of seats, patients waiting, a few seats empty.
```

## Then the voice

ElevenLabs, **Nathan** (`v4k7NzxipnuJNJtrKxob`). Six files from `episode.md` § Script, saved as `audio/L01.mp3` … `audio/L06.mp3`.
Normal speed: I speed it up 10 % in the edit.
- **L01:** "A reminder text stops no-shows?" light, half-asking; then "Barely." flat and short.
- **L02:** matter-of-fact; "one in nine never came" landed.
- **L03:** "Then they added one line:" a small pause, then the quoted line read like a text message, clear on "a hundred and sixty pounds".
- **L04:** "fell by a quarter" clear; "Same hospital. One extra line." dry, two beats.
- **L05:** the callback, slow on "The price did."
- **L06:** "Follow Meikigo for more." friendly, short.

Music for the beat cuts: I pick it from the library, nothing to generate.

## Check before you send them back
- Everything truly top-down (no chair backs seen from the side, no horizon).
- No words, numbers or logos anywhere (the appointment book and phone screen stay blank).
- Plates fill the frame edge to edge; cut-outs whole on plain paper.
