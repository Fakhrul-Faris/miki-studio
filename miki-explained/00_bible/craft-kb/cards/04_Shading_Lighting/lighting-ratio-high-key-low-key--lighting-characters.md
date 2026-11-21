---
title: Lighting ratio — high key (low contrast, calm) vs low key (high contrast, dramatic)
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "03:57–04:14, 08:56–09:16, 16:39–17:15"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: principle-only
tier: full
style_fit: Style D is low key by default (dark room, one top light); a high-key beat is a deliberate contrast, e.g. the "relief / solved" line.
---

## METADATA
04_Shading_Lighting | 2.8–3.x? | principle-only (+ raea values)

## CREATIVE_INTENT
Lighting ratio is the contrast between the lightest and darkest areas. Low ratio (high key) fills the scene with light: calm, neutral, commercial. High ratio (low key) keeps most of the frame dark with strong contrast: drama, mystery, tension. Choose the ratio from the emotion of the line, then set world/ambient and fill to hit it.

## STE_PROCEDURE
1. Decide the ratio from the line's emotion: calm/clear → high key; tense/mysterious → low key.
2. For high key, light the environment brightly (HDRI or bright world) and use soft key + fill.
3. For low key, lower the world/ambient toward black and drop or dim the fill.
4. Raise the ratio further by strengthening only the key or back light, not the fill.
5. Compare stills of both ratios side by side before committing.

## AGENT_EXECUTION
Blender: world strength sets the base ratio — `bpy.context.scene.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 1.0` (high key) vs `0.02` (low key).
raea:
```tsx
// high key
<Environment src={staticFile("studio_small_09_2k.hdr")} intensity={1} />   <AmbientLight brightness={150} />
// low key
<AmbientLight brightness={10} />   {/* no Environment, or intensity 0.05–0.2 */}
```
Measure: `frame_metrics` (house tool) or a histogram of the still — low key = most pixels in the bottom third with a small bright peak on the subject.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: never crush pure black in low key (see the dark-environments near-black card).
