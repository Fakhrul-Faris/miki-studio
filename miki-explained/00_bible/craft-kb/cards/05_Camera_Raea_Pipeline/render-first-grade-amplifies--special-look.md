---
title: Get it right in 3D first — the grade only amplifies what's there
bucket: 05_Camera_Raea_Pipeline
source: "How to Add That Special Look To Your Renders.txt"
source_time: "01:22–01:55, 16:16–17:24"
blender_version_source: n/a
tool_target: principle-only
tier: principle
style_fit: Supports the house order: build the world and light in Blender/raea to final quality, then a restrained <Grade>; never rely on the grade to rescue a frame.
---

## METADATA
05_Camera_Raea_Pipeline | any | principle-only

## CREATIVE_INTENT
Principle: the finishing grade adds nothing new; it extracts and exaggerates what the render already holds — including its flaws.
Small 3D moves (haze, bounces, glow) all feed the grade, and skipping one changes the graded result. Idea: "step zero" is the best
possible render; finishing tricks come only when it is "just missing something".

## STE_PROCEDURE
Method:
1. Before you grade, make the ungraded render as good as possible (world, materials, light).
2. Apply the small 3D/atmosphere moves (haze density, glow) before the grade, not after.
3. Grade last, over everything.
4. If the grade exposes a flaw, fix it in the scene, not with more grade.
5. Re-check the grade after any scene change; results are interdependent.

## AGENT_EXECUTION
- raea order inside one composition: scene/materials/lights → `<FogVolume>`/`<VolumetricFog>` → `<Bloom>` → `<Grade>` /
  `<ToneMapping>` (the engine applies them in its fixed order; author them in this order of decisions).
- Judge the ungraded frame: temporarily render with a neutral grade (`<Grade />` defaults keep everything) and `--frame N`, then
  with the real grade; compare.
- raea's effects are first-frame-held, so lock the grade per piece after the scene is final.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none.
