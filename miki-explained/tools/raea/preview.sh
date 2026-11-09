#!/bin/zsh
# Cheap look check before any full render: chosen frames at 540x960 in one batch → one contact sheet.
# Usage: tools/raea/preview.sh EDIT.tsx 30,120,300,… OUT.jpg   (≤ 30 frames per call; ~10 s a frame)
set -e
E=$1; AT=$2; OUT=$3; T=${E:h}/media/_preview
rm -rf $T; raea render $E -o $T --at $AT --w 540 --h 960 > $T.log 2>&1 || { tail -3 $T.log; exit 1; }
n=$(ls $T | wc -l | tr -d ' '); cols=$(( n < 8 ? n : 8 ))
ffmpeg -y -v error -i $T/frame-%05d.png -vf "scale=270:-1,tile=${cols}x$(( (n + cols - 1) / cols ))" $OUT && echo "wrote $OUT ($n frames)"
