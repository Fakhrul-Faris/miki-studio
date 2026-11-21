---
title: Despill toward the new environment's colour, then keymix back the original colour where it matters
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "2:51:25–2:54:15"
blender_version_source: n/a (Nuke, bm_Despill)
tool_target: principle-only
tier: principle
style_fit: Principle transfers to reflective hero objects: a reflection must carry the colour of the environment it sits in, not the studio it was captured in.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | principle-only

## CREATIVE_INTENT
Principle: despillers over-correct (green becomes purple); tint the despilled area toward the new background's colour so reflective surfaces reflect the new world. Idea: where the despill damages a true colour (a green jacket), blend in a weaker despill through a feathered mask.

## STE_PROCEDURE
1. Despill the core key in linear colour space for the screen colour (algorithm: average).
2. Tint the despill replacement colour toward the environment (blue ~0.58 in the example).
3. Brighten slightly if needed; don't overdo it.
4. Duplicate the despill, reset its tint to 0, lower its amount to keep some original colour.
5. Keymix the weaker despill through a roto feathered ~200 px over the affected region.
6. Mix the keymix to ~0.5; judge always over the new background.

## AGENT_EXECUTION
### Source tool (Nuke)
`bm_Despill` (colourspace linear, screen green, algorithm average, fine-tune colour blue ~0.58) → `Keymix` (A: weaker despill, B: main, mask: Roto feather 200, mix 0.5).
### Blender / raea translation
- raea: no despill. Transfer: reflections come from the scene — give chrome/glossy hero objects an `<Environment src intensity>` or nearby coloured surfaces so they reflect the shot's palette, not a neutral studio.

## NOTES
- Rule conflicts: none.
