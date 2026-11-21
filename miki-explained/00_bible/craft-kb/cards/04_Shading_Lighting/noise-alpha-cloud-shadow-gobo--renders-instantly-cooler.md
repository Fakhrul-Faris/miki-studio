---
title: Moving cloud shadows from a Noise Texture in a plane's Alpha
bucket: 04_Shading_Lighting
source: "6 Tips to Make Your Renders Instantly Cooler.txt"
source_time: "unknown (tip 2 of 6)"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: Dappled light breakup on the tabletop darkens what the line isn't about and spotlights the hero; animated drift adds calm motion on holds. Keep it slow.
---

## METADATA
04_Shading_Lighting | 3.x (Eevee Legacy blend modes) → 4.2+ | Shader nodes (gobo plane) → raea Cloud / shadow-only blockers

## CREATIVE_INTENT
Big soft shadows drifting across the ground make a landscape look epic and let you darken areas the viewer shouldn't look at while highlighting the important spot. Works at any scale — the same cloud plane, scaled down, can throw shadow over a face or an object.

## STE_PROCEDURE
1. Add a plane above the scene between the light (top-down Sun) and the ground.
2. Before the alpha works in Eevee Legacy, set Material Settings Blend Mode = Alpha Blend and Shadow Mode = Alpha Hashed.
3. Add a Noise Texture; link Noise [Fac] → Color Ramp [Fac] → Principled BSDF [Alpha].
4. Drag the Color Ramp stops together for hard shadow edges, apart for soft ones.
5. Select the Noise Texture and press Ctrl+T (Node Wrangler) to add Texture Coordinate + Mapping.
6. Use Mapping Location / Rotation / Scale to slide, turn and scale the shadow pattern (tileable).
7. Keyframe Mapping Location to drift the shadows over time.

## AGENT_EXECUTION
```python
import bpy
mat = bpy.data.materials.new("CloudGobo"); mat.use_nodes = True
N, L = mat.node_tree.nodes, mat.node_tree.links
bsdf = N["Principled BSDF"]
tc = N.new("ShaderNodeTexCoord"); mp = N.new("ShaderNodeMapping")
nz = N.new("ShaderNodeTexNoise"); nz.inputs["Scale"].default_value = 3.0   # ~
cr = N.new("ShaderNodeValToRGB")
cr.color_ramp.elements[0].position = 0.45; cr.color_ramp.elements[1].position = 0.6   # ~ hardness
L.new(tc.outputs["Object"], mp.inputs["Vector"]); L.new(mp.outputs["Vector"], nz.inputs["Vector"])
L.new(nz.outputs["Fac"], cr.inputs["Fac"]); L.new(cr.outputs["Color"], bsdf.inputs["Alpha"])
# 4.2+ EEVEE Next: blend_method/shadow_method are gone; use
mat.surface_render_method = "DITHERED"    # alpha casts shadows in EEVEE Next
mp.inputs["Location"].default_value[0] = 0.0
mp.inputs["Location"].keyframe_insert("default_value", frame=1)
mp.inputs["Location"].default_value[0] = 0.5   # ~ slow drift
mp.inputs["Location"].keyframe_insert("default_value", frame=240)
```
Links: `Texture Coordinate [Object] -> Mapping [Vector] -> Noise Texture [Vector]`; `Noise [Fac] -> Color Ramp [Fac]`; `Color Ramp [Color] -> Principled BSDF [Alpha]`.

raea: no light cookie / alpha-textured shadow is documented. Options with real props:
- Sky-scale: `<Cloud name position size seed time shadow />` casts drifting shadows into the sun's maps; soften with the sun's `soft_shadow_size` 2–4 (post.md "Clouds, smoke and contrails").
- Tabletop: geometry blockers `<Mesh3d shadow="only">` (blind slats, leaf cut-outs built as Manifold/GLB geometry) between a shadow-casting light and the set; animate their `transform` slowly.
- Whether `alpha_mode={{ Mask: 0.5 }}` on a `shadow="only"` plane cuts its shadow is not documented — verify on a still before relying on it.

## NOTES
- Deprecated: Eevee Legacy Blend Mode / Shadow Mode (Alpha Blend / Alpha Hashed) → EEVEE Next (4.2+) Material › Render Method (Dithered / Blended); shadows follow alpha automatically in Dithered.
- Visual gaps: noise scale, ramp positions not narrated (values ~).
- Rule conflicts: drift must be slow and eased; no flicker. Default house light is one soft top light — the gobo breaks that light, it doesn't add a second.
