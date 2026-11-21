---
title: Split-toning grade — a little blue into the shadows (Blender 5.0 compositor)
bucket: 05_Camera_Raea_Pipeline
source: "Creating an Animation in Eevee (Blender 5.0).txt"
source_time: "15:02–15:42"
blender_version_source: 5.0
tool_target: raea
tier: full
style_fit: good — one subtle grade across all shots keeps a film "of a piece"; must not tint the brand accent
---

## METADATA
05_Camera_Raea_Pipeline | Blender 5.0 | Compositor (source) → raea Grade

## CREATIVE_INTENT
A light split-tone — mostly blue into the shadows — unifies the frame's colour. The author recommends grading after rendering (less destructive) rather than baking it into the render.

## STE_PROCEDURE
1. Render ungraded.
2. Add the grade as a separate, adjustable pass over every shot.
3. Push a small amount of blue into the shadows; leave highlights near neutral.
4. Before you lock it, check the brand accent colour on a still; it must stay on-brand.

## AGENT_EXECUTION
### Source tool (Blender 5.0 compositor)
Compositor: `Render Layers [Image] -> Split Toning [Image] -> Composite`; shadow colour blue, small amount. Exact node parameter names/values are not spoken (the node is new in 5.0) — `unknown (visual only)`.
### Blender / raea translation
raea grades at render time, one grade for the whole piece:
```tsx
<Grade
  temperature={-1}                                           // ~ slightly cool overall (≈ -0.03)
  shadows={{ saturation: 1.1, contrast: 1, gamma: 1, gain: 1, lift: 0.01 }}
  midtones={{ saturation: 1, contrast: 1, gamma: 1, gain: 1, lift: 0 }}
  highlights={{ saturation: 1, contrast: 1, gamma: 1, gain: 1, lift: 0 }}
/>
```
raea's `<Grade>` has no per-zone hue/tint field, so true split-toning (blue only in the shadows) has no direct equivalent: `raea: no equivalent (Grade's shadows block takes saturation/contrast/gamma/gain/lift, not a colour)`. Closest: slight negative `temperature` plus a cool `<AmbientLight color="#9fc4ff">` fill, which tints only the shadow side. Use `<Grade skip={["ui"]}>` so captions/UI keep exact colours.

## NOTES
- Deprecated: none (Split Toning node is new in 5.0).
- Visual gaps: node settings visual only.
- Rule conflicts: none. The first frame's Grade holds for the whole piece — fine, a grade should be constant.
