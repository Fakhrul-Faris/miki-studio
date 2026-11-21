---
title: Curvature attribute and painted masks to drive shading/scatter on a volume-built mesh
bucket: 04_Shading_Lighting
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "2:37:23–2:42:00"
blender_version_source: n/a (Houdini, Measure + Color ramp + Paint)
tool_target: Shader nodes
tier: principle
style_fit: Edge wear/cavity dirt from curvature gives macro realism under one top light; must be baked to maps for raea. No conflict.
---

## METADATA
04_Shading_Lighting | Houdini Measure (curvature) + Color (ramp from attribute) + Paint (source) → Blender Dirty Vertex Colors / bake → raea texture maps | Shader nodes

## CREATIVE_INTENT
Principle: curvature tells where detail lives (convex edges vs cavities vs flat faces); painted attributes add art-directed
control on flat regions. Both feed shaders (moss in cavities, cracks, extra displacement) or scattering. Idea: wear on edges,
grime in pits of a macro object.

## STE_PROCEDURE
1. Before measuring, File Cache the heavy mesh and read it back to avoid recooking.
2. Unpack the geometry, then add Measure, Type = Curvature, writing `curvature`.
3. Add Color, Type = Ramp from Attribute, Attribute `curvature`, Range 0–1000, to preview it on points.
4. Use the attribute in the shader (render-time view is more accurate than point display) or to drive scattering.
5. Paint extra masks with a Paint node on flat areas, then import the attribute in the shader for masked displacement/moss.

## AGENT_EXECUTION
### Source tool (Houdini)
`File Cache` → `Unpack` → `Measure (Curvature)` → `Color (Ramp from Attribute, curvature, 0–1000)`; `Paint (Cd or custom attr)` → shader import.

### Blender / raea translation
- Curvature to vertex colour: `bpy.ops.geometry.color_attribute_add(name="Curv", domain='POINT', data_type='FLOAT_COLOR')` then
  `bpy.ops.paint.vertex_color_dirt(blur_strength=1.0, blur_iterations=1, clean_angle=3.14159, dirt_angle=0.0, dirt_only=False, normalize=True)` (Vertex Paint mode).
- GN proxy: `Edge Angle [Signed Angle]` captured to faces, or `Normal` vs `Blur Attribute(Normal, Iterations 5)` difference → `Store Named Attribute "curv"`.
- Shader (Cycles bake only): `Geometry [Pointiness] -> Color Ramp -> Mix (Color) [Factor]` for wear/grime; `Ambient Occlusion [AO]` for cavities.
- Bake: `bpy.context.scene.render.engine = 'CYCLES'`; `bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'})` (or EMIT from an Attribute node) into an image node; save PNG.
- Painted masks: Texture Paint into an image; use in the Blender material, then bake.
raea: `<StandardMaterial base_color_texture={staticFile("rock_diff.png")} metallic_roughness_texture={staticFile("rock_rough.png")} occlusion_texture={staticFile("rock_ao.png")} perceptual_roughness={1} />`;
painted wear at render time can also come from `<ExtendedMaterial ... extension={<WearExtension amount chips grime />} />` (edges chip on curvature).

## NOTES
- Pointiness exists only in Cycles; EEVEE/raea can't read it — always bake.
- Visual gap: the painted regions were brushed by hand on screen.
- Course reference to "week three" displacement maps (cracks/moss) is outside this file.
