#!/bin/zsh
# EX38 preview: 540x960 at 60 fps in fresh 300-frame chunks (long single runs drift), joined with audio/vo.wav.
# Usage (from build/): ./preview_video.sh [OUT.mp4]     RESUME=1 keeps finished chunks
set -e
caffeinate -dimsu -w $$ &
N=3568; T=media/_pv; OUT=${1:-../out/preview.mp4}
[ "$RESUME" = 1 ] || rm -rf $T; mkdir -p $T/frames ${OUT:h}
for ((s = 0; s < N; s += 300)); do
  n=$(( N - s < 300 ? N - s : 300 ))
  [ -f $T/frames/frame-$(printf %05d $((s + n - 1))).png ] && continue
  sed -e "s/const F = useCurrentFrame(), T = F \/ FPS;/const F = useCurrentFrame() + $s, T = F \/ FPS;/" -e "s/durationInFrames={$N}/durationInFrames={$n}/" film.tsx > _chunk_$s.tsx
  rm -rf $T/c$s
  for try in 1 2 3; do raea render _chunk_$s.tsx -o $T/c$s --w 540 --h 960 > $T/c$s.log 2>&1 && break; sleep 15; done
  i=0; for f in $T/c$s/*.png; do mv $f $T/frames/frame-$(printf %05d $((s + i))).png; i=$((i + 1)); done
  rm -rf $T/c$s _chunk_$s.tsx; echo "chunk $s done ($(date +%H:%M:%S))"
done
ffmpeg -y -v error -framerate 60 -i $T/frames/frame-%05d.png -i ../audio/vo.wav -c:v libx264 -pix_fmt yuv420p -crf 18 -c:a aac -b:a 192k -shortest $OUT && echo "wrote $OUT"
