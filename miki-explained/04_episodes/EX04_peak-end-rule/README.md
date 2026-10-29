# EX04 "The Peak-End Rule"

32 s, 9:16, house cut-paper format. **Hook test:** data at frame 0 ("682 PATIENTS / LONGER PROCEDURE / LESS PAIN") vs the
story hooks of EX02V3 and EX01V3. Final: `export/EX04.mp4`. Script, sources, metrics table and post copy: `episode.md`.

| Path | What |
|---|---|
| `EX04_edit.ecproj` | Your editable project. Render `MASTER` from this. |
| `EX04.ecproj` | The scripted build. `build/run.sh` writes here and overwrites it. |
| `export/` | Final render. |
| `media/` | Collage stills 2A (clipboard), 4B (counter), 5A (empty counter); documentary photos M1 (hospital corridor), M2 (barbershop). |
| `layers/` | What the projects link: the stills, printed photos, paper. |
| `audio/` | Voice L01–L06 (Nathan), `voice.wav` (tightened), word timings, the music. |
| `sfx/` | `mix.wav` (voice + drone bed + 7 hits; music is its own layer), `events.txt`, `source/`. |
| `build/` | Shot scripts 1A–5A, `lib.jsx`, `overlay.jsx`, `subs.jsx`, `MASTER.jsx`, `run.sh`, `sfxmix.py`. |
| `how-i-generate.md` | The prompts the media was generated from. |

Rebuild: `build/run.sh overlay 1A 2A 3A 3B 4A 4B 5A MASTER` (after `python3 build/sfxmix.py` if the sound changes).
