# MKG-02 — Location plates (Gate 7, reference-anchored)

v5 — full rewrite. Governing technique for every plate: `references/documentary-realism.md` in the `seedance-commercial-production` skill (user-supplied, now the skill default). Read that file before generating any of these — the short version: real camera behavior, ordinary uneven practical lighting, restrained natural color (no teal-orange grade, no golden haze), moderate depth of field, incidental human-scale composition, physical wear on every surface. If any line below still reads as "cinematic" or "hero," that's a bug — flag it.

**Two references, two different jobs, neither controls color/light/grade:**
- **Cloudmonster** (`reference-library/cloudmonster-on-running/`) supplies **camera angle and rough composition type only** — wide establishing vs. medium vs. macro, roughly where the subject sits in frame. Not its grade, not its golden-hour mood, not its haze — Cloudmonster is a polished stylized commercial, exactly what documentary-realism rules out, so only the framing/angle transfers.
- **`Object-Asset/design-ref-classic-barbershop.png`** (a real photograph the user supplied) supplies **interior dressing/materials** on the five shop plates — checkerboard floor, chair color/hardware, wood paneling, mirror style, photo wall, jukebox shape — and, being an actual unstylized photograph, its physical realism (wear, uneven light, imperfect reflections) is worth leaning on directly, not just its objects.

**Do not reproduce the design-ref photo's Coca-Cola signage or any other real brand/logo visible in it** — swap for a generic/fictional vintage sign or drop it.

History: v1 anchored across three ads, cited in prose only (never attached as an image) → looked AI-generated. v2/v3 fixed the attach-image issue but pivoted to modern salon → rejected. v4 restored the classic look with dual Cloudmonster+design-ref anchors but kept "cinematic/warm amber-teal grade" language, which is most of why generations still looked plastic after many attempts. v5 (this version) replaces that with documentary realism as the governing technique. v1-v4 plates archived at `Object-Asset/_archive_v1/`.

**Every `[REFERENCE ANCHOR]` line below must be attached as an actual image input at generation time — not just cited by its path in the prompt text.**

Generate each plate **empty — no people**, get it approved, then it feeds keyframes. `@shop_A` is the master — generate it first, then attach it as a reference for `@shop_B`/`C`/`D`/`E` so the room doesn't drift. `@lane_A` is independent (exterior).

**Status (2026-09-22): `@lane_A`, `@shop_A`, `@shop_B`, `@shop_C` generated and hold up well against the documentary-realism technique. `@shop_D` and `@shop_E` were not generated separately — the user decided to reuse `@shop_A`'s image directly for both** (it's the same physical room; a fresh plate wasn't worth the extra generations). `MKG-02_keyframes.md` has been updated so S9 (`@shop_D`) and S6a/S6b (`@shop_E`) reference `@shop_A` directly. The `@shop_D`/`@shop_E` prompt blocks below are kept for their design notes (they explain what each shot's composition needs) but are no longer meant to be generated as separate images — see the caution note added to S9 in the keyframes file about `@shop_A`'s ceiling detail crowding the text-safe upper band it was supposed to have.

---

## @lane_A — pavement, wide eye-level (feeds S1, S2, S7)

```
[IMAGE TYPE] Location plate
[SUBJECT] A brick city street with a snooker table already in place, no people. One
frame from hundreds shot during a real day at this location — the table and street
furniture already existed here; the camera happened to catch this moment.
[DESIGN] A brick street corner, cream/warm-brick buildings with real staining and
soot streaks, a classic barbershop storefront at the left with a red/white/blue
barber pole (paint slightly faded, one bulb dimmer than the others) and a striped
awning (a little sun-bleached), sage-green wood window frames with a few paint
chips, a plain brick wall receding toward center, a wrought-iron fence with some
surface rust, a stoop with worn edges, a street lamp and trees at right, an ordinary
directional sign, a laundry line on a fire escape above. A full-size snooker table
sits off-center in the mid-ground — not posed for the camera, just left there — green
cloth with a couple of faint chalk marks, dark wood legs with real scuffs, both cues
resting unevenly on the rail. No cars, no people, no legible signage.
[POSE] N/A (location plate)
[ENVIRONMENT] Eye-level, ordinary human camera height, roughly 35-50mm feel. Not a
hero shot: the table is off-axis, the street recedes at a natural slight angle (not a
rigid one-point line), there's plausible incidental clutter in the foreground (a bin,
a curb edge, a crack in the pavement, uneven cobblestone) that a photographer would
have simply left in frame rather than dressed around.
[LIGHT] Ordinary daylight appropriate to the time of day implied — uneven
illumination, some areas slightly brighter or darker than others, natural falloff
toward the frame edges, real shadow shapes from the actual objects present (not
generic "long golden shadows"). No artificial haze, no glow, no exaggerated warmth.
[CAMERA] Full-frame feel, ~35-50mm, moderate depth of field with realistic focus
falloff (not everything tack sharp, not everything blurred), restrained bokeh,
natural perspective, fine natural film grain, slight lens softness and edge falloff
permitted.
[EXCLUSIONS] No people, no text, no logos, no legible signage, no cars, no glossy/HDR
look, no teal-orange grade, no golden haze, no perfect symmetry, no pristine surfaces.
[REFERENCE ANCHOR — camera/composition only] @image1 - reference-library/cloudmonster-on-running/shots/shot01_mid_00-00-00_900.jpg
(Shot 1, wide establishing) - ATTACH AS AN ACTUAL IMAGE INPUT - controls camera angle
and rough composition type ONLY (wide, eye-level, subject off-center in a receding
street) - do NOT use its grade, golden-hour glow, haze, subjects, branding, or exact
building. Light and color come from the [LIGHT]/[CAMERA] fields above and
documentary-realism.md instead.
[SEEDANCE ROLE] @lane_A - used in shots 1a, 1b, 7a, 7b - controls the space and light
only - do not use any people in it.
```

---

## @shop_A — chair-row angle, mirrors behind, master plate (feeds S4)

Adapted directly from the user's own worked example in `documentary-realism.md`.

```
[IMAGE TYPE] Location plate
[SUBJECT] An empty classic Americana barbershop interior, no people. One frame from
hundreds shot during a real day at this location — nothing was arranged for the
camera.
[DESIGN] Deep burgundy leather barber chairs with heavy chrome mechanisms recede
naturally through the room — creased, compressed, unevenly worn where people
normally sit, mismatched slightly in wear from one chair to the next. Large aged
wood-framed mirrors sit above a pale marble counter containing casually arranged
barber tools, combs, brushes, jars and folded towels (not perfectly folded, not
symmetrically placed). The opposite wall has an accumulated collection of old
black-and-white framed photographs, a few slightly crooked. A vintage jukebox-shaped
decorative object sits against the wall without branding or readable text. A small
chrome-and-red stool sits nearby, scuffed. Dark wood wainscoting covers the lower
walls, showing scratches and worn edges. The upper walls are aged cream plaster with
minor discoloration. The floor is black-and-white checkerboard tile showing years of
use — scuffs, a little grout wear, uneven reflections. One chair nearest camera left
is empty (this is where S4's barber+customer are added).
[POSE] N/A (location plate)
[ENVIRONMENT] Medium-close, ordinary eye-level camera height, looking down the chair
row toward the mirrors. Not a hero composition: the row is slightly off-axis, objects
overlap naturally, some counter areas are cluttered and others bare, framing feels
like a photographer standing there rather than a designer arranging the shot.
[LIGHT] Ordinary practical lighting — wall sconces and whatever ceiling fixture this
room would actually have, uneven illumination with corners naturally darker, slightly
different color temperature between the tungsten fixtures and any window light,
believable highlight rolloff, no dramatic rim lighting, no volumetric rays.
[CAMERA] Full-frame feel, ~35-50mm, moderate depth of field with realistic focus
falloff, restrained bokeh, fine natural film grain, subtle chromatic aberration and
lens softness at the edges permitted.
[EXCLUSIONS] No people, no text, no logos, no legible signage (including no real
Coca-Cola or other real-brand signage), no teal-orange grade, no golden haze, no
dramatic cinematic lighting, no pristine/cloned-looking chairs, no perfect symmetry.
[REFERENCE ANCHOR 1 — camera/composition only] @image1 - reference-library/cloudmonster-on-running/shots/shot01_mid_00-00-00_900.jpg
(Shot 1, wide establishing) - ATTACH AS AN ACTUAL IMAGE INPUT - controls camera angle
and rough composition type ONLY (medium-close, eye-level, receding row) - do NOT use
its grade, golden-hour glow, haze, subjects, or branding.
[REFERENCE ANCHOR 2 — dressing/materials/realism] @image2 - Object-Asset/design-ref-classic-barbershop.png
- ATTACH AS AN ACTUAL IMAGE INPUT - a real unstylized photograph, controls the
checkerboard floor, chair color/hardware/leather wear, wood wainscoting, mirror
style, photo-wall and jukebox dressing, AND its overall photographic realism (uneven
practical light, real material wear) - do NOT reproduce its Coca-Cola sign or any
other real brand/logo, do not use any people in it.
[SEEDANCE ROLE] @shop_A - used in shot 3a - controls the space, chair and mirror
layout only - do not use any people in it. Master plate: attach this when generating
@shop_B/C/D/E so the room matches.
```

---

## @shop_B — front-facing angle toward the window (feeds S3)

```
[IMAGE TYPE] Location plate
[SUBJECT] Empty barbershop interior, front-facing angle toward the street window, no
people.
[DESIGN] Same barbershop as @shop_A, opposite angle: a glass door center with a
window either side, sage-green wood window frames with a little wear, cream plaster
interior wall above wood wainscoting either side of the doorway, showing the same
accumulated small imperfections as @shop_A. Blurred suggestion of the street beyond
the glass (no legible detail) — the glass itself has faint fingerprints/streaks, not
a pristine pane. Black-and-white checkerboard floor visible at the bottom of frame.
[POSE] N/A (location plate)
[ENVIRONMENT] Medium shot, ordinary eye level, shot from inside looking toward the
window, door/window naturally off-center rather than dead-centered.
[LIGHT] Interior tungsten light mixing with cooler daylight through the window —
genuinely different color temperatures meeting, not smoothly blended; moderate depth
of field, background beyond the glass softly out of focus but not glamorously
bokeh'd.
[CAMERA] Full-frame feel, ~35-50mm, moderate DOF, fine natural film grain.
[EXCLUSIONS] No people, no legible signage or window lettering, no glossy/HDR look, no
teal-orange grade.
[REFERENCE ANCHOR 1 — camera/composition only] @image1 - reference-library/cloudmonster-on-running/shots/shot03_mid_00-00-04_420.jpg
(Shot 2, tight medium close-up) - ATTACH AS AN ACTUAL IMAGE INPUT - controls the
medium frame size and subject-isolation composition type ONLY - do NOT use its grade,
warm glow, subjects, wardrobe or exact porch.
[REFERENCE ANCHOR 2 — dressing/materials/realism] @image2 - Object-Asset/design-ref-classic-barbershop.png
- ATTACH AS AN ACTUAL IMAGE INPUT - controls the wood wainscoting, cream wall tone,
checkerboard floor and overall unstylized photographic realism only - do NOT
reproduce its Coca-Cola sign or any other real brand/logo, do not use any people in
it.
[SEEDANCE ROLE] @shop_B - used in shot 2a - controls the space, materials and light
only - do not use any people in it.
```

---

## @shop_C — counter view, clear countertop (feeds S5, S8a, S8b)

```
[IMAGE TYPE] Location plate
[SUBJECT] Empty barbershop back counter, no people.
[DESIGN] Pale marble counter with clear countertop space, a vintage-style radio at
one end (a little dust on it), plain cream wall above wood wainscoting behind, warm
tones, natural wear/grain in the counter surface and a few faint water rings.
[POSE] N/A (location plate)
[ENVIRONMENT] Medium shot, slightly high ordinary eye level angled down toward the
counter, countertop filling the lower third. This plate also supplies the overhead
top-down crop used in S8a/S8b's product-tap shots — reuse this counter's materials
and light, camera height for that use described separately in those keyframes.
[LIGHT] Ordinary practical light falling across the counter unevenly, real reflected
highlights on the marble that aren't perfectly clean, moderate depth of field with
the background naturally out of focus (not an artificially glamorous product-shot
blur).
[CAMERA] ~35-85mm feel, moderate-to-shallow DOF appropriate for a close counter shot,
fine natural film grain.
[EXCLUSIONS] No people, no text, no logos, no glossy studio-product look, no
teal-orange grade, no artificial rim lighting.
[REFERENCE ANCHOR 1 — camera/composition only] @image1 - reference-library/cloudmonster-on-running/shots/shot05_mid_00-00-07_740.jpg
(Shot 3, macro product / extreme low angle) - ATTACH AS AN ACTUAL IMAGE INPUT -
controls the close product-height framing type ONLY - do NOT use its shallow-DOF
glamour, backlight glow, subject (the shoe), or branding.
[REFERENCE ANCHOR 2 — dressing/materials/realism] @image2 - Object-Asset/design-ref-classic-barbershop.png
- ATTACH AS AN ACTUAL IMAGE INPUT - controls the counter's marble material, wood
wainscoting/cream wall tone, and overall unstylized photographic realism only - do
NOT reproduce its Coca-Cola sign or any other real brand/logo, do not use any people
in it.
[SEEDANCE ROLE] @shop_C - used in shots 4a, 5a, 8a, 8b - controls the space,
materials and light only - do not use any people in it.
```

---

## @shop_D — SKIPPED, reuses @shop_A — empty plate, clear upper third (feeds S9)

**Not generated as a separate image.** Kept below for its design intent only; the keyframe actually uses `@shop_A`'s generated image, with a caution about the upper band (see `MKG-02_keyframes.md` S9).

```
[IMAGE TYPE] Location plate
[SUBJECT] Empty barbershop interior, wide angle down the length of the shop, no
people.
[DESIGN] Row of deep burgundy leather chairs with worn chrome mechanisms down one
side (matching @shop_A's chairs, including their individual variation in wear), cream
walls above wood wainscoting, black-and-white checkerboard floor with real use-wear.
Upper third and a band above where heads will sit left deliberately empty, plain and
evenly lit — no ceiling fans, frames or clutter in that band. Rest of frame carries
the same lived-in realism as @shop_A — not a rigid centered render.
[POSE] N/A (location plate)
[ENVIRONMENT] Wide, ordinary eye level, down the shop, angled naturally rather than
perfectly centered.
[LIGHT] Ordinary practical light carried through the shop, uneven illumination,
natural falloff, believable shadow shapes — the upper band stays evenly lit because
that's genuinely where the room's light is brightest/most even, not because it was
artificially cleaned up.
[CAMERA] ~35-50mm feel, moderate DOF, fine natural film grain.
[EXCLUSIONS] No people, no ceiling fans/frames/clutter in the upper third, no text, no
logos, no glossy/HDR look, no teal-orange grade.
[REFERENCE ANCHOR 1 — camera/composition only] @image1 - reference-library/cloudmonster-on-running/shots/shot01_mid_00-00-00_900.jpg
(Shot 1, wide establishing) - ATTACH AS AN ACTUAL IMAGE INPUT - controls camera angle
and rough composition type ONLY - do NOT use its grade, golden-hour glow, haze,
subjects, or branding.
[REFERENCE ANCHOR 2 — dressing/materials/realism] @image2 - Object-Asset/design-ref-classic-barbershop.png
- ATTACH AS AN ACTUAL IMAGE INPUT - controls the checkerboard floor, chair
color/hardware/wear and wood wainscoting, and overall unstylized photographic realism
only - do NOT reproduce its Coca-Cola sign or any other real brand/logo, do not use
any people in it.
[SEEDANCE ROLE] @shop_D - used in shot 9a - controls the space and the clear upper
band only - do not use any people in it.
```

---

## @shop_E — SKIPPED, reuses @shop_A — chair-row plate, four chairs, OTS-ready (feeds S6a, S6b)

**Not generated as a separate image.** Kept below for its design intent only; the keyframes actually use `@shop_A`'s generated image directly.

```
[IMAGE TYPE] Location plate
[SUBJECT] Empty barbershop interior, four-chair row receding toward center, no
people.
[DESIGN] Four deep burgundy leather chairs with worn chrome mechanisms in a row,
matching @shop_A/@shop_D's chairs and mirrors (each with its own slight variation in
wear, not cloned), cream wall above wood wainscoting, checkerboard floor, receding
slightly toward center (not spread left-right) so an over-the-shoulder framing from
behind a foreground figure still reads all four chairs in depth.
[POSE] N/A (location plate)
[ENVIRONMENT] Framed for an over-the-shoulder composition: enough foreground space at
the bottom of frame for a figure's shoulder/hand to sit in front of the chair row.
Ordinary human-scale framing, not a designed reveal.
[LIGHT] Ordinary practical light, uneven, natural falloff, believable shadow shapes.
[CAMERA] ~35-50mm feel, moderate DOF, fine natural film grain.
[EXCLUSIONS] No people, no text, no logos, no glossy/HDR look, no teal-orange grade.
[REFERENCE ANCHOR 1 — camera/composition only] @image1 - reference-library/cloudmonster-on-running/shots/shot09_mid_00-00-15_950.jpg
(Shot 5, medium OTS → static reveal) - ATTACH AS AN ACTUAL IMAGE INPUT - controls the
over-the-shoulder framing/depth-layering composition type ONLY - do NOT use its
grade, warm glow, subjects, the newsstand dressing, or any branding.
[REFERENCE ANCHOR 2 — dressing/materials/realism] @image2 - Object-Asset/design-ref-classic-barbershop.png
- ATTACH AS AN ACTUAL IMAGE INPUT - controls the chair color/hardware/wear and
checkerboard floor, and overall unstylized photographic realism only - do NOT
reproduce its Coca-Cola sign or any other real brand/logo, do not use any people in
it.
[SEEDANCE ROLE] @shop_E - used in shots 6a (poofs 1-4) - controls the space, chair
and mirror layout only - do not use any people in it.
```

---

## Notes

- **Governing technique is `references/documentary-realism.md`, full stop.** Every LIGHT/CAMERA/COMPOSITION field above is written to that spec: ordinary uneven practical light, moderate DOF, incidental framing, physical wear. If a regenerated plate still looks like a render, re-read that file's ANTI-AI RULE and FINAL TEST sections before touching the prompt again.
- Cloudmonster anchors **camera angle/composition type only** on every plate — never its grade or mood, which is exactly the stylized-commercial look documentary-realism rules out.
- The design-ref photo anchors **dressing, materials, and general photographic realism** on the five shop plates — it's a real photograph, so leaning on its actual light/wear behavior (not just its objects) is valid and encouraged.
- All five shop angles must read as **the same physical room** from different angles/distances — same checkerboard floor, same burgundy/chrome chairs (each with individually varied wear, not cloned), same wood wainscoting + cream wall, same wood-framed mirrors. Generate `@shop_A` first as the master, then attach it as a reference for B/C/D/E.
- The design-ref photo's Coca-Cola sign must never be reproduced, in any plate.
- `@table.png` / `@tablet_front.png` / `@tablet_3q.png` are unaffected by this rewrite — isolated product references on a neutral studio background, a different template category. Worth a documentary-realism pass too if they come back looking rendered, but no complaint has been raised about them yet.
- Once all six are generated and approved, `MKG-02_keyframes.md` needs no renaming — it already references the handles `@lane_A`/`@shop_A`-`@shop_E` throughout.
