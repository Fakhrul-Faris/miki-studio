#!/usr/bin/env bash
# Download one short into raw/ as vid_NNN.mp4
#
# Usage:
#   ./download_clip.sh <url> <vid_id>
# Example:
#   ./download_clip.sh 'https://www.youtube.com/shorts/XXXX' vid_002

set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
URL="${1:-}"
VID_ID="${2:-}"

if [[ -z "$URL" || -z "$VID_ID" ]]; then
  echo "Usage: $0 <url> <vid_id>" >&2
  echo "Example: $0 'https://www.youtube.com/shorts/XXXX' vid_002" >&2
  exit 1
fi

YT_DLP="$ROOT/.venv/bin/yt-dlp"
if [[ ! -x "$YT_DLP" ]]; then
  if command -v yt-dlp >/dev/null 2>&1; then
    YT_DLP="yt-dlp"
  else
    echo "yt-dlp not found. Create the venv first:" >&2
    echo "  python3.12 -m venv .venv && .venv/bin/pip install 'yt-dlp[default]' curl_cffi faster-whisper" >&2
    exit 1
  fi
fi

OUT_DIR="$ROOT/raw"
mkdir -p "$OUT_DIR"
OUT="$OUT_DIR/${VID_ID}.mp4"

# Drop playlist params — we only want the single video.
URL="${URL%%&list=*}"
URL="${URL%%&index=*}"
URL="${URL%%&start_radio=*}"

is_youtube=0
if [[ "$URL" == *youtube.com* || "$URL" == *youtu.be* ]]; then
  is_youtube=1
fi

download_youtube() {
  echo "YouTube: player_client=android,tv,web …" >&2
  "$YT_DLP" \
    -f "bv*+ba/b" \
    --merge-output-format mp4 \
    --extractor-args "youtube:player_client=android,tv,web" \
    -o "$OUT" \
    --no-playlist \
    "$URL"
}

# TikTok intermittently serves a challenge page. Rotate browser fingerprints.
TARGETS=(
  "safari-18.0:macos-15"
  "chrome-136:macos-15"
  "chrome-131:macos-14"
  "chrome-131:android-14"
)

download_impersonate() {
  local target="$1"
  echo "Trying impersonate=$target …" >&2
  "$YT_DLP" \
    --impersonate "$target" \
    -f "bv*+ba/b" \
    --merge-output-format mp4 \
    -o "$OUT" \
    --no-playlist \
    "$URL"
}

finish_ok() {
  echo "Downloaded → $OUT"
  echo "Next: add an entry in clips_catalog.md, then run:"
  echo "  .venv/bin/python transcribe_batch.py $VID_ID"
  exit 0
}

if [[ "$is_youtube" -eq 1 ]]; then
  if download_youtube; then
    finish_ok
  fi
  echo "YouTube primary clients failed — retrying with fingerprints…" >&2
fi

for i in "${!TARGETS[@]}"; do
  target="${TARGETS[$i]}"
  if download_impersonate "$target"; then
    finish_ok
  fi
  if [[ "$i" -lt $((${#TARGETS[@]} - 1)) ]]; then
    echo "Blocked — trying next fingerprint in 1s…" >&2
    sleep 1
  fi
done

echo "Failed after all strategies. Save the file manually into $OUT" >&2
exit 1
