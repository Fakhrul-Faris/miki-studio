# X1 critic rubric: a fresh agent scores the render before the user sees it

Adapted from make-short's `RUBRIC-blank.md` (MIT, nocodehack/make-short; original in `borrowed/`). Their finding: the
builder rates its own film about 2 points too high, so **the builder never scores**. A fresh subagent that did not
build the episode fills this in, against the episode's reference clip (the style's reference video, or the closest
past episode that performed best).

## Method

1. `python3 tools/x1/critic_sheets.py OURS.mp4 REF.mp4 review/critic-rNN/ --fps 1` (sheets, sharpness, steps, still stretches).
   For type and UI motion also `--fps 4` on the beats in question.
2. The critic reads the sheets **and** opens frames at full size before claiming anything (make-short lesson 28: verify every
   critic claim at full resolution).
3. Fill the table. Every score cites frames or numbers. A score with no evidence counts as 0.
4. Report `review/critic-rNN.md`: the table, then **Top 3 fixes**, each naming a time range (never a shot id; ids change),
   the criterion and the evidence image. Under 400 words.
5. The builder hands the critic its own suspicions to verify. A holistic score misses proportions, so the critic also
   measures (sizes, timings, cut rate) against the reference; when two versions tie, a pairwise pick (which is better,
   and why) decides (awesome-3d scan: make-short lessons 28/47, construct).
6. The builder fixes only confirmed problems, renders again, a **new** fresh critic scores round N+1.

## Criteria (Miki Explained)

| # | Criterion | 10/10 means | Test | Score /10 | Evidence |
|---|---|---|---|---|---|
| 1 | Line on screen | Each narration line's noun/number is visible and big (≥ 25 % of frame) at its word ± 0.25 s (visualize-the-script) | frame at each cue word: hits / lines | | |
| 2 | Hook at frame 0 | Frame 0 already moving, odd, readable on mute; brand logo on screen from frame 1 | frames 0, 0.5, 1.0 s | | |
| 3 | Sharpness | Blur only on declared whips/seams; beat frames sharp | lapvar median ≥ 0.75 × ref; soft frames not within 0.3 s of a cue word | | |
| 4 | Camera / setup rhythm | New setup every 2–3 s (Style D motion for all styles); moves start, travel, land | cut-like steps per 10 s; list of distinct setups | | |
| 4b | Not a slideshow | Each scene builds 3–5 elements, one per phrase; a through-line world or subject; ≤ 2 text tiers; motion beyond slow zooms (`bundle3-rules.md` §1) | count elements per scene at its last frame | | |
| 4c | Camera reasons | Camera moves only where the eye must go; no move repeated shot after shot; fast pushes/slams only on reveals; numbers land on their spoken word; grammar fits each segment (`bundle4-rules.md`) | `tools/x1/breakdown.py` on ours vs ref: cut rate, grid residual, motion share per shot | | |
| 5 | Seams | Every change carries an element or hides in a blur/whip/anchor; no bare cut, no crossfade of two scenes | count seams by kind; bare cuts / all | | |
| 6 | Motion quality | Nothing pops (≥ 0.4 s in/out), ease-outs never start from a stop, no float or bob back and forth, overshoot only on landings; impacts accelerate into contact; a hold keeps a slow one-way creep (1–2 % of range), never a dead freeze; camera keys ≥ 5 frames apart (awesome-3d-scan § Motion) | 4 fps strips at every entrance and impact | | |
| 7 | World and light | Matches the style's locked traits; one key light with a job (35–55°, across the subject, coloured shadows); exposure check passes; greyscale value check vs reference; hero reads as a silhouette | `tools/x1/exposure_check.py` on 1 frame per setup | | |
| 8 | UI craft (UI beats) | 3–7 real strings per screen, rest quiet; device cropped off an edge; values roll, never swap | per UI beat, count strings; frames at each change | | |
| 9b | Type motion | Text enters on X with per-word opacity; no trembling type (`tools/x1/text_jitter.sh` spikes only at cuts/whips); no "+" on numbers; no glow, gradient text or decorative caps (`bundle2-rules.md`) | jitter scan + full-res frames | | |
| 9 | Captions | EX15 capBlock, 36 px rule, on the word, never covering the line's subject | offset vs word start at full res | | |
| 10 | Sound | Hits within ± 2 frames of impacts; −14 LUFS ± 1; sparse SFX; signature sound only on the outro | waveform peaks vs impact frames; loudnorm | | |
| 11 | Voice quality (added 2026-11-16, EX45) | Every script word heard, no word clipped at a trim or file edge, clear (not muffled), no metallic/denoise shimmer, natural pace | `tools/x1/voice_check.py EP --table "<voice table>"` on the processed takes (and `--raw` on the takes as recorded) + one full listen of `audio/vo.wav` | | |

Overall = unweighted mean. **Pass bar: criteria 1–3 and 11 each ≥ 7 and mean ≥ 8.** Below the bar: no showing to the user;
fix and re-score (max 3 rounds, then show with the scores and say what still fails).

**Lessons from X1 test #1 (EX45, 2026-11-16):**
- **Boards:** cap at **5 critic rounds**. EX45 took 12 (4.0 → 7.9) and stalled on materials, which only a whole-build pass
  lifts; the gating criteria (1–3) can only be judged on video anyway. After 5, show the user and move to the animatic.
- **Interface stills:** run `exposure_check.py --ui` (white screens are not overexposure).
- **Voice:** every one of the user's EX45 notes was audio (muffled, metallic, words cut, a missing sentence) and the
  critic caught none, so criterion 11 is now gating. Never stack an FFT denoise on ElevenLabs takes (metallic), and trim
  pauses once, by energy, never by Whisper word edges (they cut words).
- The critic's visual bar matched or beat the user's (the user had no visual notes), so the visual criteria stay.
