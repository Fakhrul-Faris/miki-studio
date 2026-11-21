---
title: Complementary palette with a dominant colour and a ≤25% accent
bucket: 04_Shading_Lighting
source: "How to get nice colors in your renders.txt"
source_time: "00:46–06:48"
blender_version_source: n/a (colour principle; shown in Photoshop colour picker)
tool_target: principle-only
tier: full
style_fit: Matches Style D exactly — dominant neutral/warm base, one saturated brand accent on ≤ ~25% of frame, only on what the line is about.
---

## METADATA
04_Shading_Lighting | n/a | principle-only (applied via raea materials/lights)

## CREATIVE_INTENT
Use whenever you pick a frame's colours: one dominant base hue plus its rough opposite on the colour wheel always pairs well, and
the frame reads best when the base covers ~70–80% and the complement ≤25%, never 50/50. Split-complementary (the two hues either
side of the opposite) is equally valid and gives more variety.

## STE_PROCEDURE
1. Pick the base colour of the frame (any hue works).
2. Find its opposite on the colour wheel; any hue roughly there works — exact maths isn't needed.
3. Optional: use split-complementary — take the two hues either side of the opposite instead.
4. Give the base hue ~70–80% of the frame area.
5. Limit the complement to ≤25% of the area, placed on the edges or the point of interest.
6. Never balance the two at 50/50.
7. Check by eye-dropping the render: dominant hue should appear almost everywhere, accent only in pockets.
8. If unsure, trust what looks good; the theory is a fallback.

## AGENT_EXECUTION
### raea
- Base hue: environment and lights — `<SpotLight color="#ffe2c0">` key, surface `base_color` in the base family, `<Grade temperature>` to lean the whole frame.
- Accent: one material only — `emissive={LinearRgba.from(Srgba.hex(ACCENT)).mul(2)}` or a saturated `base_color` on the subject of the line; a cool `<PointLight color="#9fc4ff">` rim counts as the complement.
- Check area: render a still (`raea render EDIT.tsx --frame N -o F.png`) and estimate accent coverage (≤25%; for Style D usually ≤10%).
```python
# quick accent-coverage check on a still (PIL)
from PIL import Image; import colorsys
im = Image.open("F.png").convert("RGB").resize((270, 480)); px = list(im.getdata())
def hue(p): return colorsys.rgb_to_hsv(*[c/255 for c in p])
acc = sum(1 for p in px if (h:=hue(p))[1] > 0.5 and abs(h[0] - ACCENT_H) < 0.06)  # ACCENT_H in 0..1
print(acc / len(px))
```

## NOTES
- Deprecated: none.
- Visual gaps: colour-wheel positions are shown on screen; specific hex values not given.
- Rule conflicts: none — reinforces the one-accent rule (accent stays on what the line is about).
