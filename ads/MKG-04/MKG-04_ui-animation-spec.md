# MKG-04 UI animation spec (for Figma and After Effects)

Extends `MKG-04_ui-spec.md` (timings and sound cues stay there). This file gives the layout, copy, components, sizes and motion for the 12 UI stills and the three macro-dive plates. All content is placeholder.

## 1. Design tokens

| Token | Value |
|---|---|
| Font | Inter (or the brand font if you have one). Weights 400, 500, 600, 700. Tabular figures on all numbers (`font-feature-settings: "tnum"`) |
| Colours | Surface #FFFFFF, App background #F5F6F7, Ink #14181F, Muted ink #6B7280, Hairline #E5E7EB, Accent (brand colour, confirm) #0E9F7E as a stand-in, Accent tint #E6F6F1, Warn #F59E0B |
| Radius | Cards 20, chips 999, buttons 14 |
| Shadow | 0 4 16 rgba(20,24,31,0.08) on cards only |
| Spacing | 8 px grid, 32 px page margin |
| Motion | Ease-out cubic (0.22, 1, 0.36, 1), 300 to 400 ms moves; counts 700 ms; press feedback scale 0.96 and back, 120 ms, with a soft ring |
| Avoid | Pure #00B140 or any green close to the screen key colour. The accent #0E9F7E is a teal-green and is safe because the key is applied only to the footage, but stay away from #00B140 |

State chips (same across all three screens):
- **Booked:** outlined chip, accent outline, accent text.
- **Checked in:** filled accent chip, white text.
- **Paid:** filled accent chip with a white tick, white text.

Placeholder data used on every screen: shop name "Studio Cukur" (generic placeholder), customer initials "AH", barbers Aiman (AM), Raj (RJ), Wei (WE), service Haircut RM 35.00, slot 4:30.

## 2. Canvas sizes

| Screen | Hold canvas (face-on, 2x) | Dive plate (full frame at 1920 wide) |
|---|---|---|
| Phone | 1080 x 2340 | 1920 x 4300 (a tall strip) |
| Tablet | 2160 x 1620 | 1920 x 2800 |
| Laptop | 2880 x 1800 | 1920 x 2600 |

Why the plates are tall: in each dive the footage fills the 1920x1080 frame with the screen, and the camera glides upward. The plate is the UI scaled to the frame width and made tall enough to travel across during the dive.

## 3. Phone (customer booking)

Canvas 1080 x 2340, safe margin 54 px (5%).

### UI-P1: service list, nothing selected
- Status bar: 9:41, signal, battery, at the top, 48 px high.
- Header: shop name "Studio Cukur" (Inter 600, 56 px) at y=170, a small avatar circle (88 px) on the right.
- Title: "Book a visit" (Inter 700, 84 px) at y=330, subline "Choose a service" (muted, 40 px).
- Three service cards stacked from y=560, each 972 x 220, 28 px gap: **Haircut RM 35.00**, **Beard trim RM 20.00**, **Haircut and beard RM 50.00**. Each has a small icon on the left, the name (44 px, 600) and the price (right, 44 px, tabular).
- Primary button disabled at the bottom, "Continue", 972 x 140 at y=2060, muted fill.

### UI-P2: "Haircut" selected
- Same as P1. The Haircut card gets an accent outline (4 px), accent tint fill and a tick circle at its right. The other two cards dim to 60% opacity.
- Primary button becomes accent, label "Continue".
- Motion (P1 to P2, 0.5 s): the selected card scales 1.0 to 1.02 and back; the tick draws in (0.25 s); the other cards fade to 60%.

### UI-P3: time chosen
- The service list collapses to a single "Haircut RM 35.00" row at the top (y=330, 972 x 140).
- Below it: "Pick a time" (60 px 700) at y=560; a date strip "Today, Wed" at y=660.
- A 3-column grid of time chips from y=800, each 300 x 140: 3:30, 4:00, **4:30**, 5:00, 5:30, 6:00. The 4:30 chip is filled accent with white text; the rest are outlined hairline.
- Primary button: "Confirm booking" (accent).
- Motion (P2 to P3, 0.6 s): the service cards slide up and collapse (0.3 s), the chips stagger in from below (40 ms apart), 4:30 fills (0.2 s) with a tick.

### UI-P4: booked confirmation (dive end frame)
- Full-screen confirmation card, white, centred. A large accent circle (360 px) with a white tick at y=620. Under it "Booked" (Inter 700, 120 px), then "Haircut at 4:30" (52 px, muted), then a barber chip "Aiman" with initials AM (60 px circle).
- Motion: the "Confirm booking" button presses (scale 0.96, ring), morphs into the tick circle (0.4 s, ease-out), then the rest of the card fades up (0.3 s).

### Phone dive plate (1920 x 4300)
A tall composition of the confirmation and context, scaled so the width is 1920. Layout from bottom (start) to top (end), the camera travels upward:
1. Bottom: the time chips grid, chips flying past (large, 520 px wide).
2. Middle: the "Haircut RM 35.00" row, the date strip.
3. Top: the big accent tick circle (about 640 px) and "Booked" (200 px), the final hold.
Motion: Position Y of the plate moves from the bottom to the top (about 3000 px over 1.2 s) with ease-in-out; small chips are parallaxed 20% faster than the plate so they fly past. Hold the tick steady for the last 0.3 s.

## 4. Tablet (counter check-in and payment)

Canvas 2160 x 1620 (4:3), margin 108 px.

### UI-T1: queue, the booking is outlined
- Left rail 380 px wide: shop name, three nav items (Queue active, Bookings, Staff).
- Main area: title "Queue" (84 px 700) at y=160, a counter pill "3 in queue" at the right.
- Four rows from y=360, each 1500 x 180, 24 px gap: avatar initials circle, name, service, time, and a state chip on the right.
  1. "AH, Haircut, 4:30" with the **booked** chip (outlined).
  2. "SL, Beard trim, 4:45" with a booked chip.
  3. "MK, Haircut and beard, 5:00" with a booked chip.
  4. "JT, Haircut, 5:15" with a booked chip.

### UI-T2: checked in
- The first row's "Check in" button (appears on hover, accent) presses, the chip fills accent ("Checked in"), and the row slides to the top and gets an accent left border (8 px).
- The counter changes from "3 in queue" to "2 in queue" with a vertical flip (0.3 s).
- Motion (0.5 s): button press (120 ms), chip fill (0.2 s), row reorders (0.3 s), counter flip.

### UI-T3: payment card slides up
- A bottom sheet 1500 x 640 slides up (0.4 s) over the queue: "Payment" (60 px 700), amount "RM 35.00" (160 px 700, tabular, starting at RM 0.00), a method chip "Cash" (default), and a primary button "Take payment".
- A scrim darkens the queue behind it to 40%.

### UI-T4: paid (dive end frame)
- The amount sits at RM 35.00; the button presses and becomes a tick circle; the chip reads **Paid** (filled with a tick).
- Under the amount: two small line items "Haircut RM 35.00" and "Total RM 35.00" with a hairline above.

### Tablet dive plate (1920 x 2800)
From bottom (start) to top (end): the line items and the method chip; the amount counting to RM 35.00 (a huge 420 px numeral); the paid chip and a big tick at the top. Position Y travels about 1700 px over 1.4 s (ease-in-out). Receipt lines and small ticks parallax faster.

## 5. Laptop (merchant portal)

Canvas 2880 x 1800 (16:10), margin 144 px.

### UI-L1: portal "Today", empty
- Left rail 420 px: shop name, nav items Today (active), Barbers, Reports, Settings.
- Top bar: "Today" (88 px 700), a date, and a total counter on the right: "RM 0" (110 px 700, tabular) with "Total today" label.
- Three equal columns (about 760 px wide, 24 px gap) for the barbers. Each column header: a round initials avatar (110 px), the name (Aiman, Raj, Wei), and a footer with "Earned RM 0".
- Each column has an empty time grid: hourly rows (3, 4, 5, 6 pm) as hairline rows, 220 px apart.

### UI-L2: columns half filled
- Appointment blocks have fallen into the grid: Aiman 2 blocks, Raj 1, Wei 2. Blocks are rounded rectangles 700 x 180, outlined (booked) then filled accent (paid) with a tick. Each block shows the customer initials and the service.
- The column footers count up partially (RM 70, RM 35, RM 105).
- Motion: each block drops 120 px with a slight overshoot and fits into its slot (0.4 s), staggered by 120 ms, then the chip state goes outlined to filled to ticked.

### UI-L3: columns full (RM 140, RM 105, RM 175, total RM 420)
- All blocks placed. Footers: Aiman RM 140 (4 blocks), Raj RM 105 (3 blocks), Wei RM 175 (5 blocks).
- The top-right total counts to RM 420 and pulses (scale 1.0 to 1.06 and back).
- Note: these values are consistent: each service RM 35.

### UI-L4: the total close-up (dive end frame)
- A single large figure "RM 420" (about 520 px) centred on the portal background with "Total today" above it.
- The accent colour floods outward from the edges to a flat field in 0.4 s (use a radial wipe from the edges). The flat colour is the end-card colour.

### Laptop dive plate (1920 x 2600)
From bottom (start) to top (end): the three columns with blocks dropping in (the blocks fall into place during the glide), the footers counting up, then the total figure at the top. Position Y travels about 1500 px over 1.6 s (ease-in-out); blocks parallax 15% faster. In the last 0.6 s the camera dives into the total (scale 100% to 220%) and the accent colour floods the frame.

## 6. How the UI is handed over

Export from Figma as one frame per state (UI-P1 to UI-L4) plus the three dive plates, at the canvas sizes above, with components named so After Effects can animate them (cards, chips, numbers, tick, avatar). Numbers are live text (or exported as separate layers) so the count-up expression can drive them. See the AE guide for the expressions and the comp structure.

## 7. Checks

- [ ] Every state is readable at phone size (the largest text above 40 px at the canvas size)
- [ ] State chips look the same on all three screens
- [ ] The money values add up (35 per service; 140 + 105 + 175 = 420)
- [ ] No readable real brand names
- [ ] The accent colour confirmed with the brand
