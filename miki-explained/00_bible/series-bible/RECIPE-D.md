# RECIPE-D — how to make a Style D episode (the EX38 Eco-Shop recipe)

Written 2026-11-13 for whichever model builds the next one. The user approved EX38 preview v2 with "i really really love
this. everything is perfect" and asked for this file so the same result can be produced again.

Read this with:
- `STUDY-D.md` (same folder): what the three reference videos do, measured frame by frame. It is the standard.
- `../WORKING-RULES.md` and `../LESSONS.md`: house rules. They win over this file if they disagree.
- The working example: `04_episodes/EX38_ecoshop-rm260/`. Copy its `build/` folder to start a new episode; do not start
  from an empty file.

## 0. What the user is buying

A 55–60 s vertical explainer about one Malaysian brand, in the look of the reference account: a dark studio world, one
real object as hero, one accent colour, and a picture that changes every two to three seconds exactly on the spoken word.

The first EX38 preview was rejected as "lazy work": it had 5 camera setups in 59 s, pan and zoom only, and subtitles that
switched on without motion. The approved one has 27 setups, objects that change state, and subtitles that animate in and
out. **Density and events on the words are the format.** A beautiful single shot fails; 27 decent setups pass.

Three numbers to hit, from STUDY-D:

| | Target | EX38 v2 |
|---|---|---|
| Setups | one every 2–2.5 s | 27 in 59.5 s |
| Events inside a setup (label, counter, object change) | 1–4, each on a word | 1–3 |
| Voice | about 3.4 words per second | 196 words in 58 s |

## 0.1 Before drafting anything: read this file, then ask the user

User, 2026-11-13: "go through the recipe and ask me question before drafting anything." This is a standing instruction.
Read this whole file and `STUDY-D.md`, then ask these in one batch (AskUserQuestion, with your recommended option first)
and wait for the answers. No script, shot list, board or code before them.

1. Which brand or topic? (Offer two or three from `03_ideas/content-bank.md` that fit the series, with your pick.)
2. What is the angle: which contradiction should frame 0 state?
3. Does the user already have sources, numbers or a photo of the hero object? If not, say which object you propose.
4. Length and pace: the EX38 default (about 58 s, 3.4 words per second) or different?
5. Voice: the user records in ElevenLabs as before?
6. Anything to change from EX38: accent colour, sets, subtitle style, the known gaps in § 12 to fix first?

## 1. The order of work, and the gates

The user wants to see each stage before the next one is built. Skipping a gate cost a full rebuild on EX38.

1. **Pick the story** and read the sources yourself (§2).
2. **Script**: show it, wait for approval (§3).
3. **Shot list**: one table row per setup. Show it, wait for "ok" (§4).
4. **Art direction in five lines** (hero object, accent colour, what is grey, font, sets). Wait for "ok".
5. **Board**: one still per setup, each beside the reference frame it is modelled on (§7). Run the critic (§10). Show it.
6. **Animated preview** with a scratch or final voice (§8). Run the critic. Show it.
7. Voice from the user, sound, final render, cover: only after the preview is approved.

When the user says "proceed", continue to the next gate without asking again.

## 2. Facts

- Every number on screen or in the voice comes from an article you opened and read. A search-result summary is not a
  read. EX38 nearly shipped a margin figure that existed only in a search summary; it was replaced by one read at source.
- If you calculate a number, write the calculation in `episode.md` and say "about" (EX38: 33.3 % × RM2.60 = about 87 sen,
  labelled "average").
- Describe the company; never accuse it. A forecast is labelled as a forecast and "not announced by <company>" on screen.
- Put quote marks only round words you verified. Illustrations (an invented label, a payslip, dot positions on a map) say
  "illustration" or "illustrative" in small type on the frame.
- Keep a "Not claimed" list in `episode.md` so the script does not drift into claims the sources do not make.

## 3. Script

The user's technique (binding for this style):
- Frame-0 text of 8 words or fewer that states a contradiction (EX38: "Everything RM2.60. Record profit margin.").
- One idea. About 11 lines, 180–200 spoken words.
- End text of 7 words or fewer, a question the viewer can take a side on. Never a request to follow.
- A loop: the last frame returns to the first frame's object and framing.
- A caption line and hashtags.
- A separate voice text for ElevenLabs v4: numbers as words, "…" for a pause, capitals for stress. The user records the
  voice. Do not generate a final voice yourself.

Write lines that can be shown literally: "Imagine one bottle on that shelf" is easy to film; "the business model is
efficient" is not.

## 4. Shot list

For each script line plan 2–4 setups. Each row has: the words it covers, the camera, and what changes on which word.

Rules that made EX38 work:
- **A setup is a new framing or place, or the same object in a new state from a new angle.** Not a continued drift.
- **No setup longer than about 4 s** unless something keeps building in it.
- **Use the whole camera vocabulary at least once**: macro, rack focus, orbit to top-down, crane, eye-level frontal, low
  grazing angle, tilted horizon, pull-out into a void, one scale travel (object → store → country).
- **Objects change state**: go x-ray, slice, multiply with a counter, stack, flip, light up one by one.
- **Return to the hero**: the opening object comes back in the middle and at the end.
- No hands and no people (house rule). Things move by themselves.

EX38's 27 rows are in its `episode.md` under "Shot list v2". Use them as the model for how specific a row must be.

## 5. The world: sets, hero, colour

- **One accent colour**, the brand's own (Eco-Shop red `#c8202a`, emissive `#ff3b3b`). Everything else is near-black
  (`#0d0e11`) and neutral grey.
- **Hero object**: something every customer has touched (the shopping bag), with its true print, from the user's photo.
- **Real logo only**, from a licensed source, credited in `02_kit/brand/logos/CREDITS.md` and `episode.md`.
- **Library models** from Poly Haven (CC0) via `tools/polyhaven_get.py`. Make them grey with `build/grey.py`, which
  desaturates each model's own colour texture and keeps its print, wear and weave. Do not repaint them with a flat
  colour: that was tried first and they looked like clay.
- **Build your own solid** for anything that must change shape (EX38's bottle is a revolved profile so it can be cut into
  26 discs). Library models cannot be sliced.
- **Documents carry real wording**: calendar with the true date, a note quoting the article. Draw them as textures with
  PIL (`build/tex.py`).
- **Sets are small and far apart** so they never see each other. EX38 has: a counter with a shelf run behind it; a shop
  aisle of two gondolas; four "voids" (a lit grey floor in darkness) for data moments; a quay with a container; a dot map
  from Natural Earth data. Each set brings its own lights.
- A void still needs a floor that catches light and a red spill from the accent object, or it reads as a slide.

## 6. How the film file is built

`build/kit.part.tsx` (parts) + `build/film2.part.tsx` (time, sets, setups, camera, captions, overlay) are joined with
`cat` into `film2.tsx`. It has two compositions from the same code: `film` (the video) and `board` (27 stills).
Renderer is raea (load the `raea-bevy` skill first). Blender is only for building models raea cannot.

### 6.1 Time hangs on words

`tl.json` holds every caption word with the second it is spoken (made by `timeline.py` from the voice files).

```ts
const W = (i) => CAPS[i].t;                 // second at which word i is spoken
const ST = [0, W(2) - 0.05, W(4) - 0.05, W(9), ...];   // setup k runs ST[k-1] .. ST[k]
const on = (i, d = 0.3, off = 0) => ss(T, W(i) + off, W(i) + off + d);   // 0 → 1 starting on word i
```

Every event is written against a word index, never a hard-coded second. When the user delivers a new voice, re-run
`timeline.py` and the whole film re-times itself. Print the word list with indices once and keep it open while writing.

### 6.2 A setup is data

```ts
{ set: "c", a: {p, l}, b: {p, l}, fov, fs, up?, tr?, fd?, tags?, count?, note?, src?, cap }
```

- `a` → `b`: camera position and look-at at the start and end of the setup. The camera always drifts; it never holds.
- `fov` 16–36°, `fs` the f-stop, `up` a tilted up-vector for a Dutch tilt, `fd` a function for a rack focus.
- `tr`: how to arrive from a different set: `"in"` (push through), `"out"` (pull back), `"side"`.
- `tags`: labels with a world anchor, a screen position and the second they appear. `count`: a counter that counts up.
- `fromT(target, direction, distance)` places a camera by direction and distance from its subject. It is the fastest way
  to frame; then adjust distance until the subject sits in the 25–60 % band of the frame height.

### 6.3 Camera

- Inside a setup: `u = 0.55·x + 0.45·smoothstep(x)`, so the move has a soft start and never fully stops.
- Next setup on the **same set**: blend the two cameras over about 0.5 s around the boundary. This is a real flight.
- Next setup on **another set**: the outgoing camera accelerates along its axis for 0.2 s, the incoming one decelerates
  for 0.26 s, a dark overlay peaks for about two frames, and `<MotionBlur shutterAngle={1} samples={6} />` is on only
  during these windows. The world swaps at the boundary frame.
- Everything that belongs to both setups of a same-set flight must exist in both (EX38's documents sit on the counter for
  setups 17–23), and lights fade by time ramps, not by setup number, or they pop mid-flight.

### 6.4 Sets read the clock

Each set is a function of the setup number `n` and the global time `T`. State changes are short ramps:

```ts
const xr = n === 2 ? on(3, 0.35) : ...;            // bag goes x-ray on "everything"
<Coins n={20 * lin(ST[4] + 0.1, W(17) + 0.1)} />   // a stack grows one coin at a time; the top coin is still falling
<Sliced gap={0.0032 * on(42, 0.4)} lift={0.035 * on(43, 0.4)} heat={on(43, 0.4)} />
```

Useful parts in the kit: `Sign` (split-flap: each flap closes, swaps its texture, opens; also a "shiver"), `Coins`,
`Bag` (solid ↔ x-ray outline), `Sliced`, `Card` (a textured page; `Under` draws a red underline on it), `Product`.

Things appear by scaling from near zero on **all three axes**, or by being added with a `name`. Stagger groups by
0.05–0.1 s per item so they arrive as a run, not a block.

### 6.5 Subtitles (measured from the reference at 30 frames/s)

- Top of frame, centred, Outfit, 66 px on a 1080 frame, at most two lines.
- A phrase is 2–5 words: break at punctuation or after four words; fold a single trailing word into the phrase before it.
- A word appears on its spoken time. Frame one: blurred 5 px, grey, 7 px low. Frame two: sharp, bold, white, in place.
- Earlier words in the phrase drop to weight 300, grey `#9a9da4`.
- The key word (one per phrase at most: the number, the name, the verb) gets a box that draws on: corner dots, then the
  top and bottom edges left to right over two frames, then the sides and a dark-blue fill.
- The phrase dims over its last three frames and leaves two empty frames before the next.
- A short joining word ("and", "the", "at") that falls before a pause waits and appears with the next word, so it never
  sits alone on screen.

### 6.6 Overlay

- Labels: small spaced capitals, a larger value under them, a thin white leader line that draws from a dot on the object.
  The anchor is projected through the *current* camera each frame so it follows the move.
- Counters: big numerals top-left with a small unit line, always counting up over 0.3–0.8 s to land on the word.
- Source line with the logo under the subtitle whenever a sourced number is on screen.
- Small grey notes bottom-left for "illustration" and calculations.
- Dark gradients over the top 470 px and the bottom 440 px keep text readable and leave room for the app's own captions.
- Everything belonging to a setup fades out 0.2 s before the next setup.

### 6.7 Look settings that worked

```tsx
<DepthOfField mode="Gaussian" aperture_f_stops={fs} focal_distance={fd}
              max_circle_of_confusion_diameter={lerp(14, 48, ss(dist, 0.55, 0.95))} />
<Bloom intensity={0.7} threshold={0.9} />
<ToneMapping mode="aces" exposure={0.35} />
<AmbientLight brightness={95} color="#b4bccb" />
<Environment src="sky.hdr" intensity={0.3} />
```

Key light per set: a warm `RectLight` above and in front of the subject plus one shadow-casting `SpotLight`; a cool
`RectLight` on the background shelf. Emissive `glow(HOT, 2–4)` on anything that should read as lit red.

## 7. Board

Render `--composition board`: frame k shows setup k at `ST[k+1] − 0.22 s`, when its events have landed.
`build/board_sheets.py` makes the numbered sheet and the pairs beside the reference frames. Check every still for:
subject in the 25–60 % band; nothing clipped by the frame edge; no text over the hero object; no two stills from the
same angle; one accent; readable at phone size.

## 8. Preview

`build/preview2.sh` renders 1080×1920 at 30 fps in 300-frame chunks (long single runs drift) and joins them with the
voice. About 5 minutes for 60 s. `RESUME=1` re-renders only chunks whose last frame you deleted.

Then look at it before the user does:
- a sheet with one frame every 0.5 s (are any two neighbouring cells the same picture?);
- ten frames around every set change (how many are empty or black?);
- a strip of the subtitle area at 30 frames/s for one second (does the word blur in, does the box draw?);
- the raea log's `clipping:` lines.

## 9. raea traps met on EX38

- Portrait frames are narrow: visible width ≈ 0.5625 × 2 × distance × tan(fov/2). Frame by the subject's width.
- A `RectLight` between camera and subject shows as a white panel. Large or far sets need a `DirectionalLight`.
- "Bokeh" depth of field smears at macro distances; use `mode="Gaussian"` and the confusion limit above.
- A sudden aperture change corrupts frames; ramp it.
- A boolean-subtracted hollow box (the container shell) did not draw at all; build hollow things from plain wall cuboids.
- Metallic 0.9 goes black in a dark room; stay near 0.35–0.7 and give the room an `Environment`.
- A hidden part scaled on one axis leaves a visible plate; scale all three.
- Negative modulo indices crash lookups; add a multiple before `%`.
- The default font is a serif. Put the font file in `media/fonts/` and declare it with `@font-face` in a `<style>`; set
  `fontFamily` on every text element. Check which font actually rendered: EX38's board ran on a fallback unnoticed.
- A filled box drawn as a child covers the word; put the fill on the word's own `background`.
- `ffmpeg` on this machine has no `drawtext`; stamp sheets with PIL.

## 10. The critic

Before showing a board or a preview, start one separate review agent that sees only the renders, the reference pairs,
`STUDY-D.md` and `episode.md`, and ask it for scores, the worst problems with timestamps, clipped or overlapping text,
and any number that does not match the sources. Fix what it finds on facts and readability before showing. Tell the
user its scores and what you did not fix. EX38's board v1 was scored "do not show" and was right.

## 11. What to tell the user

Give the file path, what changed since the last version, the critic's scores, and an honest list of what is still weak.
The user called v2 "perfect" with that list in front of them; they want the truth beside the work, not a sales line.

## 12. Known gaps in EX38 v2 (do not copy these as if they were the target)

- Set changes pass through about two dark frames. The reference carries an object through each change instead.
- The aisle setups (48–53 s) read as red lines on black and hold too long.
- Coins look like grey cylinders; rooms are darker and flatter than the reference.
- The subtitle line jumps when it re-centres; the reference eases it over three frames.
- Bottom disclaimers are small for a phone; a few labels touch objects.
- No sound design yet; the voice in the preview is a scratch take.

## 13. Checklist before each gate

- [ ] Every number traced to an article that was opened and read; calculations written down; forecasts labelled.
- [ ] Setups ≥ length ÷ 2.5 s; no setup over 4 s without a build; every script line has a picture for each claim.
- [ ] All six camera types used; hero object returns at the end; last frame matches the first.
- [ ] One accent colour; real logo; no hands or people; no flat-repainted models.
- [ ] Events written against word indices, none against hard-coded seconds.
- [ ] Subtitles: blur-in, grey trail, drawn box, dim-out, no orphan words.
- [ ] Half-second sheet, transition frames, subtitle strip and clipping log all looked at.
- [ ] Critic run; scores and remaining gaps reported.

---

# Part 2 — camera, animation and timing in detail

Part 1 says what to build. This part gives the numbers used in EX38 so the moves can be reproduced, not re-invented.
All values are from `04_episodes/EX38_ecoshop-rm260/build/film2.part.tsx`. Distances are metres; the hero sign is 0.2 m
wide, the bag 0.45 m, a coin 2.6 cm.

## 14. Camera cookbook

Each entry: what it is for, start pose → end pose, lens, and the one thing that makes it work.
`fromT(target, direction, distance)` = camera placed `distance` from `target` along `direction`.

| Move | Used in | Start → end | Lens | What makes it work |
|---|---|---|---|---|
| **Macro push** | 1, 23 | `fromT(sign, [0.12, 0.06, 1], 1.25)` → same direction at 1.05 | fov 26, f/2.8 | Slightly off-axis and slightly above; the push is only 16 % of the distance, so type stays readable. |
| **Rack focus + tilt** | 2 | look-at slides from the sign to the bag; position moves back to 2.15 m | fov 30, f/2 | Focus distance goes 1.2 → 2.15 over 0.4 s, starting 0.05 s into the setup. Needs a wide aperture or nobody sees it. |
| **Orbit to top-down** | 3 | `[0.3, 2.5, 2.0]` → `[0, 4.25, 0.5]`, looking at the counter | fov 34, f/8 | Position moves up and over while the look-at stays; keep 0.5 m of offset so it is never exactly vertical. |
| **Low push on a small thing** | 4 | direction `[-0.3, 0.5, 0.85]` at 1.7 → `[-0.45, 0.16, 0.85]` at 1.2 | fov 26, f/2.4 | Drops from 30° down to almost table height while closing in; background products go soft. |
| **Pull out into a void** | 5 | 0.62 → 1.0 from 7 cm coin stacks | fov 26, f/4 | Starts so close that the first coin fills the frame, then reveals the row as the stacks grow. |
| **Low skim with tilted horizon** | 6 | camera 3 cm above the floor, sliding 15 cm sideways | fov 30, f/4, up `[0.2, 1, 0]` | The up-vector gives an 11° tilt. Keep f/4: a very high f-number blurred everything in this renderer. |
| **Eye-level frontal + rack** | 7 | 0.8 m dolly toward the shelf at eye height 1.3 m | fov 30, f/2 | Focus starts on the near shelf end (0.9 m) and racks to the bottle on its word. |
| **Macro on a price label** | 8 | 0.78 → 0.54 from the shelf sign, swinging 10° | fov 26, f/2.8 | Camera comes from the aisle side so the shelf above and below frames the sign. |
| **High three-quarter on one object** | 9 | direction `[0.4, 0.55, 0.75]` at 1.35 | fov 26, f/5.6 | 40° down: shows the top and the side, so slices read as discs. |
| **Side elevation, slight tilt** | 10 | drops to 4° above level at 1.3 m | fov 26, up `[-0.1, 1, 0]` | Look-at is set *above* the object's middle so the object sits lower in the frame, under the subtitle. |
| **Label macro with a travelling light** | 11 | 0.44 → 0.40, sliding 12° round the bottle | fov 26, f/4, up `[-0.16, 1, 0]` | The room is dimmed to 32 % and a narrow spot (outer angle 0.13) sweeps across the print during the setup. |
| **Pull back along a shelf** | 12 | 1 m backward travel, look-at fixed down the shelf | fov 30, f/2.8 | Reveals item after item; events (red bars) land in the revealed space. |
| **Crane up to top-down** | 13 | height 3.5 → 4.3 over ten products | fov 26, f/8 | Check the row's width against the portrait frame at the *start* height, not only the end. |
| **Descend to a pair** | 14 | from 35° down at 2.0 → 11° at 1.5 | fov 26, f/4 | The ten products shrink away during the descent and two objects grow in. |
| **Scale travel** | 15 | close on one carton → 10.6 m back, 2.3 m up, container in view | fov 36, f/5.6 | The widest lens in the film; the hero carton stays in the foreground for scale. |
| **Tilted top-down map** | 16 | height 4.9 → 5.9 | fov 34, up `[-0.64, 0, -0.77]` | The up-vector rotates a wide country so its long axis runs down the tall frame. |
| **Grazing angle** | 17 | 5 cm above the counter, 0.5 m from the sign, arcing 20° to the front | fov 26, f/2.4 | Type in steep perspective; then the arc brings it readable. |
| **Long-lens frontal** | 18 | 1.55 → 1.34, dead centre | **fov 16**, f/4 | The flattened, formal frame is the contrast after the grazing angle. Used once. |
| **Wider with a prop** | 19 | pulls back to 2.05 and shifts left to bring the calendar in | fov 30, f/2.8 | The new prop tilts up into the space the pull-back opens. |
| **Document under a spotlight** | 20, 22 | 60–70° above the page at 0.7–0.9 m, small rise | fov 26, f/4–5.6, up tilted ±0.1–0.22 | Room lights drop to 20 %, one narrow spot on the page, the page rotated 7–10° on the table. |
| **Display, low three-quarter** | 21 | 13 cm sideways drift | fov 26, f/2.8 | Its own small `RectLight`; everything else dark. |
| **Aisle pull-out, then crane** | 24, 25 | 1 m back at eye height; then up to 3.6 m looking down the aisle | fov 34 | Shelf lips light one after another during the pull-out. |
| **Dive to the loop** | 27 | from 2.3 m, 22° above, down to setup 1's exact start pose | fov 26, f/2.8 | Reaches the end pose at 55 % of the setup and holds, so the last frame equals frame 0. |

Rules across all of them:

- **Never static.** The smallest move in the film is a 13 cm drift.
- **In-setup easing:** `u = 0.55·x + 0.45·smoothstep(x)` (x = progress 0–1). It starts moving at once and is still
  moving at the end, so the next flight picks it up without a stop.
- **Lens by job:** 26° for objects and macros, 30–34° for places, 36° once for the widest, 16° once for the flat frontal.
- **Aperture by job:** f/2–2.8 for racks and macros with a soft background, f/4–5.6 for objects with labels,
  f/8–11 for top-downs so the whole table is sharp.
- **Neighbours differ.** Check the list in order: angle, height, lens or distance must change between each pair.
- **Framing:** the subject's centre at about 40–45 % of the frame height; raise the look-at to push the subject down.

## 15. Joining setups

**Same set (a flight).** For `ST − 0.2 s` to `ST + 0.32 s`, blend position, look-at, fov, up-vector, f-stop and focus
distance between the outgoing and incoming cameras with a smoothstep. Both cameras keep running their own drift while
blended. `MotionBlur` is on for that window. Lights that differ between the two setups are multiplied by time ramps
over the same window.

**Different set (a push or pull through the dark).**

| | Outgoing, last 0.20 s | Incoming, first 0.26 s |
|---|---|---|
| `tr: "in"` (dive into the next thing) | pushes 60 % of the way to its target | starts 160 % further back and settles |
| `tr: "out"` (pull back to the next place) | pulls back by 160 % | starts 60 % closer and settles |
| `tr: "side"` | slides sideways by half its distance | arrives from the other side |

Both use `q²` (accelerate out, decelerate in). A dark overlay of `0.9·q³` peaks for about two frames at the boundary;
`MotionBlur shutterAngle={1} samples={6}` covers the window. Choose `in` when the next setup is smaller in scale, `out`
when it is larger, so the direction of travel means something.

## 16. Animation cookbook

Every value is a duration in seconds from the word that triggers it. Easing is smoothstep unless it says linear.
There is no bounce or overshoot anywhere (house rule).

| Thing | How it moves | Timing |
|---|---|---|
| **Bag goes x-ray** | shell and print fade to 6 % alpha, twelve glowing edge bars fade up, a red point light inside ramps up | 0.35 on the word |
| **Products appear inside** | scale 0 → 0.42 | 0.3 each, 0.02 stagger |
| **Products fly out to a ring** | position inside → ring, on an arc 0.3 m high (`sin(π·u)`), scale 0.42 → 0.8, turning to face outward | 0.5 each, 0.055 stagger, so twelve take about 1.1 |
| **Price tags after landing** | scale 0 → 1 flat on the table | 0.2, starting 0.04 after its product lands |
| **Coin stack grows** | coin count rises linearly; the top coin falls 4.5 cm with `(1−f)²` | spread across the words of the phrase (0.6–1.5 for 14–33 coins) |
| **Row of stacks** | one stack after another, the last one's top coins red and glowing | each starts as the previous finishes |
| **Split-flap digit change** | each flap's height goes to 0 and back (`|cos(π·u)|`), texture swaps at the middle | 0.45 total, flaps offset by 0.12 of the progress |
| **Flap shiver** | each flap's height dips 45 % and returns, running left to right | 0.55 |
| **Bottle slices** | gaps between 26 discs open to 3.2 mm; one word later the top discs lift 3.5 cm, turn red and glow | 0.4, then 0.4 |
| **Underline on a document** | red bar grows from the left (scale x from a left-anchored position) | 0.3 |
| **Red bars landing on shelf labels** | scale 1.8 → 1 while moving 5 cm in | 0.16 each, 0.09 stagger |
| **Discs lighting under products** | flat disc scales 0 → 1 | 0.25 each, 0.1 stagger, starting 0.2 before the number is said |
| **One group swaps for another** | old group scales to 0 while the new scales up from 0 | 0.4 across the flight between the two setups |
| **Cartons slide out of the container** | 3.4 m along the floor, small turn at the end | 0.65 each; next column +0.22, next layer +0.12 |
| **Prop arrives (calendar)** | tips up from flat to standing while rising 13 cm | 0.4, starting 0.25 before its word |
| **Map dots light up** | dots turn red in order of longitude | linear over the phrase (about 1.5) |
| **Map wave** | a white band 14 % of the map wide sweeps west to east; dots in it rise 6 mm and grow 40 % | linear, about 1.0 |
| **Shelf lips light one by one** | emissive 0.35 → 3.2 | 0.3 each, 0.09 stagger |
| **Light as an event** | a spotlight's intensity ramps on a word, or its position sweeps across a label | 0.35, or the whole setup for a sweep |
| **Label** | dot appears, leader line draws from the dot to the text in 0.3, text fades in 0.12 later over 0.2 while rising 10 px | lands on its word |
| **Counter** | number interpolates linearly, block fades in rising 14 px | starts 0.3–0.5 before the number is said and finishes just after |
| **Setup's overlays leave** | fade | last 0.2 of the setup |
| **Frame-0 text / end text** | fade, end text rises 14 px | 0.2–0.25 |

How to choose timings:

- **Start early, land on the word.** A 0.3–0.4 s move should begin about 0.2 s before the word so it completes as the
  word is heard. Counters start before the number and stop on it.
- **Runs, not blocks.** Any group of more than three items is staggered 0.05–0.1 s per item.
- **One thing at a time.** Within a setup, events are at least 0.3 s apart and each follows the phrase being spoken.
- **Parts that appear** either scale from 0.001 on all three axes or are added with a stable `name`; a part's shape
  never changes, only its transform, colour and glow.

## 17. EX38, setup by setup (the worked example)

Time is from the scratch voice; it moves with the real voice.

| # | From | Words | Camera | What animates |
|---|---|---|---|---|
| 1 | 0.0 | Eco-Shop sells | macro push on the sign | frame-0 text; source line at 0.6 |
| 2 | 1.1 | almost everything | rack focus to the bag, tilt up | bag x-ray on "everything"; products appear; label |
| 3 | 2.1 | for RM2.60 | orbit to top-down | twelve products fly to a ring; tags; counter 1 → 12; bag turns solid |
| 4 | 3.5 | never made more money per item | low push on one tag | coins stack beside it; label |
| 5 | 5.4 | gross margin … record 33% | pull out into a void | three stacks grow in turn; counter 19.6 → 33.3 %; three labels |
| 6 | 8.6 | up from under 20% … | low tilted skim | labels FY2022 / FY2026 |
| 7 | 11.0 | Imagine one bottle on that shelf | eye-level aisle, rack focus | spotlight and shelf sign come up on "bottle" |
| 8 | 12.8 | You pay RM2.60 | macro on the shelf sign | label on the price |
| 9 | 13.9 | about 87 sen of that stays | high three-quarter on the bottle | slices open, top lifts red; counter to 87 sen; label |
| 10 | 16.8 | before rent and wages | side elevation, tilted | two labels: stays / cost of the goods |
| 11 | 18.1 | How? Look at the label. | label macro | spotlight sweeps the print |
| 12 | 19.2 | It's Eco-Shop's own | pull back along the shelf | six red bars land; label |
| 13 | 21.5 | House brands are now 60% | crane up to top-down | six discs light; counter 0 → 60 % |
| 14 | 24.1 | they earn Eco-Shop more | descend to a pair | ten products leave, two arrive; two coin stacks grow; labels |
| 15 | 26.8 | More than 65% … from China | scale travel out to the quay | cartons slide out; counter 0 → 65 %+ |
| 16 | 30.4 | bought for 462 stores at once | tilted top-down map | dots light west to east; counter 1 → 462 |
| 17 | 32.8 | the part the sign doesn't say | grazing angle, arcing | — (the angle is the event) |
| 18 | 34.8 | Fixed doesn't mean forever | long-lens frontal | flaps shiver on "forever" |
| 19 | 36.2 | Until April last year, it was RM2.40 | pull back, calendar | calendar tips up; flaps turn to 2.40; label |
| 20 | 38.1 | minimum wage … RM2,000 | payslip under a spot | underline draws under RM2,000 |
| 21 | 40.3 | the Chinese yuan is getting stronger | rate display | display brightens; label |
| 22 | 42.2 | analysts expect … within 12 months | analyst note under a spot | two underlines draw under the quoted line |
| 23 | 46.1 | One has pencilled in 20 sen | back to the sign | last two flaps turn to "??"; "+20 sen?" box; label |
| 24 | 48.0 | the price was never the product. The promise is. | aisle pull-out | shelf lips light one by one |
| 25 | 50.6 | One number, on every shelf … | crane over the aisle | all lips lit |
| 26 | 53.9 | the day that number changes | low three-quarter map | white wave crosses the dots |
| 27 | 55.2 | 462 stores change with it | dive to the sign | flaps turn to 2.80; end text; label; flaps return to 2.60 for the loop |

## 18. Light, per kind of set

| Set | Lights | Why |
|---|---|---|
| Counter | warm `RectLight` 1.6 × 1.0 m, 1.1 m above and 0.4 m in front (46,000); one warm shadow-casting `SpotLight` from front-right (15,000); cool `RectLight` strip on the back shelf (14,000); small `RectLight` on the sign (14,000) | soft top key, one shadow direction, a cooler background for depth |
| Void | lit grey floor (`#30333a`, roughness 0.5), the same key + spot as the counter, and a red `PointLight` (range 0.6) beside the accent object | the floor and the red spill stop it reading as a slide |
| Document moment | all counter lights to 20 %, one `SpotLight` outer angle 0.2 at 30,000 on the page | a pool of light on paper |
| Shop aisle | four cool `RectLight` strips overhead (46,000 each); a warm spot only on the hero shelf | shop light is cool, the hero is warm |
| Large outdoor set | one `DirectionalLight` (3,600 lux, soft shadows) plus two point lights | point and rect lights are too weak at 6–10 m |
| Map | one cool `RectLight` 3 × 1.5 m; floor roughness 0.85 | a rough floor avoids a glare patch |

Global on every frame: ambient 95 (`#b4bccb`), environment map at 0.3, bloom 0.7 with threshold 0.9, ACES tone mapping
at exposure 0.35. Emissive red at 2–4 times for anything "lit".
