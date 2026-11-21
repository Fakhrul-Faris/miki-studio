---
title: Moody overcast: sky backdrop + denser volume + soft area light
bucket: 04_Shading_Lighting
source: "How to get good lighting in blender.srt"
source_time: "00:21:43–00:23:29; 00:25:31–00:26:31"
blender_version_source: 3.x (inferred)
tool_target: Blender bpy | raea
tier: full
style_fit: Partial fit — an overcast mood for an exterior or 'bad news' beat; keep a controlled directional area light rather than flat all-round light.
---

## METADATA
04_Shading_Lighting | 3.x (inferred) | Blender bpy, raea

## CREATIVE_INTENT
Overcast scenes look great in photos. Instead of a flat overcast HDRI, build it: an overcast sky image behind, a denser fog volume, and one large, moderate area light so there is still some direction. Fully even all-round light is more realistic but less attractive. Use reference photos of overcast scenes to choose the mood.

## STE_PROCEDURE
1. Remove all lights.
2. Add the overcast sky image plane behind the scene.
3. Add the volume scatter box with a higher Density than a sunny scene.
4. Increase Volume light bounces and Anisotropy slightly.
5. Add an Area light above the scene with moderate Strength.
6. Increase the Area light Size so it is large and soft.
7. Position it for a slight direction; do not light evenly from everywhere.
8. Compare with reference photos and adjust.

## AGENT_EXECUTION
Blender: sky plane and volume per the cards "sky-image-plane-direction-matched" and "low-volume-scatter-atmosphere" (Density ~0.03); then
```python
import bpy
bpy.ops.object.light_add(type='AREA', location=(0, 0, 15)); a = bpy.context.object.data
a.energy = 2000; a.size = 20                                  # ~ "basic amount", big
bpy.context.scene.cycles.volume_bounces = 2                   # Cycles; ~
```
raea:
```tsx
<ImagePlane src={staticFile("sky_overcast.jpg")} width={80} position={[0, 18, -70]} />
<VolumetricFog />
<FogVolume name="mist" position={[0, 3, 0]} scale={[60, 8, 60]} density={0.08} scattering={0.5} anisotropy={0.3} falloff={0.5} />
<RectLight transform={Transform.fromXyz(-4, 15, 4).lookingAt([0, 0, 0])} intensity={3000000} width={20} height={20} color="#dfe5ee" />
<DirectionalLight transform={Transform.fromXyz(-4, 15, 4).lookingAt([0, 0, 0])} illuminance={2500} shadow_maps_enabled soft_shadow_size={8} />
```
RectLight casts no shadows in raea; the weak, very soft DirectionalLight supplies the soft overcast shadows.

## NOTES
- Deprecated: "volume light bounces" is Cycles-only.
- Visual gaps: values by eye.
- Rule conflicts: none.
