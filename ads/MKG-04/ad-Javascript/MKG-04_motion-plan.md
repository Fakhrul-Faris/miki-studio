# MKG-04 Motion Plan (HTML5 Canvas, 9:16)

Status: **draft v3 — Pulse idiom + Pulse's own visual/typographic language + a new locked script. Beat 1a built and approved-in-progress; everything else still to build, one chunk at a time.**

## Script v3 (final copy — replaces the VO-matched captions below)

Short, present-tense, fragment-style — matches Pulse's own register more than a narrated voice-over would. This is now the authoritative on-screen copy; a separate voice-over may or may not read it word for word (not decided yet).

| # | Line | Beat |
|---|---|---|
| 1 | "Your barber is great. Your queue is not." | 1a — Hook (**built**) |
| 2 | "Bookings buried in chats. Commissions on scrap paper. Nobody agrees on the numbers." | 1b — Problem (3-stage highlight, one beat) |
| 3 | "Meet Meikigo." | 2a — Brand sting |
| 4 | "Customers pick their barber." | 2d — Phone |
| 5 | "Pick a time, and book." | 2d — Phone |
| 6 | "No app to download." | 2d — Phone |
| 6.5 | "No POS terminal to buy." | 3a — Phone→tablet hand-off (new — makes explicit that everything runs on the phone, tablet and laptop they already own, no special hardware) |
| 7 | "One tap to check in." | 3b — Tablet |
| 8 | "One tap to get paid." | 3c — Tablet |
| 9 | "Every chair. Every barber. One screen." | 4a — Laptop/portal |
| 10 | "No more chasing commissions." | 4a — Laptop/portal (callback to line 2) |
| 11 | "From booking to payout in 5 minutes." | 4b — Tagline (locked brand claim) |
| 12 | "Sign up for free." | 4c — CTA (locked brand requirement) |

Line 6.5 and lines 9-12 are proposed, pending your confirmation; lines 1-6, 7 and 8 are confirmed. Line 6.5 is constructed to rhyme with line 6 ("No [thing] to [verb].") — one for the customer side (no app), one for the merchant side (no special hardware) — bookending the device hand-off from phone to tablet.

## Visual/typographic language — also now matched to Pulse, not just the motion

Beat 1a surfaced two more gaps between the plan and Pulse beyond pure motion technique, now fixed and carried forward as defaults for every future beat:

- **Typeface: Helvetica (Helvetica Neue / Helvetica / Arial fallback) everywhere**, not a system-font stack. Pulse's letterforms are a neutral grotesque, not the rounder SF/Inter look.
- **Background: pure black** for any beat that is pure kinetic type with no device UI on screen (matches Pulse's own hook/punch/pivot beats), not the off-white the `storyboard/` frames used. Device-UI beats (phone/tablet/laptop screens) still read light/white, matching the real product.
- **Per-word entrance: slide in from the right, not rise from below.** Each word settles into its final reading-order slot from a rightward offset, fast (~0.14s per word, ~0.08-0.09s between word starts) — this is now the default cascade for every caption in the piece, replacing the earlier bottom-up fade.
- **No decorative cards.** The pastel sticky-note ticket cards from `storyboard/` frame 01 are dropped entirely. Where a "proof" element is needed beside kinetic type, it's a small live-counting UI chip (flat accent-colour pill, white number, muted label) in Pulse's own register — not an illustrated card.

## How beat 1a actually works now (built, in `MKG-04_ad.html`)

- "Your barber is great." builds word-by-word, muted grey throughout (never goes bright — it's the aside, not the point).
- "Your queue is not." builds the same way immediately after, full white (the real point).
- A live chip appears, tied to the word "queue": counts 0 → 12 ("12 waiting right now"), Pulse's exact device — a UI element carrying proof, not a static graphic.
- The chip holds, then its own scale-up (not a camera) is the transition: it grows until it floods the full frame in the brand accent green, fading out the caption as it takes over. That flooded green frame is the hand-off point into beat 1b.

Rewritten from v1 after studying `reference-library/pulse/shots/shot_analysis.md` closely. The core change: v1 treated a **virtual camera** (push-in, pan, tilt, parallax) as the main source of motion, with captions as mostly-static per-scene labels. Pulse barely moves a camera at all — it gets its fast, organic feel from **word-by-word caption builds** and **UI elements that are themselves live** (numbers ticking up, chips filling, nav items highlighting), cut together quickly, with **shared-element transitions** instead of hard scene breaks. This version restructures MKG-04 the same way. See "What changed from v1" at the end for the specific swaps.


| Setting       | Value                                                                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Canvas        | 1080 x 1920 (9:16 vertical)                                                                                                                                                        |
| Runtime       | 30.0 s                                                                                                                                                                             |
| Parts         | 4 parts (kept for VO/reference grouping), each built from several short beats, ~1-3 s each                                                                                         |
| Tempo         | 120 BPM (one beat every 0.5 s). Every part boundary lands on a beat                                                                                                                |
| In-app brand  | GroomHaus (as in frames 08 to 13)                                                                                                                                                  |
| Product brand | Meikigo logo: a fast bare sting mid-piece (Part 2 opening) and the full version with tagline at the close (Part 4 end card) — the same bookend pattern Pulse uses for its own mark |
| Device style  | Realistic device frames (iPhone, iPad, laptop), as in frames 08 to 14                                                                                                              |
| Voice-over    | Not generated here. Use the VO windows below to time the separate recording                                                                                                        |




## How the motion works (replaces "How the camera works")

No virtual camera as the default. Four devices do almost all the work instead:

1. **Word-by-word (sometimes letter-by-letter) caption builds, everywhere, including the punchiest lines.** Nothing fades in as a whole sentence. A short line like "Meet Meikigo." still gets two steps, not one. Typical cadence: 0.2-0.4 s per word, slowing on the last word of a sentence to let it land.
2. **Live UI elements carry the proof while the caption is still building** — a number ticking up, a chip filling in, a queue counter flipping, a checkbox ticking, a nav item lighting up. The UI state change is timed to land on the exact word it supports, not just "around the same time."
3. **Shared-element transitions instead of hard cuts between ideas.** A tick becomes a status pill. A counted total becomes the next scene's number. The commission entry that just got written becomes the thing the fist closes on. Nothing says "and now the next scene" with a plain cut if there's a shape or value already on screen that can carry over.
4. **One recurring transition motif, reused at two tempos** — built from Meikigo's own folded-paper mark: a quick fold/unfold flash. Fast and bare the first time (Part 2 opening, a sting before any UI is shown), slow and complete with the tagline the second time (Part 4 end card). Same device, two different jobs — exactly how Pulse reuses its pulse-ring graphic.

**Camera moves are the exception, not the rule**, reserved for two specific jobs where Pulse itself doesn't need them but MKG-04's device-screen format does:

- **The macro dive** — a fast push into a device screen until it fills the frame, used as a transition into full-screen UI (phone confirmation tick, payment tick, portal total). This is a real MKG-04 device from the original brief and stays.
- **The device hand-off drift** — a small, quick settle (phone/tablet/laptop easing into frame), not a slow cinematic push. Under 0.3 s, more a landing than a camera move.

Every remaining "camera" note from v1 (slow push-ins, pans, tilts, parallax drift) is removed below in favor of the live-UI/caption treatment.

## Timeline overview


| Part                             | Time             | Length | Voice-over lines | Reference frames |
| -------------------------------- | ---------------- | ------ | ---------------- | ---------------- |
| 1. Hook and problem              | 0:00.0 to 0:07.0 | 7.0 s  | VO1, VO2, VO3    | 01 to 05         |
| 2. Meet Meikigo and booking      | 0:07.0 to 0:14.5 | 7.5 s  | VO4, VO5         | 06 to 11         |
| 3. Check in and get paid         | 0:14.5 to 0:21.0 | 6.5 s  | VO6              | 12 to 14         |
| 4. Every chair, tagline, sign-up | 0:21.0 to 0:30.0 | 9.0 s  | VO7, VO8, VO9    | new              |




## Voice-over timestamps (for separate generation)


| #   | Line                                       | Window                                               | Part |
| --- | ------------------------------------------ | ---------------------------------------------------- | ---- |
| VO1 | "your barber is great. your queue is not." | 0:00.2 to 0:02.6                                     | 1    |
| VO2 | "Bookings on WhatsApp."                    | 0:02.9 to 0:04.4                                     | 1    |
| VO3 | "Commissions on a scrap of paper."         | 0:04.7 to 0:06.7                                     | 1    |
| VO4 | "Meet Meikigo."                            | 0:07.4 to 0:08.6                                     | 2    |
| VO5 | "Customers book from their phone."         | 0:10.0 to 0:12.2                                     | 2    |
| VO6 | "You check them in. You get paid."         | 0:15.0 to 0:18.4 (pause after "in." at about 0:16.6) | 3    |
| VO7 | "You see every chair and every barber."    | 0:21.4 to 0:24.2                                     | 4    |
| VO8 | "From booking to payout in 5 minutes."     | 0:25.2 to 0:27.6                                     | 4    |
| VO9 | "Sign up for free."                        | 0:27.9 to 0:29.0                                     | 4    |


---



## Part 1: Hook and problem

**0:00.0 to 0:07.0 (7 s)** · VO1, VO2, VO3 · Frames 01 to 05

### 1a. Hook (0.0 to 2.8)

- **On screen:** frame 01's tickets, but the headline is now word-by-word instead of a static two-line card.
- **Caption build:** "Still" (0.00) → "Still running" (0.25) → "...running your shop" (0.5) → "...shop from" (0.8) → "...**from a notebook?**" (1.1), holds to 2.6. Per your note: the line renders **black** first and, about 1 s after the sentence completes (~2.1s), **fades to grey** — read as the line settling from an urgent statement into a tired, accepted fact.
- **Live UI element:** as "shop" lands (~0.5s), the three booking tickets (yellow/purple/cyan) pop in from three edges, 0.1s apart, each landing with a small bounce and overlap-stacking like a messy desk — not spinning in on a camera parallax, just popping in place.
- **Shared-element exit:** the tickets don't fly out past a camera push; instead they slide/stack toward one edge as a messy pile, which the next beat's chat list grows out of (the pile *becomes* the top of the chat stack).
- **Sound:** a paper flick on each ticket pop. A low pad starts under the caption.



### 1b. Chats (2.8 to 4.6)

- **On screen:** frame 02's chat list.
- **Caption build:** "Bookings" (2.8) → "Bookings on" (3.05) → "...**on WhatsApp.**" (3.35), holds.
- **Live UI element:** the chat list is already mid-stack when it cuts in (no slow build-in drift). As "WhatsApp" lands, the unread badge on the top row **ticks up live** (3 → 4 → 7) the way Pulse's lead counter does, and the 4th bubble pops in with "typing…" dots animating under it.
- **Shared-element exit:** the badge number itself is what dissolves/counts into the next beat's commission total, rather than a plain cut.
- **Sound:** a pop per bubble, a notification ping on each badge tick.



### 1c. Commissions and receipt (4.6 to 7.0)

- **On screen:** frames 03 to 05, commission slip then receipt.
- **Caption build:** "Commissions" (4.6) → "...on a" (4.85) → "...**scrap of paper.**" (5.15), holds.
- **Live UI element:** the commission sheet is already filled in except the last cell; exactly as "paper" lands, the last entry ("RM 560") **writes itself in, stroke by stroke** over about 0.4 s — a live "something is happening" beat, not a static reveal.
- **Shared-element transition:** the fist that closes over the sheet (existing scene beat) closes specifically over the entry that was just written — the thing we watched get written is the thing that gets crushed. A receipt then prints down and covers the crushed sheet; the receipt's printed total is the exact number that carries into Part 2 as the shared element the next scene needs (kept generic/placeholder for now).
- **Sound:** a quiet pen-scratch under the stroke-by-stroke write, paper rustle, printer whirr, a hard stop on the cut.

---



## Part 2: Meet Meikigo and the customer booking

**0:07.0 to 0:14.5 (7.5 s)** · VO4, VO5 · Frames 06 to 11

### 2a + 2b. "Meet Meikigo." — the fast sting (7.0 to 8.6)

- Collapses v1's separate "Meet" card and logo-reveal card into one faster beat, matching how Pulse's mid-roll "Meet Pulse" sting (its Beat 5) is bare and quick, not a lingering reveal.
- **Caption build:** "Meet" (7.0) → "**Meikigo.**" (7.35), holds briefly.
- **Recurring motif, fast version:** the folded-paper mark does one quick fold/unfold flash (under 0.5 s) as "Meikigo" lands — no slow panel-flip, no gradient flood spreading across the frame. It's a flash, not an establishing shot. Grey background throughout; no colour wash.
- **Sound:** one soft chime exactly on the fold-flash, not before it.



### 2c. Hand-off to the phone (8.6 to 10.0)

- **Motion:** the logo settles to the headline position (a quick settle, not a slow drift). The phone appears already mostly in place and does a small landing bounce rather than floating up from off-frame.
- **Sound:** a short whoosh under the landing bounce only (no sustained whoosh over a camera push, since there is no push).



### 2d. Booking flow (10.0 to 14.5)

- **On screen:** frames 08 to 11, five phone screens: services → **pick a barber** (new screen) → pick a time → review → confirm.
- **Caption builds, one per screen, word-by-word, each timed to finish as its screen's key tap lands:**
  - "Customers" → "...pick their" → "...**pick their barber**" (10.0-10.6)
  - "Pick a" → "...**time, and book**" (10.9-11.4)
  - "No app" → "...**to download**" (11.7-12.2)
- **Live UI element per screen:** each tap shows a finger-dot ripple and the tapped element (service card, barber avatar, time chip) does a quick fill/tick exactly as its caption word lands — this replaces v1's generic "button shrinks to 96%" with a state change that's specific to what's being tapped (a service gets a tick, a barber gets selected-ring, a time chip fills solid).
- **Shared-element transitions between screens:** each screen doesn't slide sideways under a moving camera; instead the just-tapped element (the ticked service, the selected barber ring, the filled time chip) is the thing that carries forward into the next screen's summary row — a visible thread of "what you just picked," building toward the confirm screen.
- **Macro dive (the one deliberate camera move in this part):** on "Confirm booking," the button presses and the camera does a fast push straight into the resulting tick until it fills the frame — under 0.5 s, not a slow 100%-to-112% drift.
- **Sound:** a tick per tap (pitched slightly differently per screen so the sequence has a rhythm), a soft ping on confirm, a short rising whoosh only during the dive itself.

---



## Part 3: Check in and get paid

**0:14.5 to 0:21.0 (6.5 s)** · VO6 · Frames 12 to 14

### 3a. Tick to tablet (14.5 to 15.2)

- **Shared-element transition:** the full-frame tick from Part 2's dive doesn't just shrink under a camera pull-back — it morphs directly into the tablet's "Checked in" status pill shape (same green, same tick glyph, now smaller and inside a chip). The tablet itself lands already mostly in frame with a quick settle, mirroring 2c.
- **Caption:** "One tap" → "...**to check in**" (14.6-15.0).
- **Sound:** a short whoosh under the morph only.



### 3b. Check-in (15.2 to 16.6)

- **On screen:** the tablet queue, 4 rows, the phone's booking at the top ("Haircut · 10:30," outlined "Booked").
- **Caption:** builds alongside the tap rather than before it — "Check" → "...**them in.**" (15.2-15.6).
- **Live UI element:** tap "Check in" — the status chip fills solid, the row slides to the top ("Now serving"), and the queue counter **flips live** from 3 to 2, each digit change timed to its own tick sound.
- **Sound:** a tick, then a ping, then a flip-click on the counter.



### 3c. Payment (16.6 to 19.4)

- **On screen:** headline continues: "You" → "...**get paid.**" (16.6-17.0). A payment sheet slides up.
- **Live UI element:** the amount **ticks up live** from RM 0.00 to RM 25.00 (already planned, kept — this is the one beat v1 already had right by Pulse's standard). A payment-method label appears as a quick fade, no slide-camera needed. Tap "Take payment" → the amount itself morphs into a tick circle (shared-element, not a separate tick appearing beside it) → chip reads "Paid."
- **Sound:** a slide, a counter tick synced to each digit change while it counts, a cash-register chime exactly on the morph into the tick.



### 3d. Hand-off to the laptop (19.4 to 21.0)

- **Shared-element transition:** the paid RM 25 tick doesn't lift off and get "followed by a camera" — it shrinks into a small coloured block that is already positioned where it needs to land, and the laptop's first column appears around it (the block was always going to be a column entry; the laptop just arrives to hold it). The tablet exits as a quick slide, not a camera pan away from it.
- **Sound:** a short whoosh on the shrink, a soft "plip" when the block settles into the column.

---



## Part 4: Every chair, tagline, sign-up

**0:21.0 to 0:30.0 (9 s)** · VO7, VO8, VO9 · New screens

### 4a. Portal (21.0 to 25.0)

- **On screen:** the laptop, front-on, the portal's "Today" page, 3 barber columns (Aiman, Raj, Wei).
- **Caption build:** "You see" → "every chair" → "...**and every barber.**" (21.0-21.8), building across the same window the blocks are dropping in, not finishing before they start.
- **Live UI elements:** appointment blocks drop in, 0.12 s apart, each a small bounce landing (kept from v1 — already Pulse-style). Column totals **tick up live** to RM 140, RM 105, RM 175. The top-right total **ticks up live** to RM 420 and pulses once it settles.
- **No camera pan.** Instead of "starts wide, pans left to right while pushing in," the columns are already framed to read in one static composition, and the blocks dropping in column-by-column (left to right, in time) create the left-to-right reading motion on their own — the same trick Pulse uses to make a static dashboard screenshot feel like it's moving (the data moves, not the frame).
- **Shared-element transition out:** the RM 420 total, once settled, is the thing that dives — it scales up and the brand-green colour floods outward **from its own position**, not from "the edges of frame" generically. The flood is the total becoming the next card's background, the same way Pulse's chip-chain slides directly into its logo mark.
- **Sound:** a soft tick per block (left column first, then middle, then right — audibly reinforcing the left-to-right read), a ping on the total settling, a rising whoosh only during the final flood.



### 4b. Tagline (25.0 to 27.6)

- **On screen:** the tagline card, now the colour-flooded teal-green from 4a (no hard cut into a separately-coloured card).
- **Caption build:** "From" → "...booking to" → "...**payout**" (25.0-25.6) → "in" → "...**5 minutes.**" (25.9-26.3), with a small ring around the "5" that fills like a timer exactly as the word lands — a live element doing the counting work, not a static graphic.
- **No camera push.** Locked off; the ring-fill is the only motion needed.
- **Sound:** the music lifts under the second half of the build.



### 4c. End card — the recurring motif, full version (27.6 to 30.0)

- **Caption build:** "Sign up" → "...**for free.**" (27.6-28.0) — the button pops in as the words land rather than after.
- **Recurring motif, slow version:** the same folded-paper fold/unfold from 2a plays again, now slow and complete — fold, unfold, settle, with the "Meikigo" wordmark building letter-by-letter beside it (not a single fade), then the URL fades in beneath. This mirrors Pulse's own pattern exactly: fast bare sting mid-piece, slow complete version at the close, same graphic both times.
- **Hold:** the logo holds for the last 1 s, fully still — the one deliberate stillness in the whole piece, earned by being the only beat that doesn't need to build anything further.
- **Sound:** the music resolves under the fold, one final chime exactly as the wordmark completes its last letter.

---



## What changed from v1 (Pulse-inspired rewrite)

1. **Camera moves removed except two**: the macro dive into a screen, and a sub-0.3s device landing-settle. Everything v1 assigned to push-in/pan/tilt/parallax is now done by a live UI element or a caption build instead.
2. **Every caption is now word-by-word**, including short lines ("Meet Meikigo.", "Stop"-style punchlines don't exist here, but the same discipline applies) — this answers your note on 1b directly, and is now the default for the whole piece, not just the chat beat.
3. **Shared-element transitions replace hard cuts** at every part boundary and most beat boundaries: tick → status pill, amount → paid-tick, total → colour flood, commission entry → the thing that gets crushed, confirm-tick → next scene's anchor shape.
4. **One recurring motif** (the folded-paper logo flash) now does the job Pulse's pulse-ring does: appears fast and bare mid-piece (Part 2 open), then slow and complete at the close (Part 4 end card) — same graphic, two tempos, bookending the ad the way Pulse bookends itself.
5. **Numbers and chips are drawn as already-live** wherever the script has a count (WhatsApp badge, commission entry, queue counter, payment amount, column totals, grand total) — nothing is a static graphic that a camera moves past.



## Points — resolved

1. **On-screen text vs voice-over — match the voice-over everywhere, same as Pulse.** Confirmed. Already done in this v2 rewrite: Part 1's captions are the VO lines themselves ("Still running your shop from a notebook?", "Bookings on WhatsApp.", "Commissions on a scrap of paper.") rather than the frames' own alternate copy ("Your notebook is not", "Bookings buried in chats"). No further change needed.
2. **Chat avatars — coloured initial circles, not real-looking faces.** Confirmed.
3. **Device arc — phone, tablet, laptop.** Confirmed: customer booking on the phone (Part 2), check-in + payment on the tablet (Part 3), the merchant portal on the laptop (Part 4).
4. **Prices — Haircut RM 25; portal totals RM 140 / 105 / 175, total RM 420.** Confirmed.
5. **URL for the end card — pending.** Keeping the "meikigo.com" placeholder until you confirm the real one.
6. **Screen source — pulled from the real product, now in testing, not redesigned from scratch.** See "UI assets needed from you" below — this replaces the old plan of hand-designing a "pick a barber" screen to match the frames' style.
7. **The** `storyboard/` **frames (01-14) are ideation only** — free to tweak, add to, or drop entirely, as long as the result delivers the same kind of result as Pulse. Noted; nothing in this plan is locked to matching those frames exactly anymore.



## UI assets needed from you

Point 6 changes how Part 2's booking flow and Part 3/4's tablet and portal screens get built: instead of me designing GroomHaus-style mockups from the `storyboard/` frames, I'll work from real exports of the actual product (in testing now), redrawn as canvas vector graphics so they can be animated frame-accurately — not pasted-in screenshots. Please send screenshots/exports (PNG or Figma links are both fine) for:

**Customer web booking (phone, Part 2d)**

- Service selection (the list of services with prices)
- Barber selection ("pick a barber" — this is the one screen with no real-product equivalent in the current `storyboard/` frames, so this is the one I most need)
- Time/date selection
- Review & confirm
- Booking-confirmed / success state

**POS (tablet, Part 3)**

- Today's queue/bookings list, showing the status-chip states (booked / checked-in / paid)
- The check-in action mid-state, if the real UI has a distinct one (vs. just a chip-fill)
- The payment screen (amount, method, "take payment")
- The paid/confirmed state

**Merchant portal (laptop, Part 4)**

- The "Today" dashboard view with barber columns, appointments, and per-barber earnings
- Any separate chair/barber-status view, if "every chair and every barber" is better shown by a screen other than the Today dashboard

Two things that'll affect how I use them:

- **Brand colour:** should I pull the real Meikigo accent colour from these exports, or keep the placeholder teal-green (`#0E9F7E`) from the earlier UI spec until the real brand colour is signed off?
- **On-screen data:** since this is the real product in testing, I'll assume any real shop/customer names, phone numbers, or amounts visible in the exports get swapped for the placeholder data already in this plan (GroomHaus, Aiman/Raj/Wei, RM 25 haircut, etc.) rather than reused as-is — flag me if any of those should change to match the real screens instead.

I won't build anything until you give the order, and even then — **one chunk at a time**, each one checked before the next starts. Default next chunk, once you say go: **Part 1 only.**

## Build order

- One HTML file with a single timeline. Each part is a separate module, so a change to one part never touches another.
- The file includes a preview bar: play one part alone or the whole ad, a scrubber to move through the timeline, and a mute button.
- Order: build **Part 1 only**, review and tweak, approve, then Part 2, and so on. Sound is added inside each part as it is built.

