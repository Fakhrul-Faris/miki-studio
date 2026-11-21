---
title: Volume light bounces to soften a hard spotlight cone (and the Full GI preset)
bucket: 04_Shading_Lighting
source: "How to Add That Special Look To Your Renders.txt"
source_time: "03:18–05:38"
blender_version_source: 3.x (Light Paths preset menu)
tool_target: principle-only
tier: principle
style_fit: The goal — a top light in haze that reads natural, not "stage spotlight" — fits Style D; the method is Cycles path tracing and does not exist in raea.
---

## METADATA
04_Shading_Lighting | Blender 3.x (Cycles) | principle-only (Cycles Light Paths) → raea translation

## CREATIVE_INTENT
Principle: a spotlight through volumetrics often renders as a defined, ugly cone ("stage lighting"). Letting light bounce
inside the volume scatters it outward so the beam softens and the air glows more naturally. Reflective/refractive caustics add a
small extra spread of light off shiny objects. Ideas: try it at the end; it helps most, not always.

## STE_PROCEDURE
Method (Cycles):
1. Open Render Properties → Light Paths.
2. Pick the preset menu → "Full Global Illumination" (sets all bounces to 32, enables Reflective + Refractive Caustics).
3. Or set manually: raise Volume bounces from 0 (default) to 1–2; this gives most of the effect.
4. Leave other bounces as they were if render time matters (32 is not needed).
5. Compare the cone edge before/after.

## AGENT_EXECUTION
### Source tool (Blender Cycles)
```python
c = bpy.context.scene.cycles
c.volume_bounces = 2                 # main effect (default 0)
c.caustics_reflective = True; c.caustics_refractive = True
# Full GI preset equivalent: c.max_bounces = c.diffuse_bounces = c.glossy_bounces = c.transmission_bounces = c.transparent_max_bounces = 32
```
### Blender / raea translation
- raea: no equivalent for volume bounces (no multiple scattering — single-scatter froxel grid) or caustics (no path tracing).
- To get a softer, less "stage" beam in raea with real props:
  - `inner_angle` small relative to `outer_angle` (0 softens the cone edge most; lights.md).
  - `<VolumetricFog hero={false} />` drops the exact hard-edged shafts for the grid's softer ones (post.md).
  - `<VolumetricFog ambient ambientColor />` adds an overall scattered glow in the air, like bounced light in the haze.
  - Lower `anisotropy` on the `<FogVolume>` so the shaft glows less only toward the light.

## NOTES
- Deprecated: none in steps; EEVEE (Legacy or Next) has no volume bounce setting either.
- Visual gaps: the "before" settings and viewport difference are visual only.
- Rule conflicts: none.
