#!/usr/bin/env python3
"""Rebuild sfx/mix.wav = audio/voice.wav + the SFX hits (sources in sfx/source/). U2 paper foley: no music, no drone bed.
Hit times are MASTER frames / 24. Run from the episode folder: python3 build/sfxmix.py"""
import subprocess
SRC = 'sfx/source/'
S = {'stamp': ('Traditional Stamp Sound Effect.mp3', 0.45, 1.20, 0.10), 'rip': ('Rip Sound Effect.mp3', 0.35, 1.40, 0.25),
     'tick': ('tick.wav', 0.0, 0.05, 0.0), 'pop': ('pop.wav', 0.0, 0.11, 0.0), 'ding': ('ding.wav', 0.0, 0.66, 0.0),
     'snip': ('Scissor Snip Sound Effect.mp3', 0.06, 0.50, 0.036), 'beep': ('Free Scanner Sound Effects.mp3', 1.15, 1.60, 0.038)}
EV = [('stamp', 33, 0.38), ('rip', 45, 0.3),                                        # 1A FREE, strike
      ('beep', 75, 0.3), ('pop', 102, 0.5), ('pop', 132, 0.45), ('ding', 151, 0.3), ('pop', 162, 0.45),   # 1B tap, fee coins, the shop pays
      ('stamp', 201, 0.34), ('tick', 214, 0.4), ('tick', 218, 0.4), ('tick', 222, 0.4), ('stamp', 306, 0.38),   # 2A trick, notes land, 0.07%
      ('tick', 361, 0.35), ('tick', 367, 0.35), ('tick', 373, 0.35), ('tick', 379, 0.35), ('tick', 385, 0.35), ('tick', 391, 0.35), ('stamp', 399, 0.4),
      ('snip', 482, 0.6), ('stamp', 510, 0.4),                                      # 2B snip, 2.4%
      ('stamp', 566, 0.36), ('rip', 572, 0.3), ('tick', 677, 0.4),                  # 3A FREE?, strike, cash note lands
      ('tick', 746, 0.45), ('tick', 796, 0.3), ('tick', 802, 0.3), ('stamp', 805, 0.4), ('tick', 814, 0.3), ('tick', 822, 0.3), ('tick', 830, 0.3),   # 4A receipt, tower
      ('tick', 879, 0.3), ('tick', 891, 0.3), ('tick', 903, 0.3),                   # 4A the spread coins
      ('pop', 973, 0.45), ('pop', 984, 0.45), ('pop', 989, 0.45),                   # 5A every single tap
      ('stamp', 1012, 0.36)]                                                        # 5B title
DUR = 1088 / 24
ins = ['-i', 'audio/voice.wav']
fl = ['[0]aresample=48000,aformat=channel_layouts=stereo[v]']
lab = ['[v]']
for i, (n, fr, g) in enumerate(EV):
    f, a, b, hit = S[n]; ins += ['-i', SRC + f]; d = int(round((fr / 24 - hit) * 1000))
    fl.append(f'[{i+1}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b-a-0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},alimiter=limit=0.95[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
