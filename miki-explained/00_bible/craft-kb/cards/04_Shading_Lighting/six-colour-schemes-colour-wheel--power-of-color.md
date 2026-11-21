---
title: Six colour-wheel schemes — complementary, monochromatic, analogous, triadic, tetradic, split-complementary
bucket: 04_Shading_Lighting
source: "The Power of Color in Blender 3D!.txt"
source_time: "10:08–12:52"
blender_version_source: 4.x
tool_target: principle-only
tier: full
style_fit: Complementary or split-complementary around the one accent; monochromatic for calm explainer beats. Balance is what sells it.
---

## METADATA
04_Shading_Lighting | any | Principle

## CREATIVE_INTENT
- Complementary (opposites, e.g. blue/orange, teal-orange): high contrast and energy; makes elements pop.
- Monochromatic (one hue in shades — not black-and-white): elegant, minimal, stylised.
- Analogous (≈3 neighbours): harmonious, natural; common in environments.
- Triadic (3 evenly spaced): balanced but vibrant, comic-like; superhero media.
- Tetradic / double complementary (two complementary pairs in a rectangle): rich, complex, needs balancing; busy scenes.
- Split-complementary (a colour + the two neighbours of its complement): complementary’s energy with less tension; dynamic but controlled.

## STE_PROCEDURE
1. Place the accent hue on the colour wheel (Blender’s colour picker wheel works).
2. Pick the scheme for the shot’s energy.
3. Read the other hues off the wheel.
4. Balance: one dominant, the rest supporting at lower saturation/area.

## AGENT_EXECUTION
Hue maths for an agent (HSV degrees): complementary = h+180; analogous = h±30; triadic = h±120; split-complementary = h+150, h+210; tetradic = h, h+60, h+180, h+240.
```python
import colorsys
def hexs(h, s=0.7, v=0.9): r, g, b = colorsys.hsv_to_rgb((h % 360) / 360, s, v); return "#%02x%02x%02x" % (int(r*255), int(g*255), int(b*255))
split = [hexs(h) for h in (accent_h, accent_h + 150, accent_h + 210)]
```

## NOTES
- Deprecated: none.
- Visual gaps: wheel diagrams on screen.
- Rule conflicts: triadic/tetradic risk multiple saturated accents — desaturate all but one.

