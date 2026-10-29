# EX04 "The Peak-End Rule": what to generate

Go down the list in order. For each step: copy the **Prompt** box, paste the **Negative** box into your tool's negative-prompt field (if it has one), attach the reference if the step says so, generate at **9:16**, and save the result into `EX04_peak-end-rule/media/` with the exact **Save as** name.

Everything else (the big numbers, the bars, the timeline, the countdown, all words) I build myself.

**Negative (same for every step):**

```
text, letters, words, numbers, typography, logos, signage, watermark, 3D render, glossy, gradients, rounded UI cards, stock icons, clipart, flat vector, cartoon faces, emoji, lens flare, drop-shadowed text boxes, color except ink black, paper and ochre
```

## 1. The clipboard (do this first: every later collage step uses it as the reference)

**Save as:** `media/2A.png`  
**Reference:** —

**Prompt:**

```
Editorial mixed-media collage in the style of Vox and Fern explainer films. Layered cut-paper construction with visible physical depth, torn paper edges, halftone-printed photo cutouts, risograph grain, slight ink misregistration. Warm off-white paper texture (#EFE8DC), ink black (#111111), single muted ochre accent (#C98A2B). Hard directional light, soft paper shadows. Poster-like composition, generous negative space, one hero element. No text, no letters, no numbers, blank labels. Keep the main subject in the middle of the frame, away from the bottom quarter and the right edge. Vertical 9:16, ultra detailed. A cut-paper medical clipboard lying straight on a warm paper desk, seen from directly above, centred: a dark paper clip at the top, a large blank sheet of paper clipped to it, completely empty, ready for a chart. Hard side light, soft shadow under the board.
```

## 2. The customer at the counter

**Save as:** `media/4B.png`  
**Reference:** Attach 2A.png as style reference.

**Prompt:**

```
Editorial mixed-media collage in the style of Vox and Fern explainer films. Layered cut-paper construction with visible physical depth, torn paper edges, halftone-printed photo cutouts, risograph grain, slight ink misregistration. Warm off-white paper texture (#EFE8DC), ink black (#111111), single muted ochre accent (#C98A2B). Hard directional light, soft paper shadows. Poster-like composition, generous negative space, one hero element. No text, no letters, no numbers, blank labels. Keep the main subject in the middle of the frame, away from the bottom quarter and the right edge. Vertical 9:16, ultra detailed. Side view of a small cut-paper barbershop counter: a halftone paper customer with a fresh haircut standing at the counter, digging in his trouser pocket for change, head down, a little awkward; behind the counter a paper barber waits with an open hand. A plain empty wall above them.
```

## 3. The empty counter (closing frame)

**Save as:** `media/5A.png`  
**Reference:** Attach 4B.png as reference (same counter).

**Prompt:**

```
Editorial mixed-media collage in the style of Vox and Fern explainer films. Layered cut-paper construction with visible physical depth, torn paper edges, halftone-printed photo cutouts, risograph grain, slight ink misregistration. Warm off-white paper texture (#EFE8DC), ink black (#111111), single muted ochre accent (#C98A2B). Hard directional light, soft paper shadows. Poster-like composition, generous negative space, one hero element. No text, no letters, no numbers, blank labels. Keep the main subject in the middle of the frame, away from the bottom quarter and the right edge. Vertical 9:16, ultra detailed. Straight-on view of the same small cut-paper barbershop counter, now empty, a small bell on the counter, the shop door slightly open behind it with soft light coming in, a blank torn paper strip across the upper third of the frame. Black surround outside the paper set, quiet.
```

## 4. Documentary photo: hospital corridor

**Save as:** `media/M1.png`  
**Reference:** No reference. Colour doesn't matter: I recolour it to ink and paper.

**Prompt:**

```
Documentary photo, candid, natural available light, muted colours, 35mm film grain, shallow depth of field, real place, real people seen from behind or in profile, no identifiable faces, no logos, no readable text or signage. Keep the main subject in the middle of the frame, away from the bottom quarter and the right edge. Vertical 9:16. A calm, quiet hospital corridor in soft morning light, a few patients and a nurse seen from behind walking away, chairs along the wall, clean and non-clinical, nothing medical or graphic visible.
```

## 5. Documentary photo: the barbershop

**Save as:** `media/M2.png`  
**Reference:** No reference.

**Prompt:**

```
Documentary photo, candid, natural available light, muted colours, 35mm film grain, shallow depth of field, real place, real people seen from behind or in profile, no identifiable faces, no logos, no readable text or signage. Keep the main subject in the middle of the frame, away from the bottom quarter and the right edge. Vertical 9:16. Inside a neighbourhood barbershop, a barber brushing off a customer's neck after a fresh haircut, the customer seen from behind in the chair looking at his cut in the mirror, warm afternoon light, candid.
```

## Then the voice

ElevenLabs, voice **Nathan** (`v4k7NzxipnuJNJtrKxob`). Six files, text and direction in `episode.md` § Script and § Voice direction. Save as `audio/L01.mp3` … `audio/L06.mp3`.

## Check before you send them back

- No words, letters or numbers anywhere in the images (regenerate if the tool adds them).
- 9:16.
- The subject sits in the middle, not at the very bottom or right edge.
- The hospital photo stays calm: no procedure, no equipment close-ups.
