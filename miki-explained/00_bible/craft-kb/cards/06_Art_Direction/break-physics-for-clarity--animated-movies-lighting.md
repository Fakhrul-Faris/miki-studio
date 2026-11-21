---
title: Break the light's physics when it hides what the viewer must see
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Why Lighting Animated Movies Is So Complicated | Movies Insider | Insider.txt"
source_time: "04:56–05:11"
tool_target: board-check
tier: full
use_when: "board check / still QC: a shadow, reflection or dark area covers the number, label, logo or screen the line is about"
style_fit: "Fits Style D: dark room stays dark, but the line's subject is never the hidden part (darkness-guides-the-eye rule)."
---

## METADATA
06_Art_Direction | general (Sony Imageworks, *Over the Moon*) | board check + raea light fix

## CREATIVE_INTENT
The renderer calculated that Fei Fei's bangs would shadow much of her eyes, "so the lighting team made the decision to
break the rules of reality and eliminate or lighten them when necessary to help the audience better see her facial
expressions." Clarity of the story beats physical correctness.

## STE_PROCEDURE
1. Before approving a still, name what the line needs the viewer to read (number, label, logo, screen).
2. Check whether any shadow, reflection or glare falls on it.
3. If yes, keep the overall light and fix only that area.
4. Lighten the shadow with a small local light, or exclude the occluder from casting shadow.
5. Kill a reflection over text by moving or range-limiting the source that causes it.
6. Recheck that the fix is invisible as a "light" (no new visible highlight elsewhere).

## AGENT_EXECUTION
Board check line: "line's subject fully readable (no shadow/glare over it)". raea fixes: a small `PointLight` with short
`range` aimed at the hidden area; if the occluder is 3D text, `castShadow={false}` (a documented text prop in
`meshes.md`); for a model, no per-mesh shadow switch is documented, so move the occluder or the light; for screens, raise the screen's emissive so it holds
against the shadow. Set-1 related: `masters/04_Shading_Lighting/darkness-guides-the-eye.md`.

### Worked example
Topic: "Harga petrol RON95: kenapa sama di semua stesen" (Malaysian pump prices for RON95 are set by the government, so every station shows the same price — real).
- BEFORE still: macro of the pump display; the nozzle's shadow covers the price digits.
- AFTER: same framing and top key; one `PointLight` (range 0.4 m) lifts the display area; the digits read sharp; accent on the price; board check passes "subject fully readable".

### Check
- Is the line's subject free of shadow, glare and reflections?
- Was only the local area fixed (overall look unchanged)?
- Does the fix add no visible new highlight?

## NOTES
- Visual gaps: the before/after bangs frames are not described.
- Character faces are not used (no people in Style D); principle applied to the object's readable part.
