# Visual system

## House format (V3, from 2026-10-28): cut-paper mixed media

Every Miki Explained episode is built like **EX02V3 "The Doorway"** (`04_episodes/EX02V3_doorway`, see its README).
It replaces V1 (cards and tiles on cream/brown) and V2 (flow style, Work Sans, 3D chrome-head humans).

### Three ingredients, every episode

| Ingredient | Use it for | Made by |
|---|---|---|
| **Collage** | Scenes in cut paper: places, people, objects. Carries the look. | User generates stills → PhotoCraft separates layers |
| **Documentary images** (2–3, required) | The real thing the story is about: the shop, the place, the moment | User generates documentary photos → PhotoCraft prints them as torn ink-and-paper photos |
| **Diagram animation** | Anything abstract: comparisons, numbers, counters, maps, time, typography | Native in EffectCraft |

If a line names a real place or object, show a documentary image. If it explains how something works or compares two
things, use a diagram or typography (Doorway: "over an hour", "just the cut, ten minutes", "a long wait vs an unknown wait").
Collage carries the rest. Prompts: `.claude/skills/miki-explained-episode/templates/media-prompts.md`.

### Art direction

- Editorial collage in the spirit of Vox and Fern: torn edges, halftone photo cut-outs, risograph grain, slight ink misregistration,
  hard directional light, soft paper shadows, one hero element per frame, generous negative space.
- **Palette:** paper `#EFE8DC`, ink `#111111`, one ochre accent `#C98A2B`. **One extra colour family** only in the one segment
  that needs it (Doorway: signal green / yellow / red in Segment 4). Documentary photos are recoloured to ink and paper
  (Gradient Map) with a torn paper rim.
- **Type:** Anton for headlines and stamps, IBM Plex Mono for labels, counters and subtitles. All type is built natively,
  never baked into images.
- **Overlay on every shot** (one `OVERLAY` precomp): grain 7% overlay, paper texture 12% multiply, faint vignette.

### Motion

- **Two clocks:** elements step at 12fps (`posterizeTime(12)`), the camera moves smoothly at 24fps.
- Expo ease-out (fast start, long settle); linear only for mechanical motion. No bounce, overshoot or elastic.
- **Type never fades:** it is stamped (118% → 100% in 2 frames, with a misregistered multiply copy), mask-wiped, or cut on
  letter by letter / word by word.
- 3D layers in Z with one camera per shot; parallax comes from the camera.
- No gradients, lens flares or glows, except a light the story switches on.

### Transitions: nothing appears from nowhere

No dissolves or fades. Each shot is born from the last one:
- **Match cuts:** the same shape, number or light in the same place (the torn patch → the hole; the "10" → the stopwatch's 10;
  a lamp → the photo's signal).
- **Camera carries:** a push that continues through the cut, one continuous tilt across related shots.
- **Paper moves:** a sheet slides over, the page tears and falls away, the last frame splits into flaps that fold back.
  6–10 frames, calm, with a soft shadow.

### Edit: the voice sets the tempo

- Narration is one continuous track: pauses over 0.45s trimmed to about 0.3s, 0.25s between lines (`tools/vo_tighten.py`).
- Every cut starts on its word; every key moment (stamp, light, count) lands on the word it illustrates.
- Holds are deliberate, about 1s, only where they earn it (after the hook line, before the closing question).
- Episodes run about 40–45s.

### TikTok safe area (1080 × 1920)

| Edge | Keep clear | Why |
|---|---|---|
| Top | **160 px** (at least 108) | Following / For You tabs, search |
| Bottom | **480 px** (at least 320) | username, caption, audio, nav bar |
| Left | **60 px** | |
| Right | **120 px** | like / comment / share rail |

**Safe window: x 60–960, y 160–1440.** Every word on screen (headlines, stamps, labels, counters, subtitles) and every
key subject sits inside it; text in the central **840 × 1280** sweet spot (about x 90–930). Backgrounds and plates still
bleed to the frame edge. Check one frame per shot against a safe-area guide before the final render.

### Subtitles

IBM Plex Mono Medium 44px, ink on a paper pill, phrases of up to about 5 words cut on with the voice.
**Hidden wherever the same words are already on screen** (stamps, typography shots, the title, the closing question).
The pill sits inside the safe window, its bottom edge at or above **y 1440** (centre about y 1390). Doorway's sat at y 1573–1651, inside the bottom UI.

### Sound

Voice, a low drone bed, and **about 8–10 hits on key moments only**: stamps, the snip, a paper rip or tear, a relay click when
a light changes, a scanner beep, one swell into the title. Music, if any, sits under everything at about −23 dB.
The user supplies the sound files; trim each to its hit and align the hit to the frame (`sfx/events.txt`).
A Meikigo logo outro, if used, is silent.

### Still valid from V1/V2

- Facts first: check generated details against the sources (EX02's signal came out red / white / blue). Prompt the detail or crop it.
- **AI label:** turn on the platform's AI-generated content label on every post (TikTok "AI-generated content", Instagram "AI info").
- The TikTok safe window (x 60–960, y 160–1440) holds every word and key subject; see § TikTok safe area.
- Review in motion, not on stills: frame strips across every transition.
- Flow, cohesion and cleanliness over flashy effects; nothing rushed or bouncy.
