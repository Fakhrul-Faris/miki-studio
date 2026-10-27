# V2 style study: "elevate"

Batch r20–r32 (added 2026-10-28). The goal: EX01–EX03 share one editing pattern (flat cream canvas → card → zoom-through →
brown). V2 adds daring camera angles, more motion and velocity, abstract shapes, 3D space and richer interpolation.
Status: **draft, awaiting approval.** Deep-dived: r31, r28, r24, r20. The rest are noted for single techniques.

## r31: perfume physics explainer (vertical, 77s). The primary reference.

**Why:** it's an *explainer* (our format) that lives in 3D space. It proves the story-and-diagram grammar survives in 3D.
- **Stage:** a dark navy void with a ground plane and a soft horizon line; a white low-poly mannequin stands on it. One stage for
  the whole piece; the camera and scale change, not the set.
- **Camera:** a fast push-in at the open (the figure goes small → big in ~1s); mild drift; a **scale-jump dive** (the stage blurs
  out while a macro "skin surface" world blurs in) instead of a cut.
- **Physics as particles:** orange scent particles: a random-walk trail with a ticking **"T + 03 H → T + 21 H"** counter
  (time-lapse), then a rising plume, a plume that bends and trails behind a walking figure, molecules as spheres on a slab
  evaporating at different rates.
- **Mode tags:** outlined chips top-right ("◷ TIME-LAPSE", "▶ REAL TIME", "MACRO ×10⁶") that switch state; they tell the
  viewer how to read time and scale.
- **Measurement callouts:** dimension lines with mono labels (1 M, 0.25 M/S, 236 g/mol).
- **Type:** tiny mono kicker ("• THE PHYSICS"), a **heavy condensed caps headline**, top-left, that grows line by line with the
  **last line in the accent colour**; bottom captions heavy caps with the spoken word bolded (karaoke).
- **Big numbers:** "23h", "×1000" in accent, huge, on top of the scene.
- **Split stage:** a vertical divider, two figures compared side by side (citrus vs musk).
- **Recap:** a numbered list "1 HEAT → PROJECTION / 2 MOTION → SILLAGE / 3 MOLECULES DECIDE".

## r28: red kinetic objects (21s)

- **Velocity:** a scrambled/dashed type intro; a cyan **lens-flare star swoosh** crossing frame; objects **fly in on curved
  paths with smear**; hard **colour flips** white ↔ black ↔ red as cuts.
- **3D object orbit:** pixel-art objects (vinyl, camera, heart, coin, plant) **circle the word in a 3D ring**, rotating, with
  depth scaling (near = big, far = small).
- **Scatter-assemble:** letters float in from random positions and lock into "LOVE".
- **Hero object per word:** each keyword gets one object punched in ("action." + camera, "curiosity." + vinyl).

## r24: pixel / abstract (60s)

- **Pixelate-resolve:** clouds build block by block into a photo.
- **Perspective corridor dive:** the camera flies down a 3D pixel staircase/tunnel (strong depth and speed).
- **Cards fanning in depth:** a stack of cards receding in perspective, spreading out.
- **Kaleidoscope shard burst:** coloured shards radiate from the centre as a transition.
- **Morphing geometry:** a radial mandala that breathes and morphs; organic blob chains.
- **Shapes over photos:** geometric icons flying in 3D over photographic backgrounds (mixed media in 3D).

## r20: monoline doodles (57s, vertical)

- **Live pen draw:** a pen tip draws a circle, imperfect, in real time; tiny mono annotations appear beside it.
- **Multiplication:** one circle → a grid of identical circles ("a million times over").
- **Warm vs cold:** gold glow for the human, cool blue for the machine; figures as monoline busts.
- Restraint: one line, lots of black, slow. A good "quiet" beat to contrast with velocity beats.

## Single techniques from the others

| Clip | Take this |
|---|---|
| r21 AI montage | Retro-object hero shot (CRT computer), "That's already **DEAD!**" with one glitched word |
| r22 docu kinetic | Giant type ("SO") with a yellow bar wipe; words pinned onto footage (handshake "sold / to / them") |
| r23 travel UI | A calendar day **turns into a red dot** that becomes the next scene (shape match-cut) |
| r25 code editor | A story-structure timeline (Hook · Setup · Build-up · Insight · Payoff) as an on-screen progress bar |
| r27 Polymarket | Glowing UI cards floating in a dark gradient; slider interpolation |
| r29 Loopr | UI over sky; icon row where one icon lights orange |
| r30 jewellery | Sketch → macro 3D object reveal |
| r32 stamps | Perforated stamp frames as a framing motif |

## New patterns (D29–D45), appended to patterns.md once approved

| ID | Name | Source |
|---|---|---|
| D29 | 3D stage: ground plane + horizon, subjects standing on it, lit | r31 |
| D30 | Camera swoop / orbit around a 3D subject | r24, r28 |
| D31 | Scale-jump dive (defocus dissolve into a macro world) + mode tag | r31 |
| D32 | Mode tags that switch state (TIME-LAPSE / REAL TIME / MACRO ×10⁶) | r31 |
| D33 | Particle flow: plume, trail, evaporation | r31 |
| D34 | Random-walk path drawn live with a ticking time counter | r31 |
| D35 | Object orbit ring around a keyword (3D carousel) | r28 |
| D36 | Velocity: curved fly-ins with smear, flare swoosh, colour-flip cuts | r28 |
| D37 | Scatter-assemble letters | r28 |
| D38 | Perspective corridor / tunnel dive | r24 |
| D39 | Cards fanning out in depth | r24 |
| D40 | Shard-burst transition | r24 |
| D41 | Pixelate-resolve reveal | r24 |
| D42 | Live pen-draw monoline with annotations | r20 |
| D43 | Split stage with a vertical divider (A vs B) | r31 |
| D44 | Numbered recap list | r31 |
| D45 | Condensed caps headline growing line by line, last line in accent + mono kicker | r31 |

## EffectCraft feasibility (tested 2026-10-28)

- **Works:** `layer.new3dPrimitive` (plane, sphere, torus, cube, cone, cylinder) with base colour, metallic, roughness,
  emissive; a 2D shape layer switched to 3D and angled; a light; a moving camera with a point of interest. Real shading and
  perspective (headless render, ~6–12ms a frame at preview size).
- **Available, not yet tested:** CC Particle World (applies), 3D model import (.glb/.gltf/.obj/.fbx), per-character 3D text,
  extruded shapes (Advanced 3D), shadows, motion blur on camera moves.
- **Known gaps (EffectCraft docs):** no camera aperture / depth of field (issue #260), so fake defocus with blur on far layers.

---

## Revision (2026-10-28): the 3D style test was rejected. Human motion over effects.

The user's verdict on EX00V2: "AI tends to rush things with flashy transitions and overuses bounce; human editing focuses on flow,
cohesiveness, harmony and cleanliness in every motion." 2D first; make the **camera motion and velocity** interesting.
Re-studied r17, r19, r20, r21, r22 for flow:

| Ref | How it flows |
|---|---|
| r19 orbs | **One subject for the whole film.** A glowing orb becomes a planet edge → a ring framing the words → a field of orbs → a traveller with a light trail → a wave → the centre of an orbit system. No cuts, no bursts: every transition is the same object changing shape. Elements glide in from off-frame on curved paths, decelerate, settle without overshoot; moves overlap; the camera never stops drifting |
| r20 monoline | One line, drawn live. Slow. Lots of black. Text calm and small |
| r17 charts | One shape grows into the next (bar → arch → rings → waves → colour plates → chart layers). The grid is a constant |
| r21 AI montage | A slow push into one object; the prompt bar *becomes* the next scene; **one** textured transition (pixel dissolve), used once |
| r22 docu | Words placed beside the subject one at a time, on the voice; cuts only on the voice's beats; slow push on every photo |

### Motion language V2 ("flow")
1. **One thread per episode:** a hero element that persists and transforms; beats are states of it, not new sets.
2. **Long, soft easing:** decelerate into place (expo-out feel), no overshoot or bounce; big moves 0.6–1.2s; moves overlap.
3. **The camera is always moving, slowly**, and velocity comes from the camera *following* a travelling element or pushing through it.
4. **Calm type:** word-by-word with a blur-in and a small rise; one thought per frame; negative space.
5. **Transitions are morphs**, shape matches or camera push-throughs. At most one textured transition per episode. No flash fills, shard bursts or spark particles.
6. **Restraint:** at most ~3 things moving at once; holds of at least 1s to read; cuts only on voice beats.

---

## North point (all 32 references, 2026-10-28): **nothing appears from nowhere**

Every frame is born from the one before it, carried by motion, with one subject at a time in plenty of space.
| Ref | Thread |
|---|---|
| r19 | orb → planet edge → ring → field → traveller → wave → orbit system |
| r17 | bar → arch → rings → waves → colour plates → chart layers |
| r12 | dot on a line → bars → square → UI → orbit → square → URL |
| r13 | thumbnail → card → grid → gallery → **thumbnail** (bookend) |
| r11 | search bar → tents → grid → collage → swirl → logo |
| r04 | framed photo → brain between players → eye → brain in circle → the pitch's centre circle |
| r20 | pen line → circle → circles → human outline → **circle** (bookend) |
| r21 | CRT → prompt bar → pixel dissolve → calendar → photo strip → globe → **prompt bar** (bookend) |
| r08 | word → branch frame → circle inside the word → photo grid → question |
| r15 | avatar orbit → scatter → list rows |
| r23 / r30 / r31 | red dot becomes the next scene / loupe circle → macro ring / one stage, scale changes only |
| r06 / r03 / r01 | footage → circle → graph dot / one line across a map / avatar → burst → icon → wordmark |
Gap in EX01–EX03: each beat built a new set, joined by fades and the zoom-through template. EX00V3 was the first to follow it.
