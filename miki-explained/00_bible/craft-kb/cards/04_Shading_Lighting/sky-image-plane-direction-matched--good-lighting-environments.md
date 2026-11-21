---
title: Sky image plane backdrop with matched light direction
bucket: 04_Shading_Lighting
source: "How to get good lighting in blender.srt"
source_time: "00:10:42–00:13:52; 00:19:55–00:20:56"
blender_version_source: 3.x (inferred)
tool_target: Blender bpy | Shader nodes | raea
tier: full
style_fit: Fits A/D exterior beats; crisp backdrop that DoF can blur; mismatched sun direction is an instant fake tell.
---

## METADATA
04_Shading_Lighting | 3.x (inferred) | Shader nodes, raea

## CREATIVE_INTENT
When the HDRI sky looks poor or the frame is blank, put a photo of a sky on a plane behind the scene, emitting its own colour. The direction of the sun in the photo must match the scene light, or it instantly reads as 3D; mirror the plane if needed. Pick the sky to suit the mood (overcast and dramatic behind a spot-lit scene).

## STE_PROCEDURE
1. Add a Plane (Shift+A > Mesh > Plane) behind the scene.
2. Load the sky photo in an Image Texture node.
3. Connect the image Color to Principled BSDF Emission Color.
4. Set Emission Strength to about 5–10.
5. Connect the image to Alpha as well (or drive Emission Strength via a Math node set to Multiply).
6. Scale the Plane until it extends slightly past the camera frame.
7. Check that it is not cut off in the frame or in reflections.
8. Compare the sun side in the photo with the scene's light direction.
9. If they disagree, scale the Plane by −1 on X.
10. Darken the Base Color and tune the strength to fit the mood.

## AGENT_EXECUTION
Blender:
```python
import bpy
bpy.ops.mesh.primitive_plane_add(location=(0, 60, 15), rotation=(1.5708, 0, 0)); p = bpy.context.object
p.scale = (60, 34, 1)                                     # ~ just past camera frame
m = bpy.data.materials.new("Sky"); m.use_nodes = True; nt = m.node_tree
img = nt.nodes.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//sky.jpg")
b = nt.nodes["Principled BSDF"]
nt.links.new(img.outputs["Color"], b.inputs["Emission Color"])
nt.links.new(img.outputs["Color"], b.inputs["Alpha"])     # video's preference
b.inputs["Emission Strength"].default_value = 5           # 5–10
b.inputs["Base Color"].default_value = (0.05, 0.05, 0.05, 1)  # ~ "a little darker"
p.data.materials.append(m)
p.scale.x *= -1                                           # mirror to match sun direction
```
Nodes: `Image Texture [Color] -> Principled BSDF [Emission Color]` and `-> [Alpha]` (alt: `Image [Color] -> Math (Multiply) -> [Emission Strength]` ~).
raea (`assets.md`: ImagePlane is an unlit card):
```tsx
<ImagePlane src={staticFile("sky_overcast.jpg")} width={60} position={[0, 15, -60]} />
```
raea: no mirror prop on ImagePlane — flip the picture file beforehand (e.g. PIL `ImageOps.mirror`) and darken it in the file, or use a Mesh3d with `<StandardMaterial unlit base_color="#9a9a9a" base_color_texture=... />` (factor dims it). Blur via `<DepthOfField>`.

## NOTES
- Deprecated: "Emission" socket → "Emission Color" (4.0+).
- Visual gaps: exact strength/darkening chosen by eye.
- Rule conflicts: none. Log the sky photo source in ASSET-SOURCES.md.
