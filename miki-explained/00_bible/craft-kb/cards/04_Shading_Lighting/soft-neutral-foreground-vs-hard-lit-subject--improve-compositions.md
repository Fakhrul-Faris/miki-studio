---
title: Soft neutral foreground against a hard-lit subject (lighting-quality zones)
bucket: 04_Shading_Lighting
source: "3 Ways to Improve Your Compositions in Renders.txt"
source_time: "15:43–16:09"
blender_version_source: n/a (Blender, version not stated)
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — surface/foreground in soft, cool, low light; the hero alone in the hard bright pool.
---

## METADATA
04_Shading_Lighting | n/a | Blender bpy + raea

## CREATIVE_INTENT
Contrast lighting quality between zones: the foreground's big bold shapes sit in soft, neutral, slightly blue light with no harsh shadows, while the detailed subject gets hard, bright sunlight. The difference in quality — not only brightness — separates subject from frame and makes the detail read.

## STE_PROCEDURE
1. Light the subject with a hard, bright, warm-neutral key confined to it (spot cone).
2. Light the foreground only with soft, low, cool light (ambient/sky or a large dim area light).
3. Keep the foreground free of hard cast shadows.
4. Check that the subject has the only crisp shadows and highlights in frame.

## AGENT_EXECUTION
- Blender: subject key = Spot with small `shadow_soft_size` and narrow `spot_size`; foreground = World strength low, colour cool (`(0.55, 0.65, 0.85)` `~`), or a large Area light `size=4`, low energy, bluish.
- raea:
  ```tsx
  <AmbientLight brightness={40} />   {/* soft base; the documented props show no colour, so the cool tint comes from the RectLight */}
  <RectLight transform={Transform.fromXyz(0, 3, 2).lookingAt([0, 0, 1])} intensity={150000} width={4} height={3} color="#9fc4ff" />
  <SpotLight transform={Transform.fromXyz(...keyPos).lookingAt(H)} intensity={1800000} outer_angle={0.35} inner_angle={0.2} color="#ffe2c0" shadow_maps_enabled />
  ```
  For a coloured fill from every side, use a cool `<Environment>` panorama at low `intensity` instead.

## NOTES
- Values not stated in the source (`~`).
- Rule conflicts: Style D allows one saturated accent only — the cool foreground stays desaturated so it doesn't compete with the brand colour.
