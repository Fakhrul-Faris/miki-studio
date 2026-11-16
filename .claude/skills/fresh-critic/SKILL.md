---
name: fresh-critic
description: Independent scoring of a Miki Explained board, preview or final by a fresh subagent that did not build it (X1 critic rubric, pass bar ≥ 8, gate criteria ≥ 7). Use before showing any board, animatic, preview or final to the user, when the user asks "is it good enough", "score this", "run the critic", or after fixing a render — the builder never scores its own work (it over-rates by ~2 points).
---

# Fresh critic

The builder never scores. A subagent that did not build the episode scores it against a reference, with evidence, and
the builder fixes only what the critic confirms. Rubric: `miki-explained/00_bible/experiments/X1-oss-upgrade/critic-rubric.md`
(read it before spawning; it holds the criteria, the pass bar and the round caps).

## When
- **Board** (stills): after `exposure_check.py` and the raea clipping log are clean. Score as a board (criteria 1–3, 5, 6,
  10, 11 need video: say so). **Cap: 5 rounds**, then show the user with the scores and move to the animatic.
- **Preview / final** (video): every round until it passes (criteria 1–3 and 11 each ≥ 7, mean ≥ 8), max 3 rounds, then
  show the user with the scores and the open failures.

## How
1. Prepare the evidence the critic will need, then spawn **one** general-purpose subagent (keep its id; send later rounds to
   the same agent with SendMessage so it can say what improved, but it must still re-open the files each round):
   - the rubric path, `00_bible/anchors/README.md` + anchors, the style recipe (`series-bible/RECIPE-D.md` § 4, 5, 7),
     `X1-oss-upgrade/ui-rules.md` for UI shots;
   - the brief: the episode's `episode.md` sections (art direction, art bible, shot list);
   - a reference: the closest approved episode's board / final (e.g. EX38 `stills/board_v3.jpg`, EX44 `stills/board_v2.jpg`);
   - the work: contact sheet + full-size stills (board), or the mp4 + `build/tl.json` word times + setup boundaries (video);
   - your own automatic results (frames_check, clipping lines, exposure_check, voice_check) and anything you suspect.
2. Ask for: a score table with evidence per criterion, per-setup / per-timecode failures, top 5 fixes, pass/fail, under
   ~500 words. Tell it to open full-size frames before claiming anything and to stay harsh.
3. Fix only confirmed items; re-render; send the next round with a precise change list. If a fix makes a shot worse, revert
   it (EX45 round 12) rather than piling on.
4. Log every round's mean in `episode.md` (X1 log) and report scores honestly to the user — never "passes" before it does.

## Lessons (EX45)
- Visual criteria matched the user's taste (no visual notes from the user after the critic passed it).
- The critic missed every audio problem until criterion 11 + `tools/x1/voice_check.py` existed: always hand it voice_check output.
- A board stalls on whole-build properties (materials); go to video instead of polishing stills past round 5.
