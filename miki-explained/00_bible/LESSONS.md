# LESSONS — my mistakes, why they happened, and the check that now stops them

Written 2026-11-10 at the user's request ("learn from your mistake. preferably make a document rather than memory").
Covers EX28–EX31 and the style tests (2026-11-09 → 11-10). Read with `WORKING-RULES.md` before every task; WORKING-RULES
is the contract, this file is the why behind its checks. Add to it the same day a mistake happens.

---

## The pattern under most of these

**I called work finished on my own judgement, before the evidence said so.** The user then found what a check would have
found: a car through a parked car, an unreadable frame, a silent video, black frames. The fix is the same every time:
**the check runs before I show anything, and I report what it says, not what I hope.**

---

## 1. Objects passing through each other

| When | What the user saw | Why it happened |
|---|---|---|
| EX29 v1 | the coin rolled through the kerb, the man, the stock; the stock slid through the shutter | paths were drawn by eye, never tested against the props |
| EX31 v1 | the Grab car drove through two parked cars, onto the scooter, into the jam car | same; **and raea had written every overlap into its clipping log, which I never read** |

**Now:** anything that moves gets a path file and a collision check *before* any render
(`04_episodes/EX31_grab-cut/build/paths.py`: oriented footprints vs every obstacle, every frame, exit 1 on any overlap).
The film reads the same file, so what is checked is what renders. Falls and bounces use a physics bake
(`_tests/style-test-mrdiy/A2/phys_bake.py` + `phys_check.py`). **Zero `clipping` lines** in raea's preview log and in every
`media/_render/c*.log` before showing anything. Turning cars pivot on their centre: lengthen lane changes so the rear corner
doesn't swing into kerbs and people.

## 2. Frames that don't read

| When | What | Why |
|---|---|---|
| EX30 v1 L04 | "i'm not sure what being shown on this scene" — a worm's-eye factory of silhouettes, 97% in the sky | I checked that the frame looked moody, not that it said anything |
| EX29 v1 | the "?" payoff signs too small on a phone | judged at desktop size |
| EX30/EX31 | "97%" cropped at the edge; the cone under the caption; a lamp and a tree hiding the car on the key words | composition checked in one frame, not across the move |

**Now:** for every beat ask "would a muted viewer know what this is in one second?" Name the place on the place (the
logo on the building). Show objects side-on (head-on silhouettes don't read). Never let the key prop overlap scenery or
the caption band (y ≈ 1340–1420). Check the frame *on the word*, after the camera settles, not mid-move. Keep foreground
props off a tracking camera's line.

## 3. Flicker and black frames

| Cause | Found in | Rule |
|---|---|---|
| a part count that changes between frames (raea re-matches parts by tree order, so models swap) | EX29 | every part exists on every frame; hide by tiny scale, never by not rendering; name moving parts |
| coplanar faces (two kerbs) z-fighting | EX29 | nothing shares a face; tuck one inside the other |
| a physics body that never settles (coin wider than its compartment) | EX29 | size things to fit; the bake must end still (`phys_check.py`) |
| a set far from the origin (x = 200) and a camera inside a volumetric light's range | EX29 | sets within ~60 m of the origin; cameras outside light ranges |
| long single renders: alternate frames drift, black frames, GPU error state | EX29, EX31 | `tools/raea/render_ep.sh`: 300-frame chunks, every frame checked, bad frames re-rendered in small batches |

## 4. Washout

| When | Why |
|---|---|
| EX29 interior, EX28 rack close-up | the camera sat inside a volumetric spotlight's cone / a fog volume |

**Now:** dim the cone and the fog when the camera is near (a `near` factor), and check contrast on every shot, not only
the wide ones.

## 5. Delivering incomplete work

| What | Why | Now |
|---|---|---|
| EX29 v1 shipped silent ("where's the sound effect") | I treated sound as a later step | sound is in the **first** preview; the mix is measured to −14 LUFS (`build/sfx.py` pattern) |
| captions at 46 px while the rule said 36 px | the raea kit had an old value; I trusted the kit over the rule | the kit now says 36 px; check the rule, not the code |
| "final quality" claims before the gates | optimism | say plainly what still fails, every time |

## 6. Planning around things that aren't true

| What | Why | Now |
|---|---|---|
| EX30 planned on Seedream plates + Seedance clips — the user has no subscription | never asked; the fact wasn't written down | ask before assuming any paid tool; Style C builds locally in raea's painted look (WORKING-RULES §1, §8) |
| per-shot first/last keyframes in Seedance proposed again | ignored a recorded result (they were poor) | read the tool notes before proposing a method |
| Style A rebuilt at eye level after a note about detail (v2) | answered a quality note by changing the style | fix only what the note names; locked traits stay |
| using an old pipeline (EX26 plate pushes) for a new style | habit | design from the bible, not the last episode |
| the window-light patch proposed again for EX32 after EX28 ("don't use windows light on every episode. chase new idea") | reusing my last good idea | each episode's light comes from its own story (EX32: the printer's scan bar and print head); list the last 3 episodes' light ideas and don't repeat one |

## 7. Time and process

| What | Cost | Now |
|---|---|---|
| EX29 took ~3 h: full renders to check single changes, renders without chunking, waiting on renders | hours | look at 540 px contact sheets (`tools/raea/preview.sh`); batch all fixes, then **one** full render per approval |
| the Mac slept mid-render (6 h lost) | a night | `render_ep.sh` runs `caffeinate`; the lid must stay open unless on power with an external display |
| one 3-frame render per bad frame (~2 min each) | 30+ min | bad frames repaired in batches of ≤ 8 |
| a failed chunk killed the whole render | a re-render | failed chunks retry, then split; `RESUME=1` keeps finished frames |
| the final check needed the internet (`uv` resolving packages) and died when the connection dropped | a re-run | the check runs `uv --offline` (packages cached) |
| I edited `render_ep.sh` while it was running | risk of the shell reading garbage | never edit a running script; stop it, edit, resume with `RESUME=1` |

## 8. Editing mistakes in my own code

| What | Now |
|---|---|
| text spliced by index offsets computed *before* other edits shifted them (EX31 `sfx.py`, broken lines) | splice by unique anchor strings (`replace` with an assert on the count), never by stale indexes |
| a replacement range that silently swallowed the next block (EX30 beat cameras and `CX` vanished) | check the slice end lands where intended; render one frame right after every structural edit |
| a `//` comment pasted mid-line ate the rest of the line (TSX) | use `/* … */` inside lines |
| **repeated in EX33** (a JS line in `world.src.html`: "tip is not defined", 1 min lost) | any edit that adds a comment to the end of an existing code line uses `/* … */` — check the replacement string for `//` before running it |
| EX33: a value read from the DOM (`data-duration`) was NaN inside the film, blanking the 3D world with no error | bake constants into generated code; when a frame is blank but nothing throws, look for NaN first |

## 9. Facts

- Every number on screen has a source in `episode.md`; anything not confirmed carries a ⚠ and a fallback line
  (EX29 "1,600 stores" / 3Q results, EX30 store count and RM2, EX31 "by law").
- Logos: official files only, with the source written in `02_kit/brand/logos/CREDITS.md` (apple.com nav SVG, Mixue and
  Grab via their Wikimedia files when the official sites block downloads).

## 10. What worked (keep doing)

- Contact sheets of every beat before a build, judged against the user's last words.
- One source of truth for timing (`audio/vo_timeline.json`), motion (`paths.json`, `phys_s3.json`) and captions.
- Reading the user's feedback literally and fixing exactly that, then saying what still fails.
- Telegram + dashboard updated at the end of every episode; `/scheduled exNN` after the user schedules in TikTok Studio.
