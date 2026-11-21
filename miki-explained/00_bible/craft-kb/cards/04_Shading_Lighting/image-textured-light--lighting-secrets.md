---
title: Image-textured light source (photo as light colour)
bucket: 04_Shading_Lighting
source: "5 Lighting SECRETS in Blender.txt"
source_time: "00:57–07:32"
blender_version_source: 3.x/4.x (light node trees, Cycles)
tool_target: Shader nodes
tier: full
style_fit: Adds organic, uneven texture to the one soft top light so the macro surface doesn't look like flat CG; raea has no light cookie, so it must be faked (see AGENT_EXECUTION).
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x, Cycles only (EEVEE ignores light node trees) | Shader nodes (light node tree)

## CREATIVE_INTENT
Use when a light is correct in direction but reads as a perfect CG cone: running a photo (sun through a door hitting a wall,
refraction, ripples) through the light gives uneven, natural colour and brightness in the pool. Use it as a secondary layer
next to a normal key, not as the only light.

## STE_PROCEDURE
1. Add a Spot light (Area and Point also work).
2. Before you texture an Area light, set its Spread to 0° and raise its Size.
3. Set the world background strength low (~0.0–0.05) so the light pattern reads.
4. Enable Use Nodes on the light in the Shader Editor (Object tab).
5. Keep the light's own Color and the Emission node's Color both white; both multiply the result.
6. Add an Image Texture with a photo of real light patterns (own phone photo or Unsplash).
7. Link Image Texture [Color] to Emission [Color].
8. Rotate the light on its local Z (R, Z, Z) to orient the pattern.
9. Raise Power until the pattern reads.
10. Raise the light Radius slightly to blur the photo's own surface texture; too high erases the pattern.
11. Optional: tint the light Color (e.g. slight blue).
12. Optional: link Image [Color] → Color Ramp (Interpolation Ease or B-Spline) → Emission [Strength] so dark areas emit less.
13. Optional: multiply Strength with a Math node (Multiply) to scale it.
14. Optional: insert Hue/Saturation/Value (Saturation > 1) after the image to exaggerate the rainbow split.
15. Raise Spot Blend to soften the cone edge.
16. Duplicate the light and rotate the copies to layer the pattern; keep one conventional key light in the scene.

## AGENT_EXECUTION
### Blender (Cycles)
```python
import bpy
bpy.ops.object.light_add(type='SPOT', location=(0, 0, 3))
L = bpy.context.object; ld = L.data
ld.energy = 1000            # ~ "a bit higher"
ld.shadow_soft_size = 0.1   # ~ radius: small blur of the photo's grain
ld.spot_blend = 0.5         # ~
ld.use_nodes = True
nt = ld.node_tree; N = nt.nodes
em = N["Emission"]
img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//light_pattern.jpg")
ramp = N.new("ShaderNodeValToRGB"); ramp.color_ramp.interpolation = 'EASE'
hsv = N.new("ShaderNodeHueSaturation"); hsv.inputs["Saturation"].default_value = 1.5  # ~
nt.links.new(img.outputs["Color"], hsv.inputs["Color"])
nt.links.new(hsv.outputs["Color"], em.inputs["Color"])
nt.links.new(img.outputs["Color"], ramp.inputs["Fac"])
nt.links.new(ramp.outputs["Color"], em.inputs["Strength"])
L.rotation_euler[2] += 0.6  # ~ local-Z spin to place the pattern
```
Nodes: `Image Texture [Color] -> Hue/Saturation/Value [Color] -> Emission [Color]`; `Image Texture [Color] -> Color Ramp [Fac] -> (Math Multiply) -> Emission [Strength]`; `Emission [Emission] -> Light Output [Surface]`.

### raea
raea: no equivalent (no light cookie / projected-texture light; lights take only `color`, `intensity`, cone angles). Translation:
- Pattern on the surface: `<Decal src={staticFile("light_pattern.png")} position normal size color opacity />` on the lit surface (low `opacity` ~0.2–0.4, warm `color`), with roughness ≥ 0.5 so it doesn't read as glass.
- Coloured layering: 2–3 `<SpotLight>`s with slightly different `color` and `outer_angle`/`inner_angle`, `inner_angle` ≈ half of outer for a soft edge.
- Shadow-shaped variation: a `shadow="only"` blocker (see gobo card).

## NOTES
- Deprecated: none in the steps; light node trees are Cycles-only in every version (EEVEE Next still ignores them).
- Visual gaps: exact power, radius and ramp handle positions are shown on screen only; the texture coordinate used for the light's image is never stated (default mapping assumed).
- Rule conflicts: none; keep the pattern subtle so the single-accent rule isn't broken by rainbow colours.
