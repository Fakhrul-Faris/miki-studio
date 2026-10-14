# MKG-04 "From Booking to Payout" - v4.5 (clean consolidated script)

The earlier per-version notes are in `MKG-04_v4.4-archive.md`. This file is the single source of truth for timing, copy and voice-over. Production details: `MKG-04_segment-specs.md` (Seedance), `MKG-04_keyframes.md` (stills), `MKG-04_ui-animation-spec.md` (UI), `MKG-04_ae-build-guide.md` (After Effects), `MKG-04_checklist.md` (status).

```
MKG-04 v4.5 | Runtime 30 s | 16:9 master + 9:16 + 15 s cutdown | Voice-over: 1 woman, energetic | On-camera speakers: 0
Free to change in post: all on-screen text, voice-over, logo, tagline, CTA, URL, UI, music, SFX, trims.
Costs credits: any change to a generated clip.
```

## Brief

| Field | Value |
|---|---|
| Audience | Barbershop owners and barbers |
| Pain | Bookings, walk-ins and staff pay live in three disconnected places |
| Single message | One flow: book, check in, manage |
| Tone | Clean, rhythmic, confident |
| Look | Light neutral grey studio, real hands, real devices at a 3/4 angle, flat green screens replaced in post |
| Must include | Logo, tagline, end card, CTA "Sign up for free" pointing to the website (explicit override of the brand's no-CTA rule) |
| Must avoid | Religion and prayer times, ethnic stereotypes, named rivals, real people's likeness, readable third-party marks |
| Claims confirmed | "5 minutes", "free" |

## Master timeline (30 s)

| Time | Scene | What the viewer sees | Source |
|---|---|---|---|
| 0:00-0:03 | 1 Hook | Notebook page turns, a hand writes a name, phone number and booking number | Seedance N1 |
| 0:03-0:05 | 2 Problem | Chat bubbles stack up | Figma / AE |
| 0:05-0:06.2 | 3a Problem | A commission sheet lands, the hand writes the last salary | Seedance N2A |
| 0:06.2-0:07 | 3b Problem | The hand sets the pen down and closes its fist on the sheet, hard cut | Seedance N2B |
| 0:07-0:09 | 4 Intro | Logo reveal, "Meet Meikigo." | Figma / AE |
| 0:09-0:10.5 | 5a Phone | The phone floats into the open hand | Seedance S1 |
| 0:10.5-0:12 | 5b Phone | Hold; booking UI plays on the screen | S1 + UI-P |
| 0:12-0:14 | 5c Dive | Push into the screen; booking confirmation UI full frame | Seedance D1 + UI-P dive |
| 0:14-0:15 | 6a Reveal | Phone UI dissolves into tablet UI, camera pulls back to the tablet above two hands | Seedance R1 (reversed) |
| 0:15-0:17 | 6b Tablet | Tablet floats into both hands, camera arcs to front-on; check-in UI plays | S2 + UI-T |
| 0:17-0:19 | 6c Dive | Push into the screen; payment UI full frame | Seedance D2 + UI-T dive |
| 0:19-0:20.2 | 7a Reveal | Tablet UI dissolves into portal UI, camera pulls back to the laptop | Seedance R3 (reversed) |
| 0:20.2-0:22.6 | 7b Laptop | A fingertip pulls the laptop closer, then rests on the trackpad; portal UI plays | S3B + UI-L |
| 0:22.6-0:25 | 7c Dive | Push into the screen; columns fill, total counts, colour floods | Seedance D3 + UI-L dive |
| 0:25-0:30 | 8 End card | Tagline, CTA, logo, URL | AE |

Runtime check: 3+2+1.2+0.8+2+1.5+1.5+2+1+2+2+1.2+2.4+2.4+5 = 30.

## Scenes

### Scene 1 | 0:00-0:03 | Hook
- ACTION: Top-down on an open notebook, its right page lifted mid-turn. The page settles and a right hand holding a pen writes three short lines in dark blue ink: a name, a phone number, a booking number (placeholders: Aiman, 012-345 6789, Booking #12).
- CAMERA: locked off, straight top-down. TRANSITION OUT: hard cut on the beat.
- SOUND: page flip, pen scratch. TEXT: "Still running your shop from a notebook?"

### Scene 2 | 0:03-0:05 | Problem
- ACTION: A glossy chat bubble pops in at centre, three more stack on it in different tints, the last one shows typing dots.
- CAMERA: locked off; each pop overshoots slightly, the stack rises. TRANSITION OUT: hard cut on the fourth pop.
- SOUND: pop, pop, pop, pop. TEXT: "Bookings on WhatsApp."

### Scene 3 | 0:05-0:07 | Problem
- 3a: a commission sheet (Barber / Customers / Salary; Aiman 12 RM 480, Raj 9 RM 360, Wei 14 RM 560) lands flat, the hand writes the last salary entry.
- 3b: the hand sets the pen down and closes its fist on the sheet. Hard cut to scene 4 on the crush. The finished ball is never shown.
- CAMERA: locked off, top-down. SOUND: paper rustle, the crush. TEXT: "Commissions on a scrap of paper."

### Scene 4 | 0:07-0:09 | Intro
- ACTION: The logo mark scales in at centre and settles. A slow 3% push-in. The logo lifts out as the phone clip begins.
- SOUND: one soft chime on the settle. TEXT: "Meet Meikigo."

### Scene 5 | 0:09-0:14 | Customer books (phone)
- 5a/5b: the phone floats into the open hand, grip settled by 1.5 s, then holds. Camera locked off, high 3/4 view. UI-P1 to UI-P3 play on the green screen (service, time, confirm).
- 5c: the camera pushes into the screen until it fills the frame, then glides upward over the UI. The booking confirmation card plays full frame.
- SOUND: whoosh as it floats in, a tick per UI change, a rising whoosh through the dive. TEXT: "Customers book from their phone."

### Scene 6 | 0:14-0:19 | You check them in, you get paid (tablet)
- 6a: the phone UI dissolves into the tablet UI at full frame, then the camera pulls back out of the tablet screen to reveal the tablet above two open hands. No morph.
- 6b: the tablet floats into both hands, the camera arcs from 3/4 to front-on landscape. UI-T1 to UI-T2: the booking checks in, the queue ticks 3 to 2.
- 6c: push into the screen; the payment card full frame, RM 35.00 counting up, ending on a paid tick.
- SOUND: soft whoosh on the reveal, a counter chime on the payment. TEXT: "You check them in. You get paid."

### Scene 7 | 0:19-0:25 | You see every chair and barber (laptop)
- 7a: the tablet UI dissolves into the portal UI at full frame, the camera pulls back out of the laptop screen to reveal the laptop on the desk.
- 7b: a fingertip hooks the laptop's front-right corner, pulls it about 10 cm closer, then moves to the trackpad and rests, pressing nothing. UI-L1 to UI-L2 play.
- 7c: push into the screen; the columns fill, the earnings count to the total RM 420, the camera dives into the total, its accent colour floods the frame into the end-card colour.
- SOUND: whoosh on the reveal, a soft ping as the totals land. TEXT: "You see every chair and every barber."

### Scene 8 | 0:25-0:30 | End card
- 0:25-0:27.5 "From booking to payout in 5 minutes."
- 0:27.5-0:29 "Sign up for free."
- 0:29-0:30 logo, then the website URL beneath (added in post).
- Flat colour card from the colour flood. Each state eases in with a small upward drift. Music resolves on the logo; one chime.

## Voice-over (post)

Woman, energetic, bright and smiling, quick but clear, neutral English accent unless you choose otherwise. Record one take per line with 0.3 s of room at the head. Times below are the target landing windows on the master timeline.

| Scene | Window | Line | Words | Delivery |
|---|---|---|---|---|
| 1 | 0:00.1-0:02.9 | "Still running your shop from a notebook?" | 7 | Playful, a lift on "notebook" |
| 2 | 0:03.1-0:04.8 | "Bookings on WhatsApp." | 3 | Quick, slightly exasperated |
| 3 | 0:05.0-0:06.9 | "Commissions on a scrap of paper." | 5 | Brisk, a half-laugh on "scrap" |
| 4 | 0:07.2-0:08.4 | "Meet Meikigo." | 2 | Brightest line, a clear pause before it |
| 5 | 0:09.3-0:11.9 | "Customers book from their phone." | 5 | Smiling, easy |
| 6 | 0:15.2-0:17.8 | "You check them in. You get paid." | 7 | Two quick beats, a short pause between |
| 7 | 0:20.3-0:24.5 | "You see every chair and every barber." | 8 | Rising, confident |
| 8 | 0:25.1-0:27.5 | "From booking to payout in 5 minutes." | 7 | Warm, steady, on the beat |
| 8 | 0:27.7-0:29.0 | "Sign up for free." | 4 | Friendly, upbeat |

Total 48 words, about 1.6 words per second. Densest: scene 8 tagline (about 2.9 wps), scene 1 (2.6), scene 3 (2.6). Keep a clean fast take of each. Keep the two reveals (6a, 7a) free of voice so the SFX and the UI dissolve have room. Duck the music under the voice and lift it on the logo.

Polish notes (your call, all free in post):
1. Scene 7 is the longest line. A shorter option is "You see every chair, every barber." (6 words) if the delivery sounds rushed.
2. Scene 6's pause between "in." and "You" should land on the transition from the check-in to the payment card.
3. If the tagline reads too fast, let the colour flood start at 0:24.8 so the end card has a head start.

## Cutdown 15 s (re-edit of the same footage)

Scene 1 hook 2.0 + phone float and hold 2.0 + D1 1.5 + S2 1.5 + D2 1.5 + S3B 1.5 + D3 2.0 + end card 3.0 = 15.0. Drops scenes 2 to 4 and both reveals. VO: hook, the three product lines, tagline, CTA.

## 9:16 reframe

The devices are centred in every clip, so the crop holds for the phone and laptop. The tablet clip (scene 6) is landscape and loses its edges in a vertical crop: scale it down to fit the width and fill the space above and below with the grey backdrop and the headline text. Notebook and sheet clips (top-down) crop to the centre.

## Flags

1. Hand continuity across all clips (same right hand, the left hand only in the tablet clips).
2. Green spill on hands and sleeves; glass glare must read as real.
3. Macro dives are 1280x720 sources: scaling past 100% softens them. Mask the corner badge on every clip.
4. D1 to D3 push-ins arrive late; retime them in post (see the AE guide).
5. Rule check: hook inside 3 s (Pass), product shots 3 (Pass), no dialogue (Pass), CTA present by instruction (Pass with flag), flat end card with logo last (Pass).

## Alternate hooks and taglines

Hooks: (1) "5 minutes." with a stopwatch counting up; (2) a phone buzzing with notification chips (extra render).
Tagline chosen: "From booking to payout in 5 minutes." Others: "One shop. One flow." / "No empty chairs. Not anymore."
