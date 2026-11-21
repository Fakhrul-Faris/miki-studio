---
title: Ambient Occlusion node as a proximity dirt mask, varied by noise on Distance
bucket: 04_Shading_Lighting
source: "How to Create PRO Materials in Blender.txt"
source_time: "12:42–13:45"
blender_version_source: 4.x
tool_target: Shader nodes
tier: full
style_fit: Dirt only in crevices reads as "used, real" on the hero object; bake it, or use raea WearExtension grime at render.
---

## METADATA
04_Shading_Lighting | 4.2+ | Shader nodes (baked) → raea WearExtension / baked maps

## CREATIVE_INTENT
Dirt collects where wind and rain can't reach — crevices and contact areas. The AO node finds those automatically on any mesh, making the material "smart" instead of dirt-everywhere.

## STE_PROCEDURE
1. Add an Ambient Occlusion shader-utility node.
2. Link AO [Color] (or [AO]) → Color Ramp [Fac]; drag stops until crevices go dark and open faces white.
3. Link Color Ramp [Color] → Mix Shader [Fac] (paint vs dirt shader from the mix-shader card).
4. Add a Noise Texture; link Noise [Fac] → (Map Range) → AO [Distance] for varying reach.
5. Remap the noise with Map Range so Distance stays in a useful band (~0.05–0.5).

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials["CarPaint"]; N, L = m.node_tree.nodes, m.node_tree.links
ao = N.new("ShaderNodeAmbientOcclusion"); ao.samples = 16
ramp = N.new("ShaderNodeValToRGB")
ramp.color_ramp.elements[0].position = 0.55; ramp.color_ramp.elements[1].position = 0.9   # ~ visual only
L.new(ao.outputs["AO"], ramp.inputs["Fac"])
ms = next(n for n in N if n.bl_idname == "ShaderNodeMixShader")
L.new(ramp.outputs["Color"], ms.inputs["Fac"])        # check orientation: dark crevice → dirt (Shader B) may need invert
nz = N.new("ShaderNodeTexNoise"); mr = N.new("ShaderNodeMapRange")
mr.inputs["To Min"].default_value = 0.05; mr.inputs["To Max"].default_value = 0.5   # ~
L.new(nz.outputs["Fac"], mr.inputs["Value"]); L.new(mr.outputs["Result"], ao.inputs["Distance"])
```
Links: `Noise [Fac] -> Map Range [Value]`; `Map Range [Result] -> Ambient Occlusion [Distance]`; `Ambient Occlusion [AO] -> Color Ramp [Fac]`; `Color Ramp [Color] -> Mix Shader [Fac]`.

raea: bake the result in Cycles (AO node is expensive; bake once). At render time the nearest real prop is `<WearExtension grime={…} />` (grime gathered low and underneath) inside `<ExtendedMaterial>`. Scene-level `<AmbientOcclusion quality thickness />` darkens indirect light only — it is lighting, not a dirt material.

## NOTES
- Mask direction: AO is white in the open; feed the Mix so dark = dirt (swap Shader A/B or invert with Map Range From Min/Max swapped).
- Pointiness (Geometry node) is an alternative curvature source but is Cycles-only.
- Rule conflicts: none.
