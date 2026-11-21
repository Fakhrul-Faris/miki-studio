---
title: Posterize a smooth gradient into flat colour blocks (Map Range → Stepped)
bucket: 06_Art_Direction
source: "Procedural Mograph & 3D-to-AI Render Passes/Do This Next Time You Pick Colors for Your Art (Blender Tutorial).txt"
source_time: "14:53–15:32"
tool_target: HyperFrames
tier: full
use_when: "a smooth gradient reads too soft/photographic for a flat graphic moment and needs a bold Pantone-swatch block look instead"
style_fit: "A flat-graphic finishing step for HyperFrames/2D layers; does not apply to Style D's lit 3D macro object, only to flat UI/graphic/chart layers."
---

## METADATA
06_Art_Direction | Blender Map Range node (Linear → Stepped) | HyperFrames discrete colour stops / CSS hard gradient stops

## CREATIVE_INTENT
Feeding a smooth gradient's factor through a Map Range node set from "Linear" to "Stepped," then raising the step
count, turns a continuous fade into discrete flat colour bands — the look of a Pantone colour-wheel chart rather
than a soft blend. Raising the step count further makes any animation driving the gradient (e.g. the looping wave)
read as more dramatic, since the eye now tracks hard-edged blocks jumping rather than a smooth drift.

## STE_PROCEDURE
1. Take the Fac (factor) output already driving your gradient/colour ramp.
2. Insert a Map Range node before it reaches the ramp.
3. Change Map Range's interpolation from Linear to Stepped.
4. Raise the Steps value until the gradient reads as distinct flat colour blocks rather than a smooth fade.
5. If the gradient is animated (e.g. a drifting phase), raise Steps further for a more dramatic, obviously-blocky motion; lower it for a subtler effect.

## AGENT_EXECUTION
HyperFrames/CSS translation: replace continuous colour-stop positions with repeated hard stops at the same colour
(each colour appears twice, back to back, with no fade between its own pair) to fake a stepped/posterized look in
CSS, since CSS gradients have no native "stepped" interpolation mode.
```css
background: linear-gradient(90deg,
  #1f3fae 0%, #1f3fae 20%,
  #ffb800 20%, #ffb800 40%,
  #ff2d2d 40%, #ff2d2d 60%,
  #4a1140 60%, #4a1140 80%);
```
### Worked example
Topic: a "before/after" savings bar chart fill for a kedai runcit's monthly cost (illustrative numbers).
BEFORE: a smooth gradient fill behind the bar — reads soft, photographic, competes with the sharp data line.
AFTER: the same hues posterized into 4–5 flat bands — reads as a graphic/infographic element, matching the chart's flat data style instead of fighting it.
### Check
- Does the gradient read as distinct flat blocks, not a soft fade, where a posterized look is wanted?
- Is the step count tuned so any driving animation (if present) reads at the intended intensity (subtle vs dramatic)?
- Is this only applied to a flat 2D/graphic layer, never dressed onto the Style D lit 3D hero object?

## NOTES
- Visual gaps: the exact Steps value is never stated, only shown rising on screen (author says "bring up those steps even more if you want") — treat as `~`, tune by eye.
- Translation: CSS/SVG gradients have no "Stepped" interpolation mode; the paired hard-stop technique above fakes it.
