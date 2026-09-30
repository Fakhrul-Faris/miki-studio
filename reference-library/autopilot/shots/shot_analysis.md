# Motion Design Analysis — "Autopilot" (~9.2s, 16:9, 736x414)

Source: `reference-library/autopilot/source.mp4` (originally `Motion Design/Autopilot (MD).mp4`)
Extracted via `tools/shot_extractor.py` (3 fixed-interval splits of 3.07s each — no real cuts detected). Re-derived into 5 beats from a 4 fps contact sheet plus spot frames. Beat times are accurate to ~0.25s.

**Reference use:** typography, animation/transition technique, layout, background/accent-motif and pacing DNA only. This is a product-feature ad (an email/calendar automation tool). Do not carry over the on-screen copy ("Auto Pilot", "Replies", "Follows Up", "Books Calls", "24/7"), the email/call/inbox UI content, names, or the card imagery. Describe UI generically (e.g. "a glassy rounded card scrolling a list").

**Style summary:** a single continuous UI-animation loop with no hard cuts. A toggle switch flips on, then a left-hand vertical word list highlights one word at a time while a rounded glass card on the right swaps and scrolls to show what that word means. Four features in ~8s, then the whole frame blurs out. Light, airy, product-UI-as-typography.

---

## Beat 1 — 0.00s–1.00s (toggle on)
**Frames:** `shot01_start`

- **Typography:** Small light-weight sans label ("Auto Pilot"), left of frame, vertically centered.
- **Animation & transition:** A pill toggle switches from off (gray track, white knob) to on (saturated blue track, knob slides right, soft gradient sweep across the track). A hand-pointer cursor rides the knob. The label fades to a slightly lighter weight/color as the switch turns on. Transitions into Beat 2 by the label swapping out for a list.
- **Layout & composition:** Label left, toggle center-right, both in one horizontal band at mid-height. Everything else in the frame is empty.
- **Background & accent motifs:** Pale cool-gray with a soft blue glow low in the frame (light horizon-like gradient). Blue is the single accent.
- **Pacing:** ~1s. Fast, a "press start."
- **Mood/purpose:** Establishes the action: one tap turns it on.

---

## Beat 2 — 1.00s–3.00s (feature 1)
**Frames:** `shot01_mid`, `shot01_end`

- **Typography:** Four-line left-aligned vertical stack, medium-large light sans. Active word is dark and slightly bolder with a small colored dot before it (blue). Inactive words are light gray. Text is aligned to one left edge.
- **Animation & transition:** The toggle vanishes and the list appears with the first word already active. The right-side card slides in from below with a slight scale-up, with iridescent glass panels layered on a photo-like colored backdrop. Card content (a chat/email thread) scrolls upward inside the card as new lines appear.
- **Layout & composition:** Two columns. List on the left third, card on the right third-to-half, vertically centered and tall (about 65% of frame height). Wide empty gap between them.
- **Background & accent motifs:** Same pale gray and blue glow. The card's backdrop is a soft teal/pink floral photo texture under frosted glass panels.
- **Pacing:** ~2s. Enough to see the card scroll once.
- **Mood/purpose:** First benefit demonstrated, not just named.

---

## Beat 3 — 3.00s–5.00s (feature 2)
**Frames:** `shot02_start`

- **Typography:** Same stack. Active word moves down one line; the dot changes to green; the previous word goes back to light gray.
- **Animation & transition:** The highlight moves in a quick snap (dark ↔ gray color change plus dot slide), not a fade. The card swaps content by scrolling up and out while the next card slides in beneath it with the backdrop changing to a green leaf texture. Continuous vertical motion, no cut.
- **Layout & composition:** Unchanged. Only the active state and card content move.
- **Background & accent motifs:** Green backdrop this beat. Each beat has its own backdrop hue and dot color.
- **Pacing:** ~2s, the same rhythm as Beat 2 (a steady metronome).
- **Mood/purpose:** Second benefit.

---

## Beat 4 — 5.00s–7.00s (feature 3)
**Frames:** `shot02_mid`, `shot02_end`

- **Typography:** Same stack, active word on line 3, green dot.
- **Animation & transition:** Card swaps as in Beat 3 (vertical push). Content becomes a compact list of stacked rounded rows, each a mini glass strip.
- **Layout & composition:** Unchanged.
- **Background & accent motifs:** Blue abstract wave/striped texture backdrop.
- **Pacing:** ~2s.
- **Mood/purpose:** Third benefit, the densest list so far.

---

## Beat 5 — 7.00s–9.22s (feature 4 + exit blur)
**Frames:** `shot03_*`

- **Typography:** Same stack, active word on the last line, dot now amber/orange. In the last ~0.5s the entire text stack blurs and scales up slightly.
- **Animation & transition:** Card swaps to a long inbox-style list on a purple-to-orange gradient backdrop, with a thin timeline ruler along the bottom of the card that scrolls horizontally. Final ~0.5s: whole frame gains heavy blur and a slight push-in, with the card's gradient shifting orange. This reads as the exit transition, an end-of-spot defocus.
- **Layout & composition:** Unchanged until the blur.
- **Background & accent motifs:** Purple-to-orange sunset gradient inside the card. The outer background stays pale gray.
- **Pacing:** ~2.2s. Longest hold, then a soft exit.
- **Mood/purpose:** The "always on" payoff, then out.

---

## Cross-beat notes
- **One static frame, one moving card.** The word list never moves position. Only the highlight state and the right-side card change, so the eye tracks one change per beat.
- **Color code:** each feature gets its own dot color (blue, green, green, amber) and its own card backdrop hue, so features feel different without changing layout.
- **Rhythm:** ~1s, then ~2s per beat, evenly spaced. Reads as a steady tick.
- **Glass card language:** frosted translucent panels with an iridescent edge over a colored texture. Reusable as a generic "premium UI card" look.
