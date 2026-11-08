# Miki Explained — status (handoff, 2026-11-08)

Read this first in a new session. Then: `00_bible/flat-v3-playbook.md` (the new look), `05_calendar/calendar.md`
(schedule + Style A/B test), and the episode's `README.md` / `episode.md`.

## Goal and strategy (unchanged)
1,000 followers + one organic 100k video by 30 Nov 2026. Malaysia-first, 2 posts/day (12:30, 21:00 MYT), 20–30 s.
Checkpoints: 14 Nov ≥150 followers, 21 Nov ≥450, 30 Nov 1,000.

## Rules set by the user this session (all in memory)
- **Visualize the script, not a metaphor** — draw what each line literally says.
- **Real business logo on screen from frame 1** (viewers watch muted).
- **No cheap work** — transitions built from the scene's own assets; never the quick option.
- **EX27 is a baseline, not a template.** Two styles compete on performance: **Style A** smooth iso v2 (EX25 99 Speedmart,
  raea) vs **Style B** flat geometry v3 (EX27, HyperFrames). Each Style B episode changes palette, camera, assets,
  composition.
- **Captions:** EX15 style at **36 px** (was 46).
- Never hand-code hands/faces/people; never trace/cut generated images. Objects and icons only.
- Show stills before a build; show frame strips of transitions before rendering; report honestly.

## Finished
- **EX27 Shopee 11.11 (Style B)** — final `04_episodes/EX27_1111-fake-discount/export/EX27-Final.mp4` (36.2 s, 60 fps,
  −18.5 LUFS, Shopee logo from frame 1, 36 px captions). Build: `build/hf_v3.py` + `build/flatkit.py` + `build/hf_build.py`.
  Old raea version kept as `export/EX27-Final-raea-v2.mp4`. README in the episode folder. Re-rendered 2026-11-08 with
  the user's re-recorded L02 (timeline, captions, sound hits rebuilt; "Right before 11.11, the seller lifts it to 600." is one caption block now).
- **Playbook** `00_bible/flat-v3-playbook.md` (rules, pipeline, transition catalogue, gotchas, QA, backlog).
- **Calendar** labels Style A/B; EX26 marked "revamp in progress".
- **Repo cleanup** 18 GB → 14 GB (EX23 render frames, EX27 scratch, `__pycache__`); EX00V7 test footage clips deleted (606 MB, Wikimedia sources in `footage/credits.json`).
- **EX26 Starbucks Style B plan** written in `04_episodes/EX26_starbucks-float/episode.md` (line-by-line table, palette,
  coin through-line, hand-offs) + two stills `EX26_starbucks-float/styleframes/hook.png`, `twist.png`
  (generator `styleframes/make.py`).

## Pending (waiting on the user)
1. **EX26 look:** the user called the Style B stills "generic" and will supply image-generation assets. Agree how the
   assets are used (see the session's question), write the image prompts, then build. Due **Mon 9 Nov 12:30 MYT**;
   raea final `export/EX26-Final.mp4` is the fallback.
2. **Telegram push** of EX24–EX27 finals when the Air is back: `tools/air.sh sync && tools/air.sh push-episode EXNN`.
   (Decided 2026-11-08: EX26 screen/caption number = **US$220M**, matching the voice.)

## Next
1. EX26 full build in Style B, following the playbook (new builder `EX26_starbucks-float/build/`, reuse
   `EX27…/build/hf_build.py` helpers + captions; new pieces: phone, coin, account disc, timeline, coin stack, loan slip,
   dashed cup). Logo: `raea/media/starbucks_sign_crop.png` (CC BY 4.0, Mathieu Brossais), circle-masked.
   Hand-offs from coins (pull-back → button, drop into slot, column collapse into the timeline, roll-out/roll-in).
   Design new sound hits for the visuals (playbook backlog). QA, preview, final.
2. Tue 10 Nov slate: Apple charger / Mr DIY Pt 2 — script with Eleven v4 voice text, decide Style A or B per the test.
3. After a few posts in each style: pull TikTok Studio numbers and compare A vs B.
