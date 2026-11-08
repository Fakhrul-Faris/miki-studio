# RUNBOOK-A — turn the Style A references into BIBLE-A.md

**For a fresh session.** The user cleared the conversation on purpose. Follow these steps in order, exactly. Don't improvise
a different method, don't load the episode skill, and don't start EX28/EX29 work in this session.

## Context (read once)
- **Goal.** One look that holds for a whole series. This file covers **Style A, smooth iso** (3D clay world; current
  reference EX25 99 Speedmart, built in Blender → raea). Styles B and C follow later with their own runbooks.
- **Why it matters.** Without references I default to the "average" look, which the user calls generic. The bible turns
  the user's taste into rules I apply every episode. See memory `anti-slop-design`, `style-ab-test`, `editorial-art-direction`.
- **The user is a filmmaking novice.** Explain in plain words, no jargon without a gloss.
- **The collection.** `~/Desktop/Collecting/Style A/` (1 GB): Core Look, Lighting, Color, Camera, People, Places, Props,
  Type, Motion. **There are no per-image notes**, so the user's reasons are unknown. Infer carefully and ask at step 7.
- **Prep is already done** (`miki-explained/tools/refs_prep.py`, run 2026-11-08). Output is in
  `miki-explained/00_bible/series-bible/work/A/` (git-ignored):
  - `summary.txt`: per-folder measurements; read first, text only
  - `inventory.csv`: one row per image (id, folder, file, size, brightness, contrast, saturation, colourfulness, grain, edges, palette, accent, dup_of)
  - `sheets/<folder>_NN.jpg`: 4×4 contact sheets, each tile labelled with its id (e.g. `core-look-017`)
  - `motion/*.jpg`: 8 frames per clip/GIF; `motion/motion.csv`: duration, cuts per second, motion energy
  - `links.txt`: text from the link files (YouTube, Ordinary Folk, Oddfellows)
  - If `work/A/` is missing, rebuild it (about 3 min):
    `~/.local/bin/uv run --with pillow --with numpy --with opencv-python python miki-explained/tools/refs_prep.py "/Users/user/Desktop/Collecting/Style A" miki-explained/00_bible/series-bible/work/A`

## Token rules (the user asked to keep usage down)
- **Never open a raw reference image.** Only sheets, motion sheets and the crops from step 4.
- **Read each sheet once.** Write findings to `work/A/findings.md` straight after each folder. That file is the memory;
  never re-read a sheet to remember it.
- **Budget:** about 140–170k tokens for the whole run. The sheets are about 1.6k tokens each.
- **Hard caps:** 15 crops in step 4, 12 motion sheets in step 5.
- **If the session gets long,** the findings file lets a new session resume from the next unfinished step. Note the step
  number at the top of `findings.md`.

## Step 1 — Text first (about 5k tokens)
1. Read `work/A/summary.txt`, `work/A/links.txt` and `work/A/motion/motion.csv`.
2. Start `work/A/findings.md` with:
   - a **Numbers** section: what the measurements already say. For example: overall brightness 0.53 (light, not dark like
     EX25), contrast, saturation, grain near zero (clean renders), and the accent hue counts (2026-11-08 run: blue 71, red 42,
     cyan 39, orange 20, green only 4). Flag every clash with the current EX25 look (dark ground, one green accent).
   - a **Questions to check by eye** list.

## Step 2 — Folder passes, one at a time (about 50k tokens)
Order: **Core Look → Lighting → Color → Camera → People → Places → Props → Type.** For each folder:
1. List its sheets: `ls work/A/sheets/<folder>_*.jpg`.
2. Read them one by one with the Read tool.
3. Append one section to `findings.md` before moving on, using this template:

```
## <Folder> (<n> images, <k> sheets)
Repeats (with counts, e.g. "matte clay, no texture: ~60 of 199"):
- light: … · palette/accent: … · materials/surfaces: … · camera/angle/lens: … · composition/negative space: …
- scale/people: … · world type (rooms, cities, objects, diagrams): … · type/UI: …
Clusters (sub-looks inside the folder, with 3 example ids each): A1 …, A2 …, A3 …
Best exemplars (ids, max 6): …
Outliers / one-offs (ids): …
Rule candidates (one line each, with how many images support it): …
```

**What to look for, per folder:**
- **Core Look:** the clusters matter most. 199 images will hold 2–4 different sub-looks. Name each (e.g. "soft pastel
  clay rooms", "dark product renders", "white isometric cities"). Count them and pick the dominant one. The bible picks
  ONE main look; the user's own rule is "one main source per style".
- **Lighting:** key-light direction, softness, rim light, bounce colour, emissive/glow use, shadow density, background
  falloff. Ask whether it lights a set (rooms, streets) or an object on a sweep.
- **Color:** palette families. How many hues, how the accent is used (what it marks), light vs dark ground. Cross-check
  with the accent hue counts.
- **Camera:** isometric/orthographic vs perspective, lens feel (wide/tele), camera height, top-down vs ¾, depth of
  field, crop tightness.
- **People:** level of abstraction (pictogram, capsule, clay figurine, stylised human), face or no face, proportions,
  how they pose. House rule: **figures hold poses only, never walk or gesture** (memory `figures-pose-only`).
- **Places:** which locations, how much detail, cutaways (walls removed), Malaysian specifics.
- **Props:** material treatment of single objects (matte, glossy, bevels, edge wear), icon-like vs realistic.
- **Type:** typefaces, weights, label/callout layouts, how text sits in 3D (on surfaces vs overlay).

## Step 3 — Synthesis (no images)
1. From `findings.md`, write **"The thread"**: 5–8 sentences on what repeats across all folders, i.e. the user's taste
   for Style A.
2. List the **clashes with the current A look** (EX25: near-black ground, flat grey clay, green `#57D100` accent,
   orthographic iso, Isotype/clay figures, Inter Display + IBM Plex Mono, callouts with leader lines).
3. Decide the **dominant cluster**. If two are close, carry both into step 7 as a question for the user.

## Step 4 — Zoom on detail (max 15 crops, about 24k tokens)
Small tiles can't show materials. Pick up to 15 exemplar ids where surface or light detail decides a rule (bevel size,
roughness, subsurface/clay softness, edge wear, emissive bloom, figure faces). Make crops from the originals at 1200 px
long edge, at most 3 per call:

```
~/.local/bin/uv run --with pillow python - <<'EOF'
from PIL import Image; Image.MAX_IMAGE_PIXELS = None
import csv
ids = ["core-look-017"]          # fill in
inv = {r["id"]: r for r in csv.DictReader(open("miki-explained/00_bible/series-bible/work/A/inventory.csv"))}
for i in ids:
    im = Image.open("/Users/user/Desktop/Collecting/Style A/" + inv[i]["file"]).convert("RGB"); im.thumbnail((1200, 1200))
    im.save(f"miki-explained/00_bible/series-bible/work/A/crop_{i}.jpg", quality=85)
EOF
```

Read each crop once. Add a **Detail** section to `findings.md` (material recipe guesses: roughness, bevel, subsurface,
colour of shadows, light size).

## Step 5 — Motion (max 12 motion sheets, about 20k tokens)
1. From `motion.csv`, pick up to 12 clips: prefer the Ordinary Folk / Oddfellows folders, then the longest clips, then
   the rest. Skip the GIFs from Core Look/Lighting unless they look central.
2. Read their motion sheets. Use the numbers for pace (cuts per second, motion energy).
3. Write a **Motion** section: camera moves (orbit, push, crane, isometric slide), how scenes hand over, timing feel
   (snappy vs floaty), how objects enter/exit (scale-in, drop, build-up), loops.
4. YouTube links in `links.txt` can't be watched. List them for the user and note what they likely show (from titles).

## Step 6 — Adopt / Adapt / Drop (no images)
Judge every rule candidate and cluster against what I can produce for Style A:

| I can do reliably (Adopt) | Possible with work (Adapt) | Not reliable yet (Drop, with reason) |
|---|---|---|
| Blender worlds, iso/ortho or perspective cameras, smooth eased camera moves (raea renders) | Detailed procedural cities (slow; library CC0 models help — memory `use-library-3d-models`) | Hand-keyed character acting, gestures, lip sync |
| Matte clay / PBR materials, bevels, colour palettes, one-accent rules | Hero materials from MaterialCraft/TextureCraft (free, untested — memory `tools-radar-2026-11`) | Photoreal humans |
| Area/rim/emissive light, soft shadows, DOF, bloom, fog | Moving people via raea motion capture + IK, rendered toon/clay (needs a test first) | Hero fluid/cloth simulations |
| Posed figures (raea Anny bodies, held poses + goals) | Walk cycles only from mocap, never hand-keyed | Hand-drawn 2D frame-by-frame animation |
| Callouts, type, captions (EX15), counters, UI cards | Glass/translucent looks (render cost) | |

**House rules that win over references:**
- figures hold poses only
- the real brand logo is on screen from frame 1
- EX15 captions, never restyled
- visualise the script literally
- no cheap transitions: build them from the scene's assets
- no floor grid lines
- the retired styles never come back (cut-paper, paper diorama, printed 3D)

Write an **Adopt / Adapt / Drop** table into `findings.md`. Every row needs the reason and the reference ids.

## Step 7 — Write BIBLE-A.md (about 15k output)
Create `miki-explained/00_bible/series-bible/BIBLE-A.md`:
1. **The look in one paragraph** + 6 exemplar ids (the dominant cluster).
2. **Fixed for the whole series:**
   - ground/background
   - palette with hex values and what the accent means
   - materials (clay recipe)
   - light setup (key/fill/rim, colours, softness)
   - camera grammar (projection, angles, lens, moves allowed, shot sizes)
   - composition rules
   - figure rules
   - prop/icon rules
   - type and callouts
   - transitions
   - motion timing (easing, durations)
   - sound feel
3. **Changes per episode:** places, props, story palette within the family, hero device.
4. **Never** list: from Drop, from clashes the user rejects, and from anti-slop.
5. **Adopt / Adapt / Drop** summary for the user, in plain words.
6. **Questions for the user** (max 5), e.g. "light ground or keep the dark ground?", "blue accent instead of green?",
   "cluster A1 or A2?". The references disagree with EX25 here, so the user decides.
7. **Test plan:** 3 stills in Blender (re-light one EX25 shot to the bible + one new shot + one figure shot) and one
   10-second raea test. **Do not build them yet.**

## Step 8 — Hand-off (stop here)
1. Update `miki-explained/STATUS.md`: BIBLE-A drafted, questions pending; B and C collections are in
   `~/Desktop/Collecting/` and need their own runbooks (same method: run `refs_prep.py` on "Style B" / "Style C").
2. Update memory `style-ab-test` with one line pointing to BIBLE-A.md.
3. Commit `BIBLE-A.md`, `RUNBOOK-A.md` and STATUS. The `work/` folder is git-ignored. Push to `miki-explained-series`.
4. **Report to the user:**
   - the thread in 3–4 sentences
   - the dominant look with 3 exemplar ids
   - the clashes with EX25
   - the 5 questions
   - the token use actually spent
   - Then stop and wait. No test builds until the user answers.

## Pending elsewhere (don't do in this session)
- EX28 Apple charger / EX29 Mr DIY Pt 2 scripts await approval (`04_episodes/EX28_apple-charger/`,
  `EX29_mrdiy-margin/`). The user said the bibles come first; Apple is planned as Style C, Mr DIY as Style A.
- Mr DIY 3Q 2026 results are due 10 Nov. Update EX29 numbers if they're out.
