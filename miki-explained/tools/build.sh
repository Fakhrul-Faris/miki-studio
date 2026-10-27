#!/bin/zsh
# Run an episode's beat scripts into the live EffectCraft window, in order.
# Usage: miki-explained/tools/build.sh <episode_dir> A B C D E F G finish
# Each beat runs as: config.jsx + core.jsx + blocks.jsx + times.jsx + captions.jsx + <beat>.jsx
# (live scripts can't #include, so they are concatenated). Beat A must start with clearComp().
# Needs the app open with the control channel: /Applications/EffectCraft.app/Contents/MacOS/EffectCraft --control 9877
set -e
EP=${1:A}; shift; TOOLS=${0:A:h}/ec; B=$EP/build
for beat in "$@"; do
  cat $B/config.jsx $TOOLS/core.jsx $TOOLS/blocks.jsx $B/times.jsx $([ -f $B/captions.jsx ] && echo $B/captions.jsx) $B/$beat.jsx > $B/_run.jsx
  printf "%-8s " $beat; effectcraft-cli script $B/_run.jsx --bridge 9877 2>&1 | tail -1
done
