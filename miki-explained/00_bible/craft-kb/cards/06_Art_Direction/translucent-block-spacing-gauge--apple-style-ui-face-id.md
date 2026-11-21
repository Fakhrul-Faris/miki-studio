---
title: Spacing gauge — a low-opacity red block to equalise margins while laying out UI
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/Create Apple-Style UI Motion Graphics in After Effects + Free Project File.txt"
source_time: "03:21–03:46"
tool_target: board-check
tier: full
use_when: "laying out a phone/app screen or card before the board check; checking padding on text + icon pairs"
style_fit: Fits — supports 'nothing clipped, readable at phone size'; the gauge is a layout aid, never rendered.
---

## METADATA
06_Art_Direction | After Effects (source) → raea debug layer | board-check, raea

## CREATIVE_INTENT
When adding text and logo to the button, "adjust the size and position to make the button look clean and balanced". You
can use the grid, "but personally I like a different method": a red solid, opacity lowered, resized to the gap, used to
check that spacing is equal on every side while positioning elements.

## STE_PROCEDURE
1. Make a small translucent red block the size of the intended gap.
2. Place it between the edge and the content on each side in turn.
3. Move elements until the block fits every gap identically.
4. Delete/hide the block before render.

## AGENT_EXECUTION
raea: a `const DEBUG = false;` flag rendering `<div style={{ position: "absolute", background: "rgba(255,0,0,0.3)", … }}>` at
each padding; render one still with `DEBUG = true` for the board check, then off. Board-check line: "padding gauge equal on all sides of every card".

### Worked example
Topic: a price-compare card "Pasar RM8 vs Supermarket RM11" (illustrative).
- BEFORE: left padding 40 px, right 28 px; icon sits closer to the top — card looks off on a phone.
- AFTER: a 40 px red gauge fits every side and the icon-to-text gap; the card reads balanced.

### Check
- Do all inner gaps of each card match the gauge?
- Is the gauge disabled in the final render?

## NOTES
- Visual gaps: gauge size unknown (visual only).
