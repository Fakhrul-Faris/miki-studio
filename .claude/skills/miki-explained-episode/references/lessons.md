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
| Brief timings (53 s of fixed frame counts) | Gaps between the voice lines, slow tempo | Voice sets the tempo: `vo_tighten.py`, every cut on its word (EX02V3) |
| Hard cuts only | Choppy, no cohesion | Match cuts, camera carries, paper slides / tears / flaps; no dissolves |
| Stills generated 16:9, with text, lights on | Regeneration, then PhotoCraft removal of every word and glow | `templates/media-prompts.md`: 9:16, no text, lights off, cut-out sheet |
| Tape measure and scissors collages for "an hour" / "ten minutes" | Busy, slow to read | Typography for abstract beats; documentary photo (M2) for the real thing |
| Two-track collage for "known vs unknown wait" | Figures without walk poses, fog not separable | Line diagram, native |
| Illustration only | Viewer can't see what we mean | 2–3 documentary images, printed as torn duotones, every episode |
| `select.subject` in PhotoCraft | Picked a building, not the man | `select.object` with a box |
| Content-Aware Fill on flat paper | Smears, tints, ghosts | Copy clean areas of the same image (feathered, mirrored) |
| Scripted find-and-replace adding `// comment` inside a call | Broke several shot scripts | Put comments at the end of the line, never inside a call |
- Blender Line Art (Grease Pencil) ignores collection instances and drew nothing on a crowd in background renders: use
  `paperkit.ink_outline()` (inverted hull) instead (EX00V6).
- Halftone dots: the user prefers the flat screen (`halftone()` default) over dots fixed to the body (`space="object"`, Generated
  rest-shape coords), even though screen dots stay put while the camera moves (EX00V6).
- Free Hugging Face image-to-3D (TRELLIS, Hunyuan3D) runs out of anonymous ZeroGPU quota after ~2 models a day (EX00V6).


**EX00V7–EX14 (2026-11-01): from generated posters to the smooth isometric house format**
- Seedream poster stills + depth bands + printed footage (EX00V7): only "partly okay". Generated images are retired; the
  world is built in Blender, isometric, flat, 60 fps (EX14, loved).
- Old film is 18 fps padded to 29.97 with uneven duplicates: dedupe and step evenly (`footage.py --twos`); dots/posterised
  prints made footage unreadable: plain black and white (`--bw`).
- Camera built from separately eased pieces stops and lurches at every join: one monotone (pchip) curve through key poses,
  or one designed speed curve; check camera speed per frame and the per-frame difference before showing anything.
- Hiding big objects on one frame pops: fly past them instead (the EX00V7 tunnel along the holes' own axis).
- Blender: `bevel_factor_mapping_end` has no "LENGTH" in 5.2 (use "SPLINE"); world.py's objects live in the scene's
  "Collection", not the master collection; a collection instance of a collection that's excluded drops it (instance the store
  collection itself, exclude only the extra-paths collection); don't name a variable `WT` in episode.py (world.py's wall
  thickness); key heavy props only inside their window.
- EffectCraft: rebuild MASTER from an empty project (a reused image-sequence item keeps its old length); text anchors need
  `position + rect offset` (setting position = anchor put words at the top); counters work as a Source Text expression;
  "Change to Color" recolours a rendered accent (hue 12, saturation 40 tolerance keeps cream and greys untouched).
- Captions: words sliding 18 px into a 0.28-em gap touch the previous word; 8–10 px and a 0.34-em gap, or the panel style.
- Always preview before a full render (`preview.py`, ~3 min vs ~40): the user asked for it.
