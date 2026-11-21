---
title: Contain a glow inside its own shape — a solid copy of the container as the glow's matte
bucket: 09_UI_Motion
source: "Studio Lighting, Silhouettes & Color Theory/Animate Light to Control Your Viewer | After Effects (No Plugins).txt"
source_time: "15:49–17:24"
tool_target: raea
tier: principle
use_when: "a UI card, phone screen or box that glows from inside while its outline draws on"
style_fit: Fits — keeps light where the object is (no stray flare); the glow uses the accent only if the line is about that card.
---

## METADATA
09_UI_Motion | After Effects (source) → raea `overflow: hidden` / emissive inside a mesh | raea

## CREATIVE_INTENT
A box outline draws on with trim paths while a light travels along it, but "the light is getting out of that box". Fix:
duplicate the box, give it a solid white fill, delete its trim paths, name it "box matte", and use it as the glow's
track matte — "the light is contained within that box", a "nice modern effect".

## STE_PROCEDURE
1. Build the glowing element separately from the container outline.
2. Make a solid, full copy of the container (no draw-on animation).
3. Use that solid copy as the glow's mask.
4. Animate the outline and the glow freely; the glow never leaves the shape.

## AGENT_EXECUTION
raea 2D: put the glow `<div style={{ filter: "blur(40px)" }}>` inside a container with `overflow: "hidden"` and the same
`borderRadius` as the card; draw the outline separately (SVG stroke `strokeDashoffset`). 3D: an emissive plane inside a
box mesh lights only inside; add `<Bloom threshold={0.9} />` sparingly.

### Worked example
Topic: a phone notification card "Baki: RM230" (illustrative).
- BEFORE: the card outline draws on and its glow spills across the screen.
- AFTER: the outline draws on, the glow sweeps inside the card only, ending behind "RM230".

### Check
- Does any glow appear outside the container at any frame?
- Does the container's radius match the mask's radius?

## NOTES
- Visual gaps: glow parameters visual only; the author's "light glow" preset (light position, light spread from 0 = one source upward, light distance up to 10) is an AE preset — not used.
