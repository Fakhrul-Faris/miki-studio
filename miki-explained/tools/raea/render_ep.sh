#!/bin/zsh
# Final render of a raea episode, the safe and fast way (EX29 lessons, 2026-11-09):
#   - fresh 300-frame chunks (long single runs put the camera wrong on alternate frames past ~700 frames, and drop black frames);
#   - every frame checked (tools/raea/frames_check.py: all-black frames, one-frame flicker);
#   - bad frames re-rendered alone (with their neighbours, keeping the middle one) until the check is clean (3 passes max);
#   - then encoded with the episode's mixed audio.
# Usage: tools/raea/render_ep.sh EDIT.tsx FRAMES OUT.mp4 AUDIO.wav [cut frames…]
#   EDIT.tsx must contain `const F = useCurrentFrame(), T = F / FPS;` and `durationInFrames={FRAMES}` (the chunker shifts them).
set -e
E=$1; N=$2; OUT=$3; AUD=$4; shift 4; CUTS=($@)
D=${E:h}; T=$D/media/_render; K=${0:A:h}; PY=(~/.local/bin/uv run -q --with pillow --with numpy python)
rm -rf $T; mkdir -p $T/frames
for ((s = 0; s < N; s += 300)); do
  n=$(( N - s < 300 ? N - s : 300 ))
  sed -e "s/const F = useCurrentFrame(), T = F \/ FPS;/const F = useCurrentFrame() + $s, T = F \/ FPS;/" -e "s/durationInFrames={$N}/durationInFrames={$n}/" $E > $D/_chunk.tsx
  raea render $D/_chunk.tsx -o $T/c$s --quality high > $T/c$s.log 2>&1
  i=0; for f in $T/c$s/*.png; do mv $f $T/frames/frame-$(printf %05d $((s + i))).png; i=$((i + 1)); done
  echo "chunk $s done"
done
rm -f $D/_chunk.tsx
for pass in 1 2 3; do
  r=$($PY $K/frames_check.py $T/frames $CUTS); echo "pass $pass: $r" | tr '\n' ' '; echo
  bad=($(echo "$r" | sed -nE 's/^(BLACK|FLICKER) //p' | tr ',' ' ' | tr -d '-'))
  [ ${#bad} -eq 0 ] && break
  for b in $bad; do   # alone, with neighbours: a fresh 3-frame render is reliable
    lo=$(( b > 0 ? b - 1 : 0 )); hi=$(( b + 1 < N ? b + 1 : b ))
    rm -rf $T/fix; raea render $E -o $T/fix --at $lo,$b,$hi --quality high > /dev/null 2>&1
    cp $T/fix/frame-$(printf %05d $(( b - lo ))).png $T/frames/frame-$(printf %05d $b).png
  done
done
ffmpeg -y -v error -framerate 30 -i $T/frames/frame-%05d.png -i $AUD -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -shortest $OUT
echo "wrote $OUT (frames kept in $T/frames until the next render)"
