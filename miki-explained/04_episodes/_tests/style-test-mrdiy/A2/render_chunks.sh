#!/bin/zsh
# Renders video_a.tsx in fresh ~300-frame chunks (long single runs drifted the camera on alternate frames after ~690
# frames), checks each chunk, then assembles media/full_frames/frame-NNNNN.png in order.
set -e
N=1182; C=300; rm -rf media/chunks media/full_frames; mkdir -p media/chunks media/full_frames
for ((s = 0; s < N; s += C)); do
  n=$(( N - s < C ? N - s : C ))
  sed -e "s/const F = useCurrentFrame(), T = F \/ FPS;/const F = useCurrentFrame() + $s, T = F \/ FPS;/" -e "s/durationInFrames={$N}/durationInFrames={$n}/" video_a.tsx > chunk_$s.tsx
  raea render chunk_$s.tsx -o media/chunks/$s --quality high > /dev/null 2>&1
  echo "chunk $s: $(ls media/chunks/$s | wc -l | tr -d ' ') frames · $(~/.local/bin/uv run -q --with pillow --with numpy python frames_check.py media/chunks/$s | tr '\n' ' ')"
  i=0; for f in media/chunks/$s/*.png; do mv "$f" media/full_frames/frame-$(printf %05d $((s + i))).png; i=$((i + 1)); done
  rm chunk_$s.tsx
done
