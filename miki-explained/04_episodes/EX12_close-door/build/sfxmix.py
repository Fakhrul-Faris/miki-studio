#!/usr/bin/env python3
"""EX12 mix (U2 paper foley, no music): voice + a click on every button press, paper on the stamps, the doors' slide,
ticks on the guess timer. No sound on the logo. Frames = MASTER frames / 24. Run from the episode folder."""
import subprocess
SFX = {'stamp': ('sfx/Traditional Stamp Sound Effect.mp3', 0.45, 1.20, 0.10), 'pop': ('sfx/pop.wav', 0.0, 0.11, 0.0),
       'tick': ('sfx/tick.wav', 0.0, 0.05, 0.0), 'whoosh': ('sfx/whoosh.wav', 0.0, 0.6, 0.15)}
PRESS = [8, 27, 386, 413, 566, 593, 618, 990]                                  # finger presses (sets.py); the click lands at +6
EV = [('tick', p + 6, 0.55) for p in PRESS]
EV += [('tick', f, 0.25) for f in (37, 61, 85, 109)]                            # the guess timer
EV += [('whoosh', 200, 0.25), ('whoosh', 1038, 0.22), ('whoosh', 889, 0.18)]  # doors open, doors close, the phone card
EV += [('stamp', f, 0.3) for f in (105, 252, 313, 326, 359, 494, 578, 670, 721, 913, 1058)]
DUR = 1150 / 24
ins = ['-i', 'audio/voice.wav']; fl = ['[0]aresample=48000,aformat=channel_layouts=stereo,apad[v]']; lab = ['[v]']
for i, (n, fr, g) in enumerate(EV):
    assert fr < 1089, 'nothing on the follow card / logo'
    f, a, b, hit = SFX[n]; ins += ['-i', f]; d = max(0, int(round((fr / 24 - hit) * 1000)))
    fl.append(f'[{i + 1}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b - a - 0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},alimiter=limit=0.95[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
print('mix ok', len(EV), 'sounds')
