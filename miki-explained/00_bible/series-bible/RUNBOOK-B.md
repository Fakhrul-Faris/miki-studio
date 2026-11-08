# RUNBOOK-B — one-by-one art-direction review of the Style B references → BIBLE-B.md

**For a fresh session.** Follow it exactly. Open `PROGRESS-B.md` first; it says which session is next. Run that session
only, then stop. Don't improvise another method, don't load the episode skill, don't touch EX28/EX29.

Same method as RUNBOOK-A (Style A finished 2026-11-08, `BIBLE-A.md`). Changes from A are marked **(new)**.

## Why we're doing this (user, 2026-11-08)
- **The point is to sharpen my art direction**, not to match an episode. Don't compare with EX27 or any existing look.
- **Every image was handpicked.** Judge each one on its own, one by one, never as a group or an average.
- **Look as an art director, not an analyst.** Measurements and averages produce "the same generic, only in a different
  colour and shape". Ask what decision makes the picture work, then judge it.
- **There are no notes from the user.** I infer what drew them to each piece.
- **The user is a filmmaking novice.** Write anything they will read in plain words.
- **(new) Styles share techniques** (user, 2026-11-08): A, B and C borrow each other's traits so quality stays on par.
  The bibles are toolkits, not walls. Judge B on its own terms first; flag where a piece offers something A could use, or
  confirms an A conviction.

## The material (prep done 2026-11-08 with `miki-explained/tools/refs_view.py`)
- **Collection:** `~/Desktop/Collecting/Style B/`, flat folders (Core, Light, Color, Camera, People, Places, Props, Type,
  Motion), no artist subfolders. Files renamed in place to ids (`B-core-001.jpg` …); `_rename_map.csv` there keeps the
  original names (often Pinterest titles that hint at the artist or subject).
- **Work dir** (git-ignored): `miki-explained/00_bible/series-bible/work/B/`:
  - `view/<id>.jpg`: 768 px copies. **The only images to open.**
  - `chunks/C01–C04.txt`: 54/54/54/51 image ids. `chunks/M01–M02.txt`: 17/16 clips (26 videos + 7 GIFs; GIFs also have a
    still in `view/`).
  - `strips/<id>.jpg`: one key-moment strip per clip.
  - `rename_map.csv` (copy) and `dups.txt`.
- **Duplicates:** `B-places-017` is a byte copy of `B-core-045` — skip it with a one-line pointer. Look-alike pairs
  (`B-cam-002 ~ B-cam-023`, `B-props-003 ~ B-props-013`) are different images: review both, say how they differ.
- **Notes** (tracked in git): `miki-explained/00_bible/series-bible/notes-B/C01.md` … `M02.md`, `DIGEST.md`.

## The art director's questions (every image, fixed format)
```
### B-core-017 · ★4 · <source hint from the original name>
Idea: what the picture is about, in one line (the concept, not the content).
Decision: the specific choice that makes it work.
Eye: 1 … → 2 … → 3 …  (and what the artist did to force that order)
Feeling: … because …
Not generic: what the average version would have done, and what this one did instead.
Steal: the transferable principle, phrased as a rule I could apply to a new frame.
Moves: how this would come alive in animation, for Style B's flat-geometry world (HyperFrames/SVG).
```
- **(new) Length by rating:** ★4–5 get the full note (~100 words). ★3 get a compact note (Idea, Decision, Steal, Moves).
  ★1–2, repeats and coverage frames get **one or two lines** (what it is, why it's weak, steal if any). Style A spent ~140k
  per image session because every note was full length; this keeps sessions near ~100k.
- **(new) Optional line `Shares:`** only when the piece adds to or confirms an A conviction or offers a technique A could
  use (e.g. "Shares: A-C4 travelling token, as a flat line"). Don't force it.
- **★ is conviction**, strict: about 10–15 % ★5.
- **Banned words:** clean, modern, sleek, vibrant, stunning, minimal (unless you say what is left out), aesthetic,
  eye-catching, dynamic.
- If a piece belongs to a series, say how this frame adds to the series in one line.
- **AI-generated stock** (very common in Pinterest saves): say so plainly, judge the decision, rate it honestly.

## Token rules
- Open only `view/<id>.jpg` and `strips/<id>.jpg`; never originals, except up to **5 detail crops per chunk**:
  `~/.local/bin/uv run --with pillow python -c "from PIL import Image; Image.MAX_IMAGE_PIXELS=None; import sys; im=Image.open(sys.argv[1]).convert('RGB'); im.thumbnail((1400,1400)); im.save(sys.argv[2], quality=85)" "<original path>" miki-explained/00_bible/series-bible/work/B/crop_<id>.jpg`
- **8 images per message** (8 parallel Read calls), then write their 8 notes straight away. **Never reopen an image.**
- **Two chunks per session, then stop.**
- **Expected spend:** ~100k per image session, ~90k motion, ~50k synthesis. **About 340k for Style B in total**, over 4
  sessions. Record the real spend in PROGRESS-B.

## Sessions

| Session | Work | Output |
|---|---|---|
| 1 | C01 + C02 (108 images) | notes-B/C01.md, C02.md |
| 2 | C03 + C04 (105 images; places-017 = copy of core-045) | notes-B/C03.md, C04.md |
| 3 | M01 + M02 (33 clips) | notes-B/M01.md, M02.md |
| 4 | Synthesis | BIBLE-B.md |

### Image sessions (1–2), step by step
1. Read `PROGRESS-B.md` and this runbook. Nothing else (not BIBLE-A — judge B fresh).
2. For each of the session's two chunks:
   1. `cat work/B/chunks/C0N.txt`; look up sources in one grep:
      `grep -F -f <(sed 's/$/./' work/B/chunks/C0N.txt) "/Users/user/Desktop/Collecting/Style B/_rename_map.csv"`.
   2. Work through the ids 8 at a time: open, judge, append notes to `notes-B/C0N.md`.
   3. Close the chunk with a **digest** (max 250 words): the ★5 ids with one-line reasons; the convictions that keep
      appearing, with ids; the tensions; anything unreadable and why.
3. Append the two digests to `notes-B/DIGEST.md`. Tick the session in `PROGRESS-B.md` with the real token spend.
4. Commit `notes-B/` and `PROGRESS-B.md`, push to `miki-explained-series`.
5. Tell the user in about 5 lines: images judged, the ★5s with a short why, the convictions forming, tokens. Then stop.

### Motion session (3)
1. Read `PROGRESS-B.md`, this runbook and `notes-B/DIGEST.md`.
2. For each id in M01, then M02: open `strips/<id>.jpg`. For up to **4** clips that need it, make one extra strip:
   `ffmpeg -ss <t0> -to <t1> -i "<original>" -vf "fps=0.5,scale=384:-2,tile=4x3" -frames:v 1 work/B/strips/<id>_b.jpg`
   If a strip shows only one frame or black, check the file with ffprobe; partial downloads get "Couldn't read", not a guess.
3. Note per clip: the image fields, but replace **Moves** with Camera · Handover · Timing · Entrances/exits · Steal for
   Style B. ★1–3 clips get compact notes.
4. Digest, tick progress, commit, report. Then stop.

### Synthesis session (4)
1. Read `PROGRESS-B.md`, this runbook, `notes-B/DIGEST.md`; grep the ★5 and ★4 notes:
   `grep -A8 "★5" notes-B/*.md`, `grep -A8 "★4" notes-B/*.md`.
2. Pick the **north stars** (10–15 ★5 pieces sharing one point of view) and reopen only those at 768 px.
3. Write `BIBLE-B.md` with the same sections as `BIBLE-A.md` (point of view · convictions · the eye · light (for flat:
   value, shadow shapes, gradients) · colour as meaning · surface/texture · scale and people · camera and motion ·
   handovers · never · adopt/adapt/drop · decisions/questions (max 5) · test plan), **plus (new) §14 Shared with A**:
   which B convictions A should borrow, which A convictions B should borrow, and where they must stay different so the
   A/B test still compares two looks.
   Now read `BIBLE-A.md` for §14 only.
4. Update STATUS.md (BIBLE-B drafted; next: RUNBOOK-C on `~/Desktop/Collecting/Style C`). Point memory `style-ab-test`
   to BIBLE-B.md. Commit and push.
5. Report: point of view, convictions, 5 north stars, questions, the shared-with-A list, tokens. Then stop.

## What I can build for Style B (for Adopt / Adapt / Drop)
- **Reliable:** HyperFrames compositions; hand-authored SVG geometry (rects, circles, paths, polygons, gradients, masks,
  patterns); flat palettes; grain overlays; GSAP-style eased motion, springs without bounce; type set in the scene;
  EX15 captions; the EX27 flatkit (shelf, price line, map lanes, horizon road); real brand logo files.
- **With work:** 2.5D (layered flat planes with parallax, CSS 3D transforms); isometric flat drawings in SVG; texture
  fills (halftone, hatching) — check render speed; morphing paths between shapes.
- **Not reliable:** hand-drawn organic illustration, hands, faces, people beyond tiny pictograms (memory
  `no-hand-coded-organic-art`); tracing generated images (memory `vector-means-redraw`); frame-by-frame character animation.
- **House rules that win:** the real brand logo from frame 1 · EX15 captions at 36 px · visualise the script literally ·
  transitions built from scene assets · no harsh pops (match cuts in identical framing allowed) · retired styles
  (cut-paper, paper diorama, printed 3D) never return.
