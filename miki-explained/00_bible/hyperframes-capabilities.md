# HyperFrames — what it can do beyond what EX28/EX32 used (checked 2026-11-10, v0.9.29)

EX28 and EX32 used: flat SVG + CSS clip-path, GSAP, grain overlay, captions, `check`, `snapshot`, `render`. That is the
floor. Verified on this Mac (M5, hardware GPU in the render browser) in a scratch project — all four rendered correctly:

| Capability | Proof | What it gives Style B |
|---|---|---|
| **Three.js inside a composition** (`three@0.184` ESM from jsDelivr, GLTFLoader, RoomEnvironment, PBR) | `product-turntable`: a metal can on a plinth, real reflections | real 3D objects (a library GLB) lit flat / toon, sitting in the flat world; real perspective turns instead of fake 2D ones |
| **WebGPU shaders** (Shaders library, `lib/shaders.iife.js`) | `marble` | living fields: ink spreading, marbling, liquid, halftone light — light as a moving shape, not a static patch |
| **HTML-in-Canvas** (live HTML drawn into WebGL) | `vfx-shatter`: a page breaks into glass shards in 3D | any flat scene can shatter, fold, ripple, wrap onto a 3D surface — real 3D transitions *of* the flat art |
| **Isometric 3D layer stacks** (`exploded-stack`, RoundedBoxGeometry) | layers explode apart with labels | "how it works inside" beats as real depth |

Other catalog pieces worth using (448 items; `npx hyperframes catalog <words>`, install `hyperframes add NAME --no-clipboard`):
- **Transitions built from the image:** `ink-bleed-reveal` (ink blooms through paper), `halftone-dissolve`,
  `light-sweep-pass` (a key light re-shades the scene), `domain-warp-dissolve`, `sdf-iris`, `ridged-burn`, `whip-pan-cut`.
- **Camera:** `camera-dolly-zoom`, `rack-focus` (real aperture bokeh), `camera-shake` (9 measured profiles),
  `caption-camera-follow` (a sentence across a world bigger than the frame), `pan-stations`, `pull-back-reveal`.
- **Motion quality:** real **motion blur** (`data-motion-blur="on"` on the root; shutter 240°; `capture` tier streaks
  turns and zooms truthfully), `echo-smear`, `pendulum-swing` (gravity-damped swings — EX32's dangling printer, done right).
- **Data:** `chart-story`, `bar-chart-race`, `world-map` / choropleths, `mk-line-graph`, `conic-progress-ring`.
- **Looks:** `ordered-dither-pass`, `ascii-render-pass`, `filmed-screen` (scene filmed off a screen, depth of field),
  `texture-mask-text`, `particle-text-dissolve`.
- ⛔ `paper-collage-reveal`, `torn-paper-rip`: cut-paper look — retired style, don't use.

Checks we haven't used yet:
- `snapshot --review`: each scene at start + 0.3 s and its middle, a 5-frame strip at every cut, frames at phone width.
- `snapshot --angle iso|side`: tilts the stage to show depth / occlusion — **the pass-through check for Style B**.
- `snapshot --zoom SELECTOR`: high-density crop to read small numbers.
- `audio FILE`: where sounds land in film time (hits vs picture), loudness, silence.
- `keyframes`: onion-skin shots of a motion path.
- `measure cuts|energy|eases FILE`: measure a reference video's cutting rhythm and eases (for TomTom-style references).
- `compare` / `grade-compare`: render variants into one labelled sheet.

Gotchas found (EX33, 2026-11-10):
- **Inside the film a sub-composition's root has no readable `data-duration`** — `parseFloat(root.dataset.duration)`
  gave NaN, the NaN reached the sun, and every surface vanished (only the background drew). Bake the length into the
  script as a constant. Debug a Three.js composition standalone: open `compositions/x.html` copied to the project root
  via `file://` in the HyperFrames Chrome (`chrome-headless-shell`, `--allow-file-access-from-files`) with puppeteer-core
  from the npx cache; `validate`/`check` didn't report it (no error was thrown).
- Toon shading: MeshToonMaterial + a ramp texture; with a 2-texel ramp a low sun (dot < 0.5) puts the whole floor in
  the shadow tone — use an 8-texel ramp with only the first dark. NoToneMapping; measure the rendered floor and solve
  hemisphere + sun so a lit surface shows its own colour (EX33: hemi #C2BEDC × 2.6, sun #FFF6C4 × 1.54).
- A 3D world is deterministic per frame (render(t) from a paused GSAP clock), so HyperFrames renders it in parallel
  workers: 1,920 frames at 1080×1920 in ~30 s (draft).
- The pass-through check lives in the scene (`window.__ex33check()`: every string vs every hanging thing, part by part).
- Older: a block's `data-composition-id` may differ from its file name (`vfx-shatter.html` is `glass-shatter`);
the include must use the id inside the file or HTML-in-Canvas fails with "No cached paint record". Blocks are 1920×1080 —
re-lay out for 1080×1920.
- EX34: **shadow-only casters** = `MeshBasicMaterial({ colorWrite: false, depthWrite: false })` + `castShadow` — invisible,
  but the sun's depth pass sees them (a coin whose shadow is an airliner, a debt written in shadow). Place a caster at
  `target + sunDir * (h / sunDir.y)` so its shadow lands exactly on `target`.
- An `InstancedMesh` whose instances start scaled away gets a tiny bounding sphere and is culled from the shadow pass:
  set `frustumCulled = false`. Casters high in the air need the shadow camera far out along the light (`far` ≥ 900).
- Debug pages load over `file://`, where `fetch` fails: inline JSON (fonts) into the composition at build time.
