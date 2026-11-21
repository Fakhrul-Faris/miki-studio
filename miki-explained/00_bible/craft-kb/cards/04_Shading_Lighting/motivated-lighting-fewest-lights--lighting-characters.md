---
title: Motivated lighting with the fewest lights — every lamp has a believable source; optional lights live in an "extra lights" collection
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "13:51–16:16, 18:44–18:58, 20:58–21:10, 24:23–24:39, 30:31–31:04"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: principle-only
tier: full
style_fit: Direct support for "one soft top light": good lighting is the best result with the fewest lights; every extra must justify itself and its source.
---

## METADATA
04_Shading_Lighting | 2.8–3.x? | principle-only (+ raea pattern)

## CREATIVE_INTENT
Motivated lighting: don't invent lights that make no sense (a green light from under the floor). Each light should have a possible source — a window, a skylight, a torch, a lamp lying on the ground — even if that source is off screen. And good lighting is not more lights: get the result with as few as possible, keep optional touches in a separate "extra lights" group and toggle them; often the final uses none of it.

## STE_PROCEDURE
1. Before adding a light, name its source in the world (window, ceiling hole, lamp, screen).
2. If no source could exist there, don't add the light.
3. Where possible, show or hint the source (a window in frame, green slats to justify a green tint, a lamp on the floor).
4. Put every optional light (extra fill, face spot, skylight spill) in an "Extra lights" collection.
5. Toggle the whole collection; keep it only if the shot clearly improves.

## AGENT_EXECUTION
raea pattern: optional lights behind one flag; motivation written beside each light.
```tsx
const EXTRA = false;
<SpotLight name="key" /* source: window, late sun */ ... />
{EXTRA && <SpotLight name="faceSpot" /* source: skylight */ ... />}
```
Blender: `bpy.data.collections["Extra lights"].hide_render = True` to compare.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none; aligns with house restraint rules.
