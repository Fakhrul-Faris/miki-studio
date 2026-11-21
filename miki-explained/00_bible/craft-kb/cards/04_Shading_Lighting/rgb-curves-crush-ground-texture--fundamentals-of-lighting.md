---
title: Story texture on the ground, crushed dark to keep the silhouette
bucket: 04_Shading_Lighting
source: "Fundamentals of Lighting in Blender.txt"
source_time: "27:20–31:27"
blender_version_source: 4.x
tool_target: Blender bpy | Shader nodes | raea
tier: full
style_fit: Direct match — Style D needs "a real surface": a real scanned texture (counter, concrete, wood) that stays dark so the hero object reads.
---

## METADATA
04_Shading_Lighting | 4.x | Shader nodes, raea

## CREATIVE_INTENT
A plain black floor is readable but tells no story; a real surface that belongs to the object (concrete for a crate in a loading dock, a shop counter for a receipt) adds context for almost no effort. Crush the texture's brightness so the object's silhouette stays clean while the texture detail remains.

## STE_PROCEDURE
1. Apply a seamless PBR texture that fits the story to the ground plane.
2. Check the texture's real-world size (the source photographs at 2.5 × 2.5 m).
3. If the texture looks blurry or too large, scale the UVs by 2 in the UV Editor (S, 2).
4. Insert an RGB Curves node between the Base Color texture and Principled BSDF Base Color.
5. Pull the curve down (an inverted bow) to crush luminance while keeping detail.
6. Optionally lift a few bright specks back for life.
7. Disconnect the Metallic map.
8. Disconnect the Roughness map and set Roughness with the slider.

## AGENT_EXECUTION
Blender:
```python
import bpy
m = bpy.data.materials["Concrete"]; nt = m.node_tree; N, Lk = nt.nodes, nt.links
tex = N["Image Texture"]; bsdf = N["Principled BSDF"]
curves = N.new("ShaderNodeRGBCurve")
Lk.new(tex.outputs["Color"], curves.inputs["Color"])
Lk.new(curves.outputs["Color"], bsdf.inputs["Base Color"])
c = curves.mapping.curves[3]                 # combined C curve
c.points[1].location = (1.0, 0.45)           # ~ crush highlights
c.points.new(0.5, 0.12)                       # ~ inverted bow
curves.mapping.update()
for s in ("Metallic", "Roughness"):
    for l in list(bsdf.inputs[s].links): Lk.remove(l)
bsdf.inputs["Roughness"].default_value = 0.85 # ~ concrete
# UV scale ×2 (texture repeats more): in UV Editor select all, S 2 — or in nodes:
mp = N.new("ShaderNodeMapping"); mp.inputs["Scale"].default_value = (2, 2, 1)
```
Nodes: `Texture Coordinate [UV] -> Mapping [Vector] (Scale 2,2,1) -> Image Texture [Vector]`; `Image Texture [Color] -> RGB Curves [Color] -> Principled BSDF [Base Color]`.
raea (no curve node; Bevy multiplies the texture by `base_color`, a linear darken — `materials.md`):
```tsx
<StandardMaterial base_color="#3a3a3a"                       // ~ darkens the map (multiply, not a curve)
  base_color_texture={staticFile("concrete_floor_diff_1k.jpg")}
  normal_map_texture={staticFile("concrete_floor_nor_gl_1k.jpg")}
  perceptual_roughness={0.85} metallic={0}
  uv_transform={Affine2.fromScale([4, 4])} />                 // match the texture's real size to the plane
```
For a true curve, bake it into the JPG beforehand (ImageMagick `-level` / PIL) and log the asset in ASSET-SOURCES.md.

## NOTES
- Deprecated: Poly Haven/Polygon add-on used in the video is just a browser; any CC0 set works. Log every texture per house rule.
- Visual gaps: exact curve shape not stated (`~`).
- Rule conflicts: none.
