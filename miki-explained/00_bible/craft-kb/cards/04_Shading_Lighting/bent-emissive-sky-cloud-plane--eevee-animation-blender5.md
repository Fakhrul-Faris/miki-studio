---
title: Emissive photo sky/cloud plane (image → Emission Strength + Alpha), bent with Simple Deform
bucket: 04_Shading_Lighting
source: "Creating an Animation in Eevee (Blender 5.0).txt"
source_time: "12:07–15:02, 18:29–19:09"
blender_version_source: 5.0
tool_target: Shader nodes
tier: full
style_fit: limited — Style D is a dark room, rarely a sky; useful for a window, backdrop or "outside" beat; keep conservative
---

## METADATA
04_Shading_Lighting | Blender 5.0 | Shader nodes + modifiers + raea

## CREATIVE_INTENT
A cheap sky without an HDRI: a large plane carrying a photo (shot on a phone in RAW), emissive, with the image driving the emission strength so darks go darker and lights stay light. Add vertical loop cuts and a Simple Deform Bend so the plane curves around the camera's view and the edge never shows when the camera tilts up. The same trick with a cloud photo into Alpha and Strength gives atmosphere cards — "can look terrible if overdone", keep low and conservative.

## STE_PROCEDURE
1. Add a large Plane behind the set, facing the camera.
2. Add vertical loop cuts (Ctrl+R) so it can bend.
3. Add a Simple Deform modifier, Deform Method Bend; set Angle so the plane curves round the camera.
4. Before you shade it, set the deform axis so the bend is around the vertical.
5. Give it a material with an Emission shader (or Principled with Emission).
6. Load the sky photo in an Image Texture; connect Color to Emission Color.
7. Connect the image (greyscale) to Emission Strength, so dark areas emit less.
8. For a cloud card: connect the image to Alpha and Strength; keep strength low.
9. If the camera looks far up, increase the bend until the top edge is out of view.

## AGENT_EXECUTION
```python
import bpy, math
bpy.ops.mesh.primitive_plane_add(size=40, location=(0, -30, 10), rotation=(math.radians(90), 0, 0))
sky = bpy.context.object; sky.name = "sky"
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.subdivide(number_cuts=24); bpy.ops.object.mode_set(mode='OBJECT')  # ~ loop cuts
sd = sky.modifiers.new("Bend", 'SIMPLE_DEFORM'); sd.deform_method = 'BEND'
sd.deform_axis = 'Y'; sd.angle = math.radians(120)                     # ~ curve round the camera
m = bpy.data.materials.new("sky"); m.use_nodes = True; nt = m.node_tree; N, L = nt.nodes, nt.links
N.remove(N["Principled BSDF"])
img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//tex/sky_raw.jpg")
em = N.new("ShaderNodeEmission")
L.new(img.outputs["Color"], em.inputs["Color"])
L.new(img.outputs["Color"], em.inputs["Strength"])                     # colour → strength (darks darker)
L.new(em.outputs["Emission"], N["Material Output"].inputs["Surface"])
sky.data.materials.append(m)
# cloud card: Principled, image Alpha -> [Alpha], image -> [Emission Strength]; m.surface_render_method = 'BLENDED'
```
Links: `Image [Color] -> Emission [Color]`, `Image [Color] -> Emission [Strength]`, `Emission -> Material Output [Surface]`.

raea: export the bent plane as a GLB mesh (apply the modifier) and cover it with an unlit textured material — `<StandardMaterial base_color_texture={staticFile("sky.jpg")} unlit />` (an unlit card shows the photo as-is; "colour → strength" is baked into the JPG by a contrast curve). Flat cards: `<ImagePlane src={staticFile("cloud.png")} width={8} position rotation />` (PNG with alpha). Real alternative the author names as better: `<Environment src={staticFile("sky_2k.hdr")} background />`.

## NOTES
- Deprecated: EEVEE Legacy Blend Mode → EEVEE Next `surface_render_method` ('DITHERED' / 'BLENDED').
- Visual gaps: number of loop cuts, bend angle and axis are on screen only (`~`).
- Rule conflicts: none. Never use a cloud card where its flat edge can be seen; fade it, don't pop.
