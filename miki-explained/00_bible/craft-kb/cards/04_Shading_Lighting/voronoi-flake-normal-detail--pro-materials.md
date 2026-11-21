---
title: Metallic-flake speckle via high-scale Voronoi into a low-strength Normal Map
bucket: 04_Shading_Lighting
source: "How to Create PRO Materials in Blender.txt"
source_time: "01:20–02:29"
blender_version_source: 4.x
tool_target: Shader nodes
tier: full
style_fit: Macro detail that catches the single soft top light and sparkles under bloom; must be baked to a normal map for raea.
---

## METADATA
04_Shading_Lighting | 4.2+ | Shader nodes (baked) → raea normal_map_texture

## CREATIVE_INTENT
A layer of tiny detail is what makes a close-up material read as real. Sharp-edged Voronoi cells, used as normals, give the flaky glints of metallic paint that a macro camera move makes shimmer; noise gives a softer, less convincing speckle.

## STE_PROCEDURE
1. Add a Voronoi Texture; set Scale = 1000 (same scale and detail as the noise trial).
2. Before you link it to normals, convert it with a Normal Map node so speckles distort light.
3. Link Voronoi [Color] → Normal Map [Color].
4. Set Normal Map Strength low (~0.1–0.3).
5. Link Normal Map [Normal] → Principled BSDF [Normal].
6. Compare against Noise Texture (Scale 1000): keep Voronoi for flake, Noise for soft grain.
7. Add more detail layers (2–3) when one layer looks flat.

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials["CarPaint"]; N, L = m.node_tree.nodes, m.node_tree.links
p = N["Principled BSDF"]
vor = N.new("ShaderNodeTexVoronoi"); vor.inputs["Scale"].default_value = 1000.0
nm = N.new("ShaderNodeNormalMap"); nm.inputs["Strength"].default_value = 0.2   # ~ "low strength"
L.new(vor.outputs["Color"], nm.inputs["Color"])
L.new(nm.outputs["Normal"], p.inputs["Normal"])
```
Links: `Voronoi Texture(Scale 1000) [Color] -> Normal Map(Strength ~0.2) [Color]`; `Normal Map [Normal] -> Principled BSDF [Normal]`.

Bake for raea (Cycles bake is a BUILD step, not the final render):
```python
bpy.context.scene.render.engine = 'CYCLES'
img = bpy.data.images.new("flake_nor", 2048, 2048, float_buffer=False)
tex = N.new("ShaderNodeTexImage"); tex.image = img; N.active = tex   # active node = bake target
bpy.ops.object.bake(type='NORMAL', normal_space='TANGENT')
img.filepath_raw = "//flake_nor.png"; img.file_format = 'PNG'; img.save()
```
raea: `<StandardMaterial normal_map_texture={staticFile("flake_nor.png")} base_color="#8a0f1e" metallic={1} perceptual_roughness={0.25} clearcoat={1} />`. Flake cells at Scale 1000 need enough texels: bake 2k only for a frame-filling hero surface (materials.md).

## NOTES
- raea evaluates no shader graph; the Voronoi must be baked (normal map) before GLB export.
- If the bake looks like noise, the UV island is too small for 1000-scale cells; raise image size or lower Scale (~300).
- Rule conflicts: none.
