---
title: Stacked over-bright transparent water layers (plus volume bounces and caustics) — Cycles-only look
bucket: 04_Shading_Lighting
source: "Making a SERENE render in blender.txt"
source_time: "23:38–24:34"
blender_version_source: 3.x/4.x?
tool_target: principle-only
tier: principle
style_fit: "conflict: relies on path-traced transmission, volume bounces and caustics, which raea (rasterised Bevy) does not have; only the idea (a water surface that brightens what is under it) transfers."
---

## METADATA
04_Shading_Lighting | 3.x/4.x? (Cycles) | principle-only

## CREATIVE_INTENT
Principle: a transparent water material whose colour is set above 1.0 multiplies the light passing through it, so the submerged floor glows; duplicating the water surface above itself multiplies it again into a strong, unreal glow. Idea: use it when the water itself should feel lit from within (a "holy" pool), not as realistic water. The speaker tried it, liked it, and did not keep it; he did keep extra volume bounces and caustics because they made the water look better.

## STE_PROCEDURE
Method (as described):
1. Give the water a Transparent BSDF (or transmission) whose Color value exceeds 1.0 (~2–3×, "two or three times brighter").
2. Duplicate the whole water cube upward so light passes through two over-bright layers.
3. Judge the doubled glow in render; keep a single layer if it is too strong.
4. In Render Properties ▸ Light Paths ▸ Max Bounces, raise Volume (value not given; ~4–8).
5. In Light Paths ▸ Caustics, enable Reflective and Refractive.

## AGENT_EXECUTION
### Source tool (Blender Cycles)
```python
import bpy
sc = bpy.context.scene; sc.render.engine = 'CYCLES'
sc.cycles.volume_bounces = 6            # ~ not given
sc.cycles.caustics_reflective = True
sc.cycles.caustics_refractive = True
# water material: Transparent BSDF [Color] = (2.0, 2.0, 2.0, 1)  ~ "above one"
```
### Blender / raea translation
raea: no equivalent for transmission gain, volume bounces or caustics (no path tracing). Closest look in raea: a see-through water plane (`StandardMaterial base_color={Srgba.hex("#3a7fa0").with_alpha(0.4)} alpha_mode="Blend" perceptual_roughness={0.05}`) over a floor whose own `emissive` is raised slightly (`LinearRgba.from(Srgba.hex("#9fd6e6")).mul(0.6)`) so the submerged area reads brighter, plus `<Bloom intensity={0.6} threshold={0.9} />`. For caustic patterns, project them: a gobo/`shadow="only"` cut-out plane over a SpotLight (see the gobo card).

## NOTES
- Deprecated: none.
- Visual gaps: the full water shader is in an earlier video, not this one; values here are not given.
- Rule conflicts: Blender is never our final renderer — treat as a reference look only.
