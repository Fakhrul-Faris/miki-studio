---
name: miki-explained-episode
description: Playbook for making an episode of the Miki Explained series (miki-explained/ in this repo): about 40–45s 9:16 explainers for TikTok/Instagram that take a business, psychology or economics story and turn to "your shop", in the house cut-paper mixed-media format of EX02V3 "The Doorway" (collage + documentary images + diagram animation). Covers story choice and fact-checking, the script and Nathan narrator voice direction, the media prompts the user generates (how-i-generate.md), separating stills into layers in PhotoCraft, tightening the voice and cutting every shot to its word, building headless in EffectCraft, transitions, subtitles, sound, render and post copy. Use this whenever the user wants a new explainer, "the next episode", "EX03", a script, hook or storyboard for miki-explained, image prompts for an episode, to build/render/fix an episode in EffectCraft or PhotoCraft, or asks about the series' look, subtitles or sound — even if they don't say "episode" or "skill".
---

# Miki Explained — episode playbook

Every episode follows the house format set by **EX02V3 "The Doorway"** (`miki-explained/04_episodes/EX02V3_doorway`,
read its `README.md`). Episodes live in `miki-explained/04_episodes/EXNN_slug/`. Before building, read `00_bible/`
(`visual-system.md` = the format, `series-plan.md`, `voice.md`, `glossary.md`) and `00_bible/effectcraft-notes.md`.

## The format in one breath

Cut-paper editorial collage (Vox / Fern) in paper `#EFE8DC`, ink `#111111` and one ochre `#C98A2B`, plus one extra colour
only where the story needs it. **Every episode uses all three ingredients:** collage stills (scenes), 2–3 **documentary
images** (the real thing, printed as torn ink-and-paper photos) and **diagram animation** (anything abstract, native).
Elements step at 12fps, the camera glides; stamps with misregistration; Anton + IBM Plex Mono, all type native.
Transitions are match cuts, camera carries and paper moves, never dissolves. **The voice sets the tempo:** one tightened
narration track, every cut and key moment on its word. Simple subtitles, about 8–10 sound hits.

## How to work with this user

- **Plan before acting on anything new** (a new episode, method or restructure); wait for approval. Small fixes to approved work: just do them.
- **One gate at a time.** The user generates voice, images and sound files (credits are limited).
- **EffectCraft only, never After Effects.** PhotoCraft for image work.
- **Build headless** (no live window): cheaper and steadier. The user stops per-shot review once the first shots are approved.
- English only, plain language. Report honestly what was checked (stills, frame strips, measured audio) and what wasn't watched or heard.

## The gates

| # | Gate | Output | User approves |
|---|---|---|---|
| 1 | Story + facts | content-bank row, sources in `episode.md` | the story |
| 2 | Script + shot list | `episode.md`: script (≈130 words, 6 lines), shot list with an ingredient per shot | the script and shot list |
| 3 | Media prompts | `how-i-generate.md` (from `templates/media-prompts.md`) | the prompts |
| 4 | Voice + media | user renders L01–L06 → `audio/`, stills, cut-out sheet and M1–M3 → `media/` | — |
| 5 | Layers | PhotoCraft: cut-outs, plates, printed photos → `layers/` | — |
| 6 | Voice timeline | `audio/voice.wav`, `audio/vo_timeline.json` | — |
| 7 | Build + review | `build/*.jsx`, `EXNN.ecproj`, half-res preview | the cut |
| 8 | Sound + render | `sfx/mix.wav`, `sfx/events.txt`, `export/EXNN.mp4`, an `_edit.ecproj` copy for the user | the final |
| 9 | Post + calendar | `episode.md` § Post, `05_calendar/calendar.md`, `glossary.md` | — |

### 1. Story + facts
Pick from `03_ideas/content-bank.md` (stories, the How It Makes Money series, series pitches), rotating lanes; **at least every third episode is Malaysian**. Verify every number against
a primary source and quote it in `episode.md` § Sources. Unconfirmable details are cut or flagged. Never invent stats.

### 2. Script + shot list
Copy `templates/episode.md`. Write to the formula in `00_bible/script-formula.md`: **Hook → Stakes → Mechanism → Twist →
Payoff → Bridge → Loop**, run its quality checklist, and fix anything scoring below 6/7 before presenting it. Length
(word count, seconds) is a tested variable (`03_ideas/experiments.md` § 8) — state the target, don't default to a fixed
count. The named concept (glossary) gets a title card around Twist/Payoff; the Bridge (optional, tested) is "now picture your shop…";
the End rotates (reframe · "next time you…" · callback · question sparingly) and the last line is "Follow Meikigo for more."
Apply the competitor-informed rules in script-formula.md (everyday viewer-POV topics, contradict early, one physical
detail + one comparison, "that's why…", escalation). Rotate business types (retail, F&B, clinics…), not barbers by default. Voice direction for Nathan, narrator (ElevenLabs `v4k7NzxipnuJNJtrKxob`, `00_bible/voice.md`).
Shot list: one shot per beat (a beat can span or share a shot), each with its ingredient. If a line names a real place or
object → documentary image; if it explains or compares → diagram or typography; collage carries the rest. Plan the
transition into each shot (match cut, camera carry, paper slide / tear / flaps) and 1–2 deliberate holds.

### 3. Media prompts
Copy `templates/media-prompts.md` → `how-i-generate.md`. Worked example: `EX02V3_doorway/how-i-generate.md`.
Hard rules: **9:16, no text in any image, lights off, anything that moves gets its own picture** (cut-out sheet),
2–3 documentary images with the named details spelled out.

### 4–5. Layers in PhotoCraft
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

### 6. Voice timeline
```
archive-ignore/comedy-autopsy/.venv/bin/python miki-explained/tools/words.py <ep> L01=0 L02=0 L03=0 L04=0 L05=0 L06=0
python3 miki-explained/tools/vo_tighten.py <ep> [--hold L01@<file s>:1.0] [--hold L06@<file s>:1.0]
```
`vo_tighten.py` joins the lines (0.25s apart), trims pauses over 0.45s to about 0.3s, inserts the holds, and prints every
word with its MASTER frame. A shot starts at floor(word time × 24). Whisper's start for a word right after a cut can be
early: confirm cut points with `silencedetect` on `voice.wav`.

### 7. Build (headless)
Copy `EX02V3_doorway/build/` as the starting kit: `lib.jsx` (set `DIR`; helpers `plate`, `stepped`, `stamp`, `misreg`,
`hold`, `cutOn`, `cutWords`, `maskReveal`, `glowLayer`, `washLayer`, `camera`, `camZ`, `overlay`), `overlay.jsx`, `run.sh`, one
`<shot>.jsx` per shot and `MASTER.jsx` (shots at their word frames, paper slides and tears, match-ins, subtitles from
`subs.jsx`, the audio). Rebuild with `build/run.sh overlay <shots…> MASTER`; each shot script rebuilds its own comp, so
rerunning one is safe. Key frames inside a shot are frames from the shot's start, set from the word times.
**TikTok safe area:** every word and key subject inside x 60–960, y 160–1440 (clear 160 top, 480 bottom, 60 left, 120 right;
text in the central 840 × 1280); subtitles end above y 1440. Check one frame per shot against it before the final render.
Review with frame strips across every transition and on every key word (render-frame / ffmpeg tiles of a half-res
render), then a half-res MASTER preview for the user.

### 8. Sound, render, hand-off
The user supplies sound files. Find each file's hit (peak scan), trim, and place the hit on its frame: copy
`EX02V3_doorway/build/sfxmix.py` and edit its table. MASTER imports `sfx/mix.wav`. About 8–10 hits; music at about −23 dB if used.
Render `effectcraft-cli render --project … --comp MASTER --out export/EXNN.mp4 --format h264 --audio on`, check length,
frames and loudness (about −18 LUFS, no clipping). Give the user an `EXNN_edit.ecproj` copy for their own changes; never
rebuild into it. Clean up: drop previews and temp files, write a `README.md`.

### Testing a motion change (the EX00V4 method)
When a technique is new or in doubt, test it in `04_episodes/EX00Vn_<name>-test/` first: one change per variant (B, C, D),
measure the property per frame with `valueAtTime`, check full-size stills, render only the window, show a side-by-side.
The user picks; only then move it into the kit, the docs and this skill.

### 9. Post
Caption, hashtags, pinned comment with the source and a DM keyword, the before-posting checklist (series-plan), including
the **AI-generated content label**. Update the calendar and the glossary.

## When something goes wrong
Check `00_bible/effectcraft-notes.md` first (#34–41 are the Doorway traps: 12fps expressions, the 3D camera, Linear Wipe on
text, motion blur on stepped layers, nested comp background, misreg keys). `references/lessons.md` has the short list.
Add every new trap there.
