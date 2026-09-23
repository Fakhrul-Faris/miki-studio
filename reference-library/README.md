# Reference library

Real commercials, kept and broken down shot-by-shot, used as cinematography anchors for Meikigo/Miki Seedance generations. The point: don't ask a generator to invent a camera setup, lighting rig and environment from scratch every time — hand it a real shot's DNA and only change what the script actually needs (who's in it, what they're doing).

This is shared across every Meikigo ad series (Snooker, and whatever comes next) — not tied to one project folder.

## What "anchoring" means in practice

An anchor shot contributes:
- **Camera** — angle, height, static vs. tracking, lens feel, depth of field.
- **Lighting** — time of day, key direction, color temperature, grade.
- **Composition** — where subjects sit in frame, depth layering, framing size (wide/medium/close/macro).
- **Location type** — the kind of place (quiet residential street, dense retail block, interior counter, etc.), not the specific brand-identifying dressing.

An anchor shot does **not** contribute:
- Any other brand's logo, wordmark, product, or recognizable signage/livery.
- The specific people in it.

When writing a `Location plate` asset prompt (see the `seedance-commercial-production` skill's `templates/asset-prompts.md`) or a keyframe's `[COMPOSITION]` / `[LIGHTING LOCK]`, pull the camera/light/composition wording from the anchor shot's analysis, but describe *our own* location and cast under it.

## Adding a new reference ad

1. Drop the source video in `reference-library/<slug>/source.mp4`.
2. Run the extractor: `python3 tools/shot_extractor.py reference-library/<slug>/source.mp4 --out reference-library/<slug>/shots`.
3. View the extracted start/mid/end frames per shot and write `shots/shot_analysis.md` (camera, location, proportion & composition, mood, lighting per real shot — collapse algorithmic sub-splits back into one real shot where they're clearly the same continuous shot).
4. Add one row per real shot to `index.md` below.
5. Get the analysis approved before anchoring any generation to it.

## Reference ads in this library

| Slug | Source | Shots | Notes |
|---|---|---|---|
| `cloudmonster-on-running` | On Running "Cloudmonster" (25s, 1080p) | 7 | Two locations: warm-lit brownstone corner, brighter cast-iron SoHo block. See `cloudmonster-on-running/shots/shot_analysis.md`. |
| `runners-involuntarios` | Perenteryl "Runners (Involuntarios)" (~32.6s) | 11 | Handheld extreme-wide chase/comedy coverage; a sustained 6s continuous low-angle tracking shot is the signature device. See `runners-involuntarios/shots/shot_analysis.md`. |
| `kaufland-veggie` | Kaufland "Take it Veggie" (~80s) | 29 (7 scenes) | Multi-scene family dramedy; classic sitcom coverage; lighting used as an emotional signal across scenes. See `kaufland-veggie/shots/shot_analysis.md`. |
| `zalando` | Zalando delivery tram ride (~30s) | 13 | Entire spot on one vintage train-carriage set; fashion-editorial "runway" parade; strong single-set anchor. See `zalando/shots/shot_analysis.md`. |

See `index.md` for the searchable shot-level catalog.
