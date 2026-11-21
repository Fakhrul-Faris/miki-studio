---
title: Don't light what you don't want seen — darkness as a set-dressing budget
bucket: 04_Shading_Lighting
source: "How to Make DARK Environments in Blender.txt"
source_time: "25:57–27:36"
blender_version_source: 4.x
tool_target: principle-only
tier: full
style_fit: Fits Style D's fast schedule: only the hero and the line's subject need finished detail; everything else can fall into shadow.
---

## METADATA
04_Shading_Lighting | 4.x → raea | principle-only

## CREATIVE_INTENT
A dark render hides flaws: textured cubes in a corner pass if they sit in shadow. Deliberately leaving rough areas unlit raises perceived quality and saves scene-building time; and half of lighting is the shadows, so a light/dark balance is dramatic on its own.

## STE_PROCEDURE
1. Before modelling more detail, mark which parts of the frame the line actually needs.
2. Keep key and support lights off the weak or placeholder areas.
3. Darken weak areas further with blockers if they still catch spill.
4. Spend detail only where the light lands.

## AGENT_EXECUTION
Blender: none specific — light placement only.
raea: aim `SpotLight` cones (`outer_angle` small) at the finished asset; `Mesh3d shadow="only"` blockers over placeholders. For per-setup checks: render each setup's first frame as a still and look for lit placeholder geometry before the preview.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none, but the line's subject must never be the hidden part; anti-slop "shadow as character" agrees.
