#!/usr/bin/env python3
"""EX18 mix: voice + a low drone bed + a sparse set of hits (V3: soft, clean; no paper foley). Nothing on the follow card
(≥ 4255). Frames = MASTER frames / 60. Run from the episode folder."""
import subprocess
FPS = 60
# name: (file, trim start, trim end, hit time inside the trimmed clip)
# earshot's free code-synthesized bank (archive-ignore/ext/earshot, `earshot sfx render <id> -o sfx/es_<name>.wav`):
# (file, trim start, trim end, hit time inside the trimmed clip = the sound's reported peak)
SFX = {'pop': ('sfx/es_pop1.wav', 0.0, 0.15, 0.004), 'blip': ('sfx/es_blip.wav', 0.0, 0.118, 0.017),
       'swish': ('sfx/es_swish.wav', 0.0, 0.88, 0.110), 'sub': ('sfx/es_sub.wav', 0.0, 0.286, 0.021),
       'fall': ('sfx/es_fall.wav', 0.0, 1.78, 0.152), 'rise': ('sfx/es_rise.wav', 0.0, 0.95, 0.697)}
EV = []
EV += [('pop', 129, 0.5)]                                            # "two businesses": two coins leave the tray
EV += [('blip', 508, 0.45)]                                          # "$1.4": the small pile
EV += [('rise', 735, 0.5)]                                           # "$13.9": the tower climbs (peak near its top)
EV += [('sub', 838, 0.55)]                                           # "for not cooking": the kitchen goes dark
EV += [('swish', 950, 0.55)]                                         # "go back to 1954": the fall through the void
EV += [('pop', 1509, 0.45)]                                          # "franchise it": the copies pop up
EV += [('rise', 2345, 0.5)]                                          # "own the ground": the stand lifts, the plot glows
EV += [('sub', 2794, 0.5)]                                           # "$2.7 million": bought out
EV += [('swish', 2860, 0.5)]                                         # the fall back to the present
EV += [('swish', 3210, 0.45)]                                        # the zoom out to the world
EV += [('blip', 3823, 0.45)]                                         # "$31 billion"
EV += [('sub', 4157, 0.5)]                                           # "landlord": the buildings sink
DUR = 4340 / FPS
ins = ['-i', 'audio/voice.wav', '-i', 'sfx/Free Drone Bed Sound Effects.mp3']
fl = ['[0]aresample=48000,aformat=channel_layouts=stereo,apad[v]',
      f'[1]atrim=0:{DUR},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=0.10,afade=t=in:d=0.6,afade=t=out:st={DUR - 1.5}:d=1.5[bed]']
lab = ['[v]', '[bed]']
for i, (n, fr, g) in enumerate(EV):
    assert fr < 4255, 'nothing on the follow card'
    f, a, b, hit = SFX[n]; ins += ['-i', f]; d = max(0, int(round((fr / FPS - hit) * 1000)))
    fl.append(f'[{i + 2}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b - a - 0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},volume=0.97,alimiter=limit=0.8:level=0[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
open('sfx/events.txt', 'w').write('\n'.join(f'{fr}\t{n}\t{g}' for n, fr, g in EV) + '\n')
print('mix ok', len(EV), 'hits')
