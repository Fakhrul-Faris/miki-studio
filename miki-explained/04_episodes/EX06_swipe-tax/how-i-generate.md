# EX06 "The Swipe Tax": what to generate

Go down the list in order. For each step: copy the **Prompt** box, paste the **Negative** box into your tool's
negative-prompt field (if it has one), generate at **9:16**, and save the result into `EX06_swipe-tax/media/` with the
exact **Save as** name.

Everything else (the "FREE" stamp, the swipe-tax label, the numbers, the vault diagram, all words) I build myself.

**Negative (same for every step):**
```
text, letters, words, numbers, typography, logos, signage, watermark, 3D render, glossy, gradients, rounded UI cards, stock icons, clipart, flat vector, cartoon faces, emoji, lens flare, drop-shadowed text boxes, color except ink black, paper and ochre
```

## 1. The bank counter sign (do this first: it's the reference for the rest)

**Save as:** `media/1A.png`
**Reference:** —

**Prompt:**
```
Editorial mixed-media collage in the style of Vox and Fern explainer films. Layered cut-paper construction with visible physical depth, torn paper edges, halftone-printed photo cutouts, risograph grain, slight ink misregistration. Warm off-white paper texture (#EFE8DC), ink black (#111111), single muted ochre accent (#C98A2B). Hard directional light, soft paper shadows. Poster-like composition, generous negative space, one hero element. No text, no letters, no numbers, blank labels. Keep the main subject in the middle of the frame, away from the bottom quarter and the right edge. Vertical 9:16, ultra detailed. A blank cut-paper bank teller counter sign mounted on a wall, seen straight on, centred: a thick torn-paper rim around a plain empty signboard, no text. Plain warm paper wall around it, empty space above and below for a headline.
```

## 2. Cut-out: hand tapping a card

**Save as:** `media/CO_card_tap.png`
**Reference:** Attach 1A.png as style reference.

**Prompt:**
```
Editorial mixed-media collage in the style of Vox and Fern explainer films. Layered cut-paper construction with visible physical depth, torn paper edges, halftone-printed photo cutouts, risograph grain, slight ink misregistration. Warm off-white paper texture (#EFE8DC), ink black (#111111), single muted ochre accent (#C98A2B). Hard directional light, soft paper shadows. No text, no letters, no numbers. Vertical 9:16, ultra detailed. Cut-out item on plain warm paper, centred, close-up, no background clutter: a halftone paper hand holding a payment card, tapping it down onto a small card reader terminal, side angle, no shadow on the ground.
```

## 3. Cut-out: a shop till

**Save as:** `media/CO_register.png`
**Reference:** Attach 1A.png as style reference.

**Prompt:**
```
Editorial mixed-media collage in the style of Vox and Fern explainer films. Layered cut-paper construction, torn paper edges, halftone-printed photo cutouts, risograph grain. Warm off-white paper (#EFE8DC), ink black (#111111), single muted ochre accent (#C98A2B). Hard directional light, soft paper shadows. No text, no letters, no numbers. Vertical 9:16, ultra detailed. Cut-out item on plain warm paper, centred, no background: a small vintage cut-paper cash register, side view, drawer slightly open, no shadow on the ground.
```

## 4. The price tag (for the twist freeze)

**Save as:** `media/3A.png`
**Reference:** Attach 1A.png as style reference.

**Prompt:**
```
Editorial mixed-media collage in the style of Vox and Fern explainer films. Layered cut-paper construction with visible physical depth, torn paper edges, halftone-printed photo cutouts, risograph grain, slight ink misregistration. Warm off-white paper texture (#EFE8DC), ink black (#111111), single muted ochre accent (#C98A2B). Hard directional light, soft paper shadows. Poster-like composition, generous negative space. No text, no letters, no numbers, blank labels. Keep the main subject in the middle of the frame, away from the bottom quarter and the right edge. Vertical 9:16, ultra detailed. Close-up of a small shop counter: a folded paper price tag hanging from a string, completely blank, tilted slightly, resting on a wooden counter top, a blurred till in the soft-focus background.
```

## 5. Documentary photo: a real card payment

**Save as:** `media/M1.png`
**Reference:** —

**Prompt:**
```
Documentary photo, candid, natural available light, muted colours, 35mm film grain, shallow depth of field, real place, real people seen from behind or in profile, no identifiable faces, no logos, no readable text or signage. Keep the main subject in the middle of the frame, away from the bottom quarter and the right edge. Vertical 9:16. Inside a small neighbourhood shop, a close-up over-the-shoulder view of a hand tapping a card on a payment terminal at the counter, the shopkeeper's hand steadying the machine, warm indoor light, candid.
```

## Then the voice

ElevenLabs, voice **Nathan** (`v4k7NzxipnuJNJtrKxob`). Seven files, text and direction in `episode.md` § Script and
§ Voice direction. Save as `audio/L01.mp3` … `audio/L07.mp3`.

## Check before you send them back

- No words, letters or numbers anywhere in the images (regenerate if the tool adds them — easy to slip in on a bank sign or a price tag).
- 9:16.
- The subject sits in the middle, not at the very bottom or right edge.
- Cut-outs (`CO_*`): one object, plain paper background, no scene clutter.
