---
title: Emissive plane with gradient-driven Alpha instead of an Area light (soft-edged reflection)
bucket: 04_Shading_Lighting
source: "The Key to Realistic Renders in Blender.txt"
source_time: "12:51–13:23"
blender_version_source: 4.x
tool_target: Shader nodes | raea
tier: full
style_fit: Gives glossy heroes (phone glass, coins, cans) a soft fading reflection strip; in raea bake it into a studio HDRI.
---

## METADATA
04_Shading_Lighting | 4.x | Shader nodes → raea Environment (custom panorama)

## CREATIVE_INTENT
A plain emissive plane lights like an area light but reflects as a hard white rectangle. Driving its alpha with a gradient gives a soft fade, with full control of falloff, strength and colour.

## STE_PROCEDURE
1. Add a plane where the area light would be.
2. Give it an Emission shader with strength to taste.
3. Add Texture Coordinate [UV] → Gradient Texture (Linear) → Color Ramp.
4. Mix: Color Ramp [Color] → Mix Shader [Fac], Shader A = Transparent BSDF, Shader B = Emission.
5. Shape the Color Ramp so the plane fades out at one edge.

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials.new("GradCard"); m.use_nodes = True; N, L = m.node_tree.nodes, m.node_tree.links
N.remove(N["Principled BSDF"])
tc = N.new("ShaderNodeTexCoord"); gr = N.new("ShaderNodeTexGradient"); cr = N.new("ShaderNodeValToRGB")
cr.color_ramp.interpolation = "B_SPLINE"
em = N.new("ShaderNodeEmission"); em.inputs["Strength"].default_value = 10   # ~
tr = N.new("ShaderNodeBsdfTransparent"); mx = N.new("ShaderNodeMixShader")
L.new(tc.outputs["UV"], gr.inputs["Vector"]); L.new(gr.outputs["Fac"], cr.inputs["Fac"])
L.new(cr.outputs["Color"], mx.inputs["Fac"]); L.new(tr.outputs["BSDF"], mx.inputs[1]); L.new(em.outputs["Emission"], mx.inputs[2])
L.new(mx.outputs["Shader"], N["Material Output"].inputs["Surface"])
```
Links: `Texture Coordinate [UV] -> Gradient Texture [Vector] -> Color Ramp [Fac] -> Mix Shader [Fac]`; `Transparent BSDF -> Mix [Shader 1]`; `Emission -> Mix [Shader 2]`.
raea: emissive meshes don’t light or reflect into other surfaces. Build-stage option: render an equirectangular studio HDR in Blender containing these gradient cards (Cycles panoramic camera, 2k .hdr — an asset, not the final render) and use it as `<Environment src={staticFile("studio_cards.hdr")} />`; light with a `<RectLight>` at the card’s place.

## NOTES
- Deprecated: none.
- Visual gaps: node set-up shown as a screenshot; wiring above is the standard version (~).
- Rule conflicts: none.

