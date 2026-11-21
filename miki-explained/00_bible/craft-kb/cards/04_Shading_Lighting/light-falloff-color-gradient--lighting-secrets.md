---
title: Light Falloff colour gradient (colour shifts with distance)
bucket: 04_Shading_Lighting
source: "5 Lighting SECRETS in Blender.txt"
source_time: "22:18–27:42"
blender_version_source: 3.x/4.x
tool_target: Shader nodes
tier: full
style_fit: Balances a brand accent near the source with a cool falloff (warm core, cool spill); use sparingly — one accent rule still applies.
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x, Cycles | Shader nodes (light node tree)

## CREATIVE_INTENT
Use when two brand colours must coexist: light that is one colour near the source and fades to another with distance gives a
controlled, concentrated glow around an emitter. Not physically real — keep it subtle.

## STE_PROCEDURE
1. Add a Point light (any type works).
2. Enable Use Nodes on the light.
3. Add a Light Falloff node; use the Linear output.
4. Link Light Falloff [Linear] → Color Ramp [Fac] → Emission [Color].
5. Set the ramp stops (e.g. warm red at one end, cool blue at the other).
6. Adjust Light Falloff [Strength] until the colour transition falls inside the visible range.
7. Raise Emission strength until the scene reads normally.
8. Keep Color Ramp Color Mode on RGB; HSV/HSL sweeps through the whole spectrum (trippy).
9. Prefer warm near the source fading to cool.
10. Optional: Mix (Color, Multiply) a caustic image in, or add a gobo.

## AGENT_EXECUTION
### Blender (Cycles)
```python
import bpy
bpy.ops.object.light_add(type='POINT', location=(0, 0, 1))
ld = bpy.context.object.data; ld.use_nodes = True
nt = ld.node_tree; N = nt.nodes
fo = N.new("ShaderNodeLightFalloff"); fo.inputs["Strength"].default_value = 50  # ~ tune into range
ramp = N.new("ShaderNodeValToRGB"); ramp.color_ramp.color_mode = 'RGB'
ramp.color_ramp.elements[0].color = (1, 0.15, 0.05, 1)   # warm (near)
ramp.color_ramp.elements[1].color = (0.25, 0.3, 1, 1)    # cool (far)
nt.links.new(fo.outputs["Linear"], ramp.inputs["Fac"])
nt.links.new(ramp.outputs["Color"], N["Emission"].inputs["Color"])
```
Nodes: `Light Falloff [Linear] -> Color Ramp [Fac]`; `Color Ramp [Color] -> Emission [Color]`; `Emission -> Light Output [Surface]`.

### raea
raea: no equivalent (no per-light shader / distance ramp). Translation: two co-located lights —
`<PointLight color="#ff3a1e" intensity={…} range={0.8} />` (short reach, warm core) plus `<PointLight color="#5a6cff" intensity={…} range={4} />` (long reach, cool spill). `range` is a reach cutoff, so tune both on a still (~).

## NOTES
- Deprecated: none (Light Falloff is long-standing; "Mix RGB" → Mix node Color).
- Visual gaps: which ramp end maps to "near" depends on the strength range — tune visually.
- Rule conflicts: two hues compete with the one-accent rule; use one colour as the accent and the other desaturated.
