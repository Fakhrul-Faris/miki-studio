#!/usr/bin/env bash
# Extract six comedy-beat frames from a video into frames/vid_NNN/
#
# Usage:
#   ./extract_frames.sh <video_path> <vid_id> [hook setup turn punchline reaction end]
#
# Timestamps are seconds (decimals allowed). Defaults: even-ish sample across the clip.
# Example:
#   ./extract_frames.sh raw/clip.mp4 vid_001 0.5 2.0 4.5 6.0 7.2 8.0

set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
VIDEO="${1:-}"
VID_ID="${2:-}"

if [[ -z "$VIDEO" || -z "$VID_ID" ]]; then
  echo "Usage: $0 <video_path> <vid_id> [hook setup turn punchline reaction end]" >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install it first (e.g. brew install ffmpeg)." >&2
  exit 1
fi

if [[ ! -f "$VIDEO" ]]; then
  echo "Video not found: $VIDEO" >&2
  exit 1
fi

OUT_DIR="$ROOT/frames/$VID_ID"
mkdir -p "$OUT_DIR"

NAMES=(hook setup turn punchline reaction end)

# Default timestamps: 5%, 20%, 40%, 60%, 80%, 95% of duration
DURATION="$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$VIDEO")"
DEFAULTS=(
  "$(awk -v d="$DURATION" 'BEGIN{printf "%.3f", d*0.05}')"
  "$(awk -v d="$DURATION" 'BEGIN{printf "%.3f", d*0.20}')"
  "$(awk -v d="$DURATION" 'BEGIN{printf "%.3f", d*0.40}')"
  "$(awk -v d="$DURATION" 'BEGIN{printf "%.3f", d*0.60}')"
  "$(awk -v d="$DURATION" 'BEGIN{printf "%.3f", d*0.80}')"
  "$(awk -v d="$DURATION" 'BEGIN{printf "%.3f", d*0.95}')"
)

for i in 0 1 2 3 4 5; do
  arg_index=$((i + 3))
  ts="${!arg_index:-${DEFAULTS[$i]}}"
  num=$(printf "%03d" $((i + 1)))
  name="${NAMES[$i]}"
  out="$OUT_DIR/${num}_${name}.jpg"
  ffmpeg -y -ss "$ts" -i "$VIDEO" -frames:v 1 -q:v 2 "$out" </dev/null
  echo "Wrote $out @ ${ts}s"
done

echo "Done → $OUT_DIR"
