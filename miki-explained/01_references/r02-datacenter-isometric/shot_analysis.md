# Motion Design Analysis — "Data center goes green" (isometric, ~5s, 736×414, 24fps)

Source: `source.mp4` (Pinterest download, an excerpt from a longer narrated explainer). VO: "The good
news is that using green energy is the stated goal of a lot of these companies."
Status: **draft — awaiting approval**

**Reference use:** Borrow the isometric "system" build: a tile appears, resolves into what it is, and
a connector line joins it to the main object. Also the scribble-underlined label. Do not carry over the
data-center artwork.

**Style summary:** A white background with one isometric object: black buildings on a bright yellow
platform. A grainy, dithered texture fill. A single yellow sun gradient for context. A small,
heavy, condensed label with a hand-drawn scribble underline.

---

## Beat 1 — 0.00s–0.30s (the object)
**Frames:** `contact_sheets/t000.jpg` row 1, frames 1–2
- **Typography:** "Data center" bold condensed sans, two lines, with a two-stroke pencil scribble underline.
- **Layout & composition:** The isometric object is right of centre, the label top right.
- **Background & accent motifs:** White. Yellow (#E9F032-ish) is the only colour.
- **Diagram grammar:** **Isometric = "a physical system you can look into".**

## Beat 2 — 0.30s–1.50s (tile grows in)
**Frames:** `t000.jpg` rows 1–2
- **Animation & transition:** A small isometric square pops in at the left, then grows (scale from a
  point, ease-out). Its fill is a flickering pixel-dither yellow/black noise, like it's "loading".

## Beat 3 — 1.50s–2.50s (resolve + context)
**Frames:** `t000.jpg` rows 2–3
- **Animation & transition:** A sun (yellow radial gradient) slides in at the top left corner. The
  noisy tile resolves into solar panels and wind turbines, and the noise settles into the real
  illustration.
- **Mood/purpose:** The idea "becomes real".

## Beat 4 — 2.50s–3.20s (connector)
**Frames:** `t000.jpg` row 3, frames 4–6
- **Animation & transition:** A thin black isometric L-shaped wire draws from the solar tile, around
  the front, to the data center (trim path).
- **Diagram grammar:** **Connector line = "this feeds that".**

## Beat 5 — 3.20s–4.80s (hold)
**Frames:** `t000.jpg` row 4, `t003.jpg`
- Hold with subtle flicker in the building lights while the VO finishes.

---

## Techniques worth carrying into other builds
1. **The isometric system build:** start with the main object, then add parts one by one and connect
   them. For us: **the shop as an isometric diagram** (door, bench, chairs, counter tablet, the
   payment QR) with connectors showing flows (customer, money, bookings).
2. **The pixel-dither "loading" reveal** before a part resolves. It reads as "a new thing arriving in
   the system".
3. **A scribble underline under the label** gives a human, hand-made touch on a clean diagram.
4. **One colour + black on white** stays readable at phone size.

## Notes for EffectCraft (untested; to prove in step 5)
- Isometric → either flat shapes drawn in isometric projection, or 3D layers with an orthographic
  camera at 35.26°/45° (EffectCraft has 3D cameras; whether it does orthographic needs checking).
- Dither reveal → a noise effect plus posterize/threshold, faded out over the resolved artwork.
- Pre-made isometric artwork (shop, chairs) may be better generated as images and animated as
  mixed media.
