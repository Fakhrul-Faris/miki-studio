# Style C — illustrated plates (from EX26 Starbucks, approved 2026-11-08)

One of three styles competing on performance (calendar § Style test): **A** smooth iso v2 (EX25, raea) · **B** flat
geometry v3 (EX27, HyperFrames, `flat-v3-playbook.md`) · **C** illustrated plates (EX26, this file). EX26 is a baseline,
not a template. Each Style C episode has new plates, a new palette and new camera moves; only the method carries over.

## The look (anti-slop rules)
Target: `04_episodes/EX26_starbucks-float/styleframes/refs/1–3.png`. Approved plates: `EX26…/media/P1–P5.png`.
- **One idea per frame, told through a cinematic choice:** a worm's-eye or high angle, scale contrast (tiny people against a giant cup), quiet space.
- **Light tells the story:** grain-stippled shafts, pools and glows; a dark frame around a lit subject.
- **Shadows and reflections act as a second character** (P2: the shadow holds the coffee he hasn't bought).
- **Cool palette, one warm accent that means something** (EX26: amber = the money).
- **Each plate draws what its line literally says** (`visualize-the-script`).
- **The test:** if a frame could be a slide in a deck, it's slop.

## Who makes what
- **Plates (the user):** the user generates them in Seedream (Dreamina) from my prompts, one per line. Make P1 first as the style anchor, with the refs attached; P2–Pn then reference it. The plate aspect follows the camera move. Plates carry **no text, numbers or logos**, and phone screens stay blank. Prompt template: `EX26…/image-prompts.md`.
- **Plates are used whole:** never cut out or traced (that's the retired paper look).
- **Figures hold their poses:** the people in the plates never move. Moving people would need raea (IK, motion capture, motion matching), tested separately first.
- **Everything else is mine:** the camera, depth, light breathing, vector overlays (numbers, cards, coins, arcs, logo), EX15 captions, sound and the end card.

## Pipeline (EX26 files are the reference implementation)
1. **Depth maps:** Depth Anything V2 Base (`tools-venv/depth`, removed 2026-11-09 to save space: reinstall with `uv venv tools-venv/depth` + the model before using this pipeline again) on each plate → `plates/P{n}_depth.png`.
2. **Camera paths:** `build/cams.py` holds the scene slots plus keys `(time, x, y, zoom)` in preview px (the plate at 1200 px tall). Moves ease with cubic-bezier(.65,0,.35,1), and a two-sine drift keeps holds alive. Neighbouring slots overlap so the hand-offs have room.
3. **Plate moves:** `build/plates.py depth|plain [--still t,…]` renders `plates/S{n}_{mode}.mp4` (1080×1920, 60 fps) and `S{n}_cam.json` (per-frame camera). The depth warp moves near things more than far ones. The overlay plane (REF) stays fixed, and warm light breathes ±6 %. Check the framing with `--still` before rendering in full.
4. **Overlays:** `build/hf_ex26.py [depth|plain]` builds the HyperFrames project. Each scene is a `<video>` of its plate move plus a `.pin` layer that follows the same camera, frame by frame (`pin()`), with screen-space elements on top. Captions come from the shared EX15 code (`EX27…/build/hf_build.py overlays()`), plus animated grain at 12 fps.
5. **Sound:** `build/sfx.py` places sparse hits on the visual events; nothing plays on the end card.
6. **QA:** `npx hyperframes check`, then `snapshot --at` on every hand-off (several frames each), then render.
   - EX26 rendered in about 90 s.
   - Show the user a depth-vs-plain clip if in doubt (`export/EX26-depth-test.mp4`).

## Hand-offs (built from the plates, never a dissolve)
- **Glow → glow:** the camera dives into a light source (a phone, the coin stack). A soft screen-blend bloom with a bell falloff floods the frame to a light fill. The next scene opens out of its own light source.
- **Object becomes object:** the paid coin grows and tilts to match the painted crane coin, and the next scene opens through a tilted-ellipse iris inside its face.
- **Light-shaft wipe:** the next plate's own light-shaft angle, as stripes. It's a single JS polygon with the stripes joined below the frame.

## Gotchas (learned on EX26)
- **Depth tearing:** uncapped parallax doubled heads and smeared figures on long moves. Cap the depth shift at LIM ≈ 60 px of camera travel (≈ 30 px real) and keep the zoom term small (KZ 0.12). Blur the depth map by σ 2.
- **SVG clip-paths don't render:** `clip-path: url(#svgClip)` on an HTML element does nothing in the HyperFrames render. Use `polygon()` built in JS.
- **Glows:** a radial gradient with few stops reads as a cartoon disc and shows rings. Use 16+ stops on a bell curve with `mix-blend-mode: screen`.
- **Hidden fromTo:** a `fromTo` that reveals a hidden element must carry `opacity` in the destination too (lint error), or use `tl.set` first.
- **Scene order:** later scenes sit above earlier ones. Keep an incoming scene at opacity 0 until the outgoing scene's hand-off has covered the frame.
- **Caption blocks:** one sentence per block, and a long sentence splits at its middle comma. A block must never run across a scene change.
- **Type floor:** pinned UI scales with the camera. Size it in preview px so it renders ≥ 28 px on screen at that moment's zoom.
- **What git ignores:** plates (`media/*.png`), plate moves (`plates/`) and `hf/assets/plates/` are git-ignored. They live on this Mac; push the finals to Telegram.
