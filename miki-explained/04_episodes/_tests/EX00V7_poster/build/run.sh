#!/bin/zsh
# Headless build into EX00V7.ecproj.
# Usage: build/run.sh overlay MASTER
# Each script runs after lib.jsx; 4F also gets 4F_doors.jsx and MASTER gets subs.jsx (data files).
set -e
EP=${0:A:h:h}; B=$EP/build; PROJ=$EP/EX00V7.ecproj
for s in "$@"; do
  data=()
  cat $B/lib.jsx $data $B/$s.jsx > $B/_run.jsx
  if [ -f $PROJ ]; then src=(--project $PROJ); else src=(--empty); fi
  printf "%-8s " $s; effectcraft-cli script $B/_run.jsx $src --save-as $PROJ 2>&1 | tail -2 | tr '\n' ' '; echo
done
rm -f $B/_run.jsx
