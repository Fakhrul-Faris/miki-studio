# EX01 — The airport that made people walk further

Lane: Psychology of Waiting
Hook pattern: the backwards fix
Named concept: **the Wait Tax**: the empty minutes, not the long ones
Lands on (Meikigo problem): walk-ins who can't see their wait leave → a visible queue
Status: **script approved 2026-10-27** → voice (Paige, `NDTYOmYEjbDIVCKB35i3`) → mixed media → build

## Sources

- The airport hired more baggage handlers, so the average wait fell to about 8 minutes, but complaints continued.
  Passengers walked about 1 minute to baggage claim, then waited about 7 minutes at the carousel. The airport moved
  arrival gates away from the main terminal and routed bags to the outermost carousel, so passengers walked about
  six times longer. "Complaints dropped to near zero."
  Alex Stone, "Why Waiting Is Torture", *The New York Times*, 18 Aug 2012, reprinted by APS:
  https://www.psychologicalscience.org/news/why-waiting-is-torture.html
- The article says "a Houston airport" without naming it, so the script doesn't name one either.
- No other numbers are used. The shop beat is illustrative and labelled as such, not data.

## Script (≈130 words, ≈55s)

| Line | Beat | Voice | Visual (diagram + mixed media) |
|---|---|---|---|
| L01 | Hook 0–3s | An airport in Houston fixed its complaints… by making people walk further. | EX00 opening (complaint burst → "walk further" + blue arrow tile). Under the burst: **M1** carousel photo, desaturated, shrinking into the hub tile (reality → dot, D01) |
| L02 | Setup 3–14s | Passengers were angry about waiting for their bags. So the airport hired more baggage handlers. The wait dropped to eight minutes. The complaints didn't. | **M1** full-bleed, "COMPLAINT" chips pop over it → it shrinks into a card. A big light numeral counts down to "8 min"; a "Complaints" line stays flat and high (D10 same speed, different slope) |
| L03 | Guess 14–18s | Most people would say… still not fast enough. | Slot sentence: "Still not [fast enough]?" with dashed underline; the slot word strikes through (D15 strike-and-swap) |
| L04 | Reveal 18–35s | But look at those eight minutes. One minute walking. Seven minutes standing at the belt… doing nothing. So they moved the arrival gates further away. People now walked six times longer. Complaints dropped to almost zero. The bags took the same time. The waiting just stopped feeling empty. | EX00 card: Walking (blue) / Standing (green) bars, giant "7". Then **M2** corridor clip in a rounded frame; the walking bar stretches ×6 while the standing bar shrinks. Zoom + arc pointer → "The waiting stopped feeling empty." |
| L05 | Turn 35–47s | Now picture your shop. On a Saturday. Five people on the bench… watching the chairs. Asking how much longer. | Zoom-through to brown. **M3** barbershop photo behind the day list, dimmed. The bench row of customer tiles, then the "How much longer?" bubble |
| L06 | Takeaway 47–55s | It's not the minutes they hate. It's the empty minutes. That's the wait tax. What does your shop do about it? | "The Wait Tax" built big, with a green highlighter swipe (D12). The −1 customer walks out. End on the question |

Word count: 133. If L04 runs long when voiced, cut "The bags took the same time."

## Voice direction (ElevenLabs: Paige, engaging narrator, `NDTYOmYEjbDIVCKB35i3`)

Calm, low, unhurried documentary narrator. Export one file per line, ~0.3s silence at both ends: `audio/L01.mp3` … `audio/L06.mp3`.
- **L01:** pause at "…"; land "walk further" as the twist.
- **L02:** matter-of-fact. Let "The complaints didn't." stand alone.
- **L03:** a slight smile in the voice; pause before "still not fast enough".
- **L04:** slower on "Seven minutes standing at the belt… doing nothing." Lift on "Complaints dropped to almost zero."
- **L05:** quieter, closer. A beat after "On a Saturday."
- **L06:** slow and certain. A small pause before "That's the wait tax." The question is light, not salesy.

## Mixed media (generate after the script is approved)

Seedream for stills, Seedance for 3–5s clips. All generic: no airline logos, no real airport signage, no identifiable people.

| ID | Use | Type |
|---|---|---|
| M1 | Baggage carousel, people standing idle | Seedream still → Seedance slow push-in |
| M2 | Long airport corridor, people walking with luggage | Seedance clip |
| M3 | Malaysian neighbourhood barbershop on a Saturday, customers waiting on a bench | Seedream still (optional Seedance parallax) |

**M1, still:** Documentary photo, airport baggage claim hall, a stationary conveyor belt with no bags yet, a loose crowd of 15 travellers standing and waiting with trolleys, some checking phones, one checking a watch, bored posture, flat overhead fluorescent light, muted colours, shallow depth of field, 35mm film grain, no logos, no readable signage, vertical 9:16.

**M1, Seedance:** Slow push-in toward the empty belt, people barely moving, one person shifts weight, another glances at the belt. Static mood, no cuts, 5 seconds.

**M2, Seedance:** Documentary shot down a long, bright airport corridor, travellers walking toward camera pulling suitcases at a relaxed pace, steady handheld tracking backwards, natural daylight from tall windows, muted colours, 35mm film grain, no logos, no readable signage, 5 seconds, vertical 9:16.

**M3, still:** Documentary photo inside a small Malaysian neighbourhood barbershop on a busy Saturday afternoon, two barbers cutting hair in the background, five customers sitting on a long bench along the wall waiting, one looking at the chairs, one on his phone, warm afternoon light through the shopfront glass, mirrors and clippers, slightly worn tiles, candid, 35mm film grain, no logos, no readable text, vertical 9:16.

Drop the files into `media/` as `M1.png`, `M1.mp4`, `M2.mp4`, `M3.png`.

## Build

- Project: `EX01.ecproj` (comp `EX01`, 49s, 1080×1920, 24fps). Scripts in `build/` (`lib.jsx`, `times.jsx`, `A`–`F.jsx`, `finish.jsx`).
  Rebuild: `cat lib.jsx times.jsx A.jsx > _run.jsx` → `effectcraft-cli script _run.jsx --bridge 9877`, then B…F and finish in order (A clears the comp).
- Export: `export/EX01_v2.mp4` (current: captions, credit, SFX, logo outro); `export/EX01.mp4` is the first cut.
- Captions: `build/captions.jsx` (31 phrases from the word timings; EffectCraft 0.17 has no caption feature). Credit chip 0.3–4.3s. Outro: blur + dim at 46.45s, `media/logo.png` pops at 46.9s.
- Sound: `sfx/sfx_mix.wav`, synthesised with ffmpeg (pops, ticks, whooshes, swipe, ding, low drone at about −12dB under the voice). Event list in `sfx/events.txt`. Replace with ElevenLabs SFX later if wanted.
- Rebuild order now: A B C D E F G finish, each as `cat lib.jsx times.jsx captions.jsx X.jsx > _run.jsx`.
- Previous export: Motion-checked at 12fps (`review/motion1.jpg`, `motion2.jpg`); voice offsets verified with silencedetect.
- Media: M1 (carousel, opening), M2 (corridor, framed print, still instead of a clip because credits ran out), M3 (barbershop, behind the turn).

## Post

- **Caption:** An airport fixed its complaints without making anyone wait less. Here's what they changed, and what it means for your shop on a Saturday.
- **Hashtags:** #smallbusiness #barbershop #customerexperience #malaysia #businesstips #queue
- **Pinned comment:** Want us to check your shop for the Wait Tax? DM "WAIT". (Source: Alex Stone, "Why Waiting Is Torture", NYT, 2012.)
- **On-screen source credit:** done (0.3–4.3s). Also in the pinned comment.
- Posted: _date_ · Link: _
- Results (owner comments / owner DMs, not views): _
