# Motion Design Analysis — "Apple Card" (~6.0s, 9:16 vertical)

Source: `reference-library/apple-card/source.mp4` (originally `Motion Design/apple Card (MD).mp4`)
Extracted via `tools/shot_extractor.py` (3 algorithmic shots at scene thresh 0.15). Re-derived into 5 real beats by viewing a 4 fps contact sheet; the extractor missed two beats inside its shot 2 (0.97s–3.49s).

**Reference use:** typography, animation/transition technique, layout, background/accent-motif and pacing DNA only. This is a financial-product ad (Apple Card) that shows its own brand, logo, product UI and legal copy. Do not carry over the brand name, logo, card design, wallet icon, UI screen content, or the disclaimer text. Describe the phone UI generically (e.g. "a hand-held phone showing a finance app dashboard").

**Style summary:** a 6s vertical spot on a single flat pale cool-gray background, with a short rhythm of one-idea-per-beat centered headlines set in a purple-to-orange-yellow horizontal gradient fill. One product-UI beat (phone held in hand) interrupts the type. Ends on a quiet dark-on-light end card. No camera, no location, no lighting design — all interest comes from the gradient type, cut timing and fades.

**Frame timing note:** beat times are from the 4 fps contact sheet, accurate to ~0.25s.

---

## Beat 1 — 0.00s–1.00s (title line)
**Frames:** `shot01_*`

- **Typography:** Two-line centered headline, large medium-weight geometric sans, sentence case. Line 2 begins with an inline brand glyph. Text fill is a left-to-right gradient: violet-magenta → salmon/coral → amber-yellow, applied across each line as one continuous ramp (the ramp restarts per line).
- **Animation & transition:** Static hold for the full beat; no entry animation visible (already settled at frame 0). Hard cut out to Beat 2.
- **Layout & composition:** Centered horizontally, sitting slightly below vertical center (~40% up from bottom). Wide margins (~20% each side); large empty space above.
- **Background & accent motifs:** Flat pale cool-gray (very slight vertical/soft vignette shading), no texture, no shapes.
- **Pacing:** ~1s. Fast, declarative.
- **Mood/purpose:** Confident product-name statement.

---

## Beat 2 — 1.00s–1.75s (product UI in hand)
**Frames:** `shot02_start`

- **Typography:** None of its own. The phone UI shows small system-style type; not reusable.
- **Animation & transition:** Hard cut in from Beat 1. A phone, held by a partly-silhouetted dark hand at the frame edges, drifts slowly upward and scales slightly across the beat. Hard cut out to Beat 3.
- **Layout & composition:** Phone fills nearly the full frame height, centered, cropped by the top and bottom edges. Hand silhouettes enter from left and right.
- **Background & accent motifs:** Same flat pale gray behind the phone. The UI itself carries the same violet-to-yellow gradient as the type, tying screen and typography together.
- **Pacing:** ~0.75s. Only long enough to register "real product."
- **Mood/purpose:** Proof beat. Product glimpse, not read.

---

## Beat 3 — 1.75s–2.75s (short claim)
**Frames:** `shot02_mid`

- **Typography:** Single-line, centered, same gradient-filled sans, sentence case with a period. Smaller than Beat 1's headline.
- **Animation & transition:** Hard cut in from phone; static hold; no visible entry motion. Cuts by the next line replacing it (a new line begins at the same anchor height).
- **Layout & composition:** Centered horizontally, near vertical center-low. Extremely sparse; the line is well under half the frame width.
- **Background & accent motifs:** Same flat pale gray. A very faint residue of the previous beat's UI is barely perceptible in the upper area on the first frames (transition ghost), fading out.
- **Pacing:** ~1s hold. Punchy.
- **Mood/purpose:** Short, absolute benefit claim.

---

## Beat 4 — 2.75s–4.50s (two-line reveal)
**Frames:** `shot02_end`, `shot03_start`

- **Typography:** Two-line centered headline, same gradient fill. Line 1 appears first; line 2 fades in beneath it.
- **Animation & transition:** Line 1 appears at 2.75s. Line 2 fades in from near-transparent to full opacity across roughly 3.0s–3.6s (a soft opacity ramp, no motion or scale). Then a static hold until the cut to Beat 5.
- **Layout & composition:** Two lines stacked, centered, second line wider than the first; the block sits around the frame's vertical center.
- **Background & accent motifs:** Same flat pale gray.
- **Pacing:** ~1.75s. Line-by-line reveal makes a beat of setup then payoff ("Not even" → "hidden ones.").
- **Mood/purpose:** Punchline that extends Beat 3's claim.

---

## Beat 5 — 4.50s–6.00s (end card)
**Frames:** `shot03_mid`, `shot03_end`

- **Typography:** Dark near-black regular-weight sans (no gradient), centered single-line call to action under an app icon. Tiny mid-gray legal disclaimer block, three centered lines, at the bottom of the frame.
- **Animation & transition:** Icon and line fade in together, with the icon settling slightly (a small downward drift into place during the first ~0.25s; visible as a ~20px difference between `shot03_mid` and `shot03_end`). Hold to end.
- **Layout & composition:** Icon centered above the CTA line, both around vertical center. Disclaimer anchored at the bottom with narrow margins.
- **Background & accent motifs:** Same flat pale gray. The gradient disappears here: end card switches to neutral black type on gray, so the CTA reads as "utility" not "brand."
- **Pacing:** ~1.5s static hold. Slows the spot after four fast beats.
- **Mood/purpose:** Call to action plus required legal line.

---

## Cross-beat notes
- **One idea per beat, one type treatment.** Every headline beat is centered, gradient-filled, on the same background. Variety comes from line count and timing, not from styling.
- **Gradient as identity.** The violet → coral → amber ramp appears on type and inside the UI, so the palette carries the brand without needing a logo on every beat.
- **Rhythm:** ~1.0s, ~0.75s, ~1.0s, ~1.75s, ~1.5s. Fast cuts, then a small slowdown at the line reveal and end card.
- **No camera or physical world.** Nothing to anchor for live-action prompts. The reusable parts are type treatment, cut rhythm and the sparse centered layout.
