# Lessons: what failed, and what replaced it

Full detail: `miki-explained/00_bible/effectcraft-notes.md`. Read before proposing a "new" method.

| Tried | What happened | Now |
|---|---|---|
| Flat vector motion graphics (EX00 v1) | "Generic" | Base44 craft on r06 grammar: cards, tiles, framed photos, drift, carried elements |
| A Vox-only look | Not what the user wanted | References in `01_references/`, especially r01 Base44 |
| `TextDocument.font` in scripts | Silent fallback font | Native `layer.newText` (family + style) via `ws()` / `inc()` |
| Keys 0.01s apart | Frame-snap drops one: ghost fades from frame 0 | `[t - F, 0], [t, 100]` |
| `layer.parent = x` | No compensation under a null at rest; under a scaled parent it rescales the child (EX00V4) | Nulls with anchor = position; parent before animating, or restore the child's transform after |
| Reusing a layer variable after `app.run` | Stale handle, wrong layer | `comp.layer(name)` again |
| 20000% Y scale for a fill | Clipped to part of the frame | Animate the rect's Size (`zoomThrough`) |
| M1.png / M2.png / M3.png import | One 3-frame sequence | `still()` imports with `sequence: false` |
| Judging on stills | Missed ghosting, hidden handoffs, late flips | `review.sh` 12fps strips across every transition |
| Word index guessed | Signal flipped two words late | Count indices from the `words.py` printout |
| 49 synth sound effects + logo pop (EX01) | Too much | 4–6 effects, silent logo (sfxmix.py) |
| Captions + identical headline | Doubled text | `captions.py --mute` windows |
| Green meant both good and bad | Grammar drift | ANSWER green = fix, PROBLEM coral = problem |
| 3D style test (orbit ring, particles, shatter, bounce pops) | "AI-looking": rushed, flashy, bouncy | 2D flow: one thread, soft easing, camera drift, morphs (EX00V3) |
| Each beat a new set + zoom-through (EX01–EX03) | Felt like a template | North point: nothing appears from nowhere; pick the thread first |
| Building and rendering three episodes in one app session | 24 GB on a 16 GB Mac, kernel panic, EX02V2 lost unsaved | One episode per app session; save after every beat; quit the app before rendering |
| `app.run("prop.set", { layer: l.index, … })` on an older layer | "no property `layerStyles/dropShadow/opacity`" | `layer: l.id` (index only works for a just-created layer) |
| Camera as linear CAM scale keys + `soft()` (EX02V2) | Lurched then crawled: 38.6 doublings/s on the push's first frame; a flat page, no parallax | `camMove()` (log zoom, ease-in-out) + `depth()`, 1.5–2s moves (EX00V4 D) |
