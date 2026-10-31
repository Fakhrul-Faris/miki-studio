#!/usr/bin/env python3
"""EX08 mix: the music bed (U3: no voice) + sparse paper foley on the big beats. Frames = MASTER frames / 24.
Run from the episode folder: python3 build/sfxmix.py"""
import subprocess
SRC = 'sfx/source/'; U = 1.5 * 60 / 71 * 24; T = lambda u: round(1.7 + u * U)
S = {'stamp': ('Traditional Stamp Sound Effect.mp3', 0.45, 1.20, 0.10), 'rip': ('Rip Sound Effect.mp3', 0.35, 1.40, 0.25),
     'tick': ('tick.wav', 0.0, 0.05, 0.0), 'ding': ('ding.wav', 0.0, 0.66, 0.0)}
EV = [('stamp', T(1) + 2, 0.32), ('tick', T(2), 0.4), ('tick', T(2) + 20, 0.4), ('tick', T(2) + 40, 0.4),
      ('stamp', T(8), 0.36), ('ding', T(9) + 20, 0.3), ('rip', T(12) + 8, 0.26), ('stamp', T(12) + 14, 0.38),
      ('stamp', T(13), 0.36), ('stamp', T(18), 0.36), ('stamp', T(25) + 6, 0.4), ('tick', T(30) + 24, 0.3), ('tick', T(30) + 32, 0.3)]
END = T(34); DUR = END / 24
ins = ['-i', 'audio/Hip Hop Chill Beat.mp3']
fl = [f'[0]atrim=0:{DUR},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=0.85,afade=t=in:d=0.15,afade=t=out:st={DUR-0.5}:d=0.5[m]']
lab = ['[m]']
for i, (n, fr, g) in enumerate(EV):
    f, a, b, hit = S[n]; ins += ['-i', SRC + f]; d = max(0, int(round((fr / 24 - hit) * 1000)))
    fl.append(f'[{i+1}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b-a-0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=first,alimiter=limit=0.95[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
print('mix', round(DUR, 2), 's')
