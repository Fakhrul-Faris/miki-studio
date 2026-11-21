---
title: Per-channel curves on a greyscale frame to discover a palette (blur first for richer mixes)
bucket: 06_Art_Direction
source: "Procedural Mograph & 3D-to-AI Render Passes/A better way to colour your work!.txt"
source_time: "00:25–03:31, 04:00–05:21"
tool_target: ref-analysis
tier: principle
use_when: "look development for a new style or a UI-heavy flat episode: finding the neutral palette (shadows/mids/highlights) around the fixed brand accent"
style_fit: "⚠ conflict: curves colour the whole frame and can invent many hues → adapted: use it only to explore the neutral world's tint on a greyscale still; the brand accent is fixed and added afterwards. Exploration tool, never the final grade."
---

## METADATA
06_Art_Direction | After Effects (Curves, CC Toner) / Photoshop | ref_<shot>.md palette

## CREATIVE_INTENT
Make work in greyscale, then colour it with a Curves effect per channel: on the Red/Green/Blue line, bottom = blacks,
middle = mids, top = whites; pulling left adds that hue, right removes it. Two points: it is "so easy to get something
interesting just moving some graph lines", and the channels "mix often in unexpected ways — that is the magic", giving
palettes "different to what you would ordinarily be drawn to". Blur placed *below* the curves creates "more mud tones"
that the curves colour into "interesting and complex" results. Then pick the found colours into CC Toner (one colour per
tone) for fine control.

## STE_PROCEDURE
1. Before exploring, render the setup's still in greyscale.
2. Push the red curve at shadows, mids and highlights; then green; then blue.
3. Save 3–5 variants; keep the ones whose neutrals feel right for the episode.
4. Optional: blur a copy before the curves to see richer in-between tones.
5. Pick shadow, mid and highlight colours from the best variant as hex.
6. Write them into `ref_<shot>.md` as the neutral palette roles.
7. Add the brand accent as the only saturated colour; check it still pops.

## AGENT_EXECUTION
raea has no per-channel curves (`<Grade>` has shadows/midtones/highlights saturation/contrast/gamma/gain/lift and
temperature/tint, no RGB curves) — explore on stills with ffmpeg's `curves` filter, then build the palette into
lights and materials:
```bash
ffmpeg -v error -i out/s02_grey.png -vf "curves=r='0/0.08 0.5/0.55 1/0.95':g='0/0.04 0.5/0.48 1/0.92':b='0/0.12 0.5/0.5 1/0.85'" -frames:v 1 out/s02_try1.png
ffmpeg -v error -i out/s02_grey.png -vf "gblur=sigma=6,curves=r='0/0.08 0.5/0.55 1/0.95':b='0/0.12 0.5/0.5 1/0.85'" -frames:v 1 out/s02_try1_blur.png
```
For HyperFrames (flat 2D), a CSS/SVG `feComponentTransfer` per channel does the same on a greyscale layer.

### Worked example
Topic: "Kedai kopi kecil: berapa cawan sehari untuk tutup sewa" (illustrative: RM2,400 rent ÷ RM3 margin ÷ 30 days ≈ 27 cups a day).
- BEFORE ref palette: "brown, cream, coffee colours" (generic).
- AFTER: greyscale still of the cup → curves try 2 (red lifted in shadows, blue lifted in highlights) → ref_03.md palette: shadow `#1d1416` (room), mid `#6b5a55` (counter), highlight `#e9e4ea` (cup rim), accent `<brand>` on "27 cawan" only.

### Check
- Was the palette found on a greyscale still, not picked by habit?
- Are the found colours used only for the neutral world?
- Is the brand accent the only saturated colour after colouring?

## NOTES
- AE Curves / CC Toner / Photoshop import steps dropped; replaced by ffmpeg `curves` + `gblur` on stills.
- Visual gaps: the curve shapes used on screen are not stated; the ffmpeg values above are illustrative (`~`).
