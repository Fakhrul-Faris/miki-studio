---
title: Video fire on a keyed plane (stock/phone fire footage as emissive card)
bucket: 04_Shading_Lighting
source: "How to Make Beautiful Fire in Blender.txt"
source_time: "01:01–07:43, 18:16–20:11"
blender_version_source: 3.4+/4.x (Mix node)
tool_target: Shader nodes
tier: principle
style_fit: Usable for a "money burning"/heat beat on a macro object, but raea's native <Fire> is the house route; the card is mainly the principle (footage card, colour→alpha key, tint, time-offset copies).
---

## METADATA
04_Shading_Lighting | Blender 3.4+/4.x | Shader nodes

## CREATIVE_INTENT
Principle: real footage of fire on a camera-facing card beats most simulations for front-on shots; it breaks only when the camera
circles or looks down on it. Ideas: shoot your own slow-motion fire at night (black background keys itself); slow-motion clips look
best; one clip yields many fires by giving each copy its own time offset; bend a subdivided card around an object so flames lick
out from under it.

## STE_PROCEDURE
Method: footage → emissive card → key black to alpha → tint → vary.
1. Add a Plane; rotate it 90° to face the camera.
2. Add a new material; drag the fire video into the Shader Editor (Image Texture, Source Movie).
3. Fix the squashed aspect: UV → Unwrap → Cube Projection, then scale UVs to the clip.
4. Link the video [Color] to Emission [Color]; raise Emission Strength until visible.
5. Link video [Color] → Color Ramp [Fac] → Alpha so the black background turns transparent.
6. Lift the ramp's black stop slightly until the near-black edge line disappears.
7. Set the Image Texture Frames to the timeline length (150), not the clip length.
8. Check Cyclic and Auto Refresh.
9. Insert Mix (Color, Multiply) between video and Emission; B = rich orange to tint.
10. For other colours: Hue/Saturation/Value Saturation 0 first, then multiply the new colour (or shift Hue).
11. Lower Emission Strength so the card is visible but not the main light (see practical-light card).
12. To add copies: Shift+D, click the material user count to make it single-user, raise Frames (~250) and set Offset (~50).
13. To wrap flames: subdivide the plane, use proportional editing with "Correct Face Attributes" off.
14. Keep the shot front-on; avoid orbits and top-down views.

## AGENT_EXECUTION
### Blender
```python
import bpy, math
bpy.ops.mesh.primitive_plane_add(size=1, rotation=(math.radians(90), 0, 0))
p = bpy.context.object
m = bpy.data.materials.new("Fire"); m.use_nodes = True; p.data.materials.append(m)
nt = m.node_tree; N = nt.nodes; N.remove(N["Principled BSDF"])
vid = N.new("ShaderNodeTexImage"); vid.image = bpy.data.images.load("//fire_slowmo.mp4")
vid.image.source = 'MOVIE'
iu = vid.image_user; iu.frame_duration = 150; iu.use_cyclic = True; iu.use_auto_refresh = True; iu.frame_offset = 0
mix = N.new("ShaderNodeMix"); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'
mix.inputs[0].default_value = 1.0; mix.inputs[7].default_value = (1.0, 0.45, 0.1, 1)  # B = orange ~
em = N.new("ShaderNodeEmission"); em.inputs["Strength"].default_value = 3  # ~
ramp = N.new("ShaderNodeValToRGB"); ramp.color_ramp.elements[0].position = 0.05  # ~ lift black stop
tr = N.new("ShaderNodeBsdfTransparent"); mixs = N.new("ShaderNodeMixShader")
nt.links.new(vid.outputs["Color"], mix.inputs[6])        # A
nt.links.new(mix.outputs[2], em.inputs["Color"])
nt.links.new(vid.outputs["Color"], ramp.inputs["Fac"])
nt.links.new(ramp.outputs["Color"], mixs.inputs["Fac"])
nt.links.new(tr.outputs[0], mixs.inputs[1]); nt.links.new(em.outputs[0], mixs.inputs[2])
nt.links.new(mixs.outputs[0], N["Material Output"].inputs["Surface"])
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.uv.cube_project(); bpy.ops.object.mode_set(mode='OBJECT')
```
The video says "run the colour into the alpha" without naming the shader; the Transparent/Emission Mix Shader above is the
standard equivalent (~). Variation copy: `iu.frame_duration = 250; iu.frame_offset = 50` on a single-user material.

### raea
- Preferred: `<Fire name="f" position={[0, 0.02, 0]} scale={0.3} intensity={6} color="#ff7a1f" seed={3} opacity={1.5} light={0} />` — a real volume, camera can circle it; vary `seed` per copy instead of time offsets.
- Footage route: export the keyed clip to a PNG sprite sheet and show it on an `<ImagePlane>` (sprite sheets: `grid`, `frame`, limits.md) with transparent PNG frames; ImagePlane is unlit. No in-scene video texture is documented.

## NOTES
- Deprecated: "Mix RGB" → Mix node (Data Type Color, Blend Multiply), 3.4+.
- Visual gaps: node wiring for alpha, UV scale/crop and exact ramp positions are shown on screen only.
- Rule conflicts: none; never pop the fire in — grow `intensity` over ~0.4 s.
