# Miki's Shift — animated TikTok comedy series

Daily 15–30s vertical comedy shorts. A new cast and location every episode; animated in Seedance,
voiced with ElevenLabs. Standalone project — separate from the animation skits in `archive-ignore/`.

**How to make an episode:** the `miki-shift-episode` skill (`../.claude/skills/miki-shift-episode/`) —
the proven EP04 process, prompt rules, what failed, templates and checklists. It loads automatically
when you ask Claude for a new episode.

## Where things are

| Folder | What's in it | Open when |
|--------|-------------|-----------|
| `00_bible/` | Rules that never change per episode | Starting anything |
| ├ `series-plan.md` | Format, joke method, still-frame grammar, image consistency kit, share/save mechanics, checklist | First read |
| ├ `miki.md` + `miki_*.png/jpg` | Character lock, expressions E0–E5, reference images | Every image prompt |
| ├ `voice-cast.md` | ElevenLabs rules, Voice Design prompts, locked voices | Every voice render |
| └ `overlays.md` | Stock phone notifications, end card, subtitles, export settings | Every edit |
| `03_ideas/backlog.md` | Pitched ideas → cold-read verdict → promoted to episode | Writing new episodes |
| `04_episodes/EPNN_slug/` | One folder per episode (below) | Daily work |
| `05_calendar/calendar.md` | Day → episode → status → link | Scheduling |
| `06_sfx/` | Shared sound library | Every edit |
| `tools/split_grid.sh` | Splits a 3×3 storyboard into `sb_01…sb_09.png` | After the storyboard |

## Inside an episode folder — work in number order

```
EPNN_slug/
  0_assets.md   this episode's characters + location: Seedream prompts, Seedance aliases
  1_script.md   the joke
  2_frames.md   image prompts (paste into Seedream / GPT image)
  2b_motion.md  optional Seedance clips for 2–4 key moments (image-to-video)
  2_animation.md  full-animation episodes: Seedance segment prompts (instead of 2_frames.md)
  3_voice.md    lines to paste into ElevenLabs
  3b_sound.md   sound effects: ElevenLabs prompts + where each sound goes, by scene
  4_edit.md     timeline: frame × time × move × audio × overlay
  5_post.md     caption, hashtags, pinned comment, date, status, results
  assets/       generated character sheets + location plate
  stills/       F01.png …
  audio/        L01.wav …
  export/       final mp4s
```

## Daily workflow

1. Pick next episode from `05_calendar/calendar.md`
2. `0_assets.md` → generate characters + location → `assets/` → create Seedance assets
3. `2_animation.md` → 9-grid storyboard first → review → generate the segments (or `2_frames.md` for a stills episode)
4. `3_voice.md` + `3b_sound.md` → render voice and sound → `audio/`
5. Assemble (steps in `2_animation.md` or `4_edit.md`) → end card → `export/`
6. `5_post.md` → schedule → update calendar row

## New episode

1. Idea in `03_ideas/backlog.md` → passes cold-read (`series-plan.md` §1)
2. Copy an existing episode folder's structure → `04_episodes/EPNN_slug/`
3. Write `0_assets.md` (new characters + location) → `1_script.md` → `2_animation.md` → `3_voice.md` → `3b_sound.md` → `5_post.md`
4. Add a row to the calendar
