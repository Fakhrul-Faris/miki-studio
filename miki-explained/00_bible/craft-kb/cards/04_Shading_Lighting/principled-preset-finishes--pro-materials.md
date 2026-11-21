---
title: Principled BSDF preset finishes (rough plastic, thin-film bubble, coated car paint)
bucket: 04_Shading_Lighting
source: "How to Create PRO Materials in Blender.txt"
source_time: "00:36–01:20"
blender_version_source: 4.x
tool_target: Shader nodes
tier: full
style_fit: Gives the Style D hero object a believable base finish in one node; car-paint coat maps 1:1 to raea clearcoat.
---

## METADATA
04_Shading_Lighting | 4.2+ (Thin Film needs 4.2) | Shader nodes → raea StandardMaterial

## CREATIVE_INTENT
Level 1 of a material: get the base finish right before any detail. A macro shot reads "plastic", "paint" or "glass" from roughness, metalness and a coat alone, so this is the first thing to settle on the hero object.

## STE_PROCEDURE
1. Rough plastic: set Principled BSDF Roughness between 0.3 and 0.8.
2. Rough plastic: raise Transmission Weight slightly (~0.1–0.3) so light passes through.
3. Soap bubble: set Roughness near 0 (~0.02).
4. Soap bubble: set IOR = 3.0 and Transmission Weight = 1.0.
5. Soap bubble: in the Thin Film panel set Thickness = ~500 nm and Thin Film IOR = 1.6.
6. Car paint: set Base Color to the paint colour and Metallic = 1.0.
7. Car paint: set Roughness = 0.25.
8. Car paint: set Coat Weight = 1.0 for the glossy top layer.

## AGENT_EXECUTION
```python
import bpy
def pmat(name):
    m = bpy.data.materials.new(name); m.use_nodes = True
    return m, m.node_tree.nodes["Principled BSDF"]

m, p = pmat("RoughPlastic")
p.inputs["Roughness"].default_value = 0.5            # 0.3–0.8
p.inputs["Transmission Weight"].default_value = 0.2  # ~ "add some transmission"

m, p = pmat("SoapBubble")
p.inputs["Roughness"].default_value = 0.02           # ~ "near zero"
p.inputs["IOR"].default_value = 3.0
p.inputs["Transmission Weight"].default_value = 1.0
p.inputs["Thin Film Thickness"].default_value = 500.0  # nm (4.2+)
p.inputs["Thin Film IOR"].default_value = 1.6

m, p = pmat("CarPaint")
p.inputs["Base Color"].default_value = (0.6, 0.02, 0.03, 1)  # any paint colour
p.inputs["Metallic"].default_value = 1.0
p.inputs["Roughness"].default_value = 0.25
p.inputs["Coat Weight"].default_value = 1.0
```
raea (render time, real props):
```tsx
<StandardMaterial base_color="#8a0f1e" metallic={1} perceptual_roughness={0.25} clearcoat={1} clearcoat_perceptual_roughness={0.05} />   // car paint (coat roughness ~)
<StandardMaterial base_color="#d8d2c4" metallic={0} perceptual_roughness={0.5} specular_transmission={0.2} thickness={0.01} />          // rough plastic (~)
```
Metal needs an `<Environment>` panorama to look like metal (materials.md); without one keep `metallic` 0.2–0.6.

## NOTES
- Deprecated: pre-4.0 socket names "Transmission" → "Transmission Weight", "Clearcoat" → "Coat Weight", "Specular" → "Specular IOR Level". Thin Film exists only from 4.2.
- raea: no equivalent for thin-film iridescence (view-dependent; cannot be baked to a texture). Fake a bubble with low-alpha `alpha_mode="Blend"` glass and an Environment reflection.
- IOR 3.0 for a bubble is the video's value (physically water is ~1.33); keep it only for the look.
- Rule conflicts: none.
