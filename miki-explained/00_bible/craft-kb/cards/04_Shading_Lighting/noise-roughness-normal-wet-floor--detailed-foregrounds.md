---
title: Wet-floor puddles from one noise driving roughness and normal strength
bucket: 04_Shading_Lighting
source: "How to get Detailed Foregrounds  Blender Tutorial.txt"
source_time: "11:38–13:39"
blender_version_source: 3.x
tool_target: Shader nodes
tier: full
style_fit: Gives the dark-room macro surface glossy "puddle" patches that catch the single soft top light and bloom; the noise must be baked to textures because raea takes texture maps, not shader graphs.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes (build) → raea StandardMaterial maps

## CREATIVE_INTENT
A reflective, wet-looking floor only reads when bright highlights fall on it; swapping the texture's roughness map for a crunched noise — and using the same noise to flatten the normal map where the floor is glossy — makes smooth mirror-like patches between rough ones. The noise also breaks up tiling, so a texture can be scaled up a lot in the foreground without a repeating look.

## STE_PROCEDURE
1. Use a free concrete PBR set (Poly Haven in the video); keep only its Base Color and Normal map.
2. Link the Base Color image unaltered into Principled BSDF [Base Color].
3. Discard the set's roughness map.
4. Add a Noise Texture; raise Scale, Detail and Roughness (exact values on screen only).
5. Link Noise [Fac] into a Color Ramp; pinch its stops together to crunch the noise to near black/white.
6. Link that Color Ramp into Principled BSDF [Roughness].
7. Link the same Noise [Fac] into a second, slightly different Color Ramp.
8. Link the second ramp into Normal Map [Strength], so low-roughness areas also get low normal strength.
9. Set the texture to 4K and scale the UVs up so the foreground is not low-resolution.
10. Before you judge the result, add a bright highlight in front of the camera; in a white void the effect is invisible.
11. For raea: bake Roughness and Normal to images, then assign them as maps.

## AGENT_EXECUTION
```python
import bpy
mat = bpy.data.materials.new("WetConcrete"); mat.use_nodes = True
N, L = mat.node_tree.nodes, mat.node_tree.links
bsdf = N["Principled BSDF"]
base = N.new('ShaderNodeTexImage'); base.image = bpy.data.images.load("//tex/concrete_diff_4k.jpg")
nrm  = N.new('ShaderNodeTexImage'); nrm.image  = bpy.data.images.load("//tex/concrete_nor_gl_4k.png")
nrm.image.colorspace_settings.name = 'Non-Color'
nmap = N.new('ShaderNodeNormalMap')
noise = N.new('ShaderNodeTexNoise')
noise.inputs['Scale'].default_value = 8.0          # ~ "turned up"
noise.inputs['Detail'].default_value = 10.0        # ~
noise.inputs['Roughness'].default_value = 0.7      # ~
r1 = N.new('ShaderNodeValToRGB')                    # Color Ramp → roughness
r1.color_ramp.elements[0].position = 0.45; r1.color_ramp.elements[1].position = 0.55   # ~ crunch
r2 = N.new('ShaderNodeValToRGB')                    # Color Ramp → normal strength (slightly altered copy)
r2.color_ramp.elements[0].position = 0.40; r2.color_ramp.elements[1].position = 0.60   # ~
mapping = N.new('ShaderNodeMapping'); mapping.inputs['Scale'].default_value = (4, 4, 1)  # ~ "scaled up quite a bit"
tc = N.new('ShaderNodeTexCoord')
L.new(tc.outputs['UV'], mapping.inputs['Vector'])
for img in (base, nrm): L.new(mapping.outputs['Vector'], img.inputs['Vector'])
L.new(base.outputs['Color'], bsdf.inputs['Base Color'])
L.new(noise.outputs['Fac'], r1.inputs['Fac']); L.new(r1.outputs['Color'], bsdf.inputs['Roughness'])
L.new(noise.outputs['Fac'], r2.inputs['Fac']); L.new(r2.outputs['Color'], nmap.inputs['Strength'])
L.new(nrm.outputs['Color'], nmap.inputs['Color']); L.new(nmap.outputs['Normal'], bsdf.inputs['Normal'])
```
Links: `Image(diff) [Color] -> Principled [Base Color]`; `Noise [Fac] -> Color Ramp A [Fac]`, `Color Ramp A [Color] -> Principled [Roughness]`; `Noise [Fac] -> Color Ramp B [Fac]`, `Color Ramp B [Color] -> Normal Map [Strength]`; `Image(nor) [Color] -> Normal Map [Color]`, `Normal Map [Normal] -> Principled [Normal]`.

Bake for raea (Blender is the build tool here; Cycles bakes, raea renders):
```python
sc = bpy.context.scene; sc.render.engine = 'CYCLES'
img_r = bpy.data.images.new("wet_rough", 2048, 2048, is_data=True)
img_n = bpy.data.images.new("wet_nor", 2048, 2048, is_data=True)
tgt = N.new('ShaderNodeTexImage'); N.active = tgt
tgt.image = img_r; bpy.ops.object.bake(type='ROUGHNESS'); img_r.filepath_raw = "//media/wet_rough.png"; img_r.save()
tgt.image = img_n; sc.render.bake.normal_space = 'TANGENT'; bpy.ops.object.bake(type='NORMAL'); img_n.filepath_raw = "//media/wet_nor_gl.png"; img_n.save()
```
raea (`raea/pbr`):
```tsx
<StandardMaterial
  base_color_texture={staticFile("concrete_diff.jpg")}
  normal_map_texture={staticFile("wet_nor_gl.png")}
  metallic_roughness_texture={staticFile("wet_rough.png")}  // Bevy reads roughness from green; greyscale works
  perceptual_roughness={1}                                    // take the map as-is (0.5 default halves it → too wet)
  uv_transform={Affine2.fromScale([4, 4])} />
```
Light it with a hot highlight in shot: `<SpotLight ... shadow_maps_enabled />` behind/above the subject so the glossy patches mirror it, plus `<Bloom intensity={1} threshold={0.9} />` and `<Environment src=... />` for something to reflect.

## NOTES
- Deprecated: none in the graph. Bevy's roughness map is the green channel; a greyscale PNG works.
- The baked map loses the noise's infinite resolution: bake at 2K for a frame-filling surface (materials.md: 2k only when it fills the frame).
- All node values are `~` (on screen only: "scale, detail, roughness turned up").
- No displacement on this floor in the video — roughness + normal only.
- Visual gaps: the exact ramp stop positions are shown, not said.
- Rule conflicts: none; keep the brand accent off the floor.
