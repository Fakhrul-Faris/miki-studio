#!/usr/bin/env python3
"""EX10 mix (U2 paper foley: no music, no bed): voice + paper sounds. E6 silence drop: nothing between "flip." and "AMC's"
(MASTER 512–534). No sound on the logo. Frames = MASTER frames / 24. Run from the episode folder: python3 build/sfxmix.py"""
import subprocess
SRC = 'sfx/source/'
S = {'stamp': ('Traditional Stamp Sound Effect.mp3', 0.45, 1.20, 0.10), 'rip': ('Rip Sound Effect.mp3', 0.35, 1.40, 0.25),
     'snip': ('Scissor Snip Sound Effect.mp3', 0.06, 0.50, 0.036), 'tick': ('tick.wav', 0.0, 0.05, 0.0), 'pop': ('pop.wav', 0.0, 0.11, 0.0)}
EV = [('stamp', 3, 0.34), ('stamp', 7, 0.3),                                  # 1A data on frame 0
      ('stamp', 88 + 12, 0.32), ('rip', 88 + 97, 0.4), ('stamp', 88 + 132, 0.34), ('stamp', 88 + 175, 0.3),   # $12, the tear, STUDIO, WEEK 1
      ('tick', 299 + 56, 0.3), ('tick', 299 + 64, 0.3), ('tick', 299 + 84, 0.3),                             # the walk past the counter
      ('stamp', 499 + 70, 0.45), ('pop', 499 + 96, 0.3),                                                     # 20¢ after the silence
      ('tick', 625 + 30, 0.3), ('tick', 625 + 36, 0.3), ('snip', 625 + 96, 0.3), ('pop', 625 + 112, 0.3), ('pop', 625 + 140, 0.3), ('stamp', 625 + 156, 0.36),   # $7.62, dots fall, bars, ≈
      ('stamp', 797 + 93, 0.36)]                                                                            # the reframe
DUR = 971 / 24
ins = ['-i', 'audio/voice.wav']; fl = ['[0]aresample=48000,aformat=channel_layouts=stereo,apad[v]']; lab = ['[v]']
for i, (n, fr, g) in enumerate(EV):
    assert not (512 <= fr <= 534), 'E6: keep the silence clean'
    f, a, b, hit = S[n]; ins += ['-i', SRC + f]; d = max(0, int(round((fr / 24 - hit) * 1000)))
    fl.append(f'[{i+1}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b-a-0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},alimiter=limit=0.95[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
print('mix ok')
