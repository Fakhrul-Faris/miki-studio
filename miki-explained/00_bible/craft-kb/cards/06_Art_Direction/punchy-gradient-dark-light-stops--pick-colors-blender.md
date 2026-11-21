---
title: Punchy gradient — insert dark and light stops between saturated hues
bucket: 06_Art_Direction
source: "Procedural Mograph & 3D-to-AI Render Passes/Do This Next Time You Pick Colors for Your Art (Blender Tutorial).txt"
source_time: "00:00–08:52"
tool_target: HyperFrames
tier: full
use_when: "building any flat gradient graphic layer (a background, a chart fill, a title-card backdrop) that should feel vibrant instead of muddy"
style_fit: "Pure palette/graphic-layer technique, not a 3D look — usable for HyperFrames gradient overlays or raea 2D text/graphic layers. Keep the saturated stops limited to the one brand accent family when used behind Style D text; elsewhere it can carry its own full palette since it is a flat graphic layer, not the lit 3D hero."
---

## METADATA
06_Art_Direction | Blender Color Ramp (shader) | HyperFrames gradient / raea 2D layer

## CREATIVE_INTENT
Two gradients with the same hues can feel flat or "punchy" depending on one thing: whether the fade goes hue→hue
directly, or passes through a near-black and near-white stop between hues. Going straight hue-to-hue keeps every
colour at the same value/brightness, so nothing pops. Routing each transition through dark then light (or light
then dark) fakes highlights and shadows with no actual lighting, which is why Pantone-style gradients "hit so hard."

## STE_PROCEDURE
1. Before building any gradient, decide the hue sequence you want (e.g. blue → red → yellow).
2. Between each pair of adjacent hues, insert one near-black stop and one near-white stop (not just a straight blend).
3. On the way out of a saturated colour toward black, add one darker/desaturated version of that hue as a transition stop (e.g. red → dark purple → black), not a straight cut to black.
4. On the way out of black toward the next hue, mirror the same idea with a darker tint of the incoming hue (e.g. black → dark orange → vibrant yellow).
5. Set the ramp's interpolation to B-spline (not Linear) so stops fade smoothly instead of hard-cutting.
6. To "lock" a stop's exact colour at full strength on both sides of a transition (B-spline otherwise erodes it), copy that colour stop and paste a duplicate immediately next to it.
7. Space all stops roughly evenly once the sequence is right, then nudge by eye until the fade looks alive.

## AGENT_EXECUTION
Blender (reference build, author's exact steps):
```
Shading tab → New material → delete Principled → add Emission
Shift A → Gradient Texture (Radial) → Color Ramp
Ctrl+T (Node Wrangler) → adds Mapping + Texture Coordinate before the Gradient Texture
Color Ramp: Interpolation = B-Spline
Stops (example sequence, deep blue start):
  blue (locked: copy/paste the same blue stop beside itself)
  → black (+ a second black stop nearby, for B-spline reinforcement)
  → brighter blue → white (desaturate a blue copy to 0 saturation)
  → (mirror white, locked by copy/paste)
  → red → dark purple → black
  → dark orange → vibrant saturated yellow
```
HyperFrames translation (CSS/SVG, since raea has no node-based shader graph): build the same stop sequence as an
SVG `<linearGradient>`/`<radialGradient>` or CSS `conic-gradient`, inserting `#000` and near-white stops between
each saturated colour exactly as above, and use enough stops close together to fake the B-spline's smooth fade
(CSS/SVG gradients interpolate linearly between stops, so smoothness comes from stop density, not an interpolation mode).
```css
background: conic-gradient(from 0deg,
  #1f3fae, #0a1540, #1f3fae, #ffffff, #ffffff,
  #ff2d2d, #4a1140, #000000, #5a2a00, #ffb800, #1f3fae);
```
### Worked example
Topic: a chart background behind "sebulan RM450" — the monthly plastic-bag cost total for a kedai runcit (illustrative numbers).
BEFORE: a flat blue-to-brand-accent gradient fill behind the number — reads muddy, doesn't separate from the number on top.
AFTER: the same two hues with a near-black and near-white stop inserted between them — the fill now has a visible
"highlight" band the RM450 can sit inside, without adding any extra light or object.
### Check
- Does every hue-to-hue transition pass through at least one dark and one light stop, not a direct blend?
- Is a copy/paste duplicate used to hold a saturated stop's exact colour where the fade would otherwise erode it?
- In the HyperFrames/CSS version, are there enough stops to read as smooth rather than banded?

## NOTES
- Visual gaps: every exact stop position and colour value was picked by eye on screen (Pinterest/Philip Pantone
  references); none are stated numbers — all values here are `~` approximations of the sequence shown, not exact hexes.
- Translation: Blender's B-Spline ramp interpolation has no CSS/SVG equivalent (those only interpolate linearly
  between stops) — the fix is to add intermediate stops for smoothness rather than relying on a spline setting.
