# Lessons: what failed, and what replaced it

Full detail: `miki-explained/00_bible/effectcraft-notes.md`. Read before proposing a "new" method.

| Tried | What happened | Now |
|---|---|---|
| Flat vector motion graphics (EX00 v1) | "Generic" | Base44 craft on r06 grammar: cards, tiles, framed photos, drift, carried elements |
| A Vox-only look | Not what the user wanted | References in `01_references/`, especially r01 Base44 |
| `TextDocument.font` in scripts | Silent fallback font | Native `layer.newText` (family + style) via `ws()` / `inc()` |
| Keys 0.01s apart | Frame-snap drops one: ghost fades from frame 0 | `[t - F, 0], [t, 100]` |
| `layer.parent = x` | No position compensation | Nulls with anchor = position; don't parent chip contents |
| Reusing a layer variable after `app.run` | Stale handle, wrong layer | `comp.layer(name)` again |
| 20000% Y scale for a fill | Clipped to part of the frame | Animate the rect's Size (`zoomThrough`) |
| M1.png / M2.png / M3.png import | One 3-frame sequence | `still()` imports with `sequence: false` |
| Judging on stills | Missed ghosting, hidden handoffs, late flips | `review.sh` 12fps strips across every transition |
| Word index guessed | Signal flipped two words late | Count indices from the `words.py` printout |
| 49 synth sound effects + logo pop (EX01) | Too much | 4–6 effects, silent logo (sfxmix.py) |
| Captions + identical headline | Doubled text | `captions.py --mute` windows |
| Green meant both good and bad | Grammar drift | ANSWER green = fix, PROBLEM coral = problem |
