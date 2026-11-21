---
title: Per-light range cutoff (light the subject only)
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/light-range-cutoff--ten-cinematic-tips.md
  - cards/04_Shading_Lighting/range-limited-fill-subject-only--lighting-characters.md
sources: ["10 Tips to make Your 3D Render more Cinematic.txt", "Lighting 3D Characters for Storytelling.txt"]
use_when: "keeping fills off the floor/background"
style_fit: Fits Style D — keeps the dark room dark while a rim or fill shapes only the hero, so the subject stays the brightest thing. raea `range` is real and renders in the final (unlike Cycles).
---

## METADATA
04_Shading_Lighting | 2.8–3.x EEVEE (source) → bpy 5.x EEVEE Next / raea | Blender bpy + raea

## CREATIVE_INTENT
A rim, accent or fill that also lights the floor or a background object pulls attention away. Cut the light off at a set distance (or narrow its cone) so it reaches the subject and stops.
- ten-cinematic-tips: Custom Distance cutoff so a rim/accent never touches the ground.
- lighting-characters: adds narrow soft spots on one feature (even just the eyes), a low short-range point for a small motivated pool, and the radial glow a point gives where it does reach.

## STE_PROCEDURE
1. Before adding a fill, note which floor/background objects it must not reach.
2. For a feature fill, use a Spot with small Spot Size and high Spot Blend aimed only at that area.
3. For a broader fill, select the light and enable Custom Distance (EEVEE settings).
4. Lower Distance until the light stops reaching the ground/background but still reaches the subject (just past it).
5. Toggle the fill to check the background object stays unlit.
6. For a small floor/hand pool, use a low Point light with a short distance, motivated by a source (a lamp on the ground).
7. Before switching any look test to Cycles, remove the cutoff or expect a different image (Cycles ignores it).

## VALUES BY SOURCE
| parameter | ten-cinematic-tips | lighting-characters | recommended for Style D (+ why) |
|---|---|---|---|
| Blender cutoff | `cutoff_distance` ~3.0 | ~1.5 (just past subject) | n/a — set `range` in raea |
| feature spot | — | spot_size 0.35, spot_blend 0.9, energy ~60 | narrow soft spot for the accent detail |
| point fill | — | energy ~40, cutoff 1.5 | — |
| raea `range` | 3 | spot 2.0 / point 1.6 | just past the hero (~1.5–3 m at macro scale); default 20 m reaches everything |
| raea cone | `outer_angle`/`inner_angle` | outer 0.18, inner 0.02 (soft edge) | outer 0.15–0.3, inner small for a soft edge |
| raea intensity | — | spot 150,000 / point 120,000 lm | ~ similar, tune on a still |

## AGENT_EXECUTION
Blender (EEVEE / EEVEE Next; Cycles ignores the cutoff):
```python
import bpy
f = bpy.data.lights.new("FaceFill", 'SPOT'); f.spot_size = 0.35; f.spot_blend = 0.9; f.energy = 60   # ~
p = bpy.data.lights.new("FrontFill", 'POINT'); p.energy = 40
p.use_custom_distance = True; p.cutoff_distance = 1.5     # ~ just past the subject (3.0 for a rim)
```
raea (`range` = how far a PointLight/SpotLight reaches at all, metres, 20 by default):
```tsx
<SpotLight name="accentFill" transform={Transform.fromXyz(-0.8, 1.0, 1.2).lookingAt([0, 0.5, 0])} intensity={150_000}
  outer_angle={0.18} inner_angle={0.02} range={2.0} />
<PointLight name="frontFill" color="#ffe6c8" transform={Transform.fromXyz(0, 1.2, 0.9)} intensity={120_000} range={1.6} />
<SpotLight name="rim" transform={Transform.fromXyz(0, 1.2, -1.5).lookingAt([0, 0.3, 0])} intensity={400_000}
  outer_angle={0.3} inner_angle={0.15} range={3} />
```

## NOTES
- Deprecated: none — EEVEE `use_custom_distance` / `cutoff_distance` still exist; Cycles ignores them.
- raea renders the finals, so the Cycles caveat applies only to Cycles look tests.
- Visual gaps: cone angles and distances are shown, not stated.
- Rule conflicts: none.
