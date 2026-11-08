# EX27 — image prompts (Seedream in Dreamina, 9:16, one image per request)

Frame brief: `art-direction.md`. Text, numbers, logos and the Ring are added in motion — never ask for them in images.

## Step 0 — the style anchor (generate first, approve, then attach to every later prompt as the style reference)

**A0 · style anchor = F1 composite**
```
Flat editorial vector illustration, 9:16 vertical. Extreme close-up of two hands entering from the bottom edge, holding a smartphone tilted 20 degrees left, lower centre; navy sleeves, cream shirt cuffs. A huge hard-edged navy shadow of the hands falls diagonally to the bottom right. Flat burnt-orange background filling the top two thirds, large empty space in the upper middle. Palette only: burnt orange #E8692A, navy #1B2A4E, cream #F6EAD7, lilac #9C8CF0. Big graphic shadow shapes, no gradients, fine film grain, minimalist, high contrast, magazine illustration style like Ordinary Folk. Phone screen blank cream. No text, no numbers, no logos.
```

Save the approved result as the **style reference**. Every prompt below starts with "Same style and palette as the reference."

## Composites (one per frame)

**F2 · the monument**
```
Same style and palette as the reference. A giant upright vacuum cleaner standing like a monument on a plain cream pedestal, centre-left, its top cropped by the top edge. One tiny navy person at the pedestal's foot, bottom right, looking up. Long navy shadow to the right. Empty orange upper third. No text.
```

**F3 · the raise**
```
Same style and palette as the reference. Same vacuum on the same cream pedestal, lower camera. A giant hand with navy sleeve and cream cuff enters from the top right edge, placing one extra cream block under the pedestal to raise it. The tiny navy person steps back, bottom right. No text.
```

**F4 · the signature (side view)**
```
Same style and palette as the reference. Flat side view. Two pedestals side by side on orange: left only a dashed cream outline (empty), right a solid cream pedestal that is taller; the part of the right pedestal above the left outline's height is bright red #FF3B30. The vacuum stands on the right pedestal. A thin cream horizontal line at the dashed outline's height. Lots of empty orange around. No text.
```

**F5 · the stamp (top-down)**
```
Same style and palette as the reference. Top-down view. A large official rubber stamp with navy handle and cream face descending from the top edge toward a cream product listing card lying flat on orange, lower centre. A hard navy circular shadow under the stamp. Empty orange around. No text, no logos.
```

**F6 · the night check**
```
Same style as the reference, night palette: dark navy room #1B2A4E and #0F1626, warm orange phone glow #E8692A, cool blue window light on the left edge. A person seated at a desk, three quarter view from the left, face and hands lit orange by a phone, a cone of glow on the wall. Lots of dark empty space upper right. No text.
```

## Layer plates (for animation — same angle, light and size as the composite; subject alone on pure green #00FF00)

Make these after the composites are approved. Short form: attach the frame's composite as reference, then:
```
Only the [SUBJECT] from the reference, same size and position, alone on a flat pure green #00FF00 background. No shadow, no text.
```
and for each background:
```
The reference with all subjects removed: only the background and floor, nothing else. No text.
```

| Frame | Plates needed (in priority order) |
|---|---|
| F1 | hands + phone · background |
| F2 | vacuum · pedestal · tiny person · background |
| F3 | giant hand · cream block · (vacuum + pedestal reuse F2) |
| F4 | right pedestal (with red top) · vacuum · background with dashed outline |
| F5 | stamp · listing card · background |
| F6 | person + desk · window light · background (empty room) |

If credits are tight: composites only. I can cut subjects from the composites myself (PhotoCraft), and the background plates are
the ones I can't recreate — those matter most.

## Naming

Save into `04_episodes/EX27_1111-fake-discount/media/` as `F1.png`, `F2.png` … and plates as `F2_vacuum.png`, `F2_bg.png` …
