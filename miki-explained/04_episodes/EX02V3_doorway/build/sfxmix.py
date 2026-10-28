#!/usr/bin/env python3
"""Rebuild sfx/mix.wav = audio/voice.wav + drone bed + the 10 SFX hits (sources in sfx/source/).
Hit times are MASTER frames / 24. Run from the episode folder: python3 build/sfxmix.py"""
import subprocess
SRC = 'sfx/source/'
S = {'stamp': ('Traditional Stamp Sound Effect.mp3', 0.45, 1.20, 0.10), 'snip': ('Scissor Snip Sound Effect.mp3', 0.0, 0.50, 0.15),
     'rip': ('Rip Sound Effect.mp3', 0.35, 1.40, 0.25), 'click': ('Voltage Stabilizer Power On Sequence.mp3', 3.30, 3.75, 0.10),
     'beep': ('Free Scanner Sound Effects.mp3', 1.10, 1.75, 0.30), 'swell': ('Low End Reverse Whoosh Sound.mp3', 0.50, 2.42, 1.90)}
EV = [('stamp', 221, 0.38), ('snip', 327, 0.6), ('rip', 397, 0.4), ('click', 451, 0.6), ('click', 498, 0.6), ('click', 532, 0.6),
      ('beep', 597, 0.3), ('rip', 713, 0.26), ('swell', 934, 0.2), ('click', 1014, 0.65)]   # (sound, frame, gain)
DUR = 1048 / 24
ins = ['-i', 'audio/voice.wav', '-i', SRC + 'Free Drone Bed Sound Effects.mp3']
fl = ['[0]aresample=48000,aformat=channel_layouts=stereo[v]',
      f'[1]atrim=0:{DUR},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=0.16,afade=t=in:d=1.5,afade=t=out:st={DUR-2.5}:d=2.5[bed]']
lab = ['[v]', '[bed]']
for i, (n, fr, g) in enumerate(EV):
    f, a, b, hit = S[n]; ins += ['-i', SRC + f]; d = int(round((fr / 24 - hit) * 1000))
    fl.append(f'[{i+2}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b-a-0.04}:d=0.04,aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={d}|{d}[e{i}]')
    lab.append(f'[e{i}]')
fl.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0:duration=longest,atrim=0:{DUR},alimiter=limit=0.95[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
