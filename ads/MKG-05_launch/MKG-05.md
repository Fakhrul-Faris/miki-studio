# MKG-05 "One app for your shop": launch video for leads (v1 draft)

```
MKG-05 v1 | ~20 s | 9:16 master + 1:1 copy | English | Voice: Nathan (the user, ElevenLabs v3) | built in raea (no Seedance, no After Effects)
```

## Brief

| Field | Value |
|---|---|
| Who sees it | Warm leads you message directly (WhatsApp first): **barbershop and salon owners** |
| Job | In 20 s the owner knows what Meikigo does and how it helps their shop, then replies |
| Pain | Bookings, walk-ins and staff pay live in three places: a notebook, WhatsApp, a commission sheet |
| Single message | One app: customers book, walk-ins queue, staff pay adds up by itself |
| Claims confirmed (MKG-04) | "5 minutes" (setup), "free" (sign-up) |
| CTA | **Reply "DEMO"** (in the chat the video arrived in) |
| Look | Style D motion: 80 % the real app (rebuilt from the user's screen recording), 20 % physical (notebook, phone, tablet, laptop; a barber chair and a salon dryer so both kinds of shop see themselves). No people. Signature sound C on the logo |
| Must avoid | Named rivals, real customers' names or data, readable third-party marks, claims not in the confirmed list |
| Works on mute | Every line on screen as text; hook on frame 0 (WhatsApp shows a still before play) |
| Delivery | 9:16 + 1:1, under 16 MB (WhatsApp plays inline), cover = the hook frame |

## Script v1 (≈ 50 words, ≈ 20 s) — for ElevenLabs v3

| L | On screen | Voice text (paste as is) |
|---|---|---|
| L01 | Still running your shop from a notebook… and WhatsApp? | [tired] Still running your shop from a notebook… and WhatsApp? |
| L02 | Meet Meikigo. Bookings, walk-ins and commission, in one app. | [warm] Meet Meikigo. Bookings, walk-ins and commission — in one app. |
| L03 | Customers book themselves. | [confident] Customers book themselves. |
| L04 | Walk-ins join a live queue. | Walk-ins join a live queue. |
| L05 | Every commission adds up on its own. | And every commission adds up… on its own. |
| L06 | Set up in 5 minutes. Free to start. | [upbeat] Set up in five minutes. Free to start. |
| L07 | Reply DEMO to see it in your shop. | Reply "demo"… to see it in your shop. |

## Shot list v1 (9 setups · ~21 s · cut on the word, Style D: a new camera setup every 1.5–3.5 s)

Status: script approved 2026-11-14 ("Free to start" ✅, feature name "commission" ✅). Brand green #38CE87 (logo).
Placeholder UI until the recording arrives; final UI is rebuilt from `rec/`.

| S | Time | Words | Kind | Camera | What happens |
|---|---|---|---|---|---|
| 1 | 0–1.4 | "Still running your shop from a notebook…" | physical | top-down macro, slow push + 4° roll, already moving at frame 0 | an open booking notebook, rows of names and times crammed in, two crossed out, a pen rolling to a stop |
| 2 | 1.4–2.6 | "…and WhatsApp?" | physical + UI | same set, pull up and tilt | chat bubbles stack over the page one per beat (generic chat, no WhatsApp logo); a phone beside it buzzes, unread badge counts 9 → 23 |
| 3 | 2.6–4.0 | "Meet Meikigo." | physical → UI | push down onto the phone | the notebook flips shut; the phone screen clears to the Meikigo logo (green #38CE87), sound-free |
| 4 | 4.0–5.2 | "Bookings, walk-ins and commission, in one app." | UI | slow glide | three chips land around the phone, one per word: Bookings · Walk-ins · Commission |
| 5 | 5.2–8.5 | "Customers book themselves." | phone → UI dive | push into the phone, then full-frame UI with a second framing | customer side: service list → "Haircut" → time chip 4:30 → "Booked" card |
| 6 | 8.5–12.0 | "Walk-ins join a live queue." | tablet → UI dive | 3/4 on the reception tablet, dive | shop side: live queue; a walk-in joins as #4, numbers shift, the 4:30 booking checks in (chip fills) |
| 7 | 12.0–15.5 | "And every commission adds up… on its own." | laptop → UI dive | push past a salon counter into the laptop | owner side: commission today; each staff row fills, RM 140 · 105 · 175 count up, total RM 420 floods green |
| 8 | 15.5–18.0 | "Set up in five minutes. Free to start." | UI | locked, scale push | a ring runs to "5 min", then "Free to start" lands beside it |
| 9 | 18.0–21.0 | "Reply 'demo'… to see it in your shop." | UI → end card | glide | a chat reply bubble types D-E-M-O and sends (double tick), then the Meikigo logo + sound C |

Physical set: a warm salon/barber reception counter (wood + stone), a booking notebook, phone, tablet, laptop; a barber chair and a
salon hood dryer in soft background bokeh (S6–S7) so both kinds of shop see themselves. No people.
Test shot: **S7** (`build/test_s7`), placeholder commission UI, to show the device → UI dive and the counting.

## What to record (screen recording, demo data only)

1. **Phone, customer side:** open the shop's booking page → pick a service → pick a time → the confirmation.
2. **Tablet or phone, shop side:** the queue / today's list → add a walk-in → check someone in.
3. **Laptop, owner side:** the staff pay / commission page with a few staff and amounts.
4. Anything you consider the "wow" screen I haven't listed.

Use a demo shop (no real customer names or phone numbers). Portrait or landscape both fine; record slowly, one action at a time.
Drop the files in `ads/MKG-05_launch/rec/`.
