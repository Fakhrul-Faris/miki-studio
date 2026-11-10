# Miki Explained — status (handoff, 2026-11-10)

Read this first in a new session — **after `00_bible/WORKING-RULES.md` and `00_bible/LESSONS.md`** (the contract: locked style traits, rejections, tools, gates). Then: `00_bible/flat-v3-playbook.md` (the new look), `05_calendar/calendar.md`
(schedule + Style A/B/C test), and the episode's `RE## ▶ NEXT SESSION (2026-11-10)
**Finished and on Telegram + dashboard:** EX28 Apple charger (Style B) · EX29 Mr DIY Pt 2 (Style A **baseline**) ·
EX30 Mixue (Style C, built locally in raea's painted look) · EX31 Grab's cut (Style A) · EX32 printer ink (Style B,
print-head hand-offs). Planned: EX28 Tue 10 Nov 12:30, EX29 Tue 21:00, EX30 Wed 11 Nov 12:30, EX31 Wed 21:00, EX32 Thu 12 Nov 12:30 — the user schedules in TikTok Studio, then `/scheduled exNN`.
**Before posting (⚠ in each episode.md):** EX29 numbers vs Mr DIY 3Q results (10 Nov); EX30 "almost 60,000 shops" and
the RM2 cone; EX31 "by law"; EX32 HP Store prices (RM268, RM51) on the day.
**Next:** a new episode — rotation says Style C next. Light ideas used lately: EX28 window patch, EX31 street lamps, EX32 print head — don't repeat. EX29's comments pick Part 3 (Daiso / ZUS / KK Mart).
**Pipelines:** Style A/C in raea (`tools/raea/preview.sh`, `render_ep.sh`, collision check `paths.py`, physics bake),
Style B in HyperFrames (`EX28_apple-charger/build/`). No Seedream/Dreamina subscription.
**Repo cleaned 2026-11-10:** 21 GB → 6.6 GB (older episodes keep text + code; finals on Telegram). Git history kept.

t/NdKUpoz5qsjk9sf6QD3rhF

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
1. **EX26 approved (2026-11-08)** as **Style C — illustrated plates** (`00_bible/plates-playbook.md`), now competing with
   A and B. Final `04_episodes/EX26_starbucks-float/export/EX26-Final.mp4` (depth version), posts Mon 9 Nov 12:30 MYT.
2. **EX28 Apple charger + EX29 Mr DIY Pt 2 scripts drafted** (`04_episodes/EX28_apple-charger/`, `EX29_mrdiy-margin/`),
   waiting for approval; the user wants the bibles first. Slot: Tue 10 Nov.
3. **Telegram push** of EX24–EX27 finals when the Air is back: `tools/air.sh sync && tools/air.sh push-episode EXNN`.
   (Decided 2026-11-08: EX26 screen/caption number = **US$220M**, matching the voice.)

## Next
1. ~~EX26 full build in Style B~~ superseded by the plates build above. Old plan kept for reference: EX26 full build in Style B, following the playbook (new builder `EX26_starbucks-float/build/`, reuse
   `EX27…/build/hf_build.py` helpers + captions; new pieces: phone, coin, account disc, timeline, coin stack, loan slip,
   dashed cup). Logo: `raea/media/starbucks_sign_crop.png` (CC BY 4.0, Mathieu Brossais), circle-masked.
   Hand-offs from coins (pull-back → button, drop into slot, column collapse into the timeline, roll-out/roll-in).
   Design new sound hits for the visuals (playbook backlog). QA, preview, final.
2. Tue 10 Nov slate: Apple charger / Mr DIY Pt 2 — script with Eleven v4 voice text, decide Style A or B per the test.
3. After a few posts in each style: pull TikTok Studio numbers and compare A vs B.
