---
title: Levels part 2 — colour balance (overall vs specific saturation, overall vs shadow/highlight colour tone)
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "21:46–26:36; 1:52:26–1:53:01; 3:10:42–3:11:06"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Supports the one-accent rule: everything that is not the brand accent shares one saturation level and one colour cast, so the accent is the only thing that pops.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: colours must share the same intensity, not only the same hue. Colour balance has two parts: saturation (overall, or only some hues too hot) and colour tone (an overall cast, or a cast only in the shadows or only in the highlights). Idea: diagnose which of the four it is before touching anything; shadows are easy to isolate, highlights and mids are hard.

## STE_PROCEDURE
1. Compare the element's colours with plate colours of the same kind (its blue vs the ground's blue).
2. If everything is too colourful, lower overall saturation until intensities match.
3. If only some hues are hot (e.g. warm highlights), lower saturation of those hues only.
4. If the whole element has a cast (e.g. green), push the opposite hue (purple) in the colour wheel.
5. If the cast lives only in the darks, remove it delicately in lift / the shadows range.
6. If the cast lives only in the highlights, isolate highlights; desaturate, then re-tint and re-brighten.
7. For a background plate, desaturate it to the foreground's level and warm/cool it to the subject's side light.
8. Make final tint moves tiny (e.g. gamma tint ~-0.22) and A/B them.

## AGENT_EXECUTION
### Source tool (Nuke)
`ColorCorrect` (master `saturation`; `shadows`/`highlights` tabs), `HueCorrect` (per-hue saturation curves, pull the warm part down), `Grade` colour wheels (Ctrl-click the wheel for the HSV picker) on `lift` for shadow casts and `gamma` for overall tone.
### Blender / raea translation
- Prefer fixing at the source: set each material's `base_color` from one palette (kit `T` tokens) so non-accent colours are muted equally; the accent alone is saturated.
- Overall: `<Grade saturation={~0.9} temperature={±0.03 per step} tint={…} />`.
- Shadow-only / highlight-only cast: `<Grade shadows={{ saturation, gamma, lift }} highlights={{ saturation, gain }} />`.
- Per-hue saturation (HueCorrect): raea has no hue-selective grade — change the offending material's colour instead.
- Light colour creates casts too: a cool `<AmbientLight color="#9FB2D9">` (ProStage) tints the shadows; that is intended — do not "correct" it away.

## NOTES
- Rule conflicts: none. Grade is global and fixed from the first frame; per-shot colour changes must come from lights/materials.
