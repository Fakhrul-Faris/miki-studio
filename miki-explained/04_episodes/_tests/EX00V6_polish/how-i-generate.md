# EX00V6 3D audience: what to generate

Three seated people, which I turn into 3D models (image to 3D) and seat in the waiting room. The 3D tool works best on
**one whole figure, front three-quarter view, on a plain background, nothing cropped**. Generate at **1:1** (square),
paste the **Negative** box, attach `../../EX11_no-show/media/CO_patient1.png` as **style reference** (the halftone look),
and save into `_tests/EX00V6_polish/media/` with the exact **Save as** name.

**Negative (all three):**

```
text, letters, numbers, logos, chair, stool, bench, furniture, floor, ground shadow, cast shadow, background objects, cropped limbs, cut-off feet, cut-off head, multiple people, top-down view, side view, back view, flat vector, cartoon, chibi, glossy 3D render, color except ink black, warm grey and paper
```

**Style lock (start of every prompt):**

```
Editorial mixed-media collage figure: a halftone-printed photo cutout of a real person, ink black and warm grey tones, risograph grain, slight ink misregistration, torn white paper edge around the whole figure. One person only, whole body from head to shoes, front three-quarter view from slightly above, sitting on an invisible seat (knees bent at a right angle, thighs level, feet flat), centred on a plain flat warm off-white background (#EFE8DC). Square 1:1, ultra detailed, nothing cropped.
```

| Step | Save as | Prompt (after the style lock) |
|---|---|---|
| 1 | `media/P1_hands.png` | `A man in his 30s in a plain shirt and jeans, hands clasped between his knees, head slightly bowed, waiting.` |
| 2 | `media/P2_bag.png` | `A woman in her 40s in a cardigan and trousers, a canvas bag on her lap held with both hands, looking ahead.` |
| 3 | `media/P3_phone.png` | `A young man in a hoodie and trainers, looking down at a phone held in both hands, elbows on his knees.` |

## Check before you send them back

- The whole body is in frame, feet included, with clear space around it.
- No chair drawn (I build the chairs in 3D); the pose still reads as sitting.
- One clean figure on a plain background: no shadow on the ground, no props except the bag/phone.
- If a pose keeps coming out standing, add `sitting` again at the end; if the tool insists on drawing a chair, a plain
grey box seat is OK as a fallback (I can cut it off the model).
