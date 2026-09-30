# Motion Design Analysis — "Wise" (~24.0s, 3:2, 720x480)

Source: `reference-library/wise/source.mp4` (originally `Motion Design/Wise (MD).mp4`)
Extracted via `tools/shot_extractor.py` (11 shots at scene thresh 0.15; the first cuts at 2.83s, 3.83s, 6.83s, 9.13s, 12.70s, 15.93s and 21.47s are real scene changes, the rest are fixed-interval splits). Re-derived into 9 beats from a 2 fps contact sheet. Beat times are accurate to ~0.5s. Frame refs are approximate: `shot01` = beat 1, `shot02` = beat 2, `shot03` = beats 3–4, `shot04` = beat 5, `shot05`–`shot06` = beat 6, `shot07`–`shot08` = beat 7, `shot09`–`shot10` = beat 8, `shot11` = beat 9.

**Reference use:** the "live-action scene + floating UI card" hybrid: card size, corner placement, how cards animate in/out, the palette (bright lime-green plus white) and per-scene pacing. This is a money-transfer/banking ad. Do not carry over the brand name, the exact UI screens, currency/flag lists, the "It all adds up" sticker copy, or the actors. Describe UI generically (e.g. "a white rounded card beside the subject shows a converter with two currency rows and a green confirm button").

**Style summary:** a montage of warm, sunlit lifestyle vignettes (street, kitchen, couch, café, family living room, dinner table), each about 2–5s. Every vignette is a person using a phone or card, and each carries one clean UI card composited beside them, sized to about a quarter of the frame. The UI shows what they are doing in that moment (list, convert, pick, type, receive, spend). Cards use white or lime-green rounded rectangles with soft shadows and generous padding. The spot ends on a phone-in-hands close-up.

---

## Beat 1 — 0.00s–2.83s (street: transaction list)
**Frames:** `shot01_*`

- **Typography:** UI card text only; small dark sans, left-aligned rows with tiny icons and right-aligned amounts.
- **Animation & transition:** A single-row white pill appears at bottom-left, then rows are added one by one until the pill has become a four-row card (a stacked list growing upward). A man on a street with shopping bags holds a lime-green card and phone in the foreground.
- **Layout & composition:** Medium shot, subject centered and cropped at the chest; card anchored bottom-left.
- **Background & accent motifs:** Sunlit street, warm tones; lime-green card in hand as the color accent.
- **Pacing:** ~2.8s. Each added row lands roughly every 0.5s.
- **Mood/purpose:** Everyday spending, made visible.

## Beat 2 — 2.83s–3.83s (kitchen: establish)
**Frames:** `shot02_*`

- **Typography:** None.
- **Animation & transition:** Hard cut to a woman in orange overalls holding a phone and mug in a bright kitchen. No UI yet.
- **Layout & composition:** Centered medium shot, tall windows behind.
- **Background & accent motifs:** Warm cream, wood, orange.
- **Pacing:** ~1s. A breath before the card.
- **Mood/purpose:** Relaxed, at-home tone.

## Beat 3 — 3.83s–6.00s (kitchen: converter card)
**Frames:** `shot03_start`, `shot03_mid`

- **Typography:** Tiny UI labels; two currency rows with flags, big-number amounts in bold sans, a wide green button at the bottom.
- **Animation & transition:** A white converter card slides in from the right edge. Amounts count up in the first row and a second-row amount updates in step; the green button changes to a checkmark when the amount settles (~6.0s).
- **Layout & composition:** Card at right third, mid-height; the subject stays left of center.
- **Background & accent motifs:** White card, green button.
- **Pacing:** ~2s. Numbers tick over ~1.5s.
- **Mood/purpose:** Shows a conversion happening.

## Beat 4 — 6.00s–6.83s (sticker)
**Frames:** `shot03_end`

- **Typography:** Stacked heavy caps in black on a white sticker, two lines.
- **Animation & transition:** The converter card is replaced by a white rounded sticker with a colorful 3D ribbon/confetti shape above the text. Pops in with a slight scale overshoot.
- **Layout & composition:** Same right-third slot as the card.
- **Background & accent motifs:** White sticker; purple/pink/lime ribbon accent.
- **Pacing:** ~0.8s. Punchline beat.
- **Mood/purpose:** Slogan moment.

## Beat 5 — 6.83s–9.13s (couch: confirmation)
**Frames:** `shot04_*`

- **Typography:** On-phone text in bold green caps with the same 3D ribbon shape above it.
- **Animation & transition:** Hard cut to an over-the-shoulder close-up of hands holding a phone on a couch. The phone screen shows a bold confirmation message and the ribbon graphic; a slow push-in.
- **Layout & composition:** Phone upright at center-right; hands and arm crop in from the lower left.
- **Background & accent motifs:** Olive-green couch, soft warm light; phone with a pink case.
- **Pacing:** ~2.3s.
- **Mood/purpose:** "Done" confirmation.

## Beat 6 — 9.13s–12.70s (café: pick and type)
**Frames:** `shot05_*`, `shot06_*`

- **Typography:** Currency list rows (flag + name), a "Send to …" header, a big amount in bold sans and a numeric keypad grid.
- **Animation & transition:** A vertical list card slides in from the left, a row is selected with a green check (~10.0s), the card morphs into a lime-green keypad card whose amount types in digit by digit (0.00 → 1 → 125 → 1250 by ~12.0s). Each key press is highlighted in green.
- **Layout & composition:** Card at the left edge, full height; the man seated at right, looking at his phone.
- **Background & accent motifs:** Pastel café, greenery; white list card, then lime keypad card.
- **Pacing:** ~3.5s. The typing gives a clear ticking rhythm.
- **Mood/purpose:** The sender's side of the transfer.

## Beat 7 — 12.70s–15.93s (family room: amount arrives)
**Frames:** `shot07_*`, `shot08_*`

- **Typography:** Large bold digits with a decimal in smaller type; a flag/currency chip above; a small caption row below that appears part-way through.
- **Animation & transition:** A blank white/teal card slides up at the bottom-left, then fills with a currency chip and amount. The amount counts up (1,025 → 1,773 → 2,275) with a caption line fading in beneath.
- **Layout & composition:** Card bottom-left; an older woman with glasses smiling at her phone, center-right.
- **Background & accent motifs:** Rich orange/magenta fabrics; white card with a green chip.
- **Pacing:** ~3.2s. The counting number is the beat's engine.
- **Mood/purpose:** The receiver's side: money arrives.

## Beat 8 — 15.93s–21.47s (dinner: income and spending)
**Frames:** `shot09_*`, `shot10_*`

- **Typography:** Tiny labels with a small bar chart and an amount; rows appear with a name and amount.
- **Animation & transition:** A dark-green "Money in" card with a bar chart appears at the bottom-right while dishes pass around a table. A white pill above it adds a "salary" row (~17.0s). Then the dark card flips to a light-lime "Spending" card with bars, while a woman in green holds up a lime-green card (~18.5s). A second row (restaurant) is added under the first (~20.0s).
- **Layout & composition:** Card bottom-right; group of friends in a warm booth left and center.
- **Background & accent motifs:** Deep terracotta and wood; green blouse echoes the card color.
- **Pacing:** ~5.5s. The longest beat, with three UI states.
- **Mood/purpose:** Celebration and everyday spending.

## Beat 9 — 21.47s–23.97s (couch: end hold)
**Frames:** `shot11_*`

- **Typography:** On-phone green text with a currency list; a small tag above.
- **Animation & transition:** Cut back to the couch close-up from Beat 5, with a different screen (a summary of the account and a currency list). Static hold, phone slightly tilting.
- **Layout & composition:** Same as Beat 5.
- **Background & accent motifs:** Olive couch, pink phone case.
- **Pacing:** ~2.5s hold.
- **Mood/purpose:** Sign-off; visually echoes Beat 5 to close the loop.

---

## Cross-beat notes
- **One vignette, one card.** Each scene carries a single UI card in a consistent quarter-frame slot, so the eye always knows where to look.
- **UI cards mirror the action.** List, convert, pick, type, receive, spend: the cards tell the sequence of a money story while the actors show the emotion.
- **Numbers as motion.** Counting amounts and typing digits provide the movement inside otherwise calm, static scenes.
- **Color logic.** Every scene has a warm environment; lime green appears on cards, buttons and often echoed in the subject's clothing.
- **Bookend.** The couch close-up opens the middle (Beat 5) and closes the spot (Beat 9).
- **Rhythm:** ~2.8s, 1s, 2s, 0.8s, 2.3s, 3.5s, 3.2s, 5.5s, 2.5s. Short punchline beats between longer UI-heavy scenes.
