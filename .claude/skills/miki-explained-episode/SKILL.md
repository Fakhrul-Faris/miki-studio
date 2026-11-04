---
name: miki-explained-episode
description: Playbook for making an episode of the Miki Explained series (miki-explained/ in this repo): 40–50s 9:16 explainers for TikTok/Instagram that take a business, psychology or economics story and turn to "your shop", in the current house look v5 clay maquette (EX20; reference Main Edit.mp4: clay models + one green accent, figures pose only, a hard cut on the word every ~3–6 s, EX15 caption panel; earlier: the EX14 smooth-isometric format). Covers story choice and fact-checking, the script and Nathan narrator voice direction, tightening the voice to 60 fps word frames, building the world and camera in Blender, the cheap preview before rendering, the EffectCraft master (captions, cards, sound), frame-by-frame QA, render and post copy. Use this whenever the user wants a new explainer, "the next episode", "EX15", a script, hook or storyboard for miki-explained, to build/render/fix an episode, or asks about the series' look, captions or sound — even if they don't say "episode" or "skill".
---

# Miki Explained — episode playbook

**Blender expert skills (added 2026-11-04, scenario-labs/skills, MIT, offline — no Scenario service):** for v4 work load
`scenario-blender-lighting-rendering` (value separation: check every key frame desaturated, darken the set before
brightening the subject; EEVEE volume probes so interiors don't leak light), `scenario-blender-animation` (timing,
spacing, arcs, overlap for the MPFB people), `scenario-blender-previs-storyboard` (180° rule, screen direction, at the
animatic), `scenario-blender-texturing-shading` (procedural edge wear, grime, colour variation), `scenario-blender-
geometry-nodes` (instance crowds/icons cheaply), with `scenario-blender-expert` as their base. QA gate before every
preview: the desaturated value check on each shot's key frame.

**Cinematography (from 2026-11-03, reference `01_references/r45-gopcb-drone-xray`):** every shot list carries shot
size, angle, lens, move, the trigger word, focus target and foreground element; new term = close-up, "so what" = wide;
moves motivated by words; three planes for parallax; no hard cuts; a camera-only animatic before detail. Rules in
`00_bible/visual-system.md` § Cinematography and look v4; the look itself is under test (EX00V9).

**New height: EX17 "Five Times"** (`04_episodes/EX17_five-times`; user, 2026-11-03: "ex17 is the new height… keep
climbing"): a scale journey (crowd → cutaway → systems → back), a physical surprise on the Twist, walk cycles (`Fig`),
bounded haze for light cones (never a world volume: it blacks out the sun), in-world value bars. Start from its
`build/episode.py` and add at least one technique the series hasn't used yet. Before it: **New base: EX16 v2 "Out of Turn"** (`04_episodes/EX16_er-triage`; user, 2026-11-02: "ex16 is the new base… getting closer
to Kurzgesagt style… push it to the higher limit"): make the number physical, one dominant hero object, light as
emotion, the script's metaphor made literal. Start from its `build/episode.py`. The format was set by **EX14 "The Long Path"** (`miki-explained/04_episodes/EX14_long-path`,
read its `README.md` and `episode.md`). User, 2026-11-01: "i really really love what you did with this. this is what i'm
looking for." Episodes live in `miki-explained/04_episodes/EXNN_slug/`. Before building, read `00_bible/visual-system.md`
(the format), `series-plan.md`, `script-formula.md`, `voice.md`, `glossary.md` and `00_bible/effectcraft-notes.md`.

## The format in one breath

A dark, clean **isometric world built in Blender** (near-black `#0E0E10`, flat greys, soft light, no outlines or textures,
Isotype pictogram people) with **one accent, green `#57D100`**, filmed by **one continuous orthographic camera** at
**60 fps**: smooth eased moves keyed to the voice, no hard cuts, no stepping, motion blur, ending on its first frame.
**No generated images, no paper, no halftone.** EffectCraft adds the type: **captions** as sentence-case blocks on a rounded
dark panel at the bottom (each word fades in and rises on its spoken frame), centre cards for quotes, counters and the
named concept, and the **follow card** (Meikigo logo above "Follow Meikigo for more.", silent). Inter Display + IBM Plex
Mono. **The voice sets the tempo.** About 10 soft sound hits on a low drone.

## Current house look (v5 clay maquette, from EX20) — read first

`00_bible/visual-system.md` § House look v5 overrides the older formats below where they differ: clay + green accent,
**figures pose only**, **a hard cut on the word every ~3–6 s**, the reference's shot types, **EX15 captions**, shot-first
gates (study → shot list → blocking board → world → check .blend + camera-clip scan → render). For direction and craft,
use the project skills `iart-motion-art-direction` (motion-language spec, restraint, one wow moment), `iart-shot-composition`,
`iart-short-form-video` (retention: hook text on frame 1, a visual change every 2–4 s, loop to frame 0),
`iart-beat-sync-editing`, `iart-animation-principles`, `iart-after-effects` (expressions work in EffectCraft), and
`scenario-blender-blockout` / `-hard-surface` / `-grease-pencil` with the earlier scenario-blender skills. Sound hits can be
synthesized offline with `tools/sfxsynth` (`python3 -m sfxsynth --list`); keep them sparse.

## How to work with this user

- **Plan before acting on anything new** (a new episode, method or restructure); wait for approval. Small fixes to approved work: just do them.
- **One gate at a time.** The user records the voice (ElevenLabs credits are limited) and may supply sound files.
- **Preview before rendering** (user, 2026-11-01): before any full Blender render, make the cheap preview
  (`episode.py -- <out> preview` → `out/preview.mp4`, quarter size, every 2nd frame, voice under it, ~3 min) and show it.
  Render the full 40-minute pass only after it looks right. Small text/colour/sound changes don't need Blender at all.
- **EffectCraft only, never After Effects.** Build headless.
- English only, plain language. Report honestly what was checked (stills, frame strips, measured audio, per-frame numbers)
  and what wasn't watched or heard.

## The gates

| # | Gate | Output | User approves |
|---|---|---|---|
| 1 | Story + facts | content-bank row, sources in `episode.md` | the story |
| 2 | Script + shot list | `episode.md`: script, scene brief (hero device, one surprise), shot list, camera moves | the script and shot list |
| 3 | Voice | `how-i-generate.md` (voice lines + reads); user renders `audio/L01…` | — |
| 4 | Voice timeline | `audio/voice.wav`, `audio/vo_timeline.json` at 60 fps | — |
| 5 | World + preview | `build/world.py`, `build/episode.py`, style stills for anything new, `out/preview.mp4` | the preview |
| 6 | Render + master | `out/frames`, `build/caps.py`, `MASTER.jsx`, `sfx/mix.wav`, QA numbers | — |
| 7 | Final + hand-off | `export/EXNN.mp4`, `EXNN_edit.ecproj`, `README.md`, critique scores | the final |
| 8 | Post + calendar | `episode.md` § Post, `05_calendar/calendar.md`, `glossary.md`, experiments row | — |

### 1. Story + facts
Pick from `03_ideas/content-bank.md` (stories, the How It Makes Money series, series pitches), rotating lanes; **at least every third episode is Malaysian**. Verify every number against
a primary source and quote it in `episode.md` § Sources. Unconfirmable details are cut or flagged. Never invent stats.

### 2. Script + shot list
Copy `templates/episode.md`. **Angle check first** (`00_bible/script-formula.md` § Angle check): sketch the hook both
Analytical and Anthropological ways, check the last 3 episodes in `03_ideas/experiments.md` § 14, pick whichever angle
they don't share. Write to the formula: **Hook → Stakes → Mechanism → Twist →
Payoff → Bridge → Loop**, run its quality checklist, and fix anything scoring below 6/7 before presenting it. Length
(word count, seconds) is a tested variable (`03_ideas/experiments.md` § 8) — state the target, don't default to a fixed
count. The named concept (glossary) gets a title card around Twist/Payoff; the Bridge (optional, tested) turns to the viewer's shop with a rotating opener (never "now picture…",
`00_bible/script-formula.md` § Bridge openers);
the End rotates (reframe · "next time you…" · callback · question sparingly) and the last line is "Follow Meikigo for more."
Apply the competitor-informed rules in script-formula.md (everyday viewer-POV topics, contradict early, one physical
detail + one comparison, "that's why…", escalation). Rotate business types (retail, F&B, clinics…), not barbers by default. Voice direction for Nathan, narrator (ElevenLabs `v4k7NzxipnuJNJtrKxob`, `00_bible/voice.md`).
**Scene brief, before the shot list:** read `03_ideas/experiments.md` § 13 (the device log, last 5 episodes). Pick a
**hero device** — the 3D mechanism the Twist/Payoff beat is built from — that differs from the last 2 episodes' hero
devices; supporting devices may repeat but not more than 2 should match the immediately previous episode. Plan **one
surprise**: one deliberate visual anomaly in the world (a scale break, a colour break, something out of place) landing on
or just before the Twist line, separate from the narrative twist in the voice — something that gives the frame a reason
to be looked at twice. Name both in the shot list.

Shot list: one beat per line, each with **what we see in the world** and **how the one camera gets there** (carry,
rise, follow, pull-out, fly-through); the hero device carries the Twist/Payoff beat, supporting devices carry the rest,
the one surprise is marked on its beat, and 1–2 gentle holds. The last beat returns to the opening frame (seamless loop).

### 3–4. Voice and its timeline
`how-i-generate.md` holds only the voice now: one row per line with how to read it, plus pronunciations. Then:
```
archive-ignore/comedy-autopsy/.venv/bin/python miki-explained/tools/words.py <ep> L01=0 … L08=0
python3 miki-explained/tools/vo_tighten.py <ep> [--hold L04@end:0.5] --fps 60
```
Every word gets its MASTER frame = floor(t × 60). Scripts read `audio/vo_timeline.json` directly (`w("L03", 10)`), so
nothing is typed by hand. L08 can reuse an earlier episode's "Follow Meikigo for more."

### 5. World + preview (Blender)
**Kit: `tools/blender/isokit.py`** (from EX15): `setup()`, palette (ACCENT green), `mat`/`colmat`, `box` (origin at its centre),
`cyl`, `person`, `Path` (rounded, by arc length, `.curve()` ribbon), `Rig` (camera keys on pchip curves), `ease`/`span`/
`back_out`, `anchor()` (labels pinned to world points → `build/anchors.jsx` → `pin()` in lib.jsx), and `finish(EP, N, OUT,
argv)` (full render · `still f,f` · `preview` · `anchors` only). Reference episode: `EX15_hot-dog/build/episode.py`.
EX14's original layout, for reference:
- `world.py`: the set: `box()` (bevelled flat boxes), `mat()` (flat, roughness 1, no specular), `person()` (Isotype
  pictogram), `fillet()` + `at(s)` (a rounded path sampled by arc length), floor arrows lit by object colour, the camera
  rig `set_cam(f, pivot, tilt, spin, ortho_scale)`, `ease`/`span` (smootherstep). Set the accent to `#57D100` here.
- `episode.py`: execs `world.py`, adds each beat's props, reads word frames, and bakes every frame: the camera through
  key poses `CK` on monotone `pchip`/`vcurve` curves + `follow_w(f)` blends for walking shots; props on `span()`/`back_out()`.
  Key heavy props only inside their window (`f in (0, N-1) or lo <= f <= hi`) or the setup takes minutes.
- `preview` argument → `tools/blender/preview.py` → `out/preview.mp4`. **Show it before the full render.**
- Full render: `blender -b --python build/episode.py -- $PWD/out/frames` (EEVEE, ~0.85 s a frame, ~40 min for 46 s).
Measure before rendering: the camera speed per frame and that the subject sits clear of the caption panel and words.

### 6. Master (EffectCraft, 60 fps)
`lib.jsx` (FPS 60): `capBlock()` (caption panel), `card()` (centre cards, rise + fade, dark halo), `accent()` (recolour a
rendered accent if needed), counters via a Source Text expression. `caps.py` → `caps.jsx` (sentence blocks; words under a
centre card are skipped; blocks end before a card). `MASTER.jsx`: the world sequence, captions, cards, the follow card with
`layers/logo.png`, `sfx/mix.wav`. `sfxmix.py` (FPS 60): drone 0.10 + ~10 hits, none on the follow card.
Rebuild: `rm EXNN.ecproj; build/run.sh MASTER` (always from scratch: the image sequence item is reused otherwise), render
`effectcraft-cli render --project EXNN.ecproj --comp MASTER --out export/EXNN.mp4 --format h264 --fps 60 --audio on`.

### 7. QA and hand-off
- **Silhouette check:** crop the hero device/object to its own frame at a frame where it's fully formed, scale it down
  to roughly thumbnail size, strip colour (grayscale). It should still read as one clear shape. If not, simplify the
  shape or raise its contrast against the floor — don't just add light. Log pass/fail in `experiments.md` § 13.
- **Critique, 1–5 each**, from the preview or early render frames, before the full render if anything looks doubtful:
  idea clarity (readable in 2 s), scale feeling (does the number feel big), novelty against the device log, silhouette,
  caption-panel cleanliness (nothing important hidden behind it). Anything below 4: revise the shot list or the camera
  framing (not the whole build) and re-check with another cheap preview. One revision pass; then ship the best version
  and note the scores honestly in `episode.md`.
- **Ears (earshot, from EX16):** `archive-ignore/ext/earshot/.venv/bin/earshot sheet sfx/mix.wav --cues cues.json` (cues
  from `sfx/events.txt`, `{fps: 60, events: [{f, kind, id}]}`): every cue should have an onset within 100 ms and the key
  ones should land as accents over the voice. It found EX15's "didn't" tick inaudible (no hit) — our hits were mostly
  buried. `earshot timeline <mp4>` for gaps and loudness. SFX can come from its free 252-sound code bank
  (`earshot sfx list` / `sfx render <id> -o sfx/es_<name>.wav`; peaks are reported, use them as the hit time). Free, CPU,
  MIT; never enable its Gemini critique (paid key, sends audio out).
- Per-frame difference of `out/frames` (ffmpeg tblend + signalstats): no spikes against neighbours, no unintended stalls.
- `render-frame` full-size stills on every card and caption block; TikTok safe area (x 60–960, y 160–1440).
- Length, frame count, loudness about −19 LUFS. Copy `EXNN_edit.ecproj` for the user (never rebuild into it), write
  `README.md`, drop previews and temp renders.

### 8. Post + calendar
Caption, hashtags, pinned comment with the source and a DM keyword, the before-posting checklist (series-plan), including
the **AI-generated content label**. Update the calendar, the glossary, and `03_ideas/experiments.md` § 13 (the device
log row for this episode: hero device, supporting devices, the one surprise, the silhouette check result).

## Legacy: the cut-paper format (EX02V3–EX13)

Kept for reference and for reuse of single techniques (real footage, PhotoCraft). Don't build new episodes this way.

#### 3. Media prompts
Copy `templates/media-prompts.md` → `how-i-generate.md`. Worked example: `EX02V3_doorway/how-i-generate.md`.
Hard rules: **9:16, no text in any image, lights off, anything that moves gets its own picture** (cut-out sheet),
2–3 documentary images with the named details spelled out.

#### 4–5. Layers in PhotoCraft
Launch with the control server scoped to the episode (see memory `photocraft-automation` for the protocol):
`/Applications/PhotoCraft.app/Contents/MacOS/PhotoCraft --control 47321 --control-token-file <scratch>/token --automation-read-root <miki-explained> --automation-write-root <miki-explained>`.
- Figures: `select.object` with a box (not `select.subject`), `select.refineEdge`, `layer.new.layerViaCopy`.
- Torn paper on paper: `select.quick` strokes inside it. Dark paper: `select.magicWand` (tolerance ~40).
- Plates: copy clean areas of the same image over the gap (feathered `layer.translate` copies, mirrored strips);
  Content-Aware Fill only on busy texture. Keep figures in front of whatever got filled.
- Remove every baked word and mark; paint lit lamps dark (Hue/Sat on the lamp area, Levels outWhite ~70).
- Documentary images: `image.adjustments.gradientMap` [[0,#111111],[0.5,#7d7468],[1,#efe8dc]], mono noise 6,
  a torn-edge lasso, a paper rim layer filled `#e9e1d2` behind it.
- Save each layer as a full-canvas PNG in `layers/` plus a layered PSD in `layers/psd/`. Quit PhotoCraft when done.

#### 6. Voice timeline
```
archive-ignore/comedy-autopsy/.venv/bin/python miki-explained/tools/words.py <ep> L01=0 L02=0 L03=0 L04=0 L05=0 L06=0
python3 miki-explained/tools/vo_tighten.py <ep> [--hold L01@<file s>:1.0] [--hold L06@<file s>:1.0]
```
`vo_tighten.py` joins the lines (0.25s apart), trims pauses over 0.45s to about 0.3s, inserts the holds, and prints every
word with its MASTER frame. A shot starts at floor(word time × 24). Whisper's start for a word right after a cut can be
early: confirm cut points with `silencedetect` on `voice.wav`.

#### 7. Build (headless)
Copy `EX02V3_doorway/build/` as the starting kit: `lib.jsx` (set `DIR`; helpers `plate`, `stepped`, `stamp`, `misreg`,
`hold`, `cutOn`, `cutWords`, `maskReveal`, `glowLayer`, `washLayer`, `camera`, `camZ`, `overlay`), `overlay.jsx`, `run.sh`, one
`<shot>.jsx` per shot and `MASTER.jsx` (shots at their word frames, paper slides and tears, match-ins, subtitles from
`subs.jsx`, the audio). Rebuild with `build/run.sh overlay <shots…> MASTER`; each shot script rebuilds its own comp, so
rerunning one is safe. Key frames inside a shot are frames from the shot's start, set from the word times.
**TikTok safe area:** every word and key subject inside x 60–960, y 160–1440 (clear 160 top, 480 bottom, 60 left, 120 right;
text in the central 840 × 1280); subtitles end above y 1440. Check one frame per shot against it before the final render.
Review with frame strips across every transition and on every key word (render-frame / ffmpeg tiles of a half-res
render), then a half-res MASTER preview for the user.

#### 8. Sound, render, hand-off
The user supplies sound files. Find each file's hit (peak scan), trim, and place the hit on its frame: copy
`EX02V3_doorway/build/sfxmix.py` and edit its table. MASTER imports `sfx/mix.wav`. About 8–10 hits; music at about −23 dB if used.
Render `effectcraft-cli render --project … --comp MASTER --out export/EXNN.mp4 --format h264 --audio on`, check length,
frames and loudness (about −18 LUFS, no clipping). Give the user an `EXNN_edit.ecproj` copy for their own changes; never
rebuild into it. Clean up: drop previews and temp files, write a `README.md`.

#### Testing a motion change (the EX00V4 method)
When a technique is new or in doubt, test it in `04_episodes/EX00Vn_<name>-test/` first: one change per variant (B, C, D),
measure the property per frame with `valueAtTime`, check full-size stills, render only the window, show a side-by-side.
The user picks; only then move it into the kit, the docs and this skill.

### Blender sets (paperkit v2, from EX11)

Stage generated stills as a paper diorama in Blender (`tools/blender/paperkit.py`), never as a procedural 3D world:
1. Environment plate → `tools-venv/depth/bin/python miki-explained/tools/depth.py <plate> <box_dir> 4` → `shadowbox(box_dir)`:
   the plate becomes depth layers with torn edges, so the camera moves *through* it.
2. Cut-outs placed with `on_band(k, fx, fy, front=…)` (by their spot in the plate), mirrored/recoloured for crowds.
3. Light: `practical_light(..., only=collection(...))` for screens/lamps/windows (light + shadow linking), `translucent()`,
   `bloom()`. Labels that must stay on objects: `ink()` / `ink_ring()` in the set, not screen-space overlays.
4. Mechanisms: `roll()`, `fold()`; stop-motion `boil()`/`flicker()`; camera smooth; render transparent PNG frames.
Reference: `04_episodes/_tests/EX00V5_paperkit2/` (kit_test.py, compare_flat_vs_v2.mp4). Ask for environment plates in
how-i-generate.md (backdrop, set dressing) — see the memory note on Blender environments.

### Printed 3D (crowd, halftone, ink; from EX00V6)

When a beat needs real depth (a camera that orbits, a crowd seen from every side), build it in 3D and print it: the
user's picks r33–r42 (`01_references/v3-pro3d-study.md`) read "pro" as art direction, not realism.
1. **People:** `tools/blender/crowd.py` builds nine seated MPFB people (free, CC0 clothes/hair, varied poses, two on phones)
   into `02_kit/people/` once: `blender -b --python miki-explained/tools/blender/crowd.py -- build`. Needs the MPFB extension
   (`blender --online-mode -c extension install --enable mpfb`) and the makehuman_system_assets pack unzipped into
   `~/Library/Application Support/Blender/5.2/extensions/.user/blender_org/mpfb/data/` (use the files.makehumancommunity.org mirror).
2. In the shot: `load_person(name, link=False)` → set `col.instance_offset = hip` → `seat(proto, hip_at, turn, mirror)` per seat;
   2–3 real copies (`load_person(name)`) carry the story moves with `move(rig, bone, [(frame, deg), …])`. Vary pose per row:
   nobody wants a room of identical heads down.
3. **Look:** `paperkit.halftone(mat, gain≈3)` (paper dots on ink, sized by light, on a flat screen: the user chose screen dots over
   dots fixed to the body, 2026-11-01) on every `clay …` material, then `paperkit.ink_outline(meshes)` (paper-coloured inverted-hull edge).
   The ochre accent stays a solid, unprinted object. Dark set, light pools, haze (look B). EEVEE, ~4 s a frame at 1080×1920.
4. Don't: Grease Pencil Line Art (drew nothing on instanced crowds in background renders); free image-to-3D (Hugging Face
   ZeroGPU quota runs out after ~2 models a day; `tools/img3d.py` is kept for one-off hero props).
Reference: `04_episodes/_tests/EX00V6_polish/` (shot3d.py `-- <out> mpfb halftone ink`, compare_*.mp4, look_F_final.mp4).

## When something goes wrong
Check `00_bible/effectcraft-notes.md` first (#34–41 are the Doorway traps: 12fps expressions, the 3D camera, Linear Wipe on
text, motion blur on stepped layers, nested comp background, misreg keys). `references/lessons.md` has the short list.
Add every new trap there.
