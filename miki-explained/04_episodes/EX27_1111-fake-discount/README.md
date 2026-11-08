# EX27 — The 10% Off That Costs More (Shopee 11.11) · Style B baseline

Final: `export/EX27-Final.mp4` (1080×1920, 60 fps, 37.1 s, −18.5 LUFS). Approved 2026-11-08. Method and rules:
`../../00_bible/flat-v3-playbook.md`. Style B (flat geometry v3) vs Style A (smooth iso, EX25) — performance test.

## How it got here (2026-11-07 → 11-08)

1. raea smooth-iso v2 build → `export/EX27-Final-raea-v2.mp4` (kept for comparison). User: the look is "so generic".
2. Editorial art direction + the Ring motif (`art-direction.md`, `image-prompts.md`); the user generated F1–F6 (`media/`).
3. Traced the frames into vector parts → rejected ("you cut it … not recreate it"). Hand-drew them in SVG → the objects
   held up, the hands/people did not ("so fucking hideous"). Only the vacuum survived (`vec/draw/F3.svg`).
4. TomTom reference (`../Vimeo File 720p.mp4`): new viewpoint per beat, one through-line, flat geometry, asset-built
   transitions. Two style stills (`styleframes/`) → approved → full build `build/hf_v3.py`.
5. User: "dont do cheap work" → the four transitions rebuilt from scene assets; captions shrunk to 36 px; Shopee logo
   on screen from frame 1.

## Rebuild

```
~/.local/bin/uv run --with pillow python build/hf_v3.py
cd hf && npx hyperframes check --json && npx hyperframes render --quality delivery --fps 60 -o ../export/EX27-Final.mp4
```
Voice: `audio/voice.wav` + `audio/vo_timeline.json`; sound `hf/assets/mix.wav` (from `build/sfx.py`, the raea-era mix).
If the L02 line is re-recorded: rebuild the timeline and `raea/captions60.json`, then rerun the two commands above —
every time in the film is read from the timeline.

## Files

- `build/hf_v3.py` — the film (4 scenes, transitions, headlines) · `build/flatkit.py` — drawn pieces + palette ·
  `build/hf_build.py` — shared helpers, EX15 captions (36 px), grain (its own `build()` is the superseded Ring version).
- `hf/` — the generated HyperFrames project (assets: fonts, `shopee.svg`, Meikigo `logo.png`, `mix.wav`).
- `styleframes/` — the two approved stills · `vec/draw/F3.svg` — the hand-drawn vacuum · `vec/look.py`, `vec/rast.py` —
  drawing aids (reference grid/onion skin; SVG → PNG).
- `raea/` — the Style A build (`edit.tsx`, `captions60.json` is still the caption source).

## Open

- L02 transcript fix from the user (Whisper heard "comma" after "11.11").
- Telegram push when the Air is back: `tools/air.sh sync && tools/air.sh push-episode EX27`.
