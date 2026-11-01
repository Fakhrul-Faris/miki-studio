#!/usr/bin/env python3
"""EX13 mix: voice + a low drone bed + a sparse set of hits on the key moments (split-flap clacks when a number lands,
the stamps, the paper slides and tear, the walls sinking). Nothing on the follow card / logo (≥ 1006).
Frames = MASTER frames / 24. Run from the episode folder."""
import subprocess
# name: (file, trim start, trim end, hit time inside the trimmed clip)
SFX = {'stamp': ('sfx/Traditional Stamp Sound Effect.mp3', 0.45, 1.20, 0.17), 'tick': ('sfx/tick.wav', 0.0, 0.05, 0.0),
       'pop': ('sfx/pop.wav', 0.0, 0.11, 0.0), 'whoosh': ('sfx/whoosh.wav', 0.0, 0.45, 0.15),
       'rip': ('sfx/Rip Sound Effect.mp3', 0.75, 1.60, 0.43), 'sink': ('sfx/Low End Reverse Whoosh Sound.mp3', 0.0, 3.2, 2.37)}
EV = []
EV += [('tick', f, 0.35) for f in (22, 24, 26)]                      # 60 lands on the posted row (1A)
EV += [('tick', f, 0.45) for f in (53, 55, 57)]                      # 23 lands on your row
EV += [('stamp', 81, 0.30)]                                          # NOT LUCK
EV += [('whoosh', 98, 0.22), ('stamp', 106, 0.22)]                   # 2A paper slide up; 60 MIN on the sign
EV += [('tick', f, 0.30) for f in (287, 295, 302, 309)]              # 3A the four bars land
EV += [('whoosh', 387, 0.20), ('stamp', 511, 0.30)]                  # 4A the card flips in; THE BEATABLE WAIT
EV += [('sink', 650, 0.45)]                                          # 5A the walls sink to their outlines
EV += [('whoosh', 767, 0.20), ('rip', 801, 0.30), ('stamp', 860, 0.28)]   # 6A print in; tear to the counter; SERVED IN 10
EV += [('tick', f, 0.35) for f in (963, 965, 967)]                   # 7A WON lands
DUR = 1041 / 24
ins = ['-i', 'audio/voice.wav', '-i', 'sfx/Free Drone Bed Sound Effects.mp3']
fl = ['[0]aresample=48000,aformat=channel_layouts=stereo,apad[v]',
      f'[1]atrim=0:{DUR},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=0.10,afade=t=in:d=0.6,afade=t=out:st={DUR - 1.5}:d=1.5[bed]']
lab = ['[v]', '[bed]']
for i, (n, fr, g) in enumerate(EV):
    assert fr < 1006, 'nothing on the follow card / logo'
    f, a, b, hit = SFX[n]; ins += ['-i', f]; d = max(0, int(round((fr / 24 - hit) * 1000)))
    fl.append(f'[{i + 2}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b - a - 0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},volume=0.85,alimiter=limit=0.8:level=0[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
open('sfx/events.txt', 'w').write('\n'.join(f'{fr}\t{n}\t{g}' for n, fr, g in EV) + '\n')
print('mix ok', len(EV), 'hits')
