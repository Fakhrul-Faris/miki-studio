# Motion Design Analysis — "Route line across a map" (~6s, 720×1280 vertical, 30fps)

Source: `source.mp4` (Pinterest download). A motion remake of a still image, credited on screen as
"Inspired by this PNG — YT~@DenshoProject". Music only.
Status: **draft — awaiting approval**

**Reference use:** Borrow the travelling line with the camera following it, the colour change at a
boundary, and the end-dot ripple. It's also our only **vertical 9:16** reference, so it shows how a
landscape diagram is framed for a phone. Do not carry over the map artwork or the creator's still.

**Style summary:** A light grey background with a grayscale painted/halftone map (mixed media), plus
one hand-drawn red marker line and one blue accent. The camera tracks the line's head across the map.

---

## Beat 1 — 0.00s–0.60s (line enters)
**Frames:** `contact_sheets/t000.jpg` row 1, frames 1–4
- **Typography:** none.
- **Animation & transition:** A thick flat blue line slides in from the left edge to the west coast.
- **Layout & composition:** The map is partly off-frame on the right. The line is at ~45% height.
- **Background & accent motifs:** Flat grey (#CFCFCF). The map is a grayscale texture with state lines.
- **Mood/purpose:** "Something is arriving."
- **Diagram grammar:** Blue = calm, outside the system.

## Beat 2 — 0.60s–1.50s (boundary → red wiggle)
**Frames:** `t000.jpg` row 1, frames 5–8
- **Animation & transition:** At the coastline the line changes to a red, hand-drawn oscillating
  stroke. The camera starts panning right and zooming slightly out, keeping the line's head
  near the centre.
- **Diagram grammar:** **Colour change at a boundary = the moment things go wrong.** The wiggle
  amplitude = how much turbulence.

## Beat 3 — 1.50s–4.00s (cross-country)
**Frames:** `t000.jpg` rows 2–3
- **Animation & transition:** The red line keeps drawing with large loops that slowly shrink as
  it moves east. Black city-skyline silhouettes sit along the southern band (mixed-media cutouts).
- **Pacing:** Steady. The camera follow is smooth with no stops.
- **Mood/purpose:** The journey or struggle, shown as a line's behaviour.

## Beat 4 — 4.00s–5.00s (arrival)
**Frames:** `t000.jpg` row 3, frames 5–8, `t003.jpg` row 1
- **Animation & transition:** The line ends at the east coast in a solid blue dot, which pulses two
  ripple rings outward, then holds.
- **Diagram grammar:** **Dot + ripple = "end point / here".** It's the same grammar as r06's arc pointer.

## Beat 5 — 5.00s–6.00s (credit card + end)
**Frames:** `t003.jpg` rows 1–3
- The original still is shown small with the credit "Inspired by this PNG". Then black.

---

## Techniques worth carrying into other builds
1. **The travelling line with a camera follow:** the line is the story and the camera rides its head.
   For us, this could be **the walk-in's path**: a calm blue line to the shop door, red and
   wiggling inside the queue, ending in a dot either at the chair or out the door.
2. **Colour change at a boundary** marks the exact moment the problem starts.
3. **Line behaviour carries meaning** (amplitude = stress or turbulence) without any text.
4. **Vertical framing:** the map is bigger than the frame and the camera pans across it, rather than
   shrinking the map to fit. This is how landscape diagrams should work in 9:16.

## Notes for EffectCraft (untested; to prove in step 5)
- Hand-drawn wiggle → a shape path with Trim Paths End animated, plus a wiggle-paths modifier for the
  hand-drawn feel (EffectCraft lists "wiggle" among its shape modifiers).
- Camera follow → parent everything to a null whose position follows the line's head (expression or keys).
- Colour change at a boundary → two path layers, or a gradient stroke with a hard stop.
