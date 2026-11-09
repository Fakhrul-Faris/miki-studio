#!/bin/zsh
# Final render of a raea episode, the safe and fast way (EX29–EX31 lessons):
#   - fresh 300-frame chunks (long single runs put the camera wrong on alternate frames past ~700 frames, drop black
#     frames, and on heavy scenes can push the GPU into an error state);
#   - a chunk that fails is retried after a pause, then split in halves (EX31: Metal "ignored submissions" mid-chunk);
#   - RESUME=1 keeps the frames already rendered (only missing frames are rendered again);
#   - every frame checked (tools/raea/frames_check.py: all-black frames, one-frame flicker);
#   - bad frames re-rendered in small fresh batches (each run of bad frames plus one neighbour each side, ≤ 8 frames a
#     batch: big batches drift like long runs; one 3-frame render per bad frame was ~2 min each) until clean (3 passes);
#   - the Mac kept awake for the whole run (caffeinate; EX31's render stopped for 6 h when it slept);
#   - then encoded with the episode's mixed audio.
# Usage: [RESUME=1] tools/raea/render_ep.sh EDIT.tsx FRAMES OUT.mp4 AUDIO.wav [cut frames…]
#   EDIT.tsx must contain `const F = useCurrentFrame(), T = F / FPS;` and `durationInFrames={FRAMES}` (the chunker shifts them).
set -e
caffeinate -dimsu -w $$ &                  # no sleep while this script runs
E=$1; N=$2; OUT=$3; AUD=$4; shift 4; CUTS=($@)
D=${E:h}; T=$D/media/_render; K=${0:A:h}; PY=(~/.local/bin/uv run -q --with pillow --with numpy python)
[ "$RESUME" = 1 ] || rm -rf $T
mkdir -p $T/frames

# render frames [s, s+n) into $T/frames; returns non-zero if raea failed
range() {
  local s=$1 n=$2
  sed -e "s/const F = useCurrentFrame(), T = F \/ FPS;/const F = useCurrentFrame() + $s, T = F \/ FPS;/" -e "s/durationInFrames={$N}/durationInFrames={$n}/" $E > $D/_chunk_$s.tsx
  rm -rf $T/c$s
  if ! raea render $D/_chunk_$s.tsx -o $T/c$s --quality high > $T/c$s.log 2>&1; then rm -f $D/_chunk_$s.tsx; return 1; fi
  local i=0; for f in $T/c$s/*.png; do mv $f $T/frames/frame-$(printf %05d $((s + i))).png; i=$((i + 1)); done
  rm -rf $T/c$s $D/_chunk_$s.tsx
}
have() { local s=$1 n=$2 i; for ((i = s; i < s + n; i++)); do [ -f $T/frames/frame-$(printf %05d $i).png ] || return 1; done; }
chunk() {                                   # retry twice, then split in halves (down to 50 frames)
  local s=$1 n=$2
  have $s $n && { echo "chunk $s: kept"; return 0; }
  for try in 1 2 3; do range $s $n && { echo "chunk $s ($n) done"; return 0; }; echo "chunk $s failed (try $try): $(grep -m1 REFUSED $T/c$s.log | cut -c1-120)"; sleep 20; done
  [ $n -le 50 ] && return 1
  local h=$(( n / 2 )); chunk $s $h && chunk $((s + h)) $((n - h))
}
for ((s = 0; s < N; s += 300)); do chunk $s $(( N - s < 300 ? N - s : 300 )); done

for pass in 1 2 3; do
  r=$($PY $K/frames_check.py $T/frames $CUTS); echo "pass $pass: $r" | tr '\n' ' '; echo
  bad=($(echo "$r" | sed -nE 's/^(BLACK|FLICKER) //p' | tr ',' ' ' | tr -d '-'))
  [ ${#bad} -eq 0 ] && break
  # batches: consecutive bad frames together, one neighbour each side, at most 8 frames per fresh render
  batch=()
  flush() {
    [ ${#batch} -eq 0 ] && return
    local lo=$(( batch[1] > 0 ? batch[1] - 1 : 0 )) hi=$(( batch[-1] + 1 < N ? batch[-1] + 1 : batch[-1] )) at="" i
    for ((i = lo; i <= hi; i++)); do at+="${at:+,}$i"; done
    rm -rf $T/fix; raea render $E -o $T/fix --at $at --quality high > /dev/null 2>&1
    for b in $batch; do cp $T/fix/frame-$(printf %05d $(( b - lo ))).png $T/frames/frame-$(printf %05d $b).png; done
    batch=()
  }
  for b in $bad; do
    if [ ${#batch} -gt 0 ] && { [ $b -ne $(( batch[-1] + 1 )) ] || [ ${#batch} -ge 6 ]; }; then flush; fi
    batch+=($b)
  done
  flush
done
ffmpeg -y -v error -framerate 30 -i $T/frames/frame-%05d.png -i $AUD -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -shortest $OUT
echo "wrote $OUT (frames kept in $T/frames until the next render)"
