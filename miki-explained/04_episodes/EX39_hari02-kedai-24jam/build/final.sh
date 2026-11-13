#!/bin/zsh
# EX38 final: 1080x1920 at 60 fps in fresh 300-frame chunks. Each chunk is checked (black frames, flicker), encoded and its
# PNGs deleted at once (the disk is small), then the parts are joined with audio/mix.wav.
# Usage (from build/): ./final.sh      RESUME=1 keeps finished parts
set -e
caffeinate -dimsu -w $$ &
cat kit.part.tsx film2.part.tsx | sed 's/RFPS = 30;/RFPS = 60;/' > film2_60.tsx
N=$(python3 -c "import json;print(round(json.load(open('tl.json'))['dur']*60))"); T=media/_render
[ "$RESUME" = 1 ] || rm -rf $T; mkdir -p $T ../export; : > $T/list.txt
for ((s = 0; s < N; s += 300)); do
  n=$(( N - s < 300 ? N - s : 300 )); P=$T/part_$(printf %05d $s).mp4; echo "file '${P:t}'" >> $T/list.txt
  [ -f $P ] && continue
  sed -e "s/OFF = 0,/OFF = $s,/" -e "s/durationInFrames={FRAMES}/durationInFrames={$n}/" film2_60.tsx > _chunk_$s.tsx
  for try in 1 2 3; do rm -rf $T/c$s; raea render _chunk_$s.tsx --composition film --quality high -o $T/c$s > $T/c$s.log 2>&1 && [ $(ls $T/c$s | wc -l) -eq $n ] && break; sleep 15; done
  [ $(ls $T/c$s | wc -l) -eq $n ] || { echo "chunk $s failed"; exit 1; }
  echo "chunk $s: $(~/.local/bin/uv run -q --offline --with pillow --with numpy python ../../../tools/raea/frames_check.py $T/c$s | tr '\n' ' ') ($(date +%H:%M:%S))"
  ffmpeg -y -v error -framerate 60 -i $T/c$s/frame-%05d.png -c:v libx264 -crf 15 -preset slow -pix_fmt yuv420p $P.tmp.mp4 && mv $P.tmp.mp4 $P
  rm -rf $T/c$s _chunk_$s.tsx
done
ffmpeg -y -v error -f concat -safe 0 -i $T/list.txt -i ../audio/mix.wav -c:v copy -c:a aac -b:a 192k -shortest ../export/EX38-Final.mp4 && echo "wrote ../export/EX38-Final.mp4"
