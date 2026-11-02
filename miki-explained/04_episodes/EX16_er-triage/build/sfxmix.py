#!/usr/bin/env python3
"""EX16 mix: voice + a low drone bed + a sparse set of hits (V3: soft, clean; no paper foley). Nothing on the follow card
(≥ 2178). Frames = MASTER frames / 60. Run from the episode folder."""
import subprocess
FPS = 60
# name: (file, trim start, trim end, hit time inside the trimmed clip)
SFX = {'tick': ('sfx/tick.wav', 0.0, 0.05, 0.0), 'pop': ('sfx/pop.wav', 0.0, 0.11, 0.0), 'whoosh': ('sfx/whoosh.wav', 0.0, 0.45, 0.15),
       'sink': ('sfx/Low End Reverse Whoosh Sound.mp3', 0.0, 3.2, 2.37)}
EV = []
EV += [('pop', 82, 0.24)]                                            # 71.8% lands (hook)
EV += [('pop', 455, 0.2)]                                            # EVENT_A: a patient jumps the queue
EV += [('pop', 785, 0.2)]                                            # EVENT_B: another jumps it, close to the desk
EV += [('sink', 1225, 0.36)]                                         # "rebuild it": the old 3-tier legend fades
EV += [('tick', f, 0.26) for f in (1079, 1179)]                       # the five levels build in
EV += [('tick', 1700, 0.3)]                                          # 91.3%: smaller hospitals do even better
EV += [('whoosh', 1945, 0.2)]                                        # "you" is finally called
EV += [('whoosh', 2100, 0.18)]                                       # home, the loop
DUR = 2264 / FPS
ins = ['-i', 'audio/voice.wav', '-i', 'sfx/Free Drone Bed Sound Effects.mp3']
fl = ['[0]aresample=48000,aformat=channel_layouts=stereo,apad[v]',
      f'[1]atrim=0:{DUR},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=0.10,afade=t=in:d=0.6,afade=t=out:st={DUR - 1.5}:d=1.5[bed]']
lab = ['[v]', '[bed]']
for i, (n, fr, g) in enumerate(EV):
    assert fr < 2178, 'nothing on the follow card'
    f, a, b, hit = SFX[n]; ins += ['-i', f]; d = max(0, int(round((fr / FPS - hit) * 1000)))
    fl.append(f'[{i + 2}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b - a - 0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},volume=0.85,alimiter=limit=0.8:level=0[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
open('sfx/events.txt', 'w').write('\n'.join(f'{fr}\t{n}\t{g}' for n, fr, g in EV) + '\n')
print('mix ok', len(EV), 'hits')
