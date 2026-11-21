---
title: What lift, gamma, gain, offset, black point and white point actually do (pivots and the >1 trap)
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "26:36–30:40"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Neutral reference knowledge for every <Grade> value we set; the gamma >1 behaviour matters for bloom-heavy HDR highlights in Style D.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: each grade control pivots around a different point, so each moves a different part of the image. Knowing the pivots lets you change blacks without touching highlights, and avoid surprises in HDR values above 1. Idea: white point + gain can be animated to fake interactive light (fire flicker, flare).

## STE_PROCEDURE
1. Use lift to move blacks; it pivots on the white point, so highlights stay put.
2. Use gain (identical to multiply) to move highlights; it pivots on black, so blacks stay put.
3. Use gamma to move mid-tones; pure black and white (1.0) stay fixed.
4. Before lowering gamma on HDR, remember values above 1 get brighter (raising gamma darkens them).
5. Raise gamma to de-contrast; lower gamma to add contrast.
6. Use offset to add or subtract the same value everywhere.
7. Use black point to map a chosen dark value to 0 (black point 0.1 → 0.1 becomes 0).
8. Remember black point and lift move opposite ways; equal values cancel (likewise white point and gain).
9. To fake interactive light, animate gain (or white point) on a mask in time with the source.

## AGENT_EXECUTION
### Source tool (Nuke)
`Grade` node: `blackpoint`, `whitepoint`, `lift`, `gain`, `multiply`, `offset`, `gamma`. View the curve in the node to see pivots; extend it mentally past 1.0.
### Blender / raea translation
- raea `<Grade shadows|midtones|highlights={{ lift, gamma, gain, contrast, saturation }} />` — neutral is lift 0, gamma 1, gain 1, contrast 1, saturation 1. No black/white point or offset props: use `lift` (negative to crush) and `gain`.
- Grade is not animatable (first frame holds). Interactive light must be a real light: animate a `<PointLight intensity>` from the frame (deterministic flicker, e.g. `f % 37 === 0`) — lights.md.
- Blender look-dev only: compositor `CompositorNodeColorBalance` (correction_method 'LIFT_GAMMA_GAIN' or 'OFFSET_POWER_SLOPE').

## NOTES
- Deprecated: none.
- Rule conflicts: none.
