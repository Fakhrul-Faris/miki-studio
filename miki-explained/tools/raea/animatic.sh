#!/bin/zsh
# Motion review animatic (RECIPE-D § 8.1): the real film file — same cameras, animation, captions and timing — rendered at
# 15 fps in draft quality, with a yellow tag "S<setup> · <time>" bottom-right so notes can name a setup and a second.
# About 3.5 min for 41 s (the full preview is ~5 min at 30 fps); a 6 s stretch (FROM TO) takes ~30 s. Output is scaled to 540×960 for the phone.
# Usage (from the episode's build/):  ../../../tools/raea/animatic.sh film39.tsx ../audio/mix.wav ../out/animatic.mp4 [FPS] [FROM TO]
# FROM TO (seconds) renders only that stretch, e.g. 12 18 after fixing setups 8–10: ~30–40 s instead of ~3.5 min for 41 s.
# The film file must declare `RFPS = 30, HUD = false` (EX39 film39.part.tsx shows the HUD line) and `OFF = 0,`.
set -e
F=$1; A=$2; O=$3; FPS=${4:-15}; FROM=${5:-0}; TO=${6:-}
[ -f "$F" ] && [ -f "$A" ] || { echo "usage: animatic.sh FILM.tsx AUDIO.wav OUT.mp4 [FPS]"; exit 1; }
grep -q "RFPS = 30, HUD = false" "$F" || { echo "$F needs 'RFPS = 30, HUD = false' (see EX39 film39.part.tsx)"; exit 1; }
caffeinate -dimsu -w $$ &
D=$(python3 -c "import json;print(json.load(open('tl.json'))['dur'])"); TO=${TO:-$D}; S0=$(python3 -c "print(round($FROM*$FPS))"); N=$(python3 -c "print(round(($TO-$FROM)*$FPS))"); T=media/_anim
rm -rf $T; mkdir -p $T/frames "$(dirname $O)"
sed -e "s/RFPS = 30, HUD = false/RFPS = $FPS, HUD = true/" "$F" > _anim_full.tsx
for ((s = 0; s < N; s += 300)); do
  n=$(( N - s < 300 ? N - s : 300 ))
  sed -e "s/OFF = 0,/OFF = $((S0 + s)),/" -e "s/durationInFrames={FRAMES}/durationInFrames={$n}/" _anim_full.tsx > _anim_$s.tsx
  for try in 1 2; do rm -rf $T/c$s; raea render _anim_$s.tsx --composition film --quality draft -o $T/c$s > $T/c$s.log 2>&1 && break; sleep 5; done
  i=0; for f in $T/c$s/*.png; do mv $f $T/frames/frame-$(printf %05d $((s + i))).png; i=$((i + 1)); done
  rm -rf $T/c$s _anim_$s.tsx; echo "animatic: frames $s–$((s + n - 1)) of $N ($(date +%H:%M:%S))"
done
ffmpeg -y -v error -framerate $FPS -i $T/frames/frame-%05d.png -ss $FROM -i "$A" -vf scale=540:960 -c:v libx264 -pix_fmt yuv420p -crf 22 -c:a aac -b:a 128k -shortest "$O"
grep -h "clipping:" $T/*.log 2>/dev/null | sort -u | head -5 || true
rm -rf $T _anim_full.tsx; echo "wrote $O"
