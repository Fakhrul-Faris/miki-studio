#!/bin/zsh
# EX38 preview v2: 1080x1920 at 30 fps in fresh 300-frame chunks, joined with the scratch voice (audio/vo.wav) and as a silent copy.
# Usage (from build/): ./preview2.sh      RESUME=1 keeps finished chunks
set -e
caffeinate -dimsu -w $$ &
cat kit.part.tsx film2.part.tsx > film2.tsx
N=$(python3 -c "import json;print(round(json.load(open('tl.json'))['dur']*30))"); T=media/_pv2
[ "$RESUME" = 1 ] || rm -rf $T; mkdir -p $T/frames ../out
for ((s = 0; s < N; s += 300)); do
  n=$(( N - s < 300 ? N - s : 300 ))
  [ -f $T/frames/frame-$(printf %05d $((s + n - 1))).png ] && continue
  sed -e "s/OFF = 0;/OFF = $s;/" -e "s/durationInFrames={FRAMES}/durationInFrames={$n}/" film2.tsx > _chunk_$s.tsx
  rm -rf $T/c$s
  for try in 1 2 3; do raea render _chunk_$s.tsx --composition film -o $T/c$s > $T/c$s.log 2>&1 && break; sleep 10; done
  i=0; for f in $T/c$s/*.png; do mv $f $T/frames/frame-$(printf %05d $((s + i))).png; i=$((i + 1)); done
  rm -rf $T/c$s _chunk_$s.tsx; echo "chunk $s done ($(date +%H:%M:%S))"
done
ffmpeg -y -v error -framerate 30 -i $T/frames/frame-%05d.png -i ../audio/vo.wav -c:v libx264 -pix_fmt yuv420p -crf 18 -c:a aac -b:a 192k -shortest ../out/preview_v2.mp4
ffmpeg -y -v error -i ../out/preview_v2.mp4 -an -c:v copy ../out/preview_v2_silent.mp4 && echo "wrote ../out/preview_v2.mp4 (+ _silent)"
