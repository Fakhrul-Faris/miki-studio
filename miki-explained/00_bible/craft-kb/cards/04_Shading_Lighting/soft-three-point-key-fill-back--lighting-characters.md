---
title: Soft three-point lighting — big soft key, area fill from below, big soft back light (warm key / cool back)
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "05:00–07:15"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: Blender bpy | raea
tier: full
style_fit: The calm, commercial "beauty" setup; for Style D use it for a gentle product beat — the back light is what separates a dark object from a dark room.
---

## METADATA
04_Shading_Lighting | 2.8–3.x? → 4.2+ / raea | Blender bpy + raea

## CREATIVE_INTENT
Key reveals the subject; fill opens the shadows the key makes (optional); back light separates subject from background and draws a highlight on its edges — from the side it is a rim, from the top a halo. Larger light size = softer light = fewer, gentler shadows: a calm, tension-free look as in commercials and beauty shoots. Warm key + slightly cold back plays on complementary colours the eye likes.

## STE_PROCEDURE
1. Add a Spot key in front-above the subject; set Radius (Size) large for softness and Spot Blend high for a soft edge.
2. Set the key colour to white with a little warmth (~#fff3e6).
3. Before adding fill, look at where the key's shadows fall.
4. Add an Area light below the subject facing up to fill those shadows (area = softer than a spot).
5. Add a large soft light behind and above the subject to separate it from the background (rim if from the side, halo if from the top).
6. Optionally tint the back light slightly cold (~#dfe8ff) against the warm key.

## AGENT_EXECUTION
Blender (check .blend):
```python
import bpy
def light(name, kind, loc, energy, color, **kw):
    d = bpy.data.lights.new(name, kind); d.energy = energy; d.color = color
    for k, v in kw.items(): setattr(d, k, v)
    o = bpy.data.objects.new(name, d); o.location = loc; bpy.context.collection.objects.link(o); return o
light("Key",  'SPOT', (1.2, -2.0, 2.2), 800, (1, .96, .9), shadow_soft_size=0.6, spot_blend=0.8)   # ~ values
light("Fill", 'AREA', (0, -1.5, -0.4), 150, (1, 1, 1), size=1.5)                                   # below, aim up
light("Back", 'AREA', (0, 1.8, 2.4), 400, (.88, .92, 1), size=2.0)                                 # behind-top
# aim each with a Track To constraint to the subject
```
raea (real render):
```tsx
<SpotLight name="key" color="#fff3e6" transform={Transform.fromXyz(1.2, 2.2, 2).lookingAt([0, 0.3, 0])} intensity={1_400_000} outer_angle={0.5} inner_angle={0.1} radius={0.6} soft_shadows_enabled shadow_maps_enabled />
<RectLight name="fill" transform={Transform.fromXyz(0, -0.3, 1.5).lookingAt([0, 0.3, 0])} intensity={80_000} width={1.5} height={1.5} />
<RectLight name="back" color="#dfe8ff" transform={Transform.fromXyz(0, 2.4, -1.8).lookingAt([0, 0.3, 0])} intensity={200_000} width={2} height={2} />
```
Softness in raea: `radius` + `soft_shadows_enabled` on spots/points; a small `inner_angle` softens the cone edge. RectLight casts no shadows (good for fill/back).

## NOTES
- Deprecated: none in these light props.
- Visual gaps: light energies and exact positions not given (viewport only).
- Rule conflicts: Style D wants "one soft top light" — use the fill and back sparingly and far below the key. A fill from below on a face is fine here (soft); avoid a hard under-light (see key-pattern card).
