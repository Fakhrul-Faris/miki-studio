---
title: One dominant emissive colour — secondary colours at about a tenth of the strength
bucket: 04_Shading_Lighting
source: "How To Use Lighting In Your Renders  Blender Tutorial.txt"
source_time: "08:53–09:57"
blender_version_source: 3.x
tool_target: principle-only | raea
tier: full
style_fit: The Style D accent rule stated in numbers: one saturated accent leads; any other colour is ~10× weaker.
---

## METADATA
04_Shading_Lighting | any | Principle → raea emissive multipliers

## CREATIVE_INTENT
Several bright, intensely coloured lights clash and leave no focal point. Keep one main colour; let others exist but subdued (main sign at strength 66, the blue one at 6.6).

## STE_PROCEDURE
1. Pick the one colour that carries the shot.
2. Set its emitters to full strength (video: 66).
3. Set every other coloured emitter to ~1/10 of that (video: 6.6).
4. Test by raising the secondary to full — if it competes, lower it back.

## AGENT_EXECUTION
```python
import bpy
main = bpy.data.materials["NeonRed"].node_tree.nodes["Principled BSDF"].inputs["Emission Strength"]
sec  = bpy.data.materials["NeonBlue"].node_tree.nodes["Principled BSDF"].inputs["Emission Strength"]
main.default_value = 66; sec.default_value = main.default_value / 10
```
raea: `emissive={LinearRgba.from(Srgba.hex(ACCENT)).mul(6)}` on the accent; `.mul(0.6)` on any secondary hue; Bloom threshold 0.8–1 so only the accent blooms.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none — matches house rule; in Style D usually there is no secondary hue at all.

