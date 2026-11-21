---
name: miki-explained-episode
description: Playbook for making a Miki Explained episode (miki-explained/ in this repo) — 55–65 s 9:16 explainers and how-tos for TikTok/Instagram, Malaysia-first, often in Bahasa Melayu, built in raea with the Style D motion recipe (a new setup every 2–3 s on the spoken word, one real hero object, one accent colour, phone/UI screens for online steps). Covers the RECIPE-D questions, topic and fact gate, script + ElevenLabs v3 voice text (the user records), voice processing and word timings, shot list, board, camera map + animatic, preview, final 60 fps render, sound, post copy, Telegram push and calendar — plus the opt-in X1 experiment layer. Use whenever the user wants a new episode, "the next one", "EXnn", a how-to, a script or voice text, or to build, fix, preview, render or post an episode, even if they don't say "episode".
---

# Miki Explained — episode playbook (rewritten 2026-11-16 after EX45)

**The contract wins over this file.** Before any work read, in order: `miki-explained/00_bible/WORKING-RULES.md`,
`LESSONS.md`, `STATUS.md`, then the style's recipe/bible (`00_bible/series-bible/RECIPE-D.md` + `STUDY-D.md` for Style D;
`BIBLE-A/B/C.md` for the others; "Style D motion for all styles"). The old EX14–EX17 Blender/EffectCraft playbook is in
`legacy/` for history only — never propose its look or pipeline (`retired-styles`).

## 0. Start: ask, don't draft (RECIPE-D § 0.1, standing instruction)
Read RECIPE-D, then ask the § 0.1 questions in one AskUserQuestion batch (recommended option first) and wait:
topic (offer 2–3 from `03_ideas/content-bank.md`; S16 How-to is ~3 of 4 episodes), the frame-0 contradiction, sources /
hero object, length and pace, voice (the user records in ElevenLabs v3, often Malay), changes from the baseline.
Also remark that **X1** is available and ask whether this episode tests it (§ 9). Plan before acting; one gate at a time.

## 1. Gates (each shown to the user; "proceed" = go to the next without asking again)
1. **Facts** → `claim-ledger` skill. Read every source at the page itself; if the angle needs a number nobody published,
   stop and propose an angle the sources carry (EX45). Keep "Not claimed" and the ⚠ before-posting list.
2. **Script** (RECIPE-D § 3 + `script-formula`, plain language): frame-0 text ≤ 8 words stating a contradiction, ~11 lines,
   ~3.4 words/s, end text ≤ 7 words as a question, loop back to frame 0. Run `tools/x1/copy_check.py` and
   `00_bible/checks/SCRIPT-CHECK.md` (Frame 0 / Last frame + Beats v0 first; paste the ticked list in `episode.md`).
   **Voice text** for Eleven v3 in a separate column: numbers as words, ≤ 2 tags per line, `…` and `—`, no CAPS; Malay
   lines open with `[Malaysian accent]`; letters spelled for the reader ("Q R", "ai si"). See EX44 § Recording guide.
3. **Voice in** (user's takes in Downloads → `audio/raw/`): `build/voice_fix.py 1.25` (energy pause trim, Rubber Band
   tempo, gentle EQ; presence shelf only on lines voice_check calls DULL), `build/words.py` (faster-whisper, `language="ms"`
   for Malay), `build/timeline.py` (joins, no second trim) → `audio/vo.wav` + `build/tl.json`. Then
   `tools/x1/voice_check.py` and **one full listen**. Never FFT-denoise Eleven takes (metallic); never trim by Whisper word
   edges (cuts words). Captions follow what was actually said (check `episode.md` — the user may edit the voice text).
4. **Shot list** (RECIPE-D § 4): rows with words, camera, what changes on which word; whole camera vocabulary; ≤ 4 s per
   setup unless something builds; return to the hero. Art direction in five lines + accent from the brand's own file +
   a colour-script strip. Run `00_bible/checks/SHOT-FRAME-CHECK.md` part A (join cards in the `cards` column).
5. **Board**: `film --composition board` (one still per setup at its landed moment) → `SHOT-FRAME-CHECK.md` part B →
   `still-qc` → `fresh-critic`
   (max 5 rounds) → show the contact sheet.
6. **Camera map + animatic** (RECIPE-D § 8.1): `--composition cammap`; `tools/raea/animatic.sh film.tsx ../audio/mix.wav
   ../out/animatic.mp4` (yellow S·time tags for notes).
7. **Preview** 30 fps (`build/previewNN.sh`, 300-frame chunks) → `still-qc` → `fresh-critic` on video → show.
8. **Final** 60 fps (`build/finalNN.sh`; chunks checked, encoded, joined with `audio/mix.wav`), cover (board frame 1),
   post copy (`## Post` in episode.md: caption, sources line, hashtags, pinned comment), then offer the Telegram push.

## 2. Build (raea; start from the newest episode's `build/`, never an empty file)
- Assemble: `headNN.part.tsx` + `filmNN.part.tsx` + `cammap.part.tsx` → `filmNN.tsx` (`assemble.sh`). Time hangs on
  `tl.json` word indices: `ST = [W(i) - 0.1, …]`. Compositions: `film`, `board`, `cammap`.
- Sets small and far apart; library models greyed with `build/grey.py` (check real size: the Poly Haven
  `plastic_container` is 0.9 m); real logos only from a licensed source, credited in `02_kit/brand/logos/CREDITS.md`, on
  screen from frame 1 (on a light chip if the mark is dark); invented UI/documents say "ilustrasi"/"illustration".
- UI screens are DOM pages over the 3D: phones cropped off an edge with a visible bezel, 3–7 real strings, values roll,
  a solid dark caption band so screens never sit under the captions (`X1-oss-upgrade/ui-rules.md`).
- Seams: 2–3 kinds, none over 40 % — screen→screen push, continuous camera move on the same set, focus pull 3D↔screen,
  plus at least one object carry (EX45: the RM0 tag across five setups; the coin stack growing into the phone).
- Anything that falls: Blender rigid-body bake (`EX45/build/phys45.py` → JSON, sampled smoothly at 60 fps). Zero raea
  `clipping:` lines before showing.
- Captions: RECIPE-D § 6.5 (Outfit, top, on the word), held until the next phrase starts.

## 3. Sound
Voice + sparse hits on impact frames (not on word starts: the stamp lands ~0.12 s after its word; landings from the
physics bake) + background music only when the user asks (ducked, ~13 dB under the voice, out before the logo; record
the track's licence) + the one Meikigo signature sound under the end card (`02_kit/brand/sonic-logo/`). −14 LUFS.
Template: `EX45/build/mix.sh`.

## 4. After the final
`tools/air.sh sync && tools/air.sh push-episode EXNN` (bot `/exNN` serves final, cover, caption); calendar row in
`05_calendar/calendar.md`; the user schedules in TikTok Studio, then `/scheduled exNN`; 72 h numbers into
`03_ideas/experiments.md`. Commit text/code/fonts/raw voice/key stills only (exports and library media stay out of git).

## 9. X1 (opt-in experiment layer)
Only when the user says this episode tests it. Spec: `00_bible/experiments/X1-oss-upgrade/README.md`. Adds: claim ledger,
copy check, shot cards + seam plan + `## X1 devices` block (`tools/x1/device_diff.py`), art bible in three lines,
exposure check, fresh critic with the pass bar, voice check. Log every critic round and every user note in episode.md's
X1 log; fill the X1 row in experiments.md. EX45 findings: the critic's visual bar matched the user's; audio needed its
own check; cap board rounds at 5.
