#!/bin/zsh
# EX45 mix v3 (run from the episode folder) -> audio/mix.wav, -14 LUFS:
#  voice (audio/vo.wav, voice A ×1.25) + background music (user 16 Nov: "add background music": 06_sfx/library "Hip Hop Chill Beat",
#  low, ducked under the voice, fades out before the logo) + 5 sparse hits on their impact frames (stamp lands W33+0.12; standee landing from the physics bake) + the Meikigo signature sound C under the logo.
set -e
L=../../06_sfx
eval $(python3 -c "
import json;j=json.load(open('build/tl.json'));c=j['caps'];W=lambda i:c[i]['t'];d=json.load(open('build/media/phys45.json'));fr=d['bodies']['sd']['frames'];r=d['bodies']['sd']['release']-d['f0'];LAND=(d['f0']+next(i for i in range(r,len(fr)) if fr[i][1]-d['top']<0.008))/30
print(f'D={j[\"dur\"]} H1={W(33)+0.12:.2f} H2={W(49):.2f} H3={W(96)-0.09:.2f} H4={LAND:.3f} H5={W(117):.2f}')")
AT=$(python3 -c "print(int(($D - 2.75) * 1000))"); MO=$(python3 -c "print($D - 3.6)")
ms() { python3 -c "print(int($1*1000))"; }
ffmpeg -y -v error -i audio/vo.wav -stream_loop -1 -i "$L/library/Hip Hop Chill Beat.mp3" -i ../../02_kit/brand/sonic-logo/sig_C_boom_v2.wav \
 -i $L/synth/pop_big.wav -i $L/synth/swipe.wav -i $L/library/ding.wav -i $L/library/tick.wav -i $L/library/pop.wav -filter_complex \
 "[0]aformat=channel_layouts=stereo,asplit=2[v][sc];\
  [1]atrim=0:$D,aformat=channel_layouts=stereo,volume=0.055,afade=t=in:st=0:d=0.6,afade=t=out:st=$MO:d=1.2[m0];\
  [m0][sc]sidechaincompress=threshold=0.03:ratio=4:attack=20:release=300[m];\
  [2]adelay=${AT}|${AT},volume=0.8[s];\
  [3]adelay=$(ms $H1)|$(ms $H1),volume=0.35[h1];[4]adelay=$(ms $H2)|$(ms $H2),volume=0.25[h2];[5]adelay=$(ms $H3)|$(ms $H3),volume=0.28[h3];\
  [6]adelay=$(ms $H4)|$(ms $H4),volume=0.4[h4];[7]adelay=$(ms $H5)|$(ms $H5),volume=0.35[h5];\
  [v][m][s][h1][h2][h3][h4][h5]amix=inputs=8:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=9" -ar 48000 audio/mix.wav
echo "mix.wav: voice + music (ducked) + 5 hits + sound C at ${AT} ms"
