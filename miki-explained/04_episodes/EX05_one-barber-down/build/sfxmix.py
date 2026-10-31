#!/usr/bin/env python3
"""Rebuild sfx/mix.wav = audio/voice.wav + drone bed + sparse hits. U1: no music. The bed has no fades: the video loops (S1).
Hit times are MASTER frames / 24. Run from the episode folder: python3 build/sfxmix.py"""
import subprocess
SRC = 'sfx/source/'
S = {'stamp': ('Traditional Stamp Sound Effect.mp3', 0.45, 1.20, 0.10), 'rip': ('Rip Sound Effect.mp3', 0.35, 1.40, 0.25),
     'tick': ('tick.wav', 0.0, 0.05, 0.0), 'pop': ('pop.wav', 0.0, 0.11, 0.0)}
EV = [('stamp', 36, 0.36), ('rip', 51, 0.28), ('stamp', 56, 0.42),          # 1A 4 MIN, struck, 45 MIN
      ('stamp', 160, 0.36), ('stamp', 191, 0.36),                           # 1B 4 MIN, NOBODY COMPLAINS
      ('stamp', 242, 0.34), ('tick', 281, 0.35), ('tick', 287, 0.35), ('tick', 293, 0.35), ('tick', 299, 0.35), ('stamp', 327, 0.4),   # 2A out, walk-ins, ×1.5
      ('stamp', 411, 0.36), ('pop', 491, 0.4),                              # 2B title, the dot lands at 45 MIN
      ('stamp', 540, 0.36), ('rip', 557, 0.3), ('stamp', 581, 0.45),        # 3A ×1.5 struck, ×10
      ('stamp', 660, 0.34), ('stamp', 716, 0.42)]                            # 4A 83 %, 45 MIN
DUR = 802 / 24
ins = ['-i', 'audio/voice.wav', '-i', SRC + 'Free Drone Bed Sound Effects.mp3']
fl = ['[0]aresample=48000,aformat=channel_layouts=stereo,apad[v]',
      f'[1]atrim=0:{DUR},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=0.14[bed]']
lab = ['[v]', '[bed]']
for i, (n, fr, g) in enumerate(EV):
    f, a, b, hit = S[n]; ins += ['-i', SRC + f]; d = int(round((fr / 24 - hit) * 1000))
    fl.append(f'[{i+2}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b-a-0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},alimiter=limit=0.95[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
