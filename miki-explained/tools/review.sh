#!/bin/zsh
# Save, render and motion-check an episode.
# Usage: miki-explained/tools/review.sh <episode_dir> <COMPNAME> "start:len:label" ...
#   e.g. review.sh ep EX03 "4.1:0.9:handoff" "30.3:0.9:through"
# Writes export/<COMPNAME>.mp4 and review/motion.jpg (12 fps strips, one row per window). Review in motion, not stills.
set -e
EP=${1:A}; C=$2; shift 2; mkdir -p $EP/export $EP/review
effectcraft-cli exec file.saveAs --params "{\"path\":\"$EP/$C.ecproj\"}" --bridge 9877 >/dev/null
effectcraft-cli render --project $EP/$C.ecproj --comp $C --out $EP/export/$C.mp4 --format h264 --audio on | tail -1
rows=()
for spec in "$@"; do
  s=${spec%%:*}; r=${spec#*:}; l=${r%%:*}; n=${r#*:}
  ffmpeg -v error -y -ss $s -t $l -i $EP/export/$C.mp4 -vf "fps=12,scale=150:-2,pad=iw+2:ih+2:1:1:red,tile=12x1" -frames:v 1 $EP/review/m_$n.jpg
  rows+=(-i $EP/review/m_$n.jpg)
done
if [ ${#rows[@]} -gt 0 ]; then n=$(( ${#rows[@]} / 2 )); ffmpeg -v error -y "${rows[@]}" -filter_complex "vstack=inputs=$n" $EP/review/motion.jpg 2>/dev/null || cp $EP/review/m_$n.jpg $EP/review/motion.jpg; fi
ffmpeg -hide_banner -i $EP/export/$C.mp4 -af silencedetect=noise=-40dB:d=0.3 -f null - 2>&1 | grep silence_end | awk '{printf "%s ",$5} END{print "  ← speech starts (check against T)"}'
