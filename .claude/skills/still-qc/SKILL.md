---
name: still-qc
description: Automatic quality checks on Miki Explained renders before anyone looks: exposure/colour on stills (with a UI mode for app screens), black-frame and flicker scan on frame folders, raea clipping (collision) lines, a reference breakdown (cut grid, motion heatmap), the copy check on narration and the voice check on recorded takes. Use after every board, preview or final render, after re-processing the voice, or when the user asks to "check", "QA" or "verify" a render or the voice.
---

# Still / render QC

Run from `miki-explained/`. Report what each check says — never "looks fine" without the numbers (LESSONS: the check
runs before showing anything).

| What | Command | Pass |
|---|---|---|
| Exposure / colour, 3D stills | `python3 tools/x1/exposure_check.py build/media/_bd/frame-000NN.png …` | PASS per still; for a deliberate dark/flash frame say why |
| Exposure, interface stills | `python3 tools/x1/exposure_check.py --ui …` | only a muddy (low-contrast) or murky screen fails |
| Collisions | `grep -c clipping build/media/_bd.log` (and every `media/_pv*/c*.log`, `_render/c*.log`) | 0 lines |
| Black / flicker | `python3 tools/raea/frames_check.py build/media/_pvN/frames` | BLACK none; each FLICKER flag explained (counters rolling are expected) |
| Contact sheet | `ffmpeg -i out/preview_vN.mp4 -vf "fps=2,scale=180:320,tile=12x11" -frames:v 1 stills/preview_sheet.jpg` | neighbouring cells not identical; seams visible |
| Reference breakdown | `python3 tools/x1/breakdown.py REF.mp4 OUT/` | cut grid and motion heatmap vs ours |
| Narration copy | `python3 tools/x1/copy_check.py 04_episodes/EXNN_*/episode.md --table "<script table>"` | 0 errors (warnings explained) |
| Voice | `/Users/user/Private/miki-studio/archive-ignore/comedy-autopsy/.venv/bin/python tools/x1/voice_check.py 04_episodes/EXNN_* --table "<voice table>" [--raw]` | no MISSING / CUT / DULL / HARSH, then one full listen |
| Loudness | `ffmpeg -i FILE -af ebur128=peak=true -f null - 2>&1 \| grep -E "I:|Peak:"` | −14 LUFS ± 1, peak ≤ −1 dBFS |
| Text jitter | `tools/x1/text_jitter.sh FILE` | spikes only at cuts/whips |

Voice processing rules learned on EX45: run `voice_check --raw` on the user's takes first (it finds dull takes); lift only
the dull lines with a presence shelf; no FFT denoise on ElevenLabs takes (metallic); trim pauses once, by energy
(`build/voice_fix.py`), never again with Whisper word edges (cuts words).
Hand all results to the `fresh-critic` subagent.
