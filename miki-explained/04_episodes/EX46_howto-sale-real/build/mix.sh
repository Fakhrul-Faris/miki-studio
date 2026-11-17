#!/bin/zsh
# EX46 mix (run from the episode folder) -> audio/mix.wav, -14 LUFS: voice (audio/vo.wav) + the EX45 music bed (low, ducked,
# fades before the logo) + 5 sparse hits on their impact words + the Meikigo signature sound C under the logo.
# Hits: stamp on "reka" (W23), shutter tick on "screenshot" (W47), tick on "naik" (W64), stamp on "murah" (W93), snap on "gambar" (W111).
set -e
L=../../06_sfx
eval $(python3 -c "
import json;j=json.load(open('build/tl.json'));c=j['caps'];W=lambda i:c[i]['t']
print(f'D={j[\"dur\"]} H1={W(23):.2f} H2={W(47)+0.05:.2f} H3={W(64):.2f} H4={W(93):.2f} H5={W(111)+0.05:.2f}')")
AT=$(python3 -c "print(int(($D - 2.75) * 1000))"); MO=$(python3 -c "print($D - 3.6)")
ms() { python3 -c "print(int($1*1000))"; }
ST="$L/library/Traditional Stamp Sound Effect.mp3"
ffmpeg -y -v error -i audio/vo.wav -stream_loop -1 -i "$L/library/Hip Hop Chill Beat.mp3" -i ../../02_kit/brand/sonic-logo/sig_C_boom_v2.wav \
 -i "$ST" -i $L/library/tick.wav -i $L/synth/tick.wav -i "$ST" -i $L/library/pop.wav -filter_complex \
 "[0]aformat=channel_layouts=stereo,asplit=2[v][sc];\
  [1]atrim=0:$D,aformat=channel_layouts=stereo,volume=0.055,afade=t=in:st=0:d=0.6,afade=t=out:st=$MO:d=1.2[m0];\
  [m0][sc]sidechaincompress=threshold=0.03:ratio=4:attack=20:release=300[m];\
  [2]adelay=${AT}|${AT},volume=0.8[s];\
  [3]atrim=0:0.8,adelay=$(ms $H1)|$(ms $H1),volume=0.35[h1];[4]adelay=$(ms $H2)|$(ms $H2),volume=0.3[h2];[5]adelay=$(ms $H3)|$(ms $H3),volume=0.25[h3];\
  [6]atrim=0:0.8,adelay=$(ms $H4)|$(ms $H4),volume=0.4[h4];[7]adelay=$(ms $H5)|$(ms $H5),volume=0.3[h5];\
  [v][m][s][h1][h2][h3][h4][h5]amix=inputs=8:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=9" -ar 48000 audio/mix.wav
echo "mix.wav: voice + music (ducked) + 5 hits + sound C at ${AT} ms"
