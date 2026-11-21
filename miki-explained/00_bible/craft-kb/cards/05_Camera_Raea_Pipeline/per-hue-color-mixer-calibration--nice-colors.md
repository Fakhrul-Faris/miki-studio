---
title: Per-hue saturation/hue (colour mixer / calibration) instead of global saturation
bucket: 05_Camera_Raea_Pipeline
source: "How to get nice colors in your renders.txt"
source_time: "15:31–19:30"
blender_version_source: n/a (Photoshop Camera Raw)
tool_target: raea
tier: full
style_fit: Lets the accent hue be pushed while the base stays calm; in raea do it per material since <Grade> has no per-hue control.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Photoshop) | raea (translation)

## CREATIVE_INTENT
Use at the grade when global saturation makes everything garish: raising or shifting one hue at a time (colour mixer, or
the R/G/B "calibration" primaries) gives a cleaner, more controlled result than the global slider.

## STE_PROCEDURE
1. Select the top layer; press Ctrl+Alt+Shift+E (stamp all layers into one).
2. Filter → Convert for Smart Filters (non-destructive).
3. Filter → Camera Raw Filter.
4. Raise global Saturation moderately.
5. In Color Mixer, shift individual hues (e.g. orange toward pink or yellow) as needed.
6. In Calibration, raise Red Primary saturation strongly and Blue Primary slightly; shift Red hue (orange → red-orange).
7. Toggle the panel to compare; keep what is cleaner than global saturation.
8. Optional: add a Hue/Saturation layer on top (+24) for a final push.

## AGENT_EXECUTION
### Source tool (Photoshop Camera Raw)
Stamp visible (Ctrl+Alt+Shift+E) → Smart Object → Camera Raw: Basic Saturation +, Color Mixer (HSL per hue), Calibration (Red/Green/Blue Primary Hue + Saturation). Values visual only.

### Blender / raea translation
- raea: no equivalent per-hue mixer in `<Grade>` (it offers global `saturation`, `temperature`, `tint` and `shadows`/`midtones`/`highlights` `{saturation, contrast, gamma, gain, lift}`).
- Do the per-hue work at the source: edit the accent material's hex / `emissive` multiplier, or the light `color`, directly — raea renders the scene fresh, so there's no need to fix hues afterwards.
- Blender compositor equivalent if ever needed: Hue Correct node (per-hue H/S/V curves).

## NOTES
- Deprecated: none.
- Visual gaps: all slider positions visual only.
- Rule conflicts: none.
