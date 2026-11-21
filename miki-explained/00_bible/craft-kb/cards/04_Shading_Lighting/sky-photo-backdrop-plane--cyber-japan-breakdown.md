---
title: Sky photo on a giant backdrop plane behind the set
bucket: 04_Shading_Lighting
source: "Cyber Japan Art Breakdown  Blender.txt"
source_time: "28:39–29:19"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: "Useful for street, window or exterior setups that need a believable sky behind them. Partial conflict: Style D is a dark room, so use it only on exterior beats and keep it dim and out of focus."
---

## METADATA
04_Shading_Lighting | 3.x source → 4.2+ / raea | Blender bpy, raea

## CREATIVE_INTENT
The source calls this "my technique I always use": instead of an HDRI sky, put a photo of a sky on a huge plane far
behind the scene. You choose exactly which part of the sky shows behind the subject, and the plane can be tinted to fit
the grade.

## STE_PROCEDURE
1. Add a Plane and scale it large enough to fill the camera's view far behind the set.
2. Place it at the back of the scene, facing the camera.
3. Give it a material with the sky photo as an Image Texture.
4. Tint the image slightly blue before it reaches the colour input.
5. Route the image into the Alpha input as well (as spoken: "running to the color in the Alpha"; exact wiring is unknown (visual only)).
6. Check from the camera only. The plane only needs to read behind the subject.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 120, 30))           # ~ far behind the set
p = bpy.context.object; p.name = "sky_backdrop"; p.scale = (160, 90, 1)    # ~ fills the view
p.rotation_euler = (1.5708, 0, 0)                                          # stand it up, facing -Y (camera side)
m = bpy.data.materials.new("sky_backdrop"); m.use_nodes = True; nt = m.node_tree; N, L = nt.nodes, nt.links
img = N.new('ShaderNodeTexImage'); img.image = bpy.data.images.load("//tex/sky.jpg")
tint = N.new('ShaderNodeMix'); tint.data_type = 'RGBA'; tint.blend_type = 'MULTIPLY'
tint.inputs['Factor'].default_value = 1.0; tint.inputs[7].default_value = (0.85, 0.92, 1.0, 1)   # ~ "slightly blue"
L.new(img.outputs['Color'], tint.inputs[6])
bsdf = N["Principled BSDF"]
L.new(tint.outputs[2], bsdf.inputs['Emission Color']); bsdf.inputs['Emission Strength'].default_value = 1.0  # ~ self-lit sky
L.new(tint.outputs[2], bsdf.inputs['Base Color'])
p.data.materials.append(m)
```
- Node links: `Image [Color] -> Mix(Color, MULTIPLY) [A]`; `Mix [B]` = pale blue; `Mix [Result] -> Principled [Base Color]` (+ `[Emission Color]`).
  The source's Alpha link is a visual gap. Leave it off unless the photo has a real alpha channel.

### raea
- Build the backdrop in TSX rather than the GLB. It is an unlit card, which is what a sky should be:
  `<ImagePlane src={staticFile("sky.jpg")} width={160} position={[0, 30, -120]} rotation={[0, 0, 0]} />`
  (faces +z by default; rotate it to face the camera). Its height comes from the picture's shape.
- Tint with `<Grade temperature={-1} />` on the whole frame, or tint the JPEG before import. An ImagePlane has no tint prop.
- Use `<DepthOfField focal_distance={heroDist} aperture_f_stops={2.8} />` inside `<Camera3d>` to soften it. A 1k–2k sky
  photo is soft anyway on a 9:16 frame.
- Alternative when glossy surfaces must also reflect the sky: `<Environment src={staticFile("sky_2k.hdr")} intensity={0.6} />`
  (lights and reflects but casts no shadows; leave `background` off and keep the ImagePlane for the visible sky).

## NOTES
- Visual gaps: the exact node setup ("there's the setup for that") and the plane's size and distance are on screen only.
- Rule conflicts: Style D's default is a dark room with no sky. Use this only for exterior beats (a stall, a shopfront).
  Keep it below the hero's brightness and never in the brand accent colour.
- Log the photo's source and licence in `00_bible/ASSET-SOURCES.md` (Unsplash photos are free to use, but still list them).
