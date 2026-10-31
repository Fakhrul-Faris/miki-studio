#!/bin/zsh
# Headless build into EX08.ecproj (never EX08.ecproj, the hand-edited copy).
# Usage: build/run.sh overlay 3B 3A 1A 1B 2A 2B 2D 2C 4A 4B 4C 4D 4E 4F 5A 6A 6B 6C MASTER
# Each script runs after lib.jsx; 4F also gets 4F_doors.jsx and MASTER gets subs.jsx (data files).
set -e
EP=${0:A:h:h}; B=$EP/build; PROJ=$EP/EX08.ecproj
for s in "$@"; do
  data=(); [ $s = MASTER ] && [ -f $B/subs.jsx ] && data=($B/subs.jsx)
  cat $B/lib.jsx $data $B/$s.jsx > $B/_run.jsx
  if [ -f $PROJ ]; then src=(--project $PROJ); else src=(--empty); fi
  printf "%-8s " $s; effectcraft-cli script $B/_run.jsx $src --save-as $PROJ 2>&1 | tail -2 | tr '\n' ' '; echo
done
rm -f $B/_run.jsx
