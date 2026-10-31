#!/usr/bin/env python3
"""EX09 mix (U1: no music): voice + a low drone bed (no fades: the video loops) + sparse hits. Frames = MASTER frames / 24.
No sound on the Meikigo logo (house rule). Run from the episode folder: python3 build/sfxmix.py"""
import subprocess
SRC = 'sfx/source/'
S = {'stamp': ('Traditional Stamp Sound Effect.mp3', 0.45, 1.20, 0.10), 'rip': ('Rip Sound Effect.mp3', 0.35, 1.40, 0.25),
     'tick': ('tick.wav', 0.0, 0.05, 0.0), 'pop': ('pop.wav', 0.0, 0.11, 0.0), 'beep': ('Free Scanner Sound Effects.mp3', 1.15, 1.60, 0.038)}
EV = [('beep', 64, 0.28),                                                   # 1A lane 2's shopper checks out
      ('tick', 103 + 60, 0.35), ('tick', 103 + 82, 0.35), ('tick', 103 + 100, 0.35), ('stamp', 207, 0.36), ('stamp', 264, 0.36),   # races, 2 OF 3, IT'S MATH
      ('pop', 323, 0.35), ('pop', 343, 0.35), ('pop', 358, 0.35), ('stamp', 488, 0.34),                                         # the jams, EMPTY
      ('rip', 566 + 37, 0.25), ('stamp', 566 + 143, 0.38),                                                                       # the airport slides in, IS FASTER
      ('tick', 851, 0.3), ('tick', 904, 0.3), ('stamp', 925 + 84, 0.36)]                                                         # 7.0, 1.6 MIN, FAST ONE
DUR = 1084 / 24
ins = ['-i', 'audio/voice.wav', '-i', SRC + 'Free Drone Bed Sound Effects.mp3']
fl = ['[0]aresample=48000,aformat=channel_layouts=stereo,apad[v]', f'[1]atrim=0:{DUR},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=0.13[bed]']
lab = ['[v]', '[bed]']
for i, (n, fr, g) in enumerate(EV):
    f, a, b, hit = S[n]; ins += ['-i', SRC + f]; d = int(round((fr / 24 - hit) * 1000))
    fl.append(f'[{i+2}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b-a-0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},alimiter=limit=0.95[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
print('mix ok')
