# Flat geometry v3 (Style B) — playbook

Built on EX27 "The 10% Off That Costs More" (Shopee 11.11), approved 2026-11-08 ("ok this is good"). This is a **baseline,
not a template**: reuse the method, the kit and the checks; never reuse the frames. Each new episode changes the palette,
the camera moves, the asset design and the compositions while keeping the style. Style B competes with Style A (smooth
iso v2, EX25 99 Speedmart) on performance — see `03_ideas/experiments.md` and the episode's § Post.

Benchmark: TomTom "Priority Driving" (`04_episodes/Vimeo File 720p.mp4`): a new viewpoint per beat, one through-line that
carries every transition, flat 4-colour geometry, transitions built from the scene's own assets.

## The rules (in order of importance)

1. **Visualize the script, not a metaphor.** For every line, draw what it literally says (the price, the shelf, the date,
   the law, the listing, the price history) with the spoken numbers on the objects. A metaphor only if the line is one.
2. **The business's real logo from frame 1**, before any caption names it (viewers watch muted). Real files only.
3. **A new viewpoint per beat:** top-down map · flat side elevation · top-down abstract map · one-point horizon (EX27). Pick
   the next episode's set fresh; do not repeat EX27's order.
4. **One through-line** that every scene hands to the next. EX27: the orange price line (a lane on the map, the price level
   on the shelf, the route the law blocks, the road to the horizon).
5. **Transitions are made of the scenes' own pieces** — never a plain cut, zoom, dissolve or slab over the frame
   ("dont do cheap work"). See the catalogue below.
6. **Objects and icons only.** No hand-coded hands, faces or people (they came out as clip art). Tiny pictogram people at
   most.
7. **Palette per episode:** paper ground + 2–3 colours + one alarm. EX27: paper `#E4E1D9`, cobalt `#2E54C6` / `#21409C`,
   ink `#1C2554`, orange `#F05A28` (the through-line and "too much"), lilac `#A79BF2`. Never black + green (that is Style A).
8. **Type:** small bold kicker (Inter Display Bold 40, +3 tracking) over a black caps line (Inter Display Black 84–120),
   sitting in the scene's empty space, no panel. Words rise out of a mask on their spoken word.
9. **Captions:** EX15 panel at **36 px** (user 2026-11-08: the 46 px panel took too much screen), bottom at y 1420.
10. **Motion:** 0.5 s ease-in-out `cubic-bezier(0.65,0,0.35,1)` ("io"); critically damped springs for entrances (no
    bounce); 80–120 ms overlap; slow organic drift on a wrapper; no linear motion except internal clocks.

## Pipeline (EX27 as the worked example)

| Step | Output | Gate |
|---|---|---|
| 1 Script + voice | `episode.md`, `audio/voice.wav`, `audio/vo_timeline.json` (as before) | script approved |
| 2 Line-by-line visual plan | per line: what it says → what we draw → viewpoint → through-line role | plan approved |
| 3 Two style stills | `styleframes/make.py` → `hook.svg/png`, `twist.svg/png` (the opening and the signature frame) | stills approved |
| 4 Build | `build/hf_v3.py` (+ `build/flatkit.py`, `build/hf_build.py` for captions/grain/helpers) → `hf/` | — |
| 5 QA | check, snapshots, transition strips, frame-diff, loudness (below) | — |
| 6 Preview | draft render → user | preview approved |
| 7 Final | delivery render → `export/EXNN-Final.mp4` | — |

Commands (from the episode folder):
```
~/.local/bin/uv run --with pillow python build/hf_v3.py        # writes hf/index.html + hf/compositions/*.html
cd hf && npx hyperframes check --json                           # must be 0 errors
npx hyperframes snapshot --at 0.4,3.4,... --no-end -o <dir>     # stills at chosen times
npx hyperframes render --quality draft --fps 60 -o ../out/preview.mp4
npx hyperframes render --quality delivery --fps 60 -o ../export/EXNN-Final.mp4   # ~40 s for 37 s
```
Pillow is needed: it measures headline widths so the wipe stripes fit their words. Telemetry is off.

## File layout

- `build/flatkit.py` — palette and drawn pieces: `block` (top-down building with a 45° extrusion), `hatch`, `tree` (offset
  shadow), `van`, `parcel`, `voucher`, `cloud`, `house`, `vacuum` (hand-drawn, `vec/draw/F3.svg`). Add new pieces here;
  every shape is drawn, nothing traced.
- `build/hf_build.py` — shared: `t(line, word)` word times, `W_` word masks, `PRELUDE` (spring, drift, rise, sink, count),
  `overlays()` (EX15 captions at 36 px + grain).
- `build/hf_v3.py` — the film: one function per scene (`s1`…`s4`), each returning a HyperFrames scene file; `scene()` wraps
  styles/script and defines `wipe()`; `stripes()` sizes wipe bars; `wave()` builds the rising sea.
- `styleframes/make.py` — static style stills for the gate.

## Scene structure (EX27)

| Slot | View | Content (what the line says) | Hand-off out |
|---|---|---|---|
| 0–8.5 s | top-down marketplace map | Shopee logo, "RM11 million in vouchers" (vouchers rain), "10% off costs more" | city breaks apart; lane → price line |
| 8.4–22.1 s | flat side elevation, one continuous shot | "usually RM500" (shelf rises to the line), "before 11.11" (calendar tile), "lifts it to 600" (block grows), "10% off … RM540" (ghost RM500, orange RM40 slice), "feels like a deal" (sticker) | rising sea |
| 21.95–29.95 s | top-down abstract map | "illegal … Consumer Protection Act" (gate across the listing's route, CPA sign), "Shopee suspends listings" (card goes dark) | cloud front |
| 29–37.1 s | one-point horizon | "check last week's price" (the hills are the price history 500/600/540), "drop it below", end card (sun → Meikigo logo, silent) | — |

## Transition catalogue (built and approved in EX27)

1. **Break-apart (map → elevation).** Every building, tree, van and road half is its own `<g class="pc">` with `data-d`
   (delay: outer pieces first, then top to bottom) and `data-x` (travel; trees/vans × 1.35 for parallax). One `fromTo`
   with function-based `x` and `stagger`. Parcels spin out sideways. The through-line is left alone, thins (scaleX 0.14)
   and swings flat (rotation −90 about `svgOrigin`) onto the next scene's line at the same height.
2. **Assembly (arrival).** The incoming scene is built around the through-line: floor rises, skyline grows from the
   horizon (`scaleY` from `50% 100%`, stagger from centre), clouds drift in from both sides.
3. **Rising sea (elevation → map).** `wave()`: two sine-topped bands two wavelengths wide; the group rises 2200 → −470 while
   the bands slide in opposite directions (crest motion); the outgoing world sinks −260 for parallax. The next scene's
   ground colour = the sea colour.
4. **Drop-in (map arrival).** Blocks land row by row: scale 1.45 → 1 with `power2.in` (top-down falling reads as shrinking),
   then a 0.94 squash. Props (gate, listing) arrive after the city lands.
5. **Cloud front (map → horizon).** ~40 three-lobe two-tone puffs: grow from the right (scale 0 → 1, staggered by x), hold
   ~0.5 s closed, part from the middle outward staying solid (x/y push, scale 0.7), fade only in the last 0.2 s. The next
   world switches on underneath while closed.
6. **Stripe wipe (headline swap).** Bars per headline row, each sized to the longer old/new line (`stripes()` measures with
   Pillow), `z-index` above the text; sweep in from the left, the text swaps under them, sweep out to the right.
7. **Sun → logo (end card).** The sun lives above the paper cover; it rolls to centre and shrinks as the logo springs in.

## Gotchas (each cost a render)

- **`svgOrigin` / transform origin must be set before the first scale or rotate** (`gsap.set(el, {svgOrigin})`), never only
  in the `to` vars: GSAP compensates the origin change with a translation and the shape jumps (the shelf drew above its
  line).
- **Drift and camera moves must live on different elements** (`#sN-cam` > `#sN-drift`): `drift()` sets x/y every frame and
  silently overrides any tween on the same element (the tilt vanished).
- **A scene's host id is not on the page once mounted**: scope CSS and selectors to the inner wrapper `#sN-w`, never `#sN`.
- **Dashed strokes can't be "drawn on"** with `strokeDashoffset` (the dashes just march); fade them in instead.
- **Anything above a cover layer shows through it** (the sun appeared over the closing clouds): gate its opacity with the
  world's.
- **Slot overlaps:** the outgoing scene must stay alive until the incoming transition fully covers it (S3 had to run to
  29.95), or the page background flashes (frame-diff spike).
- **`fromTo` on the same property later in the timeline needs `immediateRender: false`**, or it resets earlier frames.
- **Scroll + break-apart conflict:** stop the camera scroll (custom ease that settles) before pieces leave.
- **SVG text from `count()`** needs `transformOrigin: "50% 50%"` set first, or the 1.08 → 1 settle drifts.
- **resvg (stills) needs `font_dirs=[~/Library/Fonts]`** for Inter Display.

## QA (do all before showing a preview)

1. `npx hyperframes check --json` → 0 errors; read every warning.
2. Snapshots at every beat (16–20 times); look at each.
3. **Transition strips:** `ffmpeg -ss <t> -i preview.mp4 -vf "select='not(mod(n\,6))',scale=180:-2,tile=8x1" -frames:v 1`
   across every hand-off and every headline swap. Look for leftovers, early reveals, stacking order.
4. **Frame-diff:** `tblend=all_mode=difference,signalstats` YAVG per frame; the top values must be deliberate motion
   (EX27 final max 14). A spike at a slot boundary = a gap between scenes.
5. Loudness about −18.5 LUFS (`ebur128`).
6. Logo visible at frame ~0.3 s; captions clear of key labels; text inside 168–1330 px except captions.

## What failed (don't repeat)

- Tracing the user's generated images (vtracer, split into parts): still a cut-out; the user called it the retired
  paper-cut look.
- Hand-coding hands and people in SVG: clip art ("so fucking hideous").
- Cheap transitions (zoom into the lane, tilt to the floor, an opaque cloud slab): replaced by the catalogue above.

## Improve next time (backlog)

- **Sound designed for the visuals**: EX27 reused the raea mix (hits on words). Add hits on the break-apart, the wave crest,
  the drop-in landings, the gate and the cloud parting (`tools/sfxsynth`, sparse; silent end card).
- **Camera**: EX27 moves are push/pull/tilt/truck inside 2D scenes; try a real orbit or a parallax dolly through layers.
- **Captions vs zoom**: the map scene's opening zoom put the listing card under the caption panel for ~1 s; plan zoom
  framing against the caption band.
- **Through-line variety**: a different through-line each episode (EX27 = a price line).
- Style stills for **every** beat before the build, not two.
