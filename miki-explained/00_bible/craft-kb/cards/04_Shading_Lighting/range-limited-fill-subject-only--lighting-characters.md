---
title: Range-limited and narrow fills — light only the subject (or just the eyes), not the background
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "14:46–15:16, 20:58–21:08, 24:04–24:12, 26:45–27:23, 30:38–30:52"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: Blender bpy | raea
tier: full
style_fit: Lets us open the hero object's shadows without lifting the dark room — keeps the subject the brightest thing.
---

## METADATA
04_Shading_Lighting | 2.8–3.x? → 4.2+ / raea | Blender bpy + raea

## CREATIVE_INTENT
A fill that also lights the background pulls attention away (a lit pillar behind). Restrict it: a spot with a small cone angle and soft edge only on the face, or a light whose distance is cut so it reaches the subject and stops. A tiny spot on the eyes reveals just the eyes. A point light gives a pleasing radial glow where it does reach.

## STE_PROCEDURE
1. Before adding a fill, note which background objects it must not reach.
2. For a face/feature fill, use a Spot with a small Spot Size and high Spot Blend aimed only at that area.
3. For a broader fill, enable Custom Distance and set it just past the subject.
4. Check the background object stays unlit (toggle the fill).
5. For a small floor/hand pool, use a low Point light with a short distance (motivate it: a lamp on the ground).

## AGENT_EXECUTION
Blender:
```python
f = bpy.data.lights.new("FaceFill", 'SPOT'); f.spot_size = 0.35; f.spot_blend = 0.9; f.energy = 60   # ~
p = bpy.data.lights.new("FrontFill", 'POINT'); p.energy = 40
p.use_custom_distance = True; p.cutoff_distance = 1.5    # EEVEE only; ~ just past the subject
```
raea (`range` is how far a point/spot reaches at all):
```tsx
<SpotLight name="faceFill" transform={Transform.fromXyz(-0.8, 1.0, 1.2).lookingAt([0, 0.5, 0])} intensity={150_000}
  outer_angle={0.18} inner_angle={0.02} range={2.0} />
<PointLight name="frontFill" color="#ffe6c8" transform={Transform.fromXyz(0, 1.2, 0.9)} intensity={120_000} range={1.6} />
```

## NOTES
- Deprecated: none (EEVEE `use_custom_distance` / `cutoff_distance` still exist; Cycles ignores them).
- Visual gaps: cone angles and distances shown only.
- Rule conflicts: none.
