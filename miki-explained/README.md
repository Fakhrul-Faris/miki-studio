# Miki Explained — diagram explainer series

Under-60s vertical explainers for TikTok and Instagram Reels. Each episode takes a story from
business, psychology or economics, reveals the hidden system behind it, then turns to a Malaysian
shop: "your shop has the same problem." Diagram-only, blank background, serious tone. English only,
voiced with ElevenLabs. Standalone project, separate from `miki-shift/` (comedy). Built in EffectCraft only (never After Effects).

Goal: make shop owners feel clever and understood, and point every story back to a problem Meikigo
solves without ever pitching the product.

## Where things are

| Folder | What's in it | Open when |
|--------|-------------|-----------|
| `00_bible/` | Rules that never change per episode | Starting anything |
| ├ `series-plan.md` | Skeleton, hook patterns, the shop turn, lanes, rules | First read |
| ├ `visual-system.md` | Background, accent line, motion, type, sound | Every edit |
| ├ `voice.md` | ElevenLabs direction and word budget | Every voice render |
| └ `episode-template.md` | Copy into each episode folder | New episode |
| `01_references/` | Example clips + per-clip analysis, beat index, diagram patterns | Learning the style |
| `03_ideas/content-bank.md` | All ideas (stories, series, pitches) → fact check → promoted to episode | Writing new episodes |
| `04_episodes/EXNN_slug/` | One folder per episode | Daily work |
| `05_calendar/calendar.md` | Day → episode → status → link | Scheduling |
| `06_sfx/` | Shared sound library (ElevenLabs set + synth placeholders) | Sound mix |
| `tools/` | Shared build kit: `ec/core.jsx`, `ec/blocks.jsx`, `words.py`, `captions.py`, `sfxmix.py`, `build.sh`, `review.sh` | Every build |

## New episode

Use the **`miki-explained-episode` skill** (`.claude/skills/miki-explained-episode/`): gates, commands, templates, lessons.
Short version:

1. Pick an idea in `03_ideas/content-bank.md`. Every 🔍 fact must be verified against a source first.
2. Create `04_episodes/EXNN_slug/` and copy `00_bible/episode-template.md` in as `episode.md`.
3. Fill it in order: sources → script (≤130 words) → diagram shot list → voice → post copy.
4. Add a row to the calendar.
