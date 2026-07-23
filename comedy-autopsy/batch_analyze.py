#!/usr/bin/env python3
"""Optional batch runner for comedy autopsies.

Scans transcripts/, pairs each with frames/vid_NNN/, and writes a stub
autopsy markdown under autopsies/ if one does not already exist.

This does not call an LLM — use Cursor (guided by .cursorrules) for real
analysis. Useful to scaffold files for a batch of videos.

Usage:
  python3 batch_analyze.py
  python3 batch_analyze.py --force   # overwrite existing autopsy stubs
"""

from __future__ import annotations

import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TRANSCRIPTS = ROOT / "transcripts"
FRAMES = ROOT / "frames"
AUTOPSIES = ROOT / "autopsies"

BEAT_FILES = [
    "001_hook.jpg",
    "002_setup.jpg",
    "003_turn.jpg",
    "004_punchline.jpg",
    "005_reaction.jpg",
    "006_end.jpg",
]

STUB = """# {vid_id} — Autopsy

## Premise
_TODO_

## Hook
_TODO_ (frame: `frames/{vid_id}/001_hook.jpg`)

## Setup
_TODO_ (frame: `frames/{vid_id}/002_setup.jpg`)

## Turn
_TODO_ (frame: `frames/{vid_id}/003_turn.jpg`)

## Punchline
_TODO_ (frame: `frames/{vid_id}/004_punchline.jpg`)

## Reaction / Button
_TODO_ (frame: `frames/{vid_id}/005_reaction.jpg`)

## Why it works (or doesn't)
_TODO_

## Remake notes
_TODO_

## Sources
- Transcript: `transcripts/{vid_id}.txt`
- Frames present: {frames_note}
"""


def list_vid_ids() -> list[str]:
    ids = sorted(p.stem for p in TRANSCRIPTS.glob("vid_*.txt"))
    return ids


def frames_note(vid_id: str) -> str:
    folder = FRAMES / vid_id
    if not folder.is_dir():
        return "none (folder missing)"
    present = [name for name in BEAT_FILES if (folder / name).exists()]
    if not present:
        return "folder exists, no beat jpgs yet"
    return ", ".join(present)


def write_stub(vid_id: str, force: bool) -> str:
    AUTOPSIES.mkdir(parents=True, exist_ok=True)
    out = AUTOPSIES / f"{vid_id}_autopsy.md"
    if out.exists() and not force:
        return f"skip  {out.name} (exists)"
    out.write_text(
        STUB.format(vid_id=vid_id, frames_note=frames_note(vid_id)),
        encoding="utf-8",
    )
    return f"write {out.name}"


def main() -> None:
    parser = argparse.ArgumentParser(description="Scaffold comedy autopsy markdown files.")
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing autopsy stubs",
    )
    args = parser.parse_args()

    vids = list_vid_ids()
    if not vids:
        print(f"No transcripts found in {TRANSCRIPTS}")
        return

    for vid_id in vids:
        print(write_stub(vid_id, force=args.force))


if __name__ == "__main__":
    main()
