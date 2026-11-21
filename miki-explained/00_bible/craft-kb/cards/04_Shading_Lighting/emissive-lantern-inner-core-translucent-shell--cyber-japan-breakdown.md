---
title: Glowing lantern — white emission core inside a translucent, photo-textured shell
bucket: 04_Shading_Lighting
source: "Cyber Japan Art Breakdown  Blender.txt"
source_time: "29:19–30:57"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: "Good for any lit-from-inside object (a lamp, a menu lightbox, a glowing sign, a phone screen seen through a case). Conflict: the source scatters many red lanterns; Style D allows one saturated accent, so a single glowing object is the subject, or the copies stay neutral warm and dim."
---

## METADATA
04_Shading_Lighting | 3.x source (Cycles) → 4.x nodes → raea | Shader nodes, raea

## CREATIVE_INTENT
A lantern that glows through its own paper. A plain white emitter sits inside, and the outer shell carries a photo of a
real lantern, tinted red, through a Translucent shader, so it glows like a lampshade. The source treats it as "decoration
that happens to be emissive", not as lighting. Duplicated with random rotation and scale, it fills a scene.

## STE_PROCEDURE
1. Add a Cylinder and bevel its edges (the lantern shell).
2. Unwrap the shell with Project From View, facing a lantern photo (Unsplash), so the photo maps onto the front.
3. Give the shell a material: lantern photo → tint red → Translucent BSDF → Material Output Surface.
4. Add a second, smaller Cylinder inside the shell.
5. Give the inner cylinder an Emission shader: Color white, Strength turned up (value unknown (visual only)), no other changes.
6. Duplicate the lantern around the scene.
7. Rotate each copy randomly on Z so they don't all face the same way.
8. Apply Randomize Transform for slight size variation.

## AGENT_EXECUTION
### Shader nodes (4.x)
```
Shell:  Image(lantern.jpg) [Color] -> Mix(Color, MULTIPLY) [A] ; Mix [B] = #FF2A1A (~ red) ; Mix [Result] -> Translucent BSDF [Color]
        Translucent BSDF [BSDF] -> Material Output [Surface]
Core:   Emission [Color] = #FFFFFF, [Strength] = ~20 ; Emission [Emission] -> Material Output [Surface]
```
```python
import bpy, math
shell = bpy.context.object                                     # bevelled cylinder
with bpy.context.temp_override(area=next(a for a in bpy.context.screen.areas if a.type == 'VIEW_3D')):
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.project_from_view(camera_bounds=False, correct_aspect=True, scale_to_bounds=True)
    bpy.ops.object.mode_set(mode='OBJECT')
# random spin + size on the copies (Object > Transform > Randomize Transform)
bpy.ops.object.randomize_transform(random_seed=3, use_loc=False, use_rot=True, rot=(0, 0, math.pi),
                                   use_scale=True, scale_even=True, scale=(0.15, 0.15, 0.15))   # ~ 15 % size spread
```
- `project_from_view` needs a 3D View context. In background mode use `bpy.ops.uv.cylinder_project()` instead (~).

### raea
- glTF has no Translucent BSDF; the exporter drops it. Build the lantern in TSX, or re-cover the exported shell by
  material name:
```tsx
const RED = LinearRgba.from(Srgba.hex("#ff3a22"));
<Mesh3d name="lantern_shell" transform={T}>
  <Cylinder radius={0.18} half_height={0.25} />
  <StandardMaterial base_color="#3a0c08" base_color_texture={staticFile("lantern.jpg")}
    emissive={RED.mul(3)} emissive_texture={staticFile("lantern.jpg")} perceptual_roughness={0.8} />
</Mesh3d>
<Bloom intensity={1} threshold={0.9} />
```
  `emissive` × `emissive_texture` makes the photo glow red and stay readable. 3–10 blooms like a lit tube (materials.md).
- The inner core is not needed in raea (emissive surfaces don't light their neighbours). If the lantern must light the
  wall or the hero, add `<PointLight transform={T} intensity={~40000} color="#ff8a5a" range={3} />` just outside the
  shell, on the camera side. A PointLight inside a closed mesh lights nothing (lights.md).
- Random spin and size: seed from the index (`ry = ((i * 2654435761) % 360) * Math.PI / 180`). `Math.random()` re-rolls
  every frame.
- `<Cylinder radius half_height />` stands along y (meshes.md). A cylinder's curved side smears box-projected maps
  (materials.md), so for a crisp printed lantern face, export the Blender shell with its Project-From-View UVs and
  re-cover it: `<Model src={staticFile("set.glb")}><StandardMaterial material="lantern_shell" emissive={RED.mul(3)} emissive_texture={staticFile("lantern.jpg")} /></Model>`.

## NOTES
- Visual gaps: emission strength, red hex, bevel and core size are on screen only (`~`).
- STT fix: "projected from view" = UV → Project From View.
- Rule conflicts: Style D allows one saturated accent. A field of red lanterns is a second colour story, so keep one
  lantern as the subject, or desaturate the rest. Glow changes (on/off on a word) fade over ~0.4 s, never pop.
- Log the Unsplash photo in `00_bible/ASSET-SOURCES.md`.
