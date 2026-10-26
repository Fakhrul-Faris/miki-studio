# EP01 — Stay Strong — Sound design

Everything sound-related for EP01 except the voice (`3_voice.md`): what to generate, how, and where it goes.
Times are given for both versions — **stills** = `4_edit.md` timeline · **anim** = segment time in `2c_full_animation.md`.

**No music anywhere** — no score, no stings, no laugh track. Silence and room tone carry the jokes.

## Generating the sounds — ElevenLabs Sound Effects

Settings: duration as listed · **Prompt influence: High** (literal) unless noted · **Loop: on** only for
S01 and S02 · download **WAV 48 kHz**. Generate 3–4 takes per sound, keep one, save it in `../../06_sfx/`
under the file name below so later episodes can reuse it.

| ID  | File                     | Prompt                                                                                                                                                                                                                                    | Dur  | Loop |
| --- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---- |
| S01 | `room_tone_cafe.wav`     | where                                                                                                                                                                                                                                     | 30s  | on   |
| S02 | `rag_wipe_loop.wav`      | `Damp cotton cloth wiping a ceramic tile countertop in small circles, close up, steady relaxed rhythm. No music.`                                                                                                                         | 6s   | on   |
| S03 | `notif_ios.wav`          | **Not generated — stock.** Screen-record a real iPhone receiving a text with the default text tone and sound on; export the audio. Fallback only: `Short bright two-note smartphone message chime, clean and close, no reverb. No music.` | ~1s  | —    |
| S04 | `cable_unplug.wav`       | `A USB-C cable pulled out of a smartphone with a small crisp plastic click, then the phone lifted off a plastic charging stand. No music.`                                                                                                | 1.5s | —    |
| S05 | `door_bell.wav`          | `A small brass shop bell above a cafe door jingles as the door opens, then the door closes softly. No music.`                                                                                                                             | 2.5s | —    |
| S06 | —                        | Silence: room tone only                                                                                                                                                                                                                   | —    | —    |
| S07 | `fork_plate.wav`         | `A metal fork scraping a small ceramic plate, then soft, happy closed-mouth chewing of cake, close up. No music.`                                                                                                                         | 3s   | —    |
| S08 | `footsteps_approach.wav` | `Four casual sneaker footsteps on a wooden cafe floor coming closer, with a light rustle of a backpack strap. No music.`                                                                                                                  | 2.5s | —    |
| S09 | `wallet_open.wav`        | `A leather bifold wallet flipping open, soft and close. No music.`                                                                                                                                                                        | 1s   | —    |
| S10 | `footsteps_leave.wav`    | `Four casual sneaker footsteps on a wooden cafe floor walking away and fading out. No music.`                                                                                                                                             | 2.5s | —    |

Prompt style (ElevenLabs guide): name the source, the surface and how close it is; write sequences as
"X, then Y". End every prompt with "No music" — the model sometimes adds some.

## Scenes

### Scene 1 — The notifications

**Feel:** normal shift, then a small private "oof". The phone is the loudest thing in the room.

| Stills | Anim (S1) | Sound | Mix |
|--------|-----------|-------|-----|
| 0.0 → | 0:00 → | S01 room tone | −30 dB, under the whole episode |
| 0.0–2.0 | 0:00–0:02 | S02 rag wipe | −18 dB; stops dead on the wince |
| 0.4 | 0:00.6 | S03 notification 1 | −10 dB, the clearest sound in the scene |
| 2.0–2.5 | 0:02–0:02.5 | room tone dips 3 dB | the "oof" hangs in near-silence |
| 3.8 | 0:03.8 | S03 notification 2 | same level as the first — the repeat is the joke |

### Scene 2 — Whose phone

**Feel:** the customer is having a lovely time. Small happy sounds from far away.

| Stills | Anim (S2) | Sound | Mix |
|--------|-----------|-------|-----|
| 5.4–7.0 | 0:00–0:03.5 | S07 fork on plate + chewing | −24 dB, distant (he's in the background) |
| 7.0 | 0:03.3 | S08 footsteps approaching | −20 dB, bridges the cut to the counter |
| 7.4 | 0:04.2 | L01 "Hey! Can I pay here?" | dialogue −6 dB |

### Scene 3 — The comp

**Feel:** dialogue only. Keep it dry and close; nothing competes with the voices.

| Stills | Anim (S3) | Sound | Mix |
|--------|-----------|-------|-----|
| 8.8 | 0:00.4 | L02 | dialogue −6 dB |
| 11.0 | 0:03.0 | S09 wallet open | −20 dB, just before L03 |
| 11.2 | 0:03.3 | L03 | |
| 12.4 | 0:05.4 | L04 "Serious." | leave ~0.3s of room tone before it — the pause is the laugh |
| 13.6 | 0:06.7 | L05 | |

### Scene 4 — Stay strong

**Feel:** the room goes quiet around Miki. After the door, nothing — the audience sits in it with him.

| Stills | Anim (S4) | Sound | Mix |
|--------|-----------|-------|-----|
| 16.0 | 0:00.8 | S04 unplug + lift | −16 dB, crisp |
| 17.3 | 0:02.4 | L06 "Oh… here. … Stay strong." | dialogue −6 dB |
| 19.2 | 0:05.4 | S10 footsteps leaving | −22 dB, fading |
| 20.0 | 0:06.4 | S05 door bell | −14 dB |
| 20.5–23.0 | 0:07–0:09 | S06 room tone only, dipped 3 dB | no music, no sting — hard cut on silence |
