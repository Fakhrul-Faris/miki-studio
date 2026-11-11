# WORKING RULES — read this before every task in miki-explained

The user's instruction (2026-11-09): "create a document so you can refer every time you want to work so you don't
hallucinate. memory alone doesn't suffice." This file is the contract. If memory or a habit disagrees with it, this
file wins. Update it the same day a decision or a rejection happens.

---

## 0. Before any work (every time, no exceptions)

1. Read this file, then `LESSONS.md` (my past mistakes and the checks they created), then `STATUS.md`, then the bible of the style involved (`series-bible/BIBLE-A.md`, `-B.md`, `-C.md`). Before building or judging a look, also `craft-fundamentals.md` (build order, metrics, anchors, scale, set dressing, emphasis tiers; adopted 2026-11-11).
2. **Restate the target in 3 lines** to the user before building anything new:
   camera · what the world looks like (what stays as it is) · what changes and why.
   The 3 lines must keep the style's **locked traits** (§1) unless the user unlocked one by name.
3. **Fix only what the feedback names.** A note about detail is not a note about style. Never swap the style, the
   camera family or the world colour to answer a quality note.
4. New direction (new pipeline, new style, new episode format): plan first, wait for "yes".
5. Before showing anything, run the gates in §4 and say what still fails. Never call a test "final quality" unless it
   passes them.

## 1. The three styles — locked traits

Change a locked trait only when the user says so by name. "Make it better" never unlocks anything.

### Style A — the white model world (BIBLE-A)
| Trait | Locked value |
|---|---|
| Camera | **High three-quarter / near-isometric**, looking down at a whole street block (as in the EX29 baseline's opening, `EX29_mrdiy-margin/export/EX29-Final.mp4`). Low or impossible angles only for a hook beat, never as the default. |
| World | **Dark model world** (charcoal clay, cool moonlight) — user 2026-11-09 chose dark over white and dusk (`_tests/style-test-mrdiy/A2/stills/A1_white_dark_dusk.jpg`). Not realistic colour, not eye-level realism. |
| Subject | **One real subject** in full real colour and detail (the business's shop), everything else white. |
| Detail | **Full and dense**: detailed shophouses (mouldings, louvred windows, aircon units, signboards, pillars, arches, roofs, rooftop clutter, wires), a populated street (scooters, cars, trees, stalls, chairs, crates, posed figures). Never plain boxes. |
| Texture | White materials **with real surface texture** (plaster grain, tile and roof relief, normal maps, AO). Library models repainted white but keeping their normal maps. Materials from MaterialCraft / Poly Haven. |
| Light | Designed light: cool moonlight and soft shadows over the dark world; the subject is the warm light source (lit interior, glowing sign, light spilling onto the street); a few neighbour windows glow amber; haze; AO; bloom. Never flat even light. |
| Motion | A token (coin) travels and carries every handover; objects move inside the scene (shutters, lights, cartons); figures hold poses. |
| Renderer | **raea** (build and animate). Blender only to model or split assets that raea can't, exported as GLB. |

**Baseline (user 2026-11-09): EX29 full v1** (`04_episodes/EX29_mrdiy-margin/export/EX29_full_v1_sfx.mp4`, source
`_tests/style-test-mrdiy/A2/video_a.tsx`). Every new Style A episode starts from this file and must be at least this good.

**Style A — known failures in the baseline. The next episode must not repeat them** (user: "we can't repeat the same"):
1. **A line shown only in the voice.** L03 "factories, China, no middleman" had nothing on screen. Every claim in a line gets
   a visual (house rule "visualise the script"); check line by line before building.
2. **Plain stand-in sets.** The S3 drawers were boxes on a grey counter while a library cash-register model sat unused.
   No primitive-box set where a real model exists; search `A2/media/` and the libraries first.
3. **The dark world only on the street.** Interiors and inserts went bright beige/grey. Every set keeps the dark world:
   dark surroundings, the subject as the warm light.
4. **Token scale.** The coin was ~1 m across next to people. Keep the token believable next to figures (or make the
   giant scale a deliberate, stated idea).
5. **Small key reads in the final wide.** The "?" signs were tiny. A payoff object must read at phone size.
6. **Washout.** A camera inside a volumetric light cone or fog volume hazes the frame: dim the cone and fog when the
   camera is near (`near` in video_a.tsx), check contrast on every shot.
7. **Sound forgotten.** v1 was delivered silent. Sound (sparse SFX + bed) is part of every render, not an extra.
8. **Pass-through and flicker** (fixed in v1 except the coin grazing the rack at 10.4 s, which raea's clipping log reported — read that log): baked physics for falls; every path against every
   prop; stable part counts; no coplanar faces; chunked renders + `frames_check.py`.
9. **Speed** (3 h for one episode): see §5 "Render budget".

### Style B — the flat world of objects and light (BIBLE-B)
| Trait | Locked value |
|---|---|
| Drawing | **No outlines**; flat shapes; **subtle grain**. |
| Detail | Reference level (Josh Patterson, Malika Favre, Julian Burford's objects): considered silhouettes, inner detail (arches, slatted shutters, wires, tiles, texture inside shapes). **Never plain rectangles.** |
| Light | Light is a hard flat shape and it is the composition; two colours per scene (light, shadow). |
| Ideas | One invented everyday object per mechanism. **Every object must read without a caption** (rejected: the "MARGIN 2×" receipt, read as a stair). |
| Words | Numbers and the brand live on the world's own objects (tags, screens, signs). |
| Cutaways | Allowed, drawn flat. |
| Renderer | HyperFrames (SVG/HTML). |

**Style B baseline (user 2026-11-10): EX33 One Owner** — one continuous Three.js world inside HyperFrames, two-tone
toon (8-texel ramp), hard sun, words/logos on objects (`04_episodes/EX33_one-owner/build/world.src.html`). It stays the
baseline: the user preferred it over EX34 ("i like the ex33 better"). EX34's layers (shadow-only casters, a one-sun
colour script, sound from the picture's equations) are tools, not a recipe — they never replace EX33's density of
detail, its close readable objects or its calm motion. Notes and gotchas: `00_bible/hyperframes-capabilities.md`.

### Style C — the lit plate (BIBLE-C)
| Trait | Locked value |
|---|---|
| Place | **Malaysia** by default (true detail: red stools, the teh tarik pour, signs, scooters, wires). |
| Light | **Night/dusk** by default for F&B and street businesses; day for heritage. The business is the light source. |
| Texture | **Painterly grain** default; watercolour for heritage. |
| People | Faceless (back views, silhouettes, shadows); hold poses. |
| Motion | **Not a camera move over a still.** Plates are the look reference: real motion comes from Seedance (start and end keyframes per shot) and/or a raea rebuild; my overlays (logo, numbers, captions) go on the plates' own surfaces. |
| Renderer | ~~Seedream → Seedance~~ — **the user has no Seedream/Dreamina subscription** (2026-11-09). Build C locally: raea painted look (`<Look mode="paint">`) on a modelled night world, or ask what generator the user does have. |

## 2. Rules for every style (house rules)

- The **real business logo is on screen from frame 1**. Use official files only (`02_kit/brand/logos/`; sources noted).
- **Visualise what the line literally says**; a metaphor only when the line is one.
- **Captions:** EX15 panel at 36 px, bottom at y 1420. Never restyle.
- **Figures hold poses**; no hand-coded hands or faces; no tracing or cutting out generated images.
- **No harsh pops:** objects grow, fade or slide (about 0.4 s). Match cuts in identical framing are allowed.
- **Transitions are built from the scene's own objects.** No generic flashes, wipes or dissolves.
- **Accent colour comes from the brand and the story's meaning.**
- **Retired, never propose:** cut-paper collage, paper diorama, printed 3D. **After Effects is prohibited.**
- **Styles share techniques** (A, B and C borrow from each other), but each keeps its locked traits.

## 3. Feedback log — what was rejected and why (newest first)

| Date | What I showed | Verdict (user's words) | Lesson |
|---|---|---|---|
| 2026-11-11 | EX35 preview (white world, 10 fps flipbook) | "tone down the white … buildings pretty white washing … lack of texture … the world is pretty empty … slight flickering on shop's base … chair and table … easily missed … illogical visual, the app is poster/screen placed on the wall … make it 60fps … add meikigo logo at the end … tone down the sound effect" | A white world still needs value range: toned-down off-whites (#d7d0c4–#e6e0d5), relief maps everywhere, darker roofs and roads so the top-down reads. Fill the world (people, scooters, signboards, bins, a bus stop, traffic timed clear of the reads). Every UI device must make physical sense: phones are held by people (a card above the customer), never posters on shutters. Put the thing the line names where the camera looks. Previews at the film's frame rate when motion is judged. Meikigo end card on every episode (silent). SFX under the voice (sfx bus ×0.45). |
| 2026-11-10 | EX35 ZUS script + Style A plan (dark world) | "approve. let's try white world" | The user unlocked the world colour for EX35 by name: white model world, daylight, the subject (ZUS kiosk) the only colour. Dark stays the Style A default until the white episode is judged. |
| 2026-11-10 | EX34 final (AirAsia RM1, Style B + shadow storytelling / colour script / motion = sound) | "it become plain back, not enough detail. not good. and this topic should be longer. the motion is not on point … i like the ex33 better" | Detail and craft come before mechanisms (LESSONS §11). A story with a timeline (2001 → 2024) gets the long-edu length (60 s+), not 30 s. Keep the EX33 baseline; don't ship without the user seeing a preview when the direction is new. |
| 2026-11-10 | EX31 v1 (Grab car) | "the grab car go through another object" | Moving things get a path file + collision check before any render (`EX31_grab-cut/build/paths.py`: oriented footprints vs every obstacle, every frame; the film reads the same file). Read raea's clipping log on the preview AND every render chunk — EX31's log had the warnings and I didn't read it. Keep foreground props off tracking-camera lines. |
| 2026-11-09 | EX30 v1 L04 (worm's-eye factory, 97% in the sky) | "i'm not sure what being shown on this scene" | Name the place on the place (logo on the building); side-on objects read, head-on silhouettes don't; never let the key prop overlap the scenery. Ask of every frame: would a muted viewer know what this is in 1 s? |
| 2026-11-09 | EX29 full v1 (39 s, silent) | "this is the new baseline for style A … take note on what's failing. we can't repeat the same on next episode … where's the sound effect … why i took so long" | Baseline + failure list in §1; sound in every render; render budget in §5. |
| 2026-11-09 | A video v2 | "everything looks good. but some of the scene do look washed out" | Volumetric cone/fog washout (failure 6). |
| 2026-11-09 | A video preview v1 (26 s, voice-timed) | "flickering … at the shops curb … on 0:18 … some object pass through other object. that defeat realism … the coin can receive more detail … the stamp should be stamp glb" | Physics bake, flicker causes (§6), reeded coin, real stamp model. |
| 2026-11-09 | A v3 lighting test: white / dark / dusk | "i actually like dark better" | Style A world = dark, the business is the light. |
| 2026-11-09 | A v2: eye-level realistic street in raea | "should it be isometric with white building and world… this is completely opposite" | Fix the named dimension; never swap the style. |
| 2026-11-09 | C v1: EX26 pipeline (camera push over plates, amber flash) | "exactly the same before we did the analysis… you learned nothing… this is simple camera movement" | Design from the bibles' motion rules; plates are references to recreate. |
| 2026-11-09 | B v1: flat SVG stills | "geometry too basic… is it a receipt or a stair? renders generic" | Reference-level detail; every object readable without a caption. |
| 2026-11-09 | A v1: Blender clay boxes | "world too empty, building too plain, no texture, shape too basic, lighting too cheap" | Look tests need final-level detail. |
| 2026-11-09 | Blender suggested as renderer | "justify why blender when we have raea?" | raea renders; Blender only builds. |
| 2026-11-08 | Style A–C bibles drafted | decisions in BIBLE-A/B/C §12 | — |

## 4. Gates before showing anything

1. **Locked traits:** does it match §1 for its style, trait by trait? Name any that differ.
2. **The named feedback:** for each point in the latest verdict, show where it's fixed. Compare with the image the user
   pointed at.
3. **Readable without a caption:** every object, number and metaphor.
4. **Not a slide:** an angle, a light decision, one meaningful accent, real detail.
5. **Motion test:** something moves inside the scene in every shot; handovers use scene objects.
6. **Measured evidence** (2026-11-11): `tools/raea/frame_metrics.py` on the preview frames (`preview.sh … A|B` prints it)
   — no BELOW-BASELINE, every per-frame flag fixed or explained; zero clipping lines; none of the automatic failures in
   `craft-fundamentals.md` §4. Never add clutter just to move a number.
7. Say plainly what still fails, as a verdict: **SHIP / SHIP WITH NOTES / NO-SHIP** with blockers, majors, minors. Don't over-claim.

## 5. Tools — who does what

| Job | Tool | Notes |
|---|---|---|
| 3D render and animation (Style A, C rebuilds) | **raea** (`raea render EDIT.tsx --frame N -o F.png`) | Load the `raea-bevy` skill first. Portrait frames are narrow; RectLight needs `range`. |
| Model / split / rescale assets | Blender (`blender -b -P script.py`) | Export GLB for raea. Never the renderer. |
| Library models | Poly Haven (CC0, API with a User-Agent header), Poly Pizza (CC-BY; GLB link on the model page) | Credit CC-BY in the episode. |
| Materials and textures | **MaterialCraft** (`materialcraft-cli new pbr / export / render`), **TextureCraft** (`texturecraft-cli`), Poly Haven textures | Installed 2026-11-09 (apps in /Applications, CLIs in ~/.local/bin). Export PBR maps (basecolor, normal, roughness, AO, height) for raea. |
| Flat motion (Style B) | HyperFrames | `flat-v3-playbook.md`. |
| Plates and video (Style C) | Seedream / Seedance (the user generates from my prompts) | Prompts short (memory `short-generation-prompts`). |
| Voice | **Kokoro-82M local, `am_michael`** (`npx hyperframes tts … -v am_michael`, needs `HYPERFRAMES_PYTHON` → a venv with `kokoro-onnx soundfile`) | User 2026-11-10 on EX33: "it has so much character" — preferred over the Eleven voice. Free, offline, seconds per line; no v4 tags (plain text, numbers as words); check brand names by ear. |
| Captions | raea `tools/raea/kit/Captions.tsx` (EX15) | Built from `audio/vo_timeline.json` (`EX29_mrdiy-margin/build_vo.py`, `fix_caps.py`). |
| Loudness | **−14 LUFS integrated**, measured and corrected (`EX28_apple-charger/build/sfx.py`: loudnorm's single pass lands 1–2 LU off) | Set 2026-11-09 for EX28/EX29 (the B playbook's old −18.5 is superseded). |
| SFX | `EX29_mrdiy-margin/sfx_ex29.py` pattern: library samples + synthesised shutter / coin clinks timed from the physics bake, drone bed, loudnorm −14 | Part of every render. Sparse; silent ending. |
| **Frame metrics** (2026-11-11) | `tools/raea/frame_metrics.py DIR_OR_IMGS --style A\|B` (also printed by `preview.sh`) | Edge density, one-colour share, entropy, contrast, mean; per-style house baseline calibrated on EX29/EX33/EX34/EX35. Signals, not verdicts. |
| Precise hard-surface props (trial) | **text-to-cad library** in `tools/cad/.venv` (build123d 0.13 → GLB, metres, Y up) | Installed 2026-11-11, project-only: library only, no server/plugin, so nothing is sent. Pattern: `tools/cad/props/espresso.py`; skill docs in `tools/cad/skill/`. Only for props no library has (machines, printers, POS, kiosks). raea renders. |
| **Render budget** (user 2026-11-09: "apply things to make it faster from now on") | Looks: `tools/raea/preview.sh EDIT.tsx f1,f2,… sheet.jpg` (540 px, one batch). Final: `tools/raea/render_ep.sh EDIT.tsx FRAMES OUT.mp4 AUDIO.wav [cuts]` (300-frame chunks, every frame checked, bad frames auto-repaired) — once per approval | Collect all fixes, then one render. Never a full render to check a single change; never wait on a render without working on the next step. Physics: bake once, pick the seed with `phys_check.py`. |
| Physics (drops, bounces, settling) | **Blender rigid body (Bullet) baked** → JSON → raea plays it back (`_tests/style-test-mrdiy/A2/phys_bake.py`, `phys_check.py`) | User 2026-11-09: objects must never pass through each other. Pick a seed that passes the check (every body in place, still once settled). |

## 7. The shot loop (adopted 2026-11-09 from the user's multi-engine brief)

Every shot, every style, in this order. No step skipped, no "final quality" claim without step 6.
1. **Reference image** for the shot: a bible north star, a frame the user pointed at, or a plate the user generates.
   Saved next to the build as `ref_<shot>.png`. The render is judged against it. Write `ref_<shot>.md` from
   `templates/ref_analysis.md` before any code (camera, fill %, key light, 5–8 hex, materials); match the camera first.
2. **Grey box**: camera path, subject positions, the token's route and timing with plain shapes, **at real scale**
   (`craft-fundamentals.md` §7 table). User approves it.
3. **Build** detail on the approved grey box (locked traits §1), in order: forms → materials → light → effects; one
   variable per pass. Dress by story clusters and zones (`craft-fundamentals.md` §8); scatter seeded and validated (§9).
4. **Render** preview frames (raea `--w 540 --h 960` for speed).
5. **Independent critic**: a separate review agent that sees only the render, the reference, the brief, the
   **anchors** (`00_bible/anchors/`, looked at first), the automatic-failure list and the `frame_metrics.py` line (never my
   code or reasoning). It scores 1–10: light, composition, materials/texture, colour, detail density, readability,
   artifacts, match to locked traits; and lists the top 5 fixes. Fix and re-run until every score is ≥ 7 or progress stalls.
6. **Evidence to the user**: reference vs render, the critic's scores before/after, what still fails.

## 8. Engine capability registry (what each one really does — don't invent)

| Engine | Really does | Does not |
|---|---|---|
| raea | Real-time Bevy 3D: models, PBR + textures, lights, shadows, fog/volumetrics, bloom, AO, DoF, grade, tone map, paint/cartoon looks, posed bodies (Character), animation per frame, captions, 2D over 3D | Path tracing, neural denoise/refine, generative imagery |
| Blender | Modelling, splitting, rescaling, UV, baking; exports GLB | Our final renders (user ruling) |
| MaterialCraft / TextureCraft | Procedural PBR materials / painted texture sets, exported as map sets | Rendering scenes |
| EffectCraft | Effects/compositing for what raea can't do (ask first) | Default part of the pipeline |
| text-to-cad (trial, 2026-11-11) | Parametric hard-surface parts in Python (build123d/OpenCASCADE) → GLB/STEP; exact dimensions, joints | Organic shapes, people, textures; our renders (raea renders) |
| Seedream / Seedance (user runs) | Plates; image-to-video between keyframes | Exact numbers, exact object paths |
| raea + avian physics | Real physics in a render | A body spawned mid-shot arrives already settled; switching body type panics → can't time a drop to a word. Bake in Blender instead |
| Style C hybrid (to test) | raea renders depth / outline / colour-ID passes → Seedance stylises with exact layout and motion | Unverified until a test shows Seedance accepts those passes |

## 6. My known failure patterns (check myself against these)

- **Overcorrecting:** answering a quality note by changing the whole style.
- **Reaching for the old pipeline** (EX26 plates.py, isokit boxes, plain SVG) instead of designing from the bible.
- **Not re-reading the bible** before rebuilding.
- **Showing work without checking it against the user's named feedback** and the image they referred to.
- **Over-claiming quality** ("final quality") before the gates pass.
- **Judging my own renders**: always run the independent critic (§7.5).
- **Objects passing through each other** (coin through kerb, floor, man, stock through the shutter): check every path
  against every prop's footprint; use baked physics for anything that falls.
  **Gate (2026-11-10):** a `paths.py` collision check (exit 1 on any overlap) + zero `clipping` lines in raea's preview
  log and in every `media/_render/c*.log` before showing anything.
- **Flicker** (user 2026-11-09): (1) a part count that changes between frames makes raea re-match parts in tree order,
  so models swap every other frame: keep every part on every frame (hide by tiny scale), name moving parts;
  (2) coplanar faces z-fight (two kerbs); (3) a physics body that never settles; (4) rare all-black GPU frames in long
  renders: render to PNGs, find black frames, re-render them with `--at`; (5) single runs past ~700 frames put the
  camera wrong on alternate frames (EX29, 1,182 frames): render in fresh 300-frame chunks (`A2/render_chunks.sh`).
  Run `frames_check.py` on the joined frames before showing.
