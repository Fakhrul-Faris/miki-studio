# EX02 — The barbershop that shows the wait before you walk in

Lane: The System Behind
Hook pattern: mysterious behaviour
Named concept: **the Doorway Decision**: customers decide at the door, in seconds, from what they can see
Lands on (Meikigo problem): customers deciding at the door → a live, visible queue status
Status: **built 2026-10-28**: `export/EX02.mp4` (48s). Voice: Paige (`NDTYOmYEjbDIVCKB35i3`)

## Sources

All from QB Net Holdings, *Sustainability Report 2024* (official, English):
https://www.qbnet.jp/uploads/SustainabilityReport2024_English-%E5%9C%A7%E7%B8%AE%E6%B8%88%E3%81%BF.pdf

- p6: the founder, at an upscale barbershop in the early 1990s: "Why does it always take over an hour…?",
"Why do haircuts come with a shave, a shampoo, and a massage?" This led to "Japan's first haircut specialty shop
providing 10-minute haircuts for 1000 yen in 1996."
- p8: "QB Signal: used to check for the approximate waiting time with the color of the signal at the storefront.
The signal can also be checked via our website." States: "Immediately", "Approx. 5 to 10 minutes",
"More than 15 minutes". "When a ticket is scanned, QB Signal changes color as it is linked with the system."
Air washer instead of shampoo.
- p25: "575 outlets in Japan, 126 outlets overseas" = 701, so the script says "over seven hundred".
- Colours: green = immediately, yellow = 5–10 min, red = 15+ min. This mapping comes from QB House's FAQ (Hong Kong);
the report lists the three states without naming colours. Get one more confirmation before posting (a photo of
a real signal is enough).
- First shop: Kanda, Tokyo, November 1996 (Japan Times, 28 Feb 1997; QB Net brand page). The founder is not named.
- L06 is editorial framing, not a statistic.

## Script (≈131 words, ≈55s)

| Line | Beat | Voice | Visual |
|---|---|---|---|
| L01 | Hook | This barbershop tells you how long you'll wait… before you even walk in. | **M1** storefront photo; a line-art three-lamp signal draws on beside the door and the green lamp lights on "walk in" |
| L02 | Setup | In the early nineties, a man in Japan kept asking one question: why does a haircut take over an hour? So in 1996, he opened his own shop. Just the cut. Ten minutes. | A "1990s haircut" card: one long bar split into Shave · Shampoo · Massage · Cut, "over 1 hour". On "Just the cut" the other segments strike out and collapse; a "1996" chip and "10 min" |
| L03 | Guess | You'd think speed was the big idea. | Slot sentence "Speed?" with a dashed underline, then a strike (D15) |
| L04 | Reveal | But look outside the door. There's a light. Green: go straight in. Yellow: five to ten minutes. Red: fifteen or more. It updates every time a ticket is scanned. So nobody walks in blind. Today, there are over seven hundred of these shops. | Push out to the storefront diagram. A big signal with each lamp lighting as named, plus labels. A ticket tile pops and the lamp switches (D23 word-locked state change). A person tile at the door reads the light and walks in. A big light numeral counts to "701" with "575 Japan · 126 overseas" |
| L05 | Turn | Now think about your door. On a Saturday, someone looks in, sees a full bench… and guesses. | Zoom-through to brown, **M3** Malaysian shop doorway photo. A door diagram, a full bench of customer tiles, a person at the door with a "?" bubble |
| L06 | Takeaway | A long wait, people can plan around. An unknown wait, they walk away from. That's the doorway decision. What does your door tell them? | The person at the door turns and leaves. "The Doorway Decision." with a green highlighter. The question. Silent logo outro |

## Voice direction (ElevenLabs: Paige, engaging narrator, `NDTYOmYEjbDIVCKB35i3`)

Calm, low documentary narrator, same as EX01. One file per line, ~0.3s silence at both ends: `audio/L01.mp3` … `audio/L06.mp3`.

- **L01:** pause at "…"; land "before you even walk in".
- **L02:** storytelling. A beat before "So in 1996". Clip "Just the cut. Ten minutes." short.
- **L03:** a slight smile in the voice.
- **L04:** list the colours evenly: "Green… Yellow… Red…". Lift on "So nobody walks in blind."
- **L05:** quieter. A pause before "and guesses."
- **L06:** slow. Contrast "plan around" against "walk away from". A pause before "That's the doorway decision."

## Mixed media (Seedream stills; generic, no logos or readable signage, no identifiable people)

**M1, Japanese storefront:** Documentary photo of a tiny modern barbershop inside a Tokyo train station concourse,
narrow glass shopfront, three barber chairs visible inside, a slim vertical three-lamp signal light mounted beside
the door, commuters walking past in a blur, clean bright fluorescent light, muted colours, 35mm film grain, no logos,
no readable text, vertical 9:16.

**M2, old-style barbershop (optional, for L02):** Documentary photo of a traditional Japanese barbershop in the early
1990s, a customer reclined in a barber chair with a hot towel on his face, a barber preparing shaving foam, warm
tungsten light, slightly faded film colours, 35mm grain, no logos, no readable text, vertical 9:16.

**M3, Malaysian shop doorway:** Documentary photo from just outside a small Malaysian neighbourhood barbershop on a
Saturday, looking in through the open glass door: a long bench of waiting customers along the wall, two barbers
working, a man standing at the doorway hesitating with his hand on the door, warm afternoon light, candid, 35mm film
grain, no logos, no readable text, vertical 9:16.

Save as `media/M1.png`, `media/M2.png` (optional), `media/M3.png`.

## Sound (sparse, per the series rules)

Drone bed under everything, plus 4 effects only: the lamp lighting in the hook, the zoom-through, the walk-away,
and the highlighter. The logo outro stays silent.

## Build

- Project `EX02.ecproj` (comp `EX02`, 48s, 1080×1920, 24fps). Scripts in `build/`: `lib.jsx`, `times.jsx`, `captions.jsx`, `A`–`F.jsx`, `G.jsx` (credit, captions, sound, outro), `finish.jsx`.
  Rebuild: `cat lib.jsx times.jsx captions.jsx X.jsx > _run.jsx` → `effectcraft-cli script _run.jsx --bridge 9877`, for A B C D E F G finish in order (A clears the comp).
- Line offsets: L01 0.4 · L02 4.6 · L03 15.3 · L04 17.5 · L05 31.3 · L06 36.7. Outro blur 45.0s, logo 45.4s, silent.
- Sound: drone bed plus 4 effects (`sfx/events.txt`). The logo outro is silent (checked: max −31.6dB in 45–48s, the drone tail).
- Credit chip: "Source: QB Net Holdings, 2024" (0.3–4.3s).
- Still to do before posting: confirm the green/yellow/red colour mapping (see Sources).

## Post

- **Caption:** A barbershop in Japan answers the one question every customer has before they walk in. Here's how, and what your door is telling people on a Saturday.
- **Hashtags:** #barbershop #smallbusiness #customerexperience #malaysia #japan #businesstips
- **Pinned comment:** What does your door tell people? DM "DOOR". (Source: QB Net Holdings, Sustainability Report 2024.)
- Posted: _date_ · Link: _
- Results (owner comments / owner DMs, not views): _
