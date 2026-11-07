#!/usr/bin/env python3
"""EX23 mix: the voice + a low drone bed + the synthesized hits (build/cues.py → sfx/hits.wav). Nothing on the follow
card. 30 fps, 1,927 frames. Run from the episode folder."""
import subprocess
DUR = 1927 / 30
ins = ['-i', 'audio/voice.wav', '-i', 'sfx/Free Drone Bed Sound Effects.mp3', '-i', 'sfx/hits.wav']
fl = ['[0]aresample=48000,aformat=channel_layouts=stereo,apad[v]',
      f'[1]atrim=0:{DUR},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=0.10,afade=t=in:d=0.6,afade=t=out:st={DUR - 1.5}:d=1.5[bed]',
      '[2]aresample=48000,aformat=channel_layouts=stereo,volume=1.6[h]',
      f'[v][bed][h]amix=inputs=3:normalize=0:duration=longest,atrim=0:{DUR},volume=0.97,alimiter=limit=0.8:level=0[out]']
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[out]', 'sfx/mix.wav'], check=True)
print('mix ok')
