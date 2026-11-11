# CRAFT FUNDAMENTALS — methods stolen from game-art and 3D pipelines

Adopted 2026-11-11 (user: "for the skip part even though its a game focus, we can still steal the concept, idea and
method. the fundamental"). Every method here is translated to our films; where it conflicts with WORKING-RULES or a
bible, those win. Sources at the end.

---

## 1. Build order: forms → materials → light → effects

"Glow does not make primitives look AAA." Fog, darkness, bloom, haze and particles never stand in for missing geometry.
If a frame looks empty, the fix is authored objects, not atmosphere. Each pass changes **one** variable (form OR material
OR light OR camera), then a preview, then a gap list. At most 3–5 passes per shot; if it stalls, say so.

## 2. Measured evidence before anyone looks (`tools/raea/frame_metrics.py`)

Runs on every `preview.sh` sheet (`preview.sh EDIT.tsx frames OUT.jpg A|B`) and on final frames.

| Flag | Metric | Means |
|---|---|---|
| EMPTY | edge density < 0.04 | primitive or empty framing |
| ONE-TONE | one colour > 60% of the frame | "white washing" |
| FLAT | colour entropy < 3 bits (A only; B is flat by design) | sparse palette |
| WASHOUT | luminance p95–p5 < 60 | fog / cone / darkness compression |
| BLOWN | mean luminance > 200 | whites with no value range |
| BELOW-BASELINE | the mean of **8+ frames** spread across the film under the house baseline (smaller sheets: per-frame flags only) | **A:** edge ≥ 0.20, entropy ≥ 4.3 · **B:** contrast ≥ 110, one-colour ≤ 0.37 |

Calibrated on our own judged work (sampled every 3–4 s, caption band ignored):

| Film | Verdict | edge | entropy | contrast | one-colour | Result |
|---|---|---|---|---|---|---|
| EX29 v1 (A) | baseline | 0.260 | 5.73 | 157 | 0.13 | pass |
| EX35 final (A) | shipped | 0.221 | 4.43 | 163 | 0.20 | pass (1 bright frame) |
| EX35 preview (A) | "empty, white washing, lack of texture" | 0.150 | 3.89 | 153 | 0.24 | **BELOW-BASELINE** |
| A v1 clay boxes | "too empty, too plain" | 0.091 | 2.54 | 40 | 0.41 | **FLAT WASHOUT** |
| EX33 (B) | liked, baseline | 0.152 | 3.02 | 131 | 0.34 | pass |
| EX34 (B) | "plain, not enough detail" | 0.156 | 3.29 | 86 | 0.41 | **BELOW-BASELINE** |

They measure **our own renders** only; references the user handpicks are still judged one by one by eye (memory
`reference-review-method`). These numbers are signals, not verdicts. The thresholds were fitted to these six pieces, so they prove separation, not
prediction; recalibrate as more episodes are judged. A flag needs a fix or a stated reason. **Never add clutter, noise
or particles to raise a number**: a calm, intentional frame may measure low and be right.

## 3. Calibration anchors (`00_bible/anchors/`)

The critic (WORKING-RULES §7.5) looks at the anchors before scoring, so its scale means the same thing every time:
a render that reads closer to a **-1** anchor than to a **-2.5** anchor scores ≤ 4/10, whatever went into it.
See `anchors/README.md`.

## 4. Automatic failures (any one = not ready, whatever the scores)

- The frame is dominated by plain stand-ins or empty space the story doesn't justify.
- The subject (the business) is a primitive plus glow; or two roles (customer vs owner, cheap vs dear) look the same.
- Fog, darkness, bloom or haze stand in for missing geometry.
- Words on screen (numbers, UI, captions) are plain rectangles, or overlap the key prop or the caption band (y ≈ 1340–1420).
- No measured evidence (metrics + clipping log + `frames_check.py`) after a look change.
- No moving preview at the film's frame rate when motion is being judged: a still never proves motion.

## 5. Reference analysis before building (`templates/ref_analysis.md`)

Write `ref_<shot>.md` next to `ref_<shot>.png` **before** any code: subject, silhouette, camera angle and lens feel,
subject fill %, key-light direction and colour temperature, 5–8 hex colours with roles, materials, unique features,
mood. Then build in this order: **camera match first** (wrong framing makes every later pass look wrong) →
silhouette → secondary breaks (recesses, ribs, frames) → small detail → materials → light → grade. Compare
side by side and rate each category **Match / Close / Miss**; pass at 8/10, max 3 rounds, every Miss gets one fix line.

## 6. Art direction is a system, not a mood word

Settle each axis with something you can observe ("beautiful", "cinematic" are banned as specs):
shape · silhouette · value (how many bands; does the subject read in **greyscale**?) · colour roles (accent = brand +
meaning, neutral, environment, UI) · edge · material · light · detail (where it concentrates, what vanishes at phone
size) · camera · motion.

**Judge at three distances:** (1) phone thumbnail, 270 px wide: does the subject and the line's idea read in 1 s?
(2) working size 1080: edges, seams, materials; (3) in context: with captions, logo, neighbours and motion.
An object that only works zoomed in has failed.

**Drift signals** across an episode: figure height or scale changes; highlights imply different sun directions; the
palette grows near-duplicate colours; texture density rises shot by shot; the camera family changes. On drift, go back
to the approved shot and make a constrained edit; never keep editing a drifted derivative.

## 7. Modelling rules (props and sets)

- **Silhouette first**: the object must read as a dark shape before materials.
- **Working parts** sell reality: hinges, handles, vents, rails, brackets, cables, screws, labels, drip trays.
  Asymmetry is fine. Mundane objects don't get sci-fi greebles ("don't over-greeble everyday objects").
- **Detail goes where the camera looks**; undersides and backs stay simple.
- **Wear hierarchy**: contact edges dirty and worn (counter edge, door push plate, kerb), protected faces clean.
- **Name moving parts** and keep every part on every frame (flicker rule).
- **Real-world scale** (1 unit = 1 m), fixed before detail:

| Thing | Size | Thing | Size |
|---|---|---|---|
| adult figure | 1.6–1.75 m | door | 2.1 × 0.9 m |
| counter / bar | 0.9–1.05 m high | chair seat | 0.45 m |
| table top | 0.75 m | window sill | 0.9 m |
| shophouse floor | 3.5–4 m | kerb | 0.15 m |
| coin (RM1) | 24 mm (enlarge only as a stated idea) | phone | 0.15 × 0.07 m |
| scooter | 1.8 m long | car | 4.3–4.7 m long |

## 8. Set dressing: story clusters, density by zone

For each beat: pick what the place has *been doing* (the morning rush, a closing shop, a delivery waiting),
place **3–7 props that sell it**, add **1–2 wear cues**, then **stop**. No uniform clutter wallpaper.

| Zone | Density |
|---|---|
| Subject / key prop | high intent, low noise: nothing competes with the read |
| Midground | supporting story clusters (people, scooters, signboards, stalls) |
| Background | silhouettes, glowing windows, rooftop clutter |
| Camera and token paths | **clear**: check with `paths.py` before rendering |

## 9. Seeded scatter: generate → validate → render

People, scooters, cars, signboards, bins, trees: one seeded RNG passed everywhere (never global `random`), written to a
data file (JSON) first, rendered from that file. Validate the data before any render (every path clear, nothing
overlapping, nothing in the caption band). Tune with the seed fixed so one change shows alone, then try a few seeds and
keep the best. Same pattern as `paths.py` / `phys_bake.py`.

## 10. Blockout → test → dress, never the reverse

Grey box at real scale (§7 table), camera moves and the token's route checked on the grey box, *then* detail.
Pacing is data: give every beat an intensity 0–1 in the shot list and check the curve alternates tension and rest.
**Teach, then test**: show the mechanism plainly once before the twist uses it.

## 11. Emphasis tiers (from game "juice", inside our restraint rules)

Every beat event (coin lands, price appears, shutter drops, payoff number) gets a tier:

| Tier | Channels (2–3, add until it reads, then stop) | Used for |
|---|---|---|
| small | one sound + one object reacting | routine handovers |
| medium | + a light change (a sign switches on, a window glows) | each mechanism |
| large | + a camera settle or a held frame | the twist / payoff only |

Exaggerate briefly and **return to rest** (ease-out settle, ~0.4 s; no bounce, per `explained-human-motion`).
Emphasis moves the picture, never the facts (a number never animates past its true value). If a camera shake is ever
justified (an impact), drive it with decaying trauma² × smooth noise, never random per-frame jitter.

## 12. Camera craft

- Frame-rate-independent smoothing in code: `t = 1 - exp(-k·dt)`, never a fixed per-frame lerp.
- Check framing at the **start, middle and end** of every move, and on the word (after the move settles).
- Lead room toward where the token or eye is going; avoid tangents (edges that just touch the frame or each other).
- Lens with intent: 18–28 mm establish, 35–50 mm story/product, 85 mm+ compression. Don't default one lens.
- Move camera + target together, slow ease in/out.

## 13. Light and lookdev

- Key / fill / rim: fill ½–¼ of key; rim for subject separation. Colour temperature tells the story
  (tungsten ~3200 K warm interior vs moonlight 8000 K+ cool exterior: exactly Style A's dark world).
- Values must read in **greyscale**; avoid pure-black and pure-white traps unless intended.
- Never animate a material shared by structure (blows the whole building white); separate emissive parts.

## 14. Materials

Few materials per prop (hero 3–5, standard 1–2). Plausible PBR: painted metal metallic 0 / rough 0.3–0.5; brushed metal
1 / 0.4–0.6; plastic 0 / 0.3–0.6; rubber 0 / 0.7–0.9; concrete 0 / 0.8–0.95; raw wood 0 / 0.5–0.7; glass rough 0.
Wear by masks (noise → ramp; edge wear from AO/pointiness; dirt from inverted AO), not by painting dirt in base colour.

## 15. GLB hygiene before raea (Blender exports)

Apply scale and rotation · origin at the logical contact point (floor, hinge, grip) · recalculate normals · merge by
distance · no loose or internal faces · **no coplanar faces** (z-fighting = flicker) · 1 unit = 1 m · decimate heavy
library models to the camera's need (hero 2k–8k tris, standard 0.5–2k, background 0.1–0.5k).

## 16. QA verdict format

Every hand-off ends with: **SHIP / SHIP WITH NOTES / NO-SHIP** · Blockers · Majors · Minors · measured evidence
(metrics line, clipping lines, frames_check) · what still fails. A visual claim without a frame is not a claim.

## 17. Ideas parked (not built)

- **Ground-truth readability check** (from BlenderProc's exact labels): we know every object's geometry, so project
  the key prop and the subject's bounding box to screen per frame and fail when the key prop is under ~4% of the frame,
  off-screen on its word, or inside the caption band. Would automate LESSONS §2.
- **text-to-cad** (build123d → GLB) for precise hard-surface props with no library model: installed and first prop made
  2026-11-11 (`tools/cad/`), see `tools-radar.md`.

---

**Sources** (all read 2026-11-11): majidmanzarpour/threejs-game-skills (visual scorecard, anchors, canvas inspector
metrics, authoring recipes; MIT) · arjun988/blender-skills (reference-image match, visual-match checklist, set dressing,
prop artist, camera, lighting, lookdev, materials, QA, validation; MIT) · gamedev-skills/awesome-gamedev-agent-skills
(game feel, camera systems, level design, procedural generation, art direction; Apache-2.0) · majiayu000 claude-skill-
registry 3d-modeling (apply transforms before export) · Andrew1326/dominations blender skills (bmesh/compositing basics) ·
MonumentalSystems Atlas 3d-design (analyst-before-build, asset optimisation) · phuetz/code-buddy (BlenderProc
ground-truth idea) · earthtojake/text-to-cad.
