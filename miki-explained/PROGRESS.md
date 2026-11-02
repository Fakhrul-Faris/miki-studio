# Progress note (2026-11-02) — read this first

## House format changed
Old: cut-paper collage (doorway-format-standard). **Superseded 2026-11-01.**
New: **smooth isometric**, EX14 "The Long Path" style. User: "i really really love what you did with this. this is what
i'm looking for." Full spec: `00_bible/visual-system.md` top section. Skill: `.claude/skills/miki-explained-episode/SKILL.md`.

Format in one line: Blender orthographic isometric world, flat greys on near-black `#0E0E10`, one accent green `#57D100`,
Isotype pictogram people, one continuous camera, 60 fps, no generated images/paper/dots. EffectCraft adds caption panel
(bottom, sentence blocks, word fade-rise) + centre cards + sound. No PhotoCraft, no image prompts anymore.

## Kit
`tools/blender/isokit.py` — shared Blender kit for every new episode. `setup()`, `box()`, `person()`, `Path`, `Rig`
(camera), `anchor()`/`pin()` (labels stuck to world points). Start new episodes from `EX15_hot-dog/build/episode.py`.

**Always preview before full render**: `episode.py -- <out> preview` → `out/preview.mp4` (~3-4 min, quarter size, voice
muxed). Show user, get OK, THEN full render (~40 min). User asked for this explicitly, don't skip it.

## Episodes done in new format
- EX14 "The Long Path" (IKEA maze) — final, posted plan Thu 12 Nov 18:00
- EX15 "The $1.50 Promise" (Costco hot dog) — final, posted plan Wed 11 Nov 12:30, **push to Telegram still pending**

## Known trap (fixed, but watch for it)
Blender 5.2 `transform_apply(scale=True)` also resets location to origin unless `location=False` passed. isokit.box()
already has the fix. If a new object type is added outside isokit and pulses/labels land wrong, check this first.

## Calendar / dashboard
Source of truth = dashboard (http://100.107.126.69:8787/api/state), not calendar.md alone — sync both when scheduling.
EX05–EX13 (old cut-paper episodes) scheduled 2–10 Nov in TikTok Studio. EX14–EX18 planned as the new-format test block
(12–15 Nov), to compare watch-time stats against the old format.

## Next up
EX16: ER triage, set in Malaysian hospital, Fri 13 Nov slot. Not started.

## Accounts
Session now under muhammadfakhrulfaris@gmail.com (changed from admin@forestone.com.my mid-session, 2026-11-02).
Git user stays Fakhrul-Faris. No action needed, just noting in case commits look off.
