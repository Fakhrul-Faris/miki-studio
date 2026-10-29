# EX01V3 "The Wait Tax"

45.2 s, 9:16, house cut-paper format, remake of EX01. Final: `export/EX01V3.mp4`. Script, sources and shot list: `episode.md`.

| Path | What |
|---|---|
| `EX01V3_edit.ecproj` | The hand-edited project (music: Dark Synthwave Beat at −15 dB in MASTER). Render `MASTER` from this. |
| `EX01V3.ecproj` | The scripted build. `build/run.sh` writes here and overwrites it. |
| `export/` | Final render. |
| `media/` | Collage stills (1A, 1B, 2C, 3A, 4B, 5C), cut-outs (`CO_*`), documentary photos M1–M4. |
| `layers/` | PhotoCraft output the projects link: clock dial without hands, clock cut-out, 2C man and plate, cut-outs, printed photos M1–M4. `psd/` holds layered sources. |
| `audio/` | Voice lines L01–L07 (Nathan), `voice.wav` (tightened), `words.json` / `vo_timeline.json`, the music. |
| `sfx/` | `mix.wav` (voice + drone bed + 11 hits; the music is a separate layer), `events.txt` (cue list), `source/` (sound files). |
| `build/` | Shot scripts 1A–5C, `lib.jsx`, `overlay.jsx`, `subs.jsx`, `MASTER.jsx`, `run.sh` (rebuild), `sfxmix.py` (rebuild the mix). |
| `how-i-generate.md` | The prompts the media was generated from (copy-paste checklist). |
| `_archive/` | Files not used in the final (City Lights music). |

Rebuild: `build/run.sh overlay 1A 1B 1C 2A 2B 2C 2D 2E 3A 4A 4B 5A 5B 5C MASTER` (after `python3 build/sfxmix.py` if the sound changes).
Note: the project links the music from `~/Downloads`; a copy is in `audio/`. Relink if Downloads is cleaned.
