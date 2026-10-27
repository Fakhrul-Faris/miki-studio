---
name: miki-explained-episode
description: Playbook for making an episode of the Miki Explained series (miki-explained/ in this repo): under-60s 9:16 diagram explainers for TikTok/Instagram that take a business, psychology or economics story and turn to "your shop". Covers story choice and fact-checking, the script and Paige voice direction, Seedream mixed-media prompts, word timings, building the episode live in EffectCraft with the shared tools (tools/ec/core.jsx + blocks.jsx), captions, sparse sound, the silent logo outro, motion review and post copy. Use this whenever the user wants a new explainer, "the next episode", "EX03", a script or hook for miki-explained, to build/render/fix an episode in EffectCraft, or asks about the series' look, captions or sound — even if they don't say "episode" or "skill".
---

# Miki Explained — episode playbook

The process that produced EX01 (Houston airport) and EX02 (QB House). The series lives in `miki-explained/`;
each episode is `miki-explained/04_episodes/EXNN_slug/`. Read `00_bible/` (series-plan, visual-system, voice,
glossary) and `00_bible/effectcraft-notes.md` (every EffectCraft trap found so far) before building.

## North point (read first)

**Nothing appears from nowhere.** Every frame is born from the one before it, carried by motion. Pick the episode's
**thread** (one hero element) before any visuals; every beat is a state of it; bookend on the opening shape. Soft motion
only (no bounce), 2D first, the camera always drifting, one subject at a time. See `00_bible/visual-system.md` § North point
and the reference builds `04_episodes/EX00V3_flow-test/build/A.jsx` and `04_episodes/EX02V2_qb-house-flow/build/`
(a full episode in the flow style; the user confirmed its direction, 2026-10-28).

## How to work with this user

- **Plan before acting on anything new** (a new episode, method or restructure); wait for approval. Small fixes to approved work: just do them.
- **One gate at a time**, each ending in the user's approval. The user generates voice and images (credits are limited, so a still may replace a clip).
- **EffectCraft only. Never After Effects**, not even as a fallback.
- **Sound is sparse; the logo outro is silent.**
- English only. Plain language. Report honestly what was checked (stills vs motion vs audio) and what wasn't.

## The gates

| # | Gate | Output | User approves |
|---|---|---|---|
| 1 | Story + facts | backlog row, sources in `episode.md` | the story |
| 2 | Script + thread | `episode.md` script table (≈130 words, 6 lines) + the thread (hero element, its states, the bookend) | the script and the thread |
| 3 | Voice + stills | user renders L01–L06 (Paige) → `audio/`, Seedream → `media/` | — |
| 4 | Timings + captions | `build/times.jsx`, `build/captions.jsx` | — |
| 5 | Build (live) | `build/config.jsx`, `A`–`F.jsx`, `G.jsx`, `finish.jsx` | watches it land in the app |
| 6 | Motion review + render | `export/EXNN.mp4`, `review/motion.jpg` | the cut |
| 7 | Post + calendar | `episode.md` § Post, `05_calendar/calendar.md`, `glossary.md` | — |

### 1. Story + facts
Pick from `03_ideas/backlog.md`, rotating lanes; **at least every third episode is Malaysian** (series-plan § Story balance).
Verify every number against a primary source (company reports, the original article). Quote the source lines in
`episode.md` § Sources. If a detail can't be confirmed, cut it or flag it as open. Never invent stats; the shop beat is illustrative.

### 2. Script
Copy `templates/episode.md`. Six lines on the skeleton (Hook · Setup · Guess · Reveal · Turn · Takeaway), ≈130 words.
The takeaway coins **one named concept** (add it to `glossary.md`) and ends on a question. Write the visual column
using the blocks below, and per-line voice direction for Paige (`NDTYOmYEjbDIVCKB35i3`). Add Seedream prompts (generic,
no logos or readable text, documentary 35mm, 9:16) and the planned 4–6 sound moments.

### 3–4. Timings and captions
```
ffprobe each audio/L0N.mp3 → choose offsets (each line ~0.4s after the previous file ends) → DUR = last end + ~3s outro
archive-ignore/comedy-autopsy/.venv/bin/python miki-explained/tools/words.py <ep> L01=0.4 L02=… 
python3 miki-explained/tools/captions.py <ep> L01=0.4 L02=… --mute <guess window>,<concept window> [--fix "a=b"]
```
`words.py` prints each word's index: `w("L04", 28)` is word 28 of line 4. **Count indices from the printout**: an off-by-two once flipped EX02's signal late.

### 5. Build live
1. Start the app with its control channel (background): `/Applications/EffectCraft.app/Contents/MacOS/EffectCraft --control 9877`.
   **One episode per app session**: quit and relaunch between episodes. A session that built three episodes reached 24 GB
   on this 16 GB Mac and kernel-panicked it.
2. Copy `templates/config.jsx` → `build/config.jsx` (DIR, COMPNAME, T, DUR) and `logo.png` into `media/`.
3. Write beats as `build/A.jsx` … `F.jsx` (`templates/beat.jsx`): A starts with `clearComp(); importLines([...]); group("DRIFT")`.
   Flow blocks first: `camera`, `glide`, `enter`, `leave`, `calmReveal`, `soft`. Then `bleed`, `print`, `chip`, `card`, `tile` + `pict*`,
   `bar`, `dashLine`, `typeOn`, `nudge`, `concept`. `zoomThrough`/`dimmer` only if the thread really calls for them. G = `credit(); captions(); soundTrack(); outro(ob);`; finish = `finish([...onTop])`.
4. Run: `miki-explained/tools/build.sh <ep> A B C D E F G finish`. **Always rebuild from A** (re-running one beat duplicates layers).
   On a long build, run one beat per call and save after each (`exec file.saveAs`), so a crash loses one beat, not the episode.
   In `app.run(...)`, `layer:` is the layer **id** (`l.id`), not its index.
5. Check stills per beat (`effectcraft-cli render-frame --comp … --bridge 9877 --out <absolute path>`), fix, rerun.

### 6. Sound, render, review
`python3 miki-explained/tools/sfxmix.py <ep> <DUR> "pop@t:0.4" "whoosh_long@t:0.55" "whoosh@t:0.35" "swipe@t:0.3"` (rerun the G beat after).
Then `miki-explained/tools/review.sh <ep> EXNN "t:len:label" …` with a window per transition, and read `review/motion.jpg`.
The render runs as its own `effectcraft-cli` process (about 5–6 GB for a 48s episode). `review.sh` saves through the app first,
so **quit the app (`exec app.quit --bridge 9877`) once the render has started**: app + render together pushed free memory to 3%.
Fix anything found, then rebuild and re-render.

### 7. Post
Caption, hashtags, pinned comment with the source and a DM keyword, and the before-posting checklist (series-plan),
including the **AI-generated content label**. Update the calendar and the glossary.

## When something goes wrong
Check `00_bible/effectcraft-notes.md` first; most problems are already there (stale handles, parenting doesn't
compensate, frame-snapped keys, numbered stills importing as a sequence, huge scales clipping, text boxes with
non-zero positions). `references/lessons.md` has the short list. Add every new trap to effectcraft-notes.md.
