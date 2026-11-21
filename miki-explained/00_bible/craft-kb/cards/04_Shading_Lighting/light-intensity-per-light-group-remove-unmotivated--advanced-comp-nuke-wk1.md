---
title: Light intensity — balance each light separately and remove lights the plate cannot motivate
bucket: 04_Shading_Lighting
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "1:11:12–1:12:27; 1:12:27–1:15:40"
blender_version_source: n/a (Nuke + CG light groups)
tool_target: raea
tier: principle
style_fit: Supports the one-key Style D look: a rim or fill that has no visible source in the dark room should be dimmed or cut.
---

## METADATA
04_Shading_Lighting | n/a (Nuke + CG) | raea

## CREATIVE_INTENT
Principle: of direction, quality and intensity, intensity is the easiest to fix later — CG can be split into light groups and each balanced in comp — while direction and shadow quality are nearly impossible to change after render. Idea: every light must be motivated by something in the scene; a backlight with no source is turned to zero. When an element matches two of the three traits, ask honestly whether the third can be fudged (intensity yes; direction/quality rarely).

## STE_PROCEDURE
1. Render or set up lights as separate groups so each can be balanced.
2. Match the key light's brightness to the plate.
3. For each secondary light, find its source in the scene (window, bounce, lamp).
4. If no source exists, set that light to zero.
5. Before accepting an element, check direction, quality and intensity; reject it if direction or quality fail.
6. Avoid relying on darkening a heavily over-exposed element; clipped detail won't return.

## AGENT_EXECUTION
### Source tool (Nuke)
CG light-group AOVs merged with plus, each through its own `Grade`/`Multiply`; secondary set to 0.
### Blender / raea translation
- raea lights are live, so balance at the source: adjust each light's `intensity`/`illuminance`/`brightness`; delete unmotivated rims. Keep ProStage's dim cool `<AmbientLight brightness={60}>` as the room's motivated fill.
- A rim/accent light needs a visible or implied source (a screen's glow: emissive screen material + a small `<PointLight intensity range color>` just in front of it).
- Light intensity is animatable per frame (lights.md), unlike Grade.

## NOTES
- Rule conflicts: none.
