# Lessons — what failed, and what replaced it

Read before proposing a "new" method: most alternatives have already been tried.

| Tried | What happened | Now |
|-------|---------------|-----|
| Repeating a full character + style block in every prompt | User flagged duplication; no quality gain | Long description once in `0_assets.md`, aliases everywhere else |
| Attaching the lead's image as a "style" reference for a new character | Seedream cloned the lead's face (EP01 customer = Miki) | No reference images for new characters; style in words |
| One Seedream prompt asking for a set of frames | Returned one collage image, not separate frames | One image per request; use the collage effect on purpose as the 9-grid storyboard |
| Per-shot first & last frame keyframes → Seedance (EP04) | Poor results in Seedance | Multi-shot segments from @assets, storyboard for review |
| Seedance speaking the dialogue | Speech comes out in Mandarin | Silent mouth movement in timed windows + ElevenLabs voice |
| Banning all Seedance audio | Unnecessary — Seedance adds good in-sync sound effects on its own | Ban speech and music only; keep its effects as the sound bed |
| Google Chirp 3 HD for voice | No emotion control | ElevenLabs Eleven v4 with voice-describing tags |
| Custom notification cards (big floating UI) | Looked fake; user wants stock | Stock iOS lock-screen notifications only |
| Labelled character sheet as reference | Printed cards/labels leaked into frames | Clean crop with no text (`00_bible/miki_ref_clean.png`) |
| No explicit end state after an object moves (EP01) | Phone reappeared on its stand in the last shot | State every moved object in every later shot |
| No pinned props/positions (EP04 S4) | Ceramic cup became a glass; customer stood behind the counter | "Never changes:" line in the segment |
| Stills + zoom/pan as the main format (early plan) | Worked, but full animation turned out cheap and reliable enough | Full animation is the default; stills (`2_frames.md`) only as fallback |
| Series corner tag "MIKI'S SHIFT · #NN" | Not wanted | No series tag; every episode ends on the user's end card |
| One recurring lead for every episode | User chose new characters each episode | New cast + location per episode, prompts in that episode's `0_assets.md` |
