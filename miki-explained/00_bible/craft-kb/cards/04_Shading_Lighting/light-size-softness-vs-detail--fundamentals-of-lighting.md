---
title: Light size (radius) chooses form vs detail
bucket: 04_Shading_Lighting
source: "Fundamentals of Lighting in Blender.txt"
source_time: "18:11–23:55"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Core Style D choice — the "one soft top light" is a big source for form; shrink it on the beat where scratches, embossing or a printed number must pop.
---

## METADATA
04_Shading_Lighting | 4.x (demo switched to Cycles for clarity) | Blender bpy, raea

## CREATIVE_INTENT
The size of a light sets which level of detail the viewer notices. A tiny source gives knife-sharp shadows that make rivets, scratches and normal-map detail jump out (and reads as sun, street lamp, aggressive); a large source softens shadows so the eye reads overall form and ignores surface flaws (people, products, calm). Pick per shot by asking: form or detail?

## STE_PROCEDURE
1. Select the lamp.
2. Set Radius to 0 and look at shadow edges and fine surface detail.
3. Increase Radius gradually; shadows feather and fine detail fades.
4. If the shot is about form or a person, keep a large Radius.
5. If the shot is about scratches, rivets or texture, keep a small Radius.
6. For hard-surface objects, use a moderate Radius: a little softness, detail still visible.
7. Do not go so large that the object reads only as flat colour values.

## AGENT_EXECUTION
Blender:
```python
import bpy
L = bpy.data.lights["Key"]
L.shadow_soft_size = 0.0    # "Radius" in UI: hard
L.shadow_soft_size = 0.25   # ~ "softish" value the video settles on for the crate
L.shadow_soft_size = 2.0    # ~ overcast / paper-lantern look
# Area light equivalent: L.size
```
raea:
```tsx
// point / spot: PCSS soft shadows, radius in metres (default 0.25)
<SpotLight transform={Transform.fromXyz(0, 3, 1).lookingAt([0, 0, 0])} intensity={2000000}
  outer_angle={0.5} inner_angle={0.25} shadow_maps_enabled soft_shadows_enabled radius={0.05} /> {/* detail */}
// big soft key (house ProStage): radius={3.2}
// sun: soft_shadow_size 0.5 real sun, 5–10 studio softbox
<DirectionalLight transform={...} illuminance={10000} shadow_maps_enabled soft_shadow_size={6} />
// fully shadowless soft panel: <RectLight width height /> (no shadows in raea)
```
Large PCSS sizes dither in a fixed pattern; raise `<Shadows mapSize={8192}>` or lower the size if visible at 1:1 (`lights.md`).

## NOTES
- Deprecated: none (`shadow_soft_size` is the Point/Spot "Radius").
- The video notes EEVEE got noisy at large radius and switched to Cycles; we never render in Cycles — judge softness in raea stills.
- Visual gaps: the final "softish" value is not stated.
- Rule conflicts: none. Changing radius mid-shot is fine only as a slow eased ramp, never a pop.
