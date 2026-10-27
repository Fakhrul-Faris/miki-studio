# References

Drop example clips here, one folder per clip:

```
01_references/<slug>/
  source.mp4        the clip (any name is fine; it gets renamed)
  note.md           optional: what you like about it
```

Or just drop the video files straight into this folder; they get sorted into slug folders.

After analysis each folder also gets:

```
  shots/            rough grid from tools/shot_extractor.py
  contact_sheets/   8–12fps tiled frames per beat
  transcript.txt    faster-whisper transcript (for voice ↔ visual sync)
  shot_analysis.md  beat-by-beat analysis (approved before any build uses it)
```

Cross-clip files live alongside: `diagram-index.md` (one row per beat) and `patterns.md` (D01, D02… recurring diagram moves).
