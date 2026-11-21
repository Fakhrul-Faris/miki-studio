---
title: Reflective surfaces in the darkest zones to bring light back without adding light
bucket: 04_Shading_Lighting
source: "How to Make DARK Environments in Blender.txt"
source_time: "16:47–19:36"
blender_version_source: 4.x
tool_target: Blender bpy | Shader nodes | raea
tier: full
style_fit: Strong fit — Style D's real surface under the macro object can be a low-roughness counter/glass that mirrors the lit hero in the dark foreground.
---

## METADATA
04_Shading_Lighting | 4.x → 4.2+ / raea | Blender bpy + Shader nodes + raea

## CREATIVE_INTENT
A dark foreground is dead space; a puddle, polished metal, glass or a low-roughness wall there reflects the bright key area and adds interest while the overall darkness stays the same. Use it where the frame is darkest.

## STE_PROCEDURE
1. Before adding lights to a dead dark area, ask whether a reflective surface there could mirror the existing bright area.
2. Lower Roughness on surfaces in that area (wet floor, building side, glass) or make them metallic (chains, rings, burners).
3. For local puddles on a floor: subdivide the floor so it has enough vertices.
4. Enter Weight Paint mode (Ctrl+Tab) and paint the puddle shapes; this creates a vertex group named "Group".
5. In the floor material, add an Attribute node with Name = "Group".
6. Use Attribute [Fac] as a black/white mask driving Roughness (puddle = low) and fading the grunge texture out of the Bump in puddles.
7. Check that the reflections show the bright area, not a light source orb (see bounce card).

## AGENT_EXECUTION
Blender:
```python
import bpy
floor = bpy.data.objects["Floor"]
bpy.context.view_layer.objects.active = floor
sub = floor.modifiers.new("Sub", 'SUBSURF'); sub.subdivision_type = 'SIMPLE'; sub.levels = sub.render_levels = 4  # ~
vg = floor.vertex_groups.new(name="Group")          # weight-paint into this (manual brushing)
m = floor.active_material; N, L = m.node_tree.nodes, m.node_tree.links
bsdf = N["Principled BSDF"]
attr = N.new('ShaderNodeAttribute'); attr.attribute_name = "Group"
mr = N.new('ShaderNodeMapRange')          # puddle 1 → roughness 0.02, dry 0 → 0.6 (~)
mr.inputs['To Min'].default_value = 0.6; mr.inputs['To Max'].default_value = 0.02
L.new(attr.outputs['Fac'], mr.inputs['Value']); L.new(mr.outputs['Result'], bsdf.inputs['Roughness'])
```
Node links: `Attribute("Group") [Fac] -> Map Range [Value] -> Principled BSDF [Roughness]`; mask also `-> Mix (Factor) between grunge Bump Height and 0 -> Bump [Height]` (exact wiring not shown).
Export note: a vertex-group mask does not survive GLB as a material input — bake roughness to a texture (`bpy.ops.object.bake(type='ROUGHNESS')`) before export.

raea:
```tsx
<Mesh3d name="counter" transform={Transform.fromXyz(0, -0.02, 0)}>
  <Cuboid half_size={[2, 0.02, 2]} />
  <StandardMaterial base_color="#1a1c20" perceptual_roughness={0.08} clearcoat={1}
    metallic_roughness_texture={staticFile("counter_rough.png")} />
</Mesh3d>
<Environment src={staticFile("studio_dark_1k.hdr")} intensity={0.3} />  {/* gives glossy surfaces something to mirror */}
```
Reflections in Bevy come from screen + environment, so a glossy surface needs an `<Environment>` or bright on-screen content to mirror.

## NOTES
- Deprecated: none. Principled v2 socket names used.
- Visual gaps: the full puddle shader (how the mask feeds the bump) is shown, not narrated ("I'm not going to go too into the technical stuff").
- Rule conflicts: none.
