#!/usr/bin/env python3
"""EX20 mix: voice + a low drone bed + a sparse set of hits (V3: soft, clean; no paper foley). Nothing on the follow card
(≥ 4255). Frames = MASTER frames / 60. Run from the episode folder."""
import subprocess
FPS = 30
# name: (file, trim start, trim end, hit time inside the trimmed clip)
# earshot's free code-synthesized bank (archive-ignore/ext/earshot, `earshot sfx render <id> -o sfx/es_<name>.wav`):
# (file, trim start, trim end, hit time inside the trimmed clip = the sound's reported peak)
SFX = {'pop': ('sfx/es_pop1.wav', 0.0, 0.15, 0.004), 'blip': ('sfx/es_blip.wav', 0.0, 0.118, 0.017),
       'swish': ('sfx/es_swish.wav', 0.0, 0.88, 0.110), 'sub': ('sfx/es_sub.wav', 0.0, 0.286, 0.021),
       'fall': ('sfx/es_fall.wav', 0.0, 1.78, 0.152), 'rise': ('sfx/es_rise.wav', 0.0, 0.95, 0.697)}
EV = []                                                               # 30 fps frames (v4)
EV += [('swish', 147, 0.45)]                                                  # out of the corridor, across the road
EV += [('blip', 397, 0.4)]                                                   # "safety pin": the close-up
EV += [('swish', 526, 0.45)]                                                  # crane up into the diagram
EV += [('pop', 607, 0.4)]                                                    # "Railroads"
EV += [('pop', 643, 0.4)]                                                    # "drugstores"
EV += [('sub', 804, 0.5)]                                                    # the ring opens the roof
EV += [('rise', 1053, 0.5)]                                                  # "five inches high" (peak on the word)
EV += [('swish', 1143, 0.5)]                                                 # "owned one": the stack fans out into the town
EV += [('blip', 1312, 0.45)]                                                  # "hospital": the windows light
EV += [('blip', 1374, 0.45)]                                                  # "library"
EV += [('sub', 1582, 0.45)]                                                   # "quietly owned them": the pump light clicks off
DUR = 1686 / FPS
ins = ['-i', 'audio/voice.wav', '-i', 'sfx/Free Drone Bed Sound Effects.mp3']
fl = ['[0]aresample=48000,aformat=channel_layouts=stereo,apad[v]',
      f'[1]atrim=0:{DUR},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=0.10,afade=t=in:d=0.6,afade=t=out:st={DUR - 1.5}:d=1.5[bed]']
lab = ['[v]', '[bed]']
for i, (n, fr, g) in enumerate(EV):
    assert fr < 1643, 'nothing on the follow card'
    f, a, b, hit = SFX[n]; ins += ['-i', f]; d = max(0, int(round((fr / FPS - hit) * 1000)))
    fl.append(f'[{i + 2}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b - a - 0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},volume=0.97,alimiter=limit=0.8:level=0[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
open('sfx/events.txt', 'w').write('\n'.join(f'{fr}\t{n}\t{g}' for n, fr, g in EV) + '\n')
print('mix ok', len(EV), 'hits')
