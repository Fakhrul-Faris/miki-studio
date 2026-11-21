---
title: Rim light placed for a reflection along the top edge
bucket: 04_Shading_Lighting
source: "Fundamentals of Lighting in Blender.txt"
source_time: "35:38–37:17"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits — a thin edge highlight separates a dark object from a dark room; keep it white/neutral so the brand accent stays the only colour.
---

## METADATA
04_Shading_Lighting | 4.x | Blender bpy, raea

## CREATIVE_INTENT
A light placed opposite the camera, just beyond the object, catches a reflection on top edges and bevels and pulls the silhouette off a dark background. Use it only where the model has detail worth showing — if the top is untextured, don't light it.

## STE_PROCEDURE
1. Find the camera's viewing direction across the object.
2. Place a lamp behind and slightly above the object, opposite the camera.
3. Move it until a reflection runs along the top surface or edge.
4. If the lamp also lights unimportant floor, pull it back or make it a Spot.
5. If the top has no worthwhile detail, delete the rim lamp.

## AGENT_EXECUTION
Blender:
```python
import bpy
bpy.ops.object.light_add(type='POINT', location=(-0.8, 1.6, 1.4))  # ~ behind/above, opposite camera
rim = bpy.context.object; rim.data.energy = 150; rim.data.color = (1, 1, 1)  # ~ video ended on white
```
raea:
```tsx
<SpotLight transform={Transform.fromXyz(-0.8, 1.4, -1.6).lookingAt([0, 0.4, 0])} intensity={600000}
  outer_angle={0.3} inner_angle={0.15} color="#ffffff" />
```
Glossy edges catch it best: keep the hero's `perceptual_roughness` ≤ 0.4 where the rim should read.

## NOTES
- Deprecated: none.
- Visual gaps: exact rim position not given.
- Rule conflicts: none.

## ADDENDUM — How COLORS Completely Change Your LIGHTING!
Source: "Studio Lighting, Silhouettes & Color Theory/How COLORS Completely Change Your LIGHTING!.txt" (08:18–09:21)

This card places the rim light opposite the camera; this source places it opposite the main light and adds values
this card doesn't have: edge thickness control and a source-size → sharpness rule.

| parameter | this card (existing) | how-colors-change-lighting (new) | recommended for Style D |
|---|---|---|---|
| Position rule | opposite the camera, behind/above the object | on the edge opposite the main light (not the camera) | check both — on a single-key macro setup these usually coincide; when they don't, follow the main-light-opposite rule, since it keeps the rim motivated by the scene's own light logic |
| Thickness | not stated | "keep it thin and controlled, not too thick or it will look unnatural" | thin line only, no wide glow band |
| Sharpness by source size | not stated | small/intense light source = sharper rim; larger light source = softer edge | pick `outer_angle`/light size to match: a tight Spot for a crisp rim, a small soft Area light if a softer edge is wanted |
| Colour choice | left white/neutral | "use warmer tones to contrast with cool shadows, or an analogous colour to harmonize" | keep neutral/white by default (house rule: no second saturated colour); only tint it when the line's mood specifically calls for warm/cool contrast, and keep it desaturated |

Extra step: before placing the rim, check which edge sits opposite the scene's main (key) light, not just opposite
the camera — use that edge when the two don't agree. Scale the rim light's apparent size to the wanted sharpness:
small/tight for a crisp line, larger/softer for a diffused edge; never let the band grow thick enough to look like a
second fill.
