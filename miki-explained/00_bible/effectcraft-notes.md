# EffectCraft notes (v0.17.0)

What works, how to drive it, and the traps found while testing. Read before building.
Tests live in `04_episodes/EX00_effectcraft-test/tests/` (t1–t5).

## How to drive it

- **Tool:** `effectcraft-cli` (`/opt/homebrew/bin`). Headless, no window needed. Never After Effects.
- **Build with JS scripts:** `effectcraft-cli script build.jsx --project in.ecproj --save-as out.ecproj`
  (or `--empty` to start fresh). This is EffectCraft's own After Effects-style object model.
- **Native commands** for anything the script API gets wrong:
  `effectcraft-cli run <command> '<json>' [<command> '<json>' …] --project … --save-as …`.
  List them with `effectcraft-cli commands --filter <text>`.
- **Inspect paths:** `effectcraft-cli props <comp> <layer> --flat --project …`.
- **Check frames:** `effectcraft-cli render-frame --project … --comp … --time S --max-side 480 --out f.png`.
- **Render:** `effectcraft-cli render --project … --comp … --out x.mp4 --format h264` (about 2s for 4s of 1080×1920 at 24fps).

## Proven (tests t1–t5)

| Need | How | Test |
|---|---|---|
| 9:16 24fps comp, cream background | `app.project.items.addComp(name, 1080, 1920, 1, dur, 24)`; `comp.bgColor` | t1 |
| Text in Work Sans Black, wrapped and centred | **native** `layer.newText {text, font:"Work Sans", style:"Black", size, fill, box:[x,y,w,h], justify:"center", leading, tracking}` | t2 |
| Word-by-word reveal (D02) | Text animator → Opacity 0 → range selector; `advanced/basedOn` = 3 (words), `smoothness` 0; animate `start` 0→100 | t3 |
| Line draw-on (D05) | Shape layer → path + stroke + Trim Paths; animate Trim End 0→100 | t1 |
| Dot on a curved arc (D07) | Position keys + `setSpatialTangentsAtKey`; `KeyframeEase` for ease-out | t3 |
| Ripple (D07, D17) | Ellipse stroke; Scale 100→500 + Opacity 100→0 over ~0.5s | t3 |
| Camera push-in (D06) | A null as parent of every layer; animate the null's Scale with easing | t3 |
| Light → dark wipe (D09) | Dark solid + `ADBE Linear Wipe`; animate `effects/#1/completion` 100→0 | t5 |
| Blur (D08) | `ADBE Gaussian Blur 2`; animate `property(1)` (Blurriness) 0→60 with an opacity fade | EX00 |
| Dashed stroke (D07 trail) | the stroke's `ADBE Vector Stroke Dashes` → add Dash 1 + Gap 1 | EX00 |

## Traps

1. **Fonts via the script API fall back silently.** Setting `TextDocument.font = "WorkSans-Black"` renders
   in the default font with no error. Create text with the native `layer.newText` (family + style) instead.
2. **Paragraph text needs a `box`,** otherwise a long line runs off the frame.
3. **Text selector match names differ from After Effects.** `"ADBE Text Range Advanced"` returns null; use
   the short names: `sel.property("advanced").property("basedOn")`, `"smoothness"`, `sel.property("start")`.
4. **`Folder.current` is null in headless scripts.** Save with `--save-as`, not `project.save()`.
5. **A layer shows its first keyframe value before that key.** Add an opacity fade-in, or it sits on
   screen from frame 0.
6. **Parenting changes coordinates.** A shape parented to the camera null uses the null's space, so build
   the paths before parenting, or in the null's space (the test trail drew off-position).
7. **Keys snap to frames.** At 24fps, a key 0.01s before another lands on the same frame and one is
   dropped, so the value ramps from an earlier key (the "ghost ring" bug). Space keys at least
   `1 / FPS` apart; the word-reveal helper clamps each fade to fit before the next word.
8. **Audio:** `app.run("file.import", {paths:[…], addToComp:true, time:S})` places each line at its
   start time; render with `--audio on` (AAC). Checked with silencedetect: offsets land within 0.05s.

## Build pattern (EX00)

`04_episodes/EX00_effectcraft-test/build.jsx` is the working template: helpers for `heavy()` /
`detail()` text, `wordReveal()` (D02), `typeOn()` (D03), `line()` draw-on (D05), `circle()`,
`ripple()` (D07/D17), a camera null for the push (D06) with `scr()` to place unparented overlays
in pushed screen space, Gaussian blur defocus (D08) and the Linear Wipe flip (D09).
Word times come from faster-whisper word timestamps, corrected with silencedetect pauses.

## More traps (v2 live build)

9. **Layer handles go stale** after native commands (`app.run`) add layers. Re-fetch with
   `comp.layer(name)` right before using a layer.
10. **Rotation is `"ADBE Rotate Z"`**, not `"ADBE Rotation"` (that returns null).
11. **Parenting does not compensate position.** A child's position is read in the parent's space.
    Make every control null with **anchor = position** so its space matches the comp, and don't parent
    a chip's contents to the chip; animate them alongside it instead.
12. **Shape groups added later render behind earlier ones.** Draw the icon group before the tile rect.
13. **Some layers default to shorter than the comp** (solids, nulls). Set `inPoint = 0`,
    `outPoint = comp.duration` on everything at the end (`v2/finish.jsx`).
14. **Live (bridge) scripts can't `#include`** outside the project folder. Concatenate instead:
    `cat lib.jsx beatN.jsx > _run.jsx`.
15. **Live view:** launch `/Applications/EffectCraft.app/Contents/MacOS/EffectCraft --control 9877`, then add
    `--bridge 9877` to any CLI call. `render-frame --out` needs an absolute path in bridge mode.
    Save with `exec file.saveAs --params '{"path": "<abs>.ecproj"}'`.
16. **Counters:** `prop.setExpression {layer, path: "text/sourceText", expression}` with `linear(time, …)`.
17. **Layer styles:** `layer.style.dropShadow`, then `prop.set` on `layerStyles/dropShadow/<distance|size|opacity|angle|useGlobalLight>`.
18. **Review in motion, not stills.** Sample the render at 12fps (`ffmpeg -vf fps=12,tile=…`) across each
    transition. In v3 this caught bugs that stills missed (ghost layers ramping in, a hidden handoff).
19. **Frame snap, again:** any `[t, 0], [t + 0.01, 100]` pair collapses. Always write `[t - F, 0], [t, 100]`.
20. **Huge transform scales clip** (a rect at 20000% Y covered only part of the frame). Animate the shape's
    own Size instead.
21. **Text layers made with a `box` have a non-zero position.** Keying absolute positions throws them off-screen;
    use `nudge()` (offsets from the current value).
22. **Stacking:** a carried element must sit above what it flies onto. Use `layer.moveToBeginning()` before adding the grain layer.
23. **Numbered stills import as a sequence.** `M1.png`, `M2.png`, `M3.png` came in as one 3-frame clip "M[1-3].png".
    Import with `sequence: false`, then set `outPoint = comp.duration`.
24. **Masks:** `layer.addMask {layer, shape: "rect", rect: [x, y, w, h]}` in source-pixel space. `layer.mask.shape` only edits an existing mask.
25. **Behind a card:** `layer.moveAfter(comp.layer("Card"))` puts a giant numeral directly under the card.
26. **Re-running one beat duplicates its layers** (same names, so `comp.layer(name)` finds the first). Rebuild from beat A, which clears the comp.
27. **Line breaks in text:** use `\r` inside the string for a deliberate two-line set.
28. **No caption feature in 0.17** (GitHub issue #308 asks for one). Build captions as text layers from the
    faster-whisper word times: phrase chunks of up to 6 words, a dark pill per phrase, words revealed as spoken (EX01 `build/G.jsx`).
29. **Outro blur:** an adjustment solid with Gaussian Blur keyed 0→46 blurs everything beneath it; layers created after it (the logo) stay sharp.
30. **`app.run` `layer:` is the layer id, not its index.** Pass `l.id`. `l.index` only works while the layer is still index 1 (just created), which is why `shadow()` inside `card()` works; keying a card's shadow later with `.index` fails with "no property `layerStyles/dropShadow/opacity`" (EX02V2 A).
31. **Memory: EffectCraft grows on renders, not builds.** Building EX02V2 A→finish stayed under 1 GB; three 640px stills took it to 2.7 GB. A session that built EX00V2, EX00V3 and EX02V2 reached 24 GB on a 16 GB Mac and kernel-panicked it (watchdog, 2026-10-28). Save after every beat, and quit and relaunch EffectCraft between episodes.
