# EX14 "The Long Path" — final

`export/EX14.mp4`: 46.3 s, 1080×1920, 60 fps, −19.2 LUFS. Style V3 (smooth isometric): no generated images; a Blender
orthographic world in flat greys on near-black, recoloured to the green accent #57D100 in EffectCraft; caption blocks at the
bottom from the user's reference recording; one continuous camera; Meikigo logo on the follow card.

- Story, sources, script, shot list, build notes, post copy: `episode.md`. Voice notes: `how-i-generate.md`.
- Your copy to edit by hand: `EX14_edit.ecproj` (never rebuilt into). `EX14.ecproj` is rebuilt by the scripts.
- Rebuild: `blender -b --python build/episode.py -- $PWD/out/frames` (~40 min), then `rm EX14.ecproj; build/run.sh MASTER`
  and `effectcraft-cli render --project EX14.ecproj --comp MASTER --out export/EX14.mp4 --format h264 --fps 60 --audio on`.
  Text, captions, colour and sound only need the last two steps (~2 min).
- `Screen Recording … 9.00.10 PM.mov` is the caption reference the style was matched to.
