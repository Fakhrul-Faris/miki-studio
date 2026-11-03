# EX18 "The Landlord" — final (first long-edu)

`export/EX18.mp4`: 72.3 s, 1080x1920, 60 fps, -18.8 LUFS (peak -2.0 dB). Built on the EX17 base: a SimReady tray
close-up; two cutaway restaurants with $1.4B vs $13.9B profit piles; a fall through the void into a warm 1954 world
(Kroc, the brothers' stand, franchise copies, royalty streams); the stand lifts off its plot and the ground glows green;
back to the present and one zoom out from a restaurant to a city to 45,000 green plots on a real world map; the
future-rent ribbon; the buildings sink so only the ground stays lit. Ray Kroc photo card (public domain). earshot: 12/12
cues within 100 ms.

- Story, sources, script, scene brief, shot list, build notes, post copy: `episode.md`.
- Your copy to edit by hand: `EX18_edit.ecproj` (never rebuilt into).
- Rebuild: `blender -b --python build/episode.py -- $PWD/out/frames` (~90 min; `preview` first, ~25 min), then
  `rm EX18.ecproj; build/run.sh MASTER` and
  `effectcraft-cli render --project EX18.ecproj --comp MASTER --out export/EX18.mp4 --format h264 --audio on`.
- Needs `02_kit/simready/` (tray, cup): `python3 tools/blender/simready.py fetch …` then `blender -b --python
  tools/blender/simready.py -- kit …` if the kit is missing (it is gitignored).
- World map: `build/land.json` from Natural Earth ne_110m_land (public domain).
- Disk: the 4,340 PNG frames take ~6 GB; delete `out/frames` once posted.
