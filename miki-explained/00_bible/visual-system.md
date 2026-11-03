# Visual system

## House format (from 2026-11-01): smooth isometric — EX14 "The Long Path"

User, on EX14: "i really really love what you did with this. this is what i'm looking for." It supersedes the cut-paper
format below (kept for reference). Reference build: `04_episodes/EX14_long-path` (README, build/, export/EX14.mp4).
(In `03_ideas/experiments.md` this style is the "V3 smooth isometric" style beat.)

- **No generated images.** Everything is built: a Blender orthographic isometric world + EffectCraft type and cards. Real
  black-and-white footage is still allowed when a beat needs the real thing (`tools/footage.py --bw --twos`).
- **Palette:** near-black ground `#0E0E10`, floor `#1B1B1F`, walls `#3A3A42`, furniture `#4C4C55`, people and labels `#8C8C96`,
  warm white type `#EDE7DC`, **one accent: green `#57D100`** (build it straight into Blender; EX14 rendered ochre and
  recoloured it in the comp with `accent()`).
- **World:** flat-shaded shapes with small bevels, a soft sun + grey ambient (the camera sees the dark ground), no outlines,
  no textures, no paper, grain or halftone. Isotype pictogram people (round head, tapered rounded body); "you" in the accent.
- **Camera:** one continuous orthographic camera: a pivot (location, tilt, spin) + ortho scale. True isometric = tilt
  54.7356°, spin 45°; wide shots tilt toward top-down (a full plan is too wide for 9:16 at true iso). It moves through key
  poses on monotone (pchip) curves keyed to word frames, blends into following the subject when they walk, holds gently,
  never hard-cuts, and ends on the opening frame (seamless loop).
- **Motion:** 60 fps, eased (smootherstep; a small back-out overshoot only on arrivals), motion blur on, no stepping.
  Devices that worked: a path that draws itself, x-ray walls with glowing hidden doors, a sight cone, a 10×10 dot grid that
  fills to a percentage, a counter, a pull-out to a city of instanced tiles for scale.
- **Type:** Inter Display (Black for titles and counters, Bold for quotes and the follow card, Medium for captions), IBM Plex
  Mono Medium for labels and sources; a soft dark drop-shadow halo on all type.
- **Captions:** sentence-case blocks at the bottom (panel bottom y 1430), Inter Display Medium 46 on a rounded `#0E0E10`
  panel at 82% that grows with the words; each word fades in and rises 10 px over 14 frames on its spoken frame
  (`capBlock()`; `build/caps.py` groups sentences). Centre cards (quote, counter, the named-concept title) replace captions
  while they show.
- **Follow card:** the Meikigo logo (`02_kit/brand/meikigo-logo.png`) above "Follow Meikigo for more." (Inter Display Bold 66),
  no sound effects on it.
- **Sound:** drone bed at 0.10 + about 10 soft hits (pop, tick, low sink, whoosh); nothing on the follow card.
- **Review:** a cheap Blender preview first (quarter size, every 2nd frame, voice under it, ~3 min) for the user before the
  full render; after it, per-frame difference (no spikes, no stalls), full-size frames on every card, the TikTok safe area.
- **Devices don't repeat:** each episode's hero device (the mechanism the Twist/Payoff beat is built from) must differ
  from the last 2 episodes', and each plans one deliberate visual anomaly (a scale or colour break, something out of
  place) landing on the Twist, separate from the narrative twist in the voice. Logged in `03_ideas/experiments.md` § 13,
  with a silhouette check (does the hero object read as one shape at small size, stripped of colour) before the full
  render. Added 2026-11-02, adapted from an external Blender stat-viz workflow the user shared.

## Cinematography and look v4 (from 2026-11-03; reference r45, being adopted via the EX00V9 look test)

User, 2026-11-03: approach r45's render look, motion and camera. **v4 adopted the same day** ("i approve … i like the
look", EX00V9 v3: `04_episodes/_tests/EX00V9_look/eevee_shot_v3.mp4`). **Pair it with diagram scenes** (user: "we can pair
with diagram based video like we did"): v4 realistic shots for real objects and places, the smooth-isometric diagram
language (above) for numbers, maps and mechanisms, joined by camera moves, never cuts.

**v4 settings (decided):** EEVEE with ray tracing, `camkit.engine("eevee", 32, fast=True)` (half-res ray tracing, 1 shadow
ray) and `render_range()` (one animation job, not a per-frame loop): 2.4 s a frame at 1080 × 1920 on the M5 vs 7.8 s
before; **30 fps** (r45 runs at 30; halves the render). **Real surfaces, no glass everywhere** (user: "don't glass
everything. material surfaces is ok"): paint, metal, wood, a few frosted accents. **The ring wipe cuts away** the front
wall/roof (a lit cutaway diorama), and grows from nothing with its glow ramped in (`xray_set(m, f, r, strength)`) — a
ring that starts at full size and brightness pops (user caught it). Cycles was measured at ~45 s a frame: not used.

**Shot grammar (every shot list):** for each beat write shot size (ECU / CU / M / W / EW), angle (low three-quarter hero,
top-down, along a leading line), lens (mm), move (push, pull, arc, fly-through, hold), **the word that triggers it**, the
focus target, the foreground element.
- A new term gets a close-up; every "so what" gets a wide. Never two consecutive beats at the same size.
- Every move is motivated by a word: the camera goes where the sentence goes. No moving just to move.
- Rhythm: held push or arc 1–3 s with a long easing tail → at most one fast swoop (0.3–1.5 s) per turn → hold.
  Target per-frame motion like r45: median ~1.2 on the difference scale, spikes only at turns.
- Three planes in every frame: a foreground element passing or framing (glass edge, counter lip, a passing customer),
  the subject, a soft background. Moves are designed for parallax between them.
- Angles: low three-quarter on hero objects, looking down leading lines in diagrams; no flat front-on, no dutch.
- 9:16: subject in the middle band; top for the glowing label, bottom for captions.
- Light directs the eye: rim light separates the subject; a glowing outline ring marks what to look at; a light change
  marks a different world (analogy, flashback).
- No hard cuts: transitions are camera moves, the ring x-ray wipe, a fly-through, or a match move into an analogy set.

**Look v4 (under test):** perspective camera with lens and depth-of-field keys; ray-traced EEVEE (or Cycles, pick by the
measured cost); materials: brushed metal, clear glass for x-ray, frosted glowing "ice", copper/gold, emissive outlines;
a studio set (dark gradient backdrop, reflective grid floor, key + rim). Palette stays ours: dark + **green** in the role
r45 gives cyan; warm copper/gold for money and metal. SimReady hero props keep their real shapes up close.

**Process:** a camera-only animatic (grey boxes, real moves, the voice) is approved before materials and detail.

## Previous house format (V3, 2026-10-28 → 2026-11-01): cut-paper mixed media

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

### Anti-slideshow check (every cut; from wuwangzhang1216/DirectorSKILL)

Videos built from stills read as a slideshow when the cuts are lazy. Check each cut against these:
1. Something is moving in the last 12 frames of A and the first 12 frames of B, in the same general direction.
2. Change the shot size by two steps (wide → close), or the angle by 30°+; never two same-size, same-angle shots in a row
   (unless repetition is the device).
3. One continuous sound bed under the whole video, never restarted at a cut.
4. Let a movement start in A and finish in B (a hand reaches in A; the object is held in B).
5. Vary shot lengths: three cuts within 0.3 s of the same length tick like a metronome.
6. Change direction of travel at least once every four shots.
7. Never open two shots in a row on a static frame; if B starts still, give A a moving exit.
8. Every shot has at least two layers of motion (subject, something secondary, the environment or the camera).

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
