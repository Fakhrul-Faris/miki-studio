# EX17 "Five Times" — final

`export/EX17.mp4`: 36.8 s, 1080x1920, 60 fps, -19.2 LUFS (true peak -2.7 dBTP). House format, built on the EX16 v2 base
(Analytical angle, Bridge off, callback ending): a green 5× monument in a night plaza; the ground opens like a cake cut
into 2014 / 1990 / late-1980s strata; the column under it crumbles and the 5× stays in mid-air ("no study behind it");
two roads of 20 card customers through Year 1–5 gates (walk cycles, coin stacks, leavers falling off); $134 vs $300
value bars beside a lit shop; back to the floating 5–25× under the follow card. Pinned labels; earshot cue check 10/10
within 100 ms.

- Story, sources, script, angle check, scene brief, shot list, build notes, post copy: `episode.md`.
- Your copy to edit by hand: `EX17_edit.ecproj` (never rebuilt into).
- Rebuild: `blender -b --python build/episode.py -- $PWD/out/frames` (~45 min; `preview` first, ~5 min), then
  `rm EX17.ecproj; build/run.sh MASTER` and
  `effectcraft-cli render --project EX17.ecproj --comp MASTER --out export/EX17.mp4 --format h264 --audio on`.
- Sound: `python3 build/sfxmix.py` (earshot bank + drone bed). Captions: `python3 build/caps.py`.
- Disk: the 2206 PNG frames take ~3.5 GB; delete `out/frames` once posted (regenerable).
