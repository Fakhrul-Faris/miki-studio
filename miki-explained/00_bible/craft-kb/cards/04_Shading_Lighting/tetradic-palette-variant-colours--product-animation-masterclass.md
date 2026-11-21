---
title: Pick variant colours from a tetradic colour-wheel scheme built on the brand pair
bucket: 04_Shading_Lighting
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:58:09–1:59:27, 2:38:32–2:40:28"
blender_version_source: 4.3
tool_target: principle-only
tier: principle
style_fit: "conflict: Style D uses one saturated accent per beat; use this only to choose which single accent a later beat switches to"
---

## METADATA
04_Shading_Lighting | Blender 4.3 | principle-only (Canva colour wheel)

## CREATIVE_INTENT
Principle: when a shot needs more colours than the brand pair, take them from a tetradic (rectangle) scheme anchored on the
brand colours (here blue + orange → a pink/purple and a green), so extra colours look intended, not random. Ideas: "special
edition" variants; a row of products in sweet-like colours (author: "Skittles / Smarties").

## STE_PROCEDURE
1. Open a colour wheel tool (author: Canva colour wheel), mode Tetradic.
2. Set two corners to the brand colours (blue, orange).
3. Read the other two (pink/purple, green); copy their hex codes.
4. Apply each hex to a duplicated material (see colourway card); keep the hero in the brand colour.
5. Judge the set together; swap a colour that sits too close to a neighbour (author swapped pink → yellow next to orange/red).

## AGENT_EXECUTION
- Blender: set `mix.inputs[6].default_value` from the hex (convert sRGB → linear) per material copy.
- raea: hex strings directly, e.g. a palette constant `const P = { brand: "#1f6bff", accent: "#ff7a1a", alt1: "#c83cff", alt2: "#2fbf71" }`
  and `<StandardMaterial base_color={P.alt1} />`. Compute tetradic partners as hue ±90°/180° in OKLCH if no tool is at hand.

## NOTES
- Deprecated: none.
- Visual gaps: the exact hex values are not given.
- Rule conflicts: several saturated colours in one frame break Style D's single-accent rule. Use the palette across beats
  (one accent per setup) or keep non-subject copies neutral grey.
