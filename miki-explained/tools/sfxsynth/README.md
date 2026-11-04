# sfxsynth — procedural sound effects (pure Python stdlib)

From [whaleyxbt/claude-motion](https://github.com/whaleyxbt/claude-motion) `sfx/` (MIT, see LICENSE), adopted 2026-11-05.
Every sound is synthesized: no samples, no licences, no network, the same output on every run.

    cd miki-explained/tools && python3 -m sfxsynth --list                          # generators and what each is for
    cd miki-explained/tools && python3 -m sfxsynth <cue.py> --out <episode>/sfx/hits.wav

A cue sheet defines `score(mix, tl)` and places sounds on the voice timeline (`audio/vo_timeline.json`): see
`cues/effort.py` (upstream example). Mastering is automatic (default −14 LUFS; set `TARGET_LUFS = -18.0` for our
voice-led mixes, or render hits only and mix them under the voice in the episode's `sfxmix.py`).

House rules (explained-sfx-restraint): sparse hits only, one riser and one impact per video at most, nothing on the
logo / follow card. Pan follows the on-screen position; keep tonal sounds in one key.

Local change: `__main__.py` accepts our `vo_timeline.json` (its length is `end`, not `duration`).
