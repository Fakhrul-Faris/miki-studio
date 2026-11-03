#!/usr/bin/env python3
"""EX19 mix: voice + a low drone bed + a sparse set of hits (V3: soft, clean; no paper foley). Nothing on the follow card
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
EV += [('swish', 156, 0.5)]                                          # up through the ring in the ceiling
EV += [('pop', 189, 0.5)]                                            # "7,000": the members pour out
EV += [('blip', 279, 0.45)]                                          # "400": the room fills
EV += [('swish', 363, 0.5)]                                          # down to the street
EV += [('sub', 516, 0.5)]                                            # "They don't show up": the street empties
EV += [('pop', 632, 0.45)]                                           # the card taps
EV += [('blip', 957, 0.45)]                                          # "$17 a visit"
EV += [('swish', 1098, 0.45)]                                        # up to the study field
EV += [('rise', 1331, 0.5)]                                          # "they're the business": the ghosts (peak on the word)
EV += [('pop', 1366, 0.45)]                                          # "They pay": the coins drop
EV += [('sub', 1758, 0.45)]                                          # "exactly as planned": lights dim
DUR = 1843 / FPS
ins = ['-i', 'audio/voice.wav', '-i', 'sfx/Free Drone Bed Sound Effects.mp3']
fl = ['[0]aresample=48000,aformat=channel_layouts=stereo,apad[v]',
      f'[1]atrim=0:{DUR},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=0.10,afade=t=in:d=0.6,afade=t=out:st={DUR - 1.5}:d=1.5[bed]']
lab = ['[v]', '[bed]']
for i, (n, fr, g) in enumerate(EV):
    assert fr < 1800, 'nothing on the follow card'
    f, a, b, hit = SFX[n]; ins += ['-i', f]; d = max(0, int(round((fr / FPS - hit) * 1000)))
    fl.append(f'[{i + 2}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b - a - 0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},volume=0.97,alimiter=limit=0.8:level=0[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
open('sfx/events.txt', 'w').write('\n'.join(f'{fr}\t{n}\t{g}' for n, fr, g in EV) + '\n')
print('mix ok', len(EV), 'hits')
