---
title: Day-to-night mood transition — animated Color Ramp fades the sky, key light fades out, cool light fades in
bucket: 04_Shading_Lighting
source: "Creating an Animation in Eevee (Blender 5.0).txt"
source_time: "19:09–20:31"
blender_version_source: 5.0
tool_target: Shader nodes
tier: full
style_fit: good — a lighting-state change built from the scene's own lights is an approved transition type; ties well to "the mood changes on the word"
---

## METADATA
04_Shading_Lighting | Blender 5.0 | Shader nodes + light keys + raea

## CREATIVE_INTENT
Change the whole mood within one continuous shot: as the carrier reaches its destination, the sky dissolves away, the main light dims, and a blue light rises, revealing a starfield and floating emissive particles. The three fades overlap so it is "not too abrasive" and feels smooth and dreamlike.

## STE_PROCEDURE
1. Route the sky image's Base Color through a Color Ramp into the sky material's Alpha.
2. Key the Color Ramp stop positions so the alpha goes to 0 by the arrival frame.
3. Key the main light's Power from full to 0 over the same window.
4. Key a blue light's Power from 0 to its level, starting slightly after the key light starts fading.
5. Place a star image plane behind the sky so it shows as the sky disappears.
6. Before you render, adjust the three timings so they overlap; refine until no single change jumps.

## AGENT_EXECUTION
```python
import bpy
A, B = 400, 460                                           # ~ transition window (frames not given)
nt = bpy.data.materials["sky"].node_tree
ramp = nt.nodes.new("ShaderNodeValToRGB")
nt.links.new(nt.nodes["Image Texture"].outputs["Color"], ramp.inputs["Fac"])
nt.links.new(ramp.outputs["Color"], nt.nodes["Principled BSDF"].inputs["Alpha"])
e0 = ramp.color_ramp.elements[0]                          # black stop
e0.position = 0.0;  e0.keyframe_insert("position", frame=A)
e0.position = 0.99; e0.keyframe_insert("position", frame=B)   # everything below goes black → alpha 0
key = bpy.data.lights["Spot"]; blue = bpy.data.lights["Blue"]
key.energy = 5000; key.keyframe_insert("energy", frame=A)
key.energy = 0;    key.keyframe_insert("energy", frame=B)
blue.energy = 0;   blue.keyframe_insert("energy", frame=A + 12)
blue.energy = 800; blue.keyframe_insert("energy", frame=B + 12)    # ~
```
Keep these keys Bezier (eased). Links: `Image [Color] -> Color Ramp [Fac]`, `Color Ramp [Color] -> Principled BSDF [Alpha]`.

raea (all per-frame, no bake):
```tsx
const ease = { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const day = interpolate(f, [A, B], [1, 0], ease);
const night = interpolate(f, [A + 12, B + 12], [0, 1], ease);
<SpotLight intensity={2700000 * day} ... />
<SpotLight color="#4a7dff" intensity={1200000 * night} ... />
<Mesh3d name="sky"><Plane3d ... /><StandardMaterial base_color_texture={staticFile("sky.jpg")} base_color={Srgba.hex("#ffffff").with_alpha(day)} alpha_mode="Blend" unlit /></Mesh3d>
<ImagePlane src={staticFile("stars.png")} width={60} position={[0, 10, -40]} />
```
A ramp-threshold dissolve (darks vanish first) has no raea prop; a uniform alpha fade is the equivalent. `<Environment>` intensity can also animate (lights.md example).

## NOTES
- Deprecated: none.
- Visual gaps: frame windows, light powers and the exact ramp keys are not spoken (`~`).
- Rule conflicts: none if the fades are ≥ ~0.4 s and overlap. Ambient (Grade/ToneMapping) can't animate in raea — do the mood change with lights and materials.
