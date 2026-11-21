---
title: Seamless mirror "water" floor with animated noise bump
bucket: 04_Shading_Lighting
source: "How to Make Perfect Product Animations in Blender.txt"
source_time: "17:55–19:02, 21:08–21:40"
blender_version_source: 4.x (~4.4)
tool_target: Shader nodes
tier: full
style_fit: partial — a reflective dark surface suits Style D's "real surface"; raea has no mirror reflections of scene objects (see NOTES)
---

## METADATA
04_Shading_Lighting | Blender 4.4 (source), 4.2+/5.x code | Shader nodes + raea

## CREATIVE_INTENT
A huge metallic, zero-roughness plane under the product reflects the dark backdrop so floor and background merge with no horizon seam; a fine noise bump makes it read as still water, and slowly scaling the noise makes it drift.

## STE_PROCEDURE
1. Add a Plane; scale it until it reaches the backdrop plane.
2. Lower it to just under the product's base (charger).
3. Add a material; set Metallic 1.0 and Roughness 0.0 (mirror).
4. Check camera view with the floor grid off: the horizon seam should vanish.
5. In the Shader Editor add a Noise Texture and a Bump node.
6. Link Noise Texture [Color] → Bump [Height]; Bump [Normal] → Principled BSDF [Normal].
7. Raise Noise Scale until the surface reads as water; raise Detail for finer ripples.
8. Lower Bump Strength until the ripple is subtle.
9. Insert a key on Noise Scale at frame 1; at the last frame set Scale 525 and key it.
10. Select only the noise keys; set interpolation Linear (Key → Interpolation, or T).
11. If the drift is too fast, move the last key later to stretch it.

## AGENT_EXECUTION
```python
import bpy
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, -0.01))
fl = bpy.context.object; fl.scale = (40, 40, 1)          # ~ reach the backdrop
m = bpy.data.materials.new("Water"); m.use_nodes = True; fl.data.materials.append(m)
nt = m.node_tree; bsdf = nt.nodes["Principled BSDF"]
bsdf.inputs["Metallic"].default_value = 1.0
bsdf.inputs["Roughness"].default_value = 0.0
noise = nt.nodes.new("ShaderNodeTexNoise"); bump = nt.nodes.new("ShaderNodeBump")
nt.links.new(noise.outputs["Color"], bump.inputs["Height"])
nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
noise.inputs["Scale"].default_value = 200.0              # ~ start value not given
noise.inputs["Detail"].default_value = 8.0               # ~
bump.inputs["Strength"].default_value = 0.2              # ~ "reduce the strength"
bpy.context.preferences.edit.keyframe_new_interpolation_type = 'LINEAR'
noise.inputs["Scale"].keyframe_insert("default_value", frame=1)
noise.inputs["Scale"].default_value = 525.0
noise.inputs["Scale"].keyframe_insert("default_value", frame=bpy.context.scene.frame_end)
bpy.context.preferences.edit.keyframe_new_interpolation_type = 'BEZIER'
```
raea: no equivalent for the mirror (no screen-space/planar reflections documented; a `metallic={1} perceptual_roughness={0}` floor reflects only an `<Environment>` panorama, not the product). Closest house approximation:
```tsx
<Mesh3d transform={Transform.fromXyz(0, -0.05, 0)}>
  <Cuboid half_size={[40, 0.05, 40]} />
  <StandardMaterial base_color="#05070b" metallic={1} perceptual_roughness={0.08}
    normal_map_texture={staticFile("water_ripple_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([20, 20])} />
</Mesh3d>
<Environment src={staticFile("studio_dark_1k.hdr")} intensity={0.4} />
```
Bake the Noise→Bump as a tileable normal map in Blender (bake type NORMAL) for `normal_map_texture`. Animating `uv_transform` per frame (the drift) is not documented in the skill — test before relying on it; otherwise skip the drift.

## NOTES
- Deprecated: none (Noise Texture "Detail" unchanged; 4.1+ adds noise types — default fBM matches).
- Visual gaps: starting noise scale, detail and bump strength values are on screen only.
- Rule conflicts: Linear here is a texture drift, not a camera move — fine.
- The product's reflection in the water, central to the source shot, will not appear in raea; a mirrored duplicate of the product below the floor (scale y -1, darkened) is a possible fake — untested.
