---
title: Render polish — bloom, soft shadows, shadow resolution, AO (distance & factor 2)
bucket: 04_Shading_Lighting
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "25:51–27:11, 27:39–27:57"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — maps 1:1 onto raea's Bloom / soft shadows / Shadows / AmbientOcclusion; apply after lighting is right.
---

## METADATA
04_Shading_Lighting | 3.x (legacy EEVEE) | Blender bpy + raea

## CREATIVE_INTENT
Light the scene properly first, then use engine effects to push it: bloom for glow on bright parts, soft shadows (costly but convincing), higher shadow resolution, and ambient occlusion cranked up to seat objects. Screen-space reflections only matter with reflective materials. Don't overdo render samples in EEVEE.

## STE_PROCEDURE
1. After lighting is final, enable Bloom and tune it.
2. Enable Soft Shadows (expect slower viewport).
3. Increase shadow resolution (cube and cascade size).
4. Enable Screen Space Reflections only if the scene has reflective materials.
5. Enable Ambient Occlusion and set Distance = 2 and Factor = 2 (scene-scale dependent).
6. Raise render samples moderately; set Resolution % to 100; render (F12).

## AGENT_EXECUTION
- Blender 3.x (as in video): `e = scene.eevee; e.use_bloom = True; e.use_soft_shadows = True; e.shadow_cube_size = '2048'; e.shadow_cascade_size = '4096'; e.use_gtao = True; e.gtao_distance = 2; e.gtao_factor = 2; e.use_ssr = False; e.taa_render_samples = ~64; scene.render.resolution_percentage = 100; bpy.ops.render.render(write_still=True)`
- Blender 4.2+ (EEVEE Next): bloom removed → compositor Glare node `glare_type = 'BLOOM'`; soft shadows per light (`light.shadow_soft_size` / jitter); `scene.eevee.shadow_resolution_scale`; AO/GTAO replaced by horizon scan (`scene.eevee.fast_gi_distance`); SSR replaced by ray tracing (`scene.eevee.use_raytracing`).
- raea (the renderer): `<Bloom intensity={0.45} threshold={0.85} />`, sun `soft_shadow_size` / spot `soft_shadows_enabled radius`, `<Shadows mapSize={4096} distance firstCascade />`, `<AmbientOcclusion quality="high" thickness={0.25} />` (only shades Ambient/Environment light). BlendShot already sets these.

## NOTES
- Deprecated: legacy EEVEE use_bloom/use_soft_shadows/use_gtao/use_ssr toggles do not exist in EEVEE Next.
- "Distance 2 / factor 2" don't map 1:1 to raea's AO (`thickness` in metres).
- Rule conflicts: none.
