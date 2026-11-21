---
title: Specify colour with three levers — hue, saturation, brightness (HSB)
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Color Theory in Film — Color Psychology for Directors Ep5.txt"
source_time: "00:31–00:60, 02:59"
tool_target: ref-analysis
tier: full
use_when: "writing palette roles in ref_<shot>.md / the frame brief; any note like 'make it more blue' that needs a precise target"
style_fit: "Fits: lets support colours vary in S and B while the brand accent keeps its hue — the one-accent rule expressed as 'only one high-S colour'."
---

## METADATA
06_Art_Direction | film colour design (tool-agnostic) | ref_<shot>.md palette + raea hex values

## CREATIVE_INTENT
Go beyond "placing a blue tint over an entire sequence": determine specifically what blue. Colour has three factors:
**hue** (the colour itself), **saturation** (its intensity) and **brightness** (how light or dark). With HSB alone you
can build a complex colour scheme simply and "precisely identify the right colours to create certain feelings".

## STE_PROCEDURE
1. Before writing any palette, give each colour as H (°), S (%), B (%) plus its hex.
2. Decide hue per role: one hue family for the world, the brand hue for the accent.
3. Set saturation: only the accent above ~60 % S (~); support colours low.
4. Set brightness per role: dominant dark (Style D room ≤ ~20 % B ~), secondary mid, accent high.
5. Change one lever at a time when revising, and name it ("+10 B", "−20 S").

## AGENT_EXECUTION
ref_<shot>.md palette lines: `#1a1920 — H 250 S 20 B 12 — dominant (room)`. Convert with Python before hexes go into raea:
```python
import colorsys
def hsb(h, s, b): r, g, bl = colorsys.hsv_to_rgb(h/360, s/100, b/100); return "#%02x%02x%02x" % (round(r*255), round(g*255), round(bl*255))
print(hsb(250, 20, 12), hsb(28, 90, 100))   # room, accent
```
Saturation check on a still: the accent-coverage script in `masters/04_Shading_Lighting/colour-wheel-palette-schemes.md`.
### Worked example
Topic: "Cara pilih supplier ayam untuk gerai: 3 step" (illustrative).
- BEFORE (ref palette): "dark blue bg, warm wood, orange accent, white tag".
- AFTER: `H 230 S 25 B 10 #13141a dominant (room) · H 25 S 45 B 45 #735a3f secondary (chopping board) · H 40 S 8 B 92 #ebe6dc tag paper · H 28 S 90 B 100 #ff8a1a accent (price on the supplier slip)` — only one colour above S 60.
### Check
- Does every palette colour have H/S/B and a hex?
- Is only the accent highly saturated?
- Do revision notes name which lever changed?

## NOTES
- Visual gaps: example frames on screen; numeric thresholds (~60 % S, ≤ ~20 % B) are inferred, not stated.
- HSV/HSB vocabulary also appears in `masters/04_Shading_Lighting/colour-psychology.md`; this card adds HSB as a
  per-colour spec method.
