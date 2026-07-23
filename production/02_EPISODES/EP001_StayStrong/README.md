# EP001 — Stay Strong (PROOF_03)

**9:16 · ~21s · LOOK-layer first** (approved flat stills for timing + taste)

## What to watch / scrub

| Deliverable | Path | Notes |
|-------------|------|-------|
| **Limited animation MP4** | `EP001_render/EP001_limited_anim.mp4` | **Use this** — wipe / blink / mouth flap |
| Old slideshow (ignore) | `EP001_render/EP001_LOOK_preview.mp4` | still holds only |
| Blender | `EP001_animation.blend` | `LOOK_SEQ` plays the limited-anim frames |

### Motion in the limited cut

| Panel | Motion |
|-------|--------|
| P01 | Counter wipe cycle + blink |
| P02 | Blink on stress hold |
| P03 | Mouth flap on dialogue |
| P04 | Prop hold (insert) |
| P05 | Mouth flap “Stay strong” → smile hold |
| P06 | Blink → micro-crack |

Rebuild: `python3 build_limited_anim.py` then ffmpeg (see script).

## Layers (priority)

| Collection | Role |
|------------|------|
| **LOOK** | Source of truth for **overall look** — AI stills on planes |
| GP_Set / GP_Miki | Construction only — hidden until real ink pass |
| REFS / UI / blockout | Hidden |

## Character / board sources

- Character: `comedy-autopsy/StyleLock/MIKI_CHARACTER.md`
- Turnaround: `comedy-autopsy/StyleLock/miki_turnaround.png`
- Stills: `comedy-autopsy/storyboards/PROOF_03_stay_strong/`
- Script / board: `PROOF_03_stay_strong.md` / `_board.md`

## Next after taste-pass

1. Regen any LOOK still that fails StyleLock
2. Limited motion on LOOK (blink / mouth / toast)
3. Optional: proper GP ink trace over LOOK
