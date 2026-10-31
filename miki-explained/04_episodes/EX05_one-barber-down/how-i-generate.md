# EX05 "One Barber Down": what to generate

The shop is now a 3D paper set built in Blender (test: `build/blender_test/test_preview.mp4`). You make the paper pieces; I
cut them out, stand them in the set, light it and animate it. Everything else (meters, curve, numbers, all words) I build.

Go down the list in order. Generate at **9:16**, paste the **Negative** box into the negative-prompt field, attach
`wall.png` as the style reference from step 2 on, and save into `EX05_one-barber-down/media/` with the exact **Save as** name.

**Negative (same for every step):**
```
text, letters, words, numbers, typography, logos, signage, watermark, 3D render, glossy, gradients, clipart, flat vector, cartoon faces, emoji, lens flare, color except ink black, paper and ochre
```

## 1. The back wall (do this first: it's the style reference for the rest)

**Save as:** `media/wall.png`

```
Editorial mixed-media collage in the style of Vox and Fern explainer films. Layered cut-paper construction with visible physical depth, torn paper edges, halftone-printed photo cutouts, risograph grain, slight ink misregistration. Warm off-white paper texture (#EFE8DC), ink black (#111111), single muted ochre accent (#C98A2B). Hard directional light, soft paper shadows. No text, no letters, no numbers. Vertical 9:16, ultra detailed. The empty back wall of a small cut-paper barbershop, seen straight on and flat: three tall dark mirrors in a row at head height, an ochre paper wainscot along the bottom, plain warm paper wall above. No furniture, no people.
```

## 2–8. Cut-outs (each: one piece, centred, full, on plain warm paper, no floor shadow)

Attach `wall.png` as style reference. Prompt = the line below, nothing else.

| Step | Save as | Prompt |
|---|---|---|
| 2 | `media/CO_chair.png` | `Cut-out on plain paper: an empty vintage barber chair, front three-quarter view.` |
| 3 | `media/CO_barber.png` | `Cut-out on plain paper: a halftone paper barber in an apron, standing, front view, scissors in hand, full body.` |
| 4 | `media/CO_barber_leaving.png` | `Cut-out on plain paper: the same barber walking to the right, side profile, jacket over his shoulder, head down, full body.` |
| 5 | `media/CO_wait1.png` | `Cut-out on plain paper: a halftone paper customer sitting, front view, checking his wristwatch, full body.` |
| 6 | `media/CO_wait2.png` | `Cut-out on plain paper: a halftone paper customer sitting, front view, looking down at a phone, full body.` |
| 7 | `media/CO_wait3.png` | `Cut-out on plain paper: a halftone paper customer sitting, front view, arms crossed, leaning back, full body.` |
| 8 | `media/CO_bench.png` | `Cut-out on plain paper: a long empty wooden waiting bench, front view.` |

The customers should sit at the same height as each other (same "seat line"), so they line up on one bench.

## 9. Documentary photo: the crowded bench

**Save as:** `media/M1.png` · No reference. Colour doesn't matter: I recolour it to ink and paper.

```
Documentary photo, candid, natural light, 35mm film grain, shallow depth of field, real people seen from behind or in profile, no identifiable faces, no logos, no readable text. Vertical 9:16. Inside a small neighbourhood barbershop on a busy Saturday, a long bench of waiting customers along the wall, seen from the side, one barber working in the background, warm afternoon light.
```

## Then the voice

ElevenLabs, voice **Nathan** (`v4k7NzxipnuJNJtrKxob`). Six files, text and direction in `episode.md` § Script and
§ Voice direction. Save as `audio/L01.mp3` … `audio/L06.mp3`. L06 loops into L01: end it flat, not rising.

## Check before you send them back

- No words, letters or numbers anywhere.
- Cut-outs: one piece, whole (no cropped feet or chair base), plain paper background.
- Barber and leaving barber look like the same person.
