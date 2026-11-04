#!/usr/bin/env python3
"""EX20 mix: voice + a low drone bed + a sparse set of hits (V3: soft, clean; no paper foley). Nothing on the follow card
(≥ 1714). Frames = MASTER frames (30 fps). Run from the episode folder."""
import subprocess
FPS = 30
# name: (file, trim start, trim end, hit time inside the trimmed clip)
# earshot's free code-synthesized bank (archive-ignore/ext/earshot, `earshot sfx render <id> -o sfx/es_<name>.wav`):
# (file, trim start, trim end, hit time inside the trimmed clip = the sound's reported peak)
SFX = {'pop': ('sfx/es_pop1.wav', 0.0, 0.15, 0.004), 'blip': ('sfx/es_blip.wav', 0.0, 0.118, 0.017),
       'swish': ('sfx/es_swish.wav', 0.0, 0.88, 0.110), 'sub': ('sfx/es_sub.wav', 0.0, 0.286, 0.021),
       'fall': ('sfx/es_fall.wav', 0.0, 1.78, 0.152), 'rise': ('sfx/es_rise.wav', 0.0, 0.95, 0.697)}
EV = []                                                               # 30 fps frames (v4 clay, episode.py v4)
EV += [('swish', 162, 0.4)]                                                  # rise out of the store into the map
EV += [('blip', 407, 0.4)]                                                   # "safety pin": the close-up
EV += [('pop', 656, 0.4)]                                                    # "Railroads" rises
EV += [('pop', 692, 0.4)]                                                    # "drugstores" rises
EV += [('blip', 781, 0.4)]                                                   # "cash": the first coins
EV += [('rise', 977, 0.45)]                                                  # the town rises to "95" (peak on the word)
EV += [('blip', 1132, 0.4)]                                                 # "five inches": the 5 IN mark
EV += [('swish', 1215, 0.5)]                                                 # "owned one": the certificates fly
EV += [('blip', 1384, 0.45)]                                                  # "hospital" glows
EV += [('blip', 1446, 0.45)]                                                  # "library" glows
EV += [('sub', 1668, 0.45)]                                                   # "quietly owned them": every piece glows
DUR = 1758 / FPS
ins = ['-i', 'audio/voice.wav', '-i', 'sfx/Free Drone Bed Sound Effects.mp3']
fl = ['[0]aresample=48000,aformat=channel_layouts=stereo,apad[v]',
      f'[1]atrim=0:{DUR},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=0.10,afade=t=in:d=0.6,afade=t=out:st={DUR - 1.5}:d=1.5[bed]']
lab = ['[v]', '[bed]']
for i, (n, fr, g) in enumerate(EV):
    assert fr < 1714, 'nothing on the follow card'
    f, a, b, hit = SFX[n]; ins += ['-i', f]; d = max(0, int(round((fr / FPS - hit) * 1000)))
    fl.append(f'[{i + 2}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b - a - 0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},volume=0.97,alimiter=limit=0.8:level=0[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
open('sfx/events.txt', 'w').write('\n'.join(f'{fr}\t{n}\t{g}' for n, fr, g in EV) + '\n')
print('mix ok', len(EV), 'hits')
