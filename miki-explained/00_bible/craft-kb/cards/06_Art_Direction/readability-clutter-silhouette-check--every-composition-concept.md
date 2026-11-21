---
title: Readability check — clutter, competing objects, unclear silhouettes
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/Every Composition Concept Explained (In 3D).txt"
source_time: "01:43–02:03"
tool_target: board-check
tier: full
use_when: "board check of every still; any setup with a 'multiply' or crowded shelf beat"
style_fit: "Fits Style D's 'reads in 1 s on a phone' rule; the dark room and one top light make silhouettes the main reading tool."
---

## METADATA
06_Art_Direction | 3D (tool-agnostic) | board check + ref_<shot>.md "reads in 1 s on a phone?"

## CREATIVE_INTENT
Adding elements to build hierarchy risks clutter, so "always keep in mind the image's readability". Three things make a
composition hard to read: being **too cluttered**, **many objects competing for attention**, and **unclear silhouettes**.

## STE_PROCEDURE
1. Before approving a still, view it at phone size (~270 × 480 px).
2. Count elements that draw the eye; if more than ~3 compete, cut or demote.
3. Check that only one element has the accent and the brightest value.
4. Fill the hero black on a white ground mentally (or as a matte); confirm it reads as that object.
5. Separate overlapping silhouettes by moving, rim-lighting or blurring one.
6. Re-test at phone size after every fix.

## AGENT_EXECUTION
Board check adds three yes/no rows. Silhouette test on a raea still: render the frame, threshold it, view small.
```bash
raea render EDIT.tsx --frame 120 -o s04.png
ffmpeg -v error -y -i s04.png -vf "scale=270:-1,format=gray,lutyuv=y='if(gt(val,60),255,0)'" s04_sil.png   # ~ threshold 60
```
If the hero's shape is not recognisable in s04_sil.png, add a rim light behind it or rotate it to its most
characteristic angle (a phone edge-on reads as a stick; 3/4 reads as a phone).
### Worked example
Topic: "Gerai burger: 3 benda makan untung korang" (illustrative).
- BEFORE: one still shows the burger, the grill, three sauce bottles, a cash tray and a price board — five competitors;
  the burger is seen from the top and reads as a disc.
- AFTER (shot-list row): `| 4 | "Benda pertama: sos." | macro 3/4 on the grill, 85 mm; one sauce bottle sharp, two blurred behind | bottle cap glows accent on "sos"; RM 0.40 per burger tag slides in 0.4 s | readability |` — burger moved out; the bottle shown in 3/4 with a cool rim so its shape cuts the dark.
### Check
- At 270 × 480 px, can you name the hero in 1 s?
- Are ≤ 3 elements competing, with one clearly first?
- Does the hero's silhouette read in a black/white threshold?

## NOTES
- Visual gaps: example images on screen only; the "≤ 3" and threshold value are inferred (~).
