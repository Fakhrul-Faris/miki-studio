#!/usr/bin/env python3
"""Transcribe raw clips with faster-whisper → transcripts/vid_NNN.txt

Usage:
  .venv/bin/python transcribe_batch.py              # all raw/vid_*.mp4 missing transcripts
  .venv/bin/python transcribe_batch.py vid_002      # one id
  .venv/bin/python transcribe_batch.py --force      # overwrite existing
  .venv/bin/python transcribe_batch.py --model small
  .venv/bin/python transcribe_batch.py vid_023 --force --model small --no-vad

Models (bigger = better, slower): tiny, base, small, medium, large-v3
Default: base (good for shorts on CPU/Apple Silicon).
Use --no-vad if transcripts are cut short (VAD sometimes drops quiet dialogue).
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
RAW = ROOT / "raw"
TRANSCRIPTS = ROOT / "transcripts"
VIDEO_EXTS = {".mp4", ".mov", ".webm", ".mkv", ".m4v"}


def list_raw_ids() -> list[str]:
    ids = []
    for p in sorted(RAW.iterdir()):
        if p.suffix.lower() in VIDEO_EXTS and p.stem.startswith("vid_"):
            ids.append(p.stem)
    return ids


def find_video(vid_id: str) -> Path | None:
    for ext in VIDEO_EXTS:
        candidate = RAW / f"{vid_id}{ext}"
        if candidate.is_file():
            return candidate
    return None


def format_ts(seconds: float) -> str:
    m, s = divmod(seconds, 60)
    h, m = divmod(int(m), 60)
    if h:
        return f"{h:02d}:{m:02d}:{s:06.3f}"
    return f"{m:02d}:{s:06.3f}"


def transcribe_one(
    model,
    video: Path,
    out: Path,
    *,
    vad_filter: bool,
    language: str | None,
) -> None:
    segments, info = model.transcribe(
        str(video),
        beam_size=5,
        vad_filter=vad_filter,
        language=language,
        condition_on_previous_text=False,
    )
    lines = [
        f"# {video.stem}",
        f"# language={info.language}  probability={info.language_probability:.2f}",
        f"# model_notes=vad={vad_filter}",
        "",
    ]
    plain = []
    for seg in segments:
        start = format_ts(seg.start)
        end = format_ts(seg.end)
        text = seg.text.strip()
        if not text:
            continue
        lines.append(f"[{start} --> {end}] {text}")
        plain.append(text)
    lines.append("")
    lines.append("## Plain")
    lines.append(" ".join(plain).strip())
    lines.append("")
    out.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Batch-transcribe comedy-autopsy raw clips.")
    parser.add_argument("vid_ids", nargs="*", help="Optional vid_NNN ids (default: all in raw/)")
    parser.add_argument("--force", action="store_true", help="Overwrite existing transcripts")
    parser.add_argument(
        "--model",
        default="base",
        help="Whisper model size (default: base)",
    )
    parser.add_argument(
        "--no-vad",
        action="store_true",
        help="Disable VAD filter (use when transcripts cut off early)",
    )
    parser.add_argument(
        "--language",
        default=None,
        help="Force language code (e.g. en). Default: auto-detect",
    )
    args = parser.parse_args()

    try:
        from faster_whisper import WhisperModel
    except ImportError:
        print(
            "faster-whisper not installed. Run:\n"
            "  python3.12 -m venv .venv && .venv/bin/pip install faster-whisper yt-dlp",
            file=sys.stderr,
        )
        return 1

    ids = args.vid_ids or list_raw_ids()
    if not ids:
        print(f"No videos found in {RAW}")
        return 1

    TRANSCRIPTS.mkdir(parents=True, exist_ok=True)

    vad = not args.no_vad
    print(f"Loading model={args.model} vad={vad} (first run downloads weights)…")
    # int8 is fast on CPU / Apple Silicon via CTranslate2
    model = WhisperModel(args.model, device="cpu", compute_type="int8")

    for vid_id in ids:
        video = find_video(vid_id)
        if video is None:
            print(f"skip  {vid_id} (no file in raw/)")
            continue
        out = TRANSCRIPTS / f"{vid_id}.txt"
        if out.exists() and not args.force:
            print(f"skip  {out.name} (exists; use --force)")
            continue
        print(f"transcribe {video.name} → {out.name}")
        transcribe_one(
            model,
            video,
            out,
            vad_filter=vad,
            language=args.language,
        )
        print(f"wrote {out}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
