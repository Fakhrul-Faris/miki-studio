---
title: Edge-detect stylised flash on a snare hit (tried and rejected by the author)
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "3:24:12–3:25:55"
blender_version_source: 4.3
tool_target: principle-only
tier: principle
style_fit: "conflict: a 1–2 frame stylised flash is a flashy transition; record as rejected"
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | principle-only (Resolve Edge Detect)

## CREATIVE_INTENT
Principle: a sound accent (snare) can carry a visual accent: for 1–2 frames the shot turns into glowing outlines. Idea and the
author's lesson: when in doubt, take the safe road. He removed it to keep the film slick and professional.

## STE_PROCEDURE
### Source tool (DaVinci Resolve)
1. Duplicate the clip section over the snare; add a node › Edge Detect (RGB edges).
2. Adjust Edge Width, Brightness and Gap until it reads as outlines.
3. Keep it to a few frames on the hit; lengthen slightly if it's too short to register.

## AGENT_EXECUTION
### Blender / raea translation
- raea: the nearest thing is a toon `outline` faded in (`animate={{ outline_width: track({ a: 0, a+12: 3 }) }}`) on the subject,
  not a frame-wide flash. No frame-wide edge-detect pass is documented.

## NOTES
- Deprecated: none.
- Visual gaps: settings are visual.
- Rule conflicts: forbidden as a 1–2 frame flash. Only use it as a slow (≥0.4 s) outline fade-in that means something on the word
  (e.g. "the structure of…").
