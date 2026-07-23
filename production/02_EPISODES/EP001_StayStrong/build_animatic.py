#!/usr/bin/env python3
"""
Build PROOF_03 still animatic in Blender VSE.

Usage (from repo root):
  /Applications/Blender.app/Contents/MacOS/Blender --background \
    --python production/02_EPISODES/EP001_StayStrong/build_animatic.py

Or inside Blender: Scripting workspace → Open → Run Script
"""
from __future__ import annotations

import bpy
from pathlib import Path

# --- paths ---
EPISODE_DIR = Path(__file__).resolve().parent
REFS_DIR = EPISODE_DIR / "refs"
BLEND_OUT = EPISODE_DIR / "EP001_animatic.blend"

# Panel timing from PROOF_03_stay_strong_board.md (seconds @ 24fps)
PANELS: list[tuple[str, float]] = [
    ("01_were_done.png", 3.0),
    ("02_overdue.png", 3.0),
    ("03_on_me.png", 4.0),
    ("04_phone_handoff.png", 3.0),
    ("05_stay_strong.png", 4.0),
    ("06_alone_banners.png", 4.0),
]

FPS = 24
WIDTH = 1080
HEIGHT = 1920


def reset_scene() -> None:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.name = "EP001_StayStrong"
    scene.render.fps = FPS
    scene.render.resolution_x = WIDTH
    scene.render.resolution_y = HEIGHT
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.filepath = str(EPISODE_DIR / "EP001_render" / "EP001_animatic_")


def ensure_vse() -> bpy.types.SequenceEditor:
    scene = bpy.context.scene
    if not scene.sequence_editor:
        scene.sequence_editor_create()
    return scene.sequence_editor


def add_markers(frame_start: int, panels: list[tuple[str, int]]) -> None:
    scene = bpy.context.scene
    scene.timeline_markers.clear()
    t = frame_start
    for name, duration in panels:
        scene.timeline_markers.new(name=name, frame=t)
        t += duration


def build() -> None:
    missing = [name for name, _ in PANELS if not (REFS_DIR / name).exists()]
    if missing:
        raise FileNotFoundError(
            f"Missing refs in {REFS_DIR}:\n  " + "\n  ".join(missing)
        )

    reset_scene()
    scene = bpy.context.scene
    seq = ensure_vse()

    # Clear any strips (Blender 5.x: seq.strips)
    for strip in list(seq.strips):
        seq.strips.remove(strip)

    frame = 1
    panel_meta: list[tuple[str, int]] = []

    for filename, seconds in PANELS:
        duration = max(1, int(round(seconds * FPS)))
        path = str((REFS_DIR / filename).resolve())
        strip = seq.strips.new_image(
            name=Path(filename).stem,
            filepath=path,
            channel=1,
            frame_start=frame,
            fit_method="STRETCH",
        )
        strip.frame_final_duration = duration
        panel_meta.append((Path(filename).stem, duration))
        frame += duration

    end_frame = frame - 1
    scene.frame_start = 1
    scene.frame_end = end_frame
    scene.frame_current = 1

    add_markers(1, panel_meta)

    # Color management — sRGB for stills
    scene.view_settings.view_transform = "Standard"
    scene.display_settings.display_device = "sRGB"

    # Metadata
    scene["episode"] = "EP001_StayStrong"
    scene["script"] = "PROOF_03_stay_strong"
    scene["panel_count"] = len(PANELS)
    scene["duration_sec"] = sum(s for _, s in PANELS)

    EPISODE_DIR.mkdir(parents=True, exist_ok=True)
    (EPISODE_DIR / "EP001_render").mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_OUT))

    print(f"✓ Animatic built: {end_frame} frames ({end_frame / FPS:.1f}s)")
    print(f"✓ Saved: {BLEND_OUT}")
    for name, dur in panel_meta:
        print(f"  {name}: {dur}f ({dur / FPS:.1f}s)")


if __name__ == "__main__":
    build()
