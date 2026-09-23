#!/usr/bin/env python3
"""
Extract representative stills per shot from a video, for shot-by-shot
cinematography analysis (camera, location, composition, mood, lighting).

Pipeline:
  1. Detect hard cuts via ffmpeg's scene-change score.
  2. Build a shot list from those cut points (video start/end are shot bounds too).
  3. Any shot longer than --max-shot-len is subdivided at a fixed interval
     (handles continuous handheld/one-take footage with no hard cuts).
  4. Extract start/mid/end frames per shot (skips mid/end on very short shots).
  5. Write a manifest.json describing every shot + its frame files.

Usage:
  python3 tools/shot_extractor.py <video> [--out DIR] [--scene-thresh 0.35] [--max-shot-len 3.0]
"""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path


def ffprobe_duration(video: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(video)],
        capture_output=True, text=True, check=True,
    ).stdout.strip()
    return float(out)


def detect_scene_cuts(video: Path, scene_thresh: float) -> list[float]:
    """Return sorted list of timestamps (seconds) where a hard cut was detected."""
    proc = subprocess.run(
        ["ffmpeg", "-i", str(video), "-filter:v",
         f"select='gt(scene,{scene_thresh})',showinfo",
         "-f", "null", "-"],
        capture_output=True, text=True,
    )
    times = [float(m) for m in re.findall(r"pts_time:([\d.]+)", proc.stderr)]
    return sorted(set(times))


def build_shots(duration: float, cut_times: list[float], max_shot_len: float) -> list[tuple[float, float]]:
    bounds = [0.0] + [t for t in cut_times if 0.0 < t < duration] + [duration]
    bounds = sorted(set(round(b, 3) for b in bounds))

    shots = []
    for start, end in zip(bounds[:-1], bounds[1:]):
        length = end - start
        if length <= max_shot_len:
            shots.append((start, end))
            continue
        # subdivide a too-long shot at a fixed interval
        n_parts = max(2, round(length / max_shot_len))
        step = length / n_parts
        for i in range(n_parts):
            shots.append((round(start + i * step, 3), round(start + (i + 1) * step, 3)))
    return shots


def extract_frame(video: Path, timestamp: float, out_path: Path) -> None:
    subprocess.run(
        ["ffmpeg", "-y", "-ss", f"{timestamp:.3f}", "-i", str(video),
         "-frames:v", "1", "-pix_fmt", "yuvj420p", "-q:v", "2", str(out_path)],
        capture_output=True, check=True,
    )


def fmt_tc(seconds: float) -> str:
    m, s = divmod(seconds, 60)
    h, m = divmod(int(m), 60)
    return f"{h:02d}-{int(m):02d}-{s:06.3f}".replace(".", "_")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("video", type=Path)
    ap.add_argument("--out", type=Path, default=None, help="output dir (default: <video_stem>_shots next to the video)")
    ap.add_argument("--scene-thresh", type=float, default=0.35, help="ffmpeg scene-change sensitivity, lower = more cuts detected")
    ap.add_argument("--max-shot-len", type=float, default=3.0, help="seconds; longer shots get subdivided for extraction")
    ap.add_argument("--min-shot-len", type=float, default=0.4, help="seconds; shots shorter than this only get a single mid frame")
    args = ap.parse_args()

    video = args.video.resolve()
    if not video.exists():
        sys.exit(f"video not found: {video}")

    out_dir = args.out or video.with_name(video.stem.replace(" ", "_") + "_shots")
    out_dir.mkdir(parents=True, exist_ok=True)

    duration = ffprobe_duration(video)
    cut_times = detect_scene_cuts(video, args.scene_thresh)
    shots = build_shots(duration, cut_times, args.max_shot_len)

    manifest = {"video": str(video), "duration": duration, "scene_thresh": args.scene_thresh, "shots": []}

    for idx, (start, end) in enumerate(shots, start=1):
        length = end - start
        pad = min(0.15, length / 4)
        frames = {}

        if length < args.min_shot_len:
            points = {"mid": (start + end) / 2}
        else:
            points = {"start": start + pad, "mid": (start + end) / 2, "end": end - pad}

        for label, ts in points.items():
            ts = max(0.0, min(ts, duration - 0.01))
            fname = f"shot{idx:02d}_{label}_{fmt_tc(ts)}.jpg"
            fpath = out_dir / fname
            extract_frame(video, ts, fpath)
            frames[label] = {"timestamp": round(ts, 3), "file": str(fpath.relative_to(out_dir.parent))}

        manifest["shots"].append({
            "shot": idx,
            "start": round(start, 3),
            "end": round(end, 3),
            "duration": round(length, 3),
            "frames": frames,
        })
        print(f"shot {idx:02d}: {start:6.2f}s - {end:6.2f}s ({length:5.2f}s)  -> {', '.join(frames)}")

    manifest_path = out_dir / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2))
    print(f"\n{len(shots)} shots extracted -> {out_dir}")
    print(f"manifest -> {manifest_path}")


if __name__ == "__main__":
    main()
