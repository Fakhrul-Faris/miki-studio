# MKG-04 UI beat spec (v4.4, Figma layers composited onto the generated clips)

Three screens, one per device clip. The device clip shows the arrival and a short hold. The full-frame macro dive is where the UI flow is actually read, so it gets the longest slot. Times are on the 30 s ad timeline and match `MKG-04.md` v4.2.

## Shared rules

- **One visual language across all three screens.** One clean sans with tabular figures, rounded cards, generous padding, one accent colour (the brand colour) on a light neutral screen.
- **Booking state colours repeat on every screen:** *booked* = outlined chip, *checked in* = filled chip, *paid* = filled chip with a tick.
- **Easing:** ease-out, 0.3 to 0.4 s per move. Number counts run 0.6 to 0.8 s. Press feedback is a quick scale to 0.96 and back with a soft ring.
- **Content is placeholder and generic:** a placeholder shop name, initials for barbers and customers, no real names or brand marks. Money is in RM.
- **Render each UI on its own,** flat and face-on, at 2x the device screen resolution and at the frame rate of the Seedance clips. Pin it in perspective in the composite. Keep a 5% safe margin inside the screen.
- **No UI on the screen while the device floats in.** Fade the UI in during the last 0.3 s of the settle.
- **Seedance never sees a UI.** The device keyframes stay flat green. The UI keyframes below are a separate post layer.

## UI keyframe stills (design these first)

Twelve flat, face-on stills at 2x screen resolution. They are the UI storyboard and the source frames for the animation. Name them as below.

| ID | Screen | State shown |
|---|---|---|
| UI-P1 | Phone | Service list, nothing selected |
| UI-P2 | Phone | "Haircut" selected |
| UI-P3 | Phone | Time chips shown, "4:30" selected |
| UI-P4 | Phone | "Booked" confirmation card (the macro dive end frame) |
| UI-T1 | Tablet | Queue list, the 4:30 booking outlined ("booked") |
| UI-T2 | Tablet | The booking checked in (filled chip), queue counter at 2 |
| UI-T3 | Tablet | Payment card showing RM 35.00, the paid chip not yet filled |
| UI-T4 | Tablet | Payment card with the "paid" tick (the macro dive end frame) |
| UI-L1 | Laptop | Portal "Today": three barber columns, empty grids, total at RM 0 |
| UI-L2 | Laptop | Columns half filled with blocks, earnings partly counted |
| UI-L3 | Laptop | Columns full, earnings RM 140, 105, 175, total RM 420 |
| UI-L4 | Laptop | Close-up on the total figure, accent colour filling outward (the macro dive end frame) |

## Screen 1: phone (customer booking), scene 5

Screen: portrait, about 9:19.5. Hold 0:10.5 to 0:12, macro dive 0:12 to 0:14.

| Time | What happens | Detail | Sound cue |
|---|---|---|---|
| 0:10.2 | UI fades in as the phone settles | UI-P1: shop header (placeholder name), service list: Haircut, Beard trim, Haircut and beard | soft chime |
| 0:10.5-0:11.0 | Select the service | UI-P2: "Haircut" highlights with the accent colour and a tick; the others dim | tick |
| 0:11.0-0:11.6 | Pick a time | UI-P3: date strip shows "Today"; three time chips (4:00, 4:30, 5:00); "4:30" fills and ticks | tick |
| 0:11.6-0:12.0 | Confirm | A "Confirm booking" button presses and turns into a tick | soft ping |
| 0:12.0-0:14.0 | **Macro dive 1** | Cut at full frame to the confirmation card. The camera travels bottom to top across the card: the big tick, "4:30", the service line, a barber chip with initials. Time chips and icons fly past the lens. Land on UI-P4 and hold it steady for the last 0.3 s | rising whoosh |

## Screen 2: tablet (counter check-in and payment), scene 6

Screen: landscape, about 4:3. Hold 0:16 to 0:17, macro dive 0:17 to 0:19.

| Time | What happens | Detail | Sound cue |
|---|---|---|---|
| 0:14.3 | UI-T1 is already on the screen (it came from the R1 dissolve) and stays through the reveal and the grip | UI-T1: a queue list of four rows with initials, times and state chips; the 4:30 booking is an outlined chip | soft chime |
| 0:16.0-0:16.5 | Check in | The 4:30 row's button presses; the chip fills (UI-T2); the row slides to the top; the queue counter ticks 3 to 2 | tick, then ping |
| 0:16.5-0:17.0 | Payment begins | A payment card slides up (UI-T3) | slide |
| 0:17.0-0:19.0 | **Macro dive 2** | Cut at full frame to the payment card. The amount counts to "RM 35.00" over 0.8 s. The camera travels bottom to top across the amount, the method chip and the line items; receipt lines and tick marks fly past. The "paid" chip fills with a tick. Land on UI-T4 and hold it steady for the last 0.3 s | counter chime, rising whoosh |

## Screen 3: laptop (merchant portal), scene 7

Screen: landscape, about 16:10. The laptop lands at 0:20.2 (end of clip M2) and is moved by the finger from 0:20.2 to 0:22.6 (clip S3B), so the UI plays on a screen that moves slightly; track it. Macro dive (clip D3) 0:22.6 to 0:25.0.

| Time | What happens | Detail | Sound cue |
|---|---|---|---|
| 0:20.0 | UI fades in as the laptop lands | UI-L1: portal header "Today", three barber columns each with a round initials avatar and an empty time grid; a total counter at the top right at RM 0 | soft chime |
| 0:20.4-0:21.8 | Appointments drop in | The first blocks fall into the columns and fit (UI-L2); each block goes outlined, then filled | a soft tick per block |
| 0:21.8-0:22.6 | The columns fill | More blocks fit; each column footer starts counting up | ticks |
| 0:22.6-0:25.0 | **Macro dive 3** | Cut at full frame. The remaining blocks drop into place and the earnings finish counting (RM 140, 105, 175, UI-L3). The total counts to RM 420 and settles with a small pulse. The camera travels across the columns and dives into the total (UI-L4). As the digits fill the frame, the accent colour floods outward from the edges to a flat colour field | soft ping, rising whoosh |

## Hand-off frames to lock

| From | To | Frame that must match |
|---|---|---|
| Hold clip S1 | Macro 1 | The push-in ends with the screen filling the frame, face-on; the first UI frame sits at the same scale |
| Macro 1 | R1 pull-back reveal (phone UI to tablet UI) | The last macro frame is UI-P4, steady; at full frame it dissolves into UI-T1 in the first 0.3 s of R1, then the camera pulls back out of the tablet screen to reveal the tablet above two open hands with UI-T1 on its screen |
| Hold clip S2 | Macro 2 | Same rule as S1 |
| Macro 2 | R3 pull-back reveal (tablet UI to laptop UI) | The last macro frame is UI-T4, steady; at full frame it dissolves into UI-L1 in the first 0.3 s of R3, then the camera pulls back out of the laptop screen to reveal the laptop on the desk with UI-L1 on its screen |
| Hold clip S3 | Macro 3 | Same rule as S1 |
| Macro 3 | End card | The colour field matches the end-card background exactly |

## Deliverables to build

1. Twelve UI keyframe stills (the table above).
2. Three UI hold animations on the device screens (flat, face-on, 2x screen resolution).
3. Three full-frame macro-dive UI animations, made to sit under the generated D1, D2 and D3 clips' glass reflections (key the green, put the glare over the UI).
4. The two rotate-and-morph sequences, built from the device assets.
5. A sound-cue list from the tables above, for whoever builds the SFX.
