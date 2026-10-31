# EX11 — The Price of a No-Show

Status: built 2026-10-31 → `export/EX11.mp4` (19.2 s). L06 reused from EX10 L07 ("Follow Meikigo for more.").
Voice: Nathan, narrator · U4 voice +10 % · music bed (E5 needs a beat)
Format: house cut-paper format; a **top-down** Blender paper clinic built with paperkit v2 (first episode on it)

Lane: The Number (calendar Day 9, P7) · Setting: **clinic** (new type; last three were supermarket, cinema, pricing)
Named concept: **The price tag reminder**

## The test stack (Day 9's slot)

| Group | Option | In this episode |
|---|---|---|
| H hook | **H4** wrong-on-purpose | "A REMINDER TEXT STOPS NO-SHOWS" stamped, ink strike through it inside 1 s |
| E edit | **E5** cut on the beat | Every cut lands on a music beat (2 beats per cut), not on the voice |
| C camera | **C3** top-down paper hands | Camera straight down on a paper desk and waiting room; paper hands do all the work |
| A animation | **A1** stop-motion 8 fps | Blender keyed on threes (8 fps) with paper boil |
| S structure | **S6** under 20 s | ~58 words, one idea |
| U sound | **U4** faster voice | atempo 1.10 on the voice |
| T text | ~~T2 no captions~~ → house subtitles | T2 dropped at plan (subtitles asked for on EX07, EX09) |
| Scr length | **L1** short (~58 words, <20 s) | |
| Bridge | off (clinic/salon/restaurant tie-in in the caption) | |
| CTA | **CTA-end** | "Follow Meikigo for more." |
| Ending | **END-callback** | Hook "stops no-shows? Barely." → "The reminder didn't stop no-shows. The price did." |

## Sources and the numbers

Hallsworth et al. (2015), "Stating Appointment Costs in SMS Reminders Reduces Missed Hospital Appointments: Findings from
Two Randomised Controlled Trials", PLOS ONE 10(9): e0137306 — https://doi.org/10.1371/journal.pone.0137306
(Behavioural Insights Team with Barts Health NHS Trust, London.)

- Trial 1: **10,111** outpatients, five specialties, Nov 2013–Jan 2014.
- Standard reminder: **11.1 %** missed (≈ **1 in 9**). Specific-costs message: **8.4 %** missed (OR 0.74, "around a quarter"
  fewer in relative terms).
- Specific-costs wording: "Your appointment costs the NHS approximately £161…" (2012–13 NHS tariff). Voiced as "about a
  hundred and sixty pounds".
- Trial 2 (9,848 patients): the exact figure (8.2 %) beat a general "costs the NHS money" message (9.9 %) — the number
  itself mattered. Caption/pinned comment only (no room in <20 s).

## Script — **L1** (~58 words, <20 s at +10 %), Bridge off, CTA end

| Line | Beat | Voice |
|---|---|---|
| L01 | Hook | A reminder text stops no-shows? Barely. |
| L02 | Stakes | A London hospital tested it. With the usual text, one in nine never came. |
| L03 | Twist | Then they added one line: "This appointment costs the NHS a hundred and sixty pounds." |
| L04 | Payoff | Missed appointments fell by a quarter. Same hospital. One extra line. |
| L05 | End | The reminder didn't stop no-shows. The price did. |
| L06 | Follow | Follow Meikigo for more. |

58 words (≈19 s at +10 %). Contradiction in the first breath ("Barely."); one physical detail (the one extra line on a phone); 3 numbers
(1 in 9, £160, a quarter); END-callback answers the hook in its own words.

## The edit (Blender top-down, paperkit v2, on threes; cuts on the beat)

| Shot | Line | What happens (camera straight down) |
|---|---|---|
| 1A | L01 | Frame 0, mid-move: a paper hand slaps a "A REMINDER TEXT STOPS NO-SHOWS" slip onto the reception desk; an ink strike draws through it (in-set `ink`) on "Barely." |
| 2A | L02 | Cut on the beat to the waiting room from above: rows of chairs filled with paper patients, one in every nine chairs empty; ink rings circle the gaps |
| 3A | L03 | Back on the desk: a paper phone; a hand slides a paper SMS bubble on, a second hand inks "£160" into it |
| 4A | L04 | Waiting room again: hands drop patients into a quarter of the empty chairs, stop-motion, one per beat |
| 5A | L05–L06 | The SMS bubble; "THE PRICE DID." stamped beside it; the bubble folds (`fold`) into the FOLLOW MEIKIGO card |

paperkit v2 use: both environments are generated top-down plates → `depth.py` → `shadowbox` (desk objects and chairs stand up
off the paper); patients and hands placed with `on_band`; a desk lamp `practical_light` lighting only the cut-outs; ink
strikes and rings drawn in-set.

## What to generate (environments first)

1. **Waiting-room plate:** a clinic waiting room from directly above: rows of empty chairs, floor, a plant (environment).
2. **Desk plate:** a reception desk from directly above: appointment book, pen, rubber stamp, desk lamp (environment).
3. **Cut-outs (top-down):** a seated patient seen from above (2 variants; I recolour more); a paper hand (flat, open); a hand holding a pen; a phone with a blank screen.
4. **Documentary photo:** a real hospital outpatient waiting area (for 2A's first beat, printed into ink and paper).
5. **Voice:** L01–L06.

## Post

Bridge is off in the video: the shop lesson (put the cost in your own reminder) lives in the caption and the pinned comment.

**Caption:**
```
A reminder text stops no-shows? Barely. 📱

A London hospital tested it on 10,111 patients. With the usual reminder, 1 in 9 still never came.

Then one version added a single line: "Your appointment costs the NHS approximately £161."

Missed appointments fell by about a quarter (11.1% → 8.4%). Same hospital. One extra line.

In a second trial, the exact number also beat a message that only said missing costs money, with no figure.

The reminder didn't stop no-shows. The price did.

#noshow #clinic #smallbusiness #salon #behavioraleconomics
```

**Pinned comment:**
```
Run a clinic, salon or restaurant? Put what a missed slot costs you into your reminder. DM "REMIND" and we'll help you set it up.
Source: Hallsworth et al. (2015), PLOS ONE 10(9): e0137306 — Behavioural Insights Team with Barts Health NHS Trust. Trial 1: 10,111 patients; standard reminder 11.1% missed, specific-cost message 8.4%. Trial 2: specific cost 8.2% vs general cost 9.9%.
```

- Turn on the AI-generated content label (generated stills and voice).
- Posted: _date_ · Link: _
- Results: fill the metrics table at 72 h.

## Build notes

- `build/prep.py`: the waiting room stretched to 9 rows × 4 = **36 seats** (rows 3–4 repeated, seams feathered), so 4 empty
  seats = 1 in 9 (11.1 %) and filling one leaves 3 = 8.3 % (trial: 8.4 %). Also the ink print of M1 and patient recolours.
- `build/clinic.py` (paperkit v2): DESK and ROOM, MASTER-aligned, rendered on threes; `build/holds.py` fills the held frames.
- Voice: `vo_tighten.py` → `audio/voice_1x.wav`, then atempo 1.1 → `audio/voice.wav`; `vo_timeline.json` is scaled to match.
- Music: Hip Hop Background V3 (100 BPM, 24 beats = 14.4 s) looped twice to cover 19.2 s; cuts every 2 beats (28.8 f).
- `build/run.sh overlay MASTER`, then `effectcraft-cli render … --comp MASTER`.
