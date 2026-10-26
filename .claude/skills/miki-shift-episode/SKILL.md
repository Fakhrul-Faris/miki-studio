---
name: miki-shift-episode
description: Playbook for making an episode of the Miki's Shift TikTok comedy series (miki-shift/ in this repo) — from a joke idea to a posted, fully animated 9:16 short. Covers the script and cold-read, a new cast and location per episode (Seedream assets with @aliases), the Dreamina 9-grid storyboard, Seedance segment prompts, ElevenLabs v4 voice, sound and mix, assembly with the end card, post copy and the calendar. Use this whenever the user wants a new episode, "the next ep", "EP05", to turn an idea or autopsy into an episode, to write or fix Seedance/Seedream prompts, a storyboard, voice lines or sound for miki-shift, or to debug a bad generation (characters blending, props changing, people on the wrong side of the counter) — even if they don't say "episode" or "skill".
---

# Miki's Shift — episode playbook

This is the process that produced EP04 ("For Who") with almost no regeneration. Everything here was
learned by trying alternatives that failed; `references/lessons.md` records what failed and why, so
read it before suggesting a different method.

The project lives in `miki-shift/`. Each episode is a folder `miki-shift/04_episodes/EPNN_slug/`.
Templates for every file are in `templates/` — copy them, don't write from scratch.

## How to work with this user

- **Plan before acting on anything new.** For a new episode, a new method or a restructure, present a
  short plan and wait for approval. Small fixes to approved files can be made directly.
- **One gate at a time.** Each gate below ends with the user's approval. Generation credits are the
  expensive part, so problems should be caught on paper (script, storyboard) before video runs.
- **Prompts stay short.** The user has corrected long prompts repeatedly. Details about a character or
  place are written once, in `0_assets.md`; everywhere else they are referred to by @alias.
- Write in plain language; explain any term the user may not know.

## The gates

| # | Gate | File | User approves |
|---|------|------|---------------|
| 1 | Idea → script → cold-read | `1_script.md` | the script passes the cold-read |
| 2 | Cast + location | `0_assets.md` | character sheets and plate look right |
| 3 | Storyboard (9-grid) | `2_animation.md` (top) | the story reads in one image |
| 4 | Segments | `2_animation.md` | — (they generate) |
| 5 | Voice | `3_voice.md` | voices and delivery |
| 6 | Sound + mix | `3b_sound.md` | — |
| 7 | Assembly + end card | steps in `2_animation.md` | the cut |
| 8 | Post + calendar | `5_post.md`, `05_calendar/calendar.md` | — |

Generation order differs from writing order: assets → storyboard → **voice rendered** → talking
windows adjusted to the real line lengths → segments → assembly.

### 1. Script
Steal one "knife" (joke machine) from `archive-ignore/comedy-autopsy/autopsies/` or the backlog
(`miki-shift/03_ideas/backlog.md`); never remake a scene. Write the **button first**, then the script,
then the cold-read test. English only, international, no explaining the joke in dialogue.
Be an editor: check that the object that carries the joke reads instantly on a phone (EP04: clear
glass of water vs ceramic latte cup), that the audience *sees* any assumption the punchline depends
on (EP04: Tess smiling at the latte), and remove props that don't serve the joke.

### 2. Cast + location — new every episode
Every episode has its own characters and location. Write their Seedream prompts in `0_assets.md`:
- Seedream, 1 image, 9:16, **no reference image** (it copies the face of anyone attached).
- The style sentence goes here (and only here): see `references/prompt-rules.md`.
- Design characters to be opposites of each other: different hair shape, height, clothing colour, one
  strong accessory. Two similar characters blend in every later generation.
- Each asset becomes a Seedance/Dreamina asset with an alias (@Juno, @Bar). From now on prompts use
  the alias only.
- Voices: add a Voice Design prompt for each new speaking character to `00_bible/voice-cast.md`.

### 3. Storyboard
One Dreamina 9-grid image (Seedream, 9:16) attaching the assets. Pick the 9 most important shots;
leave out simple inserts. Review with the checklist in `references/review-checklists.md` before any
video. `miki-shift/tools/split_grid.sh` splits the grid into panels if needed.

### 4. Segments (Seedance)
- 3–4 segments, each well under the 15s limit (the user prefers 4 small ones for safety).
- **Every shot is a new camera angle**, including the first shot of each segment — then any broken
  shot can be cut out at its boundary and regenerated alone.
- Locked camera per shot; cuts instead of camera moves.
- Characters by alias only. No style sentence, no character descriptions.
- **No speech** (Seedance speaks Mandarin): characters only move their mouths in timed windows.
  **Do let Seedance make sound effects** — it adds good, in-sync effects on its own.
- **Continuity:** once an object moves or a person changes side, every later shot states where it is,
  and a "Never changes:" line pins props and positions (see `references/prompt-rules.md`).

### 5. Voice (ElevenLabs Eleven v4)
One file per line (`audio/L01.wav`…). Tags in `[brackets]` describe the voice, never an action.
Render the whole scene in dialogue mode too and keep the better take of each line — short lines need
the previous line for context. Render voice **before** the segments and set the talking windows to
the real line lengths.

### 6. Sound + mix
Seedance's clip audio is the sound bed (keep it; strip any stray vocals/murmur with a remove-vocals
tool). `3b_sound.md` only lists what Seedance can't do: stock phone sounds (recorded from a real
iPhone), room tone to smooth hard cuts, comic silences, and any effect it missed (ElevenLabs Sound
Effects, prompts in the file). **No music anywhere.**

### 7. Assembly
Hard cuts, trim holds, slip each voice line a few frames until the mouths match, burned-in subtitles
(`00_bible/overlays.md`), then the **end card** (the user adds it in post). Phone notifications are
stock iOS lock-screen UI only — never custom cards.

### 8. Post
Caption that adds a second joke or a tag-a-friend prompt (never explains the joke), 3–5 hashtags,
a pinned comment that asks a personal question tied to the premise. Update the calendar row and the
episode's `5_post.md` status.

## Starting a new episode

1. Agree the idea and present the plan (gates, cast, location, rough shot list).
2. `mkdir` the episode folder with `assets/ audio/ export/ stills/`, copy the templates, fill gate 1.
3. Continue gate by gate. After each, update `5_post.md`'s status line and the calendar.

## When something goes wrong

Read `references/review-checklists.md` → "Common failures and fixes". The short version: fix the
earliest failure first, regenerate only the broken shot, and fix it with one specific line in the
prompt rather than a longer prompt.
