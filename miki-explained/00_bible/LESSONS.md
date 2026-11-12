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
| EX36 art direction v1 cited BIBLE-B north-star ids from memory, never looked at them, and packed 4–6 objects into every frame ("do you use the skill we learn when we did art direction analysis homework?") | I used the bible as a citation list instead of doing the method | open the north stars at 768 px (`series-bible/work/B/view/`) before any frame brief; write each frame as Ref → Idea → Decision → Eye → Feeling → Not generic because → Moves → Handover; one decision per frame; then check the light idea against the last 3 episodes and the window-light rule |
| EX37 Style A stills cost hours on raea gotchas: a price board kept its old text; a label never grew; frames silently never rendered; the kitchen shot looked at a plaster wall | raea fixes a part's shape on its first frame (Text3D content and size are shape); a Cylinder with a negative height makes raea REFUSE the frame (my `timeout … | grep` hid the REFUSED line); the closed shophouse models have a solid wall behind the shutter | text variants = separate named parts shown by scale; animate size by transform scale; clamp every computed size > 0; never filter a render's output without REFUSED/APPLIED; interiors use `shophouse_A_open.glb` |

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

## 11. Clever mechanism, plain picture (EX34, 2026-11-10)

The user: "this round it become plain back, not enough detail. not good. and this topic should be longer. the motion
is not on point … i like the ex33 better."

| What went wrong | Why it happened | Now |
|---|---|---|
| **Plain, under-detailed frames.** A big empty apron, procedural planes with only windows and a stripe, a box hangar, a box truck. EX33 was dense close-up objects (rivets, tags, shelves of frames, a map of 90 shops); EX34 was mostly concrete seen from far away | I spent the effort on the tricks (shadow-only casters, the sun's path, the coin's spin maths) and treated the objects as stand-ins. The scale of an airport put the camera far back, so even the detail I had disappeared | **Detail before mechanism.** Every frame needs EX33's density at phone size: objects close enough to read, with inner detail (panel lines, doors, ground equipment, people-free life on the apron, signage). A trick goes on top of a rich frame, never in place of one. If the world is huge, build the close-up props first and frame tight |
| **Too short for the story.** 2001 → one year later → 2024 squeezed into 31 s: each beat got 2–3 s | I kept the 25–30 s habit from the "How it makes money" shorts | A story with a timeline or several turns is **long-edu (60 s+)**, memory `long-edu-direction`. Decide the length from the story's beats before writing the script |
| **Motion not on point** (the user's words; what they meant exactly is to confirm next time). What I can see: the plane rose straight up off its stand like a toy; the catering truck and the coin's shadow slid rather than drove/turned; long camera flights between far-apart places (high → low → high); the fleet's shadows strobed past; the board→fleet→coin moves still crowded | I moved the camera across a big world to reach each beat and kept the story objects mostly static, instead of letting the objects carry the motion in a few well-framed places | Motion is planned with the shot list, not fixed with frame-diff numbers: objects move the way they really do (a plane taxis and turns, then rolls and rotates on a runway; vehicles turn their wheels), the camera stays near the action, and no flight goes far without a reason. Ask the user what "on point" means before the next motion-heavy build |
| **Shipped a new direction straight to final** | "go beyond now" read as "don't stop" | A new direction still gets one preview to the user before the final render (WORKING-RULES §0.4). "Go" means work without small questions, not skip the look |

## 12. EX35 build mistakes (2026-11-10/11)

| What | Why | Now |
|---|---|---|
| A block of kiosk detail vanished between two patches | a later replacement spanned "from X to Y" and Y came after the inserted block (LESSONS §8, again) | after any range replacement, grep for the keys that should still be there; prefer anchor-to-anchor edits of one statement |
| Price tags, the A-board and a floor label never showed | `ImagePlane`'s `width` was animated: raea keeps a part's shape fixed, so the plane never drew | animate scale on a fixed-size board (`Cuboid` + `Lit` texture), never a size prop |
| Cups half-sunk into the counter, lids floating | `manifold.cone` is centred on its length (cylinder isn't); I guessed the rotation sign twice | test a new solid in a 1-object scene before placing it |
| The kiosk's base flickered | its bottom face sat exactly on the plaza's top face (coplanar) | sink every object 1 cm into what it stands on |
| Photo textures (plaster, concrete) turned the white world brown | their diffuse colours are tan; tint × photo darkens | in a toned world use relief (normal/roughness) maps with chosen tints; photo diffuse only where its colour is wanted |
| A 10 fps flipbook preview read as "choppy" to the user | I saved time and didn't say what it was | when motion is judged, preview at the film's frame rate (or say clearly it's a flipbook) |

## 10. What worked (keep doing)

- Contact sheets of every beat before a build, judged against the user's last words.
- One source of truth for timing (`audio/vo_timeline.json`), motion (`paths.json`, `phys_s3.json`) and captions.
- Reading the user's feedback literally and fixing exactly that, then saying what still fails.
- Telegram + dashboard updated at the end of every episode; `/scheduled exNN` after the user schedules in TikTok Studio.

## 7. Motion that isn't smooth (EX31, 2026-11-11)

| What the user saw | Why | Check now |
|---|---|---|
| camera whips (a 77 m flight in 0.85 s; tilts at 225°/s) | each move eased on its own, judged on stills; nobody measured speed | the camera is data in `paths.py`; it prints peak acceleration and I check speed and turn rate per half second before any render |
| the car stops, then restarts at full speed (0:12.7) | two easings joined: in-out to a stop, then ease-out (full speed at its start) | one eased move per action; an ease-out never starts from a standstill |
| the jam cars stop dead at 15.6 s | ease-in with nothing after it | moving traffic keeps going out of frame |
| the car turns 180° while parked (0:27–0:28) | heading taken from frame-to-frame motion, so a cut's teleport turned it backwards | ignore any step over 1 m when computing heading |
| the road flickers under the tracking camera (0:14) | big soft sun (`soft_shadow_size` 1.2): Bevy's dithered penumbra crawls as the camera moves | sun 0.5, `mapSize` 8192, `firstCascade` at the tracking distance |

## 13. "1:1 with the reference" built from a summary (EX38 v1, 2026-11-12)

| What went wrong | Why | Now |
|---|---|---|
| 5 setups in 59 s where the reference has one every 2.3 s; camera only pushed, panned and pulled | I looked at the reference at 1 frame/s and trusted a cut detector ("0 cuts" → "one continuous move") | For a "copy this" brief: 5 frames/s sheets of the whole reference, a shot log (setup, camera, events, times), and a count of setups per second **before** any plan. `series-bible/STUDY-D.md` is the pattern |
| Captions switched on with no animation; a static highlight box | I copied the caption's look from a still | Read type animation at the video's full frame rate; write it as timings (frames) before coding |
| Showed a full preview before the user saw a shot list or a board | I treated "all yes" as approval of whatever I built | A new format still goes shot list → board → build (WORKING-RULES §7); "yes" to a plan is not a yes to skipping its gates |
| Generated the voice in VoiceStudio, could not hear it, shipped it in the preview | I can check words by transcript, not quality | Voice quality is the user's ear; never present a generated voice as usable |

