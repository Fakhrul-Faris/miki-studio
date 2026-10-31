# EX09 "The Other Line": what to generate

Four stills and the voice. The stills become a Blender paper supermarket (like EX05's barbershop set); everything else is
diagram animation. Generate at **9:16**, paste the **Negative** box, and save into `EX09_other-line/media/` with the exact
**Save as** name. Steps 2–3 attach `CO_checkout.png` as the style reference.

**Negative (all stills):**
```
text, letters, words, numbers, typography, logos, brand names, price labels, signage, watermark, 3D render, glossy, gradients, clipart, flat vector, cartoon faces, emoji, lens flare, color except ink black, paper and ochre
```

## 1. Cut-out: a supermarket checkout (do this first: the style reference)

**Save as:** `media/CO_checkout.png`
```
Editorial mixed-media collage in the style of Vox and Fern explainer films. Layered cut-paper construction with visible physical depth, torn paper edges, halftone-printed photo cutouts, risograph grain, slight ink misregistration. Warm off-white paper texture (#EFE8DC), ink black (#111111), single muted ochre accent (#C98A2B). Hard directional light, soft paper shadows. No text, no letters, no numbers. Vertical 9:16, ultra detailed. Cut-out on plain warm paper, centred, whole, no ground shadow: one supermarket checkout counter with a conveyor belt and a till, seen from the front at three-quarter angle, empty.
```

## 2–3. Cut-outs: two shoppers (attach CO_checkout.png as style reference; prompt = the line only)

| Step | Save as | Prompt |
|---|---|---|
| 2 | `media/CO_shopper1.png` | `Cut-out on plain paper: a halftone paper shopper standing in a queue, seen from behind, holding a shopping basket, full body.` |
| 3 | `media/CO_shopper2.png` | `Cut-out on plain paper: a different halftone paper shopper standing, seen from behind, pushing a small trolley, full body.` |

The two should look like different people (different build and clothes). I make the rest of the crowd by mirroring and recolouring.

## 4. Documentary photo: the snaking line

**Save as:** `media/M1.png` · No reference. Colour doesn't matter: I print it into ink and paper.
```
Documentary photo, candid, natural light, 35mm film grain, shallow depth of field, real people seen from behind, no identifiable faces, no logos, no readable text or signage. Vertical 9:16. An airport security checkpoint with one long snaking queue between rope barriers, travellers with bags, seen from behind and above.
```

## Then the voice

ElevenLabs, **Nathan** (`v4k7NzxipnuJNJtrKxob`). Seven files, text and direction in `episode.md` § Script and § Voice
direction. Save as `audio/L01.mp3` … `audio/L07.mp3`. L07 is just "Follow Meikigo for more." — friendly, not salesy.

## Check before you send them back
- No words, letters, numbers or logos anywhere (checkouts and tills tempt the tool to add price labels).
- Cut-outs whole (feet, trolley wheels, counter base), on plain paper.
