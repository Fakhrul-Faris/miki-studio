# EX16 "Out of Turn" — final

`export/EX16.mp4`: 37.7 s, 1080x1920, 60 fps, -19.1 LUFS. House format (smooth isometric, Analytical angle, Bridge off), v2 remake: a 100-bed cutaway hospital tower at
night (72 beds light for 71.8%), a 5-lane triage sorter with a literal crack, a 91/100 clinic, pinned labels,
earshot-checked sound, Meikigo follow card. v1 scene kept as build/episode_v1.py.

- Story, sources, script, angle check, scene brief, shot list, build notes, post copy: `episode.md`.
- Your copy to edit by hand: `EX16_edit.ecproj` (never rebuilt into).
- Rebuild: `blender -b --python build/episode.py -- $PWD/out/frames` (~25 min; `preview` first, ~4 min),
  then `rm EX16.ecproj; build/run.sh MASTER` and
  `effectcraft-cli render --project EX16.ecproj --comp MASTER --out export/EX16.mp4 --format h264 --fps 60 --audio on`.
