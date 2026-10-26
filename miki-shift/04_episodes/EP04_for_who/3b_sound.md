# EP04 — For Who — Sound design

Everything sound-related for EP04 except the voice (`3_voice.md`). Times are segment times from `2_animation.md`.

**No music anywhere** — no score, no stings, no laugh track. The decoy is carried by small, satisfying
coffee sounds; the button by silence.

## Generating the sounds — ElevenLabs Sound Effects

Settings: duration as listed · **Prompt influence: High** · **Loop: on** only for S01 · download
**WAV 48 kHz**. 3–4 takes per sound, keep one, save it in `../../06_sfx/` under the file name below.
S09 is already in the library from EP01.

| ID | File | Prompt | Dur | Loop |
|----|------|--------|-----|------|
| S01 | `room_tone_bar.wav` | `Ambience of a quiet, minimal specialty coffee bar in the morning: very soft, distant murmur, faint street sounds through a window, a low hum of an espresso machine at rest. No clear voices, no music.` | 30s | on |
| S02 | `footsteps_hurry_in.wav` | `Quick, hurried footsteps in ankle boots on a concrete floor coming closer, a canvas tote bag rustling. No music.` | 2s | — |
| S03 | `espresso_pull.wav` | `A portafilter locked into an espresso machine with a metal clunk, then the pump hums and espresso trickles into a ceramic cup, close up. No music.` | 3s | — |
| S04 | `steam_pour.wav` | `A short hiss of a milk steam wand, then steamed milk poured smoothly from a steel pitcher into a ceramic cup, close up. No music.` | 3s | — |
| S05 | `cup_down_wood.wav` | `A ceramic coffee cup set down gently on a wooden counter, single soft knock, close. No music.` | 1s | — |
| S06 | `tap_glass.wav` | `A kitchen tap turned on, briefly filling a drinking glass with water, then turned off. No music.` | 2s | — |
| S07 | `glass_slide.wav` | `A glass of water slid across a smooth wooden counter, one short scrape. No music.` | 1s | — |
| S08 | `sip.wav` | `One slow, quiet sip of hot coffee from a ceramic cup, close up. No music.` | 1.5s | — |
| S09 | `footsteps_leave.wav` | already in the library (EP01) | — | — |

Prompt style (ElevenLabs guide): name the source, the surface and how close it is; write sequences as
"X, then Y". End every prompt with "No music".

## Scenes

### S1 — The order
**Feel:** calm bar, then Tess crashes in.

| Time | Sound | Mix |
|------|-------|-----|
| 0:00 → | S01 room tone | −30 dB, under the whole episode |
| 0:00–0:02 | S02 hurried footsteps | −18 dB |
| 0:02.3 | L01 | dialogue −6 dB |

### S2 — The decoy
**Feel:** the most satisfying coffee sounds in the world — close, crisp, generous. The audience should believe it's for Tess.

| Time | Sound | Mix |
|------|-------|-----|
| 0:00 | S03 espresso pull | −14 dB, close |
| 0:02 | S04 steam + milk pour | −14 dB |
| 0:04.5–0:07 | room tone only | Tess's smile plays in near-silence |

### S3 — The swap
**Feel:** the sounds get smaller and cheaper — a tap, a glass.

| Time | Sound | Mix |
|------|-------|-----|
| 0:01.4 | S05 cup down by the machine | −18 dB |
| 0:02 | S06 tap filling glass | −16 dB — noticeably plainer than the espresso |
| 0:04.3 | S07 glass slide | −16 dB |
| 0:04.5 | L02 "Here." | dialogue −6 dB, over the slide |
| 0:05.0 | L03 | |

### S4 — The button
**Feel:** one question, one answer, one sip. Then nothing.

| Time | Sound | Mix |
|------|-------|-----|
| 0:01.4 | L04 "…For who?" | dialogue −6 dB |
| 0:02.9 | L05 "For me." | no gap after L04 |
| 0:03.6 | S08 sip | −12 dB, close — the loudest small sound in the episode |
| 0:04.5 | S09 footsteps leaving | −22 dB, fading |
| 0:05.5 → | room tone only, dipped 3 dB | hold on Tess, then cut to the end card |
