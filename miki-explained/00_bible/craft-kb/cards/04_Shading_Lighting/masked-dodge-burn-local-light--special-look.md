---
title: Masked dodge/burn — brighten or darken only chosen areas after the render
bucket: 04_Shading_Lighting
source: "How to Add That Special Look To Your Renders.txt"
source_time: "08:27–08:51, 15:35–15:58"
blender_version_source: n/a (Photoshop)
tool_target: raea
tier: principle
style_fit: Same intent as Style D's single pool of top light: guide the eye by local brightness; in raea it must be done with light, not a painted mask.
---

## METADATA
04_Shading_Lighting | Photoshop | raea lights + Grade vignette

## CREATIVE_INTENT
Principle: brighten the whole image on a layer, then mask it so it shows only where you want light (dodge); do the same darker
(burn/curves) to sink areas that distract. Idea: it steers attention without relighting.

## STE_PROCEDURE
Method (Photoshop):
1. Add a brightening adjustment (Curves/Levels) to the whole image.
2. Invert or clear its mask, then brush it in where extra light belongs.
3. Repeat with a darkening layer (burn/Curves) on areas to sink, e.g. edges or shadows.
4. Keep both subtle; stack only if needed.

## AGENT_EXECUTION
### Source tool (Photoshop)
Curves (brighten) + black mask, white brush at low flow on target areas; Curves (darken) + mask on areas to sink.
### Blender / raea translation
- raea has no painted masks; do it at render time with light:
  - Dodge → a low-intensity `<SpotLight>` pool (`outer_angle` 0.3–0.6, `inner_angle` ≈ 0 for a soft edge) or a `<RectLight>` on the
    area (~ tens of thousands of lumens at < 1 m; judge on a still).
  - Burn → lower the key there with a blocker `<Mesh3d shadow="only">` out of frame, or darken the material's `base_color`.
  - Edge burn → `<Grade vignette={{ intensity: 0.25, radius: 0.8, smoothness: 0.5 }} />` (~).
- Animate a dodge light's `intensity` from the frame if the emphasis must move with the line, eased in-out (never pop).

## NOTES
- Deprecated: none.
- Visual gaps: brushed areas and curve shapes are visual only.
- Rule conflicts: none; light changes must fade over ~0.4 s, not switch.
