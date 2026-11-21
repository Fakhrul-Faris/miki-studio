---
title: Fake caustics from a water image in the light
bucket: 04_Shading_Lighting
source: "5 Lighting SECRETS in Blender.txt"
source_time: "06:10–06:28, 27:05–27:23"
blender_version_source: 3.x/4.x
tool_target: Shader nodes
tier: full
style_fit: Fits macro shots of glass, water or a drink; a moving ripple pattern is a calm "alive" cue, not a flashy transition.
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x, Cycles | Shader nodes (light node tree)

## CREATIVE_INTENT
Use when an object sits near water or glass and the real caustic would be too slow or noisy to render: a water-caustic image in a
point light sprays believable ripple light around it. Animating it adds quiet life to a held shot.

## STE_PROCEDURE
1. Add a Point light in the middle of the scene (or reuse the image-textured light setup).
2. Enable Use Nodes on the light.
3. Add an Image Texture holding a water-caustic image.
4. Link Image Texture [Color] to Emission [Color].
5. To combine with a Light Falloff gradient, add a Mix node (Color, Multiply), image into B, falloff colour into A.
6. To animate, drive the image's vector with a Noise Texture or an animated Mapping node (method in the author's separate water video).

## AGENT_EXECUTION
### Blender (Cycles)
```python
import bpy
bpy.ops.object.light_add(type='POINT', location=(0, 0, 1.5))
ld = bpy.context.object.data; ld.use_nodes = True
nt = ld.node_tree; N = nt.nodes
img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//water_caustic.jpg")
mapn = N.new("ShaderNodeMapping"); tc = N.new("ShaderNodeTexCoord")
nt.links.new(tc.outputs["Normal"], mapn.inputs["Vector"])        # ~ coordinate not stated in video
nt.links.new(mapn.outputs["Vector"], img.inputs["Vector"])
nt.links.new(img.outputs["Color"], N["Emission"].inputs["Color"])
# animate: keyframe Mapping Location
loc = mapn.inputs["Location"]
loc.default_value = (0, 0, 0); loc.keyframe_insert("default_value", frame=1)
loc.default_value = (0.2, 0.1, 0); loc.keyframe_insert("default_value", frame=120)  # ~ slow drift
```
Nodes (combo): `Light Falloff [Linear] -> Color Ramp [Fac]`; `Color Ramp [Color] -> Mix(Color, Multiply) [A]`; `Image [Color] -> Mix [B]`; `Mix [Result] -> Emission [Color]`.

### raea
raea: no equivalent (no projected light texture). Translation: a `<Decal>` of a caustic image on the surface, its `opacity`
animated from the frame, plus a second Decal of the same image offset/`spin` to fake drift; or an `<ImagePlane>` sprite sheet
(`grid`/`frame`, see limits.md) of a caustic loop laid on the surface. Keep the motion slow (in-out eased).

## NOTES
- Deprecated: "Mix RGB" → Mix node, Data Type Color, Blend Multiply (3.4+).
- Visual gaps: the animation setup is only referenced to another video; Noise-driven distortion values unknown (visual only).
- Rule conflicts: none if the drift is slow.
