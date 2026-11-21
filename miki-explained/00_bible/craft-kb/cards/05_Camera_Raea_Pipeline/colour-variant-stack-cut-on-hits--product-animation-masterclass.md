---
title: Stack the same move rendered in several colourways and step through them on the hi-hats
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "2:04:23–2:05:33, edit 3:00:19–3:02:08"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: "partial: a colour change on a word fits 'state change on the word'; rapid multi-colour flicker conflicts with one-accent and no-flashy rules"
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | Blender bpy + Resolve + raea

## CREATIVE_INTENT
One camera move, rendered identically in black, blue, green, orange, pink; the clips are stacked on tracks and each is trimmed so
the visible colour steps forward on every hi-hat (every 6 counts), while the motion continues unbroken.

## STE_PROCEDURE
1. Render the move once per colourway with identical settings (see colourway card), each to its own folder.
2. In the edit, stack the colour clips on separate tracks, aligned to the same start frame.
3. Trim each upper clip's end so the next colour shows at each hi-hat (author counts 1–6 per step).
4. Add a short cross-dissolve/opacity fade (+2 frames) at each change so it isn't a hard flicker.
5. Order the colours deliberately (blue → green → orange → pink last).

## AGENT_EXECUTION
- Blender: loop the render per colour (see the colourway card's script).
- raea: no stacked renders — one render, colour animated on the word frames:
  `animate={{ base_color: track({ [w("L04",0)]: "#111111", [w("L04",0)+8]: "#1f6bff" }, "in-out-cubic") }}` (8 frames ≈ 0.27 s at 30 fps; use ≥12 frames at 30 fps to meet ~0.4 s).

## NOTES
- Deprecated: none.
- Visual gaps: the hi-hat positions are audible only.
- Rule conflicts: several colours flicking past is flashy and breaks the single-accent rule. In Style D: at most one colour
  change per line, eased over ~0.4 s, on the word it names.
