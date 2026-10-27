#!/usr/bin/env python3
"""Mix an episode's sparse sound track → sfx/sfx_mix.wav.

Usage: python3 miki-explained/tools/sfxmix.py <episode_dir> <duration_s> "name@t:gain" ...
  e.g. sfxmix.py ep 48 "pop@1.5:0.4" "whoosh_long@30.45:0.55" "whoosh@39.86:0.35" "swipe@41.17:0.3"
Sounds come from miki-explained/06_sfx/<name>.wav (the ElevenLabs set) and fall back to 06_sfx/synth/<name>.wav.
The drone bed is added automatically (bed.wav, else synth/drone.wav) at -12 dB under the voice.
Rules (series-plan.md): 4–6 effects per episode, key moments only. The logo outro stays silent.
"""
import subprocess, sys
from pathlib import Path

ep = Path(sys.argv[1]); dur = float(sys.argv[2]); lib = Path(__file__).resolve().parent.parent / "06_sfx"
def find(name):
    for p in (lib / f"{name}.wav", lib / "synth" / f"{name}.wav"):
        if p.exists(): return p
    sys.exit(f"missing sound: {name}")
bed = lib / "bed.wav" if (lib / "bed.wav").exists() else lib / "synth" / "drone.wav"
ev = [(bed, 0.0, 0.32)]
for spec in sys.argv[3:]:
    name, rest = spec.split("@"); t, g = rest.split(":"); ev.append((find(name), float(t), float(g)))
ins, fl = [], []
for i, (f, t, g) in enumerate(ev):
    ins += ["-i", str(f)]; d = int(round(t * 1000))
    trim = f",atrim=0:{dur},afade=t=out:st={dur - 3.5}:d=3.5" if i == 0 else ""
    fl.append(f"[{i}]adelay={d}|{d},volume={g}{trim}[a{i}]")
mix = "".join(f"[a{i}]" for i in range(len(ev))) + f"amix=inputs={len(ev)}:normalize=0:duration=longest,atrim=0:{dur}[out]"
(ep / "sfx").mkdir(exist_ok=True)
subprocess.run(["ffmpeg", "-v", "error", "-y"] + ins + ["-filter_complex", ";".join(fl) + ";" + mix, "-map", "[out]",
                "-ar", "48000", "-ac", "1", str(ep / "sfx" / "sfx_mix.wav")], check=True)
(ep / "sfx" / "events.txt").write_text("\n".join(f"{t:6.2f}  {f.name:16s} gain {g}" for f, t, g in ev) + "\n(logo outro: silent)\n")
print((ep / "sfx" / "events.txt").read_text())
