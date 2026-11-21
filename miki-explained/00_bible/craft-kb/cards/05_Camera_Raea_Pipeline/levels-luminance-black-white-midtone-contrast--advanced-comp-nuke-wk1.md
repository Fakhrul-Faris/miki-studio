---
title: Levels part 1 — match luminance (white point, black point, mid-tone contrast)
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "17:14–21:46"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Serves Style D directly — the hero object, its surface and any screen/UI insert must share one black floor and one highlight ceiling in the dark room, or the insert reads pasted on.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: an element "sits" in a shot only when its brightness range matches the plate — brightest highlights, darkest shadows and the mid-tone contrast between them. Idea: fix highlights first, then re-check blacks (fixing one usually exposes the other), then judge whether the image still has range in the mids.

## STE_PROCEDURE
1. Compare the element's brightest highlight with the plate's brightest comparable highlight.
2. If highlights are "nuclear" (too bright), lower gain/multiply until they match the plate.
3. After fixing whites, re-check blacks; they are often now too dark.
4. Raise or lower lift until the element's shadows equal the plate's nearby shadows (e.g. a ship's underside vs the shadow under it).
5. Never let an element's shadow side be lighter than the cast shadow beside it.
6. If blacks and whites match but the image feels flat, add mid-tone contrast sparingly.
7. After adding contrast, re-balance blacks with offset.
8. A/B against the reference grade; stop when nothing jumps out as too bright or too dark.

## AGENT_EXECUTION
### Source tool (Nuke)
`Grade` under the element: `gain`/`multiply` for whites, `lift` for blacks, `offset` to re-seat blacks after a contrast change; `ColorCorrect` `contrast` for mid-tones. Sample values with Ctrl-drag in the Viewer.
### Blender / raea translation
- In raea the "element" is a material or a light, not a layer: lower an over-bright highlight by reducing the key's `intensity`/`illuminance` or the material's `emissive` multiplier, not by grading the whole frame.
- Whole-frame match: `<Grade shadows={{ lift: 0 }} midtones={{ contrast: 1.04 }} highlights={{ gain: 1 }} />` (kit `ProStage` ships `midtones={{ contrast: 1.04 }}`). Grade is one value for the whole piece (first frame holds).
- Screens/UI on a `<Screen>`: their white must not exceed the brightest lit surface; if a page is the brightest thing, dim its content or put it in `pass="ui"` with `<Grade passes={{ ui: ~0.5 }} />`.
- Check: sample the rendered PNG (PIL) — darkest object pixel vs darkest floor pixel, brightest UI white vs brightest specular.

## NOTES
- Visual gaps: the exact grade values used on screen are not spoken; none given.
- Rule conflicts: none.
