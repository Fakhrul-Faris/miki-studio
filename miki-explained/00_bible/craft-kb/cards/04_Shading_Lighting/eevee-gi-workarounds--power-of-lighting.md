---
title: Bounce light in a real-time engine — SSGI build, irradiance-volume bake (legacy Eevee) and raea equivalents
bucket: 04_Shading_Lighting
source: "The Power of LIGHTING in Blender!.txt"
source_time: "05:04–06:01"
blender_version_source: 3.x (pre-EEVEE Next)
tool_target: Blender bpy | raea
tier: full
style_fit: raea is real-time like Eevee: bounce must be faked deliberately (ambient + Environment + AO, or a bounce point light).
---

## METADATA
04_Shading_Lighting | 3.x legacy | Eevee GI workarounds → raea AmbientLight / Environment / AmbientOcclusion

## CREATIVE_INTENT
Global illumination (light bouncing off surfaces before reaching the camera) is what makes Cycles look real; old Eevee lacked it. Workarounds: a third-party SSGI build, or baking light into an irradiance volume (not real-time; breaks with animated lights).

## STE_PROCEDURE
1. In legacy Eevee, add Light Probe › Irradiance Volume covering the scene.
2. Render Properties › Indirect Lighting › Bake Indirect Lighting.
3. Re-bake whenever lights or objects move (unsuitable for animated lighting).
4. In 4.2+, skip both: EEVEE Next has ray-traced/screen-space GI built in.

## AGENT_EXECUTION
```python
import bpy
bpy.ops.object.lightprobe_add(type="VOLUME", location=(0, 0, 1)); bpy.context.object.scale = (5, 5, 3)
# legacy (<4.2): bpy.ops.scene.light_cache_bake()
# 4.2+: bpy.context.scene.eevee.use_raytracing = True ; volume probes baked with bpy.ops.object.lightprobe_cache_bake()
```
raea: no GI. Fake it with real props: `<AmbientLight brightness={40-80}>` (flat bounce), `<Environment src intensity>` (directional bounce + reflections), `<AmbientOcclusion quality="high">` (contact darkening of indirect light), and a weak warm `<PointLight>` near a lit surface to imitate its bounce.

## NOTES
- Deprecated: Eevee Legacy irradiance volume bake / SSGI fork → EEVEE Next (4.2) ray tracing + volume probes.
- Visual gaps: none.
- Rule conflicts: none.

