#!/bin/zsh
# Split a 3×3 storyboard grid into 9 panels: sb_01.png … sb_09.png (left→right, top→bottom),
# written next to the grid. Optional INSET trims that many px from every panel edge to drop gutters.
# Usage: tools/split_grid.sh path/to/storyboard.png [INSET]
set -e
grid=$1; inset=${2:-8}
[[ -f $grid ]] || { echo "usage: $0 storyboard.png [inset_px]"; exit 1; }
out=${grid:h}
W=$(sips -g pixelWidth  "$grid" | awk '/pixelWidth/{print $2}')
H=$(sips -g pixelHeight "$grid" | awk '/pixelHeight/{print $2}')
cw=$((W/3)); ch=$((H/3)); n=1
for r in 0 1 2; do
  for c in 0 1 2; do
    f=$out/sb_$(printf %02d $n).png
    sips -c $((ch-2*inset)) $((cw-2*inset)) --cropOffset $((r*ch+inset)) $((c*cw+inset)) "$grid" --out "$f" >/dev/null
    echo "$f"; n=$((n+1))
  done
done
