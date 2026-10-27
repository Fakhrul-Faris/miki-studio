# Motion Design Analysis — "Return on Experience" (Part and Sum × VTProDesign, ~22s, 736×414, 30fps)

Source: `source.mp4` (Pinterest download). Music only, no narration.
Status: **draft — awaiting approval**

**Reference use:** Borrow the highlighter swipe, the colour-coded list that becomes chart layers,
the concentric-ring text, and the letter-swap gag. Do not carry over the brand names, the
lavender/yellow brand palette, or the music-video pacing (it's built for music, not a voice).

**Style summary:** A dark charcoal background with a thin purple layout grid that shifts between
scenes. Light-weight sans text in lavender, with a yellow highlighter marking the key phrase. Big,
flat geometric shapes (arches, rings, waves) in a five-colour family (blue, purple, lavender, mint,
white). Everything moves smoothly and continuously. Confident, editorial, a bit playful.

---

## Beat 1 — 0.00s–1.00s (grid + statement)
**Frames:** `contact_sheets_4fps/t000.jpg` row 1
- **Typography:** "Real-world experiences are your brand." Light sans, lavender, two lines, left-aligned.
- **Animation & transition:** Grid lines slide into position. Words fade in one by one with a slight blur.
- **Layout & composition:** Text anchored to a grid cell, left of centre.
- **Background & accent motifs:** A charcoal background (~#2B2B2B) with thin purple grid lines.
- **Pacing:** ~0.15s per word.
- **Mood/purpose:** The claim.
- **Diagram grammar:** Grid = "structured thinking". It appears on every text scene.
- **Voice ↔ visual sync:** Music only. Builds land on beats.

## Beat 2 — 1.00s–3.50s (highlighter swipe)
**Frames:** `t000.jpg` rows 1–2
- **Animation & transition:** A yellow rectangle wipes left to right behind "Real-world
  experiences" (~0.3s, ease-out), and the text on it switches to dark. Then the highlight shrinks
  to just "experiences" while the grid shifts left (the camera drifts).
- **Diagram grammar:** **Highlighter = "this is the key phrase".** It moves to re-point emphasis.

## Beat 3 — 3.50s–5.00s (pill rises → arch + arrow)
**Frames:** `t000.jpg` rows 2–3
- **Typography:** "And yet…" white sans, typed with the dots appearing one at a time.
- **Animation & transition:** A thin lavender bar rises from the bottom edge and widens into a big
  rounded arch, with a down arrow drawing inside it.
- **Mood/purpose:** The "but" moment. The arrow points down to what comes next.

## Beat 4 — 5.00s–8.50s (concentric rings with curved text)
**Frames:** `t000.jpg` rows 3–4, `t006.jpg` row 1
- **Typography:** Text set on curved paths, one phrase per ring: "they're the most / undervalued
  tools / in a marketers arsenal."
- **Animation & transition:** The arch scrolls up into a full circle. Rings (mint, then white) expand
  out from it one at a time, and each ring's text writes on along its curve. Then the whole group
  rotates counter-clockwise out of frame.
- **Diagram grammar:** **Rings = layers of one idea.** Reading outward = reading the sentence.

## Beat 5 — 8.50s–11.00s (waves + letter swap)
**Frames:** `t006.jpg` rows 1–2
- **Typography:** "It's time to rethink ROI." white, centred. The "I" is struck through and swapped to
  "X" → "ROX".
- **Animation & transition:** Stacked wave layers (blue, purple, lavender, mint, white) rise and
  undulate. A dark wave crest then sweeps down over everything.
- **Mood/purpose:** The reframe: an old term becomes the new term.
- **Diagram grammar:** **Letter strike-and-swap = "rename the concept".**

## Beat 6 — 11.00s–13.00s (colour-coded list as full-frame plates)
**Frames:** `t006.jpg` rows 3–4, `t012.jpg` row 1
- **Typography:** One label per plate, centred: "Brand value", "Audience engagement", "Sales value",
  "PR + extended storytelling", "Organizational value".
- **Animation & transition:** Full-frame colour plates replace each other with a wave-edge wipe,
  ~0.5–0.75s each.
- **Diagram grammar:** **Each item gets its own colour.** Those colours become the chart layers in
  the next beat.

## Beat 7 — 13.00s–15.00s (stacked bell chart)
**Frames:** `t012.jpg` rows 1–2
- **Typography:** Black pills "BEFORE / DURING / AFTER" on the time axis, a yellow pill "IRL
  EXPERIENCE" on top, tiny caps axis labels "VALUE" and "TIME".
- **Animation & transition:** Stacked area curves in the 5 list colours grow from the left as a wave
  and settle into a bell shape centred on "DURING". Dotted guide lines drop from the yellow pill.
- **Diagram grammar:** Colour = the same category as the plates. The viewer already knows the key,
  so no legend is needed.

## Beat 8 — 15.00s–17.00s (new mandate)
**Frames:** `t012.jpg` rows 3–4
- **Typography:** "Return on Experience is the new mandate." Highlight on "new mandate".
- **Animation & transition:** The grid shifts. Words build, then the highlight swipes.

## Beat 9 — 17.00s–18.50s (CTA)
**Frames:** `t012.jpg` row 4, `t018.jpg` row 1
- **Typography:** "Get the report. Evaluate the ROI of your experiences." Highlight on "Get the report."
- **Animation & transition:** The grid lines collapse inward and re-open.

## Beat 10 — 18.50s–21.00s (logos + exit)
**Frames:** `t018.jpg` rows 2–3
- **Animation & transition:** Logos pop in on the grid. The exit slices the logos along the grid lines,
  and they slide apart.

---

## Techniques worth carrying into other builds
1. **The highlighter swipe** on the one phrase that matters, and moving it to re-point emphasis.
   It's cheap and very readable on a phone.
2. **Colour-coded list → chart layers:** introduce categories one by one as colour plates, then the
   chart uses the same colours, so no legend is needed. Useful for "5 places your money leaks".
3. **Concentric rings with curved text** to show "layers" of one idea.
4. **The letter strike-and-swap** (ROI → ROX) to coin a term. This fits our "named concept" beat
   ("the Wait Tax").
5. **A layout grid as a constant background texture** gives structure without clutter.

## Notes for EffectCraft (untested; to prove in step 5)
- Highlight → rectangle shape with Scale X anchored on the left (or Trim Paths on a thick stroke) behind text.
- Curved text → text on a path (check that EffectCraft supports Path Options on text).
- Waves → animated shape paths or a wave-warp effect on solids.
- Wave-edge plate wipe → a masked solid with an animated mask path.
