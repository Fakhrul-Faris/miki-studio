---
title: Emissive sky photo on planes as an improvised HDRI (backdrop + reflections)
bucket: 04_Shading_Lighting
source: "How To Make Crazy Renders With Easy Geometry Nodes.txt"
source_time: "11:08–12:42"
blender_version_source: 3.x+
tool_target: raea
tier: full
style_fit: Partial — Style D is a dark room, so a sky backdrop rarely fits; the reflection-card idea (bright image cards placed to show in glossy surfaces) does fit the hero object.
---

## METADATA
04_Shading_Lighting | 3.x+ → 4.2+ | Shader nodes / raea

## CREATIVE_INTENT
A photo of a sky on an emissive plane gives an instant backdrop, and copies of it around the set give glossy surfaces something to reflect — a "janky HDRI". Then the World strength is lowered so the scene isn't too bright.

## STE_PROCEDURE
1. Add a plane behind the set; add a material with an Image Texture of a sky photo (e.g. Unsplash).
2. Link Image Texture [Color] → Principled BSDF [Emission Color] and → [Base Color]; optionally [Alpha] → [Alpha].
3. Set Emission Strength (value unknown, visual only).
4. Duplicate the plane around the set so surfaces pick up reflections.
5. Line the backdrop up with the camera.
6. If the render is too bright, lower World Background Strength (value unknown).

## AGENT_EXECUTION
Blender (4.2+):
```python
m = bpy.data.materials.new("SkyCard"); m.use_nodes = True
N, L = m.node_tree.nodes, m.node_tree.links; b = N["Principled BSDF"]
img = N.new('ShaderNodeTexImage'); img.image = bpy.data.images.load("//tex/sky.jpg")
L.new(img.outputs['Color'], b.inputs['Base Color'])
L.new(img.outputs['Color'], b.inputs['Emission Color'])
b.inputs['Emission Strength'].default_value = 1.0   # ~
L.new(img.outputs['Alpha'], b.inputs['Alpha'])
bpy.context.scene.world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.3  # ~
```
raea (render time — do this here, not in Blender):
- Backdrop: `<ImagePlane src={staticFile("sky.jpg")} width={20} position={[0,5,-15]} />` (unlit card; faces +Z, rotate to face camera).
- Real reflections/ambient: `<Environment src={staticFile("sky_2k.hdr")} intensity={0.3} rotation={...} />` (Poly Haven CC0; omit `background` in a dark-room shot). This replaces "duplicate the plane for reflections"; an ImagePlane is unlit and is not a light source in Bevy.
- For a hero-object reflection card: an emissive Mesh3d plane `<StandardMaterial base_color="#000000" emissive="#ffffff" emissive_texture={staticFile("card.png")} />` placed out of shot, or a `<RectLight width height intensity>` (lights but casts no shadow).

## NOTES
- Deprecated: Principled "Emission" socket → "Emission Color" (4.0+).
- In Cycles the emissive planes actually light the scene; in raea (real-time) emissive meshes don't cast light — use Environment / RectLight for light.
- Visual gaps: emission and World strengths not spoken.
- Rule conflicts: Style D = dark room, one soft top light; keep any environment light low and skip the visible sky.
