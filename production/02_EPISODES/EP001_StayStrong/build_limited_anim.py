#!/usr/bin/env python3
"""Build limited-animation frame sequence for EP001 Stay Strong.

IMPORTANT: Do NOT rapid-swap two different AI stills (causes jitter).
Limited anim = long holds on ONE pose, rare swaps (blink / mouth / wipe).
"""
from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ANIM = ROOT / "anim_frames"
SEQ = ROOT / "EP001_render" / "seq_limited"
OUT = ROOT / "EP001_render" / "EP001_limited_anim.mp4"

FPS = 12


def hold(name: str, n: int, frames: list[str]) -> None:
    for _ in range(n):
        frames.append(name)


def build() -> list[str]:
    frames: list[str] = []

    # --- P01 We're done · 3.0s = 36f ---
    # First ~1.5s hold (what felt good) → one wipe hold → blink → rest
    hold("p01_base.png", 16, frames)       # 0.0–1.3s settle
    hold("anim_p01_wipe.png", 8, frames)   # wipe once, hold
    hold("p01_base.png", 4, frames)
    hold("anim_p01_blink.png", 2, frames)  # 1-frame blink feel @12fps
    hold("p01_base.png", 6, frames)

    # --- P02 Overdue · 3.0s = 36f ---
    # Hold. One blink only. No pose ping-pong.
    hold("p02_base.png", 18, frames)
    hold("anim_p02_blink.png", 2, frames)
    hold("p02_base.png", 16, frames)

    # --- P03 On me · 4.0s = 48f ---
    # Syllable holds (~0.5s), not every-other-frame flap
    hold("p03_base.png", 10, frames)              # listen / cue
    hold("anim_p03_mouth_open.png", 6, frames)    # "Don't worry…"
    hold("p03_base.png", 4, frames)
    hold("anim_p03_mouth_open.png", 6, frames)    # "On me."
    hold("p03_base.png", 4, frames)
    hold("anim_p03_mouth_open.png", 6, frames)    # "Serious."
    hold("p03_base.png", 12, frames)              # hold smile

    # --- P04 handoff · 3.0s = 36f ---
    hold("p04_base.png", 36, frames)

    # --- P05 Stay strong · 4.0s = 48f ---
    hold("p05_base.png", 6, frames)
    hold("anim_p05_mouth_open.png", 8, frames)    # "Oh—here."
    hold("p05_base.png", 3, frames)
    hold("anim_p05_mouth_open.png", 10, frames)   # "Stay strong."
    hold("p05_base.png", 21, frames)              # smile hold (sacred)

    # --- P06 Alone · 4.0s = 48f ---
    hold("p06_base.png", 16, frames)
    hold("anim_p06_blink.png", 2, frames)
    hold("p06_base.png", 14, frames)
    hold("anim_p06_crack.png", 16, frames)        # one beat into crack, hold

    assert len(frames) == 36 + 36 + 48 + 36 + 48 + 48, len(frames)
    return frames


def main() -> None:
    SEQ.mkdir(parents=True, exist_ok=True)
    for old in SEQ.glob("frame_*.png"):
        old.unlink()

    names = build()
    for i, name in enumerate(names, start=1):
        src = ANIM / name
        if not src.exists():
            raise FileNotFoundError(src)
        shutil.copy(src, SEQ / f"frame_{i:04d}.png")

    print(f"Wrote {len(names)} frames @ {FPS}fps ({len(names) / FPS:.1f}s) → {SEQ}")


if __name__ == "__main__":
    main()
