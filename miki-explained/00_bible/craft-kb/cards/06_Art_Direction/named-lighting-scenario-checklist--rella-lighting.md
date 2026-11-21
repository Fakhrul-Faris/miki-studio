---
title: Name the lighting scenario before building the frame (stage / dappled / sunset-rim)
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/How Learning From Rella Fixed My Boring Lighting.txt"
source_time: "07:03–13:19"
tool_target: ref-analysis
tier: principle
use_when: "writing the mood/light fields of a ref_<shot>.md or frame brief, before building the setup"
style_fit: "Gives frame briefs a named-scenario vocabulary to pick from rather than inventing lighting from scratch each time. Different artefact/medium from the 3D Blender masters (sun-side-or-behind, gobo-shadow-patterns): this names 2D-illustration mood scenarios for the brief's Feeling field, not Blender node values, so it is additive vocabulary rather than a duplicate of those masters' execution steps."
---

## METADATA
06_Art_Direction | 2D illustration lighting scenarios (Rella-style) | frame brief Feeling/Eye fields, ref-analysis mood

## CREATIVE_INTENT
Three named, checklist-able lighting scenarios the author reverse-engineered from reference art, each with its own
signature move:
- **Stage/rim** (black background, intense circular spotlight, or a thin rim-only edge light): dramatic, mysterious mood.
- **Dappled/leaf-light**: a leaf/cloud-shaped shadow mask over the subject reading as "80% done" on its own.
- **Sunset rim-glow**: grey-blue shadow base + warm orange glow reflecting the sun at the bottom + a rim light.
Naming the scenario up front gives a short checklist to build against instead of improvising lighting per frame.

## STE_PROCEDURE
1. Before building a frame's light, name which scenario it is (or that none of these three fits).
2. Stage/rim: set the background black/very dark; add a thin, minimal rim-only edge light; keep it stronger/more intense than normal, so it glows where it touches the surface; let any dust/particles catch the light as they pass through it.
3. Dappled/leaf-light: place a leaf- or cloud-shaped shadow shape (an image, or your own silhouette) over the subject in a shadow (multiply) layer as a fast ~80% base; add a secondary, minimal shadow; add a pinkish glow around the light areas for warmth.
4. Sunset rim-glow: shadow base in grey-blue (not black); add an orange glow at the bottom reflecting the sun; add a rim light; keep the areas closest to the light source sparse on detail (strong light erases detail/local colour there).
5. Whichever scenario, finish with the frame's named mood in mind, not just the technical steps — ask what mood this scenario is for (stage = mysterious/dramatic; sunset = vibrant and complementary).

## AGENT_EXECUTION
In `ref_<shot>.md`'s mood/light fields, write the named scenario plus its 2–3 checklist items so the raea light/gobo
brief downstream has a concrete target instead of an adjective. Translate per scenario:
- Stage/rim → raea: very low/zero fill, one strong rim `SpotLight`/`DirectionalLight` behind/beside the subject, near-black background.
- Dappled → raea: use the existing gobo master (`masters/04_Shading_Lighting/gobo-shadow-patterns.md`) to cast the leaf/cloud shape; this card supplies the *why* (mood, "80% done" shortcut), the gobo master supplies the *how* (geometry/shader).
- Sunset rim-glow → raea: combine the existing `sun-side-or-behind.md` angle guidance with a warm accent glow at the base and a cool-leaning shadow tint, per this card's palette notes.
### Worked example
Topic: a night-market stall's hero lantern, built as a "stage/rim" scenario (illustrative).
BEFORE: generic soft top light with no named mood — reads flat, no drama.
AFTER: background dropped near-black, one thin rim light behind the lantern catching its edge, any steam/smoke
particles passing through it lit up — named "stage/rim," built to a 3-item checklist instead of eyeballed.
### Check
- Is the frame's lighting scenario named, from this list or explicitly "none of these"?
- Does the build match that scenario's checklist (background treatment, light placement, detail-density rule)?
- Does the chosen scenario serve the line's mood, not just look cool?

## NOTES
- Visual gaps: exact colours/opacities for the shadow/glow layers are shown on screen, not stated as numbers — treat as references, not values.
- Cross-reference, not duplicate: dappled/sunset content echoes `gobo-shadow-patterns.md` and `sun-side-or-behind.md`
  (both set-1, Blender-execution masters) but this card targets the frame-brief/ref-analysis mood vocabulary for a
  2D-illustration source, not their Blender node values — no addendum written to those masters since nothing here
  fits their VALUES BY SOURCE tables.
