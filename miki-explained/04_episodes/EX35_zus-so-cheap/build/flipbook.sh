#!/bin/zsh
# Cheap moving preview: every 3rd frame at 540×960 in batches of 30, played at 10 fps with the mix → out/preview.mp4
set -e
caffeinate -dimsu -w $$ &
cd ${0:A:h}/..
O=build/media/_flip; rm -rf $O; mkdir -p $O
all=($(seq 0 3 1073)); n=${#all}; i=1
while [ $i -le $n ]; do
  at=$(echo ${all[$i,$((i+29))]} | tr ' ' ','); rm -rf build/media/_fb
  raea render build/ex35.tsx -o build/media/_fb --at $at --w 540 --h 960 > build/media/_fb.log 2>&1
  grep "clipping" build/media/_fb.log >> build/media/_flip_clip.log || true
  j=$i; for f in build/media/_fb/*.png; do cp $f $O/f$(printf %04d $j).png; j=$((j+1)); done
  echo "batch $i/$n"; i=$((i+30))
done
ffmpeg -y -v error -framerate 10 -i $O/f%04d.png -i build/mix.wav -c:v libx264 -crf 22 -pix_fmt yuv420p -c:a aac -shortest out/preview.mp4
echo "wrote out/preview.mp4"
