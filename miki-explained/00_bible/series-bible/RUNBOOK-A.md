# RUNBOOK-A — one-by-one art-direction review of the Style A references → BIBLE-A.md

**For a fresh session.** Follow it exactly. Open `PROGRESS-A.md` first; it says which session is next. Run that session
only, then stop. Don't improvise another method, don't load the episode skill, don't touch EX28/EX29.

## Why we're doing this (user, 2026-11-08)
- **The point is to sharpen my art direction**, not to match any episode. Don't compare with EX25 or any existing look.
- **Every image was handpicked.** Judge each one on its own, one by one, never as a group or an average.
- **Look as an art director, not an analyst.** Measurements and averages produce "the same generic, only in a different
  colour and shape". Ask what decision makes the picture work, then judge it.
- **There are no notes from the user** (too many images to annotate). I infer what drew them to each piece.
- **The user is a filmmaking novice.** Write anything they will read in plain words.

## The material (prep done 2026-11-08 with `miki-explained/tools/refs_view.py`)
- **Collection:** `~/Desktop/Collecting/Style A/`. Files renamed in place to ids (`A-core-001.jpg` …).
  `_rename_map.csv` there keeps the original names.
  - Core Look sits in **artist/project subfolders** (Bizone, Davines, Dzimitry…). Use the subfolder and the old file
    name as the source: it tells you the artist or brand.
- **Work dir** (git-ignored): `miki-explained/00_bible/series-bible/work/A/`:
  - `view/<id>.jpg`: 768 px copies. **The only images to open** (about 550 tokens each).
  - `chunks/C01–C08.txt`: 58 image ids each (C08: 52). `chunks/M01–M02.txt`: 21 clips each. Clips are videos,
    the 5 downloaded YouTube films (Oddfellows ×4, Ordinary Folk ×1) and animated GIFs.
  - `strips/<id>.jpg`: one key-moment strip per clip: frames at shot changes, 8–12 tiles, time-labelled.
  - `rename_map.csv` (copy) and `dups.txt`.
- **Duplicates:**
  - `A-places-009` is a byte-for-byte copy of `A-cam-010`. Skip it with a one-line pointer.
  - The 10 look-alike pairs in `dups.txt` are different images. Review both, and say how they differ in the second note.
- **Notes** (tracked in git): `miki-explained/00_bible/series-bible/notes-A/C01.md` … `M02.md`, `DIGEST.md`.

## The art director's questions (every image, about 100 words, fixed format)
```
### A-core-017 · ★4 · Bizone — "BIZONE technology-10"
Idea: what the picture is about, in one line (the concept, not the content).
Decision: the specific choice that makes it work (an unexpected angle, a bold crop, scale, light doing the storytelling,
  a material, a restraint).
Eye: 1 … → 2 … → 3 …  (and what the artist did to force that order)
Feeling: … because …
Not generic: what the average version would have done, and what this one did instead.
Steal: the transferable principle, phrased as a rule I could apply to a new frame.
Moves: how this would come alive in animation (camera, build, loop), for Style A's 3D world.
```
- **★ is conviction:** how strongly the piece shows a point of view (5 = a north star I'd build a series on, 1 = weak or
  off-style). Be strict: about 10–15 % should get ★5.
- **Banned words** (they mean nothing): clean, modern, sleek, vibrant, stunning, minimal (unless you say what is left
  out), aesthetic, eye-catching, dynamic. Name the concrete decision instead.
- If a piece belongs to a series (same project as the previous id), say how this frame adds to the series in one line.
  Don't repeat the series note.

## Token rules
- **Open only `view/<id>.jpg` and `strips/<id>.jpg`. Never open originals**, except up to **5 detail crops per chunk**,
  and only when the decision lives in fine detail (material, a face, texture). Make the crop like this:
  `~/.local/bin/uv run --with pillow python -c "from PIL import Image; Image.MAX_IMAGE_PIXELS=None; import sys; im=Image.open(sys.argv[1]).convert('RGB'); im.thumbnail((1400,1400)); im.save(sys.argv[2], quality=85)" "<original path>" miki-explained/00_bible/series-bible/work/A/crop_<id>.jpg`
- **Open 8 images per message** (8 parallel Read calls), then write their 8 notes to the chunk file straight away,
  then the next 8. **Never reopen an image**; the note is the record.
- **Two chunks per session, then stop.** The next session continues from `PROGRESS-A.md`.
- **Expected spend:** about 80–100k tokens per image session, about 80k for the motion session, about 40k for synthesis.
  **About 500k for Style A in total**, over 6 sessions.

## Sessions

| Session | Work | Output |
|---|---|---|
| 1 | C01 + C02 | notes-A/C01.md, C02.md |
| 2 | C03 + C04 | notes-A/C03.md, C04.md |
| 3 | C05 + C06 | notes-A/C05.md, C06.md |
| 4 | C07 + C08 | notes-A/C07.md, C08.md |
| 5 | M01 + M02 (motion) | notes-A/M01.md, M02.md |
| 6 | Synthesis | BIBLE-A.md |

### Image sessions (1–4), step by step
1. Read `PROGRESS-A.md` and this runbook. Nothing else.
2. For each of the session's two chunks:
   1. `cat work/A/chunks/C0N.txt`. Look up each id's source with
      `grep -F "/<id>." "/Users/user/Desktop/Collecting/Style A/_rename_map.csv"`. One grep for the whole chunk is fine:
      `grep -F -f <(sed 's/$/./' work/A/chunks/C0N.txt) …`.
   2. Work through the ids 8 at a time: open, judge, append 8 notes to `notes-A/C0N.md`.
   3. Close the chunk with a **digest** (max 250 words) at the end of `notes-A/C0N.md`:
      - the chunk's ★5 ids, each with a one-line reason
      - the convictions that keep appearing, each with ids
      - the tensions: pieces that pull in different directions
      - any image you couldn't read and why
3. Append the two chunk digests to `notes-A/DIGEST.md`. Tick the session in `PROGRESS-A.md`.
4. Commit `notes-A/` and `PROGRESS-A.md` and push to `miki-explained-series`.
5. Tell the user, in about 5 lines: how many images were judged, the ★5s with a short why, the convictions forming so
   far, and the tokens spent. Then stop.

### Motion session (5)
1. Read `PROGRESS-A.md`, this runbook and `notes-A/DIGEST.md`. The digest gives context; still judge each clip fresh.
2. For each id in M01, then M02: open `strips/<id>.jpg`. For the 5 YouTube films you may make **one extra strip** each,
   for a stretch that needs it:
   `ffmpeg -ss <t0> -to <t1> -i "<original>" -vf "fps=2,scale=384:-2,tile=4x3" -frames:v 1 work/A/strips/<id>_b.jpg`
3. Note per clip (about 120 words). Use the same fields as the image notes, but replace **Moves** with:
   - **Camera:** projection, moves, speed
   - **Handover:** how one shot becomes the next; name the trick, e.g. match cut, object-led transition, camera
     fly-through, build/unbuild
   - **Timing:** snappy or floaty; holds; easing
   - **Entrances/exits:** how things appear and leave
   - **Steal for Style A**
4. Write the digest, tick progress, commit, report. Then stop.

### Synthesis session (6)
1. Read `PROGRESS-A.md`, this runbook and `notes-A/DIGEST.md`. Then grep all ★5 notes and ★4 notes:
   `grep -A8 "★5" notes-A/*.md` and `grep -A8 "★4" notes-A/*.md`.
2. Pick the **north stars**: 10–15 ★5 pieces that best share one point of view. Reopen only those, at 768 px, to
   confirm. That's the one allowed re-look, about 8k tokens.
3. Write `miki-explained/00_bible/series-bible/BIBLE-A.md`, built from **convictions, not averages**:
   1. **Point of view:** what Style A believes, in 3 sentences, plus the north-star ids.
   2. **Convictions** (5–8): each one is a rule, why it works, 2–3 ids, and how it shows on screen.
   3. **The eye:** how we lead it (hierarchy, scale, crop, negative space) as decisions.
   4. **Light as storytelling:** what light means in this style.
   5. **Colour as meaning:** what each colour is allowed to say, and the accent rule.
   6. **Surface and material:** the clay/material recipe in words that can become Blender settings.
   7. **Scale and people:** how humans appear. House rule: figures hold poses, never walk or gesture, unless a raea
      motion-capture test is approved.
   8. **Camera and motion language:** moves, timing and easing, from the motion notes.
   9. **Handovers:** the transition vocabulary, built from scene assets.
   10. **Never:** what breaks the point of view, plus anti-slop (memory `anti-slop-design`).
   11. **Adopt / Adapt / Drop:** every conviction against what I can build (Blender, raea, HyperFrames). Plain words:
       why, and what the adapted version is.
   12. **Questions for the user** (max 5): only where the north stars disagree.
   13. **Test plan:** 3 stills + one 10-second test that prove the bible. **Not built yet.**
4. Update STATUS.md (BIBLE-A drafted; next: RUNBOOK-B on `~/Desktop/Collecting/Style B` with the same method, starting
   with `refs_view.py "…/Style B" B …/work/B`). Point memory `style-ab-test` to BIBLE-A.md. Commit and push.
5. Report to the user:
   - the point of view
   - the convictions
   - 5 north stars with a short why
   - the questions
   - tokens spent

   Then stop and wait.

## What I can build for Style A (for Adopt / Adapt / Drop)
- **Reliable:**
  - Blender worlds; iso, orthographic or perspective cameras with smooth eased moves; raea renders
  - matte clay and PBR materials, bevels, palettes, area/rim/emissive light, depth of field, bloom, fog
  - posed figures (raea bodies with held poses and goals)
  - type, callouts, EX15 captions, counters, UI cards
  - library CC0 models (memory `use-library-3d-models`)
- **With work:**
  - detailed procedural cities
  - MaterialCraft/TextureCraft hero materials (untested)
  - moving people via raea motion capture + IK (needs a test)
  - glass and translucency (render cost)
- **Not reliable yet:**
  - hand-keyed character acting and gestures, lip sync
  - photoreal humans
  - hero fluid and cloth simulations
  - hand-drawn frame-by-frame animation
- **House rules that win:**
  - the real brand logo from frame 1
  - EX15 captions
  - visualise the script literally
  - transitions built from scene assets
  - the retired styles (cut-paper, paper diorama, printed 3D) never return
