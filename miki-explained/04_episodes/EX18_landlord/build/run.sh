#!/bin/zsh
# Headless build into EX18.ecproj. Usage: build/run.sh <script> [<script>…]  (each runs after lib.jsx)
set -e
EP=${0:A:h:h}; B=$EP/build; PROJ=$EP/EX18.ecproj
for s in "$@"; do
  data=(); [ $s = MASTER ] && data=($B/caps.jsx $B/anchors.jsx)
  cat $B/lib.jsx $data $B/$s.jsx > $B/_run.jsx
  if [ -f $PROJ ]; then src=(--project $PROJ); else src=(--empty); fi
  printf "%-8s " $s; effectcraft-cli script $B/_run.jsx $src --save-as $PROJ 2>&1 | tail -2 | tr '\n' ' '; echo
done
rm -f $B/_run.jsx
