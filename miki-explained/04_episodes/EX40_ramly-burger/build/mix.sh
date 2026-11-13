#!/bin/zsh
# EX40 mix (run from the episode folder): the voice + the Meikigo signature sound C under the logo (WORKING-RULES § 2) -> audio/mix.wav, -14 LUFS
set -e
D=$(python3 -c "import json;print(json.load(open('build/tl.json'))['dur'])")
AT=$(python3 -c "print(int(($D - 2.75) * 1000))")
ffmpeg -y -v error -i audio/vo.wav -i ../../02_kit/brand/sonic-logo/sig_C_boom_v2.wav -filter_complex \
 "[1]adelay=${AT}|${AT},volume=0.8[s];[0]aformat=channel_layouts=stereo[v];[v][s]amix=inputs=2:normalize=0:duration=longest,loudnorm=I=-14:TP=-1.5:LRA=9" -ar 48000 audio/mix.wav
echo "mix.wav: voice + sound C at ${AT} ms"
