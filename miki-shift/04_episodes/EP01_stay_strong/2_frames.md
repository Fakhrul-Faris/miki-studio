# EP01 — Stay Strong — Frames

**Episode:** MIKI'S SHIFT #01 · ~23s · 1 storyboard + 12 final frames (8 generated + 4 edits)
**Files:** `1_script.md` · `3_voice.md` · `4_edit.md` · `5_post.md`
**Prompt rules:** `../../00_bible/series-plan.md` §3

**Attach images in the listed order** — the prompt calls them Image 1, Image 2, Image 3.
**Reference images carry identity or layout only.** The art style is always written in the prompt.
Miki's image is attached only when Miki is in frame (Seedream copies the face of anyone it's given).

**The phone:** one black phone on a charging stand at the counter — **the customer's**. Miki has no
phone in this episode. Its screen is always generated blank and dark; stock lock-screen notifications
are composited in the edit (`../../00_bible/overlays.md`).

## Reference files

| Short name | File |
|------------|------|
| MIKI | `00_bible/miki_ref_clean.png` — the cropped one. **Not** the labelled sheet: its printed toast cards leak into frames |
| COUNTER | `assets/counter.png` — prompt in `0_assets.md` |
| CUST_A | `assets/customer.png` — prompt in `0_assets.md` |
| SB_01…SB_09 | `stills/sb_01.png … sb_09.png` — storyboard panels (step 2) |

## Workflow

0. Generate **COUNTER** and **CUST_A** (prompts in their folders).
1. **Storyboard** — generate the 9-grid below. Review the flow; regenerate until every panel reads.
2. Save the grid as `stills/storyboard.png`, then split it:
   `../../tools/split_grid.sh stills/storyboard.png` → `stills/sb_01.png … sb_09.png`
3. **Finals** — one request per frame (image count **1**, ratio **9:16**), attaching its storyboard
   panel for framing plus the identity images. Edits change one thing in a finished final.
4. Save each keeper as `stills/FNN.png`.

Anything off in a finished frame → one-line edit instead of re-rolling:
`Change <what's wrong> to <what it should be>. Keep everything else unchanged.`

---

## Step 1 — Storyboard (Dreamina 9-grid)

Images: 1 = MIKI · 2 = CUST_A · 3 = COUNTER · Ratio **9:16**

| | col 1 | col 2 | col 3 |
|---|---|---|---|
| **row 1** | P1 → F01 | P2 → F03 | P3 → F04 |
| **row 2** | P4 → F05 | P5 → F06 | P6 → F07 |
| **row 3** | P7 → F10 | P8 → F11 | P9 → F12 |

```text
A 3×3 storyboard grid of 9 vertical panels for a comedy short, read left to right, top to bottom, separated by thin white gutters, with no captions, numbers or speech bubbles. Flat 2D adult animated sitcom style like Bob's Burgers: clean uniform black outlines, flat cel colours with almost no shading, simple white circle eyes with small black dot pupils, warm muted palette.
Characters: Miki, the barista from Image 1, in a cream short-sleeve T-shirt and dark brown apron. The customer from Image 2 looks nothing like Miki: a stocky man with a round face, short buzz cut, thick black-framed glasses and light stubble, in a light-blue shirt with a lanyard and a black backpack.
Setting: the green-tile cafe counter from Image 3. The customer's black phone charges on a small stand at the end of the counter; its screen is blank and dark in every panel.
Panel 1: medium shot, Miki wipes the counter with a white rag; the charging phone sits in the lower-right foreground.
Panel 2: close-up of the phone on its stand, screen facing the camera, the rag and Miki's hand at the edge.
Panel 3: over Miki's shoulder toward the seating area: in the background the customer sits at a small table, happily eating a slice of cake, unaware; in the foreground Miki's face in profile shows pure pity.
Panel 4: over-the-shoulder from behind the customer's buzz-cut head at the counter; Miki looks at him with a careful, sympathetic face.
Panel 5: medium close-up, Miki raises one palm to wave off payment with a gentle, overly sympathetic smile, head tilted.
Panel 6: reverse shot, chest-up on the customer, surprised and delighted, wallet half-open.
Panel 7: close-up of Miki's hand unplugging the black phone from its stand, screen facing the camera.
Panel 8: medium close-up, Miki holds the black phone out toward the camera with a soft, pitying smile.
Panel 9: same framing as Panel 1; the charging stand is empty, Miki has stopped wiping and watches the door with a soft, pitying smile.
```

**Review before splitting:** is it obvious the phone belongs to the customer (P3 sells it)? Is the
customer clearly not Miki? Do P1 and P9 share the same angle? Are all phone screens blank, with no
cards or text?

---

## Step 2 — Finals (frame by frame)

All base prompts start with the STYLE line from `series-plan.md` §3.

### F01 — Hook: wiping, phone charging · MS · E0
Images: 1 = MIKI · 2 = SB_01
```text
Flat 2D adult animated sitcom style like Bob's Burgers: clean uniform black outlines, flat cel colours with almost no shading, simple white circle eyes with small black dot pupils, warm muted palette. Miki, the barista from Image 1, in a cream short-sleeve T-shirt and dark brown apron, in the framing, setting and pose of the storyboard panel in Image 2. Medium shot: he wipes the green-tile counter with a white rag, deadpan and half-lidded. A black phone charges on a small stand in the lower-right foreground, screen facing the camera, blank and dark.
```

### F02 — "Oof" · MS · *edit of F01*
Images: 1 = F01
```text
Change Miki's expression: he glances at the phone with his eyebrows raised high and his lips pressed into a tight wince. Keep everything else unchanged.
```

### F03 — Phone close-up · INS
Images: 1 = SB_02 · 2 = F01
```text
Flat 2D adult animated sitcom style like Bob's Burgers: clean uniform black outlines, flat cel colours with almost no shading, warm muted palette. A close-up insert in the framing of the storyboard panel in Image 1, with the same black phone, stand and green-tile counter as Image 2. The phone fills the middle of the frame, screen facing the camera, blank and dark, cable curling off to the right. The edge of the white rag and Miki's hand rest at the frame edge; the cafe behind is simplified to flat shapes.
```

### F04 — Whose phone it is · OTS · pity
Images: 1 = MIKI · 2 = CUST_A · 3 = SB_03
```text
Flat 2D adult animated sitcom style like Bob's Burgers: clean uniform black outlines, flat cel colours with almost no shading, simple white circle eyes with small black dot pupils, warm muted palette. In the framing and setting of the storyboard panel in Image 3: Miki, the barista from Image 1, in the foreground with his face in profile, rag paused, brows tilted up in pure pity. In the background, the customer from Image 2 sits alone at a small cafe table, happily eating a slice of cake, backpack on the chair beside him, completely unaware. The customer looks nothing like Miki: stocky, round face, short buzz cut, thick black-framed glasses, light stubble.
```

### F05 — Customer arrives · OTS
Images: 1 = MIKI · 2 = CUST_A · 3 = SB_04
```text
Flat 2D adult animated sitcom style like Bob's Burgers: clean uniform black outlines, flat cel colours with almost no shading, simple white circle eyes with small black dot pupils, warm muted palette. In the framing and setting of the storyboard panel in Image 3: an over-the-shoulder shot from behind the customer from Image 2, the back of his buzz-cut head and his backpack strap in the left foreground. The customer looks nothing like Miki: stocky, round face, short buzz cut, thick black-framed glasses, light stubble. Across the counter, Miki, the barista from Image 1, looks at him with a careful, sympathetic face. The black phone still charges on its stand on the right of the counter, screen blank and dark.
```

### F06 — "It's on me." · MCU
Images: 1 = MIKI · 2 = SB_05
```text
Flat 2D adult animated sitcom style like Bob's Burgers: clean uniform black outlines, flat cel colours with almost no shading, simple white circle eyes with small black dot pupils, warm muted palette. Miki, the barista from Image 1, in the framing and setting of the storyboard panel in Image 2. Medium close-up: one palm raised to wave off payment, head tilted, with a gentle, overly sympathetic smile and soft eyes, like comforting someone at a funeral.
```

### F07 — "Wait—serious?" · REV
Images: 1 = CUST_A · 2 = SB_06
```text
Flat 2D adult animated sitcom style like Bob's Burgers: clean uniform black outlines, flat cel colours with almost no shading, simple white circle eyes with small black dot pupils, warm muted palette. The customer from Image 1, in the framing and setting of the storyboard panel in Image 2. Reverse shot from behind the counter, chest-up, the cafe entrance behind him. He is surprised and delighted, brows up above his glasses, mouth in a small "o", wallet half-open in one hand.
```

### F08 — "Serious." · MCU · *edit of F06*
Images: 1 = F06
```text
Change Miki's pose and expression: his hand is lowered, and he gives a slow, grave nod with a serious face and pressed lips. Keep everything else unchanged.
```

### F09 — "Thank you… also, my phone?" · REV · *edit of F07*
Images: 1 = F07
```text
Change the customer's pose: both hands pressed to his chest, eyes closed in a grateful smile, wallet tucked under one arm. Keep the framing, background and outfit unchanged.
```

### F10 — Unplugging his phone · INS
Images: 1 = SB_07 · 2 = F03
```text
Flat 2D adult animated sitcom style like Bob's Burgers: clean uniform black outlines, flat cel colours with almost no shading, warm muted palette. A close-up insert in the framing of the storyboard panel in Image 1, with the same black phone, stand and green-tile counter as Image 2. Miki's hand, cream short sleeve at the frame edge, unplugs the cable from the black phone and lifts it off the stand. The screen faces the camera, blank and dark.
```

### F11 — "Stay strong." · MCU · must-hold
Images: 1 = MIKI · 2 = SB_08
```text
Flat 2D adult animated sitcom style like Bob's Burgers: clean uniform black outlines, flat cel colours with almost no shading, simple white circle eyes with small black dot pupils, warm muted palette. Miki, the barista from Image 1, in the framing and setting of the storyboard panel in Image 2. Medium close-up: his arm is extended toward the camera holding out the black phone, screen facing the camera, blank and dark. A soft, pitying smile, brows tilted up: he knows something the person in front of him doesn't.
```

### F12 — He knows, we know · MS · *edit of F01* (loops back to F01)
Images: 1 = F01
```text
Change the scene: the black phone is gone and the charging stand is empty, its cable lying loose. Miki has stopped wiping, the rag lies still, and he looks off to the left toward the door with a soft, pitying smile. Keep the framing, background and outfit unchanged.
```
SB_09 is for reviewing the loop only — F12 is an edit of F01 so the angle matches exactly.

---

## Order at a glance

COUNTER → CUST_A → **storyboard** → split → **F01** → F02 · F03 · F04 → F05 · F06 · F07 → F08 · F09 → F10 · **F11** → F12

Common fixes:
- Cards or text on a phone screen → `Make the phone screen completely blank and dark. Keep everything else unchanged.`
- Long sleeves → `Change Miki's long sleeves to short sleeves. Keep everything else unchanged.`
- Cap appears → `Remove the cap and show his black neck-length hair. Keep everything else unchanged.`
- Customer looks like Miki → `Make the customer's hair a very short buzz cut and add thick black-framed glasses. Keep everything else unchanged.`
- Rough storyboard detail copied into a final (wobbly lines, white gutter at the edge) → `Remove the white border and clean up the line work. Keep everything else unchanged.`
