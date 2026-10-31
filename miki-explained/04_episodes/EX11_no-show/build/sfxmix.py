#!/usr/bin/env python3
"""EX11 mix: voice (×1.1, U4) + the music bed looped to length (Hip Hop Background V3, 100 BPM, 24 beats = 14.4 s; it starts
on a downbeat, so copy 2 sits at exactly 14.4 s) + five paper sounds on the slaps. E5: picture cuts every 2 beats (28.8 f).
Music fades under the follow card; nothing on the logo. Frames = MASTER frames / 24. Run from the episode folder."""
import subprocess
DUR, LOOP = 461 / 24, 14.4
SFX = {'stamp': ('sfx/Traditional Stamp Sound Effect.mp3', 0.45, 1.20, 0.10), 'pop': ('sfx/pop.wav', 0.0, 0.11, 0.0), 'tick': ('sfx/tick.wav', 0.0, 0.05, 0.0)}
EV = [('stamp', 4, 0.30), ('stamp', 62, 0.22), ('tick', 148, 0.35), ('pop', 187, 0.3), ('stamp', 380, 0.34)]
ins = ['-i', 'audio/voice.wav', '-i', 'sfx/music_src.mp3', '-i', 'sfx/music_src.mp3']
fl = ['[0]aresample=48000,aformat=channel_layouts=stereo,apad[v]',
      f'[1]aresample=48000,aformat=channel_layouts=stereo,atrim=0:{LOOP}[m1]',
      f'[2]aresample=48000,aformat=channel_layouts=stereo,adelay={int(LOOP * 1000)}|{int(LOOP * 1000)}[m2]',
      f'[m1][m2]amix=inputs=2:normalize=0,atrim=0:{DUR},volume=0.1,afade=t=out:st={17.2}:d=1.4[m]']
lab = ['[v]', '[m]']
for i, (n, fr, g) in enumerate(EV):
    f, a, b, hit = SFX[n]; ins += ['-i', f]; d = max(0, int(round((fr / 24 - hit) * 1000)))
    fl.append(f'[{i + 3}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b - a - 0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},alimiter=limit=0.95[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
print('mix ok')
