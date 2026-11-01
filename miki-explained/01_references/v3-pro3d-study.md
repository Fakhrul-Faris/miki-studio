# V3 study: polished, professional look

Added 2026-11-01. The goal: keep the EX11/EX12 paper-set method but make it look like top-tier professional work.
Status: **draft, awaiting approval.** Two batches: **the user's own picks (r33–r42), which lead**, and Claude's
3D documentary set (Fern, LEMMiNO, Neo), which is supporting reference for lighting.

## Batch 1: the user's picks (r33–r42), the primary direction

Each folder has `source.*`, `contact_sheet.jpg` (30 frames across the clip) and `note.md` (what the user likes, from the file name).

| # | What the user named it | What it is | What to take |
|---|---|---|---|
| r42 | **approaching this style** | Lighthouse: a grey halftone photo cut-out on charcoal paper, a flat lilac light beam sweeping as a mask, orange scribble texture, cream type | **The target.** Our mixed media (photo cut-out) + flat graphic shapes + one big light gesture. The beam *is* the transition: it reveals the type, swings across, recomposes |
| r35 | pace, camera motion, contemporary cohesiveness | *Cruel Intern* (TVING) titles: 3D, flat/toon-shaded, 3 colours (crimson, blush, black), hard graphic cast shadows, tiny people in big sets | **A 3D set rendered flat.** One palette for the whole piece, slow continuous camera, scale contrast (tiny figure vs giant hands, giant stairs) |
| r40 | good perspective shift | A 3D city of extruded blocks, flat colour, stipple/grain texture on every face, the camera swinging from side to chase view | A **real 3D camera move through a world that still looks printed**. Grain on the faces, never smooth CG |
| r41 | great, non-boring camera angles | *Gross Blue Dog* (Niceshit): worm's-eye, fisheye, extreme foreshortening, speed-line bursts, white ground with coloured line drawings | Angle variety: **every shot a different, extreme viewpoint**; foreground objects huge in frame |
| r39 | great worldbuilding | *Spatial Equity NYC* (Buck): flat illustrated city, a muted slate/sage/ochre palette, top-down and isometric, the city turning into a data grid | **One coherent world**; zoom from street to map to data **without leaving it**. Mono type sits *in* the scene |
| r36 | good scene transition | *Mr. Queen* (tvN) titles: paper collage, patterned papers, torn edges, dark ground; circles and tears carry one scene into the next | Collage **match transitions**: a shape in scene A becomes the frame of scene B (plate → moon → window) |
| r37 | motion that tells the story | *Dear Tupac* (Biography): silhouettes, navy/mint/crimson, blackletter type, light pools in the dark | Every move means something: an eye opens = the reveal, light on a silhouette = the subject. Darkness as the default canvas |
| r38 | just great | *Study Group* (TVING) titles: exam papers, tape, pencil sketch that becomes colour, graffiti, spray | **Layered process**: sketch → ink → colour. Paper and stationery as the world |
| r34 | paper texture | Felt/paper-cut figure in a banknote frame, stop-motion swaps (baby → graduate → baby) | Real **material texture** (felt fibre, embossed edges, soft contact shadow) and stepped motion |
| r33 | text animation | Serif paragraph typed word by word on soft white paper, yellow then pink highlighter swipes | Calm type: words land one by one, **the highlighter re-points emphasis** (pattern D12) |

### What the user's picks have in common (and where we differ)

1. **Art-directed, not realistic.** No pick is photoreal. "Pro" here means **design discipline**: a 2–4 colour palette,
   bold shapes, generous negative space. *That's good news: we don't need Fern's realism.*
2. **3D rendered flat (r35, r40).** Real 3D sets and real camera moves, but toon or flat shading, hard graphic shadows, and
   grain on every surface. In Blender: EEVEE + "Shader to RGB" toon ramps, a single sun, a texture overlay.
3. **One strict palette per piece**, held from the first frame to the last. *Ours:* the plates arrive with their own colours;
   ochre/sepia spreads over everything, so nothing reads as the accent.
4. **Bold camera.** Extreme angles, scale contrast and a continuous camera (r41, r35, r40). *Ours:* mostly straight-on, eye level or top-down.
5. **Transitions built from shapes in the scene** (r42 beam, r36 circles and tears). *Ours:* paper slides and cuts. Close, but plainer.
6. **Texture everywhere** (grain, stipple, felt, paper fibre). We already have this; keep it.

## Batch 2: 3D documentary references (Fern, LEMMiNO, Neo)

Contact sheets (one frame every 8 s from minutes 1–5) are in `v3-pro3d/`.

| Sheet | Video | Why it's here |
|---|---|---|
| `fern_room1046.jpg` | Fern, *The Unsolved Murder in Room 1046* | **Primary reference.** A grey clay world with one red accent, plus torn documents on black: closest to our rules |
| `lemmino_jfk.jpg` | LEMMiNO, *The Kennedy Assassination: Inside the Book Depository* | A white card-model town (basically a paper maquette), with photo prints that glow on dark |
| `fern_putin.jpg` | Fern, *Why Putin Is (Almost) Impossible to Kill* | Realistic hero objects, low-key grade, strong DOF |
| `fern_mencho.jpg` | Fern, *Why El Mencho Was So Hard to Catch* | Ink-bleed maps, live-action-like establishing shots |
| `neo_doomsday.jpg` | Neo, *How the U.S. Doomsday Plane Works* | A map as a physical lit object on a table; cyan vs orange |
| `heroes.jpg` | Close-ups of four frames | For lighting study |
| `ours_EX11_EX12.jpg` | Our current look | For comparison |

Fern works in **Blender** (a 60-person team), so everything below is reachable with our tools; the differences are craft, not software.

## The six things that make it look expensive

1. **Low key: darkness is the default.** About 60–80% of every frame is near-black or deep grey. Light is a *pool* on the subject:
   a wall sconce, a window, a desk lamp. The falloff into shadow does the composition and vignetting for them.
   *Ours:* high key, lit evenly edge to edge, with every part of the frame at the same brightness.
2. **A desaturated world + one accent colour.** Room 1046: everything grey clay, only the victim red. LEMMiNO: a white town,
   one red house. Neo: a cyan world vs an orange enemy. *We already have this rule (ochre #C98A2B)*, but our plates are
   sepia/ochre all over, so the accent doesn't pop.
3. **Untextured "model" materials.** Matte white or grey clay, card and plaster, with no photo texture on the 3D. Texture comes
   from *light* (bump, edge wear, contact shadow), not colour. This is the bridge for us: **a white card maquette is a paper set.**
4. **Lens: shallow focus all the time.** A tilt-shift or macro feel, with foreground objects blurred across the frame and bokeh on
   practical lights. It says "miniature" and "filmed" at once.
5. **Glow and grain finishing.** Photo prints and UI have a soft white halo (LEMMiNO), red elements bloom, lights halate, and fine
   grain sits over everything. Blacks are slightly lifted (#0E0E0E, never #000).
6. **The camera is slow and continuous.** Top-down god views, low-angle push-ins, a slow drift across a set while a fact lands.
   Cuts happen on chapter changes, not every line. (EX11's top-down is already this.)

Also seen: **volumetric light** (window blinds casting beams through haze in Room 1046), **documents as lit objects** (torn prints
on black with a spotlight, a cork board shot like a set), and **maps as physical props** (a lit tabletop map, an ink-bleed territory map).

## What not to copy

- Fully modelled realistic characters, cars and planes: a team's worth of assets, and our all-procedural 3D test (EX07) looked "funny".
  Our people stay as generated cut-outs.
- Horizontal 16:9 framing habits: our 9:16 safe area still rules.
- Their long holds and slow pace: our edit is 40–45 s, voice-led.

## Combined direction (proposal)

Take **the art direction from batch 1** and **the lighting craft from batch 2**. Keep: generated plates, cut-out people,
paperkit shadow boxes, in-set ink, native type.

| Ours now | Pro pass |
|---|---|
| Plates keep their own colours, sepia all over | **One locked palette per episode** (2–3 colours + ochre accent); plates graded into it, accent only on the story object |
| Lit evenly edge to edge | **Light as a graphic shape**: one pool or beam (r42, r37, Room 1046); the rest falls to shadow or a flat ground |
| Straight-on, eye-level or top-down | **An angle plan**: every shot a different viewpoint (worm's-eye, top-down, extreme close foreground); scale contrast |
| Flat cards only | **Simple 3D blocks rendered flat** for set pieces (stairs, counters, a city) with toon shading, hard shadows and grain (r35, r40) |
| Slides and cuts between scenes | **Shape transitions**: a beam, circle or tear in scene A becomes scene B (r42, r36) |
| No finishing | Grain, soft vignette, gentle glow on light shapes; blacks lifted to ~#0E0E0E |
| `Standard` view, EEVEE | Stay on **EEVEE** (fast, and flat/toon looks don't need Cycles); test AgX + a grade |

The flat look keeps renders fast (EEVEE, seconds per frame), which answers the render-budget question.

**Test plan:** one ~6 s shot built two ways from the EX11 clinic material:
(A) **flat-3D**: the r35/r40 look, toon shading, one palette, a bold angle and a shape transition;
(B) **lit paper**: the r42 + Room 1046 look, dark ground, a light pool or beam, cut-outs lit as objects.
Same voice line, same length; judge on the phone.

## Open questions for the user

- **Dark vs cream ground:** r37, r42 and r36 are dark; r33, r39 and r41 are light; r35 is both. Keep cream as default and use dark for
  "problem" beats (theme flip, D09)? Or test a dark-ground series?
- Is the accent still ochre, or should each episode get its own 3-colour palette (as r35 and r39 do)?

## Result (2026-11-01, EX00V6)

Tested A (flat 3D, cream) vs B (lit paper, dark) → B, then the audience made 3D. Picked: **printed 3D**: free MPFB
people (nine varied seated poses) with halftone dots on a flat screen (the user tried dots fixed to the body and reverted) and a paper ink outline, in the dark lit room, with the
ochre empty seats the only solid colour (`04_episodes/_tests/EX00V6_polish/compare_E_vs_F.mp4`). Method: the episode skill
§ Printed 3D; kit: `tools/blender/crowd.py`, `paperkit.halftone()`, `paperkit.ink_outline()`. The same print works on props
and sets (`explore/explore_sheet.jpg`: café cart, night street, coin-stack chart, cream variant).
