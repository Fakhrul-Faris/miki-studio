---
title: Multiply blend mode drops a flat graphic's white/black ground into the scene colour without a mask
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How To Master Shape Morphing For Apple Ui Style – Full After Effects Tutorial.txt"
source_time: "31:13–31:40"
tool_target: raea
tier: principle
use_when: "layering a flat line-art graphic (a stopwatch face, an icon sheet) over a coloured UI background and the graphic's own ground would otherwise show as a visible box"
style_fit: "Fits — a code-drawn equivalent (mix-blend-mode: multiply, or simply drawing on a transparent ground) keeps the layer flat and avoids an extra mask step."
---

## METADATA
09_UI_Motion | After Effects Multiply blending mode (source) → raea mix-blend-mode / transparent fill | raea

## CREATIVE_INTENT
Two graphic layers (a stopwatch/timer illustration and its base tri-colour shape) are set to Multiply instead of Normal
blend mode, so their white backgrounds disappear into whatever sits behind them and only the dark line-art reads —
avoiding a separate garbage-mask or alpha-cutout step for a flat asset that was exported with a white ground.

## STE_PROCEDURE
1. Before masking a flat graphic's white/light ground, try Multiply blend mode first.
2. Check the graphic's dark linework still reads at full value once multiplied onto the background colour.
3. If the background itself is too dark, Multiply will crush the graphic — use it only over a mid-light ground.

## AGENT_EXECUTION
raea: prefer drawing the icon with a transparent ground from the start (SVG/vector); where an asset genuinely has a
baked white/light background (an imported raster), use CSS `mixBlendMode: "multiply"` on that layer instead of cutting
an alpha mask:
```tsx
<img src={stopwatchAsset} style={{ mixBlendMode: "multiply" }} />
```
Shot row: unaffected — this is a compositing note, not an event; flag it in a frame brief's Handover when a raster
asset with a baked ground is used: "stopwatch raster — multiply blend over the panel, not masked".

### Worked example
Topic: a kedai's closing-time countdown on a phone screen (illustrative).
- BEFORE: an imported stopwatch icon sits on the UI panel inside a visible light-gray box (its own baked background).
- AFTER: the layer is set to multiply blend over the panel colour; the box disappears and only the stopwatch linework
  shows.

### Check
- Does the asset's ground fully disappear into the background colour (no visible box edge)?
- Is the background behind it light enough that multiply doesn't crush the linework?
- Was a transparent-ground vector tried first, before reaching for multiply on a raster?

## NOTES
- Visual gaps: none — the mechanism (blend mode swap) is stated plainly.
- AE dropped: nothing really — multiply blend mode is a direct, one-line equivalent in CSS/canvas; only the asset
  pipeline differs (raea prefers drawing with a transparent ground over masking a raster after the fact).
