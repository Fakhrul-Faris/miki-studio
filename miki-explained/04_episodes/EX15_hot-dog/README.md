# EX15 "The $1.50 Promise" — final

`export/EX15.mp4`: 45.0 s, 1080×1920, 60 fps, −19.2 LUFS. House format (smooth isometric): one Blender warehouse
(`tools/blender/isokit.py`), one camera, green #57D100, caption panel, labels pinned to the world, Meikigo follow card.

- Story, sources, script, shot list, build notes, post copy: `episode.md`. Voice notes: `how-i-generate.md`.
- Your copy to edit by hand: `EX15_edit.ecproj` (never rebuilt into).
- Rebuild: `blender -b --python build/episode.py -- $PWD/out/frames` (~40 min; `preview` first, ~4 min; `anchors` alone
  if only a pinned label moved), then `rm EX15.ecproj; build/run.sh MASTER` and
  `effectcraft-cli render --project EX15.ecproj --comp MASTER --out export/EX15.mp4 --format h264 --fps 60 --audio on`.
