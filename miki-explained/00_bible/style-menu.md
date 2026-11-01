# Style menu: Opuscar beats (from 2026-11-01)

The user's picks from **Lemo-Opuscar** (github.com/lemomo-ai/lemo-opuscar, MIT code / CC BY 4.0 demo films; films we make
are ours). Library installed at `~/lemo-opuscar` (`npm install` done; `setup.sh deps` still to run for the `.venv`).
Each style is an HTML page drawn in code (Canvas 2D or three.js), rendered frame by frame in headless Chrome:

```
node core/render/still.mjs <page_dir> 1.5 6 --size 1080x1920            # review stills
node core/render/video.mjs <page_dir> --fps 24 --workers 3 --size 1080x1920 --out beat.mp4
```

Output is an H.264 mp4 (no alpha; patch `video.mjs` for PNG + `omitBackground` if a beat must overlay). **EffectCraft still
cuts the episode** (voice, subtitles, sound); an Opuscar beat is one more clip, like a Blender render.

**How we use them (user decision, 2026-11-01):** as single beats inside the collage format first (evidence, diagram,
reveal), then whole-episode looks once a style has proven itself. Rules for every beat:
- Respect the style's `STYLE.md` invariants, then map our palette and type into it where the menu says it fits.
- **Vertical is a re-layout, not a crop.** All demos are 1920×1080; only Caption News has a 9:16 rule. Lay each page out
  from `innerWidth × innerHeight` and keep words and key subjects inside the TikTok safe area (x 60–960, y 160–1440).
- **Sources**: the evidence styles require real, licensed material (PD, CC0, CC BY). Generated stills are never shown as
  proof; Disney photos/footage aren't free: use Wikimedia Commons CC images or a schematic, labelled as such.
- Fonts: Anton + IBM Plex Mono where the style's type role allows; otherwise keep the style's face for that beat.

## Fit table (29 picks)

✓ = palette/fonts map cleanly · ◐ = partly (keep one invariant of theirs) · ✕ = fights our look (beat-only, sparingly).

| Style | Category | Best beat for us | Fit | Notes |
|---|---|---|---|---|
| **Constructivist Montage** (kino-montage) | Edit & Doc | any: hook, evidence, reveal, end | ✓ | Already paper/ink/one colour, cut-out photos, diagonal type bands; red → ochre, Anton for numbers. Wants real photos for its cut-outs |
| **Broadcast News Package** (news-package) | Edit & Doc | hook, evidence, verdict | ✓ | Graphics only: split-flap before/after, quote card with underline, one stamp. Drop the lower-third strap (TikTok UI) |
| **Caption News** | Edit & Doc | hook, evidence | ✓ | The only one with a 9:16 rule (1080×1560 footage band, captions stacked under). Big number rolls in by frame 4; PDF line highlight |
| **Visual Investigation** | Edit & Doc | evidence, twist, diagram | ◐ | Then-vs-record strike, freeze-circle-magnify, plan + view cones ("the wall hides the line"), known/unresolved board. Dark ground → flip to paper |
| Sports Telestrator | Edit & Doc | diagram over a photo/clip | ◐ | Ring, arrow, red "uncovered" patch, flatten to top-down. Three colour roles → ink/ochre/alarm |
| 1920s Newsreel | Edit & Doc | period hook | ◐ | Needs PD archive; no colour accent allowed |
| Live Countdown Split-screen | Edit & Doc | rare | ✕ | Needs synced real-time footage of one event |
| Time-lapse Symphony | Edit & Doc | 3–5 s atmosphere | ✕ | Music only, no narrator |
| **Data Physicalization** (data-physical) | Evidence | evidence, payoff numbers | ✓ | Stats as stacked objects ("1 plate = 1 min"), paired climb, last object engraved. Two tall stacks suit 9:16 |
| **Engineering Briefing Board** | Evidence | diagram, reveal, ending pull-back | ◐ | Whiteboard wall, cut-out photos with magnets, quantities as dimension lines; reframes to vertical easily |
| Archive Light Table | Evidence | evidence on a real document | ◐ | Loupe lands, "the line lights up", two records side by side. Cool table (vs our warm paper); needs real scans |
| Satellite Briefing | Evidence | hook / ending (orbit ↔ ground) | ◐ | Real imagery (USGS NAIP is PD); heavy first fetch |
| Projection on White Model | Evidence | diagram (light a building) | ◐ | Needs real footprint data (OSM ODbL: ask first) |
| Exploded Teardown | Evidence | an object opened | ◐ | Needs CAD files |
| LiDAR Survey · Microscope Story | Evidence | — | ✕ | Data the explainers rarely have |
| **Spy Title Sequence** (spy-titles) | Graphic & Type | hook, twist, montage | ✓ | Saul Bass cut paper; type is the set, stop-time freeze on a number. Closest to our cut-paper language; Anton as display face |
| ASCII / CRT Terminal | Graphic & Type | a board/log cutaway | ✕ | Dark glass + one phosphor (amber ≈ ochre) |
| **Printed Long Take** | Print | cold-open hook, ending | ◐ | Scratchboard print in one camera move; ink/paper/one accent maps; one serif carved into the world (no Anton). Heaviest build |
| **Data Storytelling** (dataviz) | Info & Keynote | evidence, payoff | ✓ | Real data drawn by pencil on cream, notes pinned to marks, "the headline revised" (strike a word, write the true one); Plex Mono ticks |
| **Isometric Picture Book** | Info & Keynote | mechanism, payoff, Bridge | ✓ | Faceless people act out a rule in one place; floor type, lid off, bars on the ground, order arrows. Its genre is queue manners |
| Isometric Infographic | Info & Keynote | diagram, mechanism | ◐ | Cutaway, Isotype counts, focus + context; wants 5–7 hues |
| Transit Map | Info & Keynote | route/network stories | ◐ | Needs real network data (5+ lines, 40+ stations) |
| Circuit Board | Info & Keynote | flow path | ✕ | Must stay green |
| Dark Tech Keynote · Hologram HUD | Info & Keynote | a giant number / an object spec | ✕ | Dark cool stage |
| Living Screencast | Info & Keynote | a Meikigo app ending | ◐ | Product UI only |
| **Memphis Diorama** | Materials & 3D | mechanism (cutaway) | ✓ | Paper ground, ink outlines, halftone shade, Plex Mono already; cutaway lifts a wall to show what's inside; tiny walkers (no close-ups) |
| **Desktop Flythrough** | Materials & 3D | data/app beat, Bridge | ✓ | Printed app cards on a desk, a whip between them, a number rising out of a card; one accent "for what matters now"; caption-safe framing built in |
| **Paper Pop-up Book** | Materials & 3D | old-vs-new mechanism | ◐ | Pull-tabs, page turns; closest to our paper; recolour its saturated palette |
| Tilt-Shift Miniature | Materials & 3D | crowd/system, time-lapse → real time | ✕ | Depends on oversaturation; capsule people |
| HD-2D | Games | establishing mood | ✕ | Light-led, game feel |

**Best overall fits:** Constructivist Montage, Broadcast News Package, Caption News, Data Storytelling, Isometric Picture
Book, Spy Titles, Memphis Diorama, Desktop Flythrough. **Blender printed 3D stays** for beats that need readable people
or an orbit around a crowd (Opuscar's crowds are capsules or tiny walkers).

## In the stacked experiments

New group **V (visual style beat)** in `03_ideas/experiments.md` § 12: one Opuscar style per episode carries one or two
beats; log which and how it did.
