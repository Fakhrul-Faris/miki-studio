# EX16 "Out of Turn" — final

`export/EX16.mp4`: 37.7 s, 1080x1920, 60 fps, -19.1 LUFS. House format (smooth isometric, Analytical angle, Bridge off):
a Blender ED floor (`tools/blender/isokit.py`), one camera, true green accent rendered natively (no recolour pass),
arc gauges, a 5-level legend, pinned labels, a climbing wait counter, Meikigo follow card.

- Story, sources, script, angle check, scene brief, shot list, build notes, post copy: `episode.md`.
- Your copy to edit by hand: `EX16_edit.ecproj` (never rebuilt into).
- Rebuild: `blender -b --python build/episode.py -- $PWD/out/frames` (~15 min this episode; `preview` first, ~1.5 min),
  then `rm EX16.ecproj; build/run.sh MASTER` and
  `effectcraft-cli render --project EX16.ecproj --comp MASTER --out export/EX16.mp4 --format h264 --fps 60 --audio on`.
