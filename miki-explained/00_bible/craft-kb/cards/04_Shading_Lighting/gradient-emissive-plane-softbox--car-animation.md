---
title: Soft "softbox" light from an emissive plane with a gradient-falloff mask (instead of an Area light)
bucket: 04_Shading_Lighting
source: "Making a Car Animation in Blender!.txt"
source_time: "07:00–07:31, 10:23–10:53"
blender_version_source: 3.x/4.x
tool_target: Shader nodes | raea
tier: full
style_fit: Serves Style D's "one soft top light" on glossy heroes (glass, metal, phone screens): a soft-edged reflection strip instead of a hard rectangular highlight.
---

## METADATA
04_Shading_Lighting | 3.x/4.x (Cycles) → 4.2+ / raea | Shader nodes + raea

## CREATIVE_INTENT
Hard-edged Area lights leave ugly rectangular reflections on glass and gloss. A plane whose emission fades softly to its edges reads as a studio softbox: smooth gradient highlights that describe the product's shape.

## STE_PROCEDURE
1. Add a Plane where the softbox should be; aim it at the hero.
2. In its material, add Gradient Texture → Color Ramp → Emission (Strength) → Material Output Surface.
3. Set the Color Ramp stops so the centre is white and the edges fall to black (soft falloff).
4. Set Emission Strength until the reflection reads (value not given).
5. Use several such planes to rim the shape and big glass panels.
6. Before rendering, hide the planes from Camera rays if they are in frame (Object > Visibility).

## AGENT_EXECUTION
Shader nodes (Blender preview; values `~`):
```
Texture Coordinate [Generated] -> Gradient Texture (type ~Quadratic Sphere / Spherical) [Vector]
Gradient Texture [Fac] -> Color Ramp [Fac]   (stops ~ 0.0 #000000, ~0.6 #FFFFFF)
Color Ramp [Color] -> Emission [Strength] (multiplied: Math Multiply × ~20)
Emission [Emission] -> Material Output [Surface]
```
```python
import bpy
m = bpy.data.materials.new("Softbox"); m.use_nodes = True; nt = m.node_tree; N, L = nt.nodes, nt.links
N.clear(); out = N.new("ShaderNodeOutputMaterial"); em = N.new("ShaderNodeEmission")
tc = N.new("ShaderNodeTexCoord"); gr = N.new("ShaderNodeTexGradient"); gr.gradient_type = 'QUADRATIC_SPHERE'  # ~
ramp = N.new("ShaderNodeValToRGB"); mul = N.new("ShaderNodeMath"); mul.operation = 'MULTIPLY'; mul.inputs[1].default_value = 20  # ~
L.new(tc.outputs["Generated"], gr.inputs["Vector"]); L.new(gr.outputs["Fac"], ramp.inputs["Fac"])
L.new(ramp.outputs["Color"], mul.inputs[0]); L.new(mul.outputs[0], em.inputs["Strength"]); L.new(em.outputs[0], out.inputs["Surface"])
```
(Generated coords are 0–1 on a plane; recentre with Vector Math Subtract 0.5 before a spherical gradient.)
raea: emissive surfaces do not light neighbours, so split the job — a `RectLight` does the lighting, an emissive card supplies the reflection shape:
```tsx
<RectLight transform={Transform.fromXyz(0, 0.8, 0.3).lookingAt([0, 0, 0])} intensity={40000} width={0.6} height={0.3} color="#f4f6ff" />
<Mesh3d name="softbox-card" transform={Transform.fromXyz(0, 0.8, 0.3).lookingAt([0, 0, 0])}>
  <Cuboid half_size={[0.3, 0.15, 0.002]} />
  <StandardMaterial base_color="#000000" emissive_texture={staticFile("softbox_falloff.png")} emissive={LinearRgba.from(Srgba.hex("#ffffff")).mul(4)} unlit />
</Mesh3d>
```
`softbox_falloff.png` = a radial white→black gradient (generated once). An `<Environment>` HDRI with a studio softbox is the other route to glossy reflections.

## NOTES
- Deprecated: none (Emission node; Principled "Emission" → "Emission Color" if done on a Principled BSDF instead).
- Visual gaps: the exact gradient type and Color Ramp stop positions are shown ("set up like this"), not spoken — values above are `~`.
- Rule conflicts: none. Keep the light colour neutral; the brand accent belongs only on the subject of the line.
