---
title: Rectangular beam light rig — narrow-spread area lights for visible light-streak drama
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/Modern Lighting Techniques in Blender.txt"
source_time: "14:18–16:11"
tool_target: raea
tier: principle
use_when: "briefing a product/hero-object shot that wants a visible dramatic beam of light, not just illumination"
style_fit: "Fits Style D's one soft top light + dark room: this is a controlled variant for when the beam itself (not just what it lights) should read as a shape."
---

## METADATA
04_Shading_Lighting | Blender (any version, EEVEE/Cycles) | area lights + sky texture sun=0 → raea RectLight/SpotLight

## CREATIVE_INTENT
To get a visible, controllable beam shape (rather than a soft general glow), use rectangular/area lights instead of
spotlights — a spotlight's beam is circular at the end, while a rectangular light gives a long, narrow beam shape.
Two such lights — one narrow-spread beam hitting the product from one direction, a second long skinny light hitting
it from another — stack into a dramatic two-point rig, paired with a very low ambient fill (sky texture, sun
strength 0, low HDRI strength) so the beams themselves stay the visible event.

## STE_PROCEDURE
1. For a visible beam (not just illumination), choose a rectangular/area light over a spotlight.
2. Set the light's spread narrow (source used 5°) so the beam stays defined with soft edges, rather than fully
   diffusing (spread near 1° is nearly a hard-edged shaft; much higher washes the beam away entirely).
3. Add a second rectangular light from a different angle/shape (long and skinny) so two beams cross the product.
4. Kill the sun (strength 0) and keep only a very low HDRI/sky strength (source used ~0.3) as fill, so the beams read
   as the dramatic event, not a background wash.
5. Check the product/hero sits exactly where the beams cross — that's the focal point the rig is building toward.

## AGENT_EXECUTION
raea: two `RectLight`s at narrow angular spread equivalents (tune via light size and distance — a `RectLight` with a
small `width`/`height` relative to its distance gives a narrower, more defined beam than a large one), aimed to cross
at the hero object; `AmbientLight` kept very low (brightness ≈ background fill only); no directional "sun" light.

### Worked example
Topic: a vending machine's coin slot lit for a macro "this is where the money goes" beat.
BEFORE: one soft top light evenly fills the whole machine face — no sense of drama on the slot itself.
AFTER: a narrow RectLight beam angled down across the coin slot (spread tight enough to stay a defined shaft), a
second long skinny RectLight crossing it from the side, both against a near-black world with only a faint ambient
fill — the coin slot reads as the one dramatically lit point on the machine.

### Check
- Is the beam shape rectangular/defined, not a soft circular spotlight wash?
- Do the two beams cross exactly at the hero object?
- Is the ambient/HDRI fill low enough that the beams remain the visible event, not just background light?

## NOTES
- Visual gaps: the exact light sizes/distances used are shown on screen only (`~`); the 5° spread and ~0.3 HDRI
  strength are the only stated numbers.
- Rule fit: this is a deliberate exception to "one soft top light" for a specific dramatic-beam beat, not a default —
  use sparingly, and keep to the house's one brand accent (tint one of the beams the accent colour, not both).
