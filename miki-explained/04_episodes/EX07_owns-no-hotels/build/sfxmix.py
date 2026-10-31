#!/usr/bin/env python3
"""Rebuild sfx/mix.wav = audio/voice.wav (brisk, U4) + a low drone bed + sparse paper hits. Hit times are MASTER frames / 24.
Run from the episode folder: python3 build/sfxmix.py"""
import subprocess
SRC = 'sfx/source/'
S = {'stamp': ('Traditional Stamp Sound Effect.mp3', 0.45, 1.20, 0.10), 'rip': ('Rip Sound Effect.mp3', 0.35, 1.40, 0.25),
     'tick': ('tick.wav', 0.0, 0.05, 0.0), 'pop': ('pop.wav', 0.0, 0.11, 0.0)}
EV = [('stamp', 3, 0.36), ('pop', 73, 0.4),                                   # <1% OWNED, the owned share
      ('tick', 98, 0.3), ('tick', 104, 0.3), ('tick', 110, 0.3), ('rip', 128, 0.22),   # 9,361 rolls, the rows flip
      ('pop', 168, 0.35), ('tick', 198, 0.4), ('stamp', 227, 0.38),           # the tab, the minibar door, LOSES MONEY
      ('stamp', 260, 0.32), ('tick', 276, 0.3), ('tick', 305, 0.35), ('tick', 321, 0.35), ('tick', 342, 0.3), ('tick', 350, 0.3),   # MARRIOTT, coins, wheel, $5.4B
      ('stamp', 481, 0.42), ('tick', 520, 0.3), ('tick', 526, 0.3), ('rip', 575, 0.25), ('stamp', 645, 0.36)]   # the bank, $716M, the card, YOU'RE THE POINTS
DUR = 690 / 24
ins = ['-i', 'audio/voice.wav', '-i', SRC + 'Free Drone Bed Sound Effects.mp3']
fl = ['[0]aresample=48000,aformat=channel_layouts=stereo,apad[v]',
      f'[1]atrim=0:{DUR},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=0.14,afade=t=in:d=1,afade=t=out:st={DUR-1.2}:d=1.2[bed]']
lab = ['[v]', '[bed]']
for i, (n, fr, g) in enumerate(EV):
    f, a, b, hit = S[n]; ins += ['-i', SRC + f]; d = int(round((fr / 24 - hit) * 1000))
    fl.append(f'[{i+2}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b-a-0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},alimiter=limit=0.95[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
