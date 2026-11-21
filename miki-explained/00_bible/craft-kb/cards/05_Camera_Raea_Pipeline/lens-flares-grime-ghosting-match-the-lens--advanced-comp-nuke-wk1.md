---
title: Lens flares, lens grime and ghosting — match the lens type, or paint them out
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "52:48–54:59; 59:24–1:00:57"
blender_version_source: n/a (Nuke)
tool_target: principle-only
tier: principle
style_fit: Mostly conflict: flashy flares and lens dirt break Style D's calm, one-light macro look and the no-flashy rule; know them to avoid or remove, not to add.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | principle-only

## CREATIVE_INTENT
Principle: flares come from the lens's construction — spherical lenses give round artifacts, anamorphic lenses give horizontal streaks — so a rebuilt or added flare must match the lens that shot the plate. Lens grime is backlit dirt on the glass (an aesthetic choice that breaks the fourth wall); ghosting is a bright object reflected inside the lens as a faint double. Idea: these are usually removal tasks; add them only to match a plate.

## STE_PROCEDURE
1. Identify the lens type from existing flares (round = spherical; horizontal streaks = anamorphic).
2. If an element covers a practical flare, rebuild the flare over the element.
3. Match a flare's style to the lens when adding one to a CG shot.
4. Treat lens grime and ghosting as mistakes to paint out unless the brief asks to match them.
5. Recognise ghosting as a low-opacity double of a bright object (e.g. a van repeated on the ground).

## AGENT_EXECUTION
### Source tool (Nuke)
No node chain given (theory video).
### Blender / raea translation
- raea: no equivalent (no lens-flare, lens-dirt or ghost component). Highlights glow via `<Bloom intensity threshold>` only.
- Do not fake flares with page overlays; if a light hit is needed, use `<Bloom>` on an emissive part.

## NOTES
- Rule conflicts: flashy flares/streaks conflict with "no flashy transitions/effects"; default: none.
