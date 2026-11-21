---
title: Material variant that keeps the surface — reuse the normal + roughness maps, swap only the base colour
bucket: 04_Shading_Lighting
source: "How to Add Tons of Detail To Your Renders  Blender.txt"
source_time: "19:28–20:47"
blender_version_source: 4.x
tool_target: Shader nodes | raea
tier: full
style_fit: The clean way to put the one brand accent (or a neutral white) on a part without losing its real surface; the accent shows while bumps and wear still catch the top light.
---

## METADATA
04_Shading_Lighting | 4.x source → 4.x nodes → raea | Shader nodes, raea

## CREATIVE_INTENT
To make one part stand out (the railings), give it a second material that copies the original's normal and roughness
maps and replaces only the colour with flat white or grey. It stays the same physical stuff (same scratches, same
sheen), just painted, so it pops without looking pasted on.

## STE_PROCEDURE
1. Select the part (a railing) and all its linked geometry (`Ctrl+L` in Edit Mode selects linked).
2. In the material slots, add a new material; assign it to the selected faces.
3. Copy the Normal Map and Roughness image nodes from the original metal material; paste them into the new material.
4. Link them to the new Principled BSDF's Normal and Roughness inputs.
5. Leave Base Color as a flat colour: white or grey (no image).
6. Brighten the colour slightly if it reads too dark in render.
7. Before you finish, make every other copy of the part use the same data: select the copies, original active, Link/Transfer Data → Link Objects & Data (`Ctrl+L`).

## AGENT_EXECUTION
### Shader nodes (4.x)
```
Image(metal_rough) [Color] -> Principled BSDF [Roughness]           (Non-Color)
Image(metal_nor_gl) [Color] -> Normal Map [Color] ; Normal Map [Normal] -> Principled BSDF [Normal]
Principled BSDF [Base Color] = #E6E6E6 (~ "white or grey")
```
```python
import bpy
orig = bpy.data.materials["rust_metal"]; on = orig.node_tree.nodes
m = bpy.data.materials.new("rail_painted"); m.use_nodes = True; nt = m.node_tree; N, L = nt.nodes, nt.links
b = N["Principled BSDF"]; b.inputs['Base Color'].default_value = (0.8, 0.8, 0.8, 1)       # ~
r = N.new('ShaderNodeTexImage'); r.image = on["rough"].image; r.image.colorspace_settings.name = 'Non-Color'
n = N.new('ShaderNodeTexImage'); n.image = on["nor"].image; n.image.colorspace_settings.name = 'Non-Color'
nm = N.new('ShaderNodeNormalMap')
L.new(r.outputs['Color'], b.inputs['Roughness']); L.new(n.outputs['Color'], nm.inputs['Color'])
L.new(nm.outputs['Normal'], b.inputs['Normal'])
rail = bpy.data.objects["railing"]; rail.data.materials.append(m)
for p in rail.data.polygons: p.material_index = len(rail.data.materials) - 1      # whole object; or only the selected faces
# copies follow: select copies, rail active →
# bpy.ops.object.make_links_data(type='OBDATA')
```

### raea
- Same maps, new colour, at render time (no re-export):
```tsx
<Model src={staticFile("set.glb")}>
  <StandardMaterial material="rail_painted" base_color="#e6e6e6" perceptual_roughness={1}
    normal_map_texture={staticFile("metal_nor_gl_1k.jpg")} metallic_roughness_texture={staticFile("metal_rough_1k.jpg")} />
</Model>
```
  Inside a Model only the given fields change (materials.md). Bevy reads roughness from the green channel, so a greyscale
  map works; `perceptual_roughness={1}` takes it as it is. Use the `_nor_gl` map, not `_nor_dx`.
- Brand-accent version: the same material with `base_color` = the accent hex. To fade the accent in on the word (~0.4 s, never a pop):
  `animate={{ base_color: track({ [f0]: "#e6e6e6", [f0 + 12]: ACCENT }, "in-out-cubic") }}` on a TSX `StandardMaterial`
  (materials.md: `animate` blends colours in Oklab).

## NOTES
- Visual gaps: the exact grey and the brightness tweak are on screen only.
- Deprecated: none. On Principled v2 (4.0+) the input names Roughness and Normal are unchanged.
- Rule conflicts: none. This is the preferred way to apply the single accent: colour changes, surface stays.
- STT fix: "object settings" = Material Properties.
